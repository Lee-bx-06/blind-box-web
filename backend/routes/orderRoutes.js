const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;