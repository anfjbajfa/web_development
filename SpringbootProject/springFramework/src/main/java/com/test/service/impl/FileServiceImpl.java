package com.test.service.impl;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.service.FileService;
import com.test.utils.FileTreeUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.file.Files;

import java.util.List;
@Service
public class FileServiceImpl implements FileService {
    @Value("${ip:localhost}")
    String ip;

    @Value("${server.port}")
    String port;
    //TODO
    @Value("${file.parent-path}")
    private String parentFilePath;

    @Override
    public ResponseResult<String> uploadFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String mainName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));

        // 创建要存储的路径
        String fileRealPath = parentFilePath + File.separator + originalFilename;

        // 创建 file 和 file 的存储目录，如果不存在的话
        File saveFile = new File(fileRealPath);
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }

        // 如果上传的文件已经存在了，那么重命名
        if (saveFile.exists()) {
            String uniqueFileName = System.currentTimeMillis() + "_" + mainName + ext;
            fileRealPath = parentFilePath + File.separator + uniqueFileName;
            saveFile = new File(fileRealPath);
        }

        // 保存到指定磁盘路径
        try {
            file.transferTo(saveFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 返回下载链接，注意不暴露文件系统路径
        //TODO
        String url = "http://" + ip + ":" + port + "/file/download/" + saveFile.getName();
        return ResponseResult.successResult(url);
    }

    @Override
    @GetMapping("/download/{fileName}")
//    通过uploadFile返回的url路径
    public ResponseResult<Void> downloadFile(@PathVariable String fileName, HttpServletResponse response) {
        try {
            // 文件名校验，防止非法字符和路径遍历
            if (fileName.contains("/") || fileName.contains("\\") || fileName.contains("%") || fileName.contains("..")) {
                throw new SystemException(HttpCodeEnum.BAD_REQUEST);
            }

            // 构建文件对象
            File file = new File(parentFilePath, fileName);

            // 校验文件路径，防止路径遍历攻击
            String canonicalRootPath = new File(parentFilePath).getCanonicalPath();
            String canonicalFilePath = file.getCanonicalPath();
            if (!canonicalFilePath.startsWith(canonicalRootPath)) {
                throw new SystemException(HttpCodeEnum.BAD_REQUEST);
            }

            // 检查文件是否存在且为常规文件
            if (!file.exists() || !file.isFile()) {
                throw new SystemException(HttpCodeEnum.RESOURCE_NOT_EXIST);
            }

            // 设置响应头，准备下载
            String encodedFileName = URLEncoder.encode(file.getName(), "UTF-8").replaceAll("\\+", "%20");
            String contentType = Files.probeContentType(file.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            response.setContentType(contentType);
            response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + encodedFileName);

            // 将文件内容写入响应输出流
            try (InputStream is = new FileInputStream(file); OutputStream os = response.getOutputStream()) {
                byte[] buffer = new byte[8192];
                int len;
                while ((len = is.read(buffer)) != -1) {
                    os.write(buffer, 0, len);
                }
                os.flush();
            }

            return new ResponseResult<>();

        } catch (IOException e) {
            throw new SystemException(HttpCodeEnum.SYSTEM_ERROR);
        }
    }

    @Override
    public ResponseResult<FileNode> listFiles() {
        File directory = new File(parentFilePath);
        // 检查输入目录是否存在且为目录
        if (!directory.exists() || !directory.isDirectory()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "无效的目录路径");
        }
        // 构建文件树节点列表
        List<FileNode> fileNodes = FileTreeUtil.buildFileTree(directory);

        // 创建根节点，表示父目录
        FileNode rootNode = new FileNode();
        rootNode.setLabel(directory.getName()); // 设置根节点的名称为目录名
        rootNode.setDirectory(true); // 根节点是一个目录
        rootNode.setChildren(fileNodes); // 子节点是之前构建的文件节点列表

        // 返回根节点
        return ResponseResult.successResult(rootNode);
    }

    @Override
    public ResponseResult<Void> deleteFile(String fileName) {
        return null;
    }

    @Override
    public ResponseResult<Void> createDirectory(String directoryName) {
        return null;
    }

    @Override
    public ResponseResult<Void> deleteDirectory(String directoryName) {
        return null;
    }
}
