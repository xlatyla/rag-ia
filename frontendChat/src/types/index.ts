export interface Message {
  id: string;
  content: string;
  type: 'text' | 'audio' | 'file';
  audioUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}