package com.test.utils;

import com.test.domain.vo.FileNode;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileTreeUtil {
    // 工具类的方法通常是静态方法
    public static List<FileNode> buildFileTree(File dir) {
        List<FileNode> nodes = new ArrayList<>();
        File[] files = dir.listFiles(); // 列出当前目录下的所有文件和文件夹
        if (files != null) {
            for (File file : files) {
                FileNode node = new FileNode(file.getName(), file.isDirectory(), new ArrayList<>());
                if (file.isDirectory()) {
                    // 如果是目录，递归添加子节点
                    node.setChildren(buildFileTree(file));
                }
                nodes.add(node); // 添加到节点列表
            }
        }
        return nodes;
    }
}
