package com.test.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
//前端传来的DTO对象包含手机号和密码
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUserDTO {
    @NotBlank(message = "用户名不能为空")
    private String phone;

    @NotBlank(message = "密码不能为空")
    private String password;
}
