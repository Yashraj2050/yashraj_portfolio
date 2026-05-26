'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const publications = [
  {
    title: 'Efficient Neural Architecture Search for Edge Devices',
    venue: 'NeurIPS 2024',
    year: '2024',
    abstract: 'A novel approach to automated neural architecture design optimized for resource-constrained environments, achieving state-of-the-art accuracy-latency trade-offs.',
    citations: 45,
    category: 'Deep Learning',
    links: { paper: '#', code: '#' },
  },
  {
    title: 'Transfer Learning in Low-Data Regimes: A Systematic Study',
    venue: 'ICML 2024',
    year: '2024',
    abstract: 'Comprehensive analysis of transfer learning effectiveness across varying data availability scenarios, with practical guidelines for practitioners.',
    citations: 32,
    category: 'Machine Learning',
    links: { paper: '#' },
  },
  {
    title: 'Attention Mechanisms for Long-Form Document Understanding',
    venue: 'ACL 2023',
    year: '2023',
    abstract: 'Novel sparse attention patterns enabling efficient processing of documents exceeding 50,000 tokens without quality degradation.',
    citations: 89,
    category: 'NLP',
    links: { paper: '#', code: '#', dataset: '#' },
  },
  {
    title: 'Self-Supervised Visual Representation Learning from Video',
    venue: 'CVPR 2023',
    year: '2023',
    abstract: 'Temporal consistency as a supervisory signal for learning powerful visual representations without manual labeling.',
    citations: 156,
    category: 'Computer Vision',
    links: { paper: '#', code: '#' },
  },
  {
    title: 'Robust Object Detection in Adverse Weather Conditions',
    venue: 'ECCV 2023',
    year: '2023',
    abstract: 'Domain adaptation techniques for maintaining detection accuracy across fog, rain, and snow conditions.',
    citations: 78,
    category: 'Computer Vision',
    links: { paper: '#', code: '#', dataset: '#' },
  },
  {
    title: 'Federated Learning with Heterogeneous Data Distributions',
    venue: 'ICLR 2022',
    year: '2022',
    abstract: 'Methods for training global models across clients with significantly different data distributions while preserving privacy.',
    citations: 234,
    category: 'Machine Learning',
    links: { paper: '#', code: '#' },
  },
];

const researchAreas = [
  {
    title: 'Neural Architecture Optimization',
    description: 'Automated design of efficient neural networks for specific hardware and tasks.',
    icon: '⬡',
  },
  {
    title: 'Transfer & Meta-Learning',
    description: 'Algorithms that learn to learn, enabling rapid adaptation to new tasks.',
    icon: '◇',
  },
  {
    title: 'Efficient Deep Learning',
    description: 'Compression, quantization, and acceleration techniques for deployment at scale.',
    icon: '◈',
  },
  {
    title: 'Multimodal AI Systems',
    description: 'Models that understand and generate across text, images, and structured data.',
    icon: '⬢',
  },
];

interface PublicationCardProps {
  pub: typeof publications[0];
  index: number;
}

function PublicationCard({ pub, index }: PublicationCardProps) {
  return (
    <motion.article
      className="group relative p-6 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category badge */}
      <span className="text-[10px] text-white/30 uppercase tracking-wider">
        {pub.category}
      </span>

      {/* Title */}
      <h3 className="text-white/90 text-lg font-light mt-2 mb-3 group-hover:text-white transition-colors">
        {pub.title}
      </h3>

      {/* Venue & Year */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-white/50 text-sm">{pub.venue}</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-white/30 text-sm">{pub.year}</span>
      </div>

      {/* Abstract */}
      <p className="text-white/35 text-sm leading-relaxed mb-4 line-clamp-2">
        {pub.abstract}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {pub.links.paper && (
            <a href={pub.links.paper} className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Paper →
            </a>
          )}
          {pub.links.code && (
            <a href={pub.links.code} className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Code →
            </a>
          )}
          {pub.links.dataset && (
            <a href={pub.links.dataset} className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Dataset →
            </a>
          )}
        </div>

        <div className="text-white/30 text-xs">
          {pub.citations} citations
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(100,150,200,0.05) 0%, transparent 60%)',
        }}
      />
    </motion.article>
  );
}

export function ResearchPage() {
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
              Research
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-4" delay={0.1}>
            <span className="block">Pushing Boundaries</span>
          </CinematicHeading>

          <CinematicText className="max-w-xl" delay={0.2}>
            Exploring the frontiers of artificial intelligence through rigorous research
            and practical applications.
          </CinematicText>
        </section>

        {/* Research Areas */}
        <section className="mb-20">
          <CinematicHeading as="h3" className="text-white/60 mb-8">
            Focus Areas
          </CinematicHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                className="p-4 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <span className="text-2xl text-white/20">{area.icon}</span>
                <h4 className="text-white/70 text-sm font-light mt-2 mb-1">
                  {area.title}
                </h4>
                <p className="text-white/30 text-xs leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <CinematicHeading as="h3" className="text-white/60">
              Publications
            </CinematicHeading>
            <span className="text-white/30 text-sm">
              {publications.length} papers • {publications.reduce((a, p) => a + p.citations, 0)} citations
            </span>
          </div>

          <div className="space-y-4">
            {publications.map((pub, index) => (
              <PublicationCard key={pub.title} pub={pub} index={index} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          className="mt-20 py-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-white/80">15+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Publications</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white/80">600+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Citations</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white/80">5</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Top-Tier Venues</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
