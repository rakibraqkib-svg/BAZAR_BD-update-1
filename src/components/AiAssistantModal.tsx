import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { askBazarAi } from '../services/aiAssistant';
import { Language } from '../types';

interface AiAssistantModalProps {
  onClose: () => void;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: language === 'bn'
        ? 'আসসালামু আলাইকুম! আমি বাজারবিডি এআই সহকারী। আজকের যেকোনো নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, দামের পরিবর্তন বা বাজারের তুলনা জানতে আমাকে প্রশ্ন করতে পারেন।'
        : 'Hello! I am BazarBD AI Price Assistant. Ask me about today\'s commodity rates, price fluctuations, or market comparisons across Bangladesh.',
      timestamp: 'এখন',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = language === 'bn' ? [
    'আজকে ঢাকায় আলুর দাম কত?',
    'সবচেয়ে বেশি কোন পণ্যের দাম কমেছে?',
    'পদ্মার ইলিশ মাছের বর্তমান দর কত?',
    'সয়াবিন তেল ও সরিষার তেলের দাম কত?',
  ] : [
    'What is the price of Potato in Dhaka today?',
    'Which commodity dropped in price today?',
    'Current price of Padma Hilsa?',
    'Soybean oil and Mustard oil rates?',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputVal.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const responseText = await askBazarAi(textToSend, language);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: language === 'bn'
          ? 'দুঃখিত, তথ্য খুঁজতে সামান্য ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Sorry, unable to fetch rate right now. Please try again.',
        timestamp: 'এখন',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#087443] to-[#0b643c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  {language === 'bn' ? 'বাজারবিডি এআই মূল্য সহকারী' : 'BazarBD AI Price Analyst'}
                </h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold text-emerald-200">
                  ভেরিফাইড ডেটা
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90">
                {language === 'bn' ? 'কৃষি বিপণন অধিদপ্তর ও টিসিবির তথ্যের ওপর নির্ভুল উত্তর' : 'Grounded in verified DAM & TCB market databases'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div ref={scrollRef} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-[#087443] text-white' : 'bg-emerald-100 text-[#087443]'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#087443] text-white rounded-tr-xs shadow-xs'
                  : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#087443] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#087443]" />
                <span>{language === 'bn' ? 'ডাটাবেজে যাচাই করা হচ্ছে...' : 'Checking database rates...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">
            {language === 'bn' ? 'পরামর্শ:' : 'Suggestions:'}
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-[#087443] px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={language === 'bn' ? 'যেকোনো পণ্যের নাম লিখে দাম জানতে চান...' : 'Ask about any commodity price...'}
              className="flex-1 text-xs sm:text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#087443]/30 focus:border-[#087443]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-3 bg-[#087443] hover:bg-[#065e36] disabled:opacity-50 text-white rounded-2xl shadow-xs transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
