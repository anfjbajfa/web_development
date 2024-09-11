package com.test.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.domain.entity.LoginUser;
import com.test.domain.entity.User;
import com.test.enums.HttpCodeEnum;
import com.test.mapper.AccessMapper;
import com.test.mapper.UserMapper;
import com.test.utils.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AccessMapper accessMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserName, userName);
        User user = userMapper.selectOne(queryWrapper);
        Assert.notNull(user, HttpCodeEnum.LOGIN_ERROR);


        List<String> permissions = accessMapper.selectPermissionsByUserId(user.getId());
        return new LoginUser(user, permissions);
    }

//    AbstractUserDetailsAuthenticationProvider
//    ProviderManager
//    UsernamePasswordAuthenticationToken
}
