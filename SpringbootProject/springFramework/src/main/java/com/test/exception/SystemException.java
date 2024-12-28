package com.test.exception;

import com.test.enums.HttpCodeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemException extends RuntimeException {
    private int code;
    private String msg;
    private HttpCodeEnum enums;

    public SystemException(HttpCodeEnum enums) {
        super(enums.getMsg());
        this.code = enums.getCode();
        this.msg = enums.getMsg();
        this.enums = enums;
    }

    public SystemException(HttpCodeEnum httpCodeEnum, String message) {
        super(message);
        this.code = httpCodeEnum.getCode();
        this.msg = message;
        this.enums = httpCodeEnum;
    }

    public SystemException(HttpCodeEnum httpCodeEnum, String message, Throwable cause) {
        super(message, cause);
        this.code = httpCodeEnum.getCode();
        this.msg = message;
        this.enums = httpCodeEnum;
    }
}
