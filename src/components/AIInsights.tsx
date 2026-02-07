
import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Bot } from 'lucide-react';
import { getRoboCupAssistant } from '../services/geminiService';

const AIInsights: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const context = "User is a franchisee with 2 kiosks in Dubai Mall. Total revenue AED 45,000 this month. ROI on track for 11 months. Consumables low at Kiosk #002.";

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const aiText = await getRoboCupAssistant(query, context);
    setResponse(aiText);
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-amber-500/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4">
        <Sparkles className="text-amber-500 animate-pulse" size={20} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
          <Bot className="text-slate-900" />
        </div>
        <h3 className="text-lg font-bold">AI Business Partner</h3>
      </div>

      <div className="min-h-[120px] mb-6 text-sm text-slate-300 leading-relaxed">
        {loading ? (
          <div className="flex items-center gap-2 text-amber-500 animate-pulse">
            <Bot size={16} />
            <span>Analyzing real-time kiosk telemetry...</span>
          </div>
        ) : response ? (
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500">{response}</p>
        ) : (
          <p className="text-slate-500 italic">"Ask me about your expansion eligibility, local demand spikes, or maintenance scheduling."</p>
        )}
      </div>

      <form onSubmit={handleAsk} className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. How can I optimize my ROI?"
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button 
          type="submit"
          className="bg-amber-500 text-slate-900 p-2 rounded-xl hover:bg-amber-400 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIInsights;
