package com.test.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class UserOrderControllerLoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(UserOrderControllerLoggingAspect.class);


    @Pointcut("execution(* com.test.controller.UserOrderController.addOrder(..))")
    public void controllerMethods() {}


    @Before("controllerMethods() && @annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void logBeforeAddOrder(JoinPoint joinPoint) {
        // 获取当前的 HttpServletRequest
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
            logger.info("LoggingAspect: Request class - {}", request.getClass().getName());

            if (request instanceof CachedBodyHttpServletRequest) {
                CachedBodyHttpServletRequest cachedRequest = (CachedBodyHttpServletRequest) request;
                try {
                    String rawJson = StreamUtils.copyToString(cachedRequest.getInputStream(), StandardCharsets.UTF_8);
                    logger.info("Raw JSON received: {}", rawJson);
                } catch (IOException e) {
                    logger.error("读取 addOrder 请求体失败", e);
                }
            } else {
                logger.warn("Request is not an instance of CachedBodyHttpServletRequest.");
            }
        } else {
            logger.warn("RequestAttributes is not an instance of ServletRequestAttributes.");
        }
    }
}
