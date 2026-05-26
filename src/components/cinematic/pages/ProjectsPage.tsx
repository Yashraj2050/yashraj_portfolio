'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const projects = [
  {
    id: 1,
    title: 'Neural Vision Platform',
    category: 'AI / Computer Vision',
    year: '2024',
    description: 'Real-time object detection and scene understanding system powered by custom neural architectures.',
    tags: ['PyTorch', 'YOLO', 'CUDA', 'Real-time'],
    metrics: { accuracy: '98.5%', latency: '12ms', scale: '1M+ images/day' },
  },
  {
    id: 2,
    title: 'Conversational AI Engine',
    category: 'NLP / Machine Learning',
    year: '2024',
    description: 'Enterprise-grade conversational AI with context awareness and multi-turn reasoning capabilities.',
    tags: ['Transformers', 'BERT', 'RAG', 'Fine-tuning'],
    metrics: { satisfaction: '94%', response: '< 500ms', users: '50K+' },
  },
  {
    id: 3,
    title: 'Predictive Analytics Suite',
    category: 'ML / Data Science',
    year: '2023',
    description: 'End-to-end predictive modeling platform for business intelligence and forecasting.',
    tags: ['Python', 'Scikit-learn', 'Time Series', 'AutoML'],
    metrics: { accuracy: '96%', prediction: '30 days', roi: '340%' },
  },
  {
    id: 4,
    title: 'Autonomous Decision System',
    category: 'AI / Automation',
    year: '2023',
    description: 'Self-learning decision engine for complex business logic and process automation.',
    tags: ['Reinforcement Learning', 'Decision Trees', 'API'],
    metrics: { automation: '85%', savings: '$2M/yr', uptime: '99.99%' },
  },
  {
    id: 5,
    title: 'Intelligent Document Processing',
    category: 'AI / NLP',
    year: '2023',
    description: 'OCR and natural language understanding for automated document classification and extraction.',
    tags: ['OCR', 'NER', 'LayoutLM', 'Cloud'],
    metrics: { accuracy: '99.2%', speed: '100 docs/min', languages: '12' },
  },
  {
    id: 6,
    title: 'Real-time Recommendation Engine',
    category: 'ML / Personalization',
    year: '2022',
    description: 'Scalable recommendation system with collaborative filtering and deep learning approaches.',
    tags: ['Collaborative Filtering', 'Embeddings', 'Redis', 'Kubernetes'],
    metrics: { ctr: '+45%', coverage: '92%', latency: '< 50ms' },
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full p-8 rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(20,20,25,0.8) 0%, rgba(15,15,20,0.9) 100%)',
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(100,150,200,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-white/30 text-xs tracking-wider uppercase">
                {project.category}
              </span>
              <h3 className="text-white/90 text-xl font-light mt-1">
                {project.title}
              </h3>
            </div>
            <span className="text-white/20 text-sm">{project.year}</span>
          </div>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex gap-6 mb-6">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-white/80 text-lg font-light">{value}</div>
                <div className="text-white/30 text-[10px] uppercase tracking-wider">{key}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] text-white/40 border border-white/10 rounded-full tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Border highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const categories = [...new Set(projects.map(p => p.category.split(' / ')[0]))];
  const filteredProjects = filter
    ? projects.filter(p => p.category.includes(filter))
    : projects;

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
              Portfolio
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-4" delay={0.1}>
            <span className="block">Selected Projects</span>
          </CinematicHeading>

          <CinematicText className="max-w-xl" delay={0.2}>
            A curated collection of AI systems, machine learning platforms,
            and intelligent applications built to solve real-world challenges.
          </CinematicText>
        </section>

        {/* Filters */}
        <motion.div
          className="flex gap-3 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
              filter === null
                ? 'border-white/30 text-white/80'
                : 'border-white/10 text-white/40 hover:border-white/20'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                filter === cat
                  ? 'border-white/30 text-white/80'
                  : 'border-white/10 text-white/40 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.section
          className="mt-24 py-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light text-white/80">50+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white/80">8</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Years</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white/80">99%</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white/80">$10M+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider mt-1">Value Created</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
