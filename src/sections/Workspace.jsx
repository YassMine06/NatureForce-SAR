import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '../context/LightboxContext';
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
  const { showLightbox } = useLightbox();

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
        <p className="text-xs font-mono tracking-widest mb-2 text-neon-orange font-bold uppercase">
          SECTION 02 : WORKSPACE
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
        className="relative flex-1 w-full h-full md:h-5/6 rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] cursor-zoom-in group/bg bg-dark-950"
        onClick={() => showLightbox('/companie.jpeg')}
        style={{
          backgroundImage: 'url(/companie.jpeg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/bg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-white font-mono text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">VIEW HQ FULLSCREEN</span>
        </div>
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
            {/* Core dot - removed emoji */}
            <span
              className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center glass"
              style={{
                background: `${hs.color}`,
                boxShadow: `0 0 20px ${hs.color}`,
              }}
            />
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
                <div 
                  className="relative w-16 h-16 shrink-0 cursor-zoom-in group/thumb"
                  onClick={(e) => { e.stopPropagation(); showLightbox(activeHotspot.image); }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-20 blur-lg" style={{ background: activeHotspot.color }} />
                  <img 
                    src={activeHotspot.image} 
                    alt={activeHotspot.animal}
                    className="relative w-full h-full object-cover rounded-xl border border-white/10 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-[8px] text-white font-bold uppercase tracking-tighter">FULL</div>
                </div>
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
