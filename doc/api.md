# API 文档

## 1. 用户管理模块

### 1.1 注册用户

- **请求方法**: POST
- **请求 URL**: `/api/users/register`
- **请求体**:

  ```json
  {
    "email": "",
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "注册成功"
    }
    ```

  - **失败**: 400 Bad Request

    ```json
    {
      "message": "注册失败，用户已存在"
    }
    ```

### 1.2 登录用户

- **请求方法**: POST
- **请求 URL**: `/api/users/login`
- **请求体**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "token": "jwt_token",
      "user": {
      }
    }
    ```

  - **失败**: 401 Unauthorized

    ```json
    {
      "message": "用户名或密码错误"
    }
    ```

### 1.3 获取用户信息

- **请求方法**: GET
- **请求 URL**: `/api/users/me`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "id": 1,
      "username": "string",
      "email": "string",
      "role": "normal/creator",
      "avatar": "string",
      "subscription_price": 9.99
    }
    ```

### 1.4 更新用户信息

- **请求方法**: PUT
- **请求 URL**: `/api/users/me`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "avatar": "string",
    "subscription_price": 9.99
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "信息更新成功"
    }
    ```

  - **失败**: 400 Bad Request

    ```json
    {
      "message": "更新失败"
    }
    ```

## 2. 关注管理模块

### 2.1 增加关注

- **请求方法**: POST
- **请求 URL**: `/api/follows`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "creator_id": 1
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "关注成功"
    }
    ```

### 2.2 删除关注

- **请求方法**: DELETE
- **请求 URL**: `/api/follows`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "creator_id": 1
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "取消关注成功"
    }
    ```

### 2.3 查询关注列表

- **请求方法**: GET
- **请求 URL**: `/api/follows`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    [
      {
        "creator_id": 1,
        "username": "creator_username"
      },
      ...
    ]
    ```

## 3. 订阅管理模块

### 3.1 设置订阅价格

- **请求方法**: PUT
- **请求 URL**: `/api/subscriptions/price`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "price": 9.99
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "订阅价格设置成功"
    }
    ```

### 3.2 增加订阅

- **请求方法**: POST
- **请求 URL**: `/api/subscriptions`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "creator_id": 1
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "订阅成功"
    }
    ```

### 3.3 删除订阅

- **请求方法**: DELETE
- **请求 URL**: `/api/subscriptions`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "creator_id": 1
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "取消订阅成功"
    }
    ```

### 3.4 查询订阅内容

- **请求方法**: GET
- **请求 URL**: `/api/subscriptions/content`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    [
      {
        "content_id": 1,
        "title": "内容标题",
        "body": "内容正文"
      },
      ...
    ]
    ```

## 4. 收藏管理模块

### 4.1 增加收藏

- **请求方法**: POST
- **请求 URL**: `/api/favorites`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "content_id": 1
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "收藏成功"
    }
    ```

### 4.2 删除收藏

- **请求方法**: DELETE
- **请求 URL**: `/api/favorites`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "content_id": 1
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "取消收藏成功"
    }
    ```

### 4.3 查询收藏列表

- **请求方法**: GET
- **请求 URL**: `/api/favorites`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    [
      {
        "content_id": 1,
        "title": "内容标题"
      },
      ...
    ]
    ```

## 5. 内容管理模块

### 5.1 创建内容

- **请求方法**: POST
- **请求 URL**: `/api/content`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "title": "内容标题",
    "body": "内容正文",
    "visibility": "public/subscribers_only"
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "内容创建成功"
    }
    ```

### 5.2 查看内容

- **请求方法**: GET
- **请求 URL**: `/api/content/{id}`
- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "id": 1,
      "title": "内容标题",
      "body": "内容正文",
      "visibility": "public/subscribers_only"
    }
    ```

### 5.3 更新内容

- **请求方法**: PUT
- **请求 URL**: `/api/content/{id}`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "title": "更新后的内容标题",
    "body": "更新后的内容正文",
    "visibility": "public/subscribers_only"
  }
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "内容更新成功"
    }
    ```

### 5.4 删除内容

- **请求方法**: DELETE
- **请求 URL**: `/api/content/{id}`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    {
      "message": "内容删除成功"
    }
    ```

## 6. 交易管理模块

### 6.1 添加支付账户

- **请求方法**: POST
- **请求 URL**: `/api/payment_accounts`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "account_name": "账户名称",
    "account_info": "账户信息"
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "支付账户添加成功"
    }
    ```

### 6.2 创建支付订单

- **请求方法**: POST
- **请求 URL**: `/api/payment_orders`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **请求体**:

  ```json
  {
    "creator_id": 1,
    "amount": 9.99,
    "payment_account_id": 1
  }
  ```

- **响应**:
  - **成功**: 201 Created

    ```json
    {
      "message": "支付订单创建成功"
    }
    ```

### 6.3 查询交易记录

- **请求方法**: GET
- **请求 URL**: `/api/transactions`
- **请求头**:

  ```
  Authorization: Bearer <token>
  ```

- **响应**:
  - **成功**: 200 OK

    ```json
    [
      {
        "id": 1,
        "type": "income/expense",
        "amount": 9.99,
        "description": "交易描述"
      },
      ...
    ]
    ```
