package com.test.service.impl;

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
import java.net.URLEncoder;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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
            // logger.info("absoluteParentFilePath是：{}", absoluteParentFilePath);
        } catch (IOException e) {
            // 使用全局异常处理器来处理异常
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "无法解析路径",e);
        }
    }

    @Override
    public ResponseResult<String> uploadFile(MultipartFile file, String path) {
        if (file.isEmpty()) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "上传的文件为空");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "文件名无效");
        }

        String mainName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

        // 确保路径安全，防止路径遍历攻击
        String sanitizedPath = SecurityUtils.sanitizePath(path, absoluteParentFilePath);
        if (sanitizedPath == null) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的路径");
        }

        // 创建要存储的路径
        String fileRealPath = absoluteParentFilePath + File.separator + sanitizedPath + File.separator + originalFilename;

        // 创建文件的存储目录，如果不存在的话
        File saveFile = new File(fileRealPath);
        if (!saveFile.getParentFile().exists()) {
            boolean dirsCreated = saveFile.getParentFile().mkdirs();
            if (!dirsCreated) {
                throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "创建目录失败");
            }
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
            throw new SystemException(HttpCodeEnum.INTERNAL_SERVER_ERROR, "文件保存失败",e);
        }

        // 返回下载链接，注意不暴露文件系统路径
        String url;
        try {
            url = "http://" + ip + ":" + port + "/file/download?path=" + URLEncoder.encode(sanitizedPath + "/" + saveFile.getName(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new SystemException(HttpCodeEnum.INTERNAL_SERVER_ERROR, "URL编码失败");
        }
        return ResponseResult.success(url);
    }

    @Override
    public void downloadFile(List<String> filePaths, HttpServletResponse response) {
        if (filePaths == null || filePaths.isEmpty()) {
            try {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "未选择要下载的文件");
            } catch (IOException e) {
                throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "发送错误响应失败",e);
            }
            return;
        }

        try {
            Path rootPath = Paths.get(absoluteParentFilePath).toRealPath();

            if (filePaths.size() == 1) {
                // 单文件下载
                String singleFilePathStr = filePaths.get(0);
                Path singleFilePath = rootPath.resolve(singleFilePathStr).normalize();

                // 防止路径遍历攻击
                if (!singleFilePath.startsWith(rootPath)) {
                    throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的文件路径");
                }

                File singleFile = singleFilePath.toFile();

                if (!singleFile.exists() || !singleFile.isFile()) {
                    throw new SystemException(HttpCodeEnum.BAD_REQUEST, "文件不存在");
                }

                // 设置响应头
                String encodedFileName = URLEncoder.encode(singleFile.getName(), "UTF-8").replaceAll("\\+", "%20");
                String contentType = Files.probeContentType(singleFilePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                response.setContentType(contentType);
                response.setHeader("Content-Disposition", "attachment; filename=\"" + singleFile.getName() + "\"; filename*=UTF-8''" + encodedFileName);

                // 将文件内容写入响应输出流
                try (InputStream is = new FileInputStream(singleFile); OutputStream os = response.getOutputStream()) {
                    byte[] buffer = new byte[8192];
                    int len;
                    while ((len = is.read(buffer)) != -1) {
                        os.write(buffer, 0, len);
                    }
                    os.flush();
                }
            } else {
                // 多文件下载，打包为 zip
                response.setContentType("application/zip");
                String zipFileName = "download.zip";
                String encodedFileName = URLEncoder.encode(zipFileName, "UTF-8").replaceAll("\\+", "%20");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + zipFileName + "\"; filename*=UTF-8''" + encodedFileName);

                // 创建 ZipOutputStream
                try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())) {
                    for (String filePathStr : filePaths) {
                        Path filePath = rootPath.resolve(filePathStr).normalize();

                        // 防止路径遍历攻击
                        if (!filePath.startsWith(rootPath)) {
                            continue; // 跳过非法路径
                        }

                        File file = filePath.toFile();

                        if (file.exists() && file.isFile()) {
                            try (FileInputStream fis = new FileInputStream(file)) {
                                // 获取文件相对于根路径的相对路径，保持目录结构
                                Path relativePath = rootPath.relativize(filePath);
                                ZipEntry zipEntry = new ZipEntry(relativePath.toString().replace("\\", "/"));
                                zos.putNextEntry(zipEntry);

                                byte[] buffer = new byte[8192];
                                int len;
                                while ((len = fis.read(buffer)) != -1) {
                                    zos.write(buffer, 0, len);
                                }

                                zos.closeEntry();
                            }
                        }
                    }

                    zos.finish();
                }
            }
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "文件下载失败",e);
        }
    }

    @Override
    public ResponseResult<FileNode> listFiles() {
        File directory = new File(absoluteParentFilePath);
        // 检查输入目录是否存在且为目录
        if (!directory.exists() || !directory.isDirectory()) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "目录不存在或不是一个有效的目录");
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
        return ResponseResult.success(rootNode);
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
                throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的文件路径");
            }

            // 防止删除固定的根目录
            String relativePath = canonicalFilePath.substring(canonicalRootPath.length() + 1);
            String[] pathSegments = relativePath.split(Pattern.quote(File.separator));
            if (pathSegments.length > 0 && fixedRootDirectories.contains(pathSegments[0])) {
                if (pathSegments.length == 1) {
                    // 试图删除固定的根目录
                    throw new SystemException(HttpCodeEnum.BAD_REQUEST, "无法删除固定的根目录");
                }
            }

        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "路径解析失败",e);
        }

        if (!file.exists()) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "文件不存在");
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

        if (!success) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "删除文件失败");
        }

        return ResponseResult.success();
    }

    // 递归删除目录
    private boolean deleteDirectoryRecursively(File dir) {
        File[] allContents = dir.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                if (!deleteDirectoryRecursively(file)) {
                    return false;
                }
            }
        }
        return dir.delete();
    }

    @Override
    public ResponseResult<Void> createDirectory(String parentPath, String folderName) {
        // 构建根路径和父目录的绝对路径
        Path rootPath;
        try {
            rootPath = Paths.get(absoluteParentFilePath).toRealPath().normalize();
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "根路径解析失败",e);
        }

        Path parentPathResolved = rootPath.resolve(parentPath).normalize();

        // 校验父目录路径，防止路径遍历攻击
        if (!parentPathResolved.startsWith(rootPath)) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的父目录路径");
        }

        // 构建新文件夹的路径
        Path newFolderPath = parentPathResolved.resolve(folderName).normalize();

        // 检查新文件夹是否仍在根路径下
        if (!newFolderPath.startsWith(rootPath)) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的文件夹路径");
        }

        // 检查文件夹是否已存在
        if (Files.exists(newFolderPath)) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "文件夹已存在");
        }

        // 创建文件夹
        try {
            Files.createDirectories(newFolderPath);
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "创建文件夹失败",e);
        }

        return ResponseResult.success();
    }

    @Override
    public ResponseResult<Void> moveFile(List<String> sourcePaths, String targetPath) {
        Path targetDir;
        try {
            targetDir = Paths.get(targetPath).toRealPath().normalize();
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "目标路径解析失败",e);
        }

        // 检查目标目录是否存在，不存在则创建
        if (!Files.exists(targetDir)) {
            try {
                Files.createDirectories(targetDir);
            } catch (IOException e) {
                throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "创建目标目录失败",e);
            }
        }

        for (String sourcePathStr : sourcePaths) {
            Path sourcePath;
            try {
                sourcePath = Paths.get(sourcePathStr).toRealPath().normalize();
            } catch (IOException e) {
                throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "源路径解析失败: " + sourcePathStr,e);
            }

            // 防止路径遍历攻击
            try {
                Path rootPath = Paths.get(absoluteParentFilePath).toRealPath();
                if (!sourcePath.startsWith(rootPath)) {
                    throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的源路径: " + sourcePathStr);
                }
            } catch (IOException e) {
                throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "路径解析失败",e);
            }

            // 检查源文件是否存在
            if (!Files.exists(sourcePath)) {
                throw new SystemException(HttpCodeEnum.BAD_REQUEST, "源文件不存在: " + sourcePathStr);
            }

            // 检查是否为目录
            if (Files.isDirectory(sourcePath)) {
                // 递归移动目录
                Path destination = targetDir.resolve(sourcePath.getFileName());
                try {
                    moveDirectoryRecursively(sourcePath, destination);
                } catch (IOException e) {
                    throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "移动目录失败: " + sourcePathStr + " -> " + destination.toString(),e);
                }

            } else {
                // 移动单个文件
                Path destination = targetDir.resolve(sourcePath.getFileName());
                try {
                    Files.move(sourcePath, destination, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "移动文件失败: " + sourcePathStr + " -> " + destination.toString(),e);
                }
            }
        }
        return ResponseResult.success();
    }

    /**
     * 递归移动目录及其内容
     *
     * @param sourceDir      源目录路径
     * @param destinationDir 目标目录路径
     * @throws IOException 如果移动过程中出现问题
     */
    private void moveDirectoryRecursively(Path sourceDir, Path destinationDir) throws IOException {
        if (Files.exists(destinationDir)) {
            throw new IOException("目标目录已存在: " + destinationDir.toString());
        }

        // 使用 Files.walkFileTree 递归移动目录
        Files.walkFileTree(sourceDir, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
                Path targetDirPath = destinationDir.resolve(sourceDir.relativize(dir));
                Files.createDirectories(targetDirPath);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Path targetFilePath = destinationDir.resolve(sourceDir.relativize(file));
                Files.move(file, targetFilePath, StandardCopyOption.REPLACE_EXISTING);
                return FileVisitResult.CONTINUE;
            }
        });

        // 删除源目录
        Files.delete(sourceDir);
    }

    @Override
    public ResponseResult<Void> renameFile(String sourcePath, String targetPath) {
        Path source;
        Path target;
        try {
            source = Paths.get(sourcePath).toRealPath().normalize();
            target = Paths.get(targetPath).toRealPath().normalize();
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "路径解析失败",e);
        }

        // 防止路径遍历攻击
        try {
            Path rootPath = Paths.get(absoluteParentFilePath).toRealPath();
            if (!source.startsWith(rootPath) || !target.startsWith(rootPath)) {
                throw new SystemException(HttpCodeEnum.BAD_REQUEST, "非法的文件路径");
            }
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "路径解析失败",e);
        }

        // 检查源文件是否存在
        if (!Files.exists(source)) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "源文件不存在: " + sourcePath);
        }

        // 检查目标文件是否已存在（根据业务逻辑，你可以决定是否覆盖）
        if (Files.exists(target)) {
            throw new SystemException(HttpCodeEnum.BAD_REQUEST, "目标文件已存在: " + targetPath);
        }

        // 执行文件重命名（移动）操作
        try {
            Files.move(source, target, StandardCopyOption.ATOMIC_MOVE);
        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR, "重命名文件失败: " + sourcePath + " -> " + targetPath,e);
        }

        return ResponseResult.success();
    }
}
