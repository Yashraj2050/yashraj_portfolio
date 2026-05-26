'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
  reveal?: boolean;
  revealDirection?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
  staggerAmount?: number;
}

export function CinematicSection({
  children,
  className = '',
  id,
  parallax = false,
  parallaxSpeed = 0.3,
  reveal = false,
  revealDirection = 'up',
  stagger = false,
  staggerAmount = 0.1,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const ctx = gsap.context(() => {
      if (parallax) {
        gsap.to(content, {
          y: () => -window.innerHeight * parallaxSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (reveal) {
        const direction = revealDirection;
        const distance = 60;
        const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
        const value = direction === 'up' || direction === 'left' ? distance : -distance;

        if (stagger) {
          const children = content.children;
          gsap.from(children, {
            [axis]: value,
            opacity: 0,
            duration: 0.8,
            stagger: staggerAmount,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        } else {
          gsap.from(content, {
            [axis]: value,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, [parallax, parallaxSpeed, reveal, revealDirection, stagger, staggerAmount]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    const layer = layerRef.current;
    const ctx = gsap.context(() => {
      gsap.to(layer, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, layer);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const progress = progressRef.current;
    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-50 ${className}`}>
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white/40 to-white/60 origin-left scale-x-0"
      />
    </div>
  );
}
