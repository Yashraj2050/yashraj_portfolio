'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const contactMethods = [
  {
    label: 'Secure Mailbox',
    value: 'yashrajkuyate@gmail.com',
    href: 'mailto:yashrajkuyate@gmail.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn Matrix',
    value: 'linkedin.com/in/yashraj-kuyate-b24b0331b',
    href: 'https://linkedin.com/in/yashraj-kuyate-b24b0331b',
    icon: 'in',
  },
  {
    label: 'Fiverr Workspace',
    value: 'fiverr.com/yashraj_kuyate',
    href: 'https://fiverr.com/yashraj_kuyate',
    icon: '◈',
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            Handshake Protocol
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Initiate Link</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
          Have an application security audit request, freelance web development project, or network research query? Let&apos;s negotiate a connection.
        </CinematicText>
      </section>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-white/25 text-[11px] font-code tracking-[0.3em] uppercase mb-8">
            Encrypted Relays
          </h3>

          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.04] hover:border-white/10 transition-all duration-500 bg-[#08080c]/50 backdrop-blur-md cursor-pointer relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-tl" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-r border-b border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-br" />

                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.03] text-white/25 text-xs group-hover:text-white/55 transition-colors duration-500">
                  {method.icon}
                </span>
                <div className="overflow-hidden">
                  <div className="text-white/20 text-[9px] font-code uppercase tracking-[0.2em]">
                    {method.label}
                  </div>
                  <div className="text-white/60 text-xs mt-0.5 truncate max-w-full font-code">
                    {method.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <motion.div
            className="mt-8 p-5 rounded-xl border border-white/[0.04] bg-[#08080c]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
              <span className="text-white/35 text-xs font-code">
                DECRYPTION PORTS OPEN FOR COLLABORATION
              </span>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-white/25 text-[11px] font-code tracking-[0.3em] uppercase mb-8">
            Transmit Packet
          </h3>

          {submitted ? (
            <motion.div
              className="p-8 rounded-xl border border-white/10 text-center bg-[#08080c]/50 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-2xl mb-4 text-emerald-500/70">✓</div>
              <h4 className="text-white/85 text-sm font-display font-medium mb-2">
                TRANSMISSION COMPLETED
              </h4>
              <p className="text-white/35 text-xs leading-relaxed font-code">
                Payload received. Tunnels are cleared. I will respond to your node shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/20 text-[9px] font-code uppercase tracking-[0.2em] mb-2">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-lg text-white/75 text-xs font-code placeholder-white/10 focus:outline-none focus:border-white/15 transition-colors"
                    placeholder="Identify node"
                  />
                </div>
                <div>
                  <label className="block text-white/20 text-[9px] font-code uppercase tracking-[0.2em] mb-2">
                    Return Gateway (Email)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-lg text-white/75 text-xs font-code placeholder-white/10 focus:outline-none focus:border-white/15 transition-colors"
                    placeholder="node@gateway.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/20 text-[9px] font-code uppercase tracking-[0.2em] mb-2">
                  Subject Header
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-lg text-white/75 text-xs font-code placeholder-white/10 focus:outline-none focus:border-white/15 transition-colors"
                  placeholder="Payload class descriptor"
                />
              </div>

              <div>
                <label className="block text-white/20 text-[9px] font-code uppercase tracking-[0.2em] mb-2">
                  Message Body
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-lg text-white/75 text-xs font-code placeholder-white/10 focus:outline-none focus:border-white/15 transition-colors resize-none"
                  placeholder="Type raw message stream..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white/[0.06] text-white/75 border border-white/[0.08] rounded-lg text-xs font-code tracking-wider uppercase font-medium hover:bg-white/10 hover:border-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⟳
                    </motion.span>
                    Broadcasting...
                  </span>
                ) : (
                  'Transmit Signal'
                )}
              </motion.button>
            </form>
          )}
        </motion.section>
      </div>

      {/* Footer Note */}
      <motion.div
        className="mt-24 pt-8 border-t border-white/[0.04] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-white/15 text-xs font-code">
          Operational Base: Pune, Maharashtra, India • Latency Vector: Global
        </p>
      </motion.div>

      <div className="h-20" />
    </div>
  );
}
