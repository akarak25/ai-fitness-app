const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Kullanıcı kaydı ve giriş
router.post('/', registerUser);
router.post('/login', loginUser);

// Profil işlemleri
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;