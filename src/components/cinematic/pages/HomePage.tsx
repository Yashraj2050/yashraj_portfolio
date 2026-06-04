'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText, CounterText } from '../CinematicTypography';
import { useCinematicStore } from '@/lib/cinematic/store';
import { InteractiveConsole } from '../InteractiveConsole';

const stats = [
  { value: 2, suffix: '+', label: 'Years Freelance Dev' },
  { value: 4, suffix: '', label: 'Professional Certifications' },
  { value: 7, suffix: '-Part', label: 'Hidden Networks Series' },
  { value: 1500, suffix: '+', label: 'Research Impressions' },
];

const skills = [
  'Ethical Hacking', 'Zero-Trust Architecture', 'Onion Routing',
  'Next.js', 'React', 'Tailwind CSS', 'Framer Motion',
  'Deep Learning', 'Computer Vision', 'XceptionNet', 'MesoNet',
  'Ethereum', 'Web3.py', 'Python', 'C++', 'Hardware Diagnostics',
];

// Stagger animation container
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomePage() {
  const { triggerPageTransition } = useCinematicStore();
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen py-20 relative flex flex-col justify-between">

      {/* ==================== HERO SECTION ==================== */}
      <motion.section
        className="min-h-[80vh] flex flex-col justify-center relative z-10 py-12"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="grid xl:grid-cols-12 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Portrait Frame */}
          <motion.div
            className="xl:col-span-3 lg:col-span-5 flex justify-center lg:justify-start relative group"
            variants={fadeUp}
          >
            {/* Outer Glowing Cyber Frame */}
            <div className="relative w-64 h-80 md:w-72 md:h-96 aspect-[3/4] rounded-2xl border border-white/5 bg-[#0a0a0f]/40 backdrop-blur-md p-2.5 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-white/10 group-hover:shadow-[0_0_50px_rgba(60,100,160,0.15)]">

              {/* Sci-Fi Grid Overlay Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-20 opacity-70 group-hover:opacity-30 transition-opacity duration-700 rounded-xl" />

              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-scanline pointer-events-none z-20 opacity-5" />

              {/* Glowing Corner Accents */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-l border-t border-white/10 group-hover:border-white/30 transition-all duration-500 rounded-tl z-30" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-r border-b border-white/10 group-hover:border-white/30 transition-all duration-500 rounded-br z-30" />

              {/* Profile Image itself */}
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="/yashraj.jpg"
                  alt="Yashraj Dnyaneshwar Kuyate"
                  className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.85] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 select-none scale-[1.02] group-hover:scale-100"
                />

                {/* Visual Glitch Layer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/90 via-transparent to-transparent z-10" />
              </div>
            </div>

            {/* Glowing radial gradient backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent rounded-3xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
          </motion.div>

          {/* Right Column Text Content */}
          <div className="xl:col-span-5 lg:col-span-7 flex flex-col justify-center">
            {/* Name and roles — primary identity, always visible at a glance */}
            <motion.div variants={fadeUp} className="mb-6">
              <h2 className="text-white/95 text-2xl md:text-3xl lg:text-4xl font-display font-light tracking-[0.2em] uppercase mb-3">
                Yashraj Kuyate
              </h2>
              <span className="text-white/50 text-[11px] font-code tracking-[0.3em] uppercase block">
                AI Researcher · Ethical Hacker · Full-Stack Developer
              </span>
            </motion.div>

            {/* Main Tagline */}
            <motion.div variants={fadeUp}>
              <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.2}>
                <span className="block font-light text-5xl md:text-6xl lg:text-7xl">Evolving Web</span>
                <span className="block mt-2 text-white/60 font-extralight text-4xl md:text-5xl lg:text-6xl italic">Infrastructure</span>
              </CinematicHeading>
            </motion.div>

            {/* One-liner description — plain text, immediately readable */}
            <motion.div className="max-w-2xl mt-6" variants={fadeUp}>
              <CinematicText className="text-white/50 text-base leading-relaxed font-display font-light" delay={0.3}>
                Building the intersection of deep learning security, zero-trust architectures, and privacy-first web infrastructure.
              </CinematicText>
            </motion.div>

            {/* CTA Buttons Row — clear visual hierarchy: primary → secondary → tertiary */}
            <motion.div
              className="flex flex-wrap gap-3 mt-10"
              variants={fadeUp}
            >
              {/* Primary CTA — solid white, highest contrast */}
              <motion.button
                className="px-7 py-3 bg-white text-[#06060a] rounded-lg text-sm tracking-wider uppercase font-display font-semibold hover:bg-white/90 transition-all cursor-pointer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => triggerPageTransition('contact')}
              >
                Get In Touch
              </motion.button>

              {/* Secondary CTA — bordered */}
              <motion.button
                className="px-7 py-3 bg-white/[0.04] border border-white/15 rounded-lg text-white/80 text-sm tracking-wider uppercase font-display hover:bg-white/[0.08] hover:border-white/25 transition-all cursor-pointer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => triggerPageTransition('projects')}
              >
                View Projects
              </motion.button>

              {/* Tertiary CTA — subtle */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white/55 text-sm tracking-wider uppercase font-display hover:bg-white/[0.05] hover:border-white/12 hover:text-white/75 transition-all cursor-pointer flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Resume</span>
                <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column Interactive Systems Console */}
          <motion.div
            className="xl:col-span-4 lg:col-span-12 flex justify-center xl:justify-end mt-8 xl:mt-0 w-full"
            variants={fadeUp}
          >
            <InteractiveConsole />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[9px] font-code text-white/20 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      {/* ==================== STATS SECTION ==================== */}
      <motion.section
        ref={statsRef}
        className="py-16 border-t border-white/[0.04]"
        initial="hidden"
        animate={statsInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-left md:text-center group"
              variants={fadeUp}
            >
              <div className="relative">
                <CounterText
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/85 font-code"
                  duration={2}
                />
                <div className="absolute -bottom-2 left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="text-white/40 text-[10px] uppercase font-code tracking-[0.2em] mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==================== SKILLS SECTION ==================== */}
      <motion.section
        ref={skillsRef}
        className="py-16 border-t border-white/[0.04]"
        initial="hidden"
        animate={skillsInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h3 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase mb-8">
            Core Skills
          </h3>
        </motion.div>

        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="px-4 py-2 text-xs text-white/45 border border-white/[0.06] rounded-md hover:border-white/20 hover:text-white/80 hover:bg-white/[0.02] transition-all cursor-default font-code"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.025,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* ==================== FEATURED PROJECTS ==================== */}
      <motion.section
        ref={featuredRef}
        className="py-16 border-t border-white/[0.04]"
        initial="hidden"
        animate={featuredInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.div className="flex items-center justify-between mb-10" variants={fadeUp}>
          <h3 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase">
            Featured Projects
          </h3>
          <motion.button
            className="text-white/45 text-[11px] font-code tracking-wider uppercase hover:text-white/75 transition-colors cursor-pointer flex items-center gap-2 group"
            whileHover={{ x: 4 }}
            onClick={() => triggerPageTransition('projects')}
          >
            All Projects
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fiduscan Card */}
          <motion.div
            className="group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
            variants={fadeUp}
            whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
            onClick={() => triggerPageTransition('projects')}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14]/20 to-[#0c0c14]/70 border border-white/[0.04] rounded-xl transition-all group-hover:border-white/10 z-10" />

            {/* Animated corner accents on hover */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/0 group-hover:border-white/20 transition-all duration-500 z-20 rounded-tl" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/0 group-hover:border-white/20 transition-all duration-500 z-20 rounded-br" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-7 flex flex-col justify-end z-20">
              <span className="text-white/35 text-[10px] font-code tracking-[0.2em] uppercase mb-2">
                AI Deepfake & Authenticity Verification
              </span>
              <h4 className="text-white/90 text-2xl font-display font-light">
                Fiduscan
              </h4>
              <p className="text-white/45 text-xs mt-1.5 line-clamp-1 font-code">
                Blockchain fingerprinting & MesoNet deepfake detection.
              </p>
              <span className="mt-3 text-[10px] font-code text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1">
                View project →
              </span>
            </div>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
              style={{
                background: 'radial-gradient(circle at 50% 80%, rgba(60,100,160,0.1) 0%, transparent 60%)',
              }}
            />
          </motion.div>

          {/* Hidden Networks Card */}
          <motion.div
            className="group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
            variants={fadeUp}
            whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
            onClick={() => triggerPageTransition('research')}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14]/20 to-[#0c0c14]/70 border border-white/[0.04] rounded-xl transition-all group-hover:border-white/10 z-10" />

            {/* Animated corner accents on hover */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/0 group-hover:border-white/20 transition-all duration-500 z-20 rounded-tl" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/0 group-hover:border-white/20 transition-all duration-500 z-20 rounded-br" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-7 flex flex-col justify-end z-20">
              <span className="text-white/35 text-[10px] font-code tracking-[0.2em] uppercase mb-2">
                Decentralized Network Research
              </span>
              <h4 className="text-white/90 text-2xl font-display font-light">
                Hidden Networks
              </h4>
              <p className="text-white/45 text-xs mt-1.5 line-clamp-1 font-code">
                Analysis of Freenet, I2P, ZeroNet, Usenet & Cypherpunk Remailers.
              </p>
              <span className="mt-3 text-[10px] font-code text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1">
                View research →
              </span>
            </div>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
              style={{
                background: 'radial-gradient(circle at 50% 80%, rgba(60,100,160,0.1) 0%, transparent 60%)',
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom spacer for mobile nav clearance */}
      <div className="h-20 md:h-10" />
    </div>
  );
}
