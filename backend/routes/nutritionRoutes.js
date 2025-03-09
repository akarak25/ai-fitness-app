const express = require('express');
const router = express.Router();
const { 
  generateNutritionPlan,
  getActiveNutritionPlan,
  getNutritionPlans,
  updateNutritionPlan,
  deleteNutritionPlan
} = require('../controllers/nutritionController');
const { protect } = require('../middlewares/authMiddleware');

// AI beslenme planı oluşturma
router.post('/generate', protect, generateNutritionPlan);

// Aktif beslenme planı
router.get('/active', protect, getActiveNutritionPlan);

// Tüm beslenme planları
router.get('/', protect, getNutritionPlans);

// Belirli bir beslenme planı
router.route('/:id')
  .put(protect, updateNutritionPlan)
  .delete(protect, deleteNutritionPlan);

module.exports = router;