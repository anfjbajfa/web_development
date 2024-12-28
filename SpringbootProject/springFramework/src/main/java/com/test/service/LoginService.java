package com.test.service;

import com.test.domain.ResponseResult;
import com.test.domain.dto.LoginUserDTO;
import com.test.domain.vo.UserLoginVo;

public interface LoginService {
    ResponseResult<UserLoginVo> login(LoginUserDTO user);
    ResponseResult<Void> logout();
}
