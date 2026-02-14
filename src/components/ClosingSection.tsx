'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Ambient warm glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(236,122,150,1) 0%, rgba(212,160,36,0.5) 40%, transparent 70%)',
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mx-auto mb-12"
        />

        {/* Heart SVG with pulse */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10"
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto text-rose-400/50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </motion.svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gold-100 italic mb-6"
        >
          Avec tout mon amour...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-gold-400/30 font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] mt-8"
        >
          Pour toujours
        </motion.p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-28 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mx-auto mt-12"
        />

        {/* Subtle footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2 }}
          className="text-gold-400/15 font-sans text-[9px] uppercase tracking-[0.3em] mt-20"
        >
          Fait avec le c&#339;ur
        </motion.p>
      </motion.div>
    </section>
  );
}
