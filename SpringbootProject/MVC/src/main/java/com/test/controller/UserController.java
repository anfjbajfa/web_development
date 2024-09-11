package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;
import com.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //需要登陆权限
    @GetMapping("/getCurrentlyLoginUserInfo")
    @PreAuthorize("hasAuthority('user_login')")
    public ResponseResult<UserInfoVo> getUserInfo(){
        return userService.getUserInfo();
    }

    //需要管理员权限
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasAuthority('admin_login')")
    public ResponseResult<List<User>> getAllUsers(){
        return userService.getAllUsers();
    }

    //不用权限
    @PostMapping("/login/register")
    public ResponseResult userRegister(@Valid @RequestBody User user){
        return userService.register(user);
    }

}
