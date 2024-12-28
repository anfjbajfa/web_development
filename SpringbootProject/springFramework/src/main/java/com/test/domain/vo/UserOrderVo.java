package com.test.domain.vo;

import com.test.enums.OrderStatusEnum;
import com.test.enums.ProductEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderVo {
    private String fullName;

    private OrderStatusEnum status;

    private String email;

    private ProductEnum product;

    private String projectName;

    private String issue;

    private Date createTime;

}
