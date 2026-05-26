'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText, SplitText } from '../CinematicTypography';

const timeline = [
  {
    year: '2024',
    title: 'Lead AI Engineer',
    company: 'Tech Innovation Labs',
    description: 'Leading AI research and development initiatives, building next-generation intelligent systems.',
  },
  {
    year: '2022',
    title: 'Senior ML Engineer',
    company: 'Data Dynamics Inc.',
    description: 'Architected scalable machine learning pipelines processing millions of predictions daily.',
  },
  {
    year: '2020',
    title: 'AI Research Scientist',
    company: 'Cognitive Systems Corp',
    description: 'Published groundbreaking research in neural architecture optimization and transfer learning.',
  },
  {
    year: '2018',
    title: 'Software Engineer',
    company: 'Digital Ventures',
    description: 'Built full-stack applications with focus on performance and user experience.',
  },
];

const values = [
  {
    title: 'Innovation',
    description: 'Pushing boundaries of what\'s possible with AI and technology.',
    icon: '◈',
  },
  {
    title: 'Precision',
    description: 'Every line of code crafted with attention to detail and purpose.',
    icon: '◇',
  },
  {
    title: 'Impact',
    description: 'Building solutions that create meaningful change in the world.',
    icon: '◆',
  },
];

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10"
    >
      <div className="min-h-screen py-20 px-8 md:px-16 lg:px-24">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6 block">
              About Me
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-8" delay={0.2}>
            <span className="block">Building the Future,</span>
            <span className="block mt-2 text-white/80">One Algorithm at a Time</span>
          </CinematicHeading>

          <div className="max-w-3xl space-y-6">
            <SplitText className="text-white/50 text-xl leading-relaxed" delay={0.4}>
              I'm an AI engineer and researcher passionate about creating intelligent systems
              that seamlessly integrate into human workflows, enhancing capabilities rather
              than replacing them.
            </SplitText>

            <CinematicText delay={0.6}>
              With over 8 years of experience spanning machine learning, deep learning,
              and full-stack development, I bridge the gap between cutting-edge research
              and production-ready applications.
            </CinematicText>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <CinematicHeading as="h2" className="text-white/80 mb-16">
            Core Values
          </CinematicHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-3xl text-white/20 group-hover:text-white/40 transition-colors">
                  {value.icon}
                </span>

                <h3 className="text-white/90 text-xl font-light mt-4 mb-2">
                  {value.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed">
                  {value.description}
                </p>

                {/* Ambient glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(100,150,200,0.05) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <CinematicHeading as="h2" className="text-white/80 mb-16">
            Journey
          </CinematicHeading>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 top-1 w-4 h-4 rounded-full border border-white/30 bg-[#0a0a0f]"
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  >
                    <div className="absolute inset-1 rounded-full bg-white/60" />
                  </motion.div>

                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                    <span className="text-white/30 text-sm tracking-wider min-w-[60px]">
                      {item.year}
                    </span>

                    <div>
                      <h4 className="text-white/90 text-lg font-light">
                        {item.title}
                      </h4>
                      <span className="text-white/50 text-sm">
                        {item.company}
                      </span>
                      <p className="text-white/30 text-sm mt-2 max-w-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-6xl text-white/10 mb-8">&ldquo;</div>

            <p className="text-white/60 text-2xl md:text-3xl font-light leading-relaxed">
              The best technology disappears into the background,
              <span className="text-white/80"> becoming an invisible extension of human capability.</span>
            </p>

            <div className="text-white/30 text-sm mt-8 tracking-wider uppercase">
              Design Philosophy
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
