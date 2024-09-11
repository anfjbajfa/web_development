package com.test.utils;

import com.test.domain.entity.LoginUser;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
}
