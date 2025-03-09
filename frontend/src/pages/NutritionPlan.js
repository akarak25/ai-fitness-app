import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { nutritionApi, aiApi } from '../utils/api';
import { CakeIcon, PlusIcon, ShoppingCartIcon, CameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const NutritionPlan = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(0);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [photoUpload, setPhotoUpload] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [foodAnalysis, setFoodAnalysis] = useState(null);

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const plan = await nutritionApi.getActivePlan();
        setActivePlan(plan);
      } catch (error) {
        console.error('Beslenme planı getirilemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, []);

  const handleDayChange = (index) => {
    setCurrentDay(index);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhotoUpload(e.target.files[0]);
    }
  };

  const analyzeFood = async () => {
    if (!photoUpload) {
      toast.error('Lütfen bir yemek fotoğrafı yükleyin');
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('photo', photoUpload);

      const result = await aiApi.analyzeFoodImage(formData);
      setFoodAnalysis(result);
      setPhotoUpload(null);
      // Input alanını temizle
      document.getElementById('food-photo').value = '';
    } catch (error) {
      toast.error('Yemek analizi yapılırken bir hata oluştu');
      console.error('Yemek analizi hatası:', error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleShoppingItemToggle = async (itemIndex) => {
    if (!activePlan) return;

    try {
      const updatedList = [...activePlan.shoppingList];
      updatedList[itemIndex].checked = !updatedList[itemIndex].checked;

      await nutritionApi.updatePlan(activePlan._id, {
        shoppingList: updatedList
      });

      setActivePlan({
        ...activePlan,
        shoppingList: updatedList
      });
    } catch (error) {
      toast.error('Alışveriş listesi güncellenirken bir hata oluştu');
      console.error('Alışveriş listesi güncelleme hatası:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!activePlan) {
    return (
      <div className="text-center py-12">
        <CakeIcon className="mx-auto h-16 w-16 text-primary-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Beslenme Planı Yok</h2>
        <p className="mt-2 text-gray-600">Henüz aktif bir beslenme planınız bulunmuyor</p>
        <div className="mt-6">
          <Link
            to="/nutrition/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Beslenme Planı Oluştur
          </Link>
        </div>
      </div>
    );
  }

  // Aktif günün beslenme planı
  const currentDayPlan = activePlan.dayPlans[currentDay];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{activePlan.name}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowShoppingList(!showShoppingList)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ShoppingCartIcon className="mr-2 h-5 w-5 text-gray-500" />
            Alışveriş Listesi
          </button>
          <Link
            to="/nutrition/create"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowPathIcon className="mr-2 h-5 w-5" />
            Yeni Plan
          </Link>
        </div>
      </div>

      {/* Günlük Makrolar ve Hedefler */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Günlük Hedefler</h2>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex-1 min-w-[120px]">
              <div className="text-sm font-medium text-gray-500">Kalori</div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">{activePlan.targetCalories}</div>
              <div className="text-sm text-gray-500">kcal/gün</div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-sm font-medium text-gray-500">Protein</div>
              <div className="mt-1 text-3xl font-semibold text-blue-600">{activePlan.targetProtein}g</div>
              <div className="text-sm text-gray-500">{Math.round(activePlan.targetProtein * 4 / activePlan.targetCalories * 100)}%</div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-sm font-medium text-gray-500">Karbonhidrat</div>
              <div className="mt-1 text-3xl font-semibold text-green-600">{activePlan.targetCarbs}g</div>
              <div className="text-sm text-gray-500">{Math.round(activePlan.targetCarbs * 4 / activePlan.targetCalories * 100)}%</div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-sm font-medium text-gray-500">Yağ</div>
              <div className="mt-1 text-3xl font-semibold text-yellow-600">{activePlan.targetFat}g</div>
              <div className="text-sm text-gray-500">{Math.round(activePlan.targetFat * 9 / activePlan.targetCalories * 100)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alışveriş Listesi (Conditional) */}
      {showShoppingList && (
        <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Alışveriş Listesi</h2>
            {activePlan.shoppingList && activePlan.shoppingList.length > 0 ? (
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activePlan.shoppingList.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`item-${index}`}
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleShoppingItemToggle(index)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`item-${index}`}
                        className={`ml-3 block text-sm ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}
                      >
                        {item.item} {item.quantity && `(${item.quantity})`}
                        {item.category && (
                          <span className="ml-1 text-xs text-gray-500">{item.category}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-2 text-gray-500">Alışveriş listesi bulunamadı</p>
            )}
          </div>
        </div>
      )}

      {/* Yemek Analizi */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Yemek Fotoğrafı ile Kalori Analizi</h2>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="food-photo" className="block text-sm font-medium text-gray-700">
                  Yemek fotoğrafı yükle
                </label>
                <div className="mt-1 flex">
                  <input
                    id="food-photo"
                    name="food-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="food-photo"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Fotoğraf Seç</span>
                  </label>
                  <p className="ml-3 text-gray-500 self-center text-sm">
                    {photoUpload ? photoUpload.name : 'Henüz dosya seçilmedi'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={analyzeFood}
                disabled={!photoUpload || uploadLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {uploadLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CameraIcon className="mr-2 h-5 w-5" />
                    Analiz Et
                  </>
                )}
              </button>
            </div>

            {foodAnalysis && (
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <div className="sm:flex sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{foodAnalysis.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{foodAnalysis.portion}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <div className="text-xl font-bold text-primary-600">{foodAnalysis.calories} kcal</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Protein</span>
                    <span className="block mt-1 text-lg font-semibold text-blue-600">{foodAnalysis.protein}g</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Karbonhidrat</span>
                    <span className="block mt-1 text-lg font-semibold text-green-600">{foodAnalysis.carbs}g</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Yağ</span>
                    <span className="block mt-1 text-lg font-semibold text-yellow-600">{foodAnalysis.fat}g</span>
                  </div>
                </div>
                {foodAnalysis.photoUrl && (
                  <div className="mt-4">
                    <img
                      src={foodAnalysis.photoUrl}
                      alt={foodAnalysis.name}
                      className="h-48 w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gün Seçimi */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            {activePlan.dayPlans.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`${
                  index === currentDay
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0`}
              >
                {day.day}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Günlük Öğünler */}
      <div className="space-y-6">
        {currentDayPlan && currentDayPlan.meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-4 sm:px-6 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">{meal.name}</h3>
              <div className="text-sm text-gray-500">
                {meal.totalCalories} kcal
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{food.name}</p>
                          <p className="text-sm text-gray-500">{food.portion}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-4">
                          <div className="flex space-x-2 text-sm">
                            <span className="text-blue-600 font-medium">{food.protein}g</span>
                            <span className="text-green-600 font-medium">{food.carbs}g</span>
                            <span className="text-yellow-600 font-medium">{food.fat}g</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{food.calories} kcal</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm">
                  <div>
                    <span className="text-gray-500">Protein:</span>
                    <span className="ml-1 text-blue-600 font-medium">{meal.totalProtein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Karbonhidrat:</span>
                    <span className="ml-1 text-green-600 font-medium">{meal.totalCarbs}g</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Yağ:</span>
                    <span className="ml-1 text-yellow-600 font-medium">{meal.totalFat}g</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Toplam: {meal.totalCalories} kcal
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Günlük Toplam */}
        <div className="bg-gray-50 rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Günlük Toplam</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-500">Kalori</span>
                <span className="block mt-1 text-lg font-semibold text-gray-900">
                  {currentDayPlan?.totalDailyCalories || 0} kcal
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Protein</span>
                <span className="block mt-1 text-lg font-semibold text-blue-600">
                  {currentDayPlan?.totalDailyProtein || 0}g
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Karbonhidrat</span>
                <span className="block mt-1 text-lg font-semibold text-green-600">
                  {currentDayPlan?.totalDailyCarbs || 0}g
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Yağ</span>
                <span className="block mt-1 text-lg font-semibold text-yellow-600">
                  {currentDayPlan?.totalDailyFat || 0}g
                </span>
              </div>
            </div>
            {currentDayPlan?.notes && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">{currentDayPlan.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlan;