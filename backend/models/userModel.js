const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim alanı zorunludur']
  },
  email: {
    type: String,
    required: [true, 'Email alanı zorunludur'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Lütfen geçerli bir email adresi girin']
  },
  password: {
    type: String,
    required: [true, 'Şifre alanı zorunludur'],
    minlength: 6,
    select: false
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Cinsiyet alanı zorunludur']
  },
  age: {
    type: Number,
    required: [true, 'Yaş alanı zorunludur']
  },
  height: {
    type: Number,
    required: [true, 'Boy alanı zorunludur']
  },
  weight: {
    type: Number,
    required: [true, 'Kilo alanı zorunludur']
  },
  goalWeight: {
    type: Number,
    required: [true, 'Hedef kilo alanı zorunludur']
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    required: [true, 'Aktivite seviyesi alanı zorunludur']
  },
  dietaryRestrictions: {
    type: [String],
    default: []
  },
  healthConditions: {
    type: [String],
    default: []
  },
  profilePicture: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash şifre kaydetmeden önce
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Şifre karşılaştırma metodu
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// BMI hesaplama metodu
userSchema.methods.calculateBMI = function() {
  // Boy metre cinsinden olmalı
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
};

// BMR (Bazal Metabolik Hız) hesaplama metodu
userSchema.methods.calculateBMR = function() {
  if (this.gender === 'male') {
    return 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
  } else {
    return 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
  }
};

// TDEE (Toplam Günlük Enerji Harcaması) hesaplama metodu
userSchema.methods.calculateTDEE = function() {
  const bmr = this.calculateBMR();
  let activityMultiplier;

  switch (this.activityLevel) {
    case 'sedentary':
      activityMultiplier = 1.2;
      break;
    case 'light':
      activityMultiplier = 1.375;
      break;
    case 'moderate':
      activityMultiplier = 1.55;
      break;
    case 'active':
      activityMultiplier = 1.725;
      break;
    case 'very_active':
      activityMultiplier = 1.9;
      break;
    default:
      activityMultiplier = 1.2;
  }

  return Math.round(bmr * activityMultiplier);
};

const User = mongoose.model('User', userSchema);

module.exports = User;