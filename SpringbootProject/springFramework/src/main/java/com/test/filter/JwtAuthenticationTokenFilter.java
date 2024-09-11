package com.test.filter;

import com.test.Config.RedisConfig;
import com.test.domain.entity.LoginUser;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.utils.JwtUtil;
import com.test.utils.RedisCache;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import com.test.constant.SystemConstants;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    private RedisCache redisCache;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            // 获取 token
            String token = request.getHeader("token");
            if (!StringUtils.hasText(token)) {   //没有有效的token时，放行
                filterChain.doFilter(request, response);
                return;
            }

            // 从 redis 中获取用户信息
            String userId;
            try {
                Claims claims = JwtUtil.parseJWT(token);
                userId = claims.getSubject();
            } catch (Exception e) {
                resolveException(request, response);
                return;
            }

            LoginUser loginUser = redisCache.getCacheObject(SystemConstants.REDIS_USER_ID_PREFIX + userId);
//            System.out.println(loginUser.getAuthorities());
            if (loginUser == null) {
                resolveException(request, response);
                return;
            }

            // 将封装的 authentication 放到 SecurityContext 中
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
    }

    private void resolveException(HttpServletRequest request, HttpServletResponse response){
        exceptionResolver.resolveException(request, response, null, new SystemException(HttpCodeEnum.NEED_LOGIN));
    }
}

