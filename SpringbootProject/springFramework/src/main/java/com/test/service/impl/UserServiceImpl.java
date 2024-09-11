package com.test.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.constant.SystemConstants;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserDTO;
import com.test.domain.entity.User;
import com.test.domain.vo.UserInfoVo;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.mapper.UserMapper;
import com.test.service.UserService;
import com.test.utils.BeanCopyUtils;
import com.test.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.test.utils.Assert;

import java.util.List;

import static com.baomidou.mybatisplus.extension.toolkit.SimpleQuery.selectList;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService  {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;

    //用于获得当前登陆者的信息
    @Override
    public ResponseResult<UserInfoVo> getUserInfo() {
        Long userId = SecurityUtils.getUserId();
        User user = getById(userId);
        if (user != null)
            return ResponseResult.successResult(BeanCopyUtils.copyBean(user, UserInfoVo.class));

        return ResponseResult.errorResult(HttpCodeEnum.NEED_LOGIN.getCode(), HttpCodeEnum.NEED_LOGIN.getMsg());
    }

    //用于获得所有用户的信息
    @Override
    public ResponseResult<List<User>> getAllUsers() {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getType,0);
        List<User> users = userMapper.selectList(wrapper);
        return ResponseResult.successResult(users);
    }

    //获取管理员用户
    @Override
    public ResponseResult<UserInfoVo> getAdminInfo() {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getType, SystemConstants.ADMIN_USER);
        User user = getOne(wrapper, false);
        return ResponseResult.successResult(BeanCopyUtils.copyBean(user, UserInfoVo.class));
    }

    @Override
    public ResponseResult register(User user) {
        // 查询用户是否已经存在
        LambdaQueryWrapper<User> sameNameWrapper = new LambdaQueryWrapper<>();
        sameNameWrapper.eq(User::getUserName, user.getUserName());
        User sameNameUser = getOne(sameNameWrapper);
        Assert.isNull(sameNameUser, HttpCodeEnum.USERNAME_EXIST);

        // 查询邮箱是否已经存在
        LambdaQueryWrapper<User> sameEmailWrapper = new LambdaQueryWrapper<>();
        sameEmailWrapper.eq(User::getEmail, user.getEmail());
        User sameEmailUser = getOne(sameEmailWrapper);
        Assert.isNull(sameEmailUser, HttpCodeEnum.EMAIL_EXIST);

        //查询是否已经有admin存在
        LambdaQueryWrapper<User> checkAdminWrapper = new LambdaQueryWrapper<>();
        checkAdminWrapper.eq(User::getType, SystemConstants.ADMIN_USER);
        List<User> adminUsers = userMapper.selectList(checkAdminWrapper);
        Assert.isTwo(adminUsers.size(), HttpCodeEnum.ADMIN_EXIST);

        // 添加用户
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        save(user);
        return new ResponseResult();
    }

    @Override
    public ResponseResult<User> updateUserInfo(UserDTO user) {
        LambdaQueryWrapper<User> sameEmailWrapper = new LambdaQueryWrapper<>();
        sameEmailWrapper.eq(User::getEmail, user.getEmail());
        User sameEmailUser = getOne(sameEmailWrapper);
        if (sameEmailUser != null && !user.getId().equals(sameEmailUser.getId())) {
            throw new SystemException(HttpCodeEnum.EMAIL_EXIST);
        }

        updateById(BeanCopyUtils.copyBean(user, User.class));
        return new ResponseResult();
    }


}
