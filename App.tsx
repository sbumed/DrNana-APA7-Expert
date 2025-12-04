import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import ApiKeyModal from './components/ApiKeyModal';
import { Message, Sender, ChatStatus, Theme, THEME_COLORS, Language, Attachment } from './types';
import { sendMessageToGemini, getStoredApiKey } from './services/gemini';
import { WELCOME_MESSAGE, SUGGESTION_QUESTIONS, UI_TEXT } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('th');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: WELCOME_MESSAGE['th'],
      sender: Sender.Bot,
      timestamp: Date.now()
    }
  ]);
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.Idle);
  const [theme, setTheme] = useState<Theme>('teal');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = getStoredApiKey();
    const envKey = process.env.API_KEY;
    if (!key && !envKey) {
        setIsSettingsOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial welcome message when language changes (only if it's the only message)
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          text: WELCOME_MESSAGE[language],
          sender: Sender.Bot,
          timestamp: Date.now()
        }
      ]);
    }
  }, [language, messages.length]);

  const handleSendMessage = async (text: string, attachments: Attachment[] = []) => {
    if (!text.trim() && attachments.length === 0) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.User,
      timestamp: Date.now(),
      attachments: attachments 
    };

    setMessages(prev => [...prev, userMsg]);
    setStatus(ChatStatus.Thinking);

    try {
      const responseText = await sendMessageToGemini(text, attachments);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.Bot,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
      setStatus(ChatStatus.Idle);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: UI_TEXT[language].errorMsg,
        sender: Sender.Bot,
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
      setStatus(ChatStatus.Error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'th' ? 'en' : 'th');
  };

  const themeData = THEME_COLORS[theme];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onSelectPrompt={(txt) => handleSendMessage(txt, [])}
        theme={theme}
        language={language}
      />

      <div className="flex-1 flex flex-col h-full relative w-full transition-all duration-300">
          <Header 
            currentTheme={theme} 
            onThemeChange={setTheme} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            language={language}
            onToggleLanguage={toggleLanguage}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide relative w-full max-w-5xl mx-auto">
            <div className="flex flex-col min-h-full">
              {messages.length === 1 && (
                  <div className="flex-1 flex flex-col items-center justify-center mb-10 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards] delay-300">
                      <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">{UI_TEXT[language].menuRecommend}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                          {SUGGESTION_QUESTIONS[language].map((q, idx) => (
                              <button 
                                    key={idx}
                                    onClick={() => handleSendMessage(q, [])}
                                    className={`text-left p-4 rounded-xl border bg-white hover:shadow-md transition-all duration-200 text-sm text-slate-700 ${themeData.border} hover:border-${theme}-400`}
                              >
                                  {q}
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              <div className="flex-1 flex flex-col justify-end">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} theme={theme} language={language} />
                    ))}
                    
                    {status === ChatStatus.Thinking && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs ml-12 mb-4 animate-pulse">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span className="ml-1 font-medium">{UI_TEXT[language].thinking}</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
              </div>
            </div>
          </main>

          <div className="shrink-0 w-full max-w-5xl mx-auto">
             <InputArea 
                onSend={handleSendMessage} 
                disabled={status === ChatStatus.Thinking} 
                theme={theme}
                language={language}
              />
          </div>
      </div>

      <ApiKeyModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        language={language}
      />
    </div>
  );
};

export default App;