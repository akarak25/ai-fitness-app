import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { communityApi } from '../utils/api';
import axios from 'axios';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general',
    isPrivate: false,
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'weight_loss', name: 'Kilo Verme' },
    { id: 'muscle_gain', name: 'Kas Kazanımı' },
    { id: 'running', name: 'Koşu' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'nutrition', name: 'Beslenme' },
    { id: 'beginners', name: 'Başlangıç' },
    { id: 'advanced', name: 'İleri Seviye' },
    { id: 'other', name: 'Diğer' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Grup oluşturuluyor...', formData);
      console.log('API endpoint:', `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/community/groups`);
      console.log('Auth header:', axios.defaults.headers.common['Authorization']);
      const response = await communityApi.createGroup(formData);
      toast.success('Grup başarıyla oluşturuldu');
      navigate(`/community/groups/${response._id}`);
    } catch (error) {
      console.error('Grup oluşturma hatası:', error);
      console.error('Hata detayları:', error.response?.data);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Grup oluşturulurken bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Yeni Grup Oluştur</h3>
            <p className="mt-1 text-sm text-gray-600">
              Aynı hedefleri paylaşan kişilerle bağlantı kurmak için yeni bir topluluk grubu oluşturun.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Grup Adı *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Örnek: Kilo Verme Yolculuğu"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Açıklama *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Grubunuzun amacını, hedeflerini ve kurallarını açıklayın"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Grubunuzun amacını ve kimler için olduğunu kısaca açıklayın.
                  </p>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Kategori
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Grup Resmi URL (opsiyonel)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Grubunuzu temsil eden bir resmin URL'sini ekleyin.
                  </p>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isPrivate"
                      name="isPrivate"
                      type="checkbox"
                      checked={formData.isPrivate}
                      onChange={handleChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="isPrivate" className="font-medium text-gray-700">
                      Özel Grup
                    </label>
                    <p className="text-gray-500">
                      Özel gruplar sadece onayladığınız üyeleri içerir. Katılmak isteyenler sizden onay bekler.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate('/community')}
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
                      Oluşturuluyor...
                    </>
                  ) : (
                    'Grup Oluştur'
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

export default CreateGroup;