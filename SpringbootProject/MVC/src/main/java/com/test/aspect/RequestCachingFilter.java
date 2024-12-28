package com.test.aspect;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
@Component
@Order(1) // 确保此过滤器优先执行
public class RequestCachingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if(request instanceof HttpServletRequest) {
            CachedBodyHttpServletRequest cachedRequest = new CachedBodyHttpServletRequest((HttpServletRequest) request);
            chain.doFilter(cachedRequest, response);
        } else {
            System.out.println("test");
            chain.doFilter(request, response);
        }
    }
}
