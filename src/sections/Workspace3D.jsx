import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Html, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  ContactShadows,
  Text,
  MeshDistortMaterial
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { animals } from '../data/squadData';

// Individual Tactical Zone Component
function TacticalZone({ animal, active, onSelect, hideLabel }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Gentle floating and rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t + animal.id) * 0.2;
    meshRef.current.rotation.y += 0.005;
  });

  // Calculate position based on ID for a circular layout
  const angle = (animal.id / animals.length) * Math.PI * 2;
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <group position={[x, 0, z]}>
      {/* Selection Ring */}
      {(hovered || active) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color={animal.color} transparent opacity={0.3} />
        </mesh>
      )}

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(animal);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Glowing Base Projection */}
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.6, 32]} />
            <meshBasicMaterial color={animal.color} transparent opacity={0.2} />
          </mesh>
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.7, 32]} />
            <meshBasicMaterial color={animal.color} transparent opacity={hovered || active ? 0.8 : 0.3} />
          </mesh>

          {/* 3D Emoji Icon */}
          <Text 
            fontSize={hovered || active ? 1.8 : 1.5}
            position={[0, 0.5, 0]}
            anchorX="center"
            anchorY="middle"
          >
            {animal.emoji}
          </Text>

          {/* Label - Hide when any animal is selected to prevent overlay overlap */}
          {!hideLabel && (
            <Html position={[0, 2, 0]} center distanceFactor={15}>
              <div 
                className={`px-3 py-1 rounded-lg border border-white/20 backdrop-blur-md transition-all duration-300 pointer-events-none select-none
                  ${hovered || active ? 'bg-black/80 scale-110' : 'bg-black/40 scale-100'}`}
                style={{ borderColor: hovered || active ? animal.color : 'rgba(255,255,255,0.1)' }}
              >
                <p className="text-[10px] font-mono font-black uppercase tracking-widest whitespace-nowrap" style={{ color: animal.color }}>
                  {animal.name}
                </p>
              </div>
            </Html>
          )}
        </group>
      </Float>

      {/* Connection line to ground */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshBasicMaterial color={animal.color} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Scene({ selectedAnimal, onSelect }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[15, 12, 20]} fov={40} />
      <OrbitControls 
        enablePan={false} 
        maxDistance={35} 
        minDistance={10} 
        maxPolarAngle={Math.PI / 2.2} 
        makeDefault
      />
      
      {/* Environment & Lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <spotLight position={[-20, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

      {/* Ground Grid */}
      <group position={[0, -3, 0]}>
        <GridHelper />
        <ContactShadows opacity={0.4} scale={30} blur={2.4} far={10} />
      </group>

      {/* Render All Animal Zones */}
      {animals.map((animal) => (
        <TacticalZone 
          key={animal.id} 
          animal={animal} 
          active={selectedAnimal?.id === animal.id}
          onSelect={onSelect}
          hideLabel={!!selectedAnimal}
        />
      ))}

      {/* Center Hologram Hub */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.1, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} />
      </mesh>
    </>
  );
}

function GridHelper() {
  return (
    <gridHelper args={[50, 25, '#1e293b', '#0f172a']} position={[0, 0.05, 0]} />
  );
}

export default function Workspace3D() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <div className="w-full h-screen flex flex-col bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Simulation Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden border-b border-white/10 shadow-2xl">
        {/* HUD Elements */}
        <div className="absolute top-10 left-10 z-20 font-mono text-[10px] text-neon-blue/40 flex flex-col gap-2 pointer-events-none uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            <span>HQ_SYNC: ACTIVE</span>
          </div>
          <span>Sector: SEARCH_AND_RESCUE</span>
          <span>Buffer: NULL_LATENCY</span>
        </div>

        {!selectedAnimal && (
          <div className="absolute bottom-10 right-10 z-20 font-mono text-[10px] text-neon-blue/30 flex flex-col items-end gap-1 pointer-events-none uppercase">
            <span>Explore_Grid: Orbit_Controls_Enabled</span>
            <span>Input: Mouse_Drag & Scroll</span>
          </div>
        )}

        {/* 3D Canvas */}
        <div className="w-full h-full min-h-[600px] cursor-crosshair">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-neon-blue font-mono text-sm animate-pulse tracking-widest">
              BOOTING_TACTICAL_ENGINE...
            </div>
          }>
            <Canvas shadows gl={{ antialias: true }}>
              <Scene selectedAnimal={selectedAnimal} onSelect={setSelectedAnimal} />
            </Canvas>
          </Suspense>
        </div>

        {/* Tactical Info Panel (Overlay) */}
        <AnimatePresence>
          {selectedAnimal && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute top-10 right-10 z-30 w-80 h-[calc(100%-5rem)] max-h-[700px] p-8 bg-[#0a0f1d] border border-white/20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col"
              onWheel={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{selectedAnimal.emoji}</div>
                  <div>
                    <h3 className="text-xl font-display font-black text-white uppercase leading-none tracking-tight">{selectedAnimal.name}</h3>
                    <p className="text-xs font-mono text-neon-blue uppercase tracking-widest mt-1">{selectedAnimal.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAnimal(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all text-xl"
                >
                  ×
                </button>
              </div>

              <div className="h-px w-full bg-white/20 mb-6 shrink-0" />

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pointer-events-auto">
                <div className="space-y-8 pb-8">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-2 font-bold">Mission_Directive</p>
                    <p className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-neon-blue/30 pl-4 py-1">"{selectedAnimal.mission}"</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-3 font-bold">Tactical_Workspace</p>
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ background: selectedAnimal.color }} />
                      <span className="text-sm font-mono text-white font-medium">{selectedAnimal.workspace}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedAnimal.stats).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-mono text-slate-400 uppercase mb-2 font-bold tracking-wider">{key}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              className="h-full shadow-[0_0_10px_rgba(0,212,255,0.3)]"
                              style={{ background: selectedAnimal.color }}
                            />
                          </div>
                          <span className="text-xs font-mono text-white font-bold">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                className="mt-6 w-full py-5 shrink-0 rounded-2xl bg-neon-blue/10 border border-neon-blue/20 text-xs font-mono font-black text-neon-blue hover:bg-neon-blue/20 hover:text-white transition-all uppercase tracking-[0.3em] active:scale-95 shadow-lg shadow-neon-blue/5"
                onClick={() => setSelectedAnimal(null)}
              >
                Close_Data_Stream
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
