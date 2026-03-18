import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0); // 0: icon, 1: title, 2: done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => onDone(), 2800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Rotating ring */}
          <motion.div
            className="relative w-32 h-32 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
              style={{ animation: 'loader-spin 3s linear infinite' }}
            />
            <div
              className="absolute inset-2 rounded-full border-2 border-t-neon-blue border-transparent"
              style={{ animation: 'loader-spin 1.5s linear infinite' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              🚨
            </div>
          </motion.div>

          {/* Text */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p
                  className="text-2xl font-display font-bold tracking-widest text-glow-blue"
                  style={{ color: '#00d4ff' }}
                >
                  INITIALIZING NatureForce
                </p>
                <p className="text-sm text-slate-400 mt-2 font-mono tracking-wider">
                  S.A.R. RESPONSE PROTOCOL
                </p>
                {/* Loading bar */}
                <div className="mt-6 w-48 mx-auto h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #00d4ff, #ff6b00)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
