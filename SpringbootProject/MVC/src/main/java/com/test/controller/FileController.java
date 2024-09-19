package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import com.test.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;


    @PostMapping("/upload")
    public ResponseResult<String> uploadFile(MultipartFile file) {
        return fileService.uploadFile(file);
    }

    @GetMapping("/download/{fileName}")
    public ResponseResult<Void> downloadFile(@PathVariable String fileName, HttpServletResponse response) {
        return fileService.downloadFile(fileName,response);
    }

    @GetMapping("/listFiles")
    public ResponseResult<FileNode> listFiles() {
        return fileService.listFiles();
    }


}

