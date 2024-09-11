package com.test.enums;

@SuppressWarnings("all")
public enum
HttpCodeEnum {
    SUCCESS(200, "操作成功"),
    NEED_LOGIN(401, "需要登录后操作"),
    NO_OPERATOR_AUTH(403, "无权限操作"),
    RESOURCE_NOT_EXIST(404, "请求的资源不存在"),

    SYSTEM_ERROR(500, "出现错误"),
    USERNAME_EXIST(501, "用户名已存在"),
    PHONENUMBER_EXIST(502, "手机号已存在"),
    EMAIL_EXIST(503, "邮箱已存在"),
    LOGIN_ERROR(504, "用户名或密码错误"),
    REQUIRE_USER_INFO(505, "用户信息不能为空"),
    PARAM_NOT_VALID(506, "请求参数非法"),
    DATE_NOT_VALID(507, "日期格式非法"),
    ADMIN_EXIST(508,"只允许有一个管理员存在");

    private final int code;
    private final String msg;

    HttpCodeEnum(int code, String msg) {
        this.code =code;
        this.msg = msg;
    }
    public int getCode() {return code;}
    public String getMsg() {return msg;}
}
