package com.test.utils;

import com.test.domain.vo.FileNode;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileTreeUtil {
    public static List<FileNode> buildFileTree(File dir, String parentFilePath) {
        List<FileNode> nodes = new ArrayList<>();
        File[] files = dir.listFiles(); // 列出当前目录下的所有文件和文件夹
        if (files != null) {
            for (File file : files) {
                String currentPath = parentFilePath + File.separator + file.getName(); // 构建当前文件或目录的路径

                FileNode node = new FileNode();
                node.setLabel(file.getName());
                node.setDirectory(file.isDirectory());
                node.setPath(currentPath); // 设置路径

                if (file.isDirectory()) {
                    // 如果是目录，递归添加子节点
                    node.setChildren(buildFileTree(file, currentPath));
                }
                nodes.add(node); // 添加到节点列表
            }
        }
        return nodes;
    }
}