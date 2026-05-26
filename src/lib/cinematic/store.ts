import { create } from 'zustand';
import type { CinematicPage, CinematicState } from './types';

interface CinematicStore extends CinematicState {
  setCurrentPage: (page: CinematicPage) => void;
  setTransitionProgress: (progress: number) => void;
  setScrollProgress: (progress: number) => void;
  setMousePosition: (x: number, y: number) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  triggerPageTransition: (to: CinematicPage) => void;
}

export const useCinematicStore = create<CinematicStore>((set, get) => ({
  currentPage: 'home',
  transitionProgress: 0,
  scrollProgress: 0,
  mouseX: 0.5,
  mouseY: 0.5,
  isTransitioning: false,
  reducedMotion: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

  triggerPageTransition: (to) => {
    const { currentPage, isTransitioning } = get();
    if (currentPage === to || isTransitioning) return;
    
    set({ isTransitioning: true, transitionProgress: 0 });
    
    // Simulate transition progress
    const duration = 1200;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      set({ transitionProgress: progress });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        set({ 
          currentPage: to, 
          isTransitioning: false, 
          transitionProgress: 0 
        });
      }
    };
    
    requestAnimationFrame(animate);
  },
}));
