import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-950 p-4 flex items-center justify-center transition-colors duration-300">
        <div className="w-full max-w-4xl h-[800px]">
          <ChatContainer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;