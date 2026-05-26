'use client';

import { useEffect, useRef, useCallback } from 'react';
import { CinematicFlowEngine } from '@/lib/cinematic/flow-engine';
import { useCinematicStore } from '@/lib/cinematic/store';

export function useFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<CinematicFlowEngine | null>(null);
  const { setMousePosition } = useCinematicStore();

  const initEngine = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    engineRef.current = new CinematicFlowEngine(canvas, {
      intensity: 0.9,
      speed: 1,
      complexity: 0.7,
    });
    engineRef.current.start();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (engineRef.current) {
      engineRef.current.setMousePosition(e.clientX, e.clientY);
      setMousePosition(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    }
  }, [setMousePosition]);

  const handleResize = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.handleResize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, [handleMouseMove, handleResize]);

  return {
    canvasRef,
    initEngine,
    getEngine: () => engineRef.current,
  };
}
