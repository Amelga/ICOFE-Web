import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck,
  Info
} from 'lucide-react';

const RealisticCalculatorIcon = ({ size = 48 }: { size?: number | string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-emerald-accent rounded-xl"
  >
    {/* Main Outer Frame - Changed from Amber to Emerald */}
    <rect 
      x="18" 
      y="12" 
      width="64" 
      height="76" 
      rx="10" 
      fill="none" 
      stroke="#10B981" 
      strokeWidth="3.5"
    />
    
    {/* Display Screen Frame with Emerald Glow */}
    <rect 
      x="26" 
      y="22" 
      width="48" 
      height="18" 
      rx="3" 
      fill="none" 
      stroke="#10B981" 
      strokeWidth="2.5" 
      className="animate-pulse"
    />
    
    {/* Minimalist Button Grid Lines - Changed from Amber to Emerald */}
    <g stroke="#10B981" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round">
      {/* Horizontal grid lines */}
      <line x1="28" y1="52" x2="72" y2="52" />
      <line x1="28" y1="64" x2="72" y2="64" />
      <line x1="28" y1="76" x2="72" y2="76" />
      
      {/* Vertical grid lines */}
      <line x1="42.5" y1="48" x2="42.5" y2="80" />
      <line x1="57.5" y1="48" x2="57.5" y2="80" />
    </g>

    {/* Green Accent Dot */}
    <circle cx="72" cy="22" r="2" fill="#10B981" className="animate-pulse shadow-[0_0_8px_#10B981]" />
    
    {/* Subtle Scan Line for Screen */}
    <line x1="28" y1="31" x2="72" y2="31" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" className="animate-bounce" />
  </svg>
);

const ROICalculator: React.FC = () => {
  // Inputs
  const [units, setUnits] = useState(4);
  const [dailySales, setDailySales] = useState(80);
  const [pricePerCup, setPricePerCup] = useState(15);
  const [incomeModel, setIncomeModel] = useState<'fixed' | 'share'>('fixed');

  // Outputs
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalNetworkRevenue, setTotalNetworkRevenue] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [paybackMonths, setPaybackMonths] = useState(0);
  const [revSharePercent, setRevSharePercent] = useState(25);
  const [totalOperatingUnits, setTotalOperatingUnits] = useState(0);

  useEffect(() => {
    // 1. Investment Logic
    const invest = units * 75000;
    setTotalInvestment(invest);

    // 2. Tier & Bonus Logic
    let share = 25;
    let operatingUnits = units;

    if (units >= 9) {
      share = 30; // Institutional
      operatingUnits = units + 1; // Buy 9 Get 1 Free
    } else if (units >= 3) {
      share = 27; // Pro
    } else {
      share = 25; // Base
    }

    setRevSharePercent(share);
    setTotalOperatingUnits(operatingUnits);

    // 3. Revenue Logic
    const monthlyRevPerKiosk = dailySales * pricePerCup * 30;
    const totalRev = monthlyRevPerKiosk * operatingUnits;
    setTotalNetworkRevenue(totalRev);

    // 4. Profit Logic
    let profit = 0;
    if (incomeModel === 'fixed') {
      profit = 6000 * units; // Fixed is based on purchased units
    } else {
      profit = totalRev * (share / 100);
    }
    setNetProfit(profit);

    // 5. Payback Logic
    const payback = profit > 0 ? Number((invest / profit).toFixed(1)) : 0;
    setPaybackMonths(payback);

  }, [units, dailySales, pricePerCup, incomeModel]);

  return (
    <div className="glass-panel p-0 rounded-[2.5rem] max-w-5xl mx-auto border-emerald-500/20 animate-emerald-accent overflow-hidden bg-slate-900/40 relative">
      {/* Subtle Background Glow Pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 pointer-events-none opacity-40"></div>

      {/* Header */}
      <div className="relative p-6 md:p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/[0.02]">
        <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
          <div className="shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
               <RealisticCalculatorIcon size="100%" />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase truncate">ROI Calculator</h2>
            <p className="text-slate-500 font-medium text-xs md:text-base truncate">Scale your portfolio with automated assets.</p>
          </div>
        </div>

        {/* Section 1: Tier Selection (Indicator) */}
        <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto justify-center md:justify-start">
          <TierBadge label="Base" active={units < 3} />
          <TierBadge label="Pro" active={units >= 3 && units < 9} />
          <TierBadge label="Institutional" active={units >= 9} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        {/* Input Column */}
        <div className="lg:col-span-7 p-6 md:p-10 space-y-12 border-r border-white/5">
          
          {/* Section 2: Portfolio Scale */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Section 2</h4>
                <h3 className="text-xl font-bold text-white">Portfolio Scale</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Units:</span>
                <input 
                  type="number" 
                  value={units} 
                  onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-16 md:w-20 bg-slate-950 border border-emerald-500/20 rounded-xl px-2 md:px-4 py-2 text-center text-amber-500 font-black text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="relative pt-6">
              <input 
                type="range" min="1" max="20" step="1"
                value={units} onChange={(e) => setUnits(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-4 font-black uppercase tracking-widest">
                <span>Start (1-4)</span>
                <span>Growth (5-8)</span>
                <span className="text-emerald-500/80">Whale (9+)</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                <span className="text-sm font-bold text-slate-300">Total Investment Capital</span>
              </div>
              <span className="text-base md:text-xl font-black text-white whitespace-nowrap">AED {totalInvestment.toLocaleString()}</span>
            </div>

            {units < 9 && (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-emerald-500/80 text-[11px] font-bold animate-pulse">
                <TrendingUp size={16} className="shrink-0" />
                <p>Top up to 9 kiosks (AED {(675000 - totalInvestment).toLocaleString()} more) to unlock 10th kiosk FREE & 30% Rev Share.</p>
              </div>
            )}
          </section>

          {/* Section 3 & 4: Income Strategy */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-white">Return Structure</h3>
            <div className="grid grid-cols-2 gap-4">
              <StrategyCard 
                title="Guaranteed Fixed"
                value={`AED ${(6000 * units).toLocaleString()}`}
                sub="Non-Variable Monthly Pay"
                active={incomeModel === 'fixed'}
                onClick={() => setIncomeModel('fixed')}
              />
              <StrategyCard 
                title="Revenue Share"
                value={`${revSharePercent}%`}
                sub={units >= 9 ? "(Institutional Status Unlocked)" : "Of Total Sales Volume"}
                active={incomeModel === 'share'}
                onClick={() => setIncomeModel('share')}
                isEmerald={units >= 9}
              />
            </div>
          </section>

          {/* Section 5 & 6: Assumptions */}
          <section className="space-y-8 pt-6 border-t border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-white">Daily Throughput</h3>
                <Info size={14} className="text-slate-600 cursor-help" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <PresetButton label="Rare Case" sub="40 Cups" active={dailySales === 40} onClick={() => setDailySales(40)} />
                <PresetButton label="Expected" sub="80 Cups" active={dailySales === 80} onClick={() => setDailySales(80)} />
                <PresetButton label="High Density" sub="300 Cups" active={dailySales === 300} onClick={() => setDailySales(300)} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Pricing Strategy <span className="text-xs text-slate-500 font-normal ml-2">(AED per cup)</span></h3>
              <div className="flex gap-3">
                {[12, 15, 18, 22].map(price => (
                  <button 
                    key={price}
                    onClick={() => setPricePerCup(price)}
                    className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all border ${pricePerCup === price ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-5 bg-white/[0.01] p-6 md:p-10 flex flex-col justify-between">
          <div className="space-y-8">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Financial Performance</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <OutputCard 
                label="Total Network Revenue" 
                value={`AED ${totalNetworkRevenue.toLocaleString()}`} 
                sub="Estimated Per Month"
              />
              <OutputCard 
                label="Your Net Profit" 
                value={`AED ${Math.round(netProfit).toLocaleString()}`} 
                sub={incomeModel === 'fixed' ? "Guaranteed fixed return (independent of volatility)" : "Variable Performance-Based Yield"}
                highlight
                isEmerald={incomeModel === 'share' && units >= 9}
              />
              <OutputCard 
                label="Portfolio Payback" 
                value={`${paybackMonths} Months`} 
                sub="Based on operational telemetry"
              />
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="space-y-3">
              <EligibilityRow active={units >= 3} text="Priority Territory Rights Qualified" />
              <EligibilityRow active={units >= 9} text="Institutional Yield Tier Unlocked" />
              <EligibilityRow active={units >= 9} text="Automated Scaling Enabled" />
            </div>

            <p className="text-[10px] text-slate-600 italic leading-relaxed pt-6 border-t border-white/5">
              Final payouts are subject to 5% VAT and a 10% service charge. All figures are estimates based on current operational telemetry and average site performance. Actual results may vary depending on location, pricing mix, and operating conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TierBadge = ({ label, active }: { label: string, active: boolean }) => (
  <div className={`px-2 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all text-center flex-1 md:flex-none ${active ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-slate-600'}`}>
    {label}
  </div>
);

const StrategyCard = ({ title, value, sub, active, onClick, isEmerald }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 transition-all text-center group ${active ? (isEmerald ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-amber-500 bg-amber-500/5 shadow-inner') : 'border-white/5 bg-slate-950/30 text-slate-500 hover:border-white/10'}`}
  >
    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] mb-2 ${active ? (isEmerald ? 'text-emerald-400' : 'text-amber-500') : 'text-slate-600'}`}>{title}</span>
    <span className={`text-xl md:text-2xl font-black mb-1 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}>{value}</span>
    <span className="text-[8px] md:text-[9px] font-medium opacity-60 uppercase tracking-tighter">{sub}</span>
  </button>
);

const PresetButton = ({ label, sub, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`p-2 md:p-4 rounded-xl border text-center transition-all ${active ? 'bg-emerald-500/10 border-emerald-500/50 text-white' : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/10'}`}
  >
    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xs md:text-sm font-black ${active ? 'text-emerald-400' : 'text-slate-400'}`}>{sub}</p>
  </button>
);

const OutputCard = ({ label, value, sub, highlight, isEmerald }: any) => (
  <div className={`p-6 rounded-[1.5rem] border ${highlight ? (isEmerald ? 'bg-emerald-500/5 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-amber-500/5 border-amber-500/20 amber-glow') : 'bg-slate-950 border-white/5'}`}>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-3">{label}</p>
    <h4 className={`text-2xl md:text-3xl font-black ${highlight ? (isEmerald ? 'text-emerald-400' : 'text-amber-500') : 'text-white'} tracking-tighter mb-1 truncate`}>{value}</h4>
    <p className="text-[9px] font-medium text-slate-600 uppercase tracking-widest">{sub}</p>
  </div>
);

const EligibilityRow = ({ active, text }: { active: boolean, text: string }) => (
  <div className={`flex items-center gap-3 text-[10px] md:text-xs font-bold transition-opacity ${active ? 'opacity-100 text-emerald-500' : 'opacity-20 text-slate-500'}`}>
    <CheckCircle2 size={16} className={`shrink-0 ${active ? 'text-emerald-500' : 'text-slate-600'}`} />
    <span className="tracking-tight">{text}</span>
  </div>
);

export default ROICalculator;