'use client';

import { motion } from 'framer-motion';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const certifications = [
  {
    name: 'Deloitte Australia — Cyber Job Simulation',
    issuer: 'Forage / Deloitte',
    date: 'Aug 2025',
    credential: 'ID: dwwzw6ZMAxoTB5pdp',
    description: 'Completed hands-on cybersecurity simulation covering web activity log analysis, forensic cyber breach support, and suspicious user activity identification.',
    skills: ['Log Analysis', 'Breach Mitigation', 'Intrusion Detection'],
    verifyUrl: 'https://theforage.com',
  },
  {
    name: 'Ethical Hacking with AI',
    issuer: 'Internshala / NSDC (Government-Affiliated)',
    date: '2024',
    credential: 'NSDC Certified',
    description: 'Completed government-affiliated training in ethical hacking methodologies augmented with machine learning automation techniques.',
    skills: ['Metasploit', 'Nmap Scanning', 'AI Security scripting'],
    verifyUrl: 'https://internshala.com',
  },
  {
    name: 'Introduction to Artificial Intelligence',
    issuer: 'IBM',
    date: '2024',
    credential: 'IBM-AI-01',
    description: 'Foundational concepts of artificial intelligence, neural networks, machine learning models, and ethical AI applications.',
    skills: ['Machine Learning', 'Neural Networks', 'AI Ethics'],
    verifyUrl: 'https://coursera.org',
  },
  {
    name: 'Generative AI Fundamentals',
    issuer: 'Amazon Web Services (AWS)',
    date: '2024',
    credential: 'AWS-GENAI',
    description: 'Practical training covering prompt engineering, foundational models, LLM parameters, and AWS GenAI web services.',
    skills: ['LLMs', 'Prompt Engineering', 'Bedrock Foundation'],
    verifyUrl: 'https://aws.amazon.com',
  },
];

const skills = [
  { name: 'Full-Stack Development (Next.js/React)', level: 92 },
  { name: 'Deep Learning & ML Models (MesoNet)', level: 88 },
  { name: 'Ethical Hacking & Log Audits', level: 85 },
  { name: 'System Hardware Diagnostics', level: 90 },
  { name: 'Web3 & Cryptographic Provenance', level: 80 },
];

interface CertificationCardProps {
  cert: typeof certifications[0];
  index: number;
}

function CertificationCard({ cert, index }: CertificationCardProps) {
  return (
    <motion.div
      className="group relative p-7 rounded-xl border border-white/[0.04] hover:border-white/10 transition-all duration-500 bg-[#08080c]/50 backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-tl" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-br" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white/85 text-sm font-display font-medium group-hover:text-white/95 transition-colors">
            {cert.name}
          </h3>
          <p className="text-white/35 text-xs font-code mt-1">{cert.issuer}</p>
        </div>
        <span className="text-white/15 text-xs font-code">{cert.date}</span>
      </div>

      {/* Description */}
      <p className="text-white/35 text-xs leading-relaxed mb-4 font-code">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 text-[9px] text-white/30 border border-white/[0.04] rounded font-code uppercase tracking-wider"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-white/15 text-[10px] font-code">{cert.credential}</span>
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-white/25 text-xs font-code hover:text-white/60 transition-colors cursor-pointer"
        >
          Verify →
        </a>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(60,100,160,0.04) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
}

export function CertificationsPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/30 text-[11px] font-code tracking-[0.35em] uppercase mb-8 block">
            Validation Ledger
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Credentials</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
          Professional certifications and skills audits validating expertise in cybersecurity, deep learning automation, and full-stack software development.
        </CinematicText>
      </section>

      {/* Certifications Grid */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-5">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.name} cert={cert} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Progress */}
      <section className="py-16 border-t border-white/[0.04]">
        <CinematicHeading as="h3" className="text-white/25 text-[11px] font-code tracking-[0.3em] uppercase mb-10">
          Diagnostic Competencies
        </CinematicHeading>

        <div className="space-y-6 max-w-xl">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-white/50 font-display">{skill.name}</span>
                <span className="text-white/25 font-code">{skill.level}%</span>
              </div>
              <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/8 to-white/35 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <motion.section
        className="py-16 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-display font-light text-white/75">4</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Verified Badges</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/75">Government</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">NSDC / Skill India</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/75">100%</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Audit Clear</div>
          </div>
        </div>
      </motion.section>

      <div className="h-20" />
    </div>
  );
}
