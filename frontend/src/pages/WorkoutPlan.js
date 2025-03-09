import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fitnessApi } from '../utils/api';
import { 
  ArrowTrendingUpIcon, 
  PlusIcon, 
  ClockIcon, 
  FireIcon, 
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const WorkoutPlan = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(0);
  const [expandedSessions, setExpandedSessions] = useState({});

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const plan = await fitnessApi.getActivePlan();
        setActivePlan(plan);
      } catch (error) {
        console.error('Egzersiz planı getirilemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, []);

  const handleDayChange = (index) => {
    setCurrentDay(index);
    setExpandedSessions({});
  };

  const toggleSession = (sessionIndex) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionIndex]: !prev[sessionIndex]
    }));
  };

  // Belirli bir gün için bugün mü kontrolü
  const isToday = (dayName) => {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const today = new Date().getDay(); // 0 = Pazar, 1 = Pazartesi, ...
    const mappedToday = today === 0 ? 6 : today - 1; // 0 = Pazartesi, ... 6 = Pazar
    return days[mappedToday] === dayName;
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
        <ArrowTrendingUpIcon className="mx-auto h-16 w-16 text-primary-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Egzersiz Planı Yok</h2>
        <p className="mt-2 text-gray-600">Henüz aktif bir egzersiz planınız bulunmuyor</p>
        <div className="mt-6">
          <Link
            to="/workout/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Egzersiz Planı Oluştur
          </Link>
        </div>
      </div>
    );
  }

  // Aktif günün egzersiz planı
  const currentDayPlan = activePlan.workoutDays[currentDay];

  // Egzersiz zorluğuna göre renk sınıfları
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  // Zorluğu Türkçe'ye çevir
  const difficultyText = {
    beginner: 'Başlangıç',
    intermediate: 'Orta',
    advanced: 'İleri'
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{activePlan.name}</h1>
        <div className="flex space-x-2">
          <Link
            to="/workout/create"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowPathIcon className="mr-2 h-5 w-5" />
            Yeni Plan
          </Link>
        </div>
      </div>

      {/* Plan Özeti */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Plan Özeti</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Hedef</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {activePlan.goal === 'weight_loss' ? 'Kilo Vermek' :
                         activePlan.goal === 'weight_gain' ? 'Kas Kazanımı' :
                         activePlan.goal === 'endurance' ? 'Dayanıklılık' :
                         activePlan.goal === 'strength' ? 'Güç' :
                         activePlan.goal === 'flexibility' ? 'Esneklik' : 'Genel Fitness'}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <ClockIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Antrenman Günleri</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        Haftada {activePlan.daysPerWeek} gün
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <FireIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Toplam Kalori Yakımı</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {activePlan.workoutDays.reduce((total, day) => {
                          return total + day.workoutSessions.reduce((sessionTotal, session) => {
                            return sessionTotal + (session.caloriesBurned || 0);
                          }, 0);
                        }, 0)} kcal/hafta
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gün Seçimi */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            {activePlan.workoutDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`${
                  index === currentDay
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0 ${
                  isToday(day.day) ? 'bg-primary-50 rounded-t-md' : ''
                }`}
              >
                {day.day}
                {isToday(day.day) && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Bugün
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Günlük Egzersizler */}
      <div className="space-y-6">
        {currentDayPlan && currentDayPlan.isRestDay ? (
          <div className="bg-green-50 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Dinlenme Günü</h3>
              <p className="mt-1 text-sm text-gray-500">
                Bugün dinlenme günü. Kaslarınızın iyileşmesi için dinlenin ve su içmeyi unutmayın.
              </p>
            </div>
          </div>
        ) : (
          currentDayPlan && currentDayPlan.workoutSessions.map((session, sessionIndex) => (
            <div key={sessionIndex} className="bg-white shadow overflow-hidden rounded-lg">
              <div 
                className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSession(sessionIndex)}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{session.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {session.exercises.length} egzersiz • {session.duration || 30} dakika
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[session.difficulty]}`}>
                    {difficultyText[session.difficulty]}
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <FireIcon className="h-5 w-5 mr-1 text-red-500" />
                    {session.caloriesBurned || '150'} kcal
                  </span>
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      expandedSessions[sessionIndex] ? 'transform rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              
              {expandedSessions[sessionIndex] && (
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {session.exercises.map((exercise, exerciseIndex) => (
                        <li key={exerciseIndex} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center">
                              <span className="text-primary-700 font-semibold">{exerciseIndex + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-medium text-gray-900 truncate">
                                {exercise.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {exercise.sets} set × {exercise.reps} tekrar
                                {exercise.restTime && ` • ${exercise.restTime} sn dinlenme`}
                              </p>
                            </div>
                          </div>
                          {exercise.description && (
                            <div className="mt-2 ml-14">
                              <p className="text-sm text-gray-600">{exercise.description}</p>
                            </div>
                          )}
                          {exercise.notes && (
                            <div className="mt-2 ml-14 bg-yellow-50 p-2 rounded-md">
                              <p className="text-sm text-yellow-800">{exercise.notes}</p>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {session.notes && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900">Notlar:</h4>
                      <p className="mt-1 text-sm text-gray-600">{session.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {/* Günlük Notlar */}
        {currentDayPlan && currentDayPlan.notes && (
          <div className="bg-yellow-50 rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Günlük Notlar</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>{currentDayPlan.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlan;