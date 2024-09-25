-- 创建数据库
CREATE DATABASE fantati;
USE fantati;

-- 用户表：存储用户基本信息
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 用户ID，自增主键
    email VARCHAR(255) UNIQUE NOT NULL,  -- 用户邮箱，唯一
    password VARCHAR(255) NOT NULL,       -- 用户密码
    username VARCHAR(50) NOT NULL,        -- 用户名
    profile_image VARCHAR(255),            -- 用户头像
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 更新时间
);

-- 创作者表：存储创作者信息
CREATE TABLE creators (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 创作者ID，自增主键
    user_id INT NOT NULL,                -- 关联的用户ID
    bio TEXT,                            -- 创作者简介
    verified BOOLEAN DEFAULT FALSE,      -- 是否认证
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间
    FOREIGN KEY (user_id) REFERENCES users(id)  -- 外键，关联用户表
);

-- 内容表：存储创作者发布的内容
CREATE TABLE content (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 内容ID，自增主键
    creator_id INT NOT NULL,             -- 关联的创作者ID
    title VARCHAR(255) NOT NULL,         -- 内容标题
    body TEXT,                           -- 内容正文
    media_type ENUM('text', 'image', 'video') NOT NULL,  -- 媒体类型
    media_url VARCHAR(255),              -- 媒体链接
    views INT DEFAULT 0,                 -- 浏览量
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间
    FOREIGN KEY (creator_id) REFERENCES creators(id)  -- 外键，关联创作者表
);

-- 订阅表：存储用户对创作者的订阅信息
CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 订阅ID，自增主键
    user_id INT NOT NULL,                 -- 关联的用户ID
    creator_id INT NOT NULL,              -- 关联的创作者ID
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 订阅时间
    FOREIGN KEY (user_id) REFERENCES users(id),  -- 外键，关联用户表
    FOREIGN KEY (creator_id) REFERENCES creators(id)  -- 外键，关联创作者表
);

-- 支付表：存储用户支付信息
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- 支付ID，自增主键
    user_id INT NOT NULL,                  -- 关联的用户ID
    amount DECIMAL(10, 2) NOT NULL,       -- 支付金额
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 支付日期
    status ENUM('completed', 'pending', 'failed') NOT NULL,  -- 支付状态
    FOREIGN KEY (user_id) REFERENCES users(id)  -- 外键，关联用户表
);

-- 评论表：存储用户对内容的评论
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- 评论ID，自增主键
    content_id INT NOT NULL,               -- 关联的内容ID
    user_id INT NOT NULL,                  -- 关联的用户ID
    comment_text TEXT NOT NULL,            -- 评论文本
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (content_id) REFERENCES content(id),  -- 外键，关联内容表
    FOREIGN KEY (user_id) REFERENCES users(id)  -- 外键，关联用户表
);

-- 通知表：存储用户通知信息
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,     -- 通知ID，自增主键
    user_id INT NOT NULL,                   -- 关联的用户ID
    message TEXT NOT NULL,                  -- 通知消息
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    is_read BOOLEAN DEFAULT FALSE,          -- 是否已读
    FOREIGN KEY (user_id) REFERENCES users(id)  -- 外键，关联用户表
);

-- 标签表：存储标签信息
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 标签ID，自增主键
    name VARCHAR(100) UNIQUE NOT NULL       -- 标签名称，唯一
);

-- 内容标签关联表：存储内容与标签的关联信息
CREATE TABLE content_tags (
    content_id INT NOT NULL,                -- 关联的内容ID
    tag_id INT NOT NULL,                    -- 关联的标签ID
    PRIMARY KEY (content_id, tag_id),      -- 复合主键
    FOREIGN KEY (content_id) REFERENCES content(id),  -- 外键，关联内容表
    FOREIGN KEY (tag_id) REFERENCES tags(id)  -- 外键，关联标签表
);

-- 点赞表：存储用户对内容的点赞信息
CREATE TABLE likes (
    user_id INT NOT NULL,                   -- 关联的用户ID
    content_id INT NOT NULL,                -- 关联的内容ID
    PRIMARY KEY (user_id, content_id),     -- 复合主键
    FOREIGN KEY (user_id) REFERENCES users(id),  -- 外键，关联用户表
    FOREIGN KEY (content_id) REFERENCES content(id)  -- 外键，关联内容表
);

-- 收藏表：存储用户对内容的收藏信息
CREATE TABLE favorites (
    user_id INT NOT NULL,                   -- 关联的用户ID
    content_id INT NOT NULL,                -- 关联的内容ID
    PRIMARY KEY (user_id, content_id),     -- 复合主键
    FOREIGN KEY (user_id) REFERENCES users(id),  -- 外键，关联用户表
    FOREIGN KEY (content_id) REFERENCES content(id)  -- 外键，关联内容表
);

-- 关注表：存储用户对创作者的关注信息
CREATE TABLE follows (
    user_id INT NOT NULL,                   -- 关联的用户ID
    creator_id INT NOT NULL,                -- 关联的创作者ID
    PRIMARY KEY (user_id, creator_id),     -- 复合主键
    FOREIGN KEY (user_id) REFERENCES users(id),  -- 外键，关联用户表
    FOREIGN KEY (creator_id) REFERENCES creators(id)  -- 外键，关联创作者表
);

-- 举报表：存储用户举报内容信息
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 举报ID，自增主键
    content_id INT NOT NULL,                -- 关联的内容ID
    reason TEXT NOT NULL,                   -- 举报原因
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (content_id) REFERENCES content(id)  -- 外键，关联内容表
);
