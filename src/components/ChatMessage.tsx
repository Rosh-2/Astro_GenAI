import React from 'react';
import { MessageCircle, User } from 'lucide-react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex items-start gap-3 mb-4 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div 
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center animate-avatarPulse ${
          isUser 
            ? 'bg-[rgba(var(--color-nebula-pink),0.9)] animate-glowPulse' 
            : 'bg-[rgba(var(--color-cosmic-purple),0.9)]'
        }`}
      >
        {isUser ? (
          <User size={20} className="text-white" />
        ) : (
          <MessageCircle size={20} className="text-white" />
        )}
      </div>
      
      <div 
        className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-lg ${
          isUser 
            ? 'var(--message-bg-user) text-white rounded-tr-none animate-userMessage' 
            : 'var(--message-bg-bot) rounded-tl-none animate-botMessage'
        }`}
        style={{
          background: isUser ? 'var(--message-bg-user)' : 'var(--message-bg-bot)',
        }}
      >
        <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;