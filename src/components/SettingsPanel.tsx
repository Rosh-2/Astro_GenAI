import React from 'react';
import { X, Volume2, Moon, Sun, Monitor } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    theme: 'dark' | 'light' | 'system';
    soundEnabled: boolean;
  };
  onUpdateSettings: (settings: Partial<SettingsPanelProps['settings']>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        className="bg-space-dark border border-cosmic-purple rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-xl animate-slideUp mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-space-light"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Theme Setting */}
          <div>
            <h3 className="text-white text-lg mb-3">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex flex-col items-center p-3 rounded-lg border ${
                  settings.theme === 'dark' 
                    ? 'border-nebula-pink bg-space-light' 
                    : 'border-gray-700 bg-transparent hover:bg-space-light'
                }`}
              >
                <Moon size={20} className="text-star-gold mb-1" />
                <span className="text-white text-sm">Dark</span>
              </button>
              
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex flex-col items-center p-3 rounded-lg border ${
                  settings.theme === 'light' 
                    ? 'border-nebula-pink bg-space-light' 
                    : 'border-gray-700 bg-transparent hover:bg-space-light'
                }`}
              >
                <Sun size={20} className="text-star-gold mb-1" />
                <span className="text-white text-sm">Light</span>
              </button>
              
              <button
                onClick={() => onUpdateSettings({ theme: 'system' })}
                className={`flex flex-col items-center p-3 rounded-lg border ${
                  settings.theme === 'system' 
                    ? 'border-nebula-pink bg-space-light' 
                    : 'border-gray-700 bg-transparent hover:bg-space-light'
                }`}
              >
                <Monitor size={20} className="text-star-gold mb-1" />
                <span className="text-white text-sm">System</span>
              </button>
            </div>
          </div>
          
          {/* Sound Setting */}
          <div>
            <h3 className="text-white text-lg mb-3">Sound</h3>
            <div className="flex items-center justify-between bg-space-light p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <Volume2 size={20} className="text-cosmic-purple" />
                <span className="text-white">Message Sounds</span>
              </div>
              
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  settings.soundEnabled ? 'bg-nebula-pink' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 transform rounded-full bg-white transition ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          <div className="pt-4 mt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-cosmic-purple hover:bg-opacity-80 text-white rounded-lg font-medium transition"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;