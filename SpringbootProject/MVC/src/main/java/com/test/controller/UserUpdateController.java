package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;
import com.test.service.UserUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(("/updateUserInfo"))
public class UserUpdateController {
    @Autowired
    private UserUpdateService userUpdateService;
    @PostMapping("/updatePassword")
    @PreAuthorize("hasAuthority('update_user_password')")
    public ResponseResult<Void> updatePassword(@RequestBody UserRegisterDTO udt) {
        return userUpdateService.updatePassword(udt);
    }
}
