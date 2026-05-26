'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPScroll() {
  const contextRef = useRef<gsap.Context | null>(null);

  const createScrollAnimation = useCallback((
    trigger: string | Element,
    animationConfig: {
      targets: string | Element;
      from?: gsap.TweenVars;
      to?: gsap.TweenVars;
      scrub?: boolean | number;
      pin?: boolean;
      start?: string;
      end?: string;
      markers?: boolean;
    }
  ) => {
    const { targets, from, to, scrub, pin, start, end, markers } = animationConfig;

    return gsap.fromTo(
      targets,
      from || {},
      {
        ...to,
        scrollTrigger: {
          trigger,
          start: start || 'top bottom',
          end: end || 'bottom top',
          scrub: scrub || false,
          pin: pin || false,
          markers: markers || false,
        },
      }
    );
  }, []);

  const createParallaxEffect = useCallback((
    container: string | Element,
    target: string | Element,
    speed: number = 0.5
  ) => {
    return gsap.to(target, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const createRevealAnimation = useCallback((
    target: string | Element,
    options?: {
      direction?: 'up' | 'down' | 'left' | 'right';
      distance?: number;
      duration?: number;
      stagger?: number;
    }
  ) => {
    const direction = options?.direction || 'up';
    const distance = options?.distance || 50;
    const duration = options?.duration || 1;
    const stagger = options?.stagger || 0.1;

    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const value = direction === 'up' || direction === 'left' ? distance : -distance;

    return gsap.from(target, {
      [axis]: value,
      opacity: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  const createTimeline = useCallback((
    trigger: string | Element,
    animations: Array<{
      target: string | Element;
      vars: gsap.TweenVars;
      position?: gsap.Position;
    }>,
    options?: {
      scrub?: boolean | number;
      pin?: boolean;
      start?: string;
      end?: string;
    }
  ) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: options?.start || 'top center',
        end: options?.end || 'bottom center',
        scrub: options?.scrub || false,
        pin: options?.pin || false,
      },
    });

    animations.forEach(({ target, vars, position }) => {
      tl.to(target, vars, position);
    });

    return tl;
  }, []);

  const killAll = useCallback(() => {
    if (contextRef.current) {
      contextRef.current.revert();
    }
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const refresh = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    return () => {
      killAll();
    };
  }, [killAll]);

  return {
    gsap,
    ScrollTrigger,
    createScrollAnimation,
    createParallaxEffect,
    createRevealAnimation,
    createTimeline,
    killAll,
    refresh,
  };
}
