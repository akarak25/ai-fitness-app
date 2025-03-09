import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Profilinizi Oluşturun",
      description: "Boy, kilo, yaş gibi temel bilgilerinizi ve fitness hedeflerinizi belirleyin.",
      imageSrc: "https://placehold.co/400x300/dbeafe/1e40af?text=Profile+Setup",
      imageAlt: "Profil Oluşturma"
    },
    {
      number: "02",
      title: "AI Önerilerini Alın",
      description: "Yapay zeka, verilerinizi analiz ederek size özel beslenme ve egzersiz planları oluşturur.",
      imageSrc: "https://placehold.co/400x300/dbeafe/1e40af?text=AI+Recommendations",
      imageAlt: "AI Önerileri"
    },
    {
      number: "03",
      title: "İlerlemenizi Takip Edin",
      description: "Günlük aktivitelerinizi kaydedin, fotoğraflar yükleyin ve AI ile ilerlemenizi analiz edin.",
      imageSrc: "https://placehold.co/400x300/dbeafe/1e40af?text=Progress+Tracking",
      imageAlt: "İlerleme Takibi"
    },
    {
      number: "04",
      title: "Topluluğa Katılın",
      description: "Benzer hedefler belirleyen kişilerle bağlantı kurun, motivasyonunuzu yüksek tutun.",
      imageSrc: "https://placehold.co/400x300/dbeafe/1e40af?text=Community",
      imageAlt: "Topluluk"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Nasıl Çalışır?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            AI Fitness'in yapay zeka destekli sistemini kullanmak çok kolay.
          </p>
        </div>

        <div className="relative">
          {/* Orta çizgi */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Adımlar */}
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} mb-8 md:mb-0 text-center`}>
                  <div className="bg-primary-50 inline-block p-3 rounded-lg mb-4">
                    <span className="text-primary-600 font-bold text-3xl">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full relative z-10">
                  <span className="text-white font-bold">{parseInt(step.number)}</span>
                </div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <img 
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;