const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const paymentAccountRoutes = require('./routes/paymentAccountRoutes');
const paymentOrderRoutes = require('./routes/paymentOrderRoutes');
const responseFormatter = require('./middlewares/responseFormatter');
var logger = require('morgan');

dotenv.config();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(responseFormatter);

app.use('/api', userRoutes);
app.use('/api', followRoutes);
app.use('/api', paymentAccountRoutes);
app.use('/api', paymentOrderRoutes);

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
