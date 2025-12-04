import React from 'react';

export enum Sender {
  User = 'user',
  Bot = 'model',
  System = 'system'
}

export interface Attachment {
  name: string;
  mimeType: string;
  data: string; // Base64 string
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isError?: boolean;
  attachments?: Attachment[];
}

export enum ChatStatus {
  Idle = 'idle',
  Thinking = 'thinking',
  Streaming = 'streaming',
  Error = 'error'
}

export type Theme = 'indigo' | 'emerald' | 'violet' | 'orange';

export const THEME_COLORS: Record<Theme, { primary: string, secondary: string, text: string, light: string, border: string, hover: string }> = {
  indigo: { 
    primary: 'bg-indigo-600', 
    secondary: 'bg-indigo-100', 
    text: 'text-indigo-600', 
    light: 'bg-indigo-50', 
    border: 'border-indigo-200', 
    hover: 'hover:bg-indigo-50' 
  },
  emerald: { 
    primary: 'bg-emerald-600', 
    secondary: 'bg-emerald-100', 
    text: 'text-emerald-600', 
    light: 'bg-emerald-50', 
    border: 'border-emerald-200', 
    hover: 'hover:bg-emerald-50' 
  },
  violet: { 
    primary: 'bg-violet-600', 
    secondary: 'bg-violet-100', 
    text: 'text-violet-600', 
    light: 'bg-violet-50', 
    border: 'border-violet-200', 
    hover: 'hover:bg-violet-50' 
  },
  orange: { 
    primary: 'bg-orange-500', 
    secondary: 'bg-orange-100', 
    text: 'text-orange-600', 
    light: 'bg-orange-50', 
    border: 'border-orange-200', 
    hover: 'hover:bg-orange-50' 
  }
};

export type Language = 'th' | 'en';

export interface MenuItem {
  title: { th: string; en: string };
  prompt?: { th: string; en: string }; // The text to send to Gemini
  subItems?: MenuItem[];
  icon?: React.ComponentType<any>;
}