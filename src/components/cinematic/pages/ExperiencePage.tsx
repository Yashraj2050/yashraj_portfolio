'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const experiences = [
  {
    company: 'Tech Innovation Labs',
    role: 'Lead AI Engineer',
    period: '2023 - Present',
    location: 'San Francisco, CA',
    description: 'Leading a team of 12 engineers building next-generation AI systems. Architecting scalable ML infrastructure serving millions of users.',
    highlights: [
      'Designed and deployed production ML systems processing 10M+ predictions daily',
      'Reduced model inference latency by 60% through optimization techniques',
      'Established MLOps best practices adopted across the organization',
      'Mentored 5 junior engineers, 2 promoted to senior roles',
    ],
    technologies: ['Python', 'PyTorch', 'Kubernetes', 'AWS', 'MLflow'],
  },
  {
    company: 'Data Dynamics Inc.',
    role: 'Senior Machine Learning Engineer',
    period: '2021 - 2023',
    location: 'New York, NY',
    description: 'Built and maintained machine learning pipelines for real-time recommendation and personalization systems.',
    highlights: [
      'Developed recommendation engine improving CTR by 45%',
      'Implemented A/B testing framework for ML experiments',
      'Built real-time feature engineering pipeline with < 100ms latency',
      'Led migration from monolithic to microservices architecture',
    ],
    technologies: ['TensorFlow', 'Spark', 'Kafka', 'Redis', 'Docker'],
  },
  {
    company: 'Cognitive Systems Corp',
    role: 'AI Research Scientist',
    period: '2019 - 2021',
    location: 'Boston, MA',
    description: 'Conducted fundamental research in neural architecture optimization and transfer learning, publishing at top-tier venues.',
    highlights: [
      'Published 6 papers at NeurIPS, ICML, and ICLR',
      'Developed novel neural architecture search method cited 150+ times',
      'Collaborated with university research partners on grant proposals',
      'Presented research at 8 international conferences',
    ],
    technologies: ['PyTorch', 'Weights & Biases', 'Slurm', 'NumPy', 'JAX'],
  },
  {
    company: 'Digital Ventures',
    role: 'Software Engineer',
    period: '2018 - 2019',
    location: 'Seattle, WA',
    description: 'Full-stack development of web applications with focus on performance and user experience.',
    highlights: [
      'Built customer-facing dashboard used by 50K+ users',
      'Implemented real-time collaboration features using WebSockets',
      'Reduced page load time by 40% through code splitting and caching',
      'Contributed to open-source projects with 1K+ GitHub stars',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'TypeScript'],
  },
];

export function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10"
    >
      <div className="min-h-screen py-20 px-8 md:px-16 lg:px-24">
        {/* Header */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6 block">
              Experience
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-4" delay={0.1}>
            <span className="block">Professional Journey</span>
          </CinematicHeading>

          <CinematicText className="max-w-xl" delay={0.2}>
            A timeline of roles, responsibilities, and achievements across
            leading technology companies and research institutions.
          </CinematicText>
        </section>

        {/* Experience Timeline */}
        <section className="relative">
          {/* Animated line */}
          <div className="absolute left-[3px] md:left-[7px] top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              className="w-full bg-gradient-to-b from-white/40 via-white/20 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="relative pl-12 md:pl-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0a0a0f] border-2 border-white/30"
                  whileInView={{ scale: [0.8, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                />

                <motion.div
                  className="group p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/15 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20,20,25,0.5) 0%, rgba(15,15,20,0.6) 100%)',
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white/90 text-xl md:text-2xl font-light">
                        {exp.role}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white/30 text-sm">{exp.period}</span>
                      <br />
                      <span className="text-white/20 text-xs">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-white/35 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                      >
                        <span className="text-white/20 mt-1.5">▸</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[10px] text-white/40 border border-white/10 rounded-full tracking-wider uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Summary Stats */}
        <motion.section
          className="mt-20 py-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-light text-white/80">8+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Years</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-white/80">4</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-white/80">12+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Team Members Led</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-white/80">50+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Projects Delivered</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
