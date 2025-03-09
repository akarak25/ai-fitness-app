import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { aiApi } from '../utils/api';
import { 
  PaperAirplaneIcon, 
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Sayfa yüklendiğinde varsayılan karşılama mesajını ekle
    setMessages([
      {
        role: 'assistant',
        content: 'Merhaba! Ben AI Fitness Asistanınız. Beslenme, egzersiz, sağlıklı yaşam veya fitness hedefleriniz hakkında herhangi bir sorunuz varsa, yardımcı olmak için buradayım.',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Mesajların sonuna otomatik scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Kullanıcı mesajını ekle
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // API'ye istek gönder
      const response = await aiApi.chatWithAssistant(input);
      
      // Asistanın cevabını ekle
      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(response.timestamp || Date.now())
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI asistan hatası:', error);
      toast.error('AI asistanı ile iletişim kurarken bir hata oluştu');
      
      // Hata mesajını ekle
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.',
        timestamp: new Date(),
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "Kilo vermek için en etkili egzersiz türleri nelerdir?",
    "Kas kütlemi artırmak için nasıl beslenmeliyim?",
    "Günde kaç litre su içmeliyim?",
    "Vejetaryen beslenmeyle yeterli protein alabilir miyim?",
    "Yüksek tansiyon için uygun egzersiz önerileri nelerdir?",
    "Açlık krizlerimi nasıl kontrol edebilirim?",
    "Evde yapabileceğim etkili karın egzersizleri nelerdir?",
    "Metabolizmamı hızlandırmak için ne yapmalıyım?"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Fitness Asistanı</h1>
        <p className="text-gray-600 mt-2">
          Beslenme, fitness ve sağlıklı yaşam hakkındaki tüm sorularınızı yanıtlayan yapay zeka asistanınız.
        </p>
      </div>

      {/* Sohbet alanı */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">AI Asistan ile Sohbet</h2>
          </div>
        </div>
        
        {/* Mesajlar */}
        <div className="p-4 h-96 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : message.error 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Mesaj gönderme formu */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Beslenme veya fitness hakkında bir soru sorun..."
              className="flex-grow rounded-l-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-r-md px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Önerilen sorular */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Önerilen Sorular</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(question);
                // Kullanıcı kendisi göndermeyi tercih edebilir
              }}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 border border-gray-200 transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;