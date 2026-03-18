import { motion } from 'framer-motion';
import { futureExpansion } from '../data/squadData';

export default function FutureExpansion() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-6xl py-4 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px]" />
      </div>

      {/* Animated Rings */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none">
        <motion.div className="absolute inset-0 border border-white/5 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute inset-20 border border-neon-blue/5 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
      </div>

      {/* Header */}
      <motion.div className="text-center mb-10 relative z-10 shrink-0">
        <p className="text-xs font-mono tracking-widest mb-1 text-neon-blue font-bold uppercase">SECTION 05</p>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none uppercase tracking-tighter">
          Pipeline <span className="text-neon-blue text-glow-blue">Expansion</span>
        </h2>
        <div className="neon-line w-32 mx-auto mt-4" />
      </motion.div>

      {/* The big glowing Owl card - 2 COLUMN LAYOUT */}
      <motion.div
        className="relative z-10 glass-strong rounded-[3rem] p-10 md:p-14 w-full max-w-5xl mx-auto border border-white/10 shadow-[0_0_100px_rgba(0,212,255,0.1)] group flex flex-col md:flex-row items-center gap-12 flex-1 min-h-0 max-h-[500px]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Visual representation */}
        <div className="w-full md:w-1/2 flex justify-center relative select-none">
          <motion.div 
            className="text-[12rem] filter drop-shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            🦉
          </motion.div>
          {/* Scanning radar effect */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-neon-blue/40 blur-sm"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Right: Text content */}
        <div className="w-full md:w-1/2 text-left">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-4xl font-display font-black text-white">Project <span className="text-neon-blue">S.C.O.U.T.</span></h3>
            <span className="px-3 py-1 glass rounded-full text-[10px] font-mono text-neon-blue animate-pulse">CLASSIFIED</span>
          </div>
          
          <div className="h-px w-20 bg-neon-blue/30 mb-6" />

          <p className="text-lg text-slate-300 font-body leading-relaxed mb-8 opacity-90 border-l-2 border-neon-blue/20 pl-6">
            Future integration of nocturnal aerial units for **24/7 high-altitude monitoring** and precise victim location in low-visibility environments.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(0,212,255,1)]" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Enhanced Thermal Optics</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
