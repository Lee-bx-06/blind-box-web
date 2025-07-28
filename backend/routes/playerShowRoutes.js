const express = require('express');
const router = express.Router();
const playerShowController = require('../controllers/playerShowController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 上传文件保存的目录
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 文件名
  }
});
const upload = multer({ storage: storage });
router.get('/', playerShowController.getPlayerShows);
router.post('/', playerShowController.createPlayerShow);
router.post('/upload', upload.single('image'), playerShowController.uploadImage);
module.exports = router;