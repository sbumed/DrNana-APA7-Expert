
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import { Message, Sender, Theme, THEME_COLORS, Language } from '../types';
import { ArrowDownTrayIcon, CheckIcon, PaperClipIcon, PhotoIcon, CodeBracketIcon } from '@heroicons/react/24/solid';
import { DR_NANA_IMAGE_URL, USER_AVATAR_URL, UI_TEXT } from '../constants';

interface MessageBubbleProps {
  message: Message;
  theme: Theme;
  language: Language;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme, language }) => {
  const isUser = message.sender === Sender.User;
  const isError = message.isError;
  const themeData = THEME_COLORS[theme];
  const [copied, setCopied] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // 1. Try Modern Async API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback', err);
      }
    }

    // 2. Fallback: execCommand
    try {
      const textArea = document.createElement("textarea");
      textArea.value = message.text;
      
      // Ensure it's part of the DOM but invisible
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.style.zIndex = "9999";
      textArea.setAttribute('readonly', ''); // Prevent keyboard popup on mobile
      
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy failed.');
      }
    } catch (err) {
      console.error('Copy failed completely', err);
    }
  };

  const handleExportPdf = () => {
    if (!contentRef.current) return;
    
    const element = contentRef.current;
    
    // Add a class to force specific print styles during generation
    element.classList.add('pdf-export-mode');
    document.body.style.cursor = 'wait';

    const opt = {
      margin: [12, 10, 12, 10], // mm
      filename: `DrNana_APA7_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          // Increase windowWidth to prevent table cropping
          windowWidth: element.scrollWidth + 50 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Fix for importing html2pdf in some environments
    const worker = (html2pdf as any).default ? (html2pdf as any).default() : (html2pdf as any)();
    
    worker.set(opt).from(element).save().then(() => {
         element.classList.remove('pdf-export-mode');
         document.body.style.cursor = 'default';
    }).catch((err: any) => {
         console.error(err);
         element.classList.remove('pdf-export-mode');
         document.body.style.cursor = 'default';
    });
  };

  return (
    <div className={`flex w-full mb-6 group ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[95%] sm:max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className="shrink-0 mt-1">
             {isUser ? (
                 <img
                    src={USER_AVATAR_URL}
                    alt="User"
                    className="w-9 h-9 rounded-full border border-slate-200 object-cover shadow-sm bg-white"
                 />
             ) : (
                 <img 
                    src={DR_NANA_IMAGE_URL} 
                    alt="Dr. Nana" 
                    className="w-9 h-9 rounded-full border border-slate-200 object-cover shadow-sm bg-white" 
                 />
             )}
        </div>

        {/* Bubble Container */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full min-w-0`}>
          
          {/* Content */}
          <div 
            className={`relative px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-sm overflow-hidden w-full transition-all duration-200 ${
              isUser 
                ? `${themeData.primary} text-white rounded-tr-none shadow-md` 
                : isError
                  ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
            }`}
          >
             {isUser ? (
                <div className="flex flex-col gap-2">
                    {message.attachments && message.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-1">
                            {message.attachments.map((att, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/20 p-2 rounded-lg border border-white/20 backdrop-blur-sm">
                                    {att.mimeType.startsWith('image/') ? (
                                        <PhotoIcon className="w-4 h-4" />
                                    ) : (
                                        <PaperClipIcon className="w-4 h-4" />
                                    )}
                                    <span className="text-xs font-medium truncate max-w-[120px]">{att.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="whitespace-pre-wrap font-medium">{message.text}</p>
                </div>
             ) : (
                <div ref={contentRef} className="citation-content bg-white relative">
                    {/* Styles for PDF Export to handle tables and page breaks */}
                    <style>{`
                        .pdf-export-mode {
                            background-color: #ffffff !important;
                            color: #000000 !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            width: 100% !important;
                        }
                        .pdf-export-mode * {
                            visibility: visible !important;
                        }
                        .pdf-export-mode table {
                            width: 100% !important;
                            max-width: 100% !important;
                            border-collapse: collapse !important;
                            margin-bottom: 1em !important;
                            font-size: 12px !important;
                            display: table !important;
                            page-break-inside: auto !important;
                        }
                        .pdf-export-mode thead {
                            display: table-header-group !important;
                        }
                        .pdf-export-mode tr {
                            page-break-inside: avoid !important;
                            page-break-after: auto !important;
                        }
                        .pdf-export-mode th, .pdf-export-mode td {
                            border: 1px solid #000 !important;
                            padding: 6px !important;
                            word-wrap: break-word !important;
                        }
                        .pdf-export-mode h1, .pdf-export-mode h2, .pdf-export-mode h3 {
                            page-break-after: avoid !important;
                            color: #000 !important;
                        }
                        .pdf-export-mode p, .pdf-export-mode li {
                            color: #000 !important;
                        }
                        .pdf-export-mode code {
                            border: 1px solid #ddd !important;
                            background-color: #f8f8f8 !important;
                            color: #000 !important;
                        }
                    `}</style>
                    
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        className={`prose prose-sm max-w-none prose-slate 
                            prose-headings:font-serif prose-headings:font-bold ${themeData.text}
                            prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                            prose-a:${themeData.text} prose-a:no-underline hover:prose-a:underline
                            prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-inner prose-pre:rounded-lg
                            prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
                            prose-th:bg-slate-50 prose-th:p-2 prose-td:p-2
                            prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                            prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
                            [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-slate-200 [&>table]:my-4 [&>table]:shadow-sm [&>table]:rounded-lg [&>table]:overflow-hidden
                            [&>thead>tr>th]:border [&>thead>tr>th]:border-slate-300 [&>thead>tr>th]:bg-slate-50
                            [&>tbody>tr>td]:border [&>tbody>tr>td]:border-slate-200
                        `}
                    >
                        {message.text}
                    </ReactMarkdown>
                </div>
             )}
          </div>

          {/* Metadata & Actions */}
          <div className="flex items-center gap-2 mt-2 ml-1 h-6">
            <span className="text-[10px] text-slate-400 font-medium">
                {new Date(message.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
            </span>

            {/* Bot Actions */}
            {!isUser && !isError && (
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-px h-3 bg-slate-200 mx-1"></div>
                    
                    {/* Copy Button */}
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all border border-transparent hover:border-slate-200"
                        title={UI_TEXT[language].copy}
                    >
                        {copied ? (
                            <CheckIcon className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                            <CodeBracketIcon className="w-3.5 h-3.5" />
                        )}
                        <span className="text-[10px] font-semibold uppercase tracking-wide hidden sm:inline">{UI_TEXT[language].copy}</span>
                    </button>
                    
                    {/* PDF Button */}
                    <button 
                        onClick={handleExportPdf}
                        className="flex items-center gap-1.5 px-2 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all border border-transparent hover:border-red-100"
                        title={UI_TEXT[language].pdf}
                    >
                        <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wide hidden sm:inline">{UI_TEXT[language].pdf}</span>
                    </button>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
