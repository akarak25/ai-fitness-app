const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  foods: [{
    name: {
      type: String,
      required: true
    },
    portion: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    }
  }],
  totalCalories: {
    type: Number,
    required: true
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  },
  totalFat: {
    type: Number,
    default: 0
  }
});

const dayPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  meals: [mealSchema],
  totalDailyCalories: {
    type: Number,
    required: true
  },
  totalDailyProtein: {
    type: Number,
    default: 0
  },
  totalDailyCarbs: {
    type: Number,
    default: 0
  },
  totalDailyFat: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  }
});

const nutritionPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'Beslenme Planım'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  targetCalories: {
    type: Number,
    required: true
  },
  targetProtein: {
    type: Number,
    default: 0
  },
  targetCarbs: {
    type: Number,
    default: 0
  },
  targetFat: {
    type: Number,
    default: 0
  },
  dayPlans: [dayPlanSchema],
  generationPrompt: {
    type: String
  },
  generationNotes: {
    type: String
  },
  shoppingList: [{
    item: String,
    category: String,
    quantity: String,
    checked: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

const NutritionPlan = mongoose.model('NutritionPlan', nutritionPlanSchema);

module.exports = NutritionPlan;