'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const certifications = [
  {
    name: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: '2024',
    credential: 'SAP-C02',
    description: 'Advanced architectural patterns and best practices for building secure, scalable applications on AWS.',
    skills: ['Cloud Architecture', 'Security', 'Scalability', 'Cost Optimization'],
    verifyUrl: '#',
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2024',
    credential: 'TF-DEV',
    description: 'Proficiency in building and training neural networks using TensorFlow for various ML tasks.',
    skills: ['Deep Learning', 'CNNs', 'RNNs', 'Transfer Learning'],
    verifyUrl: '#',
  },
  {
    name: 'Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2023',
    credential: 'CKA',
    description: 'Container orchestration, cluster management, and application deployment on Kubernetes.',
    skills: ['Container Orchestration', 'Cluster Management', 'Networking', 'Storage'],
    verifyUrl: '#',
  },
  {
    name: 'Professional Machine Learning Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    credential: 'PML-ENG',
    description: 'Designing, building, and productionizing ML models on Google Cloud Platform.',
    skills: ['MLOps', 'AutoML', 'Vertex AI', 'Data Pipelines'],
    verifyUrl: '#',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2022',
    credential: 'DL-SPEC',
    description: 'Comprehensive understanding of neural networks, CNNs, RNNs, and advanced deep learning techniques.',
    skills: ['Neural Networks', 'Computer Vision', 'NLP', 'Sequence Models'],
    verifyUrl: '#',
  },
  {
    name: 'Data Engineering Professional',
    issuer: 'Databricks',
    date: '2022',
    credential: 'DE-PRO',
    description: 'Building robust data pipelines and architectures using modern data engineering tools.',
    skills: ['Spark', 'Delta Lake', 'Data Pipelines', 'ETL'],
    verifyUrl: '#',
  },
  {
    name: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: '2022',
    credential: 'AI-102',
    description: 'Building, managing, and deploying AI solutions using Azure Cognitive Services.',
    skills: ['Azure AI', 'Cognitive Services', 'Bot Framework', 'Vision API'],
    verifyUrl: '#',
  },
  {
    name: 'MongoDB Developer Associate',
    issuer: 'MongoDB University',
    date: '2021',
    credential: 'M220JS',
    description: 'Database design, query optimization, and application development with MongoDB.',
    skills: ['NoSQL', 'Aggregation', 'Indexing', 'Data Modeling'],
    verifyUrl: '#',
  },
];

const skills = [
  { name: 'Cloud Platforms', level: 95 },
  { name: 'Machine Learning', level: 92 },
  { name: 'Deep Learning', level: 90 },
  { name: 'MLOps', level: 88 },
  { name: 'Data Engineering', level: 85 },
  { name: 'System Design', level: 85 },
];

interface CertificationCardProps {
  cert: typeof certifications[0];
  index: number;
}

function CertificationCard({ cert, index }: CertificationCardProps) {
  return (
    <motion.div
      className="group relative p-6 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white/90 text-lg font-light group-hover:text-white transition-colors">
            {cert.name}
          </h3>
          <p className="text-white/40 text-sm mt-1">{cert.issuer}</p>
        </div>
        <span className="text-white/20 text-sm">{cert.date}</span>
      </div>

      {/* Description */}
      <p className="text-white/35 text-sm leading-relaxed mb-4">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-[10px] text-white/40 border border-white/10 rounded tracking-wider"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-white/20 text-xs">{cert.credential}</span>
        <a
          href={cert.verifyUrl}
          className="text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          Verify →
        </a>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(100,150,200,0.05) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
}

export function CertificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10"
    >
      <div className="min-h-screen py-20 px-8 md:px-16 lg:px-24">
        {/* Header */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6 block">
              Certifications
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-4" delay={0.1}>
            <span className="block">Professional Credentials</span>
          </CinematicHeading>

          <CinematicText className="max-w-xl" delay={0.2}>
            Industry-recognized certifications validating expertise across cloud platforms,
            machine learning, and data engineering.
          </CinematicText>
        </section>

        {/* Certifications Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.credential} cert={cert} index={index} />
            ))}
          </div>
        </section>

        {/* Skills Progress */}
        <section className="py-16 border-t border-white/5">
          <CinematicHeading as="h3" className="text-white/60 mb-8">
            Expertise Levels
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">{skill.name}</span>
                  <span className="text-white/30 text-xs">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/30 to-white/60 rounded-full"
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
          className="py-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-white/80">12</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Certifications</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white/80">4</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Cloud Platforms</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white/80">100%</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Active</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
