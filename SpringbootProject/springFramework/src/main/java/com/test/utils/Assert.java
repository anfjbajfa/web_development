package com.test.utils;

import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import org.springframework.lang.Nullable;

public class Assert {
    private Assert() {
    }

    /**
     * 断言对象不为空，为空则抛出异常
     *
     * @param object       对象
     * @param httpCodeEnum 状态码枚举类
     * @throws SystemException 系统异常
     */
    public static void notNull(@Nullable Object object, HttpCodeEnum httpCodeEnum) {
        if (object == null) {
            throw new SystemException(httpCodeEnum);
        }
    }

    /**
     * 断言对象为空，否则抛出异常(不为空抛出异常)
     *
     * @param object       对象
     * @param httpCodeEnum 状态码枚举类
     * @throws SystemException 系统异常
     */
    public static void isNull(Object object, HttpCodeEnum httpCodeEnum) {
        if (object != null) {
            throw new SystemException(httpCodeEnum);
        }
    }

    /**
     * 断言标志为真
     * @param flag 标志
     * @param httpCodeEnum 状态码枚举类
     * @throws SystemException 系统异常
     */
    public static void isTrue(boolean flag, HttpCodeEnum httpCodeEnum) {
        if (!flag) {
            throw new SystemException(httpCodeEnum);
        }
    }

    /**
     * 断言标志数量大于等于2 返回错误
     * @param countAdmin 标志
     * @param httpCodeEnum 状态码枚举类
     * @throws SystemException 系统异常
     */
    public static void isTwo(int countAdmin, HttpCodeEnum httpCodeEnum) {
        if (countAdmin>=2) {
            throw new SystemException(httpCodeEnum);
        }
    }

}