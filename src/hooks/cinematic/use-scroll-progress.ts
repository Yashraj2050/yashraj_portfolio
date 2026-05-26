'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useCinematicStore } from '@/lib/cinematic/store';

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const { setScrollProgress } = useCinematicStore();
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      setScrollProgress(Math.max(0, Math.min(1, progress)));
    });
  }, [containerRef, setScrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerRef, handleScroll]);

  return {
    scrollProgress: useCinematicStore((s) => s.scrollProgress),
  };
}
