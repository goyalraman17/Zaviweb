'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useState } from 'react';

type Tone = 'formal' | 'casual' | 'playful';

interface ToneOption {
  id: Tone;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  example: string;
  description: string;
}

export default function ToneSwitcher() {
  const [selectedTone, setSelectedTone] = useState<Tone>('casual');

  const tones: ToneOption[] = [
    {
      id: 'formal',
      label: 'Formal',
      icon: '👔',
      color: '#5A5766',
      bgColor: '#E8DFD0',
      hoverColor: '#D4C4B8',
      example: 'I would be pleased to discuss this matter with you at your earliest convenience.',
      description: 'Professional and polished'
    },
    {
      id: 'casual',
      label: 'Casual',
      icon: '✨',
      color: '#9B86BD',
      bgColor: '#D4C4E8',
      hoverColor: '#C4B4D8',
      example: 'Hey! Would love to chat about this when you have a moment.',
      description: 'Friendly and approachable'
    },
    {
      id: 'playful',
      label: 'Playful',
      icon: '🎨',
      color: '#7B9B8A',
      bgColor: '#B8D4C8',
      hoverColor: '#A8C4B8',
      example: 'Yo! Let\'s totally jam on this idea sometime soon! 🚀',
      description: 'Fun and creative'
    }
  ];

  const selectedToneData = tones.find(t => t.id === selectedTone) || tones[1];

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#F5F1EC] to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...staggerContainer}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h2
            {...fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#34384c] mb-4"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Speak your way,{' '}
            <span className="text-[#9B86BD]">every way</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg md:text-xl text-[#5A5766]"
          >
            Choose the perfect tone for any situation
          </motion.p>
        </motion.div>

        {/* Tone Selector */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {tones.map((tone, index) => (
            <motion.button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-4 md:px-8 md:py-5 rounded-2xl transition-all duration-300 ${
                selectedTone === tone.id
                  ? 'shadow-lg shadow-black/10'
                  : 'shadow-md hover:shadow-lg'
              }`}
              style={{
                backgroundColor: selectedTone === tone.id ? tone.bgColor : '#FFFFFF',
                borderWidth: 2,
                borderColor: selectedTone === tone.id ? tone.color : 'transparent'
              }}
            >
              {/* Selection indicator */}
              <AnimatePresence>
                {selectedTone === tone.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${tone.color}, ${tone.hoverColor})`
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <div className="text-3xl md:text-4xl mb-2">{tone.icon}</div>

              {/* Label */}
              <div
                className="font-semibold text-base md:text-lg mb-1"
                style={{
                  color: selectedTone === tone.id ? tone.color : '#5A5766'
                }}
              >
                {tone.label}
              </div>

              {/* Description */}
              <div className="text-xs md:text-sm text-[#5A5766]/70">
                {tone.description}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Example Display */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 overflow-hidden"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `linear-gradient(135deg, ${selectedToneData.bgColor}, transparent)`
            }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: `${selectedToneData.bgColor}80` }}
          >
            <span className="text-2xl">{selectedToneData.icon}</span>
            <span
              className="font-semibold text-sm md:text-base"
              style={{ color: selectedToneData.color }}
            >
              {selectedToneData.label} tone
            </span>
          </motion.div>

          {/* Animated Text Example */}
          <div className="relative min-h-[120px] md:min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTone}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative z-10"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-[#34384c] leading-relaxed font-medium">
                  "{selectedToneData.example}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative quote marks */}
          <div
            className="absolute top-4 right-4 text-6xl md:text-8xl font-serif opacity-10"
            style={{ color: selectedToneData.color }}
          >
            "
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-base md:text-lg text-[#5A5766] font-light">
            Switch tones effortlessly as you speak
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Simplified variant for smaller spaces
export function ToneSwitcherCompact() {
  const [selectedTone, setSelectedTone] = useState<Tone>('casual');

  const tones = [
    { id: 'formal' as Tone, icon: '👔', label: 'Formal' },
    { id: 'casual' as Tone, icon: '✨', label: 'Casual' },
    { id: 'playful' as Tone, icon: '🎨', label: 'Playful' }
  ];

  return (
    <div className="inline-flex gap-2 p-2 bg-[#F5F1EC] rounded-full">
      {tones.map((tone) => (
        <motion.button
          key={tone.id}
          onClick={() => setSelectedTone(tone.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            selectedTone === tone.id
              ? 'bg-white shadow-md'
              : 'bg-transparent hover:bg-white/50'
          }`}
        >
          <span className="text-xl mr-2">{tone.icon}</span>
          <span className="text-sm font-medium text-[#5A5766]">{tone.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
