import React, { useState } from 'react';
import { motion } from 'framer-motion';

const environments = [
  { id: 'airports', label: 'Airports', image: '/images/env-airports.png' },
  { id: 'hospitals', label: 'Hospitals', image: '/images/env-hospitals.png' },
  { id: 'universities', label: 'Universities', image: '/images/env-universities.png' },
  { id: 'malls', label: 'Malls', image: '/images/env-malls.png' },
  { id: 'corporate', label: 'Corporate HQs', image: '/images/env-corporate.png' },
  { id: 'hotels', label: 'Hotels', image: '/images/env-hotels.png' }
];

export default function Contact() {
  return (
    <div className="pt-20">
      <Deployment />
      <ContactForm />
    </div>
  );
}

function Deployment() {
  const [selectedEnv, setSelectedEnv] = useState('airports');

  return (
    <section className="py-24 px-6 border-b border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Select Your Environment</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          Choose the environment that best matches your deployment needs to help us tailor your demo.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {environments.map((env) => (
            <EnvironmentButton 
              key={env.id}
              label={env.label}
              image={env.image}
              isSelected={selectedEnv === env.id}
              onClick={() => setSelectedEnv(env.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnvironmentButton({ label, image, isSelected, onClick }: { label: string, image: string, isSelected: boolean, onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all duration-300"
      style={{
        borderColor: isSelected ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? '0 0 25px rgba(245, 158, 11, 0.4)' : 'none'
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        animate={{ scale: isSelected ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-left">
        <h3 className="font-bold text-white text-sm md:text-base leading-tight">{label}</h3>
      </div>
      {isSelected && (
        <motion.div 
          layoutId="selected-indicator"
          className="absolute top-3 right-3 w-5 h-5 bg-amber-500 rounded-full border-2 border-[#0a0a0a]"
        />
      )}
    </motion.button>
  );
}

function ContactForm() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white tracking-tight uppercase">Book Your Demo</h2>
        <p className="text-slate-500 text-lg">
          Our consultant team will get in touch with you within 48 hours.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <input type="text" placeholder="Name *" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors" />
            <input type="email" placeholder="E-mail *" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors" />
            <input type="text" placeholder="Phone *" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors" />
            <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-slate-500 focus:outline-none focus:border-amber-500 transition-colors appearance-none">
              <option>Planned Operation Units *</option>
              <option>1 Unit</option>
              <option>2-5 Units</option>
              <option>5+ Units</option>
            </select>
            <textarea placeholder="Message *" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"></textarea>
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-full text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all mt-4">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
