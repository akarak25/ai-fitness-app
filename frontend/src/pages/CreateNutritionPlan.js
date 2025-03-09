import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { nutritionApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CreateNutritionPlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: 'weight_loss',
    preferences: '',
    restrictions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      toast.info('Beslenme planı oluşturuluyor, bu işlem birkaç dakika sürebilir...');
      
      await nutritionApi.generatePlan(formData);
      
      toast.success('Beslenme planınız başarıyla oluşturuldu!');
      navigate('/nutrition');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Beslenme planı oluşturulurken bir hata oluştu'
      );
      console.error('Plan oluşturma hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Beslenme Planı Oluştur
          </h2>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Kişisel Bilgiler</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Bu bilgiler profilinizden otomatik olarak alınmıştır.</p>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Cinsiyet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={user?.gender === 'male' ? 'Erkek' : user?.gender === 'female' ? 'Kadın' : 'Diğer'}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Yaş
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={user?.age}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Boy
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={`${user?.height} cm`}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Kilo
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={`${user?.weight} kg`}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Hedef Kilo
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={`${user?.goalWeight} kg`}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Aktivite Seviyesi
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={
                          user?.activityLevel === 'sedentary' ? 'Hareketsiz' :
                          user?.activityLevel === 'light' ? 'Hafif Aktif' :
                          user?.activityLevel === 'moderate' ? 'Orta Aktif' :
                          user?.activityLevel === 'active' ? 'Aktif' :
                          user?.activityLevel === 'very_active' ? 'Çok Aktif' : ''
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Diyet Kısıtlamaları
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={user?.dietaryRestrictions?.join(', ') || 'Yok'}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Sağlık Durumları
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={user?.healthConditions?.join(', ') || 'Yok'}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Plan Tercihleri</h3>
                <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                      Beslenme Hedefi
                    </label>
                    <div className="mt-1">
                      <select
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="weight_loss">Kilo Vermek</option>
                        <option value="weight_gain">Kilo Almak</option>
                        <option value="maintenance">Mevcut Kiloyu Korumak</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
                      Yemek Tercihleri
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="preferences"
                        name="preferences"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Sevdiğiniz yiyecekleri, pişirme yöntemlerini veya yemek tercihlerinizi belirtebilirsiniz. Örneğin: Akdeniz mutfağını seviyorum, protein ağırlıklı beslenmeyi tercih ederim, vs."
                        value={formData.preferences}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      İsteğe bağlı. Özel tercihlerinizi belirtebilirsiniz.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700">
                      Ek Kısıtlamalar
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="restrictions"
                        name="restrictions"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Profilinizde belirtilmeyen ek diyet kısıtlamalarınız veya sevmediğiniz yiyecekler varsa belirtebilirsiniz."
                        value={formData.restrictions}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      İsteğe bağlı. Sevmediğiniz yiyecekler veya ek kısıtlamalarınızı belirtebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/nutrition')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Plan Oluşturuluyor...
                    </>
                  ) : (
                    'Beslenme Planı Oluştur'
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

export default CreateNutritionPlan;