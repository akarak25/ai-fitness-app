import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000/api';

// Nutrition API
export const nutritionApi = {
  // Beslenme planı oluştur
  generatePlan: async (data) => {
    const response = await axios.post(`${API_URL}/nutrition/generate`, data);
    return response.data;
  },
  
  // Aktif beslenme planını getir
  getActivePlan: async () => {
    const response = await axios.get(`${API_URL}/nutrition/active`);
    return response.data;
  },
  
  // Tüm beslenme planlarını getir
  getAllPlans: async () => {
    const response = await axios.get(`${API_URL}/nutrition`);
    return response.data;
  },
  
  // Beslenme planını güncelle
  updatePlan: async (id, data) => {
    const response = await axios.put(`${API_URL}/nutrition/${id}`, data);
    return response.data;
  },
  
  // Beslenme planını sil
  deletePlan: async (id) => {
    const response = await axios.delete(`${API_URL}/nutrition/${id}`);
    return response.data;
  }
};

// Fitness API
export const fitnessApi = {
  // Egzersiz planı oluştur
  generatePlan: async (data) => {
    const response = await axios.post(`${API_URL}/fitness/generate`, data);
    return response.data;
  },
  
  // Aktif egzersiz planını getir
  getActivePlan: async () => {
    const response = await axios.get(`${API_URL}/fitness/active`);
    return response.data;
  },
  
  // Tüm egzersiz planlarını getir
  getAllPlans: async () => {
    const response = await axios.get(`${API_URL}/fitness`);
    return response.data;
  },
  
  // Egzersiz planını güncelle
  updatePlan: async (id, data) => {
    const response = await axios.put(`${API_URL}/fitness/${id}`, data);
    return response.data;
  },
  
  // Egzersiz planını sil
  deletePlan: async (id) => {
    const response = await axios.delete(`${API_URL}/fitness/${id}`);
    return response.data;
  }
};

// Progress API
export const progressApi = {
  // Ölçüm ekle
  addMeasurement: async (data) => {
    const response = await axios.post(`${API_URL}/progress/measurements`, data);
    return response.data;
  },
  
  // Fotoğraf yükle
  addPhoto: async (formData) => {
    const response = await axios.post(`${API_URL}/progress/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  // Ruh hali/stres kaydı ekle
  addMoodLog: async (data) => {
    const response = await axios.post(`${API_URL}/progress/mood`, data);
    return response.data;
  },
  
  // İlerleme verilerini getir
  getProgress: async () => {
    const response = await axios.get(`${API_URL}/progress`);
    return response.data;
  },
  
  // İlerleme analizi yap
  analyzeProgress: async () => {
    const response = await axios.get(`${API_URL}/progress/analysis`);
    return response.data;
  }
};

// AI API
export const aiApi = {
  // AI asistanı ile sohbet
  chatWithAssistant: async (message) => {
    const response = await axios.post(`${API_URL}/ai/assistant`, { message });
    return response.data;
  },
  
  // Yemek fotoğrafı analizi
  analyzeFoodImage: async (formData) => {
    const response = await axios.post(`${API_URL}/ai/analyze-food`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  // Duygu ve stres analizi
  analyzeMood: async (text) => {
    const response = await axios.post(`${API_URL}/ai/analyze-mood`, { text });
    return response.data;
  }
};

// Community API
export const communityApi = {
  // Grup oluştur
  createGroup: async (data) => {
    console.log('createGroup API çağrılıyor, endpoint:', `${API_URL}/community/groups`);
    try {
      const response = await axios.post(`${API_URL}/community/groups`, data);
      return response.data;
    } catch (error) {
      console.error('createGroup API hatası:', error);
      throw error;
    }
  },
  
  // Tüm grupları getir
  getGroups: async (params = {}) => {
    const response = await axios.get(`${API_URL}/community/groups`, { params });
    return response.data;
  },
  
  // Grup detayını getir
  getGroupById: async (id) => {
    const response = await axios.get(`${API_URL}/community/groups/${id}`);
    return response.data;
  },
  
  // Gruba katıl
  joinGroup: async (id) => {
    const response = await axios.post(`${API_URL}/community/groups/${id}/join`);
    return response.data;
  },
  
  // Gruptan ayrıl
  leaveGroup: async (id) => {
    const response = await axios.post(`${API_URL}/community/groups/${id}/leave`);
    return response.data;
  },
  
  // Üyelik isteklerini yönet
  manageRequests: async (id, userId, action) => {
    const response = await axios.post(`${API_URL}/community/groups/${id}/manage-requests`, {
      userId,
      action
    });
    return response.data;
  },
  
  // Gönderi oluştur
  createPost: async (groupId, data) => {
    const response = await axios.post(`${API_URL}/community/groups/${groupId}/posts`, data);
    return response.data;
  },
  
  // Gönderi sil
  deletePost: async (id) => {
    const response = await axios.delete(`${API_URL}/community/posts/${id}`);
    return response.data;
  },
  
  // Gönderi beğen/beğenme
  likePost: async (id) => {
    const response = await axios.post(`${API_URL}/community/posts/${id}/like`);
    return response.data;
  },
  
  // Yorum ekle
  addComment: async (postId, content) => {
    const response = await axios.post(`${API_URL}/community/posts/${postId}/comments`, { content });
    return response.data;
  },
  
  // Yorum sil
  deleteComment: async (id) => {
    const response = await axios.delete(`${API_URL}/community/comments/${id}`);
    return response.data;
  }
};