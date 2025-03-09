import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const CtaSection = () => {
  return (
    <section id="cta" className="py-20 relative">
      {/* Arka plan animasyonu */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-3xl">
          <div className="flex flex-col lg:flex-row">
            {/* Sol taraf - Ana mesaj */}
            <div className="p-8 sm:p-12 lg:p-16 lg:w-2/3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                <SparklesIcon className="h-4 w-4 mr-2" />
                <span>Ücretsiz Başlangıç</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
                Sağlıklı yaşam <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">yolculuğunuza</span> bugün başlayın!
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Kişiselleştirilmiş beslenme planları, akıllı egzersiz rutinleri ve AI destekli sağlık önerileri ile hedefinize bir adım daha yaklaşın. 
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl shadow-lg bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Ücretsiz Hesap Oluştur
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                >
                  Giriş Yap
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex -space-x-2">
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="Kullanıcı" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="Kullanıcı" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="Kullanıcı" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=4" alt="Kullanıcı" />
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 ring-2 ring-white text-sm font-medium">
                      +2k
                    </div>
                  </div>
                  <p className="text-gray-500">
                    <strong className="font-semibold text-gray-900">2,000+ kullanıcı</strong> bu ay katıldı
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sağ taraf - Mobil görsel ve özellikler */}
            <div className="lg:w-1/3 bg-gray-50 p-8 sm:p-12 flex items-center justify-center">
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Yapay Zeka Destekli</h3>
                    <p className="text-gray-600">
                      En son AI teknolojisi ile beslenme ve fitness planlarınız sürekli güncellenir.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Kişiselleştirilmiş</h3>
                    <p className="text-gray-600">
                      Her kullanıcı için özel beslenme ve egzersiz planları oluşturulur.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">7/24 Destek</h3>
                    <p className="text-gray-600">
                      Yapay zeka asistanımız sorularınızı her an yanıtlamaya hazır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI Fitness, sağlıklı yaşam hedeflerinize ulaşmanız için en gelişmiş teknolojileri bir araya getirir. 
            Kullanımı kolay arayüzü, kişiselleştirilmiş önerileri ve topluluk desteği ile yaşam tarzınızı değiştirmenize yardımcı olur.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-700 font-medium">Ücretsiz Başlangıç</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-700 font-medium">Yapay Zeka Teknolojisi</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-700 font-medium">Kişiselleştirilmiş Planlar</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-700 font-medium">Topluluk Desteği</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;