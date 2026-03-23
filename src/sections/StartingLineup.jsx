import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '../context/LightboxContext';
import { animals } from '../data/squadData';

const statColors = {
  speed: '#00d4ff',
  detection: '#c084fc',
  strength: '#ff6b00',
  mobility: '#00ff88',
};

const statIcons = {
  speed: '⚡',
  detection: '👁️',
  strength: '💪',
  mobility: '🏃',
};

function StatBar({ label, value, color, index }) {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + (index * 0.1) }}
    >
      <span className="text-sm w-4">{statIcons[label]}</span>
      <span className="text-[10px] font-mono text-slate-500 w-16 uppercase">{label}</span>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "circOut", delay: 0.5 + (index * 0.1) }}
        />
      </div>
      <span className="text-[10px] font-mono w-8 text-right font-bold" style={{ color }}>
        {value}
      </span>
    </motion.div>
  );
}

export default function StartingLineup() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { showLightbox } = useLightbox();
  const animal = animals[current];

  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % animals.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + animals.length) % animals.length); };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 500 : -500, opacity: 0, scale: 0.8, rotate: dir > 0 ? 5 : -5 }),
    center: { x: 0, opacity: 1, scale: 1, rotate: 0 },
    exit: (dir) => ({ x: dir > 0 ? -500 : 500, opacity: 0, scale: 0.8, rotate: dir > 0 ? -5 : 5 }),
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 px-4">
      {/* Header */}
      <motion.div className="text-center mb-10">
        <p className="text-xs font-mono tracking-widest mb-2 text-neon-blue font-bold uppercase">SECTION 01 : LINEUP</p>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white">
          Active <span className="text-neon-blue text-glow-blue">Lineup</span>
        </h2>
        <div className="neon-line w-32 mx-auto mt-4" />
      </motion.div>

      {/* Main Slider Area */}
      <div className="relative w-full flex items-center justify-between gap-6 md:gap-12">
        <button onClick={prev} className="glass w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:bg-white/10 text-slate-400 transition-all active:scale-90" data-cursor>‹</button>

        <div className="flex-1 relative flex items-center justify-center" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={animal.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="glass-strong rounded-[3rem] p-8 md:p-14 w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden relative min-h-[500px]"
              style={{ border: `1px solid ${animal.color}40` }}
            >
              {/* Background ambient glow */}
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: `radial-gradient(circle at 30% 50%, ${animal.color}, transparent 60%)` }} />

              {/* Left Side: Visual */}
              <div className="flex flex-col items-center shrink-0 w-full md:w-1/2">
                <motion.div 
                  className="relative w-64 h-64 md:w-96 md:h-96 mb-8 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => showLightbox(animal.image)}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-3xl opacity-40 blur-3xl transition-opacity group-hover:opacity-60"
                    style={{ background: animal.color }}
                  />
                  <motion.img 
                    src={animal.image} 
                    alt={animal.name}
                    className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                    <span className="text-white font-mono text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">VIEW FULLSCREEN</span>
                  </div>
                </motion.div>
                <motion.h3 className="text-5xl font-display font-black mb-2 whitespace-nowrap" style={{ color: animal.color, textShadow: `0 0 20px ${animal.color}40` }}>{animal.name}</motion.h3>
                <div className="px-6 py-2 rounded-full text-xs font-mono tracking-[0.3em] glass uppercase" style={{ color: animal.color, borderColor: `${animal.color}40` }}>{animal.role}</div>
              </div>

              {/* Divider (only on large screens) */}
              <div className="hidden md:block w-px h-2/3 bg-white/10 shrink-0" />

              {/* Right Side: Info & Stats */}
              <div className="flex-1 w-full text-left flex flex-col justify-center gap-6">
                 <p className="text-base text-slate-300 font-body leading-relaxed italic opacity-90 border-l-2 border-white/10 pl-6">" {animal.mission} "</p>

                 <div className="w-full space-y-4">
                  {Object.entries(animal.stats).map(([key, value], idx) => (
                    <StatBar key={key} label={key} value={value} color={statColors[key]} index={idx} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={next} className="glass w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:bg-white/10 text-slate-400 transition-all active:scale-90" data-cursor>›</button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-3 mt-12 pb-10">
        {animals.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className="h-1.5 transition-all duration-500 rounded-full" style={{ width: i === current ? '32px' : '8px', background: i === current ? animal.color : 'rgba(255,255,255,0.1)' }} data-cursor />
        ))}
      </div>
    </div>
  );
}
