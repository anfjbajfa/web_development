package com.test.enums;

import com.alibaba.fastjson.annotation.JSONCreator;
import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.Getter;

@Getter
public enum OrderStatusEnum {
    pending(1),
    processing(2),
    completed(3),
    canceled(4);

    @EnumValue // MyBatis-Plus 注解，用于数据库映射
    @JSONField(serialize = true)
    private final int code;

    OrderStatusEnum(int code) {
        this.code = code;
    }

    @JSONField(serialize = true)
    public int getCode() {
        return code;
    }
}
