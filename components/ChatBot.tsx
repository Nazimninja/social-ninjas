
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Send, Sparkles, ChevronDown, User, X, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

type ChatStep = 'INIT' | 'NAME' | 'PHONE' | 'EMAIL' | 'GOAL' | 'AI_CHAT';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>('INIT');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Lead Data
  const [leadData, setLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // Initial greeting when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'model',
        text: "Hi! I'm the Social Ninja AI Assistant. I can help you scale your business. To get started, may I ask your name?"
      }]);
      setStep('NAME');
    }
  }, [isOpen]);

  // Close chat on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // --- State Machine for Lead Capture ---

    if (step === 'NAME') {
      setTimeout(() => {
        setLeadData(prev => ({ ...prev, name: userMsg }));
        setMessages(prev => [...prev, { role: 'model', text: `Nice to meet you, ${userMsg}. To give you a call back later, what's your phone number?` }]);
        setStep('PHONE');
        setIsTyping(false);
      }, 600);
      return;
    }

    if (step === 'PHONE') {
      // Basic phone validation (allowing international formats, minimal 7 digits)
      if (userMsg.replace(/\D/g, '').length < 7) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'model', text: "That doesn't look like a valid phone number. Please enter a valid number including area code." }]);
          setIsTyping(false);
        }, 600);
        return;
      }

      setTimeout(() => {
        setLeadData(prev => ({ ...prev, phone: userMsg }));
        setMessages(prev => [...prev, { role: 'model', text: "Thanks. And what is the best email address to reach you at?" }]);
        setStep('EMAIL');
        setIsTyping(false);
      }, 600);
      return;
    }

    if (step === 'EMAIL') {
      // Basic email validation
      if (!userMsg.includes('@') || !userMsg.includes('.')) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'model', text: "That doesn't look like a valid email. Please try again so we can send you the strategy details later." }]);
          setIsTyping(false);
        }, 600);
        return;
      }

      setTimeout(() => {
        setLeadData(prev => ({ ...prev, email: userMsg }));
        setMessages(prev => [...prev, { role: 'model', text: "Great. Finally, what is your main business goal right now? (e.g., More Leads, Brand Awareness, Hiring...)" }]);
        setStep('GOAL');
        setIsTyping(false);
      }, 600);
      return;
    }

    if (step === 'GOAL') {
      setLeadData(prev => ({ ...prev, goal: userMsg }));

      // 1. Send Data to FormSubmit via AJAX
      try {
        await fetch("https://formsubmit.co/ajax/nazim@socialninjas.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: `New Lead via Chatbot: ${leadData.name}`,
            _template: "table",
            Name: leadData.name,
            Phone: leadData.phone,
            Email: leadData.email,
            Goal: userMsg,
            Source: "Chatbot"
          })
        });
        console.log("Lead captured via FormSubmit");
      } catch (e) {
        console.error("Failed to email lead", e);
      }

      // 2. Transition to AI Chat
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'model',
          text: "Thanks! I've noted that down for our strategy team. Now, feel free to ask me anything about digital marketing, our services, or how we can help you grow."
        }]);
        setStep('AI_CHAT');
        setIsTyping(false);
      }, 800);
      return;
    }

    // --- AI Chat Logic (Gemini) ---
    if (step === 'AI_CHAT') {
      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

        // Context-aware prompt
        const prompt = `
                You are a helpful, professional, and concise AI assistant for a digital agency called "Social Ninja's".
                User Name: ${leadData.name}
                User Goal: ${leadData.goal}
                
                Agency Services: Social Media Management, Video Production, Paid Ads (Meta/Google), AI Automation.
                Tone: Premium, confident, helpful. Not salesy, but authoritative.
                
                The user just asked: "${userMsg}"
                
                Provide a helpful answer in 2-3 sentences.
            `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview', // Using Flash for speed in chat
          contents: prompt,
        });

        setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble connecting to the server. Please try again." }]);
      } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'model', text: "I'm currently experiencing high traffic. Please try again later or book a call on our contact page." }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 group hover:scale-110 ${isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100 bg-brand-primary text-brand-realBlack hover:bg-white hover:text-brand-realBlack'}`}
        aria-label="Open Chat"
      >
        <MessageSquare size={24} className="fill-current" />
        {/* Notification Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-brand-dark animate-pulse"></span>
      </button>

      {/* Chat Window Container */}
      {/* 
          Mobile: Full screen (inset-0) with h-[100dvh] to handle mobile browser bars correctly.
          Desktop: Fixed size floating card.
      */}
      <div
        className={`
            fixed z-[100] flex flex-col bg-brand-surface/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 overflow-hidden
            
            /* Mobile Styles: Safe area aware */
            inset-0 w-full h-[100dvh] rounded-none origin-center safe-area-top
            
            /* Desktop Styles */
            md:inset-auto md:w-[400px] md:h-[600px] md:max-h-[80vh] md:rounded-3xl md:bottom-24 md:right-6 md:origin-bottom-right

            ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
        `}
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-dark border-b border-white/10 p-4 md:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center text-white shadow-lg relative border border-white/10">
              <Sparkles size={18} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-brand-dark"></div>
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm tracking-wide">Social Ninja AI</h3>
              <p className="text-[10px] text-brand-primary font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online Now
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors active:scale-95 touch-manipulation"
            aria-label="Close Chat"
          >
            {/* Chevron on Desktop, X on Mobile for clarity */}
            <span className="hidden md:block"><ChevronDown size={20} /></span>
            <span className="block md:hidden"><X size={24} /></span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-6 bg-brand-dark/20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up gap-3`}>

              {/* Avatar for Model (Left) */}
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)] mt-1 border border-white/10">
                  <Bot size={16} />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[75%] p-3.5 md:p-4 text-sm leading-relaxed shadow-xl backdrop-blur-sm ${msg.role === 'user'
                ? 'bg-white text-black font-semibold rounded-2xl rounded-tr-none'
                : 'bg-white/5 text-neutral-100 border border-white/10 rounded-2xl rounded-tl-none'
                }`}>
                {msg.text}
              </div>

              {/* Avatar for User (Right) */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-brand-surface border border-white/20 flex items-center justify-center text-neutral-400 shrink-0 mt-1 shadow-sm">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)] mt-1 border border-white/10">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-brand-primary/50 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand-primary/50 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-brand-primary/50 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - safe-area-bottom handled via utility class in index.html, but reinforcing here */}
        <div className="p-4 bg-brand-dark/80 backdrop-blur-md border-t border-white/10 shrink-0 safe-area-bottom">
          {/* Progress Indicator for Lead Gen */}
          {step !== 'AI_CHAT' && step !== 'INIT' && (
            <div className="flex gap-1.5 mb-4 justify-center px-8">
              <div className={`h-1 rounded-full flex-1 transition-all duration-500 ${['NAME', 'PHONE', 'EMAIL', 'GOAL'].includes(step) ? 'bg-brand-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1 rounded-full flex-1 transition-all duration-500 ${['PHONE', 'EMAIL', 'GOAL'].includes(step) ? 'bg-brand-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1 rounded-full flex-1 transition-all duration-500 ${['EMAIL', 'GOAL'].includes(step) ? 'bg-brand-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1 rounded-full flex-1 transition-all duration-500 ${step === 'GOAL' ? 'bg-brand-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
            </div>
          )}

          <div className="relative group/input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              // InputMode helps mobile keyboards display correctly
              inputMode={step === 'EMAIL' ? 'email' : step === 'PHONE' ? 'tel' : 'text'}
              placeholder={
                step === 'NAME' ? "Enter your full name..." :
                  step === 'PHONE' ? "Enter specific phone number..." :
                    step === 'EMAIL' ? "Enter your email..." :
                      step === 'GOAL' ? "e.g. Get more leads..." :
                        "Type a message..."
              }
              className="w-full bg-brand-surface border border-white/10 rounded-full pl-5 pr-14 py-4 md:py-3.5 text-base text-white focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 focus:outline-none placeholder:text-neutral-500 transition-all shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 md:p-2 bg-brand-primary text-brand-realBlack rounded-full hover:bg-white transition-all duration-300 disabled:opacity-0 disabled:scale-75 shadow-lg hover:shadow-brand-primary/20 hover:scale-105 active:scale-95 touch-manipulation"
            >
              <Send size={18} className={inputValue.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
