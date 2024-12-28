package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;
import com.test.domain.entity.User;

public interface UserRegisterService extends IService<User> {

    ResponseResult<Void> register(UserRegisterDTO userR);

    // 发送验证码方法
    ResponseResult<Void> sendVerificationCode(String phone);
}