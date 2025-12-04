
import React from 'react';
import { Bars3Icon, LanguageIcon } from '@heroicons/react/24/outline';
import { DR_NANA_IMAGE_URL } from '../constants';
import { Theme, THEME_COLORS, Language } from '../types';

interface HeaderProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  language: Language;
  onToggleLanguage: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, onThemeChange, language, onToggleLanguage, onToggleSidebar }) => {
  const themeData = THEME_COLORS[currentTheme];

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm z-30 relative shrink-0">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
            {/* Sidebar Toggle */}
            <button 
                onClick={onToggleSidebar}
                className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full lg:hidden"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Identity */}
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <div className={`absolute inset-0 ${themeData.primary} rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    <img 
                        src={DR_NANA_IMAGE_URL} 
                        alt="Dr. Nana Logo" 
                        className="relative w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                    />
                </div>
                <div>
                    <h1 className="font-serif text-lg font-bold tracking-tight text-slate-800">Dr. Nana V.2</h1>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${themeData.text}`}>APA 7 Expert</p>
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
                onClick={onToggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all font-medium text-xs"
                title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
            >
                <LanguageIcon className="w-4 h-4" />
                <span className="w-5 text-center">{language === 'th' ? 'TH' : 'EN'}</span>
            </button>

            {/* Theme Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-full border border-slate-100">
                {(Object.keys(THEME_COLORS) as Theme[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => onThemeChange(t)}
                        className={`w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-1 ${
                            t === 'indigo' ? 'bg-indigo-600' : 
                            t === 'emerald' ? 'bg-emerald-600' : 
                            t === 'violet' ? 'bg-violet-600' : 'bg-orange-500'
                        } ${currentTheme === t ? 'ring-slate-400 scale-110' : 'ring-transparent'}`}
                        title={`Theme: ${t}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
