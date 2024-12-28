SELECT VERSION();
DROP TABLE IF EXISTS `user`;
# 插入user表
CREATE TABLE user(
                     id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
                     phone varchar(11) NOT NULL COMMENT '电话(用户名)',
                     password varchar(100) NOT NULL COMMENT '密码',
                     type char(1) DEFAULT '2' NOT NULL COMMENT '用户类型：2 代表普通用户，1 代表管理员(eg.只能有3个)',
                     random_string char(7) NOT NULL COMMENT '随机生成的用户名',
                     create_time datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                     update_time datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                     create_by varchar(20) DEFAULT NULL COMMENT '创建者',
                     update_by varchar(20) DEFAULT NULL COMMENT '更新者'
) ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# INSERT INTO user(phone, password, random_string) VALUES("1234567","1858175157","abcdefg");

# SHOW TABLES;
# DESCRIBE TABLE user;
# SELECT * FROM user;

# 需要update表中的内容，让phone值唯一
ALTER TABLE user MODIFY phone VARCHAR(11) UNIQUE;
# 查看历史记录
SHOW CREATE TABLE user;



DROP TABLE IF EXISTS orders;
# 插入order表
CREATE TABLE orders(
    id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    user_id BIGINT NOT NULL COMMENT '外键', #如果更改手机号，不会被phone这个字段影响
    gender CHAR(1) NOT NULL COMMENT '敬称:(M:男士，F:女士)',
    full_name VARCHAR(3) NOT NULL COMMENT '姓名',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态:(1:pending, 2:processing,3:completed,4:canceled)',
    email VARCHAR(50) DEFAULT NULL COMMENT '邮件',
    product TINYINT NOT NULL COMMENT '选择产品:(1:工程测绘,2:线与不动产测绘,3:地理信息系统工程,4:两项或者以上,5:其他)',
    project_name VARCHAR(50) NOT NULL COMMENT '项目名称',
    issue TEXT NOT NULL COMMENT '项目详细描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    newsletter BOOLEAN DEFAULT FALSE COMMENT '订阅状态',
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


SHOW CREATE TABLE orders;

# 重置表格
TRUNCATE TABLE orders;
use userdb;
# # test
ALTER TABLE orders
    MODIFY COLUMN product ENUM('工程测绘', '线与不动产测绘', '地理信息系统工程', '两项或者以上', '其他') NOT NULL COMMENT '选择产品:(1:工程测绘,2:线与不动产测绘,3:地理信息系统工程,4:两项或者以上,5:其他)';

ALTER TABLE orders
    MODIFY COLUMN status ENUM('pending','processing','complete','canceled') NOT NULL DEFAULT 'pending' COMMENT '订单状态';

AlTER TABLE orders
    MODIFY COLUMN full_name VARCHAR(20) NOT NULL COMMENT '姓名';

AlTER TABLE orders
    MODIFY COLUMN full_name VARCHAR(20) NOT NULL COMMENT '姓名';
AlTER TABLE orders
    ADD COLUMN image_path VARCHAR(255) DEFAULT NULL COMMENT '处理后的图片路径',
    ADD COLUMN phone VARCHAR(15) NOT NULL COMMENT '电话号码';

# 插入role表
DROP TABLE IF EXISTS `role`;

create table role(
                     id int Not NULL PRIMARY KEY COMMENT '主键',
                     role varchar(20) NOT NULL COMMENT '角色名'
)  ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO role(id,role) VALUES (1,"admin"), (2,"client");

# 创建user_role表，创建中间表是为了多对多的关系
DROP TABLE IF EXISTS `user_role`;

create table user_role(

                          user_id int Not NULL COMMENT 'user_id主键',

                          role_id int NOT NULL COMMENT 'role_id主键',

                          PRIMARY KEY (user_id ,role_id)

)  ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4  COLLATE = utf8mb4_0900_ai_ci;

# INSERT INTO user_role(user_id ,role_id ) VALUES (1,), (2,)

# 插入role_access表
DROP TABLE IF EXISTS `role_access`;

create table role_access(

                            access_id int Not NULL COMMENT 'access_id主键',

                            role_id int NOT NULL COMMENT 'role_id主键',

                            PRIMARY KEY (access_id ,role_id)

)  ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4  COLLATE = utf8mb4_0900_ai_ci;


# 插入access表
DROP TABLE IF EXISTS `access`;
create table access(

                       id int NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键',

                       permission varchar(100) NOT NULL COMMENT '权限',

                       access_name varchar(64) NOT NULL COMMENT '权限详情',

                       create_time datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

                       update_time datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

                       create_by varchar(20) DEFAULT NULL COMMENT '创建者',

                       update_by varchar(20) DEFAULT NULL COMMENT '更新者'

) ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4  COLLATE = utf8mb4_0900_ai_ci;



# # 更改列名
# ALTER TABLE user
#     RENAME COLUMN randomString TO random_string;

SELECT * FROM access;
SHOW CREATE TABLE access;
INSERT INTO user_role(user_id, role_id) VALUES ("5","1");


# 这个是选出当前用户的权限信息
SELECT DISTINCT a.permission
FROM user_role ur
         LEFT JOIN role r ON ur.role_id = r.id
         LEFT JOIN role_access ra ON ur.role_id = ra.role_id
         LEFT JOIN access a ON a.id = ra.access_id
WHERE user_id = 5;


DELETE FROM role_access
WHERE (access_id = 3 AND role_id = 1)
   OR (access_id = 3 AND role_id = 2);


INSERT INTO access(permission, access_name) VALUES ("access_database","进入数据库"),("database_write_privilage","下载数据到云端");
INSERT INTO role_access(access_id, role_id) VALUES ("1","1"),("2","1");
# 用户密码更新的权限
INSERT INTO access(permission, access_name) VALUES ("update_user_password","更新密码");
INSERT INTO role_access(access_id, role_id) VALUES (3,1),(3,2);

# 订单相关权限设置
INSERT INTO access(permission,access_name) VALUES ("submit_order","提交用户订单");
INSERT INTO role_access(access_id, role_id) VALUES (5,1),(5,2);

INSERT INTO access(permission,access_name) VALUES ("get_order","用户查看订单");
INSERT INTO role_access(access_id, role_id) VALUES (6,1),(6,2);

INSERT INTO access(permission,access_name) VALUES ("get_all_orders","管理员查看所有订单");
INSERT INTO role_access(access_id,role_id) VALUES (7,1);

SHOW CREATE Table orders