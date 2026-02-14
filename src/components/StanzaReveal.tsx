'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

interface StanzaRevealProps {
  lines: string[];
  index: number;
  total: number;
}

function WordRevealLine({
  line,
  lineIndex,
  triggered,
}: {
  line: string;
  lineIndex: number;
  triggered: boolean;
}) {
  const words = line.split(' ');

  return (
    <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] xl:text-3xl leading-relaxed md:leading-loose text-gold-100 font-light italic tracking-wide">
      {words.map((word, wIndex) => (
        <motion.span
          key={wIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={
            triggered
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={{
            duration: 0.6,
            delay: triggered ? lineIndex * 0.5 + wIndex * 0.08 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function StanzaReveal({ lines, index, total }: StanzaRevealProps) {
  const stanzaRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stanzaRef,
    offset: ['start end', 'end start'],
  });

  // Depth-of-field: stanza is sharp when in center, blurred+faded when above/below
  const blur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.75, 1],
    [8, 3, 0, 0, 3, 8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.65, 0.8, 1],
    [0, 0.3, 1, 1, 0.3, 0]
  );
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [30, 0, 0, -20]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  // Trigger word animation once when stanza enters focus zone
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!hasTriggered && v > 0.28 && v < 0.72) {
      setHasTriggered(true);
    }
  });

  return (
    <div ref={stanzaRef} className="relative py-14 md:py-20">
      {/* Stanza number */}
      <motion.p
        style={{ opacity }}
        className="text-center text-gold-400/20 font-sans text-[10px] uppercase tracking-[0.5em] mb-6 md:mb-8"
      >
        {toRoman(index + 1)}
      </motion.p>

      {/* Poem content with depth-of-field */}
      <motion.div
        style={{
          opacity,
          y,
          filter: filterBlur,
        }}
        className="text-center"
      >
        <div className="space-y-1 md:space-y-2">
          {lines.map((line, i) => (
            <WordRevealLine
              key={i}
              line={line}
              lineIndex={i}
              triggered={hasTriggered}
            />
          ))}
        </div>
      </motion.div>

      {/* Separator ornament */}
      {index < total - 1 && (
        <motion.div
          style={{ opacity }}
          className="mt-14 md:mt-20 flex items-center justify-center gap-3"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/20" />
          <svg width="10" height="10" viewBox="0 0 20 20" fill="none" className="text-gold-400/20">
            <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" />
          </svg>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/20" />
        </motion.div>
      )}
    </div>
  );
}

function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}
