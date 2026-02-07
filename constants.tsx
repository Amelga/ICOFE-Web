
import React from 'react';
import { 
  Coffee, LayoutDashboard, Settings, UserPlus, 
  TrendingUp, Activity, Wrench, FileText, PieChart, Users, MapPin, BarChart3 
} from 'lucide-react';

export const NAVIGATION_ITEMS = {
  PUBLIC: [
    { label: 'Register', path: 'register', icon: <UserPlus size={20} /> },
    { label: 'ROI Calculator', path: 'roi', icon: <TrendingUp size={20} /> },
  ],
  FRANCHISEE: [
    { label: 'Dashboard', path: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Kiosks', path: 'kiosks', icon: <Coffee size={20} /> },
    { label: 'Statements', path: 'statements', icon: <FileText size={20} /> },
  ],
  ADMIN: [
    { label: 'Management', path: 'management', icon: <Settings size={20} /> },
    { label: 'Global Analytics', path: 'analytics', icon: <PieChart size={20} /> },
  ],
  OPERATIONS: [
    { label: 'IoT Monitoring', path: 'iot', icon: <Activity size={20} /> },
    { label: 'Service Tickets', path: 'service', icon: <Wrench size={20} /> },
  ],
  AFFILIATE: [
    { label: 'Program Stats', path: 'affiliate-dashboard', icon: <Users size={20} /> },
    { label: 'Referrals', path: 'referrals', icon: <UserPlus size={20} /> },
    { label: 'Earnings', path: 'earnings', icon: <TrendingUp size={20} /> },
  ],
  SUPERVISOR: [
    { label: 'Realtime Analytics', path: 'analytics', icon: <BarChart3 size={20} /> },
    { label: 'Project Locations', path: 'locations', icon: <MapPin size={20} /> },
    { label: 'Inventory Management', path: 'inventory', icon: <Activity size={20} /> },
  ]
};

export const THEME_COLORS = {
  primary: '#F59E0B', // Amber 500
  secondary: '#334155', // Slate 700
  background: '#0f172a', // Slate 900
  card: '#1e293b' // Slate 800
};