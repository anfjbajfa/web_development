package com.test.service;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;
import java.util.List;

public interface UserQueryService {
    ResponseResult<User> updateUserInfo(UserRegisterDTO user);
    ResponseResult<List<User>> getAllUsers();
    ResponseResult<UserInfoVo> getUserInfo();
}
