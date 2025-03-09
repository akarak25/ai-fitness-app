import React from 'react';
import { Link } from 'react-router-dom';
import { CakeIcon, PlusIcon } from '@heroicons/react/24/outline';

const NutritionPlanCard = ({ nutritionPlan, loading }) => {
  return (
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
  );
};

export default NutritionPlanCard;
