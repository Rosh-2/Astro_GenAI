import React from 'react';
import { Rocket, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="bg-space-dark bg-opacity-80 backdrop-blur-md px-4 py-3 border-b border-cosmic-purple border-opacity-30 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Rocket className="text-star-gold animate-pulse" size={28} />
          <h1 className="text-white text-xl font-bold tracking-wide">
            <span className="text-nebula-pink">Astro</span>Chat
          </h1>
        </div>
        
        <button 
          onClick={onOpenSettings}
          className="text-cosmic-purple hover:text-nebula-pink transition p-2 rounded-full hover:bg-space-light"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;