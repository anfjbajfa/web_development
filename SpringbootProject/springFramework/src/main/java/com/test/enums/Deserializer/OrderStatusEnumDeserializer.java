package com.test.enums.Deserializer;

import com.alibaba.fastjson.parser.DefaultJSONParser;
import com.alibaba.fastjson.parser.deserializer.ObjectDeserializer;
import com.test.enums.OrderStatusEnum;
import com.test.enums.ProductEnum;

import java.lang.reflect.Type;

public class OrderStatusEnumDeserializer implements ObjectDeserializer {

    @Override
    public OrderStatusEnum deserialze(DefaultJSONParser parser, Type type, Object o) {
        Object value = parser.parseObject(Object.class);
        if (value instanceof Integer) {
            Integer code = (Integer) value;
            for (OrderStatusEnum orderstatus : OrderStatusEnum.values()) {
                if (orderstatus.getCode() == code) {
                    return orderstatus;
                }
            }
            throw new IllegalArgumentException("Invalid orderStatusEnum code: " + code);
        } else if (value instanceof String){
            String name = (String) value;
            for (OrderStatusEnum orderStatus: OrderStatusEnum.values()){
                if(orderStatus.name().equals(name)){
                    return orderStatus;
                }
            }
            throw new IllegalArgumentException("Invalid orderStatusEnum name: " + name);
        }
        throw new IllegalArgumentException("Unsupported type for orderStatusEnum: " + value);
    }

    @Override
    public int getFastMatchToken() {
        return 2;
    }
}
