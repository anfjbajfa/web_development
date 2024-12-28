package com.test.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.domain.ResponseResult;
import com.test.domain.dto.UserOrderDTO;
import com.test.domain.entity.Order;
import com.test.domain.entity.User;
import com.test.domain.vo.UserOrderVo;
import com.test.enums.HttpCodeEnum;
import com.test.enums.OrderStatusEnum;
import com.test.exception.SystemException;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserMapper;
import com.test.service.UserOrderService;
import com.test.service.UserQueryService;
import com.test.utils.BeanCopyUtils;
import com.test.mapper.OrderQueryMapper;
import com.test.utils.RedisCache;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static com.test.constant.SystemConstants.REDIS_ORDER_PREFIX;


@Service
public class UserOrderServiceImpl extends ServiceImpl<UserMapper, User> implements UserOrderService{

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderQueryMapper orderQueryMapper;
    @Autowired
    private RedisCache redisCache;
    @Override
    public ResponseResult<Void> AddOrder(UserOrderDTO uto) {
//      创建查询条件
        LambdaQueryWrapper<User> samePhoneWrapper = new LambdaQueryWrapper<>();
        samePhoneWrapper.eq(User::getPhone, uto.getPhone());
//        找到对应的user
        User user = getOne(samePhoneWrapper);
        if(user == null){
            throw new SystemException(HttpCodeEnum.USERNAME_NOT_EXIST);
        }
//        将外键userId设置到uto中
        uto.setUserId((int)user.getId().longValue());
//        设置每个用户最多只能添加两个订单
        LambdaQueryWrapper<Order> sameOrdersWrapper = new LambdaQueryWrapper<>();
        sameOrdersWrapper.eq(Order::getUserId,uto.getUserId());
        Long ordersCount  =orderMapper.selectCount(sameOrdersWrapper);
        if(ordersCount>=2) {
            throw new SystemException(HttpCodeEnum.PARAM_NOT_VALID,"每个用户最多只能创建1个需求订单");
        } else {
            Order o = BeanCopyUtils.copyBean(uto, Order.class);
            orderMapper.insert(o);
            return ResponseResult.success();
        }
    }

    @Override
    public ResponseResult<Order> UpdateOrder(Order order) {
        return null;
    }

    @Override
    public ResponseResult<UserOrderVo> GetOrder(String phone) {
        String orderCacheKey = REDIS_ORDER_PREFIX + phone;
        UserOrderVo uov = redisCache.getCacheObject(orderCacheKey);
        if(uov!=null){
            return ResponseResult.success(uov);
        }
        uov =  orderQueryMapper.selectOrdersByPhone(phone);

        if(uov!=null){
//            将数据存入redis，设置过期时长为1小时，过后自动删除
            redisCache.setCacheObject(orderCacheKey,uov,1, TimeUnit.HOURS);
        }
        return ResponseResult.success(uov);
    }
    @Override
    public ResponseResult<List<Order>> GetAllOrders(){
//        访问需求不大 并且需要经常modify的就不要存入redis中,直接对数据库进行操作
        return ResponseResult.success(orderMapper.selectList(null));
    }

    @Override
    public ResponseResult<Integer> GetPendingCount(){
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Order::getStatus, OrderStatusEnum.pending);
        Integer count = Math.toIntExact(orderMapper.selectCount(wrapper));
        System.out.println(count);
        return ResponseResult.success(count);
    }

    @Override
    public ResponseResult<Void> UpdateOrderStatus(Long orderId, OrderStatusEnum newStatus){
        Order order = orderMapper.selectById(orderId);
        if(order==null) {
            throw new SystemException(HttpCodeEnum.ORDER_NOT_EXIST);
        }
        order.setStatus(newStatus);
        orderMapper.updateById(order);
        return ResponseResult.success();
    }

}
