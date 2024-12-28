package com.test.domain.dto;

import com.test.enums.GenderEnum;
import com.test.enums.OrderStatusEnum;
import com.test.enums.ProductEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
//对于charSequence（string）的数据，要使用@notBlank;其他的类型要使用@notnull
public class UserOrderDTO {
//    前端并没有传user_id,因此需要业务逻辑中自己set
    @NotNull(message = "敬称不能为空(男士M或女士F)")
    private GenderEnum gender;

    @NotBlank(message = "电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "请输入有效的中国手机号")
    private String phone;

    @NotBlank(message = "形式不能为空")
    @Size(max = 20, message = "姓名不能超过20个字符")
    private String fullName;

    private int userId;

    @NotNull(message = "必须要定义一个状态")
    private OrderStatusEnum status;

    @Email(message = "邮件名形式不匹配")
    @Nullable
    private String email;

    @NotNull(message = "必须选择一项")
    private ProductEnum product;

    @NotBlank(message = "必须填写项目名称")
    @Size(max = 50, message = "项目名称不能超过50个字符")
    private String projectName;

    @Nullable
    private String issue;

    @Nullable
    private boolean newsletter;
}
