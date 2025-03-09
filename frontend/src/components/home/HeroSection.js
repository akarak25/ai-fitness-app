import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-blue-600 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-40 -left-10 w-96 h-96 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 right-40 w-60 h-60 bg-white opacity-10 rounded-full"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Yapay Zeka ile <br />
              <span className="text-yellow-300">Fitness Yolculuğunuzda</span><br />
              Yanınızdayız
            </h1>
            <p className="text-xl text-white opacity-90 mb-10 max-w-lg mx-auto md:mx-0">
              Kişiselleştirilmiş beslenme planları, akıllı egzersiz rutinleri ve AI destekli sağlık önerileri ile hedeflerinize ulaşın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition duration-300 w-full sm:w-auto text-center">
                Ücretsiz Başla
              </Link>
              <a href="#features" className="flex items-center justify-center text-white hover:text-yellow-300 transition duration-300 group">
                <span className="mr-2">Daha fazla öğren</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://placehold.co/600x400/dbeafe/1e40af?text=AI+Fitness+Platform" 
              alt="AI Fitness Platform" 
              className="rounded-lg shadow-2xl max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;