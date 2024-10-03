package com.test.service.impl;

import com.sun.xml.bind.v2.TODO;
import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.service.FileService;
import com.test.utils.FileTreeUtil;
import com.test.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class FileServiceImpl implements FileService {

    @Value("${ip:localhost}")
    private String ip;

    @Value("${server.port}")
    private String port;

    @Value("${file.parent-path}")
    private String parentFilePath;

    // 添加一个字段来保存解析后的绝对路径
    private String absoluteParentFilePath;

    // 固定的两个根目录名称
    private final List<String> fixedRootDirectories = Arrays.asList("余杭地区", "临平地区");


    private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    // 在类的初始化阶段解析绝对路径
    @PostConstruct
    public void init() {
        try {
            // 获取应用程序的工作目录
            String workingDir = System.getProperty("user.dir");
            // 解析绝对路径
            absoluteParentFilePath = new File(workingDir, parentFilePath).getCanonicalPath();
//            System.out.println("absoluteParentFilePath是："+absoluteParentFilePath);      //C:\Users\Yu FAN\Desktop\web_dev\SpringbootProject\file
        } catch (IOException e) {
            throw new RuntimeException("Failed to resolve file path", e);
        }
    }

    @Override
    public ResponseResult<String> uploadFile(MultipartFile file, String path) throws UnsupportedEncodingException {
        if (file.isEmpty()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "上传的文件不能为空");
        }
        System.out.println(path);
        String originalFilename = file.getOriginalFilename();
        String mainName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

        // 确保路径安全，防止路径遍历攻击
        String sanitizedPath = SecurityUtils.sanitizePath(path, absoluteParentFilePath);
        if (sanitizedPath == null) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "非法的路径参数");
        }

        // 创建要存储的路径
        String fileRealPath = absoluteParentFilePath + File.separator + sanitizedPath + File.separator + originalFilename;


        // 创建文件的存储目录，如果不存在的话
        File saveFile = new File(fileRealPath);
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }

        // 如果上传的文件已经存在了，那么重命名
        if (saveFile.exists()) {
            String uniqueFileName = System.currentTimeMillis() + "_" + mainName + ext;
            fileRealPath = absoluteParentFilePath + File.separator + sanitizedPath + File.separator + uniqueFileName;
            saveFile = new File(fileRealPath);
        }

        // 保存到指定磁盘路径
        try {
            file.transferTo(saveFile);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseResult.errorResult(HttpCodeEnum.INTERNAL_SERVER_ERROR.getCode(), "文件上传失败");
        }

        // 返回下载链接，注意不暴露文件系统路径
        String url = "http://" + ip + ":" + port + "/file/download?path=" + URLEncoder.encode(sanitizedPath + "/" + saveFile.getName(), "UTF-8");
        System.out.println(url);
        return ResponseResult.successResult(url);
    }

    @Override
    public void downloadFile(String filePath1, HttpServletResponse response) {
        try {
            // 构建文件路径
            Path rootPath = Paths.get(absoluteParentFilePath).toRealPath();
            Path filePath = rootPath.resolve(filePath1).normalize();

            // 校验文件路径，防止路径遍历攻击
            if (!filePath.startsWith(rootPath)) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "非法的文件路径");
                return;
            }

            File file = filePath.toFile();

            // 检查文件是否存在且为常规文件
            if (!file.exists() || !file.isFile()) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "文件不存在");
                return;
            }

            // 设置响应头，准备下载
            String encodedFileName = URLEncoder.encode(file.getName(), "UTF-8").replaceAll("\\+", "%20");
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            response.setContentType(contentType);
            response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"; filename*=UTF-8''" + encodedFileName);

            // 将文件内容写入响应输出流
            try (InputStream is = new FileInputStream(file); OutputStream os = response.getOutputStream()) {
                byte[] buffer = new byte[8192];
                int len;
                while ((len = is.read(buffer)) != -1) {
                    os.write(buffer, 0, len);
                }
                os.flush();
            }

        } catch (IOException e) {
            // 打印堆栈跟踪到控制台
            e.printStackTrace();
            try {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "系统错误");
            } catch (IOException ioException) {
                // 再次打印异常
                ioException.printStackTrace();
            }
        }
    }


    @Override
    public ResponseResult<FileNode> listFiles() {
        File directory = new File(absoluteParentFilePath);
        // 检查输入目录是否存在且为目录
        if (!directory.exists() || !directory.isDirectory()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "无效的目录路径");
        }
        // 构建文件树节点列表，传入初始路径
        List<FileNode> fileNodes = FileTreeUtil.buildFileTree(directory, directory.getAbsolutePath());

        // 创建根节点，表示父目录
        FileNode rootNode = new FileNode();
        rootNode.setLabel(directory.getName()); // 设置根节点的名称为目录名
        rootNode.setDirectory(true); // 根节点是一个目录
        rootNode.setChildren(fileNodes); // 子节点是之前构建的文件节点列表
        rootNode.setPath(directory.getAbsolutePath()); // 设置根节点的路径

        // 返回根节点
        return ResponseResult.successResult(rootNode);
    }

    @Override
    public ResponseResult<Void> deleteFile(String filePath) {
        // 构建文件对象
        File file = new File(filePath);

        // 校验文件路径，防止路径遍历攻击
        try {
            String canonicalRootPath = new File(absoluteParentFilePath).getCanonicalPath();
            String canonicalFilePath = file.getCanonicalPath();
            if (!canonicalFilePath.startsWith(canonicalRootPath)) {
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "非法的文件路径");
            }

            // 防止删除固定的根目录
            String relativePath = canonicalFilePath.substring(canonicalRootPath.length() + 1);
            String[] pathSegments = relativePath.split(Pattern.quote(File.separator));
            if (pathSegments.length > 0 && fixedRootDirectories.contains(pathSegments[0])) {
                if (pathSegments.length == 1) {
                    // 试图删除固定的根目录
                    return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "不能删除固定的根目录");
                }
            }

        } catch (IOException e) {
            return ResponseResult.errorResult(HttpCodeEnum.SYSTEM_ERROR.getCode(), "系统错误");
        }

        if (!file.exists()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "文件或目录不存在");
        }

        // 判断是文件还是目录
        boolean success;
        if (file.isDirectory()) {
            // 删除目录及其所有内容
            success = deleteDirectoryRecursively(file);
        } else {
            // 删除文件
            success = file.delete();
        }

        if (success) {
            return new ResponseResult<>();
        } else {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "删除失败");
        }
    }

    // 递归删除目录
