package com.test.utils;

import com.alibaba.excel.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.Config.SmsConfig;
import com.test.domain.entity.User;
import com.test.enums.HttpCodeEnum;
import com.test.exception.SystemException;
import com.test.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@EnableConfigurationProperties(SmsConfig.class)
public class SmsUtils {

    @Autowired
    private SmsConfig smsConfig;

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;
    // 短信验证码在 Redis 中的前缀
    private static final String SMS_CODE_PREFIX = "sms:code:";
    // 验证码有效期，单位为分钟
    private static final long SMS_CODE_EXPIRE_MINUTES = 5;

    //短信API产品名称（短信产品名固定，无需修改）
    private final String product = "Dysmsapi";
    //短信API产品域名（接口地址固定，无需修改）
    private final String domain = "dysmsapi.aliyuncs.com";
    //发送短信最小间隔（分钟）
    private static final Long SMS_MIN_INTERVAL_MINUTE = 60000L;
    //短信手机号保存到 Redis 中的前缀
    private static final String SMS_PER = "sms:phone:";


    public void sendVerificationCode(String phone) {
//        LambdaQueryWrapper<User> samePhoneWrapper = new LambdaQueryWrapper<>();
//        samePhoneWrapper.eq(User::getPhone, phone);
//        User user = userMapper.selectOne(samePhoneWrapper);
//        Assert.isNull(user,HttpCodeEnum.PHONENUMBER_EXIST);
        // 生成6位随机验证码
        String verificationCode = String.format("%06d", new Random().nextInt(999999));
        System.out.println(verificationCode);
        // 发送短信（调用您之前的发送短信方法）
        // 构建模板参数，包含所有需要替换的变量
        // 创建一个JSONObject对象
        JSONObject templateParam = new JSONObject();
        // 添加键值对
        templateParam.put("code", verificationCode);
        templateParam.put("time", 5);

        // 将JSONObject转换为字符串
        String templateParamString = templateParam.toJSONString();
        SendSmsResponse response = sendSms(phone, smsConfig.getSignName(),smsConfig.getTemplateCode() , templateParamString);

        if (response == null || !"OK".equals(response.getCode())) {
            throw new SystemException(HttpCodeEnum.SMS_SEND_FAIL);
        }

        // 将验证码存储到 Redis 中，设置过期时间
        String redisKey = SMS_CODE_PREFIX + phone;
        redisTemplate.opsForValue().set(redisKey, verificationCode, SMS_CODE_EXPIRE_MINUTES, TimeUnit.MINUTES);
    }

    /**
     * 发送短信
     * @param phoneNumber       手机号码
     * @param signName          短信签名
     * @param templateCode      短信模板code
     * @param templateParamString     短信模板参数
     * @return  SendSmsResponse 响应体
     * @throws com.test.exception.SystemException
     */
    public SendSmsResponse sendSms(String phoneNumber, String signName, String templateCode, String templateParamString) {

        // 限流，限制1分钟内不能重复发送短信
        String verifyTimeStr = redisTemplate.opsForValue().get(phoneNumber);
        if (StringUtils.isNotBlank(verifyTimeStr)){
            Long verifyTime = Long.valueOf(verifyTimeStr);
            if (System.currentTimeMillis() - verifyTime < SMS_MIN_INTERVAL_MINUTE){
                return null;
            }
        }

        try{
            //设置超时时间-可自行调整
            System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
            System.setProperty("sun.net.client.defaultReadTimeout", "10000");
            //初始化ascClient,暂时不支持多region（请勿修改）
            IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou",
                    smsConfig.getAccessKeyId(), smsConfig.getAccessKeySecret());
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
            IAcsClient acsClient = new DefaultAcsClient(profile);
            //组装请求对象
            SendSmsRequest request = new SendSmsRequest();
            //使用post提交
            request.setMethod(MethodType.POST);
            //必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为国际区号+号码，如“85200000000”
            request.setPhoneNumbers(phoneNumber);
            //必填:短信签名-可在短信控制台中找到
            request.setSignName(signName);
            //必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
            request.setTemplateCode(templateCode);
            //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
            //友情提示:如果JSON中需要带换行符,请参照标准的JSON协议对换行符的要求,比如短信内容中包含\r\n的情况在JSON中需要表示成\\r\\n,否则会导致JSON在服务端解析失败
            request.setTemplateParam(templateParamString);
            //请求失败这里会抛ClientException异常
            SendSmsResponse response  = acsClient.getAcsResponse(request);
            if (!StringUtils.equals("OK", response.getCode())){
                log.info("[短信服务] 发送短息失败，手机号码：{} ，原因：{}", phoneNumber, response.getMessage());
            }
            // 发送短信成功，写入redis，设置生存时间为1分钟
            redisTemplate.opsForValue().set(SMS_PER + phoneNumber, String.valueOf(System.currentTimeMillis()), 5, TimeUnit.MINUTES);

            return response;
        } catch (Exception e){
            log.error("[短信服务] 发送短息异常，手机号码：{}", phoneNumber, e);
            return null;
        }

    }


    /**
     * 验证短信验证码
     *
     * @param phoneNumber       手机号码
     * @param verificationCode  用户输入的验证码
     */
    public void validateVerificationCode(String phoneNumber, String verificationCode) {
        // 从 Redis 中获取验证码
        String redisKey = SMS_CODE_PREFIX + phoneNumber;
        String codeInRedis = redisTemplate.opsForValue().get(redisKey);

        // 验证验证码是否存在
        if (StringUtils.isBlank(codeInRedis)) {
            throw new SystemException(HttpCodeEnum.VERIFICATION_CODE_NOT_EXIST);
        }

        // 验证验证码是否正确
        if (!StringUtils.equals(codeInRedis, verificationCode)) {
            throw new SystemException(HttpCodeEnum.VERIFICATION_CODE_ERROR);
        }

        // 验证通过后，删除 Redis 中的验证码（防止重复使用）
        redisTemplate.delete(redisKey);
    }

}
