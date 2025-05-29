import { Message } from '../types';

// Replace with your actual API endpoint
const API_ENDPOINT = 'http://localhost:8017';

export const sendMessage = async (content: string): Promise<Message> => {
  try {
        const response = await fetch(`${API_ENDPOINT}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    
    return {
      id: crypto.randomUUID(),
      content: data.answer || "I'm sorry, I couldn't process that request.",
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error sending message:', error);
    
    return {
      id: crypto.randomUUID(),
      content: "I'm having trouble connecting. Please try again later.",
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    };
  }
};

export const sendAudioMessage = async (audioBlob: Blob): Promise<Message> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch(`${API_ENDPOINT}/audio`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to send audio message');
    }

    const data = await response.json();
    
    return {
      id: crypto.randomUUID(),
      content: '',
      type: 'audio',
      audioUrl: data.audioUrl || '',
      sender: 'bot',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error sending audio message:', error);
    
    return {
      id: crypto.randomUUID(),
      content: "I'm having trouble processing your audio message. Please try again later.",
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    };
  }
};

export const sendFileMessage = async (file: File): Promise<Message> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_ENDPOINT}/upload-document`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to send file');
    }

    const data = await response.json();
    
    return {
      id: crypto.randomUUID(),
      content: `Received file: ${file.name}`,
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error sending file:', error);
    
    return {
      id: crypto.randomUUID(),
      content: "I'm having trouble processing your file. Please try again later.",
      type: 'text',
      sender: 'bot',
      timestamp: new Date(),
    };
  }
};