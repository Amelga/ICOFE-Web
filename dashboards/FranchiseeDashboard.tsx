import React, { useRef } from 'react';
import { 
  Coffee, DollarSign, Award, 
  TriangleAlert, Layers
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import DashboardHeader from '../components/DashboardHeader';
import AIInsights from '../components/AIInsights';
import { UserRole } from '../types';

interface Props {
  isSidebarVisible?: boolean;
  onRoleChange: (role: UserRole) => void;
  onToggleChat: () => void;
  onToggleVoice: () => void;
  isVoiceActive: boolean;
}

const salesData = [
  { name: 'Mon', sales: 420 },
  { name: 'Tue', sales: 380 },
  { name: 'Wed', sales: 510 },
  { name: 'Thu', sales: 490 },
  { name: 'Fri', sales: 650 },
  { name: 'Sat', sales: 780 },
  { name: 'Sun', sales: 720 },
];

const FranchiseeDashboard: React.FC<Props> = ({ isSidebarVisible, onRoleChange, onToggleChat, onToggleVoice, isVoiceActive }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <DashboardHeader 
        title="Owner's Dashboard" 
        role={UserRole.FRANCHISEE}
        onRoleChange={onRoleChange} 
        onToggleChat={onToggleChat} 
        onToggleVoice={onToggleVoice}
        isVoiceActive={isVoiceActive}
      />
      
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-auto scroll-smooth relative select-none touch-pan-x"
      >
        <div className="p-8 min-w-[1200px] md:min-w-0 transition-all duration-500">
          
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard 
              label="Total Revenue (Monthly)" 
              value="AED 48,250" 
              trend={12} 
              icon={<DollarSign size={24} />} 
            />
            <StatCard 
              label="Cups Sold Today" 
              value="142" 
              trend={5.4} 
              icon={<Coffee size={24} />} 
            />
            <StatCard 
              label="Active Kiosks" 
              value="2 / 10" 
              icon={<Layers size={24} />} 
            />
            <StatCard 
              label="Referral Bonus" 
              value="AED 7,500" 
              trend={100} 
              icon={<Award size={24} />} 
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Sales Performance</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-amber-500 text-slate-900 rounded-lg text-xs font-bold">Weekly</button>
                  <button className="px-3 py-1 bg-white/5 text-slate-400 rounded-lg text-xs font-bold hover:text-white">Monthly</button>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#F59E0B' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-8">
              <AIInsights />

              <div className="glass-panel p-6 rounded-2xl">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Expansion Tracker</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-white">Free Kiosk Progress</span>
                       <span className="text-amber-500">2 / 9 Purchased</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2">
                       <div className="bg-amber-500 h-2 rounded-full w-[22%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Purchase 7 more kiosks to unlock your **1 FREE** automated station.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-8 glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold">My Kiosks Status</h3>
              <button className="text-xs text-amber-500 hover:underline">View All Tickets</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr className="text-left text-xs uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">ID / Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Beans</th>
                    <th className="px-6 py-4">Milk</th>
                    <th className="px-6 py-4">Water</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <KioskRow id="RC-DXB-001" loc="Dubai Mall, L2" status="active" b={85} m={42} w={90} />
                  <KioskRow id="RC-DXB-002" loc="MOE, Gate 4" status="active" b={12} m={15} w={10} alert />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const KioskRow = ({ id, loc, status, b, m, w, alert }: any) => (
  <tr className="hover:bg-white/5 transition-colors">
    <td className="px-6 py-4">
      <p className="text-sm font-bold text-white">{id}</p>
      <p className="text-xs text-slate-500">{loc}</p>
    </td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4">
      <ResourceMeter val={b} />
    </td>
    <td className="px-6 py-4">
      <ResourceMeter val={m} />
    </td>
    <td className="px-6 py-4">
      <ResourceMeter val={w} />
    </td>
    <td className="px-6 py-4">
      {alert && <div className="p-2 bg-rose-500/20 text-rose-500 rounded-lg animate-pulse inline-block cursor-pointer"><TriangleAlert size={16} /></div>}
      <button className="ml-2 text-xs text-slate-400 hover:text-white transition-colors">Details</button>
    </td>
  </tr>
);

const ResourceMeter = ({ val }: { val: number }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${val < 20 ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${val}%` }}></div>
    </div>
    <span className="text-[10px] font-bold text-slate-400">{val}%</span>
  </div>
);

export default FranchiseeDashboard;