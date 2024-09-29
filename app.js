const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// 引入路径
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const paymentAccountRoutes = require('./routes/paymentAccountRoutes');
const paymentOrderRoutes = require('./routes/paymentOrderRoutes');
const transactionRecordRoutes = require('./routes/transactionRecordRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contentRoutes = require('./routes/contentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const fileRoutes = require('./routes/fileRoutes');


const cors = require('cors');
const responseFormatter = require('./middlewares/responseFormatter');
var logger = require('morgan');

dotenv.config();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(responseFormatter);

// 跨域设置
app.use(
    cors({
        origin: '*', // 允许的来源
        methods: '*', // 允许所有方法
        allowedHeaders: '*', // 允许所有头部
        credentials: true, // 允许发送凭据
    })
);

// 添加路由
app.use('/api', userRoutes);
app.use('/api', followRoutes);
app.use('/api', paymentAccountRoutes);
app.use('/api', paymentOrderRoutes);
app.use('/api', transactionRecordRoutes);
app.use('/api', transactionRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', contentRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', fileRoutes);


// 同步数据库并启动服务器
sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
