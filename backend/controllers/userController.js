const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 生成JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// 注册
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id)
    });
  } catch (err) {
    res.status(400).json({ message: '注册失败', error: err.message });
  }
};

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }
    res.json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id)
    });
  } catch (err) {
    res.status(400).json({ message: '登录失败', error: err.message });
  }
};