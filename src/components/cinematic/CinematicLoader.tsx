'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Three phases: 'logo' → 'progress' → 'exit'
type Phase = 'logo' | 'progress' | 'exit';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [phase, setPhase] = useState<Phase>('logo');
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Phase 1 → Phase 2: logo settles, progress begins
    const t1 = setTimeout(() => {
      setPhase('progress');
    }, 900);

    // Progress bar animates 0 → 100 over ~1.2s
    const t2 = setTimeout(() => {
      setProgressWidth(100);
    }, 950);

    // Phase 3: begin exit fade
    const t3 = setTimeout(() => {
      setPhase('exit');
    }, 2300);

    // Notify parent after exit animation completes
    const t4 = setTimeout(() => {
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
          style={{ background: '#06060a' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* ── Architectural background grid ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* ── Radial vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* ── Soft ambient glow behind logo ── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              background:
                'radial-gradient(circle, rgba(60,100,160,0.10) 0%, rgba(60,100,160,0.04) 50%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: phase === 'logo' ? 1 : 0.6,
              scale: phase === 'logo' ? 1 : 1.15,
            }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Central content block ── */}
          <div className="relative flex flex-col items-center gap-0">

            {/* Phase 1 — Logo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle frame ring around logo */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                  margin: '-12px',
                  borderRadius: '20px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'logo' ? 1 : 0.4 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />

              <img
                src="/logo.png"
                alt="YK"
                className="w-20 h-20 object-contain"
                style={{ filter: 'brightness(0.9)' }}
                draggable={false}
              />
            </motion.div>

            {/* Phase 2 — Label + progress bar */}
            <motion.div
              className="flex flex-col items-center gap-5 mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'progress' ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* "Loading Experience" text */}
              <span className="text-white/30 text-[10px] font-code tracking-[0.45em] uppercase">
                Loading Experience
              </span>

              {/* Progress line */}
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 160,
                  height: 1,
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.25) 100%)',
                    width: `${progressWidth}%`,
                    transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Corner accents (architectural detail) ── */}
          {/* Top-left */}
          <motion.div
            className="absolute top-8 left-8 w-5 h-5 border-l border-t border-white/8 rounded-tl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          {/* Top-right */}
          <motion.div
            className="absolute top-8 right-8 w-5 h-5 border-r border-t border-white/8 rounded-tr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          {/* Bottom-left */}
          <motion.div
            className="absolute bottom-8 left-8 w-5 h-5 border-l border-b border-white/8 rounded-bl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          {/* Bottom-right */}
          <motion.div
            className="absolute bottom-8 right-8 w-5 h-5 border-r border-b border-white/8 rounded-br"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          {/* ── Bottom signature ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'progress' ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="text-white/12 text-[9px] font-code tracking-[0.3em] uppercase">
              Yashraj Kuyate
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
