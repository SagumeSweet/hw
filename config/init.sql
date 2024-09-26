-- 创建数据库
CREATE DATABASE fantati;

-- 选择数据库
USE fantati;

-- 创建用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 用户唯一标识符
    username VARCHAR(50) NOT NULL,      -- 用户名
    password VARCHAR(255) NOT NULL,      -- 密码（加密存储）
    email VARCHAR(100) NOT NULL,         -- 用户邮箱
    role ENUM('normal', 'creator') NOT NULL,  -- 用户角色：普通用户或创作者
    avatar VARCHAR(255),                  -- 用户头像 URL
    subscription_price DECIMAL(10, 2) DEFAULT NULL,  -- 创作者的订阅价格（可为空）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 更新时间
);

-- 创建关注表
CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 关注关系唯一标识符
    user_id INT NOT NULL,                 -- 关注者用户 ID
    creator_id INT NOT NULL,              -- 被关注的创作者 ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外键，关联用户表
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
);

-- 创建订阅表
CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- 订阅唯一标识符
    user_id INT NOT NULL,                 -- 订阅者用户 ID
    creator_id INT NOT NULL,              -- 被订阅的创作者 ID
    price DECIMAL(10, 2) NOT NULL,       -- 订阅价格
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外键，关联用户表
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
);

-- 创建收藏表
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- 收藏唯一标识符
    user_id INT NOT NULL,                 -- 收藏者用户 ID
    content_id INT NOT NULL,              -- 被收藏的内容 ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
    -- 需要创建内容表后再添加对 content_id 的外键约束
);

-- 创建内容表
CREATE TABLE content (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- 内容唯一标识符
    creator_id INT NOT NULL,              -- 内容创作者用户 ID
    title VARCHAR(100) NOT NULL,          -- 内容标题
    body TEXT NOT NULL,                   -- 内容正文
    visibility ENUM('public', 'subscribers_only') NOT NULL,  -- 可见性：公开或仅限订阅用户
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
);

-- 创建支付账户表
CREATE TABLE payment_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,     -- 支付账户唯一标识符
    user_id INT NOT NULL,                  -- 用户 ID
    account_name VARCHAR(50) NOT NULL,     -- 支付账户名称
    account_info VARCHAR(255) NOT NULL,    -- 支付账户信息（如支付平台和账户号码）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
);

-- 创建支付订单表
CREATE TABLE payment_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 订单唯一标识符
    user_id INT NOT NULL,                   -- 用户 ID
    creator_id INT NOT NULL,                -- 创作者 ID
    amount DECIMAL(10, 2) NOT NULL,        -- 支付金额
    payment_account_id INT NOT NULL,        -- 支付账户 ID
    status ENUM('pending', 'completed', 'failed') NOT NULL,  -- 订单状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外键，关联用户表
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外键，关联用户表
    FOREIGN KEY (payment_account_id) REFERENCES payment_accounts(id) ON DELETE CASCADE  -- 外键，关联支付账户表
);

-- 创建收支记录表
CREATE TABLE transaction_records (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 记录唯一标识符
    user_id INT NOT NULL,                   -- 用户 ID
    type ENUM('income', 'expense') NOT NULL,  -- 收支类型：收入或支出
    amount DECIMAL(10, 2) NOT NULL,        -- 金额
    description VARCHAR(255) NOT NULL,      -- 记录描述
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- 外键，关联用户表
);
