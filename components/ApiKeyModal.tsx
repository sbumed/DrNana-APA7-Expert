import React from 'react';
import { KeyIcon } from '@heroicons/react/24/outline';
import { Language } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-900 p-6 flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-lg">
                <KeyIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">API Key Configuration</h2>
        </div>
        
        <div className="p-6">
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
            API Key management via UI is not supported. The API key <strong>must</strong> be obtained exclusively from the environment variable <code>process.env.API_KEY</code>.
          </p>
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
             Please configure your environment variables and restart the application.
          </p>

          <div className="mt-6 flex justify-end gap-3">
             <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
             >
                Close
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;