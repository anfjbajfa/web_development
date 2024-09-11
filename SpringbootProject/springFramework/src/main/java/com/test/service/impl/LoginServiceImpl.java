package com.test.service.impl;

import com.test.constant.SystemConstants;
import com.test.domain.ResponseResult;
import com.test.domain.dto.LoginUserDTO;
import com.test.domain.entity.LoginUser;
import com.test.domain.vo.UserLoginVo;
import com.test.domain.vo.UserInfoVo;
import com.test.enums.HttpCodeEnum;
import com.test.service.LoginService;
import com.test.utils.Assert;
import com.test.utils.BeanCopyUtils;
import com.test.utils.JwtUtil;
import com.test.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;

    @Override
    public ResponseResult login(LoginUserDTO user) {
        // 验证用户名和密码
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        Assert.notNull(authentication, HttpCodeEnum.LOGIN_ERROR);

        // 将用户信息存入 redis
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String userId = loginUser.getUser().getId().toString();
        String token = JwtUtil.createJWT(userId);
        redisCache.setCacheObject(SystemConstants.REDIS_USER_ID_PREFIX + userId, loginUser);   //以键值对的形式存储

        // 将 token 和用户信息返回给用户
        UserInfoVo userInfo = BeanCopyUtils.copyBean(loginUser.getUser(), UserInfoVo.class);
        userInfo.setIsAdmin(SystemConstants.ADMIN_USER.equals(loginUser.getUser().getType()));   //判断是用户登录还是管理员登录并告诉前端
        UserLoginVo userLoginVo = new UserLoginVo(token, userInfo);
        return ResponseResult.successResult(userLoginVo);
    }

    @Override
    public ResponseResult logout() {
        // 获取 userId
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String userId = loginUser.getUser().getId().toString();

        // 从 redis 中删除用户信息
        redisCache.deleteObject(SystemConstants.REDIS_USER_ID_PREFIX + userId);
        return new ResponseResult();
    }
}
