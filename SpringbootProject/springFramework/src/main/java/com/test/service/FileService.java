package com.test.service;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;

import java.util.List;

public interface FileService {
    ResponseResult<String> uploadFile(MultipartFile file);
    ResponseResult<Void> downloadFile(String fileName, HttpServletResponse response);
    ResponseResult<FileNode> listFiles();
    ResponseResult<Void> deleteFile(String fileName);
    ResponseResult<Void> createDirectory(String directoryName);
    ResponseResult<Void> deleteDirectory(String directoryName);
}
