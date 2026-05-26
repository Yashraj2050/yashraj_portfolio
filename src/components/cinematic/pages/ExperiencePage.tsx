'use client';

import { motion } from 'framer-motion';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const experiences = [
  {
    company: 'Fiverr (Freelance)',
    role: 'Web Designer & Full-Stack Developer',
    period: 'Aug 2025 - Present',
    location: 'Pune, India / Remote',
    description: 'Design and deploy custom, responsive full-stack applications catering to e-commerce, portfolios, and dashboard management solutions.',
    highlights: [
      'Delivered secure e-commerce systems with custom payment gateways and product inventory management panels.',
      'Optimized load speeds, client SEO tags, and responsive viewport sizing, resulting in high customer retention.',
      'Managed full deployment cycles, database schemas (MongoDB), and server integrations.',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    company: 'Self-Employed',
    role: 'Computer Hardware Specialist',
    period: 'Jan 2025 - Present',
    location: 'Pune, India / On-site',
    description: 'Diagnose and resolve system logic errors, hardware anomalies, and system configurations for private and business clients.',
    highlights: [
      'Install, upgrade, and benchmark hardware components to optimize rendering and compilation speeds.',
      'Debug operating system kernel panics, firmware locks, driver configurations, and BIOS settings.',
      'Refine local dev server rigs, establishing RAID storage arrays and backup pipelines.',
    ],
    technologies: ['BIOS Config', 'System Diagnostic', 'Linux Shell', 'Kernel Configurations'],
  },
  {
    company: 'MMIT Pune (Academic / Labs)',
    role: 'AI & Data Science Student / Project Lead',
    period: 'Sep 2024 - Present',
    location: 'Lohgaon, Pune, India',
    description: 'Undergoing B.E. training while leading cybersecurity simulations, deepfake validation platforms, and outreach programs.',
    highlights: [
      'Architected Fiduscan deepfake validator using MesoNet/XceptionNet and Web3.py for media verification.',
      'Co-led an 8-week Digital Literacy Drive teaching programming fundamentals and cyber safety to secondary school students.',
      'Won praise from Mrs. Pallavi Gulve for student guidance and technical leadership.',
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Ethereum', 'Web3.py', 'OpenCV', 'C++'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ExperiencePage() {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/30 text-[11px] font-code tracking-[0.35em] uppercase mb-8 block">
            Chronicle
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Journey Log</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-xs" delay={0.2}>
          Timeline detailing my freelancing activities, hardware diagnostics, and academic initiatives in Artificial Intelligence.
        </CinematicText>
      </section>

      {/* Experience Timeline */}
      <section className="relative">
        {/* Timeline line */}
        <div className="absolute left-[3px] md:left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent" />

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="relative pl-12 md:pl-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 top-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#06060a] border border-white/15"
                whileInView={{ scale: [0.8, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <div className="absolute inset-1 rounded-full bg-white/25" />
              </motion.div>

              <motion.div
                className="group p-7 md:p-8 rounded-xl border border-white/[0.04] hover:border-white/10 transition-all duration-500 bg-[#08080c]/50 backdrop-blur-md relative"
              >
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-tl" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-br" />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-white/85 text-sm font-display font-medium">
                      {exp.role}
                    </h3>
                    <p className="text-white/35 text-xs font-code mt-1">{exp.company}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-white/25 text-xs font-code">{exp.period}</span>
                    <br />
                    <span className="text-white/15 text-[10px] font-code">{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/35 text-xs leading-relaxed mb-6 font-code">
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-white/30 text-xs font-code"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <span className="text-white/15 mt-0.5">▪</span>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[9px] text-white/30 border border-white/[0.04] rounded font-code uppercase tracking-wider"
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
        className="mt-24 py-16 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-left md:text-center">
            <div className="text-3xl font-display font-light text-white/75">2+</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Years Actively Programming</div>
          </div>
          <div className="text-left md:text-center">
            <div className="text-3xl font-display font-light text-white/75">3</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Operational Nodes</div>
          </div>
          <div className="text-left md:text-center">
            <div className="text-3xl font-display font-light text-white/75">20+ Clients</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Worldwide Outreach</div>
          </div>
          <div className="text-left md:text-center">
            <div className="text-3xl font-display font-light text-white/75">100%</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Client Satisfaction</div>
          </div>
        </div>
      </motion.section>

      <div className="h-20" />
    </div>
  );
}
