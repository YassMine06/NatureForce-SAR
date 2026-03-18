import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workspaceHotspots } from '../data/squadData';

// Re-adjusting hotspots for the AI-generated architecture image
const updatedHotspots = [
  { ...workspaceHotspots[0], position: { top: "18%", left: "55%" } }, // Bat (Ceiling)
  { ...workspaceHotspots[1], position: { top: "42%", left: "28%" } }, // Cockroach (In-wall tunnels)
  { ...workspaceHotspots[2], position: { top: "75%", left: "75%" } }, // Dolphin (Water tank at bottom right)
  { ...workspaceHotspots[3], position: { top: "72%", left: "42%" } }, // Elephant (Reinforced Floor)
];

export default function Workspace() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="w-full h-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10 py-4 overflow-hidden">
      {/* Left Column: Info */}
      <motion.div
        className="w-full md:w-1/3 text-left shrink-0"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs font-mono tracking-widest mb-2 text-neon-orange font-bold">
          SECTION 02
        </p>
        <h2 className="text-5xl md:text-6xl font-display font-black text-white leading-none mb-6">
          The{' '}
          <span className="text-neon-orange text-glow-orange block">
            Workspace
          </span>
        </h2>
        <div className="neon-line w-24 mb-6" style={{ background: 'linear-gradient(90deg, #ff6b00, transparent)' }} />
        
        <div className="glass rounded-2xl p-6 border-white/5 space-y-4">
          <p className="text-sm text-slate-300 font-mono italic leading-relaxed">
            &gt; Architectural Design: Biologically Adapted Headquarters.
          </p>
          <div className="h-px w-full bg-white/10" />
          <p className="text-xs text-slate-400 font-body leading-relaxed">
            Every animal in the N.F.S.A.R has a customized zone within the Resilience Hub, optimized for their specific biological traits and rescue roles.
          </p>
          <div className="flex flex-col gap-2 font-mono text-[10px] text-neon-orange/60">
            <span>&gt; STRUCTURAL_INTEGRITY: 100%</span>
            <span>&gt; ZONAL_ADAPTATION: PENDING_SCAN</span>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Building visualization (AI Image) */}
      <motion.div
        className="relative flex-1 w-full h-full md:h-5/6 rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        style={{
          backgroundImage: 'url(/workspace.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* HUD Overlay for workspace */}
        <div className="absolute inset-0 pointer-events-none border border-neon-orange/10 z-0">
          <div className="absolute top-6 left-6 font-mono text-[10px] text-neon-orange/40 flex flex-col gap-1">
             <span>RESILIENCEHUB_SEC_02</span>
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-neon-orange/40">
            &lt; 15.342 N / 48.921 E &gt;
          </div>
        </div>

        {/* Hotspots */}
        {updatedHotspots.map((hs) => (
          <motion.button
            key={hs.id}
            className="absolute flex items-center justify-center"
            style={{
              top: hs.position.top,
              left: hs.position.left,
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
            }}
            whileHover={{ scale: 1.25 }}
            onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
            data-cursor
          >
            {/* Pulse rings */}
            <span
              className="hotspot-ring absolute inset-0 rounded-full pointer-events-none"
              style={{ border: `2px solid ${hs.color}80` }}
            />
            {/* Core dot */}
            <span
              className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xl glass"
              style={{
                background: `${hs.color}30`,
                border: `1px solid ${hs.color}`,
                boxShadow: `0 0 20px ${hs.color}60`,
              }}
            >
              <span className="mb-0.5 pointer-events-none">{hs.emoji}</span>
            </span>
          </motion.button>
        ))}

        {/* Popup card - redesigned as absolute HUD info */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              key={activeHotspot.id}
              className="absolute z-20 glass-strong rounded-2xl p-6 w-72"
              style={{
                bottom: '30px',
                left: '30px',
                border: `1px solid ${activeHotspot.color}50`,
                boxShadow: `0 0 50px ${activeHotspot.color}30`,
              }}
              initial={{ opacity: 0, y: 20, blur: 10 }}
              animate={{ opacity: 1, y: 0, blur: 0 }}
              exit={{ opacity: 0, y: 20, blur: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl filter drop-shadow-md">{activeHotspot.emoji}</span>
                <div>
                  <p className="font-display font-black text-xl text-white leading-none mb-1">{activeHotspot.animal}</p>
                  <p className="text-[10px] font-mono tracking-widest uppercase opacity-70" style={{ color: activeHotspot.color }}>
                    {activeHotspot.zone}
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-white/10 mb-4" />
              <p className="text-xs text-slate-300 leading-relaxed font-body italic">" {activeHotspot.description} "</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
