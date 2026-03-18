import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl group">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-x-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        style={{ 
          backgroundImage: 'url(/background.png)',
          y: y1
        }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Glitch lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-neon-blue animate-pulse" />
        <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-neon-orange animate-pulse" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Alert badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full text-[10px] font-mono tracking-[0.2em] glass"
          style={{
            border: '1px solid rgba(255, 107, 0, 0.4)',
            color: '#ff6b00',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          SYSTEM_STATUS: ACTIVE · NO_THREAT_DETECTED
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <span className="block text-white text-5xl md:text-7xl lg:text-8xl mb-2">NatureForce</span>
          <span className="block text-glow-blue" style={{ color: '#00d4ff' }}>SAR</span>
          <span className="block text-slate-500 text-base md:text-xl font-mono mt-4 tracking-[0.3em] uppercase opacity-60">(Search And Rescue)</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-slate-400 font-mono tracking-widest mt-6 mb-12 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          &lt; When disaster strikes,{' '}
          <span style={{ color: '#ff6b00' }} className="font-bold">
            we respond.
          </span> &gt;
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => navigate('/lineup')}
          className="relative px-12 py-5 rounded-2xl font-display font-black text-xl tracking-widest overflow-hidden glass-strong group/btn"
          style={{
            border: '1px solid #00d4ff',
            color: '#00d4ff',
            boxShadow: '0 0 40px rgba(0,212,255,0.15)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,212,255,0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
             START DOSSIER <span className="text-xl">→</span>
          </span>
          <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </motion.div>
    </div>
  );
}
