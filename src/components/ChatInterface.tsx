import React, { useState, useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';
import ChatMessage, { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import { generateBotResponse } from '../utils/chatHelpers';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Greetings, space explorer! I'm sheldon, Sheldon Cooper. Ask me anything about Astronomy!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    setTimeout(async () => {
      const botResponse = await generateBotResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 mb-20" style={{ scrollbarWidth: 'thin' }}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 text-cosmic-purple">
              <Loader size={16} className="animate-spin" />
              <span className="text-sm">AstroBot is thinking...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-space-dark via-space-dark to-transparent">
        <div className="max-w-5xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;