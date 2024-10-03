package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import com.test.enums.HttpCodeEnum;
import com.test.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseResult<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("path") String path) throws UnsupportedEncodingException {
        return fileService.uploadFile(file, path);
    }

    @GetMapping("/download")
    public void downloadFile(@RequestParam("filePath") String filePath, HttpServletResponse response) {
//        System.out.println("下载的路径是：" + filePath);
        fileService.downloadFile(filePath, response);
    }

    @GetMapping("/listFiles")
    public ResponseResult<FileNode> listFiles() {
        return fileService.listFiles();
    }

    @PostMapping("/delete")
    public ResponseResult<Void> deleteFile(@RequestParam("path")  String filePath) {
        return fileService.deleteFile(filePath);
    }

    @PostMapping("/createDirectory")
    public ResponseResult<Void> createDirectory(@RequestBody Map<String, String> payload) {
        String parentPath = payload.get("parentPath");
        String folderName = payload.get("folderName");

        // 简单的空值检查
        if (parentPath == null || parentPath.trim().isEmpty()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "父目录路径不能为空");
        }
        if (folderName == null || folderName.trim().isEmpty()) {
            return ResponseResult.errorResult(HttpCodeEnum.BAD_REQUEST.getCode(), "文件夹名称不能为空");
        }
        // 调用服务层逻辑
        return fileService.createDirectory(parentPath.trim(), folderName.trim());
    }
}

