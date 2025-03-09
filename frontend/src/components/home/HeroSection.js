import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-blue-700 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Animasyonlu arka plan desenleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-10 w-72 h-72 bg-white opacity-10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 -left-10 w-96 h-96 bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-10 right-40 w-60 h-60 bg-yellow-200 opacity-10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Süsleme desenleri */}
        <div className="hidden lg:block absolute -top-24 -left-24 w-96 h-96">
          <div className="absolute w-full h-full border-2 border-white border-opacity-20 rounded-full"></div>
          <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white border-opacity-20 rounded-full"></div>
          <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white border-opacity-20 rounded-full"></div>
        </div>
        
        <div className="hidden lg:block absolute -bottom-24 -right-24 w-96 h-96">
          <div className="absolute w-full h-full border-2 border-white border-opacity-20 rounded-full"></div>
          <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white border-opacity-20 rounded-full"></div>
          <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white border-opacity-20 rounded-full"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <SparklesIcon className="h-4 w-4 mr-2" />
              <span>Yapay Zeka Destekli Sağlık & Fitness</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              <span className="block">Yapay Zeka</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">Fitness Koçunuz</span>
              <span className="block mt-1">Cebinizde</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white opacity-90 mb-10 max-w-lg mx-auto md:mx-0">
              Kişiselleştirilmiş beslenme planları, akıllı egzersiz rutinleri ve AI destekli sağlık önerileri ile hedeflerinize ulaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/register" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Ücretsiz Başla
              </Link>
              <a 
                href="#features" 
                className="group flex items-center justify-center text-white hover:text-yellow-300 transition duration-300 w-full sm:w-auto"
              >
                <span className="mr-2">Nasıl Çalışır</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            <div className="mt-10 flex flex-col items-center md:items-start">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="Kullanıcı avatarı" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="Kullanıcı avatarı" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="Kullanıcı avatarı" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=4" alt="Kullanıcı avatarı" />
              </div>
              <p className="mt-2 text-sm text-white opacity-90">
                <span className="font-bold">5,000+ kullanıcı</span> hedeflerine ulaştı
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            {/* Görsel animasyonlu kart */}
            <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-1 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img 
                  src="/fitness-app-mockup.jpg" 
                  alt="AI Fitness Uygulaması" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
                
                {/* Mobil gösterim efektleri */}
                <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-2 flex items-center text-white">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500 mr-3">
                    <SparklesIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs opacity-80">Bugünkü kaloriler</div>
                    <div className="font-bold">1,245 / 2,100 cal</div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-2 text-white text-center">
                    <div className="font-bold text-lg">15.2k</div>
                    <div className="text-xs">Adım</div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-2 text-white text-center">
                    <div className="font-bold text-lg">42g</div>
                    <div className="text-xs">Protein</div>
                  </div>
                  <div className="bg-primary-600 bg-opacity-90 backdrop-blur-sm rounded-xl p-2 text-white text-center">
                    <div className="font-bold text-lg">2.5L</div>
                    <div className="text-xs">Su</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Yüzer etiketler */}
            <div className="absolute -top-10 -right-10 bg-yellow-400 text-primary-900 font-semibold px-4 py-2 rounded-full text-sm shadow-lg transform rotate-12 animate-bounce">
              Akıllı Öneriler
            </div>
            <div className="absolute -bottom-8 -left-8 bg-blue-500 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-lg animate-bounce delay-700">
              7/24 AI Asistan
            </div>
          </div>
        </div>
        
        {/* Özellik rozetleri */}
        <div className="hidden lg:flex justify-center mt-16 gap-6">
          <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Güvenli & Gizli
          </div>
          <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            7/24 Destek
          </div>
          <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Son Teknoloji
          </div>
          <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Kanıtlanmış Sonuçlar
          </div>
        </div>
      </div>
      
      {/* Aşağı kaydırma işareti */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-white opacity-70 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;