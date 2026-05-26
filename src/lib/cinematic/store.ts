import { create } from 'zustand';
import type { CinematicPage, CinematicState } from './types';

const pageVideoMap: Record<CinematicPage, string> = {
  home: '/videos/hero.mp4',
  about: '/videos/vision.mp4',
  projects: '/videos/projects.mp4',
  research: '/videos/vision.mp4',
  experience: '/videos/journey.mp4',
  certifications: '/videos/skills.mp4',
  contact: '/videos/contact.mp4',
};

interface CinematicStore extends CinematicState {
  setCurrentPage: (page: CinematicPage) => void;
  setTransitionProgress: (progress: number) => void;
  setScrollProgress: (progress: number) => void;
  setMousePosition: (x: number, y: number) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  setWipePhase: (phase: CinematicState['wipePhase']) => void;
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
  activeVideo: '/videos/hero.mp4',
  nextVideo: null,
  wipePhase: 'idle',

  setCurrentPage: (page) => set({ 
    currentPage: page,
    activeVideo: pageVideoMap[page] || '/videos/hero.mp4'
  }),
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  setWipePhase: (phase) => set({ wipePhase: phase }),

  triggerPageTransition: (to) => {
    const { currentPage, isTransitioning } = get();
    if (currentPage === to || isTransitioning) return;
    
    const targetVideo = pageVideoMap[to] || '/videos/hero.mp4';
    set({ 
      isTransitioning: true, 
      transitionProgress: 0, 
      nextVideo: targetVideo,
      wipePhase: 'wipe-in',
    });
    
    // Phase 1: Wipe curtain slides in (0-500ms)
    // Phase 2: Hold — swap page and video (500-800ms)  
    // Phase 3: Wipe curtain slides out (800-1400ms)
    const wipeInDuration = 500;
    const holdDuration = 300;
    const wipeOutDuration = 600;
    const totalDuration = wipeInDuration + holdDuration + wipeOutDuration;
    const startTime = Date.now();
    let pageSwapped = false;
    let wipeOutStarted = false;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Phase 2: Hold — swap page at midpoint
      if (elapsed >= wipeInDuration && !pageSwapped) {
        pageSwapped = true;
        set({ 
          currentPage: to,
          activeVideo: targetVideo,
          nextVideo: null,
          wipePhase: 'hold',
        });
      }
      
      // Phase 3: Wipe out
      if (elapsed >= wipeInDuration + holdDuration && !wipeOutStarted) {
        wipeOutStarted = true;
        set({ wipePhase: 'wipe-out' });
      }
      
      set({ transitionProgress: progress });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        set({ 
          isTransitioning: false, 
          transitionProgress: 0,
          wipePhase: 'idle',
        });
      }
    };
    
    requestAnimationFrame(animate);
  },
}));

