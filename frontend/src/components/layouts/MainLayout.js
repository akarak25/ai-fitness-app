import React, { useState } from 'react';
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
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Beslenme Planı', href: '/nutrition', icon: CakeIcon },
    { name: 'Egzersiz Planı', href: '/workout', icon: ArrowTrendingUpIcon },
    { name: 'İlerleme Takibi', href: '/progress', icon: ChartBarIcon },
    { name: 'Topluluk', href: '/community', icon: UserGroupIcon },
    { name: 'AI Asistan', href: '/ai-assistant', icon: ChatBubbleLeftRightIcon },
    { name: 'Profil', href: '/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-primary-700">
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
            <span className="text-xl font-bold text-white">AI FITNESS</span>
          </div>
          <div className="flex flex-col flex-1 mt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1 bg-primary-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary-800 text-white'
                      : 'text-white hover:bg-primary-600'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon className="w-6 h-6 mr-4 text-white" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-primary-600"
              >
                <svg className="w-6 h-6 mr-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-primary-700">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-800">
            <span className="text-xl font-bold text-white">AI FITNESS</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1 bg-primary-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary-800 text-white'
                      : 'text-white hover:bg-primary-600'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon className="w-6 h-6 mr-3 text-white" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-primary-600"
              >
                <svg className="w-6 h-6 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Menüyü Aç</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1"></div>
            <div className="flex items-center ml-4 md:ml-6">
              <button
                type="button"
                className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Bildirimleri Göster</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-600">
                    <span className="text-sm font-medium leading-none text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;