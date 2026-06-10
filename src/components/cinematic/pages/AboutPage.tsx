'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText, SplitText } from '../CinematicTypography';
import { useCinematicStore } from '@/lib/cinematic/store';

const timeline = [
  {
    year: '2025 - Present',
    title: 'Full-Stack Developer & Freelancer',
    company: 'Fiverr (Remote)',
    description: 'Developing custom Next.js e-commerce platforms and performance-optimized React interfaces for global clients.',
  },
  {
    year: '2025 - Present',
    title: 'Computer Hardware Specialist',
    company: 'Self-Employed (Pune)',
    description: 'Diagnosing system logic errors, performing complex component upgrades, and troubleshooting OS kernel configurations.',
  },
  {
    year: '2024 - Present',
    title: 'B.E. Student in AI & Data Science',
    company: 'MMIT Pune (Lohgaon)',
    description: 'Focusing on deep learning algorithms, statistics, cybersecurity simulation frameworks, and network security.',
  },
  {
    year: '2024',
    title: 'Ethical Hacking with AI & Digital Literacy',
    company: 'Internshala Trainings / NSDC',
    description: 'Completed government-affiliated training augmenting defensive security methodologies with automated AI scripts.',
  },
];

const values = [
  {
    title: 'Zero-Trust Protocol',
    description: 'Security is not an afterthought. Never trust, always verify at every node, API edge, and storage layer.',
    icon: '⬢',
  },
  {
    title: 'Decentralization First',
    description: 'Fascinated by onion routing, remailers, and distributed networks. Designing to prevent centralized censorship.',
    icon: '◇',
  },
  {
    title: 'Empowerment through Literacy',
    description: 'Co-led an 8-week awareness drive to teach digital literacy, security hygiene, and coding to high schoolers.',
    icon: '◈',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function AboutPage() {
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
  const { triggerPageTransition } = useCinematicStore();

  return (
    <div className="min-h-screen py-20 pb-28 md:pb-20">
      {/* Hero Section */}
      <motion.section
        className="min-h-[55vh] flex flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <span className="text-white/40 text-[11px] font-code tracking-[0.35em] uppercase mb-6 block">
            About Me
          </span>
        </motion.div>

        <motion.div variants={fadeUp}>
          <CinematicHeading as="h1" className="text-white mb-6 font-display" delay={0.2}>
            <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Securing Assets,</span>
            <span className="block mt-2 text-white/60 font-extralight text-3xl md:text-4xl lg:text-5xl italic">Structuring Code</span>
          </CinematicHeading>
        </motion.div>

        <motion.div className="max-w-3xl space-y-5" variants={fadeUp}>
          <SplitText className="text-white/55 text-lg leading-relaxed font-display font-light" delay={0.3}>
            I am Yashraj Kuyate, a Pune-based student specializing in Artificial Intelligence and Data Science, with a keen focus on ethical hacking, zero-trust infrastructure, and responsive web development.
          </SplitText>

          <CinematicText delay={0.5} className="font-code text-sm">
            Whether optimizing neural models for media validation or engineering robust web applications using React and Next.js, I approach programming through the lens of technical discipline, absolute precision, and system security.
          </CinematicText>
          
          {/* Quick Recruiter Summary */}
          <motion.div className="mt-10 pt-8 border-t border-white/[0.05] flex flex-wrap gap-x-12 gap-y-6" variants={fadeUp}>
            <div>
              <span className="text-white/30 text-[9px] font-code uppercase tracking-[0.2em] block mb-1.5">Focus</span>
              <span className="text-white/80 text-sm font-display tracking-wide">AI Security & Full-Stack</span>
            </div>
            <div>
              <span className="text-white/30 text-[9px] font-code uppercase tracking-[0.2em] block mb-1.5">Experience</span>
              <span className="text-white/80 text-sm font-display tracking-wide">2+ Years (Freelance)</span>
            </div>
            <div>
              <span className="text-white/30 text-[9px] font-code uppercase tracking-[0.2em] block mb-1.5">Location</span>
              <span className="text-white/80 text-sm font-display tracking-wide">Pune, India (Remote OK)</span>
            </div>
          </motion.div>

          {/* Connect & Resume Actions */}
          <motion.div className="flex flex-wrap items-center gap-4 mt-8" variants={fadeUp}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white/[0.04] border border-white/20 rounded-lg text-white/90 text-xs tracking-wider uppercase font-display hover:bg-white/[0.08] hover:border-white/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View Resume</span>
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Yashraj_Kuyate_Resume.pdf"
              className="px-6 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white/60 text-xs tracking-wider uppercase font-display hover:bg-white/[0.05] hover:border-white/12 hover:text-white/80 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Download Resume</span>
            </a>
            
            <div className="w-px h-8 bg-white/[0.1] mx-2 hidden sm:block" />

            <a href="https://linkedin.com/in/yashraj-kuyate-b24b0331b" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-white/50 hover:text-white/90">
              in
            </a>
            <a href="https://github.com/Yashraj2050" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-white/50 hover:text-white/90">
              gh
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        ref={valuesRef}
        className="py-20 border-t border-white/[0.04]"
        initial="hidden"
        animate={valuesInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase mb-12">
            Core Values
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="group relative p-7 rounded-xl border border-white/[0.04] hover:border-white/10 transition-all bg-[#08080c]/30"
              variants={fadeUp}
            >
              <span className="text-2xl text-white/20 group-hover:text-white/55 transition-colors duration-500">
                {value.icon}
              </span>

              <h3 className="text-white/85 text-lg font-display font-light mt-5 mb-3">
                {value.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed font-code">
                {value.description}
              </p>

              {/* Animated corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-tl" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-br" />

              {/* Ambient glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(60,100,160,0.04) 0%, transparent 60%)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        ref={timelineRef}
        className="py-20 border-t border-white/[0.04]"
        initial="hidden"
        animate={timelineInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase mb-12">
            Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-white/15 via-white/5 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                className="relative pl-12"
                variants={fadeUp}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full border border-white/15 bg-[#06060a]"
                  whileInView={{ scale: [0.8, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                >
                  <div className="absolute inset-1.5 rounded-full bg-white/30" />
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <span className="text-white/30 text-xs font-code tracking-wider min-w-[120px]">
                    {item.year}
                  </span>

                  <div>
                    <h4 className="text-white/85 text-sm font-display font-medium">
                      {item.title}
                    </h4>
                    <span className="text-white/45 text-xs font-code">
                      {item.company}
                    </span>
                    <p className="text-white/35 text-xs mt-2 max-w-lg leading-relaxed font-code">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="py-20 border-t border-white/[0.04]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-4xl text-white/8 mb-8 font-code">&lt;/&gt;</div>

          <p className="text-white/55 text-lg md:text-xl font-display font-light leading-relaxed italic">
            &quot;The most secure networks are those that treat every packet as public, and yet render it fully private through mathematical rigor.&quot;
          </p>

          <div className="text-white/25 text-[10px] mt-8 font-code tracking-[0.3em] uppercase">
            Operational Axiom
          </div>
        </motion.div>
      </section>

      {/* Visitor Journey CTA */}
      <motion.section
        className="py-16 border-t border-white/[0.04] text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-white/40 text-sm font-code mb-8 max-w-md mx-auto">
          See these principles applied in production environments.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => triggerPageTransition('projects')}
            className="px-8 py-3.5 bg-white text-[#06060a] rounded-lg text-sm tracking-[0.15em] uppercase font-display font-semibold hover:bg-white/90 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            View Projects
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-white/[0.04] border border-white/15 rounded-lg text-white/80 text-sm tracking-[0.15em] uppercase font-display hover:bg-white/[0.08] hover:border-white/30 transition-all cursor-pointer flex items-center gap-2"
          >
            View CV
          </a>
          <a
            href="/resume.pdf"
            download="Yashraj_Kuyate_Resume.pdf"
            className="px-8 py-3.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white/60 text-sm tracking-[0.15em] uppercase font-display hover:bg-white/[0.05] hover:border-white/15 hover:text-white/80 transition-all cursor-pointer flex items-center gap-2"
          >
            Download CV
          </a>
        </div>
      </motion.section>

      <div className="h-10" />
    </div>
  );
}
