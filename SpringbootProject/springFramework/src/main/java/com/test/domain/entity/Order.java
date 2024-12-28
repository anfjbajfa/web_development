package com.test.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.test.enums.GenderEnum;
import com.test.enums.OrderStatusEnum;
import com.test.enums.ProductEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("orders")
public class Order implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;

    @NotBlank(message = "电话必能为空")
    private String phone;

    @NotNull(message = "user_id不能为空")
    private int userId;

    @NotNull(message = "敬称不能为空(男士sir或女士lady)")
    private GenderEnum gender;

    @NotBlank(message = "形式不能为空")
    @Size(max = 20, message = "姓名不能超过20个字符")
    private String fullName;

    @NotNull(message = "必须要定义一个状态")
    private OrderStatusEnum status;

    @Email(message = "邮件名形式不匹配")
    @Nullable
    private String email;

    @NotNull(message = "必须选择一项服务")
    private ProductEnum product;

    @NotBlank(message = "必须填写项目名称")
    @Size(max = 50, message = "项目名称不能超过50个字符")
    private String projectName;

//    @Nullable
//    private String imagePath;

    @Nullable
    private String issue;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(fill = FieldFill.UPDATE)
    private Date updateTime;

    @Nullable
    private boolean newsletter;
}
