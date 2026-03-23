import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [activeImage, setActiveImage] = useState(null);

  const showLightbox = useCallback((url) => {
    setActiveImage(url);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImage(null);
  }, []);

  return (
    <LightboxContext.Provider value={{ activeImage, showLightbox, closeLightbox }}>
      {children}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              />
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-4xl font-light transition-colors w-12 h-12 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-md"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export const useLightbox = () => {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
};
