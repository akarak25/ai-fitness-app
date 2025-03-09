const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  assistantChat,
  analyzeFoodImage,
  analyzeMood
} = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

// Multer (dosya yükleme) konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/food');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${req.user._id}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Yalnızca resim dosyaları yükleyebilirsiniz!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// AI yardımcı asistan
router.post('/assistant', protect, assistantChat);

// Yemek fotoğrafı analizi
router.post('/analyze-food', protect, upload.single('photo'), analyzeFoodImage);

// Duygu ve stres analizi
router.post('/analyze-mood', protect, analyzeMood);

module.exports = router;