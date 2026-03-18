import { motion } from 'framer-motion';
import { doNotHire } from '../data/squadData';

export default function DoNotHire() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-6xl py-4 overflow-hidden">
      {/* Background danger graphics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[50vh] -translate-y-1/2 bg-red-600/10 blur-[150px]" />
      </div>

      {/* Header */}
      <motion.div className="text-center mb-10 relative z-10 shrink-0">
        <p className="text-xs font-mono tracking-widest mb-2 text-red-500 font-bold uppercase tracking-[0.3em]">WARNING: BLACKLISTED_ENTITY</p>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-red-500" style={{ textShadow: '0 0 25px rgba(255,26,26,0.8)' }}>Blacklist</span>
        </h2>
        <div className="neon-line w-32 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #ff1a1a, transparent)' }} />
      </motion.div>

      {/* The Sloth card - LANDSCAPE */}
      <motion.div
        className="relative z-10 glass-strong border-red-500/20 rounded-[3rem] p-10 md:p-14 w-full max-w-5xl mx-auto overflow-hidden group flex flex-col md:flex-row items-center gap-12 flex-1 min-h-0 max-h-[500px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Left: Restricted Visual */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
          <motion.div 
            className="text-[12rem] filter grayscale opacity-60 brightness-50 contrast-125"
            animate={{ 
              x: [-2, 2, -2],
              filter: ["grayscale(1) brightness(0.5)", "grayscale(0.8) brightness(0.7)", "grayscale(1) brightness(0.5)"]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
          >
            🦥
          </motion.div>
          <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600/50 text-red-600 font-display font-black text-4xl px-6 py-2 rotate-[-15deg] uppercase tracking-widest pointer-events-none">
            Terminated
          </div>
        </div>

        {/* Right: Restricted Data */}
        <div className="w-full md:w-1/2 text-left space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-sm bg-red-600 animate-pulse" />
              <h3 className="text-5xl font-display font-black text-white italic tracking-tighter uppercase">The <span className="text-red-500">Sloth</span></h3>
            </div>
            <p className="text-xs font-mono text-red-500/50 uppercase tracking-[0.4em]">Subj_ID: SLOTH-00 // Status: TERMINATED</p>
          </div>

          <div className="space-y-4">
             <div className="glass-strong border-red-500/30 p-4 rounded-xl">
               <p className="text-[10px] font-mono text-red-500 mb-1 tracking-widest">INCIDENT_REPORT</p>
               <p className="text-lg text-slate-300 font-body leading-tight italic">
                 " {doNotHire.reason} "
               </p>
             </div>
             
             <div className="flex gap-6">
               <div>
                 <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Termination Cause</p>
                 <p className="text-sm font-bold text-red-500 uppercase tracking-wider">Fatal Velocity Deficit</p>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div>
                 <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Max Speed Recorded</p>
                 <p className="text-sm font-bold text-white font-mono">{doNotHire.speed}</p>
               </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
