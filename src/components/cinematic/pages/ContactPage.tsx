'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const contactMethods = [
  {
    label: 'Email',
    value: 'yashrajkuyate@gmail.com',
    href: 'mailto:yashrajkuyate@gmail.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yashraj-kuyate-b24b0331b',
    href: 'https://linkedin.com/in/yashraj-kuyate-b24b0331b',
    icon: 'in',
  },
  {
    label: 'Fiverr',
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
    <div className="min-h-screen py-20 pb-28 md:pb-20">
      {/* Header */}
      <section className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/40 text-[11px] font-code tracking-[0.35em] uppercase mb-6 block">
            Contact
          </span>
        </motion.div>

        <CinematicHeading as="h1" className="text-white mb-4 font-display" delay={0.1}>
          <span className="block font-light text-4xl md:text-5xl lg:text-6xl">Get In Touch</span>
        </CinematicHeading>

        <CinematicText className="max-w-xl font-code text-sm" delay={0.2}>
          Have a security audit request, freelance project, or research inquiry? I&apos;d love to connect.
        </CinematicText>
      </section>

      <div className="grid lg:grid-cols-2 gap-14">
        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase mb-7">
            Reach Me At
          </h3>

          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.05] hover:border-white/12 transition-all duration-400 bg-[#08080c]/50 backdrop-blur-md cursor-pointer relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t border-white/0 group-hover:border-white/12 transition-all duration-500 rounded-tl" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-r border-b border-white/0 group-hover:border-white/12 transition-all duration-500 rounded-br" />

                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.03] text-white/35 text-xs group-hover:text-white/65 transition-colors duration-400">
                  {method.icon}
                </span>
                <div className="overflow-hidden">
                  <div className="text-white/40 text-[10px] font-code uppercase tracking-[0.2em]">
                    {method.label}
                  </div>
                  <div className="text-white/65 text-xs mt-0.5 truncate max-w-full font-code group-hover:text-white/80 transition-colors duration-300">
                    {method.value}
                  </div>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors text-sm">→</span>
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <motion.div
            className="mt-7 p-5 rounded-xl border border-white/[0.04] bg-[#08080c]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
              <span className="text-white/50 text-xs font-code">
                Open to freelance & collaboration
              </span>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-white/40 text-[11px] font-code tracking-[0.3em] uppercase mb-7">
            Send a Message
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
                Message Sent!
              </h4>
              <p className="text-white/45 text-xs leading-relaxed font-code">
                Thanks for reaching out. I&apos;ll get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/35 text-[10px] font-code uppercase tracking-[0.2em] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/80 text-xs font-code placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/35 text-[10px] font-code uppercase tracking-[0.2em] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/80 text-xs font-code placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/35 text-[10px] font-code uppercase tracking-[0.2em] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/80 text-xs font-code placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-white/35 text-[10px] font-code uppercase tracking-[0.2em] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/80 text-xs font-code placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-[#06060a] rounded-lg text-sm font-display font-semibold tracking-wider uppercase hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          )}
        </motion.section>
      </div>

      {/* Footer Note */}
      <motion.div
        className="mt-20 pt-8 border-t border-white/[0.04] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-white/20 text-xs font-code">
          Based in Pune, Maharashtra, India · Available globally
        </p>
      </motion.div>

      <div className="h-10" />
    </div>
  );
}
