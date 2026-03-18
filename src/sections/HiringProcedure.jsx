import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { hiringSteps } from '../data/squadData';

function Step({ step, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center w-full max-w-[200px]"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Connector line */}
      {index < hiringSteps.length - 1 && (
        <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(110%)] h-px bg-gradient-to-r from-neon-blue to-transparent opacity-30 z-0" />
      )}

      {/* Circle icon */}
      <div
        className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6 glass-strong rotate-3 transition-transform hover:rotate-0"
        style={{
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: inView ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
        }}
      >
        {step.icon}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center bg-neon-blue text-dark-900 shadow-xl">
          0{step.id}
        </span>
      </div>

      <h3 className="font-display font-black text-xl text-white mb-3 tracking-tight">{step.title}</h3>
      <p className="text-[11px] text-slate-400 leading-relaxed font-mono uppercase tracking-wider">{step.description}</p>
      
      {/* HUD scan element */}
      {inView && (
        <motion.div 
          className="absolute -inset-4 border border-neon-blue/10 pointer-events-none rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.4 }}
        />
      )}
    </motion.div>
  );
}

export default function HiringProcedure() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl py-4 overflow-hidden">
      {/* Header */}
      <motion.div className="text-center mb-12 shrink-0">
        <p className="text-xs font-mono tracking-widest mb-2 text-neon-blue font-bold uppercase">SECTION 03</p>
        <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none uppercase tracking-tighter">
          Onboarding <span className="text-neon-blue text-glow-blue">Protocol</span>
        </h2>
        <div className="neon-line w-32 mx-auto mt-4" />
      </motion.div>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 w-full px-8 flex-1 min-h-0">
        {hiringSteps.map((step, i) => (
          <Step key={step.id} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}
