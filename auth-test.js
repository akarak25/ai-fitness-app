// Auth API test
const axios = require('axios');

// API URL
const API_URL = 'http://localhost:5000/api';

// Test kullanıcısı
const testUser = {
  name: 'Test Kullanıcı',
  email: 'test@example.com',
  password: 'Password123!'
};

// Kayıt testi
const registerTest = async () => {
  try {
    console.log('Kayıt testi başlatılıyor...');
    const response = await axios.post(`${API_URL}/users`, testUser);
    console.log('Kayıt başarılı:', response.data);
    return response.data;
  } catch (error) {
    console.error('Kayıt hatası:');
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
      console.error('Durum kodu:', error.response.status);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

// Giriş testi
const loginTest = async () => {
  try {
    console.log('Giriş testi başlatılıyor...');
    const response = await axios.post(`${API_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Giriş başarılı:', response.data);
    return response.data;
  } catch (error) {
    console.error('Giriş hatası:');
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
      console.error('Durum kodu:', error.response.status);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

// Token ile profil testi
const profileTest = async (token) => {
  try {
    console.log('Profil testi başlatılıyor...');
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Profil alındı:', response.data);
    return response.data;
  } catch (error) {
    console.error('Profil alma hatası:');
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
      console.error('Durum kodu:', error.response.status);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

// Test işlemlerini çalıştır
const runTests = async () => {
  // Önce giriş deneyelim (muhtemelen kullanıcı zaten kayıtlı)
  let userData = await loginTest();
  
  // Eğer giriş başarısız olursa kayıt olmayı dene
  if (!userData) {
    userData = await registerTest();
    
    // Kayıt başarılıysa giriş yap
    if (userData) {
      console.log('Kayıt sonrası giriş yapılıyor...');
      userData = await loginTest();
    }
  }
  
  // Token ile profil bilgilerini al
  if (userData && userData.token) {
    await profileTest(userData.token);
  } else {
    console.error('Token alınamadı, profil testi yapılamıyor');
  }
};

// Testleri çalıştır
runTests()
  .then(() => {
    console.log('Testler tamamlandı.');
  })
  .catch(err => {
    console.error('Test çalıştırma hatası:', err);
  });
