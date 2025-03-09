import React from 'react';
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
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  const features = [
    {
      icon: CakeIcon,
      title: "Kişiselleştirilmiş Beslenme Planları",
      description: "Boy, kilo ve hedeflerinize göre AI tarafından oluşturulan özel beslenme planları ile ideal kilomuza ulaşın."
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Sanal Fitness Koçu",
      description: "Fiziksel durumunuza ve hedeflerinize göre kişiselleştirilmiş egzersiz rutinleriyle ideal formunuza kavuşun."
    },
    {
      icon: CameraIcon,
      title: "Akıllı Kalori Takibi",
      description: "Yemek fotoğraflarınızı yükleyin, yapay zeka yemeği tanımlayıp kalori ve besin değerlerini hesaplasın."
    },
    {
      icon: ChartBarIcon,
      title: "İlerleme Analizi",
      description: "İlerleme fotoğraflarınızı yapay zekaya analiz ettirerek vücut değişimlerinizi görsel raporlarla takip edin."
    },
    {
      icon: ShoppingCartIcon,
      title: "Akıllı Alışveriş Listesi",
      description: "Beslenme planınıza göre AI model tarafından oluşturulan alışveriş listeleri ve alternatif ürün önerileri."
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Soru-Cevap Botu",
      description: "Beslenme ve fitness ile ilgili sorularınızı yanıtlayan yapay zeka asistanı ile bilgiye anında ulaşın."
    },
    {
      icon: FaceSmileIcon,
      title: "Duygu ve Stres Analizi",
      description: "Duygusal durumunuzu ve stres seviyenizi izleyerek aşırı yeme davranışlarını önlemeye yardımcı olur."
    },
    {
      icon: UserGroupIcon,
      title: "Topluluk Desteği",
      description: "Benzer hedeflere sahip kullanıcıları bir araya getiren, yapay zeka moderasyonlu bir topluluk platformu."
    },
    {
      icon: CpuChipIcon,
      title: "Gelişmiş AI Algoritmaları",
      description: "En son yapay zeka teknolojileri ile kişisel sağlık verilerinizi analiz ederek en doğru önerileri sunar."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Yapay Zeka Destekli Özellikler
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            AI Fitness, en son teknolojileri kullanarak sağlıklı bir yaşam tarzı oluşturmanıza yardımcı olur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Soru-Cevap Botu için özel kart
            if (feature.title === "Soru-Cevap Botu") {
              return (
                <div key={index} className="bg-primary-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out border-2 border-primary-400 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-2 py-1 text-xs font-bold">
                    YENİ
                  </div>
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Link to="/login?redirect=ai-assistant" className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700">
                    Hemen Deneyin
                    <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              );
            }
            
            // Diğer kartlar için standart görünüm
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;