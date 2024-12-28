package com.test.domain.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//注册时控制层与服务层的DTO
public class UserRegisterDTO {

    @NotBlank(message = "电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "请输入有效的中国手机号")
    private String phone;

    // 设置默认值为 "2" 并验证只能是 "1" 或 "2"
    @Pattern(regexp = "^[12]$", message = "type 必须为 1 或 2,1是管理员")
    private String type = "2";

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度应在6到20个字符之间")
    private String password;

    @NotBlank(message = "验证码不能为空")
    private String verificationCode;

}

//UserInfoVO (View Object) 用于表示和传递展示层的数据，面向用户界面。
//UserDTO (Data Transfer Object) 用于服务层和持久层之间的数据传输，面向业务处理。