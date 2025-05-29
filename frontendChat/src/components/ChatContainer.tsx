import React, { useState, DragEvent } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FileAttachment from './FileAttachment';
import ThemeToggle from './ThemeToggle';
import { Message } from '../types';
import { sendMessage, sendAudioMessage, sendFileMessage } from '../services/messageService';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hola! ¿Cómo puedo ayudarte en el día de hoy?',
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleSendMessage = async (content: string, type: 'text' | 'audio' | 'file', audioBlob?: Blob, file?: File) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: type === 'text' ? content : '',
      type,
      sender: 'user',
      timestamp: new Date(),
    };
    
    if (type === 'audio' && audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      userMessage.audioUrl = audioUrl;
    }

    if (type === 'file' && file) {
      const fileUrl = URL.createObjectURL(file);
      userMessage.fileUrl = fileUrl;
      userMessage.fileName = file.name;
      userMessage.fileSize = file.size;
      userMessage.content = `Sent file: ${file.name}`;
    }
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      let botMessage;
      switch (type) {
        case 'text':
          botMessage = await sendMessage(content);
          break;
        case 'audio':
          botMessage = await sendAudioMessage(audioBlob!);
          break;
        case 'file':
          botMessage = await sendFileMessage(file!);
          break;
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleSendMessage('', 'file', undefined, files[0]);
    }
  };

  return (
    <div 
      className={`flex h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden transition-colors duration-300 relative ${
        isDragging ? 'ring-2 ring-indigo-500' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-colors duration-300">
          <h1 className="text-lg font-medium text-gray-800 dark:text-white">IA + RAG </h1>
          <ThemeToggle />
        </header>
        
        <div className="flex-1 overflow-hidden">
          <MessageList messages={messages} />
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
      
      <FileAttachment onFileSelect={(file) => handleSendMessage('', 'file', undefined, file)} />

      {isDragging && (
        <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-gray-800 dark:text-white">Drop your file here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;