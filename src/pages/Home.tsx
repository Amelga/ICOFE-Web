import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Coffee, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <Spotlight />
      <RobotSeriesPreview />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-moton.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Floating Brand Logo - MOVED TO LAYOUT.TSX
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-0 left-0"
        >
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
            <img src="/images/logo-white.png" alt="ICOFE" className="w-64 opacity-90 drop-shadow-2xl" />
          </div>
        </motion.div>
        */}

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
          <Link to="/products" className="group relative bg-amber-500 text-white font-bold py-5 px-10 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              View Models <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <button className="bg-white/5 backdrop-blur-md text-white font-bold py-5 px-10 rounded-full border border-white/10 transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105">
            Download Catalogue
          </button>
        </motion.div>
      </div>

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
             <img 
               src="/images/C1-PRO.png" 
               alt="arm C1 PRO" 
               className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-105" 
             />
             
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

function RobotSeriesPreview() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6 text-white">The Series</h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">Scalable automation for every environment.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <ProductCard 
          title="arm C1" 
          tag="Vending" 
          price="75,000 AED" 
          desc="Compact, efficient, and reliable."
          image="/images/C2.png"
        />
        <ProductCard 
          title="arm C1 PRO" 
          tag="Flagship" 
          price="85,000 AED" 
          desc="Dual-arm theatrics with maximum capacity."
          image="/images/C1-PRO.png"
          featured={true}
        />
        <ProductCard 
          title="arm B1" 
          tag="Bartender" 
          price="65,000 AED" 
          desc="Precision cocktail mixing."
          image="/images/C3.png"
        />
      </div>
    </section>
  );
}

function ProductCard({ title, tag, price, desc, image, featured = false }: { title: string, tag: string, price: string, desc: string, image: string, featured?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2rem] border ${featured ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.1)]' : 'bg-[#121212] border-white/5'} flex flex-col h-full group overflow-hidden transition-all duration-300 hover:shadow-2xl`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-bl-2xl z-10 shadow-lg">
          BEST SELLER
        </div>
      )}
      
      <div className={`h-64 rounded-2xl mb-8 flex items-center justify-center border overflow-hidden bg-white/5 border-white/10`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
        />
      </div>

      <h3 className="text-3xl font-bold mb-2 text-white">{title}</h3>
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
