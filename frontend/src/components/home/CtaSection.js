import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Sağlıklı yaşam yolculuğunuza bugün başlayın
          </h2>
          <p className="mt-4 text-xl text-primary-100 max-w-xl mx-auto">
            Yapay zeka destekli kişiselleştirilmiş planlarla hedeflerinize ulaşın.
            Yeni AI Asistanımız ile sorularınıza anında yanıt alın.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Ücretsiz Hesap Oluştur
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;