package com.test.service;

import com.test.domain.ResponseResult;
import com.test.domain.dto.LoginUserDTO;

public interface LoginService {
    ResponseResult<Void> login(LoginUserDTO user);
    ResponseResult<Void> logout();
}
