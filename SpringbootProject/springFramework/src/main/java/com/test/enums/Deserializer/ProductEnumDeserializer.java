package com.test.enums.Deserializer;

import com.alibaba.fastjson.parser.DefaultJSONParser;
import com.alibaba.fastjson.parser.deserializer.ObjectDeserializer;
import com.test.enums.ProductEnum;

import java.lang.reflect.Type;

public class ProductEnumDeserializer implements ObjectDeserializer {
    @Override
    public ProductEnum deserialze(DefaultJSONParser parser, Type type, Object fieldName) {
        Object value = parser.parseObject(Object.class); // 可以解析任何类型
        if (value instanceof Integer) {
            Integer code = (Integer) value;
            for (ProductEnum product : ProductEnum.values()) {
                if (product.getCode() == code) {
                    return product;
                }
            }
            throw new IllegalArgumentException("Invalid ProductEnum code: " + code);
        } else if (value instanceof String) {
            String name = (String) value;
            for (ProductEnum product : ProductEnum.values()) {
                if (product.name().equals(name)) {
                    return product;
                }
            }
            throw new IllegalArgumentException("Invalid ProductEnum name: " + name);
        }
        throw new IllegalArgumentException("Unsupported type for ProductEnum: " + value);
    }

    @Override
    public int getFastMatchToken() {
        return 2; // JSONToken.LITERAL_INT
    }

}
