import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-white'}`}>AI FITNESS</span>
            </Link>
          </div>

          {/* Navigasyon - Desktop */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-300'}`}>
              Ana Sayfa
            </Link>
            <a href="#features" className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-300'}`}>
              Özellikler
            </a>
            <a href="#how-it-works" className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-300'}`}>
              Nasıl Çalışır
            </a>
            <a href="#testimonials" className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-300'}`}>
              Kullanıcı Yorumları
            </a>
            {user ? (
              <Link to="/dashboard" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                Dashboard'a Git
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-300'}`}>
                  Giriş Yap
                </Link>
                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Ücretsiz Başla
                </Link>
              </div>
            )}
          </nav>

          {/* Mobil menü butonu */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' : 'text-white hover:text-gray-300 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Menüyü Aç/Kapat</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <a 
              href="#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Özellikler
            </a>
            <a 
              href="#how-it-works" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Nasıl Çalışır
            </a>
            <a 
              href="#testimonials" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Kullanıcı Yorumları
            </a>
            {user ? (
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard'a Git
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ücretsiz Başla
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;