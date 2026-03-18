import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="absolute inset-0 w-full h-full pt-16 pb-6 px-12 overflow-hidden flex flex-col items-center justify-center bg-dark-900"
    >
      <div className="w-full h-full flex items-center justify-center max-w-[1400px] mx-auto overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
