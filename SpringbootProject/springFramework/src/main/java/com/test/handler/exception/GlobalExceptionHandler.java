package com.test.handler.exception;


import com.test.exception.SystemException;
import com.test.domain.ResponseResult;
import com.test.enums.HttpCodeEnum;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({SystemException.class})
    public ResponseResult<Void> systemExceptionHandler(SystemException e) {
        logger.error("业务异常！代码：{}，消息：{}", e.getCode(), e.getMsg(),e);
        return ResponseResult.error(e.getCode(), e.getMessage());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
    public ResponseResult<Void> methodArgumentNotValidExceptionHandler(BindException e) {
        logger.error("参数校验异常！{}", e.getMessage());
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return ResponseResult.error(HttpCodeEnum.PARAM_NOT_VALID);
    }

    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> generalExceptionHandler(Exception e) throws Exception {
        if (e instanceof AccessDeniedException) {
            logger.error("不允许访问", e);
            return ResponseResult.error(HttpCodeEnum.NO_OPERATOR_AUTH);
        }
        logger.error("系统异常！", e);
        return ResponseResult.error(HttpCodeEnum.INTERNAL_SERVER_ERROR);
    }
}