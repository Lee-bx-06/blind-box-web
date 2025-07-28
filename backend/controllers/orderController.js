const Order = require('../models/Order');

// 获取用户订单
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ 
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: '获取订单失败', error: err.message });
  }
};