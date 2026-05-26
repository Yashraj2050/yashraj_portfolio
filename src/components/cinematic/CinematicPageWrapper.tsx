'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlowCanvas } from '@/hooks/cinematic/use-flow-canvas';
import { useCinematicStore } from '@/lib/cinematic/store';
import { CinematicNavigation } from './CinematicNavigation';
import { CinematicCursor } from './CinematicCursor';

interface CinematicPageWrapperProps {
  children: ReactNode;
}

export function CinematicPageWrapper({ children }: CinematicPageWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initEngine } = useFlowCanvas();
  const { currentPage, transitionProgress, isTransitioning, mouseX, mouseY } = useCinematicStore();

  useEffect(() => {
    if (canvasRef.current) {
      initEngine(canvasRef.current);
    }
  }, [initEngine]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Custom Cursor */}
      <CinematicCursor />

      {/* Flow Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Ambient gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,15,0.8) 0%, transparent 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 100%)',
          }}
        />

        {/* Dynamic ambient glow following mouse */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(80,120,180,0.15) 0%, transparent 70%)',
            left: mouseX * window.innerWidth - 300,
            top: mouseY * window.innerHeight - 300,
          }}
          animate={{
            x: mouseX * window.innerWidth - 300,
            y: mouseY * window.innerHeight - 300,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Navigation */}
      <CinematicNavigation />

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="relative z-10 pl-20 md:pl-28 min-h-screen"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.1,
            }
          }}
          exit={{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)',
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
              style={{
                opacity: transitionProgress * 0.3,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic bars for transitions */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent z-50"
        style={{
          scaleX: transitionProgress,
          transformOrigin: 'left',
        }}
      />

      {/* Corner accents */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-white/20"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-white/30 text-[10px] uppercase tracking-widest">
          {currentPage}
        </span>
      </div>
    </div>
  );
}
