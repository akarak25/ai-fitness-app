const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// JWT token oluşturma
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Kullanıcı kaydı
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, age, height, weight, goalWeight, activityLevel, dietaryRestrictions, healthConditions } = req.body;

    // Email kontrolü
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Bu email ile kayıtlı kullanıcı zaten var');
    }

    // Yeni kullanıcı oluştur
    const user = await User.create({
      name,
      email,
      password,
      gender,
      age,
      height,
      weight,
      goalWeight,
      activityLevel,
      dietaryRestrictions: dietaryRestrictions || [],
      healthConditions: healthConditions || []
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goalWeight: user.goalWeight,
        activityLevel: user.activityLevel,
        dietaryRestrictions: user.dietaryRestrictions,
        healthConditions: user.healthConditions,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Geçersiz kullanıcı bilgileri');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Kullanıcı girişi
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email ile kullanıcıyı bul
    const user = await User.findOne({ email }).select('+password');

    // Kullanıcı ve şifre kontrolü
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goalWeight: user.goalWeight,
        activityLevel: user.activityLevel,
        dietaryRestrictions: user.dietaryRestrictions,
        healthConditions: user.healthConditions,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Email veya şifre hatalı');
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Kullanıcı profili getir
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goalWeight: user.goalWeight,
        activityLevel: user.activityLevel,
        dietaryRestrictions: user.dietaryRestrictions,
        healthConditions: user.healthConditions,
        profilePicture: user.profilePicture,
        role: user.role,
        bmi: user.calculateBMI(),
        bmr: user.calculateBMR(),
        tdee: user.calculateTDEE(),
      });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Kullanıcı profili güncelle
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.gender = req.body.gender || user.gender;
      user.age = req.body.age || user.age;
      user.height = req.body.height || user.height;
      user.weight = req.body.weight || user.weight;
      user.goalWeight = req.body.goalWeight || user.goalWeight;
      user.activityLevel = req.body.activityLevel || user.activityLevel;
      user.dietaryRestrictions = req.body.dietaryRestrictions || user.dietaryRestrictions;
      user.healthConditions = req.body.healthConditions || user.healthConditions;
      user.profilePicture = req.body.profilePicture || user.profilePicture;

      // Şifre değişimi varsa
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        age: updatedUser.age,
        height: updatedUser.height,
        weight: updatedUser.weight,
        goalWeight: updatedUser.goalWeight,
        activityLevel: updatedUser.activityLevel,
        dietaryRestrictions: updatedUser.dietaryRestrictions,
        healthConditions: updatedUser.healthConditions,
        profilePicture: updatedUser.profilePicture,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};