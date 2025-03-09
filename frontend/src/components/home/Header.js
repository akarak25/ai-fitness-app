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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Menü açıkken scrolling'i devre dışı bırak
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center z-10">
            <Link to="/" className="flex items-center">
              <div className={`w-8 h-8 rounded-md bg-gradient-to-br from-primary-600 to-blue-500 flex items-center justify-center mr-2 transition-all ${isScrolled ? 'shadow-md' : 'shadow-lg'}`}>
                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-600' : 'text-white'}`}>
                AI FITNESS
              </span>
            </Link>
          </div>

          {/* Navigasyon - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-10 transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white'}`}>
              Ana Sayfa
            </Link>
            <a href="#features" onClick={closeMenu} className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-10 transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white'}`}>
              Özellikler
            </a>
            <a href="#how-it-works" onClick={closeMenu} className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-10 transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white'}`}>
              Nasıl Çalışır
            </a>
            <a href="#testimonials" onClick={closeMenu} className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-10 transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white'}`}>
              Başarı Hikayeleri
            </a>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${isScrolled 
                    ? 'text-gray-800 bg-gray-100 hover:bg-gray-200' 
                    : 'text-white bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30'
                  } transition-colors duration-300`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors duration-300"
                >
                  <span className="font-medium text-lg">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${isScrolled 
                    ? 'text-gray-800 hover:bg-gray-100' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                  } transition-colors duration-300`}
                >
                  Giriş Yap
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300 shadow-md`}
                >
                  Ücretsiz Başla
                </Link>
              </div>
            )}
          </nav>

          {/* Mobil menü butonu */}
          <div className="lg:hidden z-10">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isMenuOpen 
                  ? 'text-gray-800 bg-gray-200' 
                  : isScrolled 
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100' 
                    : 'text-white hover:text-white hover:bg-white hover:bg-opacity-20'
              } focus:outline-none transition-colors duration-300`}
              onClick={handleMenuToggle}
              aria-label="Ana menüyü aç/kapat"
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

      {/* Mobil Menü - Tam Ekran */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center" onClick={closeMenu}>
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary-600 to-blue-500 flex items-center justify-center mr-2 shadow-md">
                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-primary-600">
                  AI FITNESS
                </span>
              </Link>
              <button
                type="button"
                className="rounded-md p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors duration-300"
                onClick={closeMenu}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div className="px-4 py-8 flex-grow overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-800 font-medium transition-colors duration-300"
                onClick={closeMenu}
              >
                <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Ana Sayfa
              </Link>
              
              <a 
                href="#features" 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-800 font-medium transition-colors duration-300"
                onClick={closeMenu}
              >
                <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Özellikler
              </a>
              
              <a 
                href="#how-it-works" 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-800 font-medium transition-colors duration-300"
                onClick={closeMenu}
              >
                <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nasıl Çalışır
              </a>
              
              <a 
                href="#testimonials" 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-800 font-medium transition-colors duration-300"
                onClick={closeMenu}
              >
                <svg className="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Başarı Hikayeleri
              </a>
            </nav>
            
            <div className="mt-12 border-t border-gray-100 pt-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center px-4 py-3">
                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mr-4">
                      <span className="font-bold text-xl">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name || 'Kullanıcı'}</div>
                      <div className="text-sm text-gray-500">{user.email || 'Email bilgisi yok'}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 px-4">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                      onClick={closeMenu}
                    >
                      Profil
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 px-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                    onClick={closeMenu}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
                    onClick={closeMenu}
                  >
                    Ücretsiz Başla
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="px-4 py-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AI Fitness. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;