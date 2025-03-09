import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { communityApi } from '../utils/api';
import { UserGroupIcon, PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const Community = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: '', name: 'Tümü' },
    { id: 'weight_loss', name: 'Kilo Verme' },
    { id: 'muscle_gain', name: 'Kas Kazanımı' },
    { id: 'running', name: 'Koşu' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'nutrition', name: 'Beslenme' },
    { id: 'beginners', name: 'Başlangıç' },
    { id: 'advanced', name: 'İleri Seviye' },
    { id: 'other', name: 'Diğer' }
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (selectedCategory) params.category = selectedCategory;
        
        const response = await communityApi.getGroups(params);
        setGroups(response);
      } catch (error) {
        console.error('Topluluk grupları yüklenemedi:', error);
        toast.error('Topluluk grupları yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [search, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Arama değeri zaten state'de olduğu için useEffect tetiklenecek
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await communityApi.joinGroup(groupId);
      toast.success(response.message);
      
      // Grupları yeniden yükle
      const updatedGroups = await communityApi.getGroups({
        search,
        category: selectedCategory
      });
      setGroups(updatedGroups);
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Gruba katılırken bir hata oluştu'
      );
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Topluluk
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/community/create-group"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Yeni Grup Oluştur
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="max-w-2xl w-full">
              <form onSubmit={handleSearch}>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                      placeholder="Grup ara..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <span>Ara</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : groups.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div
                key={group._id}
                className="bg-white overflow-hidden shadow rounded-lg flex flex-col"
              >
                <div className="px-4 py-5 sm:p-6 flex-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {group.imageUrl ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={group.imageUrl}
                          alt={group.name}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <UserGroupIcon className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {group.category === 'weight_loss' ? 'Kilo Verme' :
                           group.category === 'muscle_gain' ? 'Kas Kazanımı' :
                           group.category === 'running' ? 'Koşu' :
                           group.category === 'yoga' ? 'Yoga' :
                           group.category === 'nutrition' ? 'Beslenme' :
                           group.category === 'beginners' ? 'Başlangıç' :
                           group.category === 'advanced' ? 'İleri Seviye' : 'Diğer'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {group.members?.length || 0} üye
                        </span>
                        {group.isPrivate && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Özel Grup
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center">
                  <Link
                    to={`/community/groups/${group._id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Detayları Görüntüle
                  </Link>
                  {group.members.some(memberId => memberId === (typeof memberId === 'object' ? memberId._id : memberId)) ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Üyesiniz
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleJoinGroup(group._id)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {group.isPrivate ? 'Katılmak İçin İstek Gönder' : 'Gruba Katıl'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Topluluk Bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aramanıza uygun topluluk grubu bulunamadı.
            </p>
            <div className="mt-6">
              <Link
                to="/community/create-group"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Yeni Grup Oluştur
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;