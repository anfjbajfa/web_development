package com.test.domain;

import com.test.enums.HttpCodeEnum;

import java.io.Serializable;

public class ResponseResult<T> implements Serializable {
    private int code;
    private String msg;
    private T data;

    // 无参构造方法
    public ResponseResult() {
        this.code = HttpCodeEnum.SUCCESS.getCode();
        this.msg = HttpCodeEnum.SUCCESS.getMsg();
    }

    // 带响应码、消息和数据的构造方法
    public ResponseResult(int code, String message, T data) {
        this.code = code;
        this.msg = message;
        this.data = data;
    }

    // 带响应码和消息的构造方法，用于错误时
    public ResponseResult(int code, String message) {
        this.code = code;
        this.msg = message;
    }

    // 成功响应方法
    public static <T> ResponseResult<T> successResult(int code, String message, T data) {
        return new ResponseResult<>(code, message, data);
    }

    public static <T> ResponseResult<T> successResult(T data) {
        return successResult(HttpCodeEnum.SUCCESS.getCode(), HttpCodeEnum.SUCCESS.getMsg(), data);
    }

    // 错误响应方法
    public static <T> ResponseResult<T> errorResult(int code, String message) {
        return new ResponseResult<>(code, message);
    }

    public static <T> ResponseResult<T> errorResult(HttpCodeEnum enums, String message) {
        return new ResponseResult<>(enums.getCode(), message);
    }

    // Getters and Setters

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
