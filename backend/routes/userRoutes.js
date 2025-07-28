const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 路由仅负责映射 URL 到控制器方法
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;