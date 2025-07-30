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

// 获取项目根目录
const rootDir = path.resolve(__dirname, '..');

// 区分环境：生产环境直接服务前端静态文件
if (process.env.NODE_ENV === 'production') {
  const frontEndBuildPath = path.join(rootDir, 'frontend');
  console.log(`服务前端静态文件: ${frontEndBuildPath}`);
  
  // 静态文件服务
  app.use(express.static(frontEndBuildPath));
  
  // 处理单页应用路由（所有路由指向 index.html）
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontEndBuildPath, 'index.html'));
  });
} else {
  // 开发环境：保留前端开发服务器的启动逻辑
  const { exec } = require('child_process');
  const frontEndPath = path.join(rootDir, 'frontend');
  const command = `cd ${frontEndPath} && npm start`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`启动前端服务器时出错: ${error.message}`);
      return;
    }
    console.log(`前端服务器输出: ${stdout}`);
  });
}

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});