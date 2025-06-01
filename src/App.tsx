import React, { useState, useEffect } from 'react';
import StarryBackground from './components/StarryBackground';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark' as 'dark' | 'light' | 'system',
    soundEnabled: true,
  });

  useEffect(() => {
    const root = document.documentElement;
    const darkMode = settings.theme === 'dark' || 
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.remove('dark-theme', 'light-theme');
    root.classList.add(darkMode ? 'dark-theme' : 'light-theme');
  }, [settings.theme]);

  useEffect(() => {
    document.title = 'AstroChat - Space Explorer';
  }, []);

  const handleUpdateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none transition-opacity duration-500"
        style={{ 
          backgroundImage: 'url("https://images2.alphacoders.com/114/1141632.jpg")',
          filter: 'brightness(1) contrast(1.2)'
        }}
      />
      <StarryBackground />
      
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <main className="flex-grow flex flex-col max-w-5xl w-full mx-auto relative z-10">
        <div className="flex-grow flex flex-col p-4 md:py-6">
          <div className="glass-container rounded-xl flex-grow flex flex-col overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </main>
      
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}

export default App;