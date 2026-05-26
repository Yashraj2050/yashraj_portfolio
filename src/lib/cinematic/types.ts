// Cinematic System Types

export interface MotionConfig {
  intensity: number;
  speed: number;
  complexity: number;
  colorScheme: 'dark' | 'midnight' | 'obsidian';
}

export interface FlowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

export interface FlowField {
  cols: number;
  rows: number;
  field: Float32Array;
  time: number;
}

export interface CinematicState {
  currentPage: string;
  transitionProgress: number;
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isTransitioning: boolean;
  reducedMotion: boolean;
}

export interface PageTransition {
  from: string;
  to: string;
  duration: number;
  easing: string;
}

export interface MotionTimeline {
  label: string;
  duration: number;
  animations: AnimationConfig[];
}

export interface AnimationConfig {
  target: string;
  property: string;
  from: number | string;
  to: number | string;
  duration: number;
  easing: string;
  delay?: number;
}

export type CinematicPage = 
  | 'home'
  | 'about'
  | 'projects'
  | 'research'
  | 'experience'
  | 'certifications'
  | 'contact';

export interface NavItem {
  id: CinematicPage;
  label: string;
  description: string;
}
