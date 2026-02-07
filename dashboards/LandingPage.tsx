import React from 'react';
import { 
  ChevronRight, ShieldCheck, Zap, Globe, Cpu, Play,
  Linkedin, Twitter, Instagram, Facebook, Mail, ArrowRight
} from 'lucide-react';
import ROICalculator from '../components/ROICalculator';
import Logo from '../components/Logo';
import DashboardHeader from '../components/DashboardHeader';
import { UserRole } from '../types';

interface LandingPageProps {
  onRoleChange: (role: UserRole) => void;
  onToggleChat: () => void;
  onToggleVoice: () => void;
  isVoiceActive: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleChange, onToggleChat, onToggleVoice, isVoiceActive }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Unified Navigation */}
      <DashboardHeader 
        title="arm COFFEE"
        role={UserRole.PUBLIC}
        onRoleChange={onRoleChange}
        onToggleChat={onToggleChat}
        onToggleVoice={onToggleVoice}
        isVoiceActive={isVoiceActive}
        transparent
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden -mt-[88px] pt-48 pb-20 md:pb-32">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000")',
            filter: 'brightness(0.35)'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 z-10"></div>

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-6 md:mb-8 backdrop-blur-md animate-emerald-accent shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            Guaranteed Income • Bank Account • Emirates ID
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-none animate-slide-up uppercase text-white">
            WORRY-FREE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">SUSTAINED INCOME</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed drop-shadow-lg animate-fade-in delay-200 px-4">
            Own the future of hospitality. A fully automated, premium robotic barista kiosk 
            designed for high-traffic Dubai locations. AED 6,000 monthly guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-slide-up delay-300">
            <button 
              onClick={() => onRoleChange(UserRole.FRANCHISEE)}
              className="w-full sm:w-auto group bg-amber-500 text-slate-950 px-8 md:px-10 py-4 md:py-5 rounded-full font-extrabold text-lg md:text-xl hover:bg-amber-400 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              Apply for Franchise <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-white/20 transition-all">
              <Play size={20} className="fill-white" /> Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Proof Section */}
      <section className="py-20 md:py-24 bg-slate-900/80 backdrop-blur-md border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {[
            { label: 'Potential Sites', val: '120+' },
            { label: 'Avg ROI', val: '12 Months' },
            { label: 'Cups Daily', val: '25k+' },
            { label: 'Asset Value', val: '300k' },
          ].map((s, i) => (
            <div key={i} className="group">
              <p className="text-3xl md:text-6xl font-black text-white mb-1 group-hover:text-amber-500 transition-colors duration-300 tracking-tighter leading-none uppercase">
                {s.val}
              </p>
              <p className="text-slate-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Advantages */}
      <section className="py-20 md:py-32 px-6 relative z-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 leading-tight">
            <div className="flex flex-col items-center mb-6 leading-none">
              <h2 className="text-4xl md:text-6xl font-normal lowercase tracking-tighter text-white">arm</h2>
              <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-light text-slate-500 pl-[0.6em]">COFFEE ADVANTAGE</p>
            </div>
            <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-400 mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-lg">
              The only franchise model that eliminates human dependency while 
              delivering consistent, 5-star quality coffee 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <FeatureCard 
              icon={<Zap className="text-amber-500" size={32} />}
              title="Autonomous Yield"
              desc="Machines work around the clock without breaks or benefits. Pure performance-driven revenue for your portfolio."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-amber-500" size={32} />}
              title="Zero Staffing"
              desc="Forget HR headaches, recruitment, and training. Our centralized team handles maintenance while you collect returns."
            />
            <FeatureCard 
              icon={<Cpu className="text-amber-500" size={32} />}
              title="Predictive AI"
              desc="Advanced IoT monitoring predicts beans and milk depletion. Restocking is managed by HQ before you even notice."
            />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 md:py-32 px-6 bg-slate-900/50 relative z-20">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 md:mb-16">
              <div className="flex flex-col items-center gap-4 mb-6 md:mb-8 animate-fade-in">
                <div className="bg-slate-900 p-3 rounded-2xl border border-white/10 shadow-xl shadow-amber-500/5 cursor-pointer hover:scale-110 transition-transform">
                  <Logo 
                    size={48} 
                    onClick={onToggleChat} 
                    onDoubleAction={onToggleVoice} 
                    isLive={isVoiceActive} 
                  />
                </div>
                <div className="flex flex-col items-center leading-none">
                  <h3 className="text-3xl md:text-4xl font-normal tracking-tighter lowercase text-white">arm</h3>
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-light text-slate-500 pl-[0.5em]">COFFEE</p>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Financial Projections</h2>
              <p className="text-slate-400 text-sm md:text-base">See exactly how your investment grows with our asset-lease model.</p>
           </div>
           <ROICalculator />
        </div>
      </section>

      {/* Franchise Structure */}
      <section className="py-20 md:py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 uppercase">Franchise Entry Tier</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <PricingItem title="Total Invest" val="AED 75k" />
            <PricingItem title="Contract" val="5 Years" />
            <PricingItem title="Income" val="AED 6,000" />
            <PricingItem title="Support" val="2 EIDs" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 md:pt-24 pb-12 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-slate-900 p-2 rounded-2xl border border-white/10 shadow-lg shadow-amber-500/5 cursor-pointer">
                  <Logo 
                    size={40} 
                    onClick={onToggleChat} 
                    onDoubleAction={onToggleVoice} 
                    isLive={isVoiceActive} 
                  />
                </div>
                <div className="flex flex-col items-center leading-none">
                  <h2 className="text-3xl md:text-4xl font-normal tracking-tighter lowercase text-white">arm</h2>
                  <p className="text-[10px] uppercase tracking-[0.5em] font-light text-slate-500 pl-[0.5em]">COFFEE</p>
                </div>
              </div>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-sm mb-8">
                The world's first fully autonomous AI-powered coffee franchise. 
                Scaling premium hospitality through cutting-edge robotics.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<Linkedin size={18} />} label="LinkedIn" />
                <SocialIcon icon={<Twitter size={18} />} label="Twitter" />
                <SocialIcon icon={<Instagram size={18} />} label="Instagram" />
                <SocialIcon icon={<Facebook size={18} />} label="Facebook" />
              </div>
            </div>

            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4">
                <FooterLink label="Franchise Model" />
                <FooterLink label="ROI Calculator" />
                <FooterLink label="Kiosk Locations" />
                <FooterLink label="IoT Monitoring" />
                <FooterLink label="Maintenance AI" />
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4">
                <FooterLink label="Documentation" />
                <FooterLink label="Partner Portal" />
                <FooterLink label="Media Kit" />
                <FooterLink label="Investment Guide" />
                <FooterLink label="Privacy Center" />
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
              <p className="text-slate-500 text-sm mb-4">Join our newsletter for the latest in robotic retail.</p>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 px-4 bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
              <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
                <Mail size={12} />
                <span>hq@armcoffee.ai</span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <span className="text-slate-600 text-[10px] md:text-sm text-center md:text-left">© 2024 arm COFFEE AI. All rights reserved. Registered in UAE.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-sm text-slate-500 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Compliance</a>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Status: Nominal
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="glass-panel p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] hover:border-amber-500/50 transition-all duration-500 group relative">
    <div className="mb-6 md:mb-8 p-4 md:p-5 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 group-hover:bg-amber-500/10">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm md:text-lg">{desc}</p>
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
       <ChevronRight className="text-amber-500" />
    </div>
  </div>
);

const PricingItem = ({ title, val }: { title: string, val: string }) => (
  <div className="p-6 md:p-10 border border-white/5 rounded-2xl md:rounded-3xl bg-white/5 hover:bg-white/[0.07] transition-all flex flex-col justify-center text-center">
    <p className="text-slate-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">{title}</p>
    <p className="text-xl md:text-3xl font-black text-amber-500 tracking-tight leading-tight">{val}</p>
  </div>
);

const SocialIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button 
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </button>
);

const FooterLink = ({ label }: { label: string }) => (
  <li>
    <a href="#" className="text-slate-500 hover:text-amber-500 transition-colors duration-200 text-sm font-medium inline-flex items-center group">
      {label}
      <ChevronRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all" />
    </a>
  </li>
);

export default LandingPage;