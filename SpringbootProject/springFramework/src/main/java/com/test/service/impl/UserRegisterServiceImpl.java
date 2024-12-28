package com.test.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.constant.SystemConstants;
import com.test.domain.ResponseResult;

import com.test.domain.dto.UserRegisterDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.mapper.UserMapper;
import com.test.mapper.UserRoleMapper;
import com.test.service.UserRegisterService;

import com.test.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserRegisterServiceImpl extends ServiceImpl<UserMapper, User> implements UserRegisterService  {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private SmsUtils smsUtils;
    @Autowired
    private UserRoleMapper userRoleMapper;

    @Override
    public ResponseResult<Void> sendVerificationCode(String phone) {
        if(phone.length() != 11) {
            throw new SystemException(HttpCodeEnum.WRONG_PHONE_NUMBER);
        }

        // 发送验证码
        smsUtils.sendVerificationCode(phone);
        return ResponseResult.success();
    }

    // 注册用户
    @Override
    @Transactional
    public ResponseResult<Void> register(UserRegisterDTO userRegisterDTO) {
        // 验证验证码
//        smsUtils.validateVerificationCode(userRegisterDTO.getPhone(), userRegisterDTO.getVerificationCode());

        // 查询用户是否已经存在
        LambdaQueryWrapper<User> samePhoneWrapper = new LambdaQueryWrapper<>();
        samePhoneWrapper.eq(User::getPhone, userRegisterDTO.getPhone());
        User samePhoneUser = getOne(samePhoneWrapper);
        Assert.isNull(samePhoneUser, HttpCodeEnum.PHONENUMBER_EXIST);

        // 查询是否已经有指定数量的admin存在
        LambdaQueryWrapper<User> checkAdminWrapper = new LambdaQueryWrapper<>();
        checkAdminWrapper.eq(User::getType, SystemConstants.ADMIN_USER);
        List<User> adminUsers = userMapper.selectList(checkAdminWrapper);
        Assert.isThree(adminUsers.size(), HttpCodeEnum.ADMIN_EXIST);

        // 添加用户
        User user = BeanCopyUtils.copyBean(userRegisterDTO, User.class,"createBy","createTime","updateBy","updateTime");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 生成长度为7的随机字符串并检查唯一性
        String randomStr;
        LambdaQueryWrapper<User> sameRandomStrWrapper;
        do {
            randomStr = RandomStringGeneratorUtil.generateRandomString(7);
            sameRandomStrWrapper = new LambdaQueryWrapper<>();
            sameRandomStrWrapper.eq(User::getRandomString, randomStr);}
        while(getOne(sameRandomStrWrapper) != null);

        user.setRandomString(randomStr);
        userMapper.insert(user);

        userRoleMapper.insertUserRole(user.getId(),user.getType());
        return ResponseResult.success();
    }
}