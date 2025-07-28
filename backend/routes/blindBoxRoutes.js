const express = require('express');
const router = express.Router();
const blindBoxController = require('../controllers/blindBoxController');

router.get('/', blindBoxController.getBlindBoxes);
router.post('/draw', blindBoxController.drawBlindBox);

module.exports = router;