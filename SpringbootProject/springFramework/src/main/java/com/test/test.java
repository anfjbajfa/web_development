package com.test;

import com.test.utils.FileTreeUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class test {
    public static void main(String[] args) {
        File file = new File("example.txt");
        String originalFilename = file.getName();
        String mainName = originalFilename.substring(0,originalFilename.lastIndexOf("."));
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
        System.out.println(mainName);
        System.out.println(ext);

        String filepath = "com/test/service";
        File newfile  = new File(filepath);
        System.out.println(FileTreeUtil.buildFileTree(newfile));


    }
}
