const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true
  },
  bodyFatPercentage: {
    type: Number
  },
  chest: {
    type: Number
  },
  waist: {
    type: Number
  },
  hips: {
    type: Number
  },
  arms: {
    type: Number
  },
  thighs: {
    type: Number
  },
  notes: {
    type: String
  }
});

const photoProgressSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  photoUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['front', 'side', 'back', 'other'],
    default: 'front'
  },
  aiAnalysis: {
    type: Object,
    default: {}
  },
  notes: {
    type: String
  }
});

const progressRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  measurements: [measurementSchema],
  photos: [photoProgressSchema],
  moodLogs: [{
    date: {
      type: Date,
      default: Date.now
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'neutral', 'bad', 'terrible'],
      required: true
    },
    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    },
    sleepHours: {
      type: Number
    },
    notes: {
      type: String
    }
  }]
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressRecordSchema);

module.exports = Progress;