import React from 'react';
import { LogOut, ChevronLeft } from 'lucide-react';
import { UserRole } from '../types';
import { NAVIGATION_ITEMS } from '../constants';
import Logo from './Logo';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRoleChange: (role: UserRole) => void;
  isVisible: boolean;
  onToggle: () => void;
  onToggleChat: () => void;
  onToggleVoice: () => void;
  isVoiceActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onRoleChange, isVisible, onToggle, onToggleChat, onToggleVoice, isVoiceActive }) => {
  const items = role === UserRole.PUBLIC ? NAVIGATION_ITEMS.PUBLIC : 
                role === UserRole.FRANCHISEE ? NAVIGATION_ITEMS.FRANCHISEE :
                role === UserRole.ADMIN ? NAVIGATION_ITEMS.ADMIN : 
                role === UserRole.AFFILIATE ? NAVIGATION_ITEMS.AFFILIATE :
                role === UserRole.SUPERVISOR ? NAVIGATION_ITEMS.SUPERVISOR :
                NAVIGATION_ITEMS.OPERATIONS;

  return (
    <div 
      className={`fixed left-0 top-0 h-screen glass-panel flex flex-col z-50 transition-all duration-300 ease-in-out border-r border-white/10 ${
        isVisible ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      {/* Brand Header with Hide Toggle */}
      <div className="p-6 flex items-center justify-between border-b border-white/10 w-full group">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-1 rounded-xl shrink-0 border border-white/10 hover:scale-105 transition-transform group/logo">
            <Logo 
              size={36} 
              onClick={onToggleChat} 
              onDoubleAction={onToggleVoice} 
              isLive={isVoiceActive} 
            />
          </div>
          <div className="flex flex-col items-center leading-none overflow-hidden select-none">
            <h1 className="text-3xl font-normal lowercase tracking-tighter text-white">arm</h1>
            <p className="text-[9px] uppercase tracking-[0.4em] font-light text-slate-400 pl-[0.4em]">COFFEE</p>
          </div>
        </div>
        
        <button 
          onClick={onToggle}
          className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-amber-500 transition-all active:scale-90"
          title="Hide Sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => setActiveTab(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.path 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="shrink-0">{item.icon}</div>
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <p className="text-[10px] text-slate-500 uppercase px-4 mb-2 whitespace-nowrap">Switch Views (Demo)</p>
        <select 
          value={role} 
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full bg-slate-800 text-sm border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        
        <button 
          onClick={() => onRoleChange(UserRole.PUBLIC)}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white transition-colors"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="font-medium whitespace-nowrap">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;