import React, { useState, useEffect } from 'react';
import { KeyIcon } from '@heroicons/react/24/outline';
import { getStoredApiKey, setStoredApiKey, initializeChatSession } from '../services/gemini';
import { UI_TEXT } from '../constants';
import { Language } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, language }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey() || '');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API Key');
      return;
    }
    
    setStoredApiKey(apiKey.trim());
    try {
      initializeChatSession();
      setError('');
      onClose();
      window.location.reload();
    } catch (e) {
      console.error(e);
      onClose();
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-900 p-6 flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-lg">
                <KeyIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">{UI_TEXT[language].apiKeyTitle}</h2>
        </div>
        
        <div className="p-6">
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
            {UI_TEXT[language].apiKeyDesc}
          </p>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Google Gemini API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none font-mono text-sm"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-3">
             <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 text-sm text-teal-600 font-medium hover:underline flex items-center"
             >
                {UI_TEXT[language].getKey}
             </a>
             <button
                onClick={handleSave}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
             >
                {UI_TEXT[language].saveKey}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;