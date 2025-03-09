import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      initial: "A",
      name: "Ahmet Y.",
      achievement: "3 ayda 15 kg verdi",
      quote: "AI Fitness'in kişiselleştirilmiş beslenme planı sayesinde 3 ayda 15 kg verdim. Yemek fotoğrafı yükleyerek kalori takibi yapmak çok kolay!"
    },
    {
      initial: "Z",
      name: "Zeynep K.",
      achievement: "Kas kütlesini artırdı",
      quote: "Sanal fitness koçu egzersizlerimi tamamen değiştirdi. AI'ın önerdiği program sayesinde kas kütlemi artırdım ve çok daha enerjik hissediyorum."
    },
    {
      initial: "M",
      name: "Mehmet T.",
      achievement: "Maratona hazırlandı",
      quote: "İlk maratonuma AI Fitness ile hazırlandım. Programım her gün otomatik olarak güncellendi ve performansım haftalar içinde inanılmaz gelişti."
    },
    {
      initial: "E",
      name: "Elif S.",
      achievement: "Sağlıklı alışkanlıklar kazandı",
      quote: "AI asistanın önerileri sayesinde yeme alışkanlıklarımı değiştirdim. Şimdi daha iyi uyuyorum, daha enerjik hissediyorum ve stresimi kontrol edebiliyorum."
    },
    {
      initial: "C",
      name: "Can D.",
      achievement: "Vücut şeklini değiştirdi",
      quote: "İlerleme fotoğrafları analizi en sevdiğim özellik. 6 aylık değişimimi görmek inanılmaz motive edici, yapay zeka nerelerde ilerleme kaydettiğimi gösteriyor."
    },
    {
      initial: "B",
      name: "Buse A.",
      achievement: "Topluluğun desteğiyle başardı",
      quote: "Topluluk özelliği olmasa belki de devam edemezdim. Benzer hedeflere sahip kişilerle tanışmak ve birbirimizi motive etmek çok değerli."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-500 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="mt-4 max-w-2xl text-xl opacity-90 mx-auto">
            AI Fitness ile hedeflerine ulaşan binlerce kullanıcımızdan bazıları...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Yorum Kartları */}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm opacity-80">{testimonial.achievement}</p>
                </div>
              </div>
              <p className="italic">
                "{testimonial.quote}"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;