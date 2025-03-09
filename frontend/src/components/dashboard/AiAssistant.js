import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const AiAssistant = ({ chatMessage, setChatMessage, chatResponse, handleChatSubmit, loading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-2 lg:col-span-3 mt-4">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-blue-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="ml-3 text-lg font-semibold">AI Fitness Asistanı</h2>
          </div>
          <Link 
            to="/ai-assistant" 
            className="text-sm text-white/90 hover:text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center backdrop-blur-sm"
          >
            <span>Tam sürümü aç</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="p-5">
        <div className="space-y-6">
          {chatResponse ? (
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-600 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">AI</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-gray-100">{chatResponse.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(chatResponse.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <ChatBubbleLeftRightIcon className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">Fitness asistanınız ile ilgili sorularınızı sorun</p>
            </div>
          )}
          
          <form onSubmit={handleChatSubmit} className="mt-6">
            <div className="flex rounded-lg shadow-sm">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 block w-full rounded-l-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm py-3"
                placeholder="Bir soru sor veya öneride bulun..."
                disabled={loading.chat}
              />
              <button
                type="submit"
                className="inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-r-lg text-white bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-700 hover:to-blue-600 transition-all duration-200"
                disabled={loading.chat}
              >
                {loading.chat ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <div className="flex items-center">
                    <span>Gönder</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Önerilen Sorular:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                Kas kazanmak için en iyi beslenme önerileri nelerdir?
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                Sabah egzersizi yapmanın faydaları neler?
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150">
                Su tüketimini artırmak için öneriler verir misin?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
