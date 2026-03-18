import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hrRemedies } from '../data/squadData';

export default function HRRemedies() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const remedy = hrRemedies[current];

  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % hrRemedies.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + hrRemedies.length) % hrRemedies.length); };

  const variants = {
    enter: (dir) => ({ opacity: 0, rotateX: dir > 0 ? 90 : -90, y: 50 }),
    center: { opacity: 1, rotateX: 0, y: 0 },
    exit: (dir) => ({ opacity: 0, rotateX: dir > 0 ? -90 : 90, y: -50 }),
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl py-4 overflow-hidden">
      {/* Header */}
      <motion.div className="text-center mb-10 shrink-0">
        <p className="text-xs font-mono tracking-widest mb-2 text-[#c084fc] font-bold uppercase">SECTION 04</p>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
          Tactical <span className="text-[#c084fc]">Remedies</span>
        </h2>
        <div className="neon-line w-32 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #c084fc, transparent)' }} />
      </motion.div>

      {/* Slider */}
      <div className="relative w-full flex items-center justify-center gap-4 md:gap-8 flex-1 min-h-0 px-4">
        <button onClick={prev} className="glass w-12 h-12 rounded-full flex items-center justify-center text-xl text-slate-500 hover:text-white transition-all active:scale-90 shrink-0" data-cursor>‹</button>

        <div className="flex-1 max-w-4xl h-full flex items-center justify-center min-h-0" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "circOut" }}
              className="glass-strong rounded-[2.5rem] p-8 md:p-10 text-center flex flex-col md:flex-row items-center gap-10 relative overflow-hidden w-full h-full max-h-[450px]"
              style={{ border: `1px solid ${remedy.color}20` }}
            >
              {/* Background HUD graphics */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="flex flex-col items-center shrink-0 w-full md:w-1/4">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-xl">{remedy.emoji}</div>
                <h3 className="text-3xl font-display font-black opacity-90 text-center" style={{ color: remedy.color }}>{remedy.animal}</h3>
              </div>

              <div className="hidden md:block w-px h-1/2 bg-white/10 shrink-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-1">
                <div className="rounded-2xl p-6 glass border-red-500/20 text-left relative group/box overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30" />
                  <p className="text-[10px] font-mono text-red-400 mb-2 tracking-[0.2em] font-bold uppercase">Bio Weakness</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-body italic">{remedy.weakness}</p>
                </div>
                <div className="rounded-2xl p-6 glass border-emerald-500/20 text-left relative group/box overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30" />
                  <p className="text-[10px] font-mono text-emerald-400 mb-2 tracking-[0.2em] font-bold uppercase">Tactical Remedy</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-body">{remedy.solution}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={next} className="glass w-12 h-12 rounded-full flex items-center justify-center text-xl text-slate-500 hover:text-white transition-all active:scale-90" data-cursor>›</button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-10">
        {hrRemedies.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className="h-1 transition-all duration-300 rounded-full" style={{ width: i === current ? '20px' : '6px', background: i === current ? remedy.color : 'rgba(255,255,255,0.1)' }} data-cursor />
        ))}
      </div>
    </div>
  );
}