//    TODO
    private boolean deleteDirectoryRecursively(File dir) {
        File[] allContents = dir.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectoryRecursively(file);
            }
        }
        return dir.delete();
    }

    @Override
    public ResponseResult<Void> createDirectory(String parentPath, String folderName) {
        try {
            // 构建根路径和父目录的绝对路径
            Path rootPath = Paths.get(absoluteParentFilePath).toRealPath().normalize();
            Path parentPathResolved = rootPath.resolve(parentPath).normalize();

            // 校验父目录路径，防止路径遍历攻击
            if (!parentPathResolved.startsWith(rootPath)) {
                logger.warn("非法的父目录路径: {}", parentPath);
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "非法的父目录路径");
            }

            // 构建新文件夹的路径
            Path newFolderPath = parentPathResolved.resolve(folderName).normalize();

            // 检查新文件夹是否仍在根路径下
            if (!newFolderPath.startsWith(rootPath)) {
                logger.warn("非法的文件夹路径: {}", newFolderPath);
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "非法的文件夹路径");
            }

            // 检查文件夹是否已存在
            if (Files.exists(newFolderPath)) {
                logger.warn("文件夹已存在: {}", newFolderPath);
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "文件夹已存在");
            }

            // 创建文件夹
            Files.createDirectories(newFolderPath);
            logger.info("文件夹创建成功: {}", newFolderPath);
            return new ResponseResult<>();

        } catch (IOException e) {
            logger.error("文件夹创建失败: parentPath={}, folderName={}", parentPath, folderName, e);
            return ResponseResult.errorResult(HttpCodeEnum.SYSTEM_ERROR.getCode(), "系统错误");
        }
    }

    @Override
    public ResponseResult<Void> createFiles(String fileName) {
        // 创建文件
        File file = new File(absoluteParentFilePath, fileName);

        // 校验路径，防止路径遍历攻击
        try {
            String canonicalRootPath = new File(absoluteParentFilePath).getCanonicalPath();
            String canonicalFilePath = file.getCanonicalPath();
            if (!canonicalFilePath.startsWith(canonicalRootPath)) {
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "非法的文件路径");
            }
        } catch (IOException e) {
            return ResponseResult.errorResult(HttpCodeEnum.SYSTEM_ERROR.getCode(), "系统错误");
        }

        if (file.exists()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "文件已存在");
        }

        try {
            boolean success = file.createNewFile();
            if (success) {
                return new ResponseResult<>();
            } else {
                return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "创建文件失败");
            }
        } catch (IOException e) {
            return ResponseResult.errorResult(HttpCodeEnum.SYSTEM_ERROR.getCode(), "系统错误");
        }
    }
}
