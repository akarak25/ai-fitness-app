const express = require('express');
const router = express.Router();
const { createMockData } = require('../controllers/mockDataController');
const { protect } = require('../middlewares/authMiddleware');

// Demo veri oluştur
router.post('/', protect, createMockData);

module.exports = router;