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

export type Theme = 'teal' | 'blue' | 'rose' | 'amber';

export const THEME_COLORS: Record<Theme, { primary: string, secondary: string, text: string, light: string, border: string, hover: string }> = {
  teal: { primary: 'bg-teal-600', secondary: 'bg-teal-100', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-50' },
  blue: { primary: 'bg-blue-600', secondary: 'bg-blue-100', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-50' },
  rose: { primary: 'bg-rose-600', secondary: 'bg-rose-100', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-50' },
  amber: { primary: 'bg-amber-600', secondary: 'bg-amber-100', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-50' }
};

export type Language = 'th' | 'en';

export interface MenuItem {
  title: { th: string; en: string };
  prompt?: { th: string; en: string }; // The text to send to Gemini
  subItems?: MenuItem[];
  icon?: React.ComponentType<any>;
}