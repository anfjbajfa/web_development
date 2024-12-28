package com.test.handler.security;

import com.alibaba.fastjson.JSON;
import com.test.domain.ResponseResult;
import com.test.enums.HttpCodeEnum;
import com.test.utils.WebUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
            throws IOException, ServletException {
        ResponseResult result = null;

        if (e instanceof InsufficientAuthenticationException) {
            result = ResponseResult.error(HttpCodeEnum.NEED_LOGIN.getCode(), HttpCodeEnum.NEED_LOGIN.getMsg());

        } else if (e instanceof BadCredentialsException) {
            result = ResponseResult.error(HttpCodeEnum.LOGIN_ERROR.getCode(), e.getMessage());
        } else {
            result = ResponseResult.error(HttpCodeEnum.SYSTEM_ERROR);
        }

        WebUtils.renderString(response, JSON.toJSONString(result));
    }
}
