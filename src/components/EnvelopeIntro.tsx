'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeIntroProps {
  onOpen: () => void;
  onMusicStart?: () => void;
}

export default function EnvelopeIntro({ onOpen, onMusicStart }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    if (onMusicStart) {
      onMusicStart();
    }
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-radial from-gold-500/10 via-transparent to-transparent blur-3xl"
            />
          </div>

          {/* Envelope icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              className="mb-8 text-gold-400/60"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect
                x="2"
                y="2"
                width="76"
                height="56"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M2 6L40 35L78 6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </motion.svg>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-gold-400/50 font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-8"
            >
              Une lettre t&apos;attend
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={handleOpen}
              className="group relative px-8 py-3 border border-gold-400/30 rounded-full text-gold-200 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:border-gold-400/60 hover:bg-gold-400/5 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
            >
              <span className="relative z-10">Ouvrir</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400/0 via-gold-400/5 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="opening"
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut', delay: 0 }}
        >
          {/* Light burst on open */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="w-[200px] h-[200px] rounded-full bg-gradient-radial from-gold-400/30 via-gold-400/5 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
