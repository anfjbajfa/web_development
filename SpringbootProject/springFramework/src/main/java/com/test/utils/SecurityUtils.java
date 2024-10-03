package com.test.utils;

import com.test.domain.entity.LoginUser;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.File;
import java.io.IOException;

public class SecurityUtils {

    /**
     * 获取用户
     **/
    public static LoginUser getLoginUser() {
        return (LoginUser) getAuthentication().getPrincipal();
    }

    /**
     * 获取Authentication
     */
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static Boolean isAdmin() {
        Long id = getLoginUser().getUser().getId();
        return id != null && 1L == id;
    }

    /**
     * 获取当前登录的用户 id，如果没有获取到就返回 null
     *
     * @return 用户 id
     */
    public static Long getUserId() {
        Long userId;
        try {
            userId = getLoginUser().getUser().getId();
//            SecurityContextHolder.getContext().getAuthentication().getPrincipal().getUser().getId();
        } catch (Exception e) {
            throw new SystemException(HttpCodeEnum.NEED_LOGIN);
        }

        return userId;
    }

    /**
     * 路径安全性检查，防止路径遍历攻击
     * @param path 前端传递的路径
     * @return 返回合法的路径，若非法则返回 null
     */

    public static String sanitizePath(String path, String absoluteParentFilePath) {
        try {
            File parentDir = new File(absoluteParentFilePath);
            File targetDir = new File(path).getCanonicalFile();
            if (targetDir.getPath().startsWith(parentDir.getPath())) {
                // 返回相对于父目录的相对路径
                return parentDir.toPath().relativize(targetDir.toPath()).toString();
            } else {
                return null; // 非法路径
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
