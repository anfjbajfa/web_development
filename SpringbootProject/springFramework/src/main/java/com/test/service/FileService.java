package com.test.service;

import com.test.domain.ResponseResult;
import com.test.domain.vo.FileNode;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface FileService {
    ResponseResult<String> uploadFile(MultipartFile file, String path) throws UnsupportedEncodingException;
    void downloadFile(String filePath, HttpServletResponse response);
    ResponseResult<FileNode> listFiles();
    ResponseResult<Void> deleteFile(String filePath);
    ResponseResult<Void> createDirectory(String parentPath, String folderName);
    ResponseResult<Void> createFiles(String fileName);
}
