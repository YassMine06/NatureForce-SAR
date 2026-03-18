import { createContext, useContext, useState, useEffect } from 'react';

const PresentationContext = createContext(null);

export function PresentationProvider({ children }) {
  const [presentationMode, setPresentationMode] = useState(false);

  const togglePresentationMode = () => {
    setPresentationMode(prev => !prev);
  };

  // Apply body class
  useEffect(() => {
    if (presentationMode) {
      document.body.classList.add('presentation-mode');
    } else {
      document.body.classList.remove('presentation-mode');
    }
  }, [presentationMode]);

  return (
    <PresentationContext.Provider value={{ presentationMode, togglePresentationMode }}>
      {children}
    </PresentationContext.Provider>
  );
}

export const usePresentation = () => {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error('usePresentation must be used within PresentationProvider');
  return ctx;
};
