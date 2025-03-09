import React from 'react';
import { 
  CakeIcon, 
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const StatsCards = () => {
  return (
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
  );
};

export default StatsCards;
