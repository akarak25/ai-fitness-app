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
      <div className="bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg shadow-md">
        <div className="px-6 py-10 sm:px-10">
          <h1 className="text-2xl font-bold text-white">
            Hoş Geldin, {user?.name?.split(' ')[0] || 'Kullanıcı'}!
          </h1>
          <p className="mt-2 text-white">
            AI fitness asistanın sağlıklı yaşam yolculuğunda sana yardımcı olmak için burada.
          </p>
          
          {bmiData && (
            <div className="mt-6 inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-white font-medium">VKİ:</span>
              <span className="ml-2 text-white font-bold">{bmiData.bmi}</span>
              <span className="ml-2 text-white">({bmiData.category})</span>
            </div>
          )}
        </div>
      </div>

      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Beslenme Planı Kartı */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <CakeIcon className="h-6 w-6 text-primary-600" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">Beslenme Planı</h2>
            </div>
          </div>
          <div className="card-body">
            {loading.nutrition ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : nutritionPlan ? (
              <div className="space-y-4">
                <h3 className="font-medium">{nutritionPlan.name}</h3>
                <p>Günlük hedef: {nutritionPlan.targetCalories} kalori</p>
                <div className="mt-2 flex space-x-2">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {nutritionPlan.targetProtein}g protein
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {nutritionPlan.targetCarbs}g karbonhidrat
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    {nutritionPlan.targetFat}g yağ
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 mb-4">Henüz aktif bir beslenme planınız yok.</p>
                <Link
                  to="/nutrition/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Plan Oluştur
                </Link>
              </div>
            )}
          </div>
          <div className="card-footer">
            <Link
              to="/nutrition"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Tüm planları görüntüle →
            </Link>
          </div>
        </div>

        {/* Egzersiz Planı Kartı */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">Egzersiz Planı</h2>
            </div>
          </div>
          <div className="card-body">
            {loading.workout ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : workoutPlan ? (
              <div className="space-y-4">
                <h3 className="font-medium">{workoutPlan.name}</h3>
                <p>Haftada {workoutPlan.daysPerWeek} gün antrenman</p>
                <p className="capitalize">Hedef: {workoutPlan.goal.replace('_', ' ')}</p>
                {workoutPlan.workoutDays && workoutPlan.workoutDays.length > 0 && (
                  <div className="bg-primary-50 p-3 rounded-md">
                    <p className="font-medium">Bugünkü antrenman:</p>
                    {workoutPlan.workoutDays[0].isRestDay ? (
                      <p>Dinlenme Günü</p>
                    ) : (
                      <ul className="mt-1 space-y-1">
                        {workoutPlan.workoutDays[0].workoutSessions.map((session, idx) => (
                          <li key={idx}>{session.name} ({session.exercises.length} egzersiz)</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 mb-4">Henüz aktif bir egzersiz planınız yok.</p>
                <Link
                  to="/workout/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Plan Oluştur
                </Link>
              </div>
            )}
          </div>
          <div className="card-footer">
            <Link
              to="/workout"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Tüm planları görüntüle →
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
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">AI Fitness Asistanı</h2>
            </div>
            <Link to="/ai-assistant" className="text-sm text-primary-600 hover:text-primary-700">
              Tam sürümü aç →
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {chatResponse && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">{chatResponse.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(chatResponse.timestamp).toLocaleTimeString()}
                </p>
              </div>
            )}
            
            <form onSubmit={handleChatSubmit}>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Bir soru sor veya öneride bulun..."
                  disabled={loading.chat}
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700"
                  disabled={loading.chat}
                >
                  {loading.chat ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Gönder'
                  )}
                </button>
              </div>
            </form>
            
            <div className="text-sm text-gray-500">
              <p>Örnek sorular:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>"Kas kazanmak için en iyi beslenme önerileri nelerdir?"</li>
                <li>"Sabah egzersizi yapmanın faydaları neler?"</li>
                <li>"Su tüketimini artırmak için öneriler verir misin?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;