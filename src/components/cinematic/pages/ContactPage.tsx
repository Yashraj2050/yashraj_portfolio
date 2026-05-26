'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { CinematicHeading, CinematicText } from '../CinematicTypography';

const contactMethods = [
  {
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/profile',
    href: '#',
    icon: 'in',
  },
  {
    label: 'GitHub',
    value: 'github.com/username',
    href: '#',
    icon: '◈',
  },
  {
    label: 'Twitter',
    value: '@username',
    href: '#',
    icon: '✦',
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Simulate form submission
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
              Contact
            </span>
          </motion.div>

          <CinematicHeading as="h1" className="text-white mb-4" delay={0.1}>
            <span className="block">Let&apos;s Connect</span>
          </CinematicHeading>

          <CinematicText className="max-w-xl" delay={0.2}>
            Interested in collaboration, research partnerships, or just want to say hello?
            I&apos;d love to hear from you.
          </CinematicText>
        </section>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Methods */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-6">
              Reach Out
            </h3>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white/30 text-sm group-hover:text-white/60 transition-colors">
                    {method.icon}
                  </span>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">
                      {method.label}
                    </div>
                    <div className="text-white/70 text-sm mt-0.5">
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              className="mt-8 p-4 rounded-lg border border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="text-white/50 text-sm">
                  Available for new opportunities
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
            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-6">
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                className="p-8 rounded-xl border border-white/10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl mb-4">✓</div>
                <h4 className="text-white/90 text-xl font-light mb-2">
                  Message Sent
                </h4>
                <p className="text-white/40 text-sm">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black rounded-lg text-sm tracking-wider uppercase font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="mt-20 pt-8 border-t border-white/5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-white/30 text-sm">
            Based in San Francisco, CA • Available Worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
}
