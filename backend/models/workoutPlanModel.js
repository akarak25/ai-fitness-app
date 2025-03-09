const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: String,
    required: true
  },
  duration: {
    type: Number // in seconds
  },
  restTime: {
    type: Number // in seconds
  },
  videoUrl: {
    type: String
  },
  imageUrl: {
    type: String
  },
  notes: {
    type: String
  }
});

const workoutSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number // in minutes
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  notes: {
    type: String
  }
});

const workoutDaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  isRestDay: {
    type: Boolean,
    default: false
  },
  workoutSessions: [workoutSessionSchema],
  notes: {
    type: String
  }
});

const workoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'Egzersiz Planım'
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
  goal: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'flexibility', 'general_fitness'],
    required: true
  },
  daysPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  workoutDays: [workoutDaySchema],
  generationPrompt: {
    type: String
  },
  generationNotes: {
    type: String
  },
  equipmentAvailable: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;