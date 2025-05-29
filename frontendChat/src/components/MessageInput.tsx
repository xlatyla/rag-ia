import React, { useState, useRef } from 'react';
import { Send, Mic, Square } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'audio', audioBlob?: Blob) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        onSendMessage('', 'audio', audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
          } text-gray-800 dark:text-white transition-colors duration-300`}
        >
          {isRecording ? <Square size={18} /> : <Mic size={18} />}
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-l-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300 text-gray-800 dark:text-white"
          disabled={isLoading || isRecording}
        />
        <button
          type="submit"
          disabled={(!message.trim() && !isRecording) || isLoading}
          className={`p-2 rounded-r-full ${
            message.trim() && !isLoading
              ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          } text-white transition-colors duration-300`}
        >
          {isLoading ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;