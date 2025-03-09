const express = require('express');
const router = express.Router();
const { 
  generateWorkoutPlan,
  getActiveWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan
} = require('../controllers/fitnessController');
const { protect } = require('../middlewares/authMiddleware');

// AI egzersiz planı oluşturma
router.post('/generate', protect, generateWorkoutPlan);

// Aktif egzersiz planı
router.get('/active', protect, getActiveWorkoutPlan);

// Tüm egzersiz planları
router.get('/', protect, getWorkoutPlans);

// Belirli bir egzersiz planı
router.route('/:id')
  .put(protect, updateWorkoutPlan)
  .delete(protect, deleteWorkoutPlan);

module.exports = router;