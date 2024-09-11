package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;

import java.util.List;

public interface UserService extends IService<User> {
    ResponseResult<UserInfoVo> getUserInfo();
    ResponseResult<UserInfoVo> getAdminInfo();
    ResponseResult<User> register(User user);
    ResponseResult<User> updateUserInfo(UserDTO user);
    ResponseResult<List<User>> getAllUsers();
}
