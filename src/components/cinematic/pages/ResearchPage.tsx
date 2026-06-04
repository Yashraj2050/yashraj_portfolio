'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const researchSeries = [
  {
    part: '01',
    name: 'Freenet',
    subtitle: 'Decentralized Censorship-Resistant Datastore',
    abstract: 'An investigation into distributed storage architectures where files are split, encrypted, and hosted redundantly across peer nodes. Emphasizes dynamic key routing and how nodes self-organize without centralized directory servers to preserve hosting anonymity.',
    techKeywords: ['P2P Storage', 'Freenet Keys', 'Heuristic Routing', 'Dynamic Encryption'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '02',
    name: 'I2P',
    subtitle: 'Invisible Internet Project & Garlic Routing',
    abstract: 'A deep dive into packet-switching networks utilizing Garlic Routing. Analysis of one-way tunnels where inbound and outbound routes are segregated, preventing correlation attacks and protecting network services from passive tracking.',
    techKeywords: ['Garlic Routing', 'One-Way Tunnels', 'ElGamal Encryption', 'NetDb'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '03',
    name: 'ZeroNet',
    subtitle: 'Bitcoin Cryptography & BitTorrent Web',
    abstract: 'How to build peer-to-peer web publishing systems using Bitcoin addresses to identify resources and BitTorrent protocol extensions to seed content. Explores building static sites that cannot be shut down by single-point domain seizure.',
    techKeywords: ['Bitcoin Cryptography', 'BitTorrent DHT', 'ZeroFrame API', 'P2P Hosting'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '04',
    name: 'Usenet',
    subtitle: 'Vintage Federated Bulletin Silos',
    abstract: "Tracing modern decentralized communication patterns back to Usenet's federated NNTP structure. Analyzes newsgroup propagation, peer replication delays, and structural design choices that enabled distributed messaging in the pre-web era.",
    techKeywords: ['NNTP Protocol', 'Federation', 'Group Propagation', 'Text Database'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '05',
    name: 'Cypherpunk Remailers',
    subtitle: 'Untraceable Email Hops & Cryptographic Relays',
    abstract: 'Evaluating Cypherpunk Type I, Mixmaster Type II, and Mixminion Type III remailers. Analyzes latency injection, message resizing, cryptographic padding, and hop redirection to mitigate metadata harvesting and traffic analysis.',
    techKeywords: ['Mixnets', 'Latency Injection', 'Symmetric Encryption', 'Metadata Strip'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '06',
    name: 'Onion Routing & Tor',
    subtitle: 'Multi-Hop Circuit Negotiation & Directory Authorities',
    abstract: "A study of Tor's directory authority consensus model, ephemeral Diffie-Hellman key exchanges for circuit setup, and cell packaging. Details how cells are peeled layer by layer, hiding client location from entry, middle, and exit relays.",
    techKeywords: ['Tor Directory Authority', 'Circuit Handshake', 'Exit Relay Policy', 'Diffie-Hellman'],
    postUrl: 'https://linkedin.com',
  },
  {
    part: '07',
    name: 'AI-Regulated Web & Future Privacy',
    subtitle: 'Defensive Cryptography against Scrapers',
    abstract: 'Synthesizing decentralized network protocols to combat hyper-centralized AI crawlers and data syndicates. Explores zero-knowledge proof verification and onion tunnels as core shields for user-owned content and digital sovereignty.',
    techKeywords: ['Zero-Knowledge Proofs', 'AI Scraper Shield', 'Decentralized Consensus', 'Data Sovereignty'],
    postUrl: 'https://linkedin.com',
  },
];

export function ResearchPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDoc = researchSeries[selectedIndex];

  return (
    <div className="min-h-screen py-20 pb-28 md:pb-20">
      {/* Header */}
      <section className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/40 text-[11px] font-code tracking-[0.35em] uppercase mb-6 block">
            Research
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Hidden Networks</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
          A 7-part LinkedIn research series dissecting decentralized internet layers, onion structures, and privacy architectures in an AI-regulated web.
        </CinematicText>
      </section>

      {/* Terminal document layout */}
      <section className="grid lg:grid-cols-12 gap-5">

        {/* Index Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-1.5">
          <span className="text-[10px] text-white/35 font-code uppercase tracking-[0.3em] mb-3 px-1">
            Research Series
          </span>
          {researchSeries.map((doc, index) => (
            <button
              key={doc.part}
              onClick={() => setSelectedIndex(index)}
              className={`flex items-center gap-3 p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                selectedIndex === index
                  ? 'border-white/15 bg-white/[0.04] text-white/85'
                  : 'border-white/[0.04] text-white/40 hover:border-white/10 hover:text-white/65'
              }`}
            >
              <span className={`text-[10px] font-code shrink-0 ${selectedIndex === index ? 'text-white/65' : 'text-white/20'}`}>
                {doc.part}
              </span>
              <span className="text-xs truncate font-code">
                {doc.name}
              </span>
            </button>
          ))}
        </div>

        {/* Viewer Panel */}
        <div className="lg:col-span-8 p-7 md:p-8 rounded-xl border border-white/[0.04] bg-[#08080c]/40 backdrop-blur-md relative min-h-[400px]">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500/40" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <span className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
            <span className="text-[9px] text-white/25 uppercase tracking-[0.2em] font-code">
              Part {selectedDoc.part} of 07
            </span>
          </div>

          {/* Document display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDoc.part}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[9px] text-white/25 font-code uppercase tracking-[0.2em] block mb-2">Topic</span>
                <h3 className="text-white/90 text-xl font-display font-light">
                  {selectedDoc.name}
                </h3>
                <p className="text-white/45 text-xs font-code mt-1">
                  {selectedDoc.subtitle}
                </p>
              </div>

              <div>
                <span className="text-[9px] text-white/25 font-code uppercase tracking-[0.2em] block mb-2">Abstract</span>
                <p className="text-white/55 text-xs leading-relaxed font-code">
                  {selectedDoc.abstract}
                </p>
              </div>

              <div>
                <span className="text-[9px] text-white/25 font-code uppercase tracking-[0.2em] block mb-2.5">Key Concepts</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.techKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2.5 py-1 text-[10px] text-white/45 border border-white/[0.06] rounded-md bg-[#0c0c14]/40 font-code"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between flex-wrap gap-4">
                <span className="text-[9px] text-white/25 font-code">
                  1,500+ aggregate impressions
                </span>
                <a
                  href={selectedDoc.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-white/10 rounded-md hover:border-white/25 hover:text-white/90 transition-all text-[10px] uppercase font-code cursor-pointer text-white/55 flex items-center gap-1.5"
                >
                  Read on LinkedIn →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.008]"
              style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 6px 100%',
              }}
            />
          </div>
        </div>
      </section>

      {/* Global Impact Summary */}
      <motion.section
        className="mt-20 py-14 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-display font-light text-white/80">7</div>
            <div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Research Chapters</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/80">1,500+</div>
            <div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Aggregate Impressions</div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-white/80">Zero-Trust</div>
            <div className="text-white/30 text-[10px] font-code uppercase tracking-[0.2em] mt-1.5">Design Alignment</div>
          </div>
        </div>
      </motion.section>

      <div className="h-10" />
    </div>
  );
}
