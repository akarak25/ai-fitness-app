import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [step, setStep] = useState(1);
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
    healthConditions: []
  });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle array fields like dietaryRestrictions and healthConditions
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

  const nextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Lütfen tüm zorunlu alanları doldurun');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Şifreler eşleşmiyor');
        return;
      }
      
      if (formData.password.length < 6) {
        toast.error('Şifre en az 6 karakter olmalıdır');
        return;
      }
    } 
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate last step
    if (!formData.age || !formData.height || !formData.weight || !formData.goalWeight) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      goalWeight: Number(formData.goalWeight),
      activityLevel: formData.activityLevel,
      dietaryRestrictions: formData.dietaryRestrictions,
      healthConditions: formData.healthConditions
    };
    
    try {
      setLoading(true);
      await register(userData);
      toast.success('Kayıt başarılı!');
      navigate('/');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Kayıt sırasında bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">
                İsim Soyisim
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Ad Soyad"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">
                Email adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="ornek@gmail.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="********"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="********"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Devam
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="gender" className="form-label">
                Cinsiyet
              </label>
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
            
            <div>
              <label htmlFor="age" className="form-label">
                Yaş
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                required
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="30"
              />
            </div>
            
            <div>
              <label htmlFor="height" className="form-label">
                Boy (cm)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                min="50"
                max="250"
                required
                value={formData.height}
                onChange={handleChange}
                className="form-input"
                placeholder="175"
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="form-label">
                Kilo (kg)
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="20"
                max="300"
                required
                value={formData.weight}
                onChange={handleChange}
                className="form-input"
                placeholder="70"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Devam
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="goalWeight" className="form-label">
                Hedef Kilo (kg)
              </label>
              <input
                id="goalWeight"
                name="goalWeight"
                type="number"
                min="20"
                max="300"
                required
                value={formData.goalWeight}
                onChange={handleChange}
                className="form-input"
                placeholder="65"
              />
            </div>
            
            <div>
              <label htmlFor="activityLevel" className="form-label">
                Aktivite Seviyesi
              </label>
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
            
            <div>
              <span className="form-label">Diyet Kısıtlamaları</span>
              <div className="mt-1 space-y-2">
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
              <div className="mt-1 space-y-2">
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
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Geri
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Kaydol'
                )}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="mb-6">
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'} text-white font-medium`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'} text-white font-medium`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'} text-white font-medium`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Hesap</span>
          <span className="text-xs text-gray-500">Kişisel Bilgiler</span>
          <span className="text-xs text-gray-500">Hedefler</span>
        </div>
      </div>

      {renderStep()}

      {step === 1 && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Zaten bir hesabınız var mı?</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      )}
    </form>
  );
};

export default Register;