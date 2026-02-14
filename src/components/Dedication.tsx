'use client';

import { motion } from 'framer-motion';

export default function Dedication() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="text-center py-10 md:py-16"
    >
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-gold-400/40 font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-4"
      >
        14 février 2026
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-10 h-px bg-gold-400/20 mx-auto mb-6"
      />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
        className="text-lg sm:text-xl md:text-2xl font-serif italic text-gold-200/80"
      >
        &Agrave; toi, qui illumines mes jours...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-6 text-gold-400/30 font-sans text-[10px] sm:text-xs tracking-[0.2em]"
      >
        &#9829;
      </motion.p>
    </motion.div>
  );
}
