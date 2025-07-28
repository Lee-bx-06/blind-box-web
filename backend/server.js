const express = require('express');
const sequelize = require('./config/database.js');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const blindBoxRoutes = require('./routes/blindBoxRoutes');
const orderRoutes = require('./routes/orderRoutes');
const playerShowRoutes = require('./routes/playerShowRoutes');

dotenv.config();
const app = express();

// 中间件

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 路由
app.use('/api/users', userRoutes);
app.use('/api/blindboxes', blindBoxRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/playershows', playerShowRoutes);

// 测试数据库连接
sequelize.authenticate()
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('数据库连接失败:', err));

// 同步模型到数据库
sequelize.sync()
  .then(() => console.log('模型同步完成'))
  .catch(err => console.error('模型同步失败:', err));

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`服务器运行在 http://localhost:${PORT}`));