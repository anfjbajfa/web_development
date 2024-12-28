package com.test.domain;

import com.test.enums.HttpCodeEnum;

import java.io.Serializable;


public class ResponseResult<T> implements Serializable {
    private int code;
    private String msg;
    private T data;

    // 带响应码、消息和数据的构造方法
    public ResponseResult(int code, String message, T data) {
        this.code = code;
        this.msg = message;
        this.data = data;
    }

    // 成功响应方法：有两种
    // 第一种：只返回状态码和消息
    public static <T> ResponseResult<T> success(){
        return new ResponseResult<>(HttpCodeEnum.SUCCESS.getCode(),HttpCodeEnum.SUCCESS.getMsg(),null);
    }

    //第二种：返回状态码，消息和数据
    public static <T> ResponseResult<T> success(T data) {
        return new ResponseResult<>(HttpCodeEnum.SUCCESS.getCode(), HttpCodeEnum.SUCCESS.getMsg(), data);
    }

    // 错误响应方法，返回状态码和消息
    public static <T> ResponseResult<T> error(HttpCodeEnum enums) {
        return new ResponseResult<>(enums.getCode(), enums.getMsg(),null);
    }
    //为了方便后端异常抛出，可以单独传状态码和消息
    public static <T> ResponseResult<T> error(int code, String msg) {
        return new ResponseResult<>(code,msg,null);
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
