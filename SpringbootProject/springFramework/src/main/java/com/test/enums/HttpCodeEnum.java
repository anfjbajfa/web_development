package com.test.enums;

@SuppressWarnings("all")
public enum HttpCodeEnum {
    SUCCESS(200, "操作成功"),
//    客户端相关
    BAD_REQUEST(400, "请求参数错误"),
    NEED_LOGIN(401, "需要登录后操作"),
    NO_OPERATOR_AUTH(403, "无权限操作"),
    RESOURCE_NOT_EXIST(404, "请求的资源不存在"),
    SYSTEM_ERROR(500, "出现错误"),
    USERNAME_EXIST(501, "用户名已存在"),
    USERNAME_NOT_EXIST(501,"用户不存在"),

    EMAIL_EXIST(503, "邮箱已存在"),
    LOGIN_ERROR(504, "用户名或密码错误"),
    PARAM_NOT_VALID(506, "请求参数非法"),
    DATE_NOT_VALID(507, "日期格式非法"),
    ADMIN_EXIST(508,"只允许有三个管理员存在"),
    INTERNAL_SERVER_ERROR(509,"系统错误"),
//    注册相关的
    PHONENUMBER_EXIST(502, "手机号已存在"),
    WRONG_PHONE_NUMBER(502,"手机号错误"),
    SMS_SEND_FAIL(510,"验证码发送失败"),
    VERIFICATION_CODE_NOT_EXIST(511, "验证码不存在或已过期"),
    VERIFICATION_CODE_ERROR(512, "验证码错误"),

//    订单相关的
    ORDER_NOT_EXIST(601,"订单不存在");

    private final int code;
    private final String msg;

    HttpCodeEnum(int code, String msg) {
        this.code =code;
        this.msg = msg;
    }
    public int getCode() {return code;}
    public String getMsg() {return msg;}
}
