const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Kullanıcı kimlik doğrulama
const protect = async (req, res, next) => {
  let token;

  console.log('Auth middleware çalıştı, headers:', req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token'ı al
      token = req.headers.authorization.split(' ')[1];
      console.log('Token alındı:', token);

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token doğrulandı, kullanıcı ID:', decoded.id);

      // Kullanıcıyı bul ve şifre hariç bilgileri req.user'a at
      req.user = await User.findById(decoded.id).select('-password');
      console.log('Kullanıcı bulundu:', req.user ? req.user._id : 'Bulunamadı');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
      }

      next();
    } catch (error) {
      console.error('Auth hatası:', error);
      return res.status(401).json({ message: 'Yetkilendirme başarısız, geçersiz token', error: error.message });
    }
  } else {
    console.error('Authorization header bulunamadı veya yanlış formatta');
    return res.status(401).json({ message: 'Yetkilendirme başarısız, token bulunamadı' });
  }
};

// Admin yetkisi kontrolü
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Bu işlem için admin yetkisi gerekiyor');
  }
};

module.exports = { protect, admin };