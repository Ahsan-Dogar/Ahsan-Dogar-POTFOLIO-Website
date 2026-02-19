
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { gsap } from 'gsap';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Welcome. I am the AI Concierge for Ahsan Dogar. How may I assist you with exploring his portfolio today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize AI
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatWindowRef.current, 
        { y: 50, opacity: 0, scale: 0.9, pointerEvents: 'none' },
        { y: 0, opacity: 1, scale: 1, pointerEvents: 'auto', duration: 0.6, ease: 'expo.out' }
      );
    } else {
      gsap.to(chatWindowRef.current, { y: 20, opacity: 0, scale: 0.95, pointerEvents: 'none', duration: 0.4, ease: 'expo.in' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the elite AI Concierge for Ahsan Dogar's luxury portfolio. 
          Ahsan is a world-class Front-End Architect with 10+ years of experience. 
          Skills: React, GSAP, Three.js, TypeScript, Next.js. 
          Location: Dubai, UAE. 
          Personality: Professional, sophisticated, concise, and helpful. 
          Goal: Answer questions about Ahsan's work, experience, and value proposition. 
          If asked about non-professional topics, gently redirect to his work.`,
        },
      });

      const botResponse = response.text || "I apologize, I encountered a brief disconnect. How else can I help you navigate Ahsan's work?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm currently refined my knowledge. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[70]">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group overflow-hidden shadow-2xl transition-transform active:scale-95"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg 
          className={`w-6 h-6 text-white transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
        <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20 pointer-events-none"></div>
      </button>

      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] pointer-events-none opacity-0 translate-y-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Concierge</p>
              <p className="text-sm font-medium luxury-text italic">Ahsan's Digital Assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none font-light'
                }`}
              >
                {msg.text}
              </div>
              <p className="mt-1 text-[8px] uppercase tracking-widest text-white/20">
                {msg.role === 'user' ? 'You' : 'Concierge'}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire about my vision..."
              className="w-full bg-black/40 border border-white/10 rounded-full py-3 px-6 outline-none focus:border-white/30 transition-colors text-sm font-light text-white placeholder:text-white/20"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:scale-100"
              disabled={isTyping}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
