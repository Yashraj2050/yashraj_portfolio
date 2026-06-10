'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicStore } from '@/lib/cinematic/store';
import type { CinematicPage } from '@/lib/cinematic/types';

interface PaletteItem {
  id: string;
  label: string;
  shortcut: string;
  description: string;
  url?: string;
}

const paletteItems: PaletteItem[] = [
  { id: 'home', label: 'Home', shortcut: '01', description: 'Entry point' },
  { id: 'about', label: 'About', shortcut: '02', description: 'Identity matrix' },
  { id: 'projects', label: 'Projects', shortcut: '03', description: 'Deployments' },
  { id: 'research', label: 'Research', shortcut: '04', description: 'Hidden Networks' },
  { id: 'experience', label: 'Experience', shortcut: '05', description: 'Chronicle' },
  { id: 'certifications', label: 'Certifications', shortcut: '06', description: 'Credentials' },
  { id: 'contact', label: 'Contact', shortcut: '07', description: 'Handshake' },
  { id: 'resume', label: 'Resume', shortcut: '08', description: 'Credentials.pdf', url: '/resume.pdf' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentPage, triggerPageTransition, isTransitioning } = useCinematicStore();

  const filtered = query
    ? paletteItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : paletteItems;

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const navigate = useCallback(
    (item: PaletteItem) => {
      if (item.url) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      } else {
        if (!isTransitioning) {
          triggerPageTransition(item.id as CinematicPage);
        }
      }
      setIsOpen(false);
      setQuery('');
    },
    [isTransitioning, triggerPageTransition]
  );

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          navigate(filtered[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, filtered, selectedIndex, navigate]);

  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
  }, []);

  return (
    <>
      {/* Trigger Button — top right */}
      <button
        onClick={toggle}
        className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-white/8 bg-[#08080c]/70 backdrop-blur-xl hover:border-white/20 transition-all cursor-pointer group"
      >
        <span className="text-white/55 text-[10px] font-code tracking-wider uppercase group-hover:text-white/80 transition-colors">
          ☰ EXPLORE
        </span>
        <kbd className="text-[9px] text-white/35 border border-white/15 rounded px-1.5 py-0.5 font-code">
          ⌘K
        </kbd>
      </button>

      {/* Page indicator — top left */}
      <div className="fixed top-5 left-6 z-50 flex items-center gap-4">
        <motion.img
          src="/logo.png"
          alt="YK Logo"
          className="w-8 h-8 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="h-4 w-px bg-white/10" />
        <span className="text-white/45 text-[10px] font-code tracking-[0.3em] uppercase select-none capitalize">
          {currentPage}
        </span>
      </div>

      {/* Palette Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Palette Container */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Search Input */}
                <div className="border-b border-white/5 px-5 py-4 flex items-center gap-3">
                  <span className="text-white/20 text-xs font-code">▸</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => updateQuery(e.target.value)}
                    placeholder="Navigate to..."
                    className="flex-1 bg-transparent text-white/90 text-sm font-display placeholder:text-white/20 focus:outline-none"
                  />
                  <kbd className="text-[9px] text-white/15 border border-white/5 rounded px-1.5 py-0.5 font-code">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="py-2 max-h-[350px] overflow-y-auto scrollbar-none">
                  {filtered.length === 0 ? (
                    <div className="px-5 py-8 text-center text-white/20 text-xs font-code">
                      No matching routes found
                    </div>
                  ) : (
                    filtered.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => navigate(item)}
                        className={`w-full px-5 py-3 flex items-center gap-4 text-left cursor-pointer transition-colors ${
                          index === selectedIndex
                            ? 'bg-white/5'
                            : 'hover:bg-white/[0.02]'
                        }`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.25 }}
                      >
                        {/* Shortcut number */}
                        <span
                          className={`text-[10px] font-code w-6 ${
                            currentPage === item.id
                              ? 'text-white/60'
                              : 'text-white/15'
                          }`}
                        >
                          {item.shortcut}
                        </span>

                        {/* Label */}
                        <span
                          className={`text-sm font-display flex-1 ${
                            currentPage === item.id
                              ? 'text-white/90'
                              : 'text-white/60'
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Description */}
                        <span className="text-[10px] font-code text-white/15 tracking-wider uppercase">
                          {item.description}
                        </span>

                        {/* Active indicator */}
                        {currentPage === item.id && (
                          <motion.div
                            className="w-1 h-1 rounded-full bg-white/50"
                            layoutId="paletteActive"
                          />
                        )}
                      </motion.button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/5 px-5 py-2.5 flex items-center justify-between">
                  <span className="text-[9px] text-white/15 font-code tracking-wider">
                    {filtered.length} routes
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white/10 font-code">↑↓ navigate</span>
                    <span className="text-[9px] text-white/10 font-code">↵ select</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
