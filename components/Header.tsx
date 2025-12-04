import React from 'react';
import { Cog6ToothIcon, Bars3Icon, LanguageIcon } from '@heroicons/react/24/outline';
import { DR_NANA_IMAGE_URL, UI_TEXT } from '../constants';
import { Theme, THEME_COLORS, Language } from '../types';

interface HeaderProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, onThemeChange, onOpenSettings, onToggleSidebar, language, onToggleLanguage }) => {
  const themeColor = THEME_COLORS[currentTheme];

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm z-10 shrink-0 relative">
      <div className="w-full px-4 h-16 sm:h-18 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={onToggleSidebar}
                className="p-2 -ml-2 mr-1 text-slate-500 hover:bg-slate-100 rounded-full lg:hidden"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Identity */}
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <div className={`absolute inset-0 ${themeColor.primary} rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    <img 
                        src={DR_NANA_IMAGE_URL} 
                        alt="Dr. Nana Logo" 
                        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md object-cover"
                    />
                </div>
                <div>
                    <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-800">Dr. Nana</h1>
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${themeColor.text}`}>APA 7 Expert</p>
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Toggle */}
            <button
                onClick={onToggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all font-medium text-xs sm:text-sm"
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
                            t === 'teal' ? 'bg-teal-500' : 
                            t === 'blue' ? 'bg-blue-500' : 
                            t === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                        } ${currentTheme === t ? 'ring-slate-400 scale-110' : 'ring-transparent'}`}
                        title={`Theme: ${t}`}
                    />
                ))}
            </div>

            {/* Settings */}
            <button 
                onClick={onOpenSettings}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors border border-transparent hover:border-slate-200"
                title={UI_TEXT[language].settings}
            >
                <Cog6ToothIcon className="w-5 h-5" />
                <span className="text-xs font-medium hidden sm:inline">{UI_TEXT[language].settings}</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;