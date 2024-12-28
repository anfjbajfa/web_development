package com.test.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.annotation.JSONCreator;
import lombok.Getter;

//enum类有几种不同的方法
//values(),toString(),valueOf(),name(),comparedTo()
@Getter
@SuppressWarnings("unchecked")
public enum GenderEnum {
//    枚举常量
    M('M'),
    F('F');

    @EnumValue
    private final char abb;

//    构造方法
    GenderEnum(char abb) {
        this.abb = abb;
    }

    @JSONField
    public char getAbb() {
        return abb;
    }

//    这是反序列化的过程，从数据库读取数据转换为java对象
    @JSONCreator  //@JsonCreator作用就是指定反序列化时用的无参构造函数
    public static GenderEnum fromCode(char abb) {
        for (GenderEnum gender : GenderEnum.values()) {
            if (gender.abb == abb) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid gender code: " + abb);
    }
}
