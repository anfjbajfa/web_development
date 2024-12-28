package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.dto.LoginUserDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserLoginVo;
import com.test.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseResult<UserLoginVo> login(@RequestBody LoginUserDTO user) {
        return loginService.login(user);
    }

    @PostMapping("/logout")
    public ResponseResult<Void> logout() {
        return loginService.logout();
    }
}
