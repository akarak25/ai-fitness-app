import axios from 'axios';

// API URL
const API_URL = 'http://localhost:5000/api';

// Axios instance yapılandırması
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor - her istekte token kontrolü
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token eklendi:', token);
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Axios request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - hata durumunda oturum kontrolü
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 hatası durumunda oturumu sonlandır
    if (error.response && error.response.status === 401) {
      console.error('Oturum süresi doldu veya yetkilendirme hatası');
      localStorage.removeItem('userInfo');
      // Eğer react-router kullanıyorsanız, burada window.location.href = '/login' ile yönlendirme yapabilirsiniz
    }
    
    return Promise.reject(error);
  }
);

export default api;
