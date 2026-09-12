import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I am the ITM NCC Digital Assistant. How can I help you with Army Unit or Naval Unit cadet services today?" }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    "How to Join NCC?",
    "Camp Eligibility",
    "Attendance Rules",
    "Digital Certificates",
    "ITM NCC Units",
    "Contact Officer"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add user message
    const updatedMessages: ChatMessage[] = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');

    // Generate simulated bot response
    setTimeout(() => {
      let botResponse = "You can explore all details on the ITM NCC Portal. Feel free to browse Join NCC, Camps, or Contact your ANO.";
      const lower = query.toLowerCase();

      if (lower.includes('join') || lower.includes('enroll')) {
        botResponse = "To join ITM NCC: Open the 'Join NCC' page, select your preferred unit (Army Unit or Naval Unit), complete the online application form, and attach your student ID.";
      } else if (lower.includes('camp') || lower.includes('eligib')) {
        botResponse = "Camp Registration requires a minimum 75% parade drill attendance, medical fitness certificate, and active cadet status. Click 'Check Eligibility' on any camp card to run an instant evaluator!";
      } else if (lower.includes('attend')) {
        botResponse = "Cadets must maintain at least 75% drill attendance across the academic year to appear for Certificate B and C examinations. Check the 2-Day Training Program tab for details.";
      } else if (lower.includes('certif')) {
        botResponse = "Official digital certificates (Certificate A, B, and C) can be verified instantly on the home page using serial numbers like NCC-CERT-2024-B-8902.";
      } else if (lower.includes('unit') || lower.includes('wing')) {
        botResponse = "ITM NCC operates Two Active Units: 🪖 Army Unit (1st ITM BN) and ⚓ Naval Unit (4th ITM Naval Unit).";
      } else if (lower.includes('contact') || lower.includes('officer')) {
        botResponse = "You can contact Capt. Arindam Roy (ANO, Army Unit) at arindam.roy@itm.edu.in or visit the NCC Office at Student Activity Center.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1677FF] hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-white cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-amber-300" />
          </div>
          <span className="text-xs tracking-wide">Ask NCC Assistant</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#0F2942] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight flex items-center gap-1">
                  ITM NCC Assistant <Sparkles className="w-3 h-3 text-amber-400" />
                </h4>
                <span className="text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Online • AI Guidance
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#1677FF] text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-slate-800 rounded-bl-none shadow-xs border border-slate-200 leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-[10px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 bg-blue-50 text-[#1677FF] hover:bg-blue-100 font-bold px-2.5 py-1 rounded-full border border-blue-200 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question about ITM NCC..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-100 text-slate-900 px-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#1677FF]"
            />
            <button
              onClick={() => handleSend()}
              className="bg-[#1677FF] hover:bg-blue-700 text-white p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
