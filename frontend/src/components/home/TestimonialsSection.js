import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=32",
      name: "Ahmet Y.",
      age: 34,
      profession: "Yazılım Geliştirici",
      achievement: "3 ayda 15 kg verdi",
      headline: "AI Fitness hayatımı değiştirdi!",
      quote: "AI Fitness'in kişiselleştirilmiş beslenme planı sayesinde 3 ayda 15 kg verdim. Yemek fotoğrafı yükleyerek kalori takibi yapmak inanılmaz kolay! Ofiste masa başında çalışırken bile sağlıklı seçimler yapabiliyorum artık.",
      rating: 5,
      beforeImage: "/before-1.jpg",
      afterImage: "/after-1.jpg",
      socialProof: "254 kişi bu yorumu faydalı buldu"
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=26",
      name: "Zeynep K.",
      age: 28,
      profession: "Mimar",
      achievement: "Kas kütlesini artırdı",
      headline: "Sanal koçum her zaman benimle!",
      quote: "Sanal fitness koçu egzersizlerimi tamamen değiştirdi. AI'ın önerdiği program sayesinde kas kütlemi artırdım ve çok daha enerjik hissediyorum. Özellikle egzersiz formumu düzelttiği için omuz ağrılarım da tamamen geçti!",
      rating: 5,
      beforeImage: "/before-2.jpg",
      afterImage: "/after-2.jpg",
      socialProof: "187 kişi bu yorumu faydalı buldu"
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=60",
      name: "Mehmet T.",
      age: 42,
      profession: "Doktor",
      achievement: "Maratona hazırlandı",
      headline: "Bu uygulamayla maraton koştum!",
      quote: "İlk maratonuma AI Fitness ile hazırlandım. Programım her gün otomatik olarak güncellendi ve performansım haftalar içinde inanılmaz gelişti. Asla mümkün olabileceğini düşünmediğim bir şeyi başardım, artık kendime daha çok güveniyorum.",
      rating: 5,
      beforeImage: "/before-3.jpg",
      afterImage: "/after-3.jpg",
      socialProof: "312 kişi bu yorumu faydalı buldu"
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=33",
      name: "Elif S.",
      age: 31,
      profession: "Öğretmen",
      achievement: "Sağlıklı alışkanlıklar kazandı",
      headline: "Hayatımdaki en iyi yatırım!",
      quote: "AI asistanın önerileri sayesinde yeme alışkanlıklarımı değiştirdim. Şimdi daha iyi uyuyorum, daha enerjik hissediyorum ve stresimi kontrol edebiliyorum. Okulda öğrencilerime de örnek oldum, birlikte sağlıklı yaşamı keşfediyoruz.",
      rating: 4,
      beforeImage: "/before-4.jpg",
      afterImage: "/after-4.jpg",
      socialProof: "176 kişi bu yorumu faydalı buldu"
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=59",
      name: "Can D.",
      age: 36,
      profession: "Finans Uzmanı",
      achievement: "Vücut şeklini değiştirdi",
      headline: "Fotoğraf analizi tam isabet!",
      quote: "İlerleme fotoğrafları analizi en sevdiğim özellik. 6 aylık değişimimi görmek inanılmaz motive edici, yapay zeka nerelerde ilerleme kaydettiğimi gösteriyor. Artık eski pantolonlarıma bile sığabiliyorum, kendimi 10 yaş gençleşmiş gibi hissediyorum!",
      rating: 5,
      beforeImage: "/before-5.jpg",
      afterImage: "/after-5.jpg",
      socialProof: "284 kişi bu yorumu faydalı buldu"
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=25",
      name: "Buse A.",
      age: 29,
      profession: "Pazarlama Müdürü",
      achievement: "Topluluğun desteğiyle başardı",
      headline: "Bu topluluk bambaşka!",
      quote: "Topluluk özelliği olmasa belki de devam edemezdim. Benzer hedeflere sahip kişilerle tanışmak ve birbirimizi motive etmek çok değerli. Online egzersiz seanslarını birlikte yapıyoruz, artık sabah kalkıp egzersiz yapmak için can atıyorum!",
      rating: 5,
      beforeImage: "/before-6.jpg",
      afterImage: "/after-6.jpg",
      socialProof: "205 kişi bu yorumu faydalı buldu"
    }
  ];

  const handleTestimonialChange = (idx) => {
    setActiveTestimonial(idx);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>
      
      {/* Arka plan şekilleri */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary-100 rounded-full opacity-50 blur-3xl -translate-x-1/2"></div>
      <div className="absolute top-60 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Başarı Hikayeleri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Gerçek Kullanıcılarımızın <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">İnanılmaz</span> Dönüşümleri
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            AI Fitness ile hedeflerine ulaşan binlerce kullanıcımızın deneyimlerini keşfedin.
          </p>
        </div>

        {/* Mobil için testimonial kartları */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="relative">
              <div className="aspect-[7/3] bg-gradient-to-r from-primary-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center p-6">
                  <div className="flex items-center justify-center space-x-2 w-full">
                    <div className="w-1/2 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-xl">
                      <img 
                        src={testimonials[activeTestimonial].beforeImage} 
                        alt="Öncesi" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=Before";
                        }}
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">Öncesi</div>
                    </div>
                    <div className="w-1/2 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-xl">
                      <img 
                        src={testimonials[activeTestimonial].afterImage} 
                        alt="Sonrası" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=After";
                        }}
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">Sonrası</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 left-6">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonials[activeTestimonial].name.split(' ').join('+')}&background=random`;
                  }}
                />
              </div>
            </div>
            <div className="pt-12 pb-6 px-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonials[activeTestimonial].name}</h3>
                  <p className="text-sm text-gray-500">{testimonials[activeTestimonial].profession}, {testimonials[activeTestimonial].age} yaş</p>
                </div>
                <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonials[activeTestimonial].achievement}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">"{testimonials[activeTestimonial].headline}"</h4>
              <p className="text-gray-600 mb-4">
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < testimonials[activeTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-xs text-gray-500">
                  {testimonials[activeTestimonial].socialProof}
                </span>
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTestimonialChange(idx)}
                  className={`flex-1 py-3 ${activeTestimonial === idx ? 'text-primary-600 border-t-2 border-primary-600 -mt-px' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <span className="sr-only">Yorum {idx + 1}</span>
                  <span className="block h-2 w-2 mx-auto rounded-full bg-current"></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masaüstü için */}
        <div className="hidden md:block">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-2">
              {/* Sol taraf - Öncesi/sonrası görsel */}
              <div className="bg-gradient-to-br from-primary-600 to-blue-600 p-8 relative">
                <div className="absolute top-6 left-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg py-1 px-3 text-white">
                  <span className="text-sm font-medium">İnanılmaz Dönüşüm</span>
                </div>
                
                <div className="flex flex-col h-full justify-center">
                  <div className="flex space-x-6">
                    <div className="w-1/2 bg-white p-2 rounded-xl shadow-xl transform -rotate-3 transition-transform duration-500 hover:rotate-0">
                      <div className="relative">
                        <img 
                          src={testimonials[activeTestimonial].beforeImage} 
                          alt="Öncesi" 
                          className="w-full h-56 object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Before";
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">Öncesi</div>
                      </div>
                    </div>
                    <div className="w-1/2 bg-white p-2 rounded-xl shadow-xl transform rotate-3 transition-transform duration-500 hover:rotate-0">
                      <div className="relative">
                        <img 
                          src={testimonials[activeTestimonial].afterImage} 
                          alt="Sonrası" 
                          className="w-full h-56 object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=After";
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">Sonrası</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sağ taraf - Testimonial içeriği */}
              <div className="p-8 flex flex-col">
                <div className="flex items-start">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-16 h-16 rounded-full mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonials[activeTestimonial].name.split(' ').join('+')}&background=random`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{testimonials[activeTestimonial].name}</h3>
                        <p className="text-gray-500">{testimonials[activeTestimonial].profession}, {testimonials[activeTestimonial].age} yaş</p>
                      </div>
                      <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
                        {testimonials[activeTestimonial].achievement}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-yellow-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < testimonials[activeTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="mt-8 flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">"{testimonials[activeTestimonial].headline}"</h4>
                  <p className="text-gray-600">
                    {testimonials[activeTestimonial].quote}
                  </p>
                </blockquote>
                
                <div className="mt-auto">
                  <p className="text-sm text-gray-500">
                    {testimonials[activeTestimonial].socialProof}
                  </p>
                  
                  <div className="flex mt-6 space-x-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTestimonialChange(idx)}
                        className={`h-2.5 rounded-full ${activeTestimonial === idx ? 'w-8 bg-primary-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'} transition-all duration-300`}
                        aria-label={`Testimonal ${idx + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* İstatistikler ve başlangıç çağrısı */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Rakamlarla Başarı</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">10k+</div>
                <div className="text-primary-100">Aktif Kullanıcı</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">85%</div>
                <div className="text-primary-100">Hedefine Ulaşan</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">92%</div>
                <div className="text-primary-100">Memnuniyet Oranı</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">150+</div>
                <div className="text-primary-100">AI Destekli Özellik</div>
              </div>
            </div>
            <div className="mt-12">
              <a
                href="#cta"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                Siz de Başlayın
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;