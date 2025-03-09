import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const steps = [
    {
      number: "01",
      title: "Profilinizi Oluşturun",
      description: "Kullanışlı uygulamamızla boy, kilo, yaş gibi temel bilgilerinizi ve fitness hedeflerinizi belirleyin. Uygulamamız verilerinizi kullanarak size özel bir profil oluşturur.",
      imageSrc: "/profile-setup.jpg",
      imageAlt: "Profil Oluşturma",
      highlights: [
        "30 saniyeden kısa sürer",
        "Tamamen kişiselleştirilmiş deneyim",
        "Güvenli ve özel veri koruması"
      ]
    },
    {
      number: "02",
      title: "AI Önerilerini Alın",
      description: "Yapay zeka, verilerinizi analiz ederek size özel beslenme ve egzersiz planları oluşturur. Her hedef ve ihtiyaç için farklı öneriler sunar, sürekli güncellenir.",
      imageSrc: "/ai-recommendations.jpg",
      imageAlt: "AI Önerileri",
      highlights: [
        "Günlük beslenme planları",
        "Kişiye özel egzersiz rutinleri",
        "Gerçek zamanlı güncellemeler"
      ]
    },
    {
      number: "03",
      title: "İlerlemenizi Takip Edin",
      description: "Günlük aktivitelerinizi kaydedin, vücut ölçülerinizi girin ve ilerleme fotoğraflarınızı yükleyin. AI sizin için tüm verileri analiz eder ve görsel raporlar sunar.",
      imageSrc: "/progress-tracking.jpg",
      imageAlt: "İlerleme Takibi",
      highlights: [
        "AI fotoğraf analizi",
        "Görsel ilerleme grafikleri",
        "Veri tabanlı motivasyon"
      ]
    },
    {
      number: "04",
      title: "Topluluğa Katılın",
      description: "Benzer hedefler belirleyen kişilerle bağlantı kurun, deneyimlerinizi paylaşın ve birbirinizi motive edin. Uzman koçlarımız da sürekli yanınızda!",
      imageSrc: "/community.jpg",
      imageAlt: "Topluluk",
      highlights: [
        "Hedef odaklı gruplar",
        "Koçlarla özel görüşmeler",
        "Motivasyon paylaşımları"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Basit Adımlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            <span className="block">Nasıl </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Çalışır?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            AI Fitness'in yapay zeka destekli sistemini kullanmak inanılmaz derecede kolay. Sadece bu dört adımı takip edin.
          </p>
        </div>

        {/* Mobil görünüm için adım kartları */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-primary-500 to-blue-500">
                <div className="bg-white p-1 rounded-xl"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 text-lg font-bold mr-3">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                </div>
                
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://source.unsplash.com/800x600/?fitness,${step.title.toLowerCase()}`;
                    }}
                  />
                </div>
                
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Öne Çıkanlar:</h4>
                  <ul className="space-y-1">
                    {step.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Masaüstü için sekmeli görünüm */}
        <div className="hidden md:block">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx <= activeTab 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <div className="inline-flex items-center justify-center text-sm font-semibold px-3 py-1 bg-primary-100 text-primary-600 rounded-full">
                    Adım {activeTab + 1}
                  </div>
                  <h3 className="mt-4 text-3xl font-bold text-gray-900">{steps[activeTab].title}</h3>
                  <p className="mt-4 text-gray-600 text-lg">
                    {steps[activeTab].description}
                  </p>
                  
                  <div className="mt-8">
                    <h4 className="font-medium text-lg text-gray-900 mb-3">Öne Çıkanlar:</h4>
                    <ul className="space-y-3">
                      {steps[activeTab].highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          </div>
                          <span className="ml-3 text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-10">
                    <div className="flex space-x-3">
                      {activeTab < steps.length - 1 ? (
                        <button 
                          onClick={() => setActiveTab(prev => Math.min(prev + 1, steps.length - 1))}
                          className="inline-flex items-center px-5 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Sonraki Adım
                          <ArrowRightIcon className="ml-2 w-5 h-5" />
                        </button>
                      ) : (
                        <Link
                          to="/register"
                          className="inline-flex items-center px-5 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Hemen Başlayın
                          <ArrowRightIcon className="ml-2 w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0">
                  <img 
                    src={steps[activeTab].imageSrc}
                    alt={steps[activeTab].imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://source.unsplash.com/800x600/?fitness,${steps[activeTab].title.toLowerCase()}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-blue-600/80 mix-blend-multiply"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-end p-12 text-white">
                  <span className="text-8xl font-bold opacity-20">{steps[activeTab].number}</span>
                  <h4 className="text-2xl font-bold mb-2">{steps[activeTab].title}</h4>
                  <div className="flex items-center mt-6">
                    <div className="flex -space-x-2 mr-4">
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="" />
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="" />
                      <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="" />
                    </div>
                    <span className="text-sm opacity-90">5,000+ kullanıcı bu adımı tamamladı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">10k+</div>
            <div className="text-gray-600">Aktif Kullanıcı</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">93%</div>
            <div className="text-gray-600">Hedefine Ulaşanlar</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Desteği</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">30+</div>
            <div className="text-gray-600">Uzman Koç</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;