'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface CinematicHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  delay?: number;
}

export function CinematicHeading({ 
  children, 
  as: Tag = 'h1', 
  className = '',
  delay = 0 
}: CinematicHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const headingStyles = {
    h1: 'text-5xl md:text-7xl lg:text-8xl font-light tracking-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-light tracking-tight',
    h3: 'text-2xl md:text-3xl font-light tracking-tight',
    h4: 'text-xl md:text-2xl font-light tracking-tight',
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)' 
        } : {}}
        transition={{ 
          duration: 1, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        <Tag className={`${headingStyles[Tag]} ${className}`}>
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

interface CinematicTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export function CinematicText({ 
  children, 
  className = '',
  delay = 0,
  animate = true
}: CinematicTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  if (!animate) {
    return (
      <p className={`text-white/60 text-lg leading-relaxed ${className}`}>
        {children}
      </p>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        className={`text-white/60 text-lg leading-relaxed ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.p>
    </div>
  );
}

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerAmount?: number;
}

export function SplitText({ 
  children, 
  className = '',
  delay = 0,
  staggerAmount = 0.03
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={isVisible ? { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)' 
              } : {}}
              transition={{
                duration: 0.6,
                delay: delay + (wordIndex * 3 + charIndex) * staggerAmount,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}

interface CounterTextProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function CounterText({ 
  value, 
  suffix = '', 
  prefix = '',
  className = '',
  duration = 2
}: CounterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
