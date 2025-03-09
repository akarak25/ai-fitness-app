import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  CakeIcon, 
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

import { 
  HomeIcon as HomeSolid, 
  UserIcon as UserSolid, 
  CakeIcon as CakeSolid, 
  UserGroupIcon as GroupSolid,
  ChartBarIcon as ChartSolid,
  ArrowTrendingUpIcon as TrendSolid,
  ChatBubbleLeftRightIcon as ChatSolid
} from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, solidIcon: HomeSolid },
    { name: 'Beslenme Planı', href: '/nutrition', icon: CakeIcon, solidIcon: CakeSolid },
    { name: 'Egzersiz Planı', href: '/workout', icon: ArrowTrendingUpIcon, solidIcon: TrendSolid },
    { name: 'İlerleme Takibi', href: '/progress', icon: ChartBarIcon, solidIcon: ChartSolid },
    { name: 'Topluluk', href: '/community', icon: UserGroupIcon, solidIcon: GroupSolid },
    { name: 'AI Asistan', href: '/ai-assistant', icon: ChatBubbleLeftRightIcon, solidIcon: ChatSolid },
    { name: 'Profil', href: '/profile', icon: UserIcon, solidIcon: UserSolid },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Burada gerçek bir dark mode implementasyonu eklenebilir
  };

  // Kullanıcı menüsünü dışında bir yere tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100'}`}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gradient-to-b from-primary-800 to-primary-600">
          <div className="absolute top-0 right-0 pt-2 -mr-12">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Menüyü Kapat</span>
              <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary-600 text-lg font-bold">AF</span>
              </div>
              <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <span className="text-primary-600 text-xl font-bold">AF</span>
              </div>
              <span className="text-xl font-bold text-white">AI FITNESS</span>
            </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 mt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary-900 bg-opacity-70 text-white'
                      : 'text-white hover:bg-primary-700 hover:bg-opacity-50'
                  } group flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ease-in-out`}
                >
                  {location.pathname === item.href ? 
                    <item.solidIcon className="w-6 h-6 mr-3 text-white" aria-hidden="true" /> :
                    <item.icon className="w-6 h-6 mr-3 text-white" aria-hidden="true" />
                  }
                  {item.name}
                </Link>
              ))}
              <div className="pt-5 mt-5 border-t border-primary-800">
                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center px-3 py-3 text-base font-medium rounded-lg text-white hover:bg-primary-700 hover:bg-opacity-50 transition-all duration-200 ease-in-out"
                >
                  <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3 text-white" aria-hidden="true" />
                  Çıkış Yap
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-b from-primary-800 to-primary-600 shadow-xl">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-800 border-b border-primary-900/50">
            <span className="text-xl font-bold text-white">AI FITNESS</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-white hover:bg-white/5'
                  } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out`}
                >
                  {location.pathname === item.href ? 
                    <item.solidIcon className="w-5 h-5 mr-3 text-white" aria-hidden="true" /> :
                    <item.icon className="w-5 h-5 mr-3 text-white/80" aria-hidden="true" />
                  }
                  {item.name}
                  {item.name === 'Beslenme Planı' && (
                    <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yeni
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-5 mt-5 border-t border-primary-600/40">
                <button
                  onClick={toggleDarkMode}
                  className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-white hover:bg-white/5 transition-all duration-200 ease-in-out mb-2"
                >
                  {darkMode ? 
                    <SunIcon className="w-5 h-5 mr-3 text-white/80" aria-hidden="true" /> :
                    <MoonIcon className="w-5 h-5 mr-3 text-white/80" aria-hidden="true" />
                  }
                  {darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-white hover:bg-white/5 transition-all duration-200 ease-in-out"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-white/80" aria-hidden="true" />
                  Çıkış Yap
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow-md backdrop-blur-sm bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 dark:border-b dark:border-gray-700">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Menüyü Aç</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center ml-4 md:ml-6 space-x-4">
              <button
                type="button"
                className="p-1 text-gray-400 bg-white dark:bg-gray-700 rounded-full hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative"
              >
                <span className="sr-only">Bildirimleri Göster</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
                {notificationsCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                    {notificationsCount}
                  </span>
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3 user-menu-container">
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-tr from-primary-600 to-blue-500 ring-2 ring-white dark:ring-gray-800">
                      <span className="text-sm font-medium leading-none text-white">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </span>
                    <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.name?.split(' ')[0] || 'Kullanıcı'}
                    </span>
                  </button>
                </div>
                
                {showUserMenu && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profilim
                    </Link>
                    <button onClick={toggleDarkMode} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Sayfa başlığı ve açıklaması */}
              <div className="pb-5 mb-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl">
                    {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    {location.pathname === '/dashboard' && 'Fitness hedeflerinize ulaşmak için günlük durumunuz ve planlarınız'}
                    {location.pathname === '/nutrition' && 'Beslenme alışkanlıklarınızı takip edin ve düzenleyin'}
                    {location.pathname === '/workout' && 'Egzersiz planlarınızı ve günlük rutinlerinizi yönetin'}
                    {location.pathname === '/progress' && 'Kaydettiğiniz ilerlemeyi görsel olarak inceleyin'}
                    {location.pathname === '/community' && 'Diğer kullanıcılarla bağlantı kurun ve deneyimlerinizi paylaşın'}
                    {location.pathname === '/ai-assistant' && 'AI Asistanınız ile fitness yolculuğunuz hakkında sohbet edin'}
                    {location.pathname === '/profile' && 'Kişisel bilgilerinizi ve tercihlerinizi yönetin'}
                  </p>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;