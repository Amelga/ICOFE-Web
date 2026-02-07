import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Award, BarChart3, Coffee, Star, Settings } from 'lucide-react';

export default function Software() {
  return (
    <div className="pt-20">
      <SoftwareOverview />
    </div>
  );
}

function SoftwareOverview() {
  return (
    <section className="py-32 px-6 bg-[#0f0f0f] relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative z-10 order-2 md:order-1">
          <div className="inline-block mb-6 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
            Digital Ecosystem
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">Not just a robot.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">It's a platform.</span></h2>
          <div className="space-y-8">
            <FeatureRow icon={<Smartphone />} title="Native Mobile Apps" desc="White-label iOS & Android apps tailored to your brand. Ordering, payments, and customization." />
            <FeatureRow icon={<Award />} title="Loyalty Engine" desc="Built-in rewards, points, and gamification to drive retention. Keep them coming back." />
            <FeatureRow icon={<BarChart3 />} title="Cloud Analytics" desc="Real-time sales data, inventory tracking, and predictive maintenance from any device." />
          </div>
        </div>

        {/* Floating App UI */}
        <div className="relative flex justify-center order-1 md:order-2">
          <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full" />
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-80 bg-black border-[8px] border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
          >
            {/* Fake App Header */}
            <div className="bg-white p-6 pt-12 pb-4 h-full">
               <div className="flex justify-between items-center mb-6">
                  <div className="font-bold text-slate-900 text-lg">Good Morning, Alex</div>
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />
               </div>
               <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-2xl shadow-lg mb-6">
                  <div className="text-xs font-medium opacity-80 mb-1">Loyalty Balance</div>
                  <div className="text-3xl font-bold">450 <span className="text-sm font-normal opacity-70">pts</span></div>
               </div>
               <div className="text-slate-900 font-bold mb-4">Popular</div>
               <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                       <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                       <div>
                          <div className="font-bold text-slate-800 text-sm">Caramel Latte</div>
                          <div className="text-xs text-slate-500">18 AED</div>
                       </div>
                    </div>
                  ))}
               </div>
               {/* Bottom Nav */}
               <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 flex justify-around text-slate-300">
                  <div className="text-amber-500"><Coffee size={24} /></div>
                  <div className="hover:text-slate-800 transition-colors"><Star size={24} /></div>
                  <div className="hover:text-slate-800 transition-colors"><Settings size={24} /></div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 flex-shrink-0 shadow-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
