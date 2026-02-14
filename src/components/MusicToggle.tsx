'use client';

import { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MUSIC_URL =
  'https://archive.org/download/NextToYouParasyte/Next%20to%20you%20-%20Parasyte.mp3';

export interface MusicToggleRef {
  startMusic: () => void;
}

const MusicToggle = forwardRef<MusicToggleRef>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    startMusic: () => {
      if (!audioRef.current) {
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.volume = 0.35;
        audio.crossOrigin = 'anonymous';
        audioRef.current = audio;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    },
  }));

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-400/20 bg-midnight-950/80 backdrop-blur-sm text-gold-400/60 hover:text-gold-400/90 hover:border-gold-400/40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
      aria-label={isPlaying ? 'Couper la musique' : 'Jouer la musique'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            {/* Sound bars animation */}
            <div className="flex items-end gap-[2px] h-3">
              {[0, 0.2, 0.1].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['40%', '100%', '40%'] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                  }}
                  className="w-[2px] bg-gold-400/60 rounded-full"
                />
              ))}
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.15em]">
              Pause
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-400/60"
            >
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
                fill="currentColor"
              />
              <path
                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
                fill="currentColor"
              />
            </svg>
            <span className="font-sans text-[10px] uppercase tracking-[0.15em]">
              Musique
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

MusicToggle.displayName = 'MusicToggle';

export default MusicToggle;
