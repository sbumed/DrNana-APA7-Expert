
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon, DocumentIcon, PhotoIcon, TableCellsIcon } from '@heroicons/react/24/solid';
import { Theme, THEME_COLORS, Language, Attachment } from '../types';
import { UI_TEXT } from '../constants';

interface InputAreaProps {
  onSend: (text: string, attachments: Attachment[]) => void;
  disabled: boolean;
  theme: Theme;
  language: Language;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled, theme, language }) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const themeData = THEME_COLORS[theme];

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((input.trim() || files.length > 0) && !disabled) {
      onSend(input, files);
      setInput('');
      setFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles: Attachment[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            try {
                const base64 = await convertToBase64(file);
                // Fallback for csv mime types if browser doesn't detect it
                let mimeType = file.type;
                if (!mimeType && file.name.endsWith('.csv')) mimeType = 'text/csv';
                
                newFiles.push({
                    name: file.name,
                    mimeType: mimeType || 'application/octet-stream',
                    data: base64.split(',')[1] // Remove header "data:image/png;base64,"
                });
            } catch (error) {
                console.error("Error processing file:", file.name, error);
            }
        }
        setFiles(prev => [...prev, ...newFiles]);
    }
    // Reset input so same files can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
      });
  };

  const removeFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (mimeType: string) => {
      if (mimeType.startsWith('image/')) return <PhotoIcon className="w-4 h-4" />;
      if (mimeType.includes('pdf')) return <DocumentIcon className="w-4 h-4" />;
      if (mimeType.includes('csv') || mimeType.includes('sheet') || mimeType.includes('excel')) return <TableCellsIcon className="w-4 h-4" />;
      return <DocumentIcon className="w-4 h-4" />;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="w-full bg-white border-t border-slate-200 p-4 pb-6 shrink-0">
      
      {/* File Preview Area */}
      {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 px-1">
              {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs border border-slate-200 animate-[fadeIn_0.2s_ease-in-out]">
                      <span className="text-slate-500">{getFileIcon(file.mimeType)}</span>
                      <span className="max-w-[150px] truncate font-medium">{file.name}</span>
                      <button 
                          onClick={() => removeFile(index)}
                          className="ml-1 p-0.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-red-500 focus:outline-none"
                          title={UI_TEXT[language].remove}
                      >
                          <XMarkIcon className="w-3 h-3" />
                      </button>
                  </div>
              ))}
          </div>
      )}

      <form 
        onSubmit={handleSubmit}
        className="w-full mx-auto relative flex items-end gap-2 bg-slate-50 border border-slate-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-offset-1 focus-within:border-transparent transition-all shadow-sm hover:border-slate-400"
        style={{ 
             '--tw-ring-color': theme === 'teal' ? '#14b8a6' : theme === 'blue' ? '#3b82f6' : theme === 'rose' ? '#e11d48' : '#d97706' 
        } as React.CSSProperties}
      >
        <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors mb-0.5 focus:outline-none focus:ring-2 focus:ring-slate-200"
            title={UI_TEXT[language].attach}
            disabled={disabled}
        >
            <PaperClipIcon className="w-5 h-5" />
        </button>
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*,application/pdf,text/csv,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
            onChange={handleFileSelect}
        />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={UI_TEXT[language].placeholder}
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none py-3 pl-2 max-h-[150px] disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={(!input.trim() && files.length === 0) || disabled}
          className={`p-2.5 rounded-lg transition-all duration-200 mb-0.5 shadow-sm text-white disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center ${themeData.primary} hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-1`}
          style={{ width: '40px', height: '40px' }}
        >
          {disabled ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
          )}
        </button>
      </form>
      <p className="text-center text-[10px] text-slate-400 mt-2 select-none">
        {UI_TEXT[language].disclaimer}
      </p>
    </div>
  );
};

export default InputArea;
