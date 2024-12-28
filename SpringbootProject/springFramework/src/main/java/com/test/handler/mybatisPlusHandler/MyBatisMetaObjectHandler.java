package com.test.handler.mybatisPlusHandler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class MyBatisMetaObjectHandler implements MetaObjectHandler {

    // 插入操作自动填充
    @Override
    public void insertFill(MetaObject metaObject) {
        // 检查并填充 createTime 字段
        if (metaObject.hasSetter("createTime")) {
            this.strictInsertFill(metaObject, "createTime", Date.class, new Date());
        }
        // 检查并填充 updateTime 字段
        if (metaObject.hasSetter("updateTime")) {
            this.strictInsertFill(metaObject, "updateTime", Date.class, new Date());
        }
        // 如果有 createBy 字段，可以在这里填充（根据您的业务逻辑）
        // this.strictInsertFill(metaObject, "createBy", String.class, getCurrentUserId());
    }

    // 更新操作自动填充
    @Override
    public void updateFill(MetaObject metaObject) {
        // 检查并填充 updateTime 字段
        if (metaObject.hasSetter("updateTime")) {
            this.strictUpdateFill(metaObject, "updateTime", Date.class, new Date());
        }
        // 如果有 updateBy 字段，可以在这里填充（根据您的业务逻辑）
        // this.strictUpdateFill(metaObject, "updateBy", String.class, getCurrentUserId());
    }
}
