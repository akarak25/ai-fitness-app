import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    goalWeight: '',
    activityLevel: 'moderate',
    dietaryRestrictions: [],
    healthConditions: [],
    profilePicture: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        gender: user.gender || 'male',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        goalWeight: user.goalWeight || '',
        activityLevel: user.activityLevel || 'moderate',
        dietaryRestrictions: user.dietaryRestrictions || [],
        healthConditions: user.healthConditions || [],
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Diyet kısıtlamaları ve sağlık durumları gibi dizi alanlarını yönetme
      setFormData(prev => {
        if (name === 'dietaryRestrictions' || name === 'healthConditions') {
          if (checked) {
            return {
              ...prev,
              [name]: [...prev[name], value]
            };
          } else {
            return {
              ...prev,
              [name]: prev[name].filter(item => item !== value)
            };
          }
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Şifre değiştirilecekse doğrulama
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Şifreler eşleşmiyor');
      return;
    }
    
    // Şifre değiştirilmeyecekse payloadan şifre alanını kaldır
    const userData = { ...formData };
    if (!userData.password) {
      delete userData.password;
    }
    delete userData.confirmPassword;
    
    try {
      setLoading(true);
      await updateProfile(userData);
      toast.success('Profil başarıyla güncellendi');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Profil güncellenirken bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  // BMI hesapla
  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null;
    
    const heightInMeters = formData.height / 100;
    const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    let category = '';
    if (bmi < 18.5) category = 'Zayıf';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Fazla Kilolu';
    else category = 'Obez';
    
    return { bmi, category };
  };

  const bmiData = calculateBMI();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profil</h3>
            <p className="mt-1 text-sm text-gray-600">
              Kişisel bilgilerinizi ve sağlık verilerinizi güncelleyin.
            </p>
            
            {bmiData && (
              <div className="mt-6 p-4 bg-white shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900">Vücut Kitle İndeksi (BMI)</h4>
                <div className="mt-2">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary-600">{bmiData.bmi}</span>
                    <span className="ml-2 text-sm text-gray-500">kg/m²</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">Kategori: {bmiData.category}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="name" className="form-label">İsim Soyisim</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email" className="form-label">Email adresi</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="password" className="form-label">Yeni Şifre (opsiyonel)</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="gender" className="form-label">Cinsiyet</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="age" className="form-label">Yaş</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="height" className="form-label">Boy (cm)</label>
                    <input
                      type="number"
                      name="height"
                      id="height"
                      min="50"
                      max="250"
                      value={formData.height}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="weight" className="form-label">Kilo (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      min="20"
                      max="300"
                      value={formData.weight}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="goalWeight" className="form-label">Hedef Kilo (kg)</label>
                    <input
                      type="number"
                      name="goalWeight"
                      id="goalWeight"
                      min="20"
                      max="300"
                      value={formData.goalWeight}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="activityLevel" className="form-label">Aktivite Seviyesi</label>
                    <select
                      id="activityLevel"
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="sedentary">Hareketsiz (Masa başı iş)</option>
                      <option value="light">Hafif (Haftada 1-2 gün egzersiz)</option>
                      <option value="moderate">Orta (Haftada 3-5 gün egzersiz)</option>
                      <option value="active">Aktif (Haftada 6-7 gün egzersiz)</option>
                      <option value="very_active">Çok Aktif (Günde 2 antrenman)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="form-label">Diyet Kısıtlamaları</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Vejetaryen', 'Vegan', 'Glutensiz', 'Laktoz İntoleransı', 'Fındık Alerjisi'].map((restriction) => (
                      <div key={restriction} className="flex items-center">
                        <input
                          id={`restriction-${restriction}`}
                          name="dietaryRestrictions"
                          type="checkbox"
                          value={restriction}
                          checked={formData.dietaryRestrictions.includes(restriction)}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`restriction-${restriction}`} className="ml-2 block text-sm text-gray-700">
                          {restriction}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="form-label">Sağlık Durumları</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Diyabet', 'Hipertansiyon', 'Kalp Hastalığı', 'Astım', 'Tiroid Problemi'].map((condition) => (
                      <div key={condition} className="flex items-center">
                        <input
                          id={`condition-${condition}`}
                          name="healthConditions"
                          type="checkbox"
                          value={condition}
                          checked={formData.healthConditions.includes(condition)}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`condition-${condition}`} className="ml-2 block text-sm text-gray-700">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Kaydet'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;