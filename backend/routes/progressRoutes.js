const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  addMeasurement,
  addPhoto,
  addMoodLog,
  getProgress,
  analyzeProgress
} = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

// Multer (dosya yükleme) konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/progress');
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

// Ölçüm ekle
router.post('/measurements', protect, addMeasurement);

// Fotoğraf ekle
router.post('/photos', protect, upload.single('photo'), addPhoto);

// Ruh hali kaydı ekle
router.post('/mood', protect, addMoodLog);

// İlerleme verilerini getir
router.get('/', protect, getProgress);

// İlerleme analizi yap
router.get('/analysis', protect, analyzeProgress);

module.exports = router;