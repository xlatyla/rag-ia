import React, { useRef, useState } from 'react';
import { Play, Pause, FileIcon, ImageIcon, FileText, FileAudio, FileVideo, Download, Bot, User } from 'lucide-react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(message.timestamp);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return <ImageIcon size={24} />;
    if (['mp3', 'wav', 'ogg'].includes(ext || '')) return <FileAudio size={24} />;
    if (['mp4', 'webm'].includes(ext || '')) return <FileVideo size={24} />;
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) return <FileText size={24} />;
    return <FileIcon size={24} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn items-end gap-2`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />
        </div>
      )}
      
      <div className={`max-w-[75%] px-4 py-3 rounded-lg ${
        isUser 
          ? 'bg-indigo-600 text-white dark:bg-indigo-500 rounded-br-none' 
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'
      }`}>
        {message.type === 'audio' && message.audioUrl ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className={`p-2 rounded-full ${
                isUser 
                  ? 'hover:bg-indigo-700 dark:hover:bg-indigo-600' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors duration-300`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <audio 
              ref={audioRef}
              src={message.audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <div className="w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        ) : message.type === 'file' && message.fileUrl ? (
          <div className="flex items-center gap-3">
            {getFileIcon(message.fileName || '')}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs opacity-75">{message.fileSize && formatFileSize(message.fileSize)}</p>
            </div>
            <a
              href={message.fileUrl}
              download={message.fileName}
              className={`p-2 rounded-full ${
                isUser 
                  ? 'hover:bg-indigo-700 dark:hover:bg-indigo-600' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors duration-300`}
            >
              <Download size={18} />
            </a>
          </div>
        ) : (
          <p className="text-sm sm:text-base">{message.content}</p>
        )}
        <span className={`text-xs mt-1 block ${
          isUser ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {formattedTime}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-gray-600 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Message;