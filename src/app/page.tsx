'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleCanvas from '@/components/ParticleCanvas';
import HeroSection from '@/components/HeroSection';
import StanzaReveal from '@/components/StanzaReveal';
import ClosingSection from '@/components/ClosingSection';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import CursorGlow from '@/components/CursorGlow';
import MusicToggle from '@/components/MusicToggle';
import Dedication from '@/components/Dedication';

const stanzas = [
  [
    'En l\u2019azur de tes yeux, je vois l\u2019aube naissante,',
    'Un soleil d\u2019amour qui jamais ne s\u2019\u00e9teint.',
    'L\u2019air est plus doux quand tu es pr\u00e8s de moi,',
    'Et ton c\u0153ur, un \u00e9crin o\u00f9 l\u2019amour se r\u00e9pand.',
  ],
  [
    '\u00d4 mon doux sire, ta vertu est sans pareille,',
    'Ton esprit, un jardin o\u00f9 la sagesse s\u2019\u00e9veille.',
    'Ta pr\u00e9sence est un baume qui gu\u00e9rit mes maux,',
    'Et ton amour, un brasier qui embrase mon c\u0153ur.',
  ],
  [
    'Les jours avec toi sont des jours de d\u00e9lices,',
    'Les nuits, des r\u00eaves o\u00f9 mon c\u0153ur s\u2019\u00e9lise.',
    'Je veux te ch\u00e9rir, te prot\u00e9ger, te garder,',
    'Et avec toi, mon amour, pour toujours naviguer.',
  ],
  [
    'J\u2019aimerais que tu susurres des mots d\u2019amour,',
    'Des mots qui font battre mon c\u0153ur, nuit et jour.',
    'Que le Ciel te pr\u00e9serve, mon amour, mon miel,',
    'Et que notre amour soit \u00e9ternel, ainsi qu\u2019il est \u00e9crit.',
  ],
];

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="breathing-bg min-h-screen">
      {/* Envelope intro overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <EnvelopeIntro onOpen={() => setIsRevealed(true)} />
        )}
      </AnimatePresence>

      {/* Main content — always mounted but hidden behind intro */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="relative min-h-screen"
      >
        {/* Background image layer */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12]"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-midnight-950/70" />
        </div>

        <ParticleCanvas />
        <CursorGlow />
        <MusicToggle />

        {/* Ambient gradient overlays */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-midnight-950 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-midnight-950 to-transparent" />
        </div>

        <div className="relative z-10">
          <HeroSection />

          {/* Dedication */}
          <section className="min-h-[60vh] flex items-center justify-center">
            <div className="max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-8">
              <Dedication />
            </div>
          </section>

          {/* Poem sections — compact spacing with depth-of-field effect */}
          <section className="max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-8 py-8 md:py-16">
            {stanzas.map((lines, index) => (
              <StanzaReveal
                key={index}
                lines={lines}
                index={index}
                total={stanzas.length}
              />
            ))}
          </section>

          <ClosingSection />
        </div>
      </motion.main>
    </div>
  );
}
