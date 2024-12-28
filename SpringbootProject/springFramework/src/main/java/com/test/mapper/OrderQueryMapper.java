package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.test.domain.entity.Order;
import com.test.domain.vo.UserOrderVo;

public interface OrderQueryMapper extends BaseMapper<Order> {
    UserOrderVo selectOrdersByPhone(String phone);
}
