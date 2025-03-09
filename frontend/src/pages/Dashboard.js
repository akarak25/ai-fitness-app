import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CakeIcon, 
  ArrowTrendingUpIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon,
  CameraIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { nutritionApi, fitnessApi, progressApi, aiApi } from '../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [progress, setProgress] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState({
    nutrition: true,
    workout: true,
    progress: true,
    chat: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Beslenme planı
        const nutritionRes = await nutritionApi.getActivePlan();
        setNutritionPlan(nutritionRes);
      } catch (error) {
        console.error('Beslenme planı yüklenemedi:', error);
      } finally {
        setLoading(prev => ({ ...prev, nutrition: false }));
      }

      try {
        // Egzersiz planı
        const workoutRes = await fitnessApi.getActivePlan();
        setWorkoutPlan(workoutRes);
      } catch (error) {
        console.error('Egzersiz planı yüklenemedi:', error);
      } finally {
        setLoading(prev => ({ ...prev, workout: false }));
      }

      try {
        // İlerleme verileri
        const progressRes = await progressApi.getProgress();
        setProgress(progressRes);
      } catch (error) {
        console.error('İlerleme verileri yüklenemedi:', error);
      } finally {
        setLoading(prev => ({ ...prev, progress: false }));
      }
    };

    fetchData();
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    try {
      setLoading(prev => ({ ...prev, chat: true }));
      const response = await aiApi.chatWithAssistant(chatMessage);
      setChatResponse(response);
      setChatMessage('');
    } catch (error) {
      toast.error('AI asistanı ile konuşurken bir hata oluştu');
      console.error('Chat error:', error);
    } finally {
      setLoading(prev => ({ ...prev, chat: false }));
    }
  };

  // BMI hesapla
  const calculateBMI = () => {
    if (!user) return null;
    
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    let category = '';
    if (bmi < 18.5) category = 'Zayıf';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Fazla Kilolu';
    else category = 'Obez';
    
    return { bmi, category };
  };

  const bmiData = calculateBMI();

  return (
    <div className="space-y-6">
      {/* Hoşgeldin Kartı */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-500 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          {/* Dekoratif şekiller */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white opacity-10 rounded-full w-40 h-40"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 bg-white opacity-10 rounded-full w-40 h-40"></div>
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 bg-white opacity-5 rounded-full w-60 h-60"></div>
          
          <div className="px-6 py-10 sm:px-10 relative z-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Hoş Geldin, {user?.name?.split(' ')[0] || 'Kullanıcı'}!
            </h1>
            <p className="mt-2 text-white text-opacity-90">
              AI fitness asistanın sağlıklı yaşam yolculuğunda sana yardımcı olmak için burada.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              {bmiData && (
                <div className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="text-white font-medium">VKİ:</span>
                  <span className="ml-2 text-white font-bold">{bmiData.bmi}</span>
                  <span className="ml-2 text-white">({bmiData.category})</span>
                </div>
              )}
              
              <div className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-white font-medium">Bugünün Hedefi:</span>
                <span className="ml-2 text-white font-bold">2100 kalori</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Özet İstatistikler */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Günlük Kalori</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">1,842</p>
            </div>
            <div className="p-2 rounded-md bg-blue-100 text-blue-600">
              <CakeIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
              </svg>
              %12 Hedefin Altı
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Protein</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">132g</p>
            </div>
            <div className="p-2 rounded-md bg-green-100 text-green-600">
              <ArrowTrendingUpIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-blue-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              %95 Hedef
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Su Tüketimi</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">1.2L</p>
            </div>
            <div className="p-2 rounded-md bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-red-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15a1 1 0 001 1h2a1 1 0 001-1v-4.5H8V15zm1-11a1 1 0 10-2 0v1h2V4z" clipRule="evenodd"></path>
                <path d="M1 2a1 1 0 011-1h16a1 1 0 011 1v1a1 1 0 01-1 1H2a1 1 0 01-1-1V2z"></path>
              </svg>
              %50 Kaldı
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Adım Sayısı</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">7,842</p>
            </div>
            <div className="p-2 rounded-md bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-yellow-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              %78 Tamamlandı
            </div>
          </div>
        </div>
      </div>
      
      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Beslenme Planı Kartı */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CakeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Beslenme Planı</h2>
            </div>
            <div className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
              Aktif
            </div>
          </div>
          
          <div className="p-5">
            {loading.nutrition ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : nutritionPlan ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">{nutritionPlan.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Günlük hedef: {nutritionPlan.targetCalories} kalori</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Makro Besin Dağılımı</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-28">Protein:</span>
                      <div className="flex-grow h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-2.5" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{nutritionPlan.targetProtein}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-28">Karbonhidrat:</span>
                      <div className="flex-grow h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-2.5" style={{ width: '70%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{nutritionPlan.targetCarbs}g</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-28">Yağ:</span>
                      <div className="flex-grow h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-2.5" style={{ width: '40%' }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{nutritionPlan.targetFat}g</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Son Güncelleme: 3 gün önce</p>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="mb-3 p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz aktif bir beslenme planınız yok.</p>
                <Link
                  to="/nutrition/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Plan Oluştur
                </Link>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            <Link
              to="/nutrition"
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 flex items-center"
            >
              Tüm planları görüntüle
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Egzersiz Planı Kartı */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Egzersiz Planı</h2>
            </div>
            <div className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
              Bu Hafta
            </div>
          </div>
          
          <div className="p-5">
            {loading.workout ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : workoutPlan ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">{workoutPlan.name}</h3>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                      <span className="text-xs text-purple-500 dark:text-purple-300 block mb-1">Haftalık</span>
                      <span className="text-base font-medium text-gray-800 dark:text-white">{workoutPlan.daysPerWeek} gün</span>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                      <span className="text-xs text-purple-500 dark:text-purple-300 block mb-1">Hedef</span>
                      <span className="text-base font-medium text-gray-800 dark:text-white capitalize">{workoutPlan.goal.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                {workoutPlan.workoutDays && workoutPlan.workoutDays.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-gray-900 dark:text-white">Bugünkü Antrenman</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Aktif
                      </span>
                    </div>
                    
                    {workoutPlan.workoutDays[0].isRestDay ? (
                      <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Dinlenme Günü</span>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-3 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex justify-between items-center">
                          <span className="font-medium text-gray-800 dark:text-white">{workoutPlan.workoutDays[0].name || 'Gün 1'}</span>
                          <span className="text-xs text-purple-600 dark:text-purple-300">{workoutPlan.workoutDays[0].workoutSessions.length} seans</span>
                        </div>
                        <ul className="space-y-2">
                          {workoutPlan.workoutDays[0].workoutSessions.map((session, idx) => (
                            <li key={idx} className="flex items-center justify-between px-3 py-2 border border-gray-100 dark:border-gray-700 rounded-lg">
                              <span className="text-sm text-gray-800 dark:text-gray-200">{session.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{session.exercises.length} egzersiz</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="mb-3 p-3 rounded-full bg-purple-50 dark:bg-purple-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz aktif bir egzersiz planınız yok.</p>
                <Link
                  to="/workout/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Plan Oluştur
                </Link>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            <Link
              to="/workout"
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 flex items-center"
            >
              Tüm planları görüntüle
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* İlerleme Kartı */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-primary-600" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">İlerleme Durumu</h2>
            </div>
          </div>
          <div className="card-body">
            {loading.progress ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : progress && progress.measurements && progress.measurements.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-gray-500 text-xs">Başlangıç Kilosu</p>
                    <p className="mt-1 font-bold text-lg text-gray-900">
                      {progress.measurements[0].weight} kg
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-gray-500 text-xs">Güncel Kilo</p>
                    <p className="mt-1 font-bold text-lg text-gray-900">
                      {progress.measurements[progress.measurements.length - 1].weight} kg
                    </p>
                  </div>
                </div>
                
                {progress.photos && progress.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Son Fotoğraf</p>
                    <div className="aspect-w-1 aspect-h-1">
                      <img 
                        src={progress.photos[progress.photos.length - 1].photoUrl} 
                        alt="İlerleme Fotoğrafı" 
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 mb-4">Henüz ilerleme kaydınız bulunmuyor.</p>
                <div className="flex space-x-2">
                  <Link
                    to="/progress"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Ölçüm Ekle
                  </Link>
                  <Link
                    to="/progress"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <CameraIcon className="mr-2 h-5 w-5" />
                    Fotoğraf Ekle
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="card-footer">
            <Link
              to="/progress"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              İlerleme detayları →
            </Link>
          </div>
        </div>
      </div>

      {/* AI Asistan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-2 lg:col-span-3 mt-4">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="ml-3 text-lg font-semibold">AI Fitness Asistanı</h2>
            </div>
            <Link 
              to="/ai-assistant" 
              className="text-sm text-white/90 hover:text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center backdrop-blur-sm"
            >
              <span>Tam sürümü aç</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="p-5">
          <div className="space-y-6">
            {chatResponse ? (
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700 relative">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-600 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">AI</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-gray-100">{chatResponse.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(chatResponse.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <ChatBubbleLeftRightIcon className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-gray-500 dark:text-gray-400">Fitness asistanınız ile ilgili sorularınızı sorun</p>
              </div>
            )}
            
            <form onSubmit={handleChatSubmit} className="mt-6">
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 block w-full rounded-l-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm py-3"
                  placeholder="Bir soru sor veya öneride bulun..."
                  disabled={loading.chat}
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-r-lg text-white bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-700 hover:to-blue-600 transition-all duration-200"
                  disabled={loading.chat}
                >
                  {loading.chat ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="flex items-center">
                      <span>Gönder</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Önerilen Sorular:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                  Kas kazanmak için en iyi beslenme önerileri nelerdir?
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                  Sabah egzersizi yapmanın faydaları neler?
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                  Su tüketimini artırmak için öneriler verir misin?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;