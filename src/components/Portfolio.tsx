import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Coffee, Settings, Zap, MapPin, Award, Smartphone, Star, BarChart3, TrendingUp, ChevronDown } from 'lucide-react';

// Simplified SVG Chart to avoid Recharts dependency issues
const SimpleProfitChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  
  const maxVal = Math.max(...data.map(d => d.profit));
  const minVal = Math.min(...data.map(d => d.profit)); // likely negative
  const range = maxVal - minVal;
  
  // Normalize points for SVG path
  // Width: 100%, Height: 100% (viewBox 0 0 100 50)
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    // Invert Y because SVG 0 is top. Map profit to 0-50 range.
    // higher profit = lower Y value.
    // If profit = max, y = 10 (padding). If profit = min, y = 50.
    const normalizedProfit = (d.profit - minVal) / range; // 0 to 1
    const y = 50 - (normalizedProfit * 40) - 5; // Use 40 height, 5 padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill Area */}
        <path 
          d={`M0,50 L0,${50 - ((data[0].profit - minVal)/range * 40) - 5} ${points.replace(/,/g, ' ')} L100,50 Z`} 
          fill="url(#chartGradient)" 
        />
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke="#f59e0b" 
          strokeWidth="1" 
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Zero Line (Break Even) approx */}
      <div className="absolute left-0 right-0 border-t border-white/20 border-dashed" style={{ bottom: `${((0 - minVal)/range) * 80 + 10}%` }}></div>
    </div>
  );
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation (Floating) */}
      <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-4 flex items-center gap-8 shadow-2xl">
          <span className="font-bold text-xl tracking-tighter">arm<span className="text-amber-500">COFFEE</span></span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('models')} className="hover:text-white transition-colors">Models</button>
            <button onClick={() => scrollTo('software')} className="hover:text-white transition-colors">Software</button>
            <button onClick={() => scrollTo('roi')} className="hover:text-white transition-colors">ROI</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
          <button onClick={() => scrollTo('contact')} className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            Book Demo
          </button>
        </div>
      </nav>

      <Hero scrollTo={scrollTo} />
      <Spotlight />
      <div id="models"><RobotSeries /></div>
      <div id="software"><SoftwareOverview /></div>
      <div id="roi"><CalculatorSection /></div>
      <div id="deployment"><Deployment /></div>
      <div id="contact"><Footer /></div>

    </div>
  );
}

function Hero({ scrollTo }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-bold tracking-widest uppercase backdrop-blur-sm">
            The Future of Brewing
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-2xl">
            Automated<br />Perfection.
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Turnkey robotic coffee systems. <span className="text-white">Zero labor. Infinite consistency.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row justify-center gap-6"
        >
          <button onClick={() => scrollTo('models')} className="group relative bg-amber-500 text-white font-bold py-5 px-10 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              View Models <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="bg-white/5 backdrop-blur-md text-white font-bold py-5 px-10 rounded-full border border-white/10 transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105">
            Download Catalogue
          </button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-12 hidden lg:block"
      >
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-400">Daily Output</div>
            <div className="text-xl font-bold">1,200+ Cups</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}

function Spotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0f0f0f] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          style={{
            transform: isInView ? "none" : "translateX(-50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Flagship Model</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white tracking-tight">arm C1 PRO</h2>
          <p className="text-slate-400 text-xl leading-relaxed mb-10 border-l-4 border-white/10 pl-6">
            The C1 Pro isn't just a machine; it's a performance. With <strong className="text-white">dual-arm precision</strong> and AI-driven calibration, it replicates the nuance of a master barista, 24/7.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { label: "Variations", value: "200+" },
              { label: "Operation", value: "24/7" },
              { label: "Speed", value: "50s" },
              { label: "Footprint", value: "2.5m²" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-default group">
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{stat.value}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{
            transform: isInView ? "none" : "scale(0.8)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="relative aspect-square bg-[#1a1a1a] rounded-[3rem] border border-white/10 flex items-center justify-center p-12 overflow-hidden shadow-2xl group hover:border-amber-500/50 transition-colors duration-500">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750069-bef72f3707a9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
             <Settings className="w-64 h-64 text-white/80 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-slow-spin" />
             
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                  <div className="text-xs text-slate-400 font-medium">System Status</div>
                  <div className="text-green-400 flex items-center gap-2 text-sm font-bold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" /> Online
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RobotSeries() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6">The Series</h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">Scalable automation for every environment.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <ProductCard 
          title="arm C1" 
          tag="Vending" 
          price="10k AED" 
          desc="Compact, efficient, and reliable. The perfect entry point for office lobbies."
          icon={<Coffee className="w-12 h-12" />}
        />
        <ProductCard 
          title="arm C1 PRO" 
          tag="Flagship" 
          price="75k AED" 
          desc="Dual-arm theatrics with maximum capacity. The crowd puller for malls."
          icon={<Settings className="w-12 h-12" />}
          featured={true}
        />
        <ProductCard 
          title="arm B1" 
          tag="Bartender" 
          price="Waitlist" 
          desc="Precision cocktail mixing for high-volume nightlife and events."
          icon={<Zap className="w-12 h-12" />}
        />
      </div>
    </section>
  );
}

function ProductCard({ title, tag, price, desc, icon, featured = false }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2rem] border ${featured ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.1)]' : 'bg-[#121212] border-white/5'} flex flex-col h-full group overflow-hidden transition-all duration-300 hover:shadow-2xl`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-bl-2xl z-10 shadow-lg">
          BEST SELLER
        </div>
      )}
      
      <div className={`h-48 rounded-2xl mb-8 flex items-center justify-center border transition-colors ${featured ? 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20' : 'bg-white/5 border-white/10 group-hover:bg-white/10'}`}>
        <div className={`transition-all duration-500 ${featured ? 'text-amber-500 group-hover:scale-110' : 'text-slate-400 group-hover:text-white group-hover:scale-110'}`}>{icon}</div>
      </div>

      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <p className={`text-xs font-bold tracking-widest mb-4 uppercase ${featured ? 'text-amber-500' : 'text-slate-500'}`}>{tag}</p>
      <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{desc}</p>
      
      <div className={`pt-6 border-t ${featured ? 'border-amber-500/20' : 'border-white/10'}`}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-white mb-1">{price}</p>
            <p className="text-slate-500 text-sm">Base Investment</p>
          </div>
          <button className={`p-3 rounded-full transition-colors ${featured ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SoftwareOverview() {
  return (
    <section className="py-32 px-6 bg-[#0f0f0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative z-10 order-2 md:order-1">
          <h2 className="text-5xl font-bold mb-8">Not just a robot.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">A digital ecosystem.</span></h2>
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

function FeatureRow({ icon, title, desc }) {
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

function CalculatorSection() {
  const [dailyOrders, setDailyOrders] = useState(120);
  const [avgTicket, setAvgTicket] = useState(18);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [];
    const monthlySales = dailyOrders * avgTicket * 30;
    const monthlyProfit = monthlySales * 0.45; // 45% margin
    let cumulative = -85000; // Initial Investment (approx)

    for (let i = 1; i <= 12; i++) {
      cumulative += monthlyProfit;
      newData.push({
        name: `Month ${i}`,
        profit: cumulative
      });
    }
    setData(newData);
  }, [dailyOrders, avgTicket]);

  const monthlySales = dailyOrders * avgTicket * 30;
  const annualProfit = monthlySales * 12 * 0.45;

  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Profit Simulator</h2>
          <p className="text-slate-400 text-lg">Visualize your return on investment.</p>
        </div>

        <div className="bg-[#111] rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            {/* Inputs */}
            <div className="space-y-12">
              <CalculatorSlider 
                label="Daily Cups Sold" 
                value={dailyOrders} 
                max={500} 
                onChange={setDailyOrders} 
                suffix=" cups" 
              />
              <CalculatorSlider 
                label="Average Ticket" 
                value={avgTicket} 
                max={50} 
                onChange={setAvgTicket} 
                suffix=" AED" 
              />
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-slate-500 text-xs uppercase mb-1">Monthly Revenue</div>
                    <div className="text-2xl font-bold text-white">{monthlySales.toLocaleString()} AED</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-slate-500 text-xs uppercase mb-1">Break-Even</div>
                    <div className="text-2xl font-bold text-green-400">~{Math.ceil(85000 / (monthlySales * 0.45))} Months</div>
                 </div>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-amber-500 w-5 h-5" />
                  <span className="text-sm font-bold text-white">Efficiency Bonus</span>
                </div>
                <p className="text-xs text-slate-400">Robots don't take breaks. You save approx. <span className="text-white font-bold">120 hours</span> of labor per month compared to human staff.</p>
              </div>
            </div>

            {/* Chart Output */}
            <div className="flex flex-col h-full min-h-[400px] bg-black/50 rounded-3xl p-6 border border-white/10">
               <div className="mb-6 flex justify-between items-end">
                  <span className="text-slate-400 text-sm font-bold uppercase">Projected Net Profit (Cumulative)</span>
                  <span className="text-3xl font-bold text-amber-500">{Math.round(data[11]?.profit || 0).toLocaleString()} AED</span>
               </div>
               <div className="flex-grow">
                  {/* Replaced recharts with simpler SVG component */}
                  <SimpleProfitChart data={data} />
               </div>
               <div className="mt-4 text-center text-xs text-slate-500">12 Month Projection (excluding detailed overheads)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorSlider({ label, value, max, onChange, suffix }) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <label className="text-lg font-medium text-slate-300">{label}</label>
        <span className="text-2xl font-bold text-white">{value}{suffix}</span>
      </div>
      <div className="relative h-2 bg-slate-800 rounded-full group">
        <div 
          className="absolute top-0 left-0 h-full bg-amber-500 rounded-full transition-all duration-100" 
          style={{ width: `${(value / max) * 100}%` }}
        />
        <input 
          type="range" 
          min="1" 
          max={max} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg pointer-events-none transition-all duration-100 group-hover:scale-125"
          style={{ left: `${(value / max) * 100}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  );
}

function Deployment() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Deploy Anywhere</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Airports', 'Hospitals', 'Universities', 'Malls', 'Corporate HQs', 'Hotels'].map((loc) => (
            <div key={loc} className="px-8 py-4 bg-white/5 rounded-full border border-white/10 text-slate-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all cursor-default text-lg font-medium hover:scale-105">
              {loc}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-6 bg-[#050505] border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white">Ready to deploy the future?</h2>
        <p className="text-slate-400 text-xl mb-12">Join the revolution of automated retail and serve perfection in every cup.</p>
        <button className="bg-white text-black font-bold py-4 px-12 rounded-full text-lg hover:bg-slate-200 transition-colors hover:scale-105 transform duration-200">
          Contact Sales Team
        </button>
        <div className="mt-20 text-slate-600 text-sm">
          &copy; 2026 arm COFFEE GROUP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
