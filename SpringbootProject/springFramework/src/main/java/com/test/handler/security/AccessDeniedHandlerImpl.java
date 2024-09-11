package com.test.handler.security;

import com.alibaba.fastjson.JSON;
import com.test.domain.ResponseResult;
import com.test.enums.HttpCodeEnum;
import com.test.utils.WebUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e)
            throws IOException, ServletException {
        ResponseResult result = ResponseResult.errorResult(HttpCodeEnum.NO_OPERATOR_AUTH, e.getMessage());
        WebUtils.renderString(response, JSON.toJSONString(result));
    }
}
