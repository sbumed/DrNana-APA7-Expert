import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon, DocumentIcon, PhotoIcon, TableCellsIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
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

  const renderFilePreview = (file: Attachment) => {
      if (file.mimeType.startsWith('image/')) {
          return (
             <img 
               src={`data:${file.mimeType};base64,${file.data}`} 
               alt={file.name}
               className="w-10 h-10 object-cover rounded-md border border-slate-200"
             />
          );
      }
      if (file.mimeType.includes('pdf')) return <DocumentIcon className="w-10 h-10 text-red-500 bg-red-50 p-1.5 rounded-md" />;
      if (file.mimeType.includes('csv') || mimeTypeIsSpreadsheet(file.mimeType)) return <TableCellsIcon className="w-10 h-10 text-green-600 bg-green-50 p-1.5 rounded-md" />;
      return <DocumentIcon className="w-10 h-10 text-slate-500 bg-slate-100 p-1.5 rounded-md" />;
  };

  const mimeTypeIsSpreadsheet = (mime: string) => {
      return mime.includes('sheet') || mime.includes('excel');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="w-full bg-white border-t border-slate-200 p-4 pb-6 shrink-0 z-20">
      <form 
        onSubmit={handleSubmit}
        className="w-full mx-auto relative flex flex-col bg-slate-50 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-offset-1 focus-within:border-transparent transition-all shadow-sm hover:border-slate-400"
        style={{ 
             '--tw-ring-color': theme === 'teal' ? '#14b8a6' : theme === 'blue' ? '#3b82f6' : theme === 'rose' ? '#e11d48' : '#d97706' 
        } as React.CSSProperties}
      >
        {/* File Preview Section - Integrated inside the input box */}
        {files.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 border-b border-slate-200 bg-slate-100/50 rounded-t-xl">
                {files.map((file, index) => (
                    <div key={index} className="relative group flex items-start">
                        <div className="flex flex-col items-center gap-1 w-20">
                           {renderFilePreview(file)}
                           <span className="text-[10px] text-slate-600 truncate w-full text-center px-1 font-medium">{file.name}</span>
                        </div>
                        <button 
                            onClick={() => removeFile(index)}
                            className="absolute -top-1.5 -right-1.5 bg-slate-400 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors shadow-sm"
                            type="button"
                        >
                            <XMarkIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        )}

        <div className="flex items-end gap-2 p-2">
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors mb-0.5 focus:outline-none focus:ring-2 focus:ring-slate-200 group relative"
                title={UI_TEXT[language].attach}
                disabled={disabled}
            >
                <PaperClipIcon className="w-5 h-5" />
                
                {/* Enhanced Tooltip for supported types */}
                <div className="absolute bottom-full left-0 mb-3 w-56 bg-slate-800 text-white text-[11px] p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl leading-tight">
                    <span className="font-bold text-slate-200 block mb-1">Supported Files:</span>
                    PDF, Images (JPG, PNG), CSV, Excel (XLSX)
                </div>
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
            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none py-3 px-1 max-h-[150px] disabled:opacity-50 text-sm"
            />
            <button
            type="submit"
            disabled={(!input.trim() && files.length === 0) || disabled}
            className={`p-2.5 rounded-lg transition-all duration-200 mb-0.5 shadow-sm text-white disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center shrink-0 ${themeData.primary} hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-1`}
            style={{ width: '40px', height: '40px' }}
            >
            {disabled ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                <PaperAirplaneIcon className="w-5 h-5" />
            )}
            </button>
        </div>
      </form>
      
      <div className="flex justify-between items-center mt-2 px-1">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
            <InformationCircleIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="tracking-wide">Supports: JPG, PNG, PDF, CSV, XLSX</span>
        </div>
        <p className="text-[10px] text-slate-400 select-none text-right opacity-70">
            {UI_TEXT[language].disclaimer}
        </p>
      </div>
    </div>
  );
};

export default InputArea;