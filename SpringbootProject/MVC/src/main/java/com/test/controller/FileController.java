package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import com.test.enums.HttpCodeEnum;
import com.test.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @PostMapping("/download")
    public void downloadFiles(@RequestBody List<String> filePaths, HttpServletResponse response) {
        System.out.println(filePaths);
        fileService.downloadFile(filePaths, response);
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

    @PostMapping("/moveFiles")
    public ResponseResult<Void> moveFiles(@RequestBody Map<String,Object> payload) throws IOException {
        List<String> filePaths = (List<String>) payload.get("sourcePaths");
        String targetPath = (String) payload.get("targetPath");
//      TODO 这里没有做文件路径的判断
        return fileService.moveFile(filePaths,targetPath);
    }

    @PostMapping("/renameFile")
    public ResponseResult<Void> renameFile(@RequestBody Map<String, String> payload) throws IOException {
        String sourcePath = (String) payload.get("sourcePath");
        String targetPath = (String) payload.get("targetPath");
        System.out.println(sourcePath);
        System.out.println(targetPath);
        return fileService.renameFile(sourcePath,targetPath);
    }
}

