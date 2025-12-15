import React, { useState, useRef, useEffect } from 'react';
import { getWellnessAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, Bot, User as UserIcon, Loader2 } from 'lucide-react';

const WellnessAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Herbolario AI. Ask me anything about natural remedies, herbs, or our products. How can I help you feel your best today?",
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
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white shadow-md">
           <Sparkles size={20} />
        </div>
        <div>
           <h1 className="font-bold text-gray-800 leading-tight">Wellness Assistant</h1>
           <p className="text-xs text-gray-500 flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             Powered by Gemini AI
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
              msg.role === 'model' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}>
              {msg.role === 'model' ? <Bot size={16} /> : <UserIcon size={16} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-sm' 
                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-sm'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <span className={`text-[10px] mt-1 block opacity-70 ${msg.role === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm ml-12 animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about herbs, sleep, energy..."
            className="flex-1 bg-gray-100 text-gray-800 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 transition-colors shadow-sm"
          >
            <Send size={18} className={isLoading ? "opacity-0" : "ml-0.5"} />
            {isLoading && <Loader2 size={18} className="absolute top-2 left-2 animate-spin" />}
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          Herbolario AI can make mistakes. Consider checking important info.
        </p>
      </div>
    </div>
  );
};

export default WellnessAI;