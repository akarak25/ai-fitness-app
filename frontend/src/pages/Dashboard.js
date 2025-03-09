import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { nutritionApi, fitnessApi, progressApi, aiApi, mockDataApi } from '../utils/api';
import { toast } from 'react-toastify';

// Bileşenler
import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatsCards from '../components/dashboard/StatsCards';
import NutritionPlanCard from '../components/dashboard/NutritionPlanCard';
import WorkoutPlanCard from '../components/dashboard/WorkoutPlanCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import AiAssistant from '../components/dashboard/AiAssistant';

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
    chat: false,
    mockData: false
  });

  // Demo veri oluştur
  const createMockData = async () => {
    try {
      setLoading(prev => ({ ...prev, mockData: true }));
      const response = await mockDataApi.createMockData();
      toast.success('Demo veriler başarıyla oluşturuldu!');
      
      // Sayfayı yenile
      window.location.reload();
    } catch (error) {
      toast.error('Demo veriler oluşturulurken bir hata oluştu!');
      console.error('Demo veri oluşturma hatası:', error);
    } finally {
      setLoading(prev => ({ ...prev, mockData: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Beslenme planı
        const nutritionRes = await nutritionApi.getActivePlan();
        setNutritionPlan(nutritionRes);
      } catch (error) {
        console.error('Beslenme planı yüklenemedi:', error);
        // 404 hatasını görmezden geliyoruz
      } finally {
        setLoading(prev => ({ ...prev, nutrition: false }));
      }

      try {
        // Egzersiz planı
        const workoutRes = await fitnessApi.getActivePlan();
        setWorkoutPlan(workoutRes);
      } catch (error) {
        console.error('Egzersiz planı yüklenemedi:', error);
        // 404 hatasını görmezden geliyoruz
      } finally {
        setLoading(prev => ({ ...prev, workout: false }));
      }

      try {
        // İlerleme verileri
        const progressRes = await progressApi.getProgress();
        setProgress(progressRes);
      } catch (error) {
        console.error('İlerleme verileri yüklenemedi:', error);
        // 404 hatasını görmezden geliyoruz
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

  // Herhangi bir veri yok mu kontrol et
  const isNoData = !nutritionPlan && !workoutPlan && (!progress || !progress.measurements || progress.measurements.length === 0);

  return (
    <div className="space-y-6">
      {/* Hoşgeldin Kartı */}
      <WelcomeCard 
        user={user} 
        bmiData={bmiData} 
        createMockData={createMockData} 
        loading={loading} 
        isNoData={isNoData} 
      />

      {/* Özet İstatistikler */}
      <StatsCards />
      
      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Beslenme Planı Kartı */}
        <NutritionPlanCard nutritionPlan={nutritionPlan} loading={loading} />

        {/* Egzersiz Planı Kartı */}
        <WorkoutPlanCard workoutPlan={workoutPlan} loading={loading} />

        {/* İlerleme Kartı */}
        <ProgressCard progress={progress} loading={loading} />
      </div>

      {/* AI Asistan */}
      <AiAssistant 
        chatMessage={chatMessage} 
        setChatMessage={setChatMessage} 
        chatResponse={chatResponse}
        handleChatSubmit={handleChatSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
