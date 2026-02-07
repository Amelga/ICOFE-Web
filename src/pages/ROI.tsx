import React, { useState, useEffect } from 'react';
import { Check, Lock, Info, TrendingUp, ShieldCheck } from 'lucide-react';

export default function ROI() {
  return (
    <div className="pt-20 min-h-screen bg-[#0f172a] text-slate-300 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="mb-12 text-center border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Institutional ROI Predictor</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest">Scale your portfolio with RoboCup automated assets.</p>
        </header>

        <Calculator />

      </div>
    </div>
  );
}

function Calculator() {
  // --- STATE ---
  const [units, setUnits] = useState(4);
  const [dailyCups, setDailyCups] = useState(80);
  const [pricePerCup, setPricePerCup] = useState(15);
  
  // --- DERIVED VALUES ---
  const costPerUnit = 75000;
  const fixedPayPerUnit = 6000;
  
  const totalInvestment = units * costPerUnit;
  const monthlyFixedPay = units * fixedPayPerUnit;
  
  // Tier Logic
  const isInstitutional = units >= 9;
  const currentTier = isInstitutional ? 'Institutional' : 'Pro';
  const revSharePercent = isInstitutional ? 30 : 27;
  
  // Revenue Logic
  const monthlyNetworkRevenue = units * dailyCups * pricePerCup * 30;
  const variableUpside = monthlyNetworkRevenue * (revSharePercent / 100);
  const totalMonthlyReturn = monthlyFixedPay + variableUpside;
  
  const paybackMonths = totalMonthlyReturn > 0 ? (totalInvestment / totalMonthlyReturn) : 0;

  // Labels
  let scaleLabel = "Start";
  if (units >= 5) scaleLabel = "Growth";
  if (units >= 9) scaleLabel = "Whale";

  return (
    <div className="bg-[#1e293b] rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
      
      {/* 1. Tier Selection (Visual Only - Logic Driven) */}
      <div className="grid grid-cols-3 border-b border-slate-700 bg-slate-900/50">
        <TierTab label="Base" active={false} disabled={true} note="Fixed Pay Only" />
        <TierTab label="Pro (27%)" active={!isInstitutional} disabled={false} note="Standard Access" />
        <TierTab label="Institutional (30%)" active={isInstitutional} disabled={!isInstitutional} note="9+ Units Required" locked={!isInstitutional} />
      </div>

      <div className="p-8 space-y-12">

        {/* 2. Portfolio Scale */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-white font-medium mb-1">Portfolio Scale</h3>
              <p className="text-xs text-slate-500">Asset Allocation</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-light text-white">{units}</span> <span className="text-slate-500 text-sm">Units</span>
              <div className="text-xs text-emerald-500 font-mono mt-1 uppercase tracking-wide">[{scaleLabel} TIER]</div>
            </div>
          </div>
          
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={units} 
            onChange={(e) => setUnits(Number(e.target.value))} 
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-6"
          />

          <div className="flex justify-between items-center text-sm border-t border-slate-700/50 pt-4">
            <div className="text-slate-400">Total Investment: <span className="text-white font-mono">{totalInvestment.toLocaleString()} AED</span></div>
            {!isInstitutional && (
              <div className="text-amber-500 text-xs flex items-center gap-2">
                <Info size={14} />
                Add {9 - units} more units to unlock Institutional Tier (30%)
              </div>
            )}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 3. Guaranteed Fixed Pay */}
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 uppercase">Non-Variable</div>
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">Guaranteed Fixed Pay</div>
            <div className="text-3xl font-mono text-white mb-1">{monthlyFixedPay.toLocaleString()} <span className="text-sm text-slate-500 font-sans">AED / Mo</span></div>
            <p className="text-[10px] text-slate-500">Base downside protection anchor.</p>
          </div>

          {/* 4. Revenue Share Configuration */}
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
             <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">Revenue Share Allocation</div>
             <div className="text-3xl font-mono text-white mb-1">{revSharePercent}% <span className="text-sm text-slate-500 font-sans">of Volume</span></div>
             <p className="text-[10px] text-slate-500">Tier-driven variable upside.</p>
          </div>
        </div>

        {/* 5. Assumptions */}
        <section className="grid md:grid-cols-2 gap-12 border-t border-slate-700/50 pt-8">
          
          {/* Daily Throughput */}
          <div>
            <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Daily Throughput (Cups/Unit)</h3>
            <div className="flex gap-2">
              {[40, 80, 300].map(val => (
                <button 
                  key={val}
                  onClick={() => setDailyCups(val)}
                  className={`flex-1 py-3 text-sm font-medium rounded-md border transition-all ${dailyCups === val ? 'bg-slate-700 border-slate-500 text-white' : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-600'}`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 mt-2 px-1">
              <span>Conservative</span>
              <span>Expected</span>
              <span>High-Density</span>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div>
            <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Pricing Strategy (AED)</h3>
            <div className="flex gap-2">
              {[12, 15, 18, 22].map(val => (
                <button 
                  key={val}
                  onClick={() => setPricePerCup(val)}
                  className={`flex-1 py-3 text-sm font-medium rounded-md border transition-all ${pricePerCup === val ? 'bg-slate-700 border-slate-500 text-white' : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-600'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Financial Performance Outputs */}
        <section className="bg-black/20 rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-white mb-6 font-medium border-l-2 border-emerald-500 pl-3">Projected Performance</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            
            <StatCard 
              label="Network Revenue" 
              value={monthlyNetworkRevenue} 
              sub="Est. Monthly"
            />
            
            <StatCard 
              label="Fixed Net Profit" 
              value={monthlyFixedPay} 
              sub="Guaranteed"
              highlight={true}
            />

            <StatCard 
              label="Variable Upside" 
              value={variableUpside} 
              sub="Rev Share"
            />

            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Payback Period</div>
              <div className="text-2xl font-mono text-emerald-400">{paybackMonths.toFixed(1)} <span className="text-xs text-slate-500 font-sans">Months</span></div>
              <div className="text-[10px] text-slate-600 mt-2">Based on current telemetry</div>
            </div>

          </div>
        </section>

        {/* 10. Institutional Eligibility */}
        <section className="space-y-2 pt-4">
           <EligibilityItem label="Priority Territory Rights Qualified" checked={units >= 3} />
           <EligibilityItem label="Institutional Yield Tier Unlocked" checked={units >= 9} />
           <EligibilityItem label="Automated Scaling Enabled (10th Unit Free)" checked={units >= 9} />
        </section>

        {/* 11. Disclaimers */}
        <footer className="text-[10px] text-slate-600 pt-8 border-t border-slate-800 text-justify">
          <p>Figures are estimates based on current operational telemetry and average site performance. Actual results may vary depending on location, pricing mix, and operating conditions. Guaranteed fixed pay is subject to contract terms. This tool is for simulation purposes only and does not constitute a binding financial offer.</p>
        </footer>

      </div>
    </div>
  );
}

function TierTab({ label, active, disabled, note, locked }: { label: string, active: boolean, disabled: boolean, note: string, locked?: boolean }) {
  return (
    <div className={`py-4 text-center border-r border-slate-700 last:border-r-0 relative ${active ? 'bg-slate-800 text-white' : 'text-slate-500'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="text-sm font-medium flex justify-center items-center gap-2">
        {label}
        {locked && <Lock size={12} />}
      </div>
      <div className="text-[10px] mt-1 opacity-70">{note}</div>
      {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
    </div>
  );
}

function StatCard({ label, value, sub, highlight }: { label: string, value: number, sub: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-slate-800/30 border-slate-700'}`}>
      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-mono ${highlight ? 'text-emerald-400' : 'text-white'}`}>
        {Math.round(value).toLocaleString()} <span className="text-xs text-slate-500 font-sans">AED</span>
      </div>
      <div className="text-[10px] text-slate-600 mt-2">{sub}</div>
    </div>
  );
}

function EligibilityItem({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-sm ${checked ? 'text-emerald-400' : 'text-slate-600'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${checked ? 'bg-emerald-500/10 border-emerald-500' : 'border-slate-700'}`}>
        {checked && <Check size={12} />}
      </div>
      {label}
    </div>
  );
}
