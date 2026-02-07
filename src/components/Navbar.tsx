import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-3 flex items-center gap-8 shadow-2xl transition-all duration-300 hover:bg-black/70">
        {/* <Link to="/" className="flex items-center gap-3 group">
          <img src="/images/logo-white.png" alt="ICOFE Logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
             <span className="font-bold text-lg tracking-widest leading-none text-white">ICOFE</span>
             <span className="text-[0.6rem] tracking-[0.2em] text-amber-500 uppercase leading-none">Especialty Lab</span>
          </div>
        </Link> */}
        
        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5">
          <NavLink to="/products" active={isActive('/products')}>Models</NavLink>
          <NavLink to="/software" active={isActive('/software')}>Software</NavLink>
          <NavLink to="/roi" active={isActive('/roi')}>ROI</NavLink>
          <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
        </div>

        <Link to="/contact" className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          Book Demo
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }: { to: string, children: React.ReactNode, active: boolean }) {
  return (
    <Link 
      to={to} 
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-white/10 text-white shadow-inner' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
}
