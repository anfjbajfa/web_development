package com.test.enums;

import com.alibaba.fastjson.annotation.JSONCreator;
import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.Getter;

@Getter
public enum ProductEnum {
    工程测绘(1),
    线与不动产测绘(2),
    地理信息系统工程(3),
    两项或者以上(4),
    其他(5);

    @EnumValue // MyBatis-Plus 注解，用于数据库映射
    @JSONField(serialize = true)
    private final int code;

    ProductEnum(int code) {
        this.code = code;
    }

    @JSONField(serialize = true)
    public int getCode() {
        return code;
    }

}