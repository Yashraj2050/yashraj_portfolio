'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

type ProjectData = {
  id: string | number;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  metrics: Record<string, string>;
  features?: string[];
  roles?: string[];
  url?: string;
};

const projects: ProjectData[] = [
  {
    id: 'trace',
    title: 'Trace — AI-Powered Environmental Intelligence Platform',
    category: 'AI / Full-Stack',
    year: '2025 - Present',
    description: 'AI-powered environmental intelligence platform that helps users understand, track, and reduce their carbon footprint through personalized insights, OCR-powered emission analysis, and sustainability-focused habit tracking.',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Supabase', 'PostgreSQL', 'Google Gemini AI', 'OCR Pipeline', 'Vercel'],
    metrics: { ai: 'Gemini OCR', database: 'Supabase', architecture: 'Next.js 15' },
    features: [
      'AI Sustainability Coach',
      'OCR Utility Bill Analysis',
      'Carbon Footprint Calculator',
      'Personalized Recommendations',
      'Sustainability Habit Tracking',
      'Analytics Dashboard',
      'PDF Report Generation'
    ],
    roles: [
      'Product Strategy',
      'UX/UI Design',
      'Frontend Development',
      'Backend Architecture',
      'Database Design',
      'AI Integration',
      'Deployment'
    ],
    url: 'https://trace-liart-seven.vercel.app'
  },
  {
    id: 1,
    title: 'Fiduscan — AI Deepfake & Content Detection',
    category: 'AI / Blockchain',
    year: '2025 - Present',
    description: 'AI-powered deepfake media detection system paired with Ethereum smart contracts to ensure cryptographic provenance and authenticity validation.',
    tags: ['TensorFlow', 'PyTorch', 'XceptionNet', 'MesoNet', 'Web3.py', 'Ethereum', 'OpenCV'],
    metrics: { models: 'MesoNet/XceptionNet', security: 'Tamper-Proof', blockchain: 'Ethereum' },
    features: ['Blockchain Fingerprinting', 'MesoNet Validation', 'Ethereum Smart Contracts', 'Real-time Video Analysis'],
    roles: ['AI Research', 'Smart Contract Dev', 'Backend Systems']
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

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#020204]/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#06060a]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ y: 40, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header Image / Glow */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/90 transition-colors z-10 cursor-pointer"
            >
              ✕
            </button>

            <div className="p-8 md:p-12 overflow-y-auto scrollbar-none relative z-10">
              <span className="text-white/40 text-[10px] font-code tracking-[0.2em] uppercase mb-4 block">
                {project.category} · {project.year}
              </span>
              <h2 className="text-white/90 text-3xl md:text-5xl font-display font-light mb-6 leading-tight">
                {project.title}
              </h2>
              
              <p className="text-white/60 text-base leading-relaxed font-code mb-10 max-w-2xl">
                {project.description}
              </p>

              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#06060a] rounded-lg text-sm font-display font-semibold tracking-[0.1em] uppercase hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] mb-12 cursor-pointer"
                >
                  Launch Live Project
                  <span className="text-lg leading-none">↗</span>
                </a>
              )}

              <div className="grid md:grid-cols-2 gap-12 border-t border-white/[0.05] pt-10">
                {/* Left Col */}
                <div className="space-y-10">
                  {project.features && (
                    <div>
                      <h4 className="text-white/30 text-[10px] font-code tracking-[0.2em] uppercase mb-5">Key Features</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-white/20 text-xs mt-0.5">◈</span>
                            <span className="text-white/70 text-sm font-code leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.roles && (
                    <div>
                      <h4 className="text-white/30 text-[10px] font-code tracking-[0.2em] uppercase mb-5">My Role</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.roles.map((role, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded text-white/50 text-xs font-code">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Col */}
                <div>
                  <h4 className="text-white/30 text-[10px] font-code tracking-[0.2em] uppercase mb-5">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#06060a] border border-white/10 rounded text-white/70 text-xs font-code tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-white/30 text-[10px] font-code tracking-[0.2em] uppercase mb-5">Metrics & Architecture</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                        <div className="text-white/80 text-sm font-display font-medium tracking-wide truncate mb-1">{value}</div>
                        <div className="text-white/30 text-[9px] font-code uppercase tracking-[0.15em]">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onClick: (p: ProjectData) => void;
}

function FeaturedProjectCard({ project, onClick }: { project: ProjectData, onClick: (p: ProjectData) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="group relative col-span-1 md:col-span-2 mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      <div className="relative h-full p-8 md:p-12 rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer bg-[#08080c]/60 backdrop-blur-xl transition-all duration-700 hover:border-white/20 hover:bg-[#0a0a0f]/80 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
             style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />

        {/* Cinematic Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />

        <div className="relative z-10 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-white text-[#06060a] text-[9px] font-display font-bold uppercase tracking-[0.2em] rounded-sm">
                Flagship Project
              </span>
              <span className="text-white/40 text-[10px] font-code tracking-[0.2em] uppercase">
                {project.category}
              </span>
            </div>
            
            <h3 className="text-white/95 text-3xl md:text-5xl font-display font-light leading-tight mb-5 group-hover:text-white transition-colors duration-500">
              {project.title.split('—')[0].trim()}
              <span className="block text-2xl md:text-3xl text-white/50 mt-1">— {project.title.split('—')[1]?.trim()}</span>
            </h3>
            
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 font-code max-w-xl group-hover:text-white/60 transition-colors duration-500">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] text-white/60 text-[10px] font-code uppercase tracking-wider rounded transition-colors group-hover:border-white/15">
                  {tag}
                </span>
              ))}
              {project.tags.length > 5 && (
                <span className="px-3 py-1 bg-transparent text-white/30 text-[10px] font-code uppercase tracking-wider flex items-center">
                  +{project.tags.length - 5} more
                </span>
              )}
            </div>
            
            <motion.div 
              className="inline-flex items-center gap-3 text-xs font-code text-white/60 group-hover:text-white transition-colors duration-300"
              animate={{ x: isHovered ? 8 : 0 }}
            >
              <span className="uppercase tracking-[0.15em] border-b border-white/20 pb-0.5">Explore Architecture</span>
              <span className="text-lg leading-none">→</span>
            </motion.div>
          </div>

          <div className="md:col-span-2 hidden md:block">
            <div className="grid grid-cols-1 gap-4 border-l border-white/[0.05] pl-8">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/20 text-[10px]">◈</span>
                    <div className="text-white/30 text-[10px] font-code uppercase tracking-[0.15em]">{key}</div>
                  </div>
                  <div className="text-white/80 text-lg font-display font-light tracking-wide">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      <div className="relative h-full p-7 rounded-xl border border-white/[0.04] overflow-hidden cursor-pointer bg-[#08080c]/50 backdrop-blur-md transition-all duration-500 group-hover:border-white/10 group-hover:bg-[#0a0a0f]/60">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 60%)' }} />
        <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/0 group-hover:border-white/15 transition-all duration-500 rounded-tl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/0 group-hover:border-white/15 transition-all duration-500 rounded-br" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-white/40 text-[10px] font-code tracking-[0.2em] uppercase">
                  {project.category}
                </span>
              </div>
              <h3 className="text-white/90 text-xl font-display font-light leading-snug group-hover:text-white transition-colors">
                {project.title}
              </h3>
            </div>
            <span className="text-white/25 text-xs font-code ml-4 shrink-0 mt-1">{project.year}</span>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-5 font-code">
            {project.description}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6 border-t border-b border-white/[0.04] py-4 bg-white/[0.01]">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-left flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-white/20 text-[8px]">◈</span>
                  <div className="text-white/25 text-[9px] font-code uppercase tracking-[0.15em] truncate">{key}</div>
                </div>
                <div className="text-white/90 text-[13px] font-display font-medium tracking-wide truncate">{value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0,4).map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-[10px] text-white/40 border border-white/[0.05] rounded font-code uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-1.5 text-[10px] font-code text-white/30 group-hover:text-white/60 transition-colors duration-300"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="uppercase tracking-wider">View details</span>
            <span>→</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const categories = ['AI', 'Frontend', 'Freelance', 'Automation'];
  const filteredProjects = filter
    ? projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()))
    : projects;

  // Separate the featured project from the rest
  const featuredProject = projects[0]; // Trace is always first
  const standardProjects = filteredProjects.filter(p => p.id !== featuredProject.id);
  const showFeatured = !filter || featuredProject.category.toLowerCase().includes(filter.toLowerCase());

  return (
    <>
      <div className="min-h-screen py-20 pb-28 md:pb-20">
        <section className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white/40 text-[11px] font-code tracking-[0.35em] uppercase mb-6 block">Projects</span>
          </motion.div>
          <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
            <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Deployments & Work</span>
          </CinematicHeading>
          <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
            A catalog of security architectures, web services, and machine learning platforms built to solve real-world problems.
          </CinematicText>
        </section>

        <motion.div className="flex gap-2 mb-10 flex-wrap" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <button onClick={() => setFilter(null)} className={`px-4 py-1.5 text-xs font-code rounded-md border cursor-pointer transition-all ${filter === null ? 'border-white/20 text-white/80 bg-white/[0.05]' : 'border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white/60'}`}>All</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 text-xs font-code rounded-md border cursor-pointer transition-all ${filter === cat ? 'border-white/20 text-white/80 bg-white/[0.05]' : 'border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white/60'}`}>{cat}</button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {showFeatured && (
            <FeaturedProjectCard project={featuredProject} onClick={setSelectedProject} />
          )}
          {standardProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onClick={setSelectedProject} />
          ))}
        </div>

        <motion.section className="mt-20 py-14 border-t border-white/[0.04]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-left md:text-center">
            <div><div className="text-3xl font-display font-light text-white/80">10+</div><div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Fiverr Deployments</div></div>
            <div><div className="text-3xl font-display font-light text-white/80">100%</div><div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Code Integrity</div></div>
            <div><div className="text-3xl font-display font-light text-white/80">Zero</div><div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Exploits Found</div></div>
            <div><div className="text-3xl font-display font-light text-white/80">3 Major</div><div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Core Initiatives</div></div>
          </div>
        </motion.section>
        <div className="h-10" />
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
