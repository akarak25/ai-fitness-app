import React from 'react';

const WelcomeCard = ({ user, bmiData, createMockData, loading, isNoData }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-blue-500 rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        {/* Dekoratif şekiller */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white opacity-10 rounded-full w-40 h-40"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 bg-white opacity-10 rounded-full w-40 h-40"></div>
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 bg-white opacity-5 rounded-full w-60 h-60"></div>
        
        <div className="px-6 py-10 sm:px-10 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Hoş Geldin, {user?.name?.split(' ')[0] || 'Kullanıcı'}!
              </h1>
              <p className="mt-2 text-white text-opacity-90">
                AI fitness asistanın sağlıklı yaşam yolculuğunda sana yardımcı olmak için burada.
              </p>
            </div>
            
            {/* Demo Veri Butonu */}
            {isNoData && (
              <button
                onClick={createMockData}
                disabled={loading.mockData}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors duration-200 text-sm font-medium flex items-center"
              >
                {loading.mockData ? (
                  <>
                    <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Demo Veriler Yükleniyor...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Demo Veriler Oluştur
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            {bmiData && (
              <div className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-white font-medium">VKİ:</span>
                <span className="ml-2 text-white font-bold">{bmiData.bmi}</span>
                <span className="ml-2 text-white">({bmiData.category})</span>
              </div>
            )}
            
            <div className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-white font-medium">Bugünün Hedefi:</span>
              <span className="ml-2 text-white font-bold">2100 kalori</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
