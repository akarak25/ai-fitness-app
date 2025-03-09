import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, PlusIcon, CameraIcon } from '@heroicons/react/24/outline';

const ProgressCard = ({ progress, loading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">İlerleme Durumu</h2>
        </div>
      </div>

      <div className="p-5">
        {loading.progress ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : progress && progress.measurements && progress.measurements.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Başlangıç Kilosu</p>
                <p className="mt-1 font-bold text-lg text-gray-900 dark:text-white">
                  {progress.measurements[0].weight} kg
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Güncel Kilo</p>
                <p className="mt-1 font-bold text-lg text-gray-900 dark:text-white">
                  {progress.measurements[progress.measurements.length - 1].weight} kg
                </p>
              </div>
            </div>
            
            {progress.photos && progress.photos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Son Fotoğraf</p>
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
            <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz ilerleme kaydınız bulunmuyor.</p>
            <div className="flex space-x-2">
              <Link
                to="/progress"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Ölçüm Ekle
              </Link>
              <Link
                to="/progress"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <CameraIcon className="mr-2 h-5 w-5" />
                Fotoğraf Ekle
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
        <Link
          to="/progress"
          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 flex items-center"
        >
          İlerleme detayları
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProgressCard;
