'use client';

import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlowCanvas } from '@/hooks/cinematic/use-flow-canvas';
import { useCinematicStore } from '@/lib/cinematic/store';
import { CommandPalette } from './CommandPalette';
import { CinematicCursor } from './CinematicCursor';

interface CinematicPageWrapperProps {
  children: ReactNode;
}

export function CinematicPageWrapper({ children }: CinematicPageWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { initEngine } = useFlowCanvas();
  const { 
    currentPage, transitionProgress, isTransitioning, 
    mouseX, mouseY, activeVideo, wipePhase,
    setScrollProgress, setMousePosition 
  } = useCinematicStore();

  const [videoSrcA, setVideoSrcA] = useState<string | undefined>(activeVideo);
  const [videoSrcB, setVideoSrcB] = useState<string | undefined>(undefined);
  const [activeTag, setActiveTag] = useState<'A' | 'B'>('A');
  const [prevActiveVideo, setPrevActiveVideo] = useState(activeVideo);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const wipeVideoRef = useRef<HTMLVideoElement>(null);

  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    });

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track mouse for reactive video and ambient glow
  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, setMousePosition]);

  // Sync video switching when activeVideo changes (Render-phase state update)
  if (activeVideo !== prevActiveVideo) {
    setPrevActiveVideo(activeVideo);
    if (activeTag === 'A') {
      setVideoSrcB(activeVideo);
      setActiveTag('B');
    } else {
      setVideoSrcA(activeVideo);
      setActiveTag('A');
    }
  }

  // Load and play video players
  useEffect(() => {
    if (videoRefA.current && videoSrcA) {
      videoRefA.current.load();
      videoRefA.current.play().catch(() => {});
    }
  }, [videoSrcA]);

  useEffect(() => {
    if (videoRefB.current && videoSrcB) {
      videoRefB.current.load();
      videoRefB.current.play().catch(() => {});
    }
  }, [videoSrcB]);

  // Play wipe video on transition
  useEffect(() => {
    if (wipePhase === 'hold' && wipeVideoRef.current) {
      wipeVideoRef.current.currentTime = 0;
      wipeVideoRef.current.play().catch(() => {});
    }
  }, [wipePhase]);

  useEffect(() => {
    if (canvasRef.current) {
      initEngine(canvasRef.current);
    }
  }, [initEngine]);

  // Scroll progress tracking
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  }, [setScrollProgress]);

  // Video opacity reacts to mouse Y position
  const videoBaseOpacity = 0.3;
  const mouseReactiveOpacity = videoBaseOpacity + (1 - Math.abs(mouseY - 0.5) * 2) * 0.12;

  // Video parallax shift based on mouse
  const videoTranslateX = (mouseX - 0.5) * -15;
  const videoTranslateY = (mouseY - 0.5) * -10;

  return (
    <div className="relative min-h-screen bg-[#06060a] overflow-hidden">
      {/* Custom Cursor */}
      <CinematicCursor />

      {/* Background Videos (Cross-fading layers with mouse-reactive parallax) */}
      <video
        ref={videoRefA}
        src={videoSrcA}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          zIndex: -2,
          opacity: activeTag === 'A' ? mouseReactiveOpacity : 0,
          transform: `translate(${videoTranslateX}px, ${videoTranslateY}px) scale(1.08)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-in-out',
        }}
      />
      <video
        ref={videoRefB}
        src={videoSrcB}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          zIndex: -2,
          opacity: activeTag === 'B' ? mouseReactiveOpacity : 0,
          transform: `translate(${videoTranslateX}px, ${videoTranslateY}px) scale(1.08)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-in-out',
        }}
      />

      {/* Flow Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      />

      {/* Ambient gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to bottom, rgba(6,6,10,0.9) 0%, transparent 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, rgba(6,6,10,0.9) 0%, transparent 100%)',
          }}
        />

        {/* Dynamic ambient glow following mouse */}
        {mounted && (
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(60,100,160,0.08) 0%, transparent 70%)',
              left: mouseX * windowDimensions.width - 400,
              top: mouseY * windowDimensions.height - 400,
            }}
            animate={{
              x: mouseX * windowDimensions.width - 400,
              y: mouseY * windowDimensions.height - 400,
            }}
            transition={{ type: 'spring', stiffness: 30, damping: 40 }}
          />
        )}
      </div>

      {/* Command Palette Navigation */}
      <CommandPalette />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-50"
        style={{
          scaleX: useCinematicStore.getState().scrollProgress,
          transformOrigin: 'left',
        }}
      />

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative z-10 min-h-screen overflow-y-auto scrollbar-thin"
          style={{ height: '100vh' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }
          }}
          exit={{
            opacity: 0,
            y: -15,
            filter: 'blur(6px)',
            transition: {
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ==================== CINEMATIC WIPE OVERLAY ==================== */}
      <AnimatePresence>
        {wipePhase !== 'idle' && (
          <motion.div
            className="fixed inset-0 z-[60] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.3 } }}
          >
            {/* Wipe curtain */}
            <motion.div
              className="absolute inset-0 bg-[#06060a]"
              initial={{ x: '-100%' }}
              animate={
                wipePhase === 'wipe-in'
                  ? { x: '0%' }
                  : wipePhase === 'hold'
                  ? { x: '0%' }
                  : { x: '100%' }
              }
              transition={{
                duration: wipePhase === 'wipe-in' ? 0.5 : 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Secondary wipe curtain (slight delay for layered effect) */}
            <motion.div
              className="absolute inset-0 bg-[#0a0a12]"
              initial={{ x: '-100%' }}
              animate={
                wipePhase === 'wipe-in'
                  ? { x: '0%' }
                  : wipePhase === 'hold'
                  ? { x: '0%' }
                  : { x: '100%' }
              }
              transition={{
                duration: wipePhase === 'wipe-in' ? 0.5 : 0.6,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.05,
              }}
            />

            {/* Section divider video flash during hold */}
            {(wipePhase === 'hold') && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <video
                  ref={wipeVideoRef}
                  src="/videos/section-divider.mp4"
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: 'screen' }}
                />
              </motion.div>
            )}

            {/* Scanline effect during wipe */}
            <motion.div
              className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="w-full h-[2px] bg-white/30"
                style={{
                  animation: 'scanline 0.15s linear infinite',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic top progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-50"
        style={{
          scaleX: transitionProgress,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
