package com.test.utils;

import java.security.SecureRandom;

public class RandomStringGeneratorUtil {
    /**
     * 生成指定长度的随机字符串（包含字母和数字）
     *
     * @param length 需要生成的字符串长度
     * @return 生成的随机字符串
     */
    public static  String generateRandomString(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(length);
        SecureRandom random = new SecureRandom();
        for(int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
