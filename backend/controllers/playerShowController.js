const PlayerShow = require('../models/PlayerShow');
const User = require('../models/User');

// 获取所有玩家展示
exports.getPlayerShows = async (req, res) => {
  try {
    const shows = await PlayerShow.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: '获取展示失败', error: err.message });
  }
};

// 创建玩家展示
exports.createPlayerShow = async (req, res) => {
  try {
    const { title, content, imageUrl, userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: '用户不存在' });

    const show = await PlayerShow.create({
      userId,
      username: user.username,
      title,
      content,
      imageUrl
    });

    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: '发布失败', error: err.message });
  }
};
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '未上传图片' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};