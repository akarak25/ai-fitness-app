import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CakeIcon, 
  CameraIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon, 
  CpuChipIcon, 
  FaceSmileIcon, 
  ArrowTrendingUpIcon, 
  ShoppingCartIcon, 
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  // Seçilen özellik için state
  const [selectedFeature, setSelectedFeature] = useState(0);
  
  const features = [
    {
      icon: CakeIcon,
      title: "Kişiselleştirilmiş Beslenme Planları",
      description: "AI modelimiz, vücut tipinize, aktivite seviyenize ve beslenme tercihlerinize göre kişiselleştirilmiş yemek planları oluşturur. Planlarınız beslenme uzmanları tarafından doğrulanmıştır ve gerçek zamanlı olarak güncellenir.",
      image: "/nutrition-plan.jpg", // Varsayılan görsel
      color: "blue"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Sanal Fitness Koçu",
      description: "Yapay zeka destekli fitness koçumuz, fiziksel durumunuzu ve hedeflerinizi analiz ederek size özel egzersiz rutinleri oluşturur. Egzersiz formunuzu kamera ile analiz eder ve gerçek zamanlı düzeltmeler sağlar.",
      image: "/workout-coach.jpg",
      color: "purple"
    },
    {
      icon: CameraIcon,
      title: "Akıllı Kalori Takibi",
      description: "Yemek fotoğrafınızı çekin, AI teknolojimiz yemeği anında tanımlayıp kalorisini ve besin değerlerini hesaplasın. Manuel giriş yapmaya son - yemeklerinizin fotoğrafını çekmeniz yeterli!",
      image: "/calorie-tracking.jpg",
      color: "green"
    },
    {
      icon: ChartBarIcon,
      title: "İlerleme Analizi",
      description: "Yapay zeka ilerleme fotoğraflarınızı analiz ederek vücut değişimlerinizi görsel raporlarla sunar. Hedeflerinize giden yolda nereden nereye geldiğinizi görmek motivasyonunuzu artırır.",
      image: "/progress-analysis.jpg",
      color: "indigo"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Soru-Cevap Botu",
      description: "Beslenme, fitness ve sağlık konularındaki tüm sorularınızı yapay zeka asistanımıza sorun. Kapsamlı bilgi tabanımız ve gelişmiş AI modelleri ile sorularınızı anında yanıtlar.",
      image: "/ai-assistant.jpg",
      color: "pink"
    },
    {
      icon: CpuChipIcon,
      title: "Gelişmiş AI Algoritmaları",
      description: "En son yapay zeka teknolojileri ve makine öğrenmesi algoritmaları ile sağlık verilerinizi analiz ederek size en doğru ve etkili önerileri sunarız. AI modellerimiz sürekli olarak öğrenir ve gelişir.",
      image: "/ai-technology.jpg",
      color: "yellow"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Arka plan süslemeleri */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <SparklesIcon className="h-4 w-4 mr-2" />
            <span>Yapay Zeka Teknolojisiyle</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Akıllı Özellikler</span> ile Sağlıklı Yaşamı Keşfedin
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600 mx-auto mb-16">
            AI Fitness, sağlıklı bir yaşam tarzı için ihtiyacınız olan tüm araçları tek bir uygulamada sunuyor. Kişiselleştirilmiş deneyiminiz için AI teknolojimiz 7/24 yanınızda.
          </p>
        </div>

        {/* Özellikler - Mobil için kart görünümü */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100">
              <div className={`h-3 bg-${feature.color}-500`}></div>
              <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 bg-${feature.color}-100 text-${feature.color}-600 rounded-lg mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
              {index === 4 && (
                <div className="px-6 pb-6">
                  <Link to="/login?redirect=ai-assistant" className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                    Hemen Deneyin
                    <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Özellikler - Masaüstü için etkileşimli görünüm */}
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 flex items-start ${selectedFeature === index ? 'border-primary-400 bg-primary-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setSelectedFeature(index)}
              >
                <div className={`flex-shrink-0 inline-flex items-center justify-center p-3 bg-${feature.color}-100 text-${feature.color}-600 rounded-lg mr-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description.substring(0, 80)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hidden lg:block col-span-7 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md transform transition-all duration-500 ease-in-out translate-y-0 opacity-100">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Özellik görseli */}
                  <div className="aspect-video relative">
                    <img 
                      src={features[selectedFeature].image}
                      alt={features[selectedFeature].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://source.unsplash.com/800x600/?fitness,${features[selectedFeature].title.toLowerCase()}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h4 className="text-2xl font-bold mb-2">{features[selectedFeature].title}</h4>
                      <p className="text-white text-opacity-90">{features[selectedFeature].description.substring(0, 120)}...</p>
                    </div>
                  </div>
                  
                  {/* Özellik detayları */}
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {React.createElement(features[selectedFeature].icon, { className: "w-5 h-5 text-primary-500 mr-2" })}
                        <span className="font-medium">Yapay Zeka Destekli</span>
                      </div>
                      
                      {selectedFeature === 4 && (
                        <Link to="/login?redirect=ai-assistant" className="inline-flex items-center px-3 py-1 rounded-md bg-primary-100 text-primary-700 font-medium text-sm hover:bg-primary-200 transition-colors duration-300">
                          Şimdi Dene
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-between text-sm text-gray-500">
                        <div>
                          <div className="font-medium text-gray-900 mb-1">Kişiselleştirilmiş</div>
                          <div>Sizin için özel olarak tasarlandı</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 mb-1">Gerçek Zamanlı</div>
                          <div>Anında sonuçlar ve öneriler</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bilgi kartı */}
        <div className="mt-24 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="p-8 md:p-12 md:w-2/3">
              <div className="text-sm font-semibold text-blue-100 uppercase">Yapay Zeka Teknolojisi</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">
                Modern Yapay Zeka Teknolojilerini Kullanarak Sağlıklı Yaşam Desteği
              </h3>
              <p className="mt-4 text-blue-100">
                AI Fitness, OpenAI GPT-4 ve özel eğitilmiş makine öğrenimi modelleri kullanarak kişiselleştirilmiş sağlık tavsiyeleri sunuyor. Verileriniz %100 güvende, siz kontrol ediyorsunuz.
              </p>
              <div className="mt-8">
                <Link to="/register" className="inline-flex items-center bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  Ücretsiz Üye Olun
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-primary-700 flex items-center justify-center p-8">
              <div className="text-center">
                <CpuChipIcon className="h-16 w-16 text-white inline-block mb-4" />
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-blue-200">AI Modelleri</div>
                <div className="mt-6 text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200">Kesintisiz Destek</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;