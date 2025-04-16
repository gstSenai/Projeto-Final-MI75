"use client"

import { useLanguage } from './context/LanguageContext';

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 flex space-x-2 bg-white p-2 rounded-lg shadow-md">
      <button 
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded ${currentLanguage === 'pt' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        PT
      </button>
      <button 
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded ${currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded ${currentLanguage === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        ES
      </button>
    </div>
  );
} 