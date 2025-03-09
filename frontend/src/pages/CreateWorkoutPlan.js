import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fitnessApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CreateWorkoutPlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: 'weight_loss',
    daysPerWeek: 3,
    preferences: '',
    equipment: [],
    injuries: ''
  });

  // Ekipman seçenekleri
  const equipmentOptions = [
    { id: 'none', name: 'Ekipman Yok (Sadece Vücut Ağırlığı)' },
    { id: 'dumbbells', name: 'Dambıl (El Ağırlıkları)' },
    { id: 'resistance_bands', name: 'Direnç Bantları' },
    { id: 'barbell', name: 'Halter (Barfiks)' },
    { id: 'kettlebell', name: 'Kettlebell' },
    { id: 'pullup_bar', name: 'Barfiks Çubuğu' },
    { id: 'bench', name: 'Bench (Sehpa)' },
    { id: 'treadmill', name: 'Koşu Bandı' },
    { id: 'bicycle', name: 'Bisiklet' },
    { id: 'full_gym', name: 'Tam Donanımlı Spor Salonu' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Ekipman seçimini yönet
      setFormData(prev => {
        if (checked) {
          return {
            ...prev,
            equipment: [...prev.equipment, value]
          };
        } else {
          return {
            ...prev,
            equipment: prev.equipment.filter(item => item !== value)
          };
        }
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
    
    try {
      setLoading(true);
      toast.info('Egzersiz planı oluşturuluyor, bu işlem birkaç dakika sürebilir...');
      
      await fitnessApi.generatePlan(formData);
      
      toast.success('Egzersiz planınız başarıyla oluşturuldu!');
      navigate('/workout');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Egzersiz planı oluşturulurken bir hata oluştu'
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
            Egzersiz Planı Oluştur
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">Egzersiz Tercihleri</h3>
                <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                      Egzersiz Hedefi
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
                        <option value="muscle_gain">Kas Kazanımı</option>
                        <option value="endurance">Dayanıklılık</option>
                        <option value="strength">Güç</option>
                        <option value="flexibility">Esneklik</option>
                        <option value="general_fitness">Genel Fitness</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700">
                      Haftada Kaç Gün?
                    </label>
                    <div className="mt-1">
                      <select
                        id="daysPerWeek"
                        name="daysPerWeek"
                        value={formData.daysPerWeek}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="2">2 gün</option>
                        <option value="3">3 gün</option>
                        <option value="4">4 gün</option>
                        <option value="5">5 gün</option>
                        <option value="6">6 gün</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-700">Mevcut Ekipman</legend>
                      <div className="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                        {equipmentOptions.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              id={`equipment-${option.id}`}
                              name="equipment"
                              type="checkbox"
                              value={option.id}
                              checked={formData.equipment.includes(option.id)}
                              onChange={handleChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`equipment-${option.id}`} className="ml-3 text-sm text-gray-700">
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
                      Egzersiz Tercihleri
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="preferences"
                        name="preferences"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Sevdiğiniz egzersiz türlerini, tercihlerinizi belirtebilirsiniz. Örneğin: Koşu yerine bisiklet tercih ederim, grup egzersizleri severim, vs."
                        value={formData.preferences}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      İsteğe bağlı. Özel egzersiz tercihlerinizi belirtebilirsiniz.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="injuries" className="block text-sm font-medium text-gray-700">
                      Sakatlanmalar veya Kısıtlamalar
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="injuries"
                        name="injuries"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Egzersiz yapmanızı engelleyen ya da sınırlayan sağlık sorunları veya sakatlıklar varsa belirtebilirsiniz."
                        value={formData.injuries}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      İsteğe bağlı. Egzersiz yaparken dikkat etmeniz gereken sağlık durumlarını belirtebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/workout')}
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
                    'Egzersiz Planı Oluştur'
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

export default CreateWorkoutPlan;