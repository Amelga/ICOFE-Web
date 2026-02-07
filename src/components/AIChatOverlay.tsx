import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, Coffee, TrendingUp, ShieldCheck, UserPlus } from 'lucide-react';
import { getRoboCupAssistant } from '../services/geminiService';
import Logo from './Logo';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatOverlay: React.FC<AIChatOverlayProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Greeting, partner. I am your arm COFFEE ecosystem assistant. How can I optimize your investment journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await getRoboCupAssistant(userMsg, "Current page: Global Overlay Chat");
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error communicating with my core systems." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl h-[80vh] glass-panel rounded-[2.5rem] border-amber-500/30 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.15)] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-slate-900/40 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-500/20">
              <Logo size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-white uppercase">AI Business Partner</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Link Active</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="px-6 py-4 flex gap-2 overflow-x-auto border-b border-white/5 no-scrollbar">
          <SuggestionChip icon={<Coffee size={12}/>} text="ROI Analysis" onClick={() => setInput("Explain the ROI of a 5-unit portfolio.")} />
          <SuggestionChip icon={<ShieldCheck size={12}/>} text="EID Benefits" onClick={() => setInput("How do the Emirates IDs work with the franchise?")} />
          <SuggestionChip icon={<TrendingUp size={12}/>} text="Rev Share vs Fixed" onClick={() => setInput("Should I choose fixed salary or revenue share?")} />
          <SuggestionChip icon={<UserPlus size={12}/>} text="Scaling" onClick={() => setInput("Tell me about the Buy 9 Get 1 Free offer.")} />
        </div>

        {/* Chat Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/10' 
                  : 'bg-white/5 border border-white/10 text-slate-200'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Processing Data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-slate-900/40 border-t border-white/10">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the arm COFFEE ecosystem..."
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-white"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-4 bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-600 mt-4 uppercase font-bold tracking-[0.2em]">
            arm COFFEE Autonomous Intelligence Matrix v2.5
          </p>
        </div>
      </div>
    </div>
  );
};

const SuggestionChip = ({ icon, text, onClick }: { icon: any, text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 rounded-full text-[10px] font-bold text-slate-400 hover:text-amber-500 transition-all"
  >
    {icon}
    {text}
  </button>
);

export default AIChatOverlay;