import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Sayfa Bulunamadı</h2>
        <p className="mt-6 text-base text-gray-500">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;