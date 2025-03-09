import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowTrendingUpIcon, PlusIcon } from '@heroicons/react/24/outline';

const WorkoutPlanCard = ({ workoutPlan, loading }) => {
  return (
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
                      <span className="font-medium text-gray-800 dark:text-white">{workoutPlan.workoutDays[0].day || 'Gün 1'}</span>
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
  );
};

export default WorkoutPlanCard;
