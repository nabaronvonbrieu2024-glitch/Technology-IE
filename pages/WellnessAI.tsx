import React, { useState, useRef, useEffect } from 'react';
import { getWellnessAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, Bot, User as UserIcon, Loader2 } from 'lucide-react';

const WellnessAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello. I am Herbéra AI. I can guide you through our natural remedies or answer your wellness questions. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getWellnessAdvice(input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#F7F5F2]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 border-b border-[#E5E0D8] shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0F2A1D] flex items-center justify-center text-white shadow-md">
           <Sparkles size={20} className="text-[#C6A75E]" />
        </div>
        <div>
           <h1 className="font-serif font-bold text-[#0F2A1D] leading-tight">Herbéra AI</h1>
           <p className="text-xs text-[#1C1C1C]/60 flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             Wellness Assistant
           </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
              msg.role === 'model' ? 'bg-[#0F2A1D] text-[#F7F5F2]' : 'bg-[#E5E0D8] text-[#1C1C1C]'
            }`}>
              {msg.role === 'model' ? <Bot size={16} /> : <UserIcon size={16} />}
            </div>
            
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#0F2A1D] text-[#F7F5F2] rounded-tr-sm' 
                : 'bg-white text-[#1C1C1C] border border-[#E5E0D8] rounded-tl-sm'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap font-light">{msg.text}</p>
              <span className={`text-[10px] mt-2 block opacity-60 ${msg.role === 'user' ? 'text-[#9DB8A0]' : 'text-[#1C1C1C]/40'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-[#1C1C1C]/40 text-sm ml-12 animate-pulse font-serif italic">
            <Loader2 size={16} className="animate-spin" />
            <span>Consulting botanical database...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white/80 backdrop-blur-md border-t border-[#E5E0D8]">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about herbs, sleep, energy..."
            className="flex-1 bg-[#F7F5F2] text-[#1C1C1C] rounded-xl pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#0F2A1D]/20 transition-all placeholder:text-[#1C1C1C]/30"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-[#0F2A1D] text-[#F7F5F2] rounded-lg hover:bg-black disabled:opacity-50 disabled:bg-[#E5E0D8] transition-colors shadow-sm"
          >
            <Send size={18} className={isLoading ? "opacity-0" : "ml-0.5"} />
            {isLoading && <Loader2 size={18} className="absolute top-2 left-2 animate-spin" />}
          </button>
        </form>
        <p className="text-[10px] text-center text-[#1C1C1C]/40 mt-2">
          Herbéra AI provides wellness suggestions, not medical advice.
        </p>
      </div>
    </div>
  );
};

export default WellnessAI;