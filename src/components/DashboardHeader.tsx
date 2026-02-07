import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, ChevronRight, UserCircle, Users, BarChart3, LogIn, Sparkles, LogOut, Settings } from 'lucide-react';
import { UserRole } from '../types';
import Logo from './Logo';

interface Props {
  title: string;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onToggleChat: () => void;
  onToggleVoice: () => void;
  isVoiceActive: boolean;
  transparent?: boolean;
}

const DashboardHeader: React.FC<Props> = ({ title, role, onRoleChange, onToggleChat, onToggleVoice, isVoiceActive, transparent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (newRole: UserRole) => {
    onRoleChange(newRole);
    setIsMenuOpen(false);
  };

  const isPublic = role === UserRole.PUBLIC;

  return (
    <header className={`flex items-center justify-between p-6 md:p-8 border-b border-white/5 sticky top-0 z-[100] transition-all duration-300 ${transparent ? 'bg-slate-950/40 backdrop-blur-xl' : 'bg-slate-900/50 backdrop-blur-md'}`}>
      <div className="flex items-center gap-4">
        <div className="bg-slate-900/50 p-1.5 rounded-xl border border-white/10 hover:scale-105 transition-transform group/logo shadow-xl">
          <Logo 
            size={36} 
            onClick={onToggleChat} 
            onDoubleAction={onToggleVoice} 
            isLive={isVoiceActive} 
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none mb-1">{title}</h2>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {isPublic ? 'Explorer Mode' : 'Franchise Command Center'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search ecosystem..." 
            className="bg-slate-950/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 w-48 xl:w-64 transition-all"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors hidden sm:block">
          <Bell size={18} className="text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border border-slate-900 animate-pulse"></span>
        </button>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 pl-4 md:pl-6 border-l border-white/10 group transition-all active:scale-95"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                {isPublic ? 'Guest Access' : 'A. Al-Mansoori'}
              </p>
              <p className="text-[10px] text-amber-500/80 font-black uppercase tracking-widest">
                {isPublic ? 'Restricted' : role}
              </p>
            </div>
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-slate-900 font-black text-sm shadow-lg transition-all ${isPublic ? 'bg-slate-700 text-slate-400 grayscale' : 'bg-gradient-to-tr from-amber-500 to-amber-300 group-hover:shadow-amber-500/40'}`}>
              {isPublic ? '?' : 'AA'}
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-72 glass-panel border border-amber-500/20 rounded-[2rem] shadow-2xl py-6 px-4 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl z-50 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"></div>
              
              <div className="mb-6 px-2">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Sparkles size={16} />
                  <h3 className="text-lg font-black tracking-tight uppercase">User Terminal</h3>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Select your operational level.</p>
              </div>

              <div className="space-y-1">
                <MenuOption 
                  icon={<UserCircle size={18} />} 
                  label="Franchisee Portal" 
                  sub="Investor Oversight"
                  active={role === UserRole.FRANCHISEE}
                  onClick={() => handleRoleSelect(UserRole.FRANCHISEE)} 
                />
                <MenuOption 
                  icon={<Users size={18} />} 
                  label="Affiliate Hub" 
                  sub="Growth & Referrals"
                  active={role === UserRole.AFFILIATE}
                  onClick={() => handleRoleSelect(UserRole.AFFILIATE)} 
                />
                <MenuOption 
                  icon={<BarChart3 size={18} />} 
                  label="Supervisor" 
                  sub="Network Operations"
                  active={role === UserRole.SUPERVISOR}
                  onClick={() => handleRoleSelect(UserRole.SUPERVISOR)} 
                />
                <MenuOption 
                  icon={<Settings size={18} />} 
                  label="System Admin" 
                  sub="Root Access"
                  active={role === UserRole.ADMIN}
                  onClick={() => handleRoleSelect(UserRole.ADMIN)} 
                />
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {isPublic ? (
                  <button 
                    onClick={() => handleRoleSelect(UserRole.FRANCHISEE)}
                    className="w-full bg-amber-500 text-slate-950 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <LogIn size={16} />
                    Secure Login
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRoleSelect(UserRole.PUBLIC)}
                    className="w-full bg-white/5 border border-white/10 text-slate-400 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <LogOut size={16} />
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const MenuOption = ({ icon, label, sub, onClick, active }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all text-left group ${active ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-white/5'}`}
  >
    <div className={`p-2.5 rounded-xl transition-all ${active ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-500 group-hover:text-amber-500 group-hover:bg-amber-500/10'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-bold truncate transition-colors ${active ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{label}</p>
      <p className={`text-[10px] font-black uppercase tracking-widest truncate transition-colors ${active ? 'text-amber-500' : 'text-slate-500 group-hover:text-amber-500/70'}`}>{sub}</p>
    </div>
    <ChevronRight size={14} className={`transition-all ${active ? 'text-amber-500' : 'text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1'}`} />
  </button>
);

export default DashboardHeader;