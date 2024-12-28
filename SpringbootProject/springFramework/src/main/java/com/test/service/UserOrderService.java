package com.test.service;

import com.test.domain.ResponseResult;
import com.test.domain.dto.UserOrderDTO;
import com.test.domain.entity.Order;
import com.test.domain.vo.UserOrderVo;
import com.test.enums.OrderStatusEnum;

import java.util.List;

public interface UserOrderService {
    ResponseResult<Void> AddOrder(UserOrderDTO uto);
    ResponseResult<Order> UpdateOrder(Order order);
    ResponseResult<UserOrderVo> GetOrder(String phone);
    ResponseResult<List<Order>> GetAllOrders();
    ResponseResult<Integer> GetPendingCount();
    ResponseResult<Void> UpdateOrderStatus(Long orderId, OrderStatusEnum newStatus);
}
