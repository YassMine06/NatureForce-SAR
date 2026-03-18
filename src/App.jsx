import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PresentationProvider, usePresentation } from './context/PresentationContext';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

// Sections
import Hero from './sections/Hero';
import StartingLineup from './sections/StartingLineup';
import Workspace from './sections/Workspace';
import HiringProcedure from './sections/HiringProcedure';
import HRRemedies from './sections/HRRemedies';
import FutureExpansion from './sections/FutureExpansion';
import DoNotHire from './sections/DoNotHire';

const ROUTES = [
  '/',
  '/lineup',
  '/workspace',
  '/hiring',
  '/hr',
  '/future',
  '/blacklist',
];

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { presentationMode } = usePresentation();

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e) => {
      const currentIndex = ROUTES.indexOf(location.pathname);
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentIndex < ROUTES.length - 1) {
          navigate(ROUTES[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          navigate(ROUTES[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, location.pathname, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
        <Route path="/lineup" element={<PageTransition><StartingLineup /></PageTransition>} />
        <Route path="/workspace" element={<PageTransition><Workspace /></PageTransition>} />
        <Route path="/hiring" element={<PageTransition><HiringProcedure /></PageTransition>} />
        <Route path="/hr" element={<PageTransition><HRRemedies /></PageTransition>} />
        <Route path="/future" element={<PageTransition><FutureExpansion /></PageTransition>} />
        <Route path="/blacklist" element={<PageTransition><DoNotHire /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function HudOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      {/* Corner indicators */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-neon-blue/20" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-neon-blue/20" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-neon-blue/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-neon-blue/20" />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <PresentationProvider>
        <CustomCursor />
        <HudOverlay />
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
        {loaded && (
          <div className="relative w-screen h-screen bg-dark-900 text-slate-200 selection:bg-neon-blue/30 overflow-hidden">
            <Navbar />
            <AnimatedRoutes />
          </div>
        )}
      </PresentationProvider>
    </BrowserRouter>
  );
}
