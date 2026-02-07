import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function FloatingLogo() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);

  return (
    <motion.div
      style={{ scale, opacity }}
      initial={{ x: -120 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="fixed top-5 left-5 z-50"
    >
      <div className="bg-black/50 backdrop-blur-lg p-3 rounded-xl border border-white/10 shadow-2xl">
        <img src="/images/logo-white.png" alt="ICOFE" className="w-40 md:w-48" />
      </div>
    </motion.div>
  );
}

function BackToHomeArrow() {
  const location = useLocation();
  const showArrow = location.pathname !== '/';

  return (
    <AnimatePresence>
      {showArrow && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-5 right-5 z-[55]"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="group bg-green-900/50 backdrop-blur-lg p-3 rounded-full border border-green-400/30 shadow-2xl flex items-center justify-center text-green-400 hover:border-green-400/60 transition-colors"
            >
              <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default function Layout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      <FloatingLogo />
      <BackToHomeArrow />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
