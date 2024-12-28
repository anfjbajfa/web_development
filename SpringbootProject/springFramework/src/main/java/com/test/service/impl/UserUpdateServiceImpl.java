package com.test.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserRegisterDTO;
import com.test.enums.HttpCodeEnum;
import com.test.mapper.UserMapper;
import com.test.service.UserUpdateService;
import com.test.utils.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.test.domain.entity.User;
import com.test.utils.SmsUtils;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Null;

@Service
public class UserUpdateServiceImpl implements UserUpdateService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private SmsUtils smsUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ResponseResult<Void> updatePassword(UserRegisterDTO userRegisterDTO) {
        // 验证验证码
//        smsUtils.validateVerificationCode(userRegisterDTO.getPhone(), userRegisterDTO.getVerificationCode());
        LambdaQueryWrapper<User> phoneWrapper = new LambdaQueryWrapper<>();
        phoneWrapper.eq(User::getPhone,userRegisterDTO.getPhone());
        User selctedUser = userMapper.selectOne(phoneWrapper);
        Assert.notNull(selctedUser,HttpCodeEnum.USERNAME_NOT_EXIST);
        selctedUser.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        userMapper.updateById(selctedUser);
        return ResponseResult.success();
    }

}
