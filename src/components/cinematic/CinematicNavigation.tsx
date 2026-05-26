'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  isExpanded: boolean;
}

function NavItemComponent({ item, isActive, index, onSelect, isExpanded }: NavItemProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const backgroundX = useTransform(mouseX, (x) => x / 20);
  const backgroundY = useTransform(mouseY, (y) => y / 20);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  return (
    <motion.button
      className="relative group"
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(item.id)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      
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
            color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
          }}
          animate={{
            letterSpacing: isActive ? '0.15em' : '0.1em',
          }}
        >
          {item.label}
        </motion.span>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="text-[10px] text-white/30"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.description}
            </motion.span>
          )}
        </AnimatePresence>
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

export function CinematicNavigation() {
  const { currentPage, triggerPageTransition, isTransitioning } = useCinematicStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((id: CinematicPage) => {
    if (!isTransitioning) {
      triggerPageTransition(id);
    }
  }, [isTransitioning, triggerPageTransition]);

  return (
    <motion.nav
      ref={containerRef}
      className="fixed left-0 top-0 h-full z-50 flex flex-col justify-center"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="relative py-6 pl-4 pr-6 rounded-r-2xl backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,20,0.8) 0%, rgba(10,10,15,0.9) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
        animate={{
          width: isExpanded ? 'auto' : 'auto',
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
              isExpanded={isExpanded}
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
      </motion.div>
    </motion.nav>
  );
}
