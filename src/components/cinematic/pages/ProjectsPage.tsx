'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const projects = [
  {
    id: 1,
    title: 'Fiduscan (AI Deepfake & Content Detection)',
    category: 'AI / Blockchain',
    year: '2025 - Present',
    description: 'AI-powered deepfake media detection system paired with Ethereum smart contracts to ensure cryptographic provenance and authenticity validation.',
    tags: ['TensorFlow', 'PyTorch', 'XceptionNet', 'MesoNet', 'Web3.py', 'Ethereum', 'OpenCV'],
    metrics: { models: 'MesoNet/XceptionNet', security: 'Tamper-Proof', blockchain: 'Ethereum' },
  },
  {
    id: 2,
    title: 'Gaming E-Commerce Platform',
    category: 'Frontend / Interaction',
    year: '2025',
    description: 'Highly responsive, performance-optimized user interface for gaming gear e-commerce, utilizing micro-animations and smooth layout transitions.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    metrics: { rendering: 'SSR / ISR', performance: '100% Lighthouse', transitions: 'Framer Motion' },
  },
  {
    id: 3,
    title: 'Dynamic SaaS Client Dashboard',
    category: 'Freelance / Full-Stack',
    year: '2025',
    description: 'Delivered a custom admin panel and data management dashboard on Fiverr with Stripe payment integrations and speed-optimized deployment pipelines.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    metrics: { satisfaction: '100%', database: 'MongoDB', API: 'RESTful' },
  },
  {
    id: 4,
    title: 'Hardware Optimization Scripts',
    category: 'Automation / Systems',
    year: '2025',
    description: 'Custom CLI diagnostics suite to perform system checkups, analyze device logs, and recommend BIOS modifications for high-performance servers.',
    tags: ['Python', 'Bash', 'Hardware Diagnostic', 'Linux Shell'],
    metrics: { analysis: 'Automated', logging: 'Log Analyzer', systems: 'Ubuntu/Windows' },
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

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
        className="relative h-full p-8 rounded-xl border border-white/[0.04] overflow-hidden cursor-pointer bg-[#08080c]/50 backdrop-blur-md"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(60,100,160,0.05) 0%, transparent 60%)',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-tl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-br" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-white/25 text-[10px] font-code tracking-[0.2em] uppercase">
                {project.category}
              </span>
              <h3 className="text-white/85 text-lg font-display font-light mt-1.5">
                {project.title}
              </h3>
            </div>
            <span className="text-white/15 text-xs font-code">{project.year}</span>
          </div>

          {/* Description */}
          <p className="text-white/35 text-xs leading-relaxed mb-6 font-code">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-6 border-t border-b border-white/[0.04] py-4">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-left">
                <div className="text-white/70 text-xs font-display font-light truncate">{value}</div>
                <div className="text-white/15 text-[9px] font-code uppercase tracking-wider mt-0.5">{key}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[9px] text-white/30 border border-white/[0.04] rounded font-code uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Border highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const categories = ['AI', 'Frontend', 'Freelance', 'Automation'];
  const filteredProjects = filter
    ? projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()))
    : projects;

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
            Repository
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Deployments & Projects</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
          A catalog of security architectures, web services, and machine learning platforms built to solve real-world problems.
        </CinematicText>
      </section>

      {/* Filters */}
      <motion.div
        className="flex gap-2.5 mb-14 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-1.5 text-xs font-code rounded-md border cursor-pointer transition-all ${
            filter === null
              ? 'border-white/15 text-white/75 bg-white/[0.04]'
              : 'border-white/[0.04] text-white/35 hover:border-white/15'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 text-xs font-code rounded-md border cursor-pointer transition-all ${
              filter === cat
                ? 'border-white/15 text-white/75 bg-white/[0.04]'
                : 'border-white/[0.04] text-white/35 hover:border-white/15'
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
        className="mt-24 py-16 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-left md:text-center">
          <div>
            <div className="text-3xl font-display font-light text-white/75">10+</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Fiverr Deployments</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/75">100%</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Code Integrity</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/75">Zero</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Exploits Found</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/75">2 Major</div>
            <div className="text-white/20 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Core Initiatives</div>
          </div>
        </div>
      </motion.section>

      <div className="h-20" />
    </div>
  );
}
