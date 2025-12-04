import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MenuItem, Theme, THEME_COLORS, Language } from '../types';
import { SIDEBAR_DATA, UI_TEXT } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (text: string) => void;
  theme: Theme;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectPrompt, theme, language }) => {
  const themeData = THEME_COLORS[theme];
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "การอ้างอิงในเนื้อหา": true // Default open key (mapped to Thai title)
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleItemClick = (prompt?: { th: string; en: string }) => {
    if (prompt) {
      onSelectPrompt(prompt[language]);
      // On mobile, auto close sidebar after selection
      if (window.innerWidth < 768) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
            fixed md:static inset-y-0 left-0 z-50
            w-72 bg-white border-r border-slate-200 shadow-xl md:shadow-none
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden lg:w-72 lg:translate-x-0 lg:opacity-100'}
            flex flex-col h-full
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                {UI_TEXT[language].menu}
            </h2>
            <button onClick={onClose} className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded-full">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
            {SIDEBAR_DATA.map((section, index) => {
                // Use a consistent key for expansion state, e.g., the Thai title as ID
                const sectionKey = section.title['th']; 
                const isExpanded = expandedSections[sectionKey];
                const Icon = section.icon;
                
                return (
                    <div key={index} className="rounded-xl overflow-hidden">
                        <button 
                            onClick={() => toggleSection(sectionKey)}
                            className={`w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                {Icon && <Icon className={`w-5 h-5 ${themeData.text}`} />}
                                <span className="text-sm">{section.title[language]}</span>
                            </div>
                            {isExpanded ? (
                                <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                            )}
                        </button>

                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="pt-1 pb-2 pl-4 pr-2 space-y-0.5">
                                {section.subItems?.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleItemClick(item.prompt)}
                                        className={`w-full text-left py-2 px-3 pl-8 text-xs sm:text-sm text-slate-600 rounded-lg transition-colors ${themeData.hover} hover:text-slate-900`}
                                    >
                                        {item.title[language]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Footer Info */}
        <div className="p-4 border-t border-slate-100 text-center text-[10px] text-slate-400 shrink-0">
            <p>© 2025 Dr. Nana AI</p>
            <p>APA 7th Edition Expert</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;