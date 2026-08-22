'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

function Waveform() {
  return (
    <div className="flex h-10 items-center gap-1" aria-hidden="true">
      {[10, 22, 34, 17, 28, 13, 38, 21, 11, 30, 18].map((height, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full bg-blue-500"
          animate={{ height: [7, height, 8] }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 0.8,
            delay: index * 0.04,
          }}
        />
      ))}
    </div>
  );
}

const features = [
  {
    id: 'dictate',
    eyebrow: 'Dictate',
    title: 'Rough speech becomes polished writing.',
    description:
      'Filler words disappear. Grammar, punctuation, and structure appear automatically.',
    visual: (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.7rem] bg-slate-950 p-6 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Listening
            </span>
          </div>
          <span className="text-xs text-slate-500">Gmail</span>
        </div>
        <div className="mt-12 rounded-2xl bg-white/5 p-5 text-sm leading-relaxed text-slate-500 line-through decoration-red-400/70">
          Um hi Sarah, we shipped the update and I can walk you through it
          tomorrow if that works...
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-2xl bg-white p-5 text-lg font-semibold leading-relaxed text-slate-900"
        >
          Hi Sarah, we shipped the update. I can walk you through the changes
          tomorrow.
        </motion.div>
        <div className="mt-6 flex items-center justify-between">
          <Waveform />
          <span className="rounded-full bg-blue-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
            Ready
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'translate',
    eyebrow: 'Translate',
    title: 'Speak naturally. Send in any language.',
    description:
      'Mix languages in one sentence and choose the language Zavi should write.',
    visual: (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.7rem] bg-[#edf5ff] p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="relative rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇮🇳</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                You speak
              </p>
              <p className="text-sm font-bold text-slate-800">
                Hindi + English
              </p>
            </div>
          </div>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            Kal meeting shift kar do, and make it professional.
          </p>
        </div>
        <div className="relative my-4 flex justify-center">
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
          >
            ↓
          </motion.span>
        </div>
        <div className="relative rounded-2xl bg-slate-950 p-5 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                Zavi writes
              </p>
              <p className="text-sm font-bold">Professional English</p>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold leading-relaxed">
            Could we reschedule tomorrow’s meeting? Please share a convenient
            time.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'edit',
    eyebrow: 'Magic Wand',
    title: 'Edit existing text without a prompt box.',
    description:
      'Select text, say the change, and keep moving in the same app.',
    visual: (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.7rem] bg-[#fff7ed] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
            <Image src="/icons/slack.svg" alt="" width={24} height={24} />
          </span>
          <div>
            <p className="text-xs text-slate-400">Slack</p>
            <p className="text-sm font-bold text-slate-800"># product-team</p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl bg-white p-5 text-base font-medium leading-relaxed text-slate-700 shadow-sm">
          The release is done but there are some small things we should talk
          about later.
        </div>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="relative -mt-2 ml-auto mr-4 w-[88%] rounded-2xl border border-violet-200 bg-slate-950 p-5 text-white shadow-2xl"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
            <span>✦</span> Make this shorter and clearer
          </div>
          <p className="mt-4 text-lg font-semibold leading-relaxed">
            The release is complete. A few follow-ups still need discussion.
          </p>
        </motion.div>
      </div>
    ),
  },
];

export default function FeatureVisualShowcase() {
  const [activeMode, setActiveMode] = useState(features[0].id);

  const selectMode = (id: string) => {
    setActiveMode(id);
    document.getElementById(`feature-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <section className="bg-[#f7f8fa] py-20 sm:py-28 lg:py-36">
      <div className="container-large">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Three ways to stay in flow
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Speak. Translate. Edit.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
              Everything happens inside the app you are already using.
            </p>
            <div className="mt-8 inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
              {features.map((feature) => (
                <button
                  type="button"
                  key={feature.id}
                  onClick={() => selectMode(feature.id)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-colors sm:px-6 ${
                    activeMode === feature.id
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {activeMode === feature.id && (
                    <motion.span
                      layoutId="active-feature-mode"
                      className="absolute inset-0 rounded-xl bg-slate-950 shadow-md"
                      transition={{
                        type: 'spring',
                        stiffness: 330,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{feature.eyebrow}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 space-y-6 sm:mt-20">
            {features.map((feature, index) => (
              <motion.article
                key={feature.id}
                id={`feature-${feature.id}`}
                onViewportEnter={() => setActiveMode(feature.id)}
                initial={{ opacity: 0.84, y: 32, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="grid overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
              >
                <div
                  className={`flex flex-col justify-center px-4 py-10 sm:px-8 lg:py-12 ${index % 2 ? 'lg:order-2' : ''}`}
                >
                  <p className="text-sm font-bold text-blue-600">
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    {feature.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  initial={{
                    clipPath: 'inset(8% 5% 8% 5% round 1.7rem)',
                    opacity: 0.82,
                  }}
                  whileInView={{
                    clipPath: 'inset(0% 0% 0% 0% round 1.7rem)',
                    opacity: 1,
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={index % 2 ? 'lg:order-1' : ''}
                >
                  {feature.visual}
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
