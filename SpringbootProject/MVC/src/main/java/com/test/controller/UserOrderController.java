package com.test.controller;

import com.test.domain.ResponseResult;
import com.test.domain.dto.UserOrderDTO;
import com.test.domain.entity.Order;
import com.test.domain.vo.UserOrderVo;
import com.test.enums.OrderStatusEnum;
import com.test.service.UserOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class UserOrderController {
    @Autowired
    private UserOrderService userOrderService;

    @PostMapping("/submitOrder")
    @PreAuthorize("hasAuthority('submit_order')")
    public ResponseResult<Void> addOrder(@RequestBody @Valid UserOrderDTO uod) {
        System.out.println("Request received: " + uod);
        return userOrderService.AddOrder(uod);
    }

    @PostMapping("/updateOrder")
    public ResponseResult<Order> updateOrder(Order order) {
        return userOrderService.UpdateOrder(order);
    }

    @PostMapping("/getOrder")
    @PreAuthorize("hasAuthority('get_order')")
    public ResponseResult<UserOrderVo> getOrder(@RequestBody String phone) {
        return userOrderService.GetOrder(phone);
    }

//    admin专有方法 ----------------------------------------------------------------------
    @GetMapping("/getAllOrders")
    @PreAuthorize("hasAuthority('get_all_orders')")
    public ResponseResult<List<Order>> getAllOrders(){

        return userOrderService.GetAllOrders();
    }

//    通过轮询机制来获得pending订单来返回给admin前端
    @GetMapping("/getPendingCount")
    @PreAuthorize("hasAuthority('get_all_orders')")
    public ResponseResult<Integer> getPendingCount(){
        return userOrderService.GetPendingCount();
    }

    @PostMapping("/updateOrderStatus")
    @PreAuthorize("hasAuthority('get_all_orders')")
    public ResponseResult<Void> updateOrderStatus(@RequestBody Map<String, OrderStatusEnum> request){
        Long orderId = Long.valueOf(request.get("orderId").toString());
        OrderStatusEnum newStatus = request.get("newStatus");
        return userOrderService.UpdateOrderStatus(orderId,newStatus);
    }

}
