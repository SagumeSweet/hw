const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const responseFormatter = require('./middlewares/responseFormatter');
var logger = require('morgan');

dotenv.config();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(responseFormatter);

app.use('/api/user', userRoutes);

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
