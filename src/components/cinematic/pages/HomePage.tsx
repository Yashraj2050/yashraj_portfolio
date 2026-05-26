'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, SplitText, CounterText } from '../CinematicTypography';
import { useCinematicStore } from '@/lib/cinematic/store';

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '+', label: 'Research Papers' },
  { value: 12, suffix: '', label: 'Certifications' },
];

const skills = [
  'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP',
  'React', 'Next.js', 'TypeScript', 'Python',
  'TensorFlow', 'PyTorch', 'AWS', 'Docker'
];

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const { triggerPageTransition } = useCinematicStore();

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10"
    >
      <div className="min-h-screen py-20 px-8 md:px-16 lg:px-24">
        {/* Hero Section */}
        <motion.section
          className="min-h-[80vh] flex flex-col justify-center relative"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6 block">
              AI Engineer & Researcher
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-6" delay={0.4}>
            <span className="block">Crafting Intelligent</span>
            <span className="block mt-2 text-white/90">Digital Experiences</span>
          </CinematicHeading>

          <div className="max-w-2xl mt-8">
            <SplitText className="text-white/50 text-xl leading-relaxed" delay={0.8}>
              Building the intersection of artificial intelligence and human-centered design.
              Creating systems that think, learn, and evolve.
            </SplitText>
          </div>

          <motion.div
            className="flex gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => triggerPageTransition('projects')}
            >
              View Projects
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-white text-black rounded-lg text-sm tracking-wider uppercase font-medium hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => triggerPageTransition('contact')}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-32"
          style={{ y: statsY, opacity: statsOpacity }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <CounterText
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-light text-white/90"
                  duration={2}
                />
                <p className="text-white/40 text-sm mt-2 tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <section className="py-20">
          <CinematicHeading as="h3" className="text-white/60 mb-8">
            Core Expertise
          </CinematicHeading>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 text-sm text-white/50 border border-white/10 rounded-full hover:border-white/30 hover:text-white/80 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Featured Work Preview */}
        <section className="py-20">
          <div className="flex items-center justify-between mb-12">
            <CinematicHeading as="h3" className="text-white/80">
              Featured Work
            </CinematicHeading>
            <motion.button
              className="text-white/40 text-sm tracking-wider uppercase hover:text-white/80 transition-colors"
              whileHover={{ x: 5 }}
              onClick={() => triggerPageTransition('projects')}
            >
              View All →
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => triggerPageTransition('projects')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-white/40 text-xs tracking-wider uppercase mb-2">
                    AI / Machine Learning
                  </span>
                  <h4 className="text-white/90 text-xl font-light">
                    Project {i}
                  </h4>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(100,150,200,0.1) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
