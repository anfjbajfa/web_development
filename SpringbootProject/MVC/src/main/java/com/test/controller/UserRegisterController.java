package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;
import com.test.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/register")
public class UserRegisterController {
    @Autowired
    private UserRegisterService userRegisterService;

    //不用权限
    @PostMapping("/login/register")
    public ResponseResult<Void> userRegister(@Validated @RequestBody UserRegisterDTO userRegisterDTO){
        return userRegisterService.register(userRegisterDTO);
    }

    @PostMapping("/sendVerificationCode")
    public ResponseResult<Void> sendVerificationCode(@RequestParam String phone){
        System.out.println("Received phone number: " + phone);
        return userRegisterService.sendVerificationCode(phone);
    }

}
