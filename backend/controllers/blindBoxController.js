const BlindBox = require('../models/BlindBox');
const Order = require('../models/Order');

// 获取所有盲盒
exports.getBlindBoxes = async (req, res) => {
  try {
    const blindBoxes = await BlindBox.findAll();
    res.json(blindBoxes);
  } catch (err) {
    res.status(500).json({ message: '获取盲盒失败', error: err.message });
  }
};

// 抽取盲盒
exports.drawBlindBox = async (req, res) => {
  try {
    const { blindBoxId, userId } = req.body;
    const blindBox = await BlindBox.findByPk(blindBoxId);
    if (!blindBox) return res.status(404).json({ message: '盲盒不存在' });

    // 随机抽取物品（业务逻辑）
    const items = blindBox.items;
    const random = Math.random() * 100;
    let selectedItem;
    let cumulativeProbability = 0;
    
    for (const item of items) {
      cumulativeProbability += item.probability;
      if (random <= cumulativeProbability) {
        selectedItem = item;
        break;
      }
    }

    // 创建订单
    const order = await Order.create({
      userId,
      blindBoxId,
      blindBoxName: blindBox.name,
      item: selectedItem,
      status: 'completed'
    });

    res.json({
      orderId: order.id,
      item: selectedItem
    });
  } catch (err) {
    res.status(500).json({ message: '抽取失败', error: err.message });
  }
};