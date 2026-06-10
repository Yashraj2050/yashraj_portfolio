'use client';

import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicStore } from '@/lib/cinematic/store';
import type { CinematicPage, NavItem } from '@/lib/cinematic/types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', description: 'Welcome' },
  { id: 'about', label: 'About', description: 'Who I am' },
  { id: 'projects', label: 'Projects', description: 'My work' },
  { id: 'research', label: 'Research', description: 'Explorations' },
  { id: 'experience', label: 'Experience', description: 'Journey' },
  { id: 'certifications', label: 'Certifications', description: 'Credentials' },
  { id: 'contact', label: 'Contact', description: 'Get in touch' },
];

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  index: number;
  onSelect: (id: CinematicPage) => void;
}

function NavItemComponent({ item, isActive, index, onSelect }: NavItemProps) {
  return (
    <motion.button
      className="relative group"
      onClick={() => onSelect(item.id)}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: index * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="relative px-4 py-2 flex items-center gap-3">
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-white/60 rounded-full"
          animate={{
            height: isActive ? '60%' : '0%',
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.span
          className="text-xs font-medium tracking-wider uppercase"
          style={{
            color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
          }}
          animate={{
            letterSpacing: isActive ? '0.15em' : '0.1em',
          }}
        >
          {item.label}
        </motion.span>
      </div>

      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-white/10"
          layoutId="activeNav"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// Mobile bottom navigation icons
const navIcons: Record<string, string> = {
  home: '⌂',
  about: '◉',
  projects: '◈',
  research: '◆',
  experience: '◎',
  certifications: '✦',
  contact: '✉',
};

export function CinematicNavigation() {
  const { currentPage, triggerPageTransition, isTransitioning } = useCinematicStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (id: CinematicPage) => {
      if (!isTransitioning) {
        triggerPageTransition(id);
      }
    },
    [isTransitioning, triggerPageTransition]
  );

  return (
    <>
      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <motion.nav
        ref={containerRef}
        className="fixed left-0 top-0 h-full z-50 flex-col justify-center hidden md:flex"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative py-6 pl-4 pr-6 rounded-r-2xl backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(15,15,20,0.8) 0%, rgba(10,10,15,0.9) 100%)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-r-2xl overflow-hidden pointer-events-none">
            <div
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(100,150,200,0.3) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Nav items */}
          <div className="relative flex flex-col gap-1">
            {navItems.map((item, index) => (
              <NavItemComponent
                key={item.id}
                item={item}
                isActive={currentPage === item.id}
                index={index}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Transition indicator */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="absolute bottom-6 left-4 right-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resume Actions (Desktop) */}
          <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col gap-2">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-4 py-2.5 flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 flex items-center justify-center rounded bg-white/[0.05] text-white/50 group-hover:text-white/90 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/60 group-hover:text-white/95 transition-colors">
                View CV
              </span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Yashraj_Kuyate_Resume.pdf"
              className="relative group px-4 py-2.5 flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 flex items-center justify-center rounded bg-white/[0.05] text-white/50 group-hover:text-white/90 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/60 group-hover:text-white/95 transition-colors">
                Download CV
              </span>
            </motion.a>

            {/* Social Links */}
            <div className="flex gap-2 px-1 mt-2">
              <a href="https://linkedin.com/in/yashraj-kuyate-b24b0331b" target="_blank" rel="noreferrer" className="flex-1 py-2 text-center rounded border border-white/[0.05] hover:bg-white/[0.05] text-white/40 hover:text-white/90 transition-colors text-[10px] font-code">IN</a>
              <a href="https://github.com/Yashraj2050" target="_blank" rel="noreferrer" className="flex-1 py-2 text-center rounded border border-white/[0.05] hover:bg-white/[0.05] text-white/40 hover:text-white/90 transition-colors text-[10px] font-code">GH</a>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Bottom Navigation (visible only on mobile) ── */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="flex items-center justify-around px-2 py-2 backdrop-blur-xl border-t"
          style={{
            background: 'linear-gradient(to top, rgba(6,6,10,0.97) 0%, rgba(10,10,16,0.92) 100%)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                whileTap={{ scale: 0.92 }}
              >
                <span
                  className="text-base leading-none transition-all duration-300"
                  style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                >
                  {navIcons[item.id]}
                </span>
                <span
                  className="text-[9px] font-code tracking-wider uppercase transition-all duration-300"
                  style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/50 rounded-full"
                    layoutId="mobileActiveNav"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.button>
            );
          })}
          {/* Mobile Resume Link */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.04, duration: 0.4 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-base leading-none text-emerald-400/80">
              ↓
            </span>
            <span className="text-[9px] font-code tracking-wider uppercase text-emerald-400/60">
              CV
            </span>
          </motion.a>
        </div>
      </motion.nav>
    </>
  );
}
