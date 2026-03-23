import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { usePresentation } from '../context/PresentationContext';

const navItems = [
  { label: 'Hero', href: '/' },
  { label: 'Lineup', href: '/lineup' },
  { label: 'Workspace', href: '/workspace' },
  { label: 'Hiring', href: '/hiring' },
  { label: 'HR', href: '/hr' },
  { label: 'Future', href: '/future' },
  { label: 'Blacklist', href: '/blacklist' },
];

export default function Navbar() {
  const { presentationMode, togglePresentationMode } = usePresentation();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
      }}
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2"
        data-cursor
      >
        <span className="text-2xl">🚨</span>
        <span
          className="font-display font-bold text-sm tracking-widest hidden md:block"
          style={{ color: '#00d4ff' }}
        >
          N.F.S.A.R
        </span>
      </NavLink>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded hover:bg-white/5 
               ${isActive ? 'text-neon-blue' : 'text-slate-400 hover:text-white'}`
            }
            data-cursor
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Presentation Mode btn */}
      <motion.button
        onClick={togglePresentationMode}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300"
        style={{
          background: presentationMode
            ? 'rgba(255, 107, 0, 0.2)'
            : 'rgba(0, 212, 255, 0.1)',
          border: `1px solid ${presentationMode ? '#ff6b00' : '#00d4ff'}`,
          color: presentationMode ? '#ff6b00' : '#00d4ff',
          boxShadow: presentationMode
            ? '0 0 15px rgba(255,107,0,0.2)'
            : '0 0 15px rgba(0,212,255,0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{presentationMode ? '⏹' : '▶'}</span>
        <span className="hidden md:inline">{presentationMode ? 'Exit Mode' : 'Present'}</span>
      </motion.button>
    </motion.nav>
  );
}
