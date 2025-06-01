import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedText = inputText.trim();
    if (trimmedText && !disabled) {
      onSendMessage(trimmedText);
      setInputText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-container rounded-full flex items-center p-1.5 shadow-lg transition-transform transform hover:scale-[1.01]"
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={disabled}
        placeholder="Ask about the cosmos..."
        className="flex-grow bg-transparent text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-secondary))] px-4 py-2.5 focus:outline-none"
      />
      
      <button
        type="submit"
        disabled={!inputText.trim() || disabled}
        className={`rounded-full p-2.5 transition-all duration-300 ${
          inputText.trim() && !disabled
            ? 'bg-[rgba(var(--color-nebula-pink),0.9)] text-white hover:bg-[rgba(var(--color-nebula-pink),0.8)] animate-glowPulse'
            : 'bg-[rgba(var(--bg-secondary),0.5)] text-[rgba(var(--text-secondary),0.5)] cursor-not-allowed'
        }`}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;