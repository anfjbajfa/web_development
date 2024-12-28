package com.test.service;


import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;

public interface UserUpdateService {
    ResponseResult<Void> updatePassword(UserRegisterDTO user);
}
