import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Settings, Zap, ArrowRight, Building, Users, Clock } from 'lucide-react';

const models = [
  {
    id: 'c1',
    name: 'arm C1',
    isBudget: true,
    tag: 'Advanced Model',
    description: 'Compact, efficient, and reliable. The perfect entry point for Bars, Clubs, Hotels, Events',
    price: '85,000 AED',
    image: '/images/C2.png',
    capacity: '800+ Cups/Day',
    environments: 'Offices, Lobbies, Transport Hubs',
    highlights: 'High-throughput, full automation.',
    featured: false,
  },
  {
    id: 'c1-pro',
    name: 'arm C1 PRO',
    tag: 'Flagship / Best Seller',
    description: 'Dual-arm theatrics with maximum capacity. The crowd puller for malls.',
    price: '95,000 AED',
    image: '/images/C1-PRO.png',
    capacity: '1,200+ Cups/Day',
    environments: 'Malls, Airports, High-Traffic Venues',
    highlights: 'Peak performance and visual appeal.',
    featured: true,
  },
  {
    id: 'b1-pro',
    name: 'arm B1',
    tag: 'Entry Model',
    description: 'Simple, sufficient, and durable. The perfect entry point for gas and train stations. Offices, Lobbies, Transport Hubs',
    price: '75,000 AED',
    image: '/images/C3.png',
    capacity: '600+ Cups/Day',
    environments: 'Bars, Clubs, Hotels, Events',
    highlights: 'Perfect consistency, zero waste.',
    featured: false,
  }
];

export default function Products() {
  return (
    <div className="pt-32">
      <RobotSeries />
    </div>
  );
}

function RobotSeries() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
          The Lineup
        </div>
        <h2 className="text-5xl font-bold mb-6 text-white">The Series</h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">Scalable automation for every environment.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {models.map(model => <ProductCard key={model.id} model={model} />)}
      </div>
    </section>
  );
}

function ProductCard({ model }: { model: typeof models[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-[2rem] border ${model.featured ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.1)]' : 'bg-[#121212] border-white/5'} flex flex-col group transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="h-[450px] overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div
            key="summary"
            animate={{ y: isExpanded ? '-100%' : '0%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full flex flex-col"
          >
            {model.featured && (
              <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-bl-2xl z-10 shadow-lg">
                BEST SELLER
              </div>
            )}
            
            <div className="h-64 rounded-2xl mb-8 flex items-center justify-center border overflow-hidden bg-white/5 border-white/10">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={model.image} 
                alt={model.name} 
                className="w-full h-full object-contain p-4" 
              />
            </div>

            <h3 className="text-3xl font-bold mb-2 text-white">{model.name}</h3>
            <p className={`text-xs font-bold tracking-widest mb-4 uppercase ${model.featured ? 'text-amber-500' : 'text-slate-500'}`}>{model.tag}</p>
            <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{model.description}</p>
          </motion.div>

          {isExpanded && (
            <motion.div
              key="details"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 h-full flex flex-col bg-[#151515] p-8 rounded-2xl"
            >
              <h4 className="text-2xl font-bold text-white mb-6">Operational Details</h4>
              <div className="space-y-5 text-slate-300">
                <DetailItem icon={Clock} label="Est. Daily Capacity" value={model.capacity} />
                <DetailItem icon={Building} label="Ideal Environments" value={model.environments} />
                <DetailItem icon={Zap} label="Operational Highlights" value={model.highlights} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`pt-6 border-t ${model.featured ? 'border-amber-500/20' : 'border-white/10'}`}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-white mb-1">{model.price}</p>
            <p className="text-slate-500 text-sm">Base Investment</p>
          </div>
          <motion.button 
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full transition-colors z-10 ${model.featured ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 flex-shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-500" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
