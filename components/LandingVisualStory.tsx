'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const apps = [
  { name: 'Gmail', image: '/icons/gmail.svg', tone: 'bg-red-50' },
  { name: 'Slack', image: '/icons/slack.svg', tone: 'bg-violet-50' },
  { name: 'WhatsApp', image: '/icons/whatsapp.svg', tone: 'bg-emerald-50' },
  { name: 'Google Docs', image: '/icons/google-docs.svg', tone: 'bg-blue-50' },
  { name: 'Notion', image: '/icons/notion.svg', tone: 'bg-slate-100' },
  { name: 'ChatGPT', image: '/icons/openai.svg', tone: 'bg-slate-100' },
  { name: 'LinkedIn', image: '/icons/linkedin.svg', tone: 'bg-sky-50' },
];

function AppChip({ app }: { app: (typeof apps)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group flex min-w-[170px] cursor-default items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <motion.span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${app.tone}`}
        whileHover={{ rotate: -5, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      >
        <Image src={app.image} alt="" width={22} height={22} />
      </motion.span>
      <span className="whitespace-nowrap text-sm font-bold text-slate-900">
        {app.name}
      </span>
    </motion.div>
  );
}

export default function LandingVisualStory() {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="container-large">
        <div className="mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0.82, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600"
          >
            One voice shortcut. Every text field.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0.82, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl"
          >
            Stay in the app. Say what you mean.
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
            Zavi turns natural speech into text that is ready to send.
          </p>
        </div>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 36,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        >
          <div className="flex shrink-0 gap-4 pr-4">
            {apps.map((app) => (
              <AppChip key={app.name} app={app} />
            ))}
          </div>
          <div aria-hidden="true" className="flex shrink-0 gap-4 pr-4">
            {apps.map((app) => (
              <AppChip key={`loop-${app.name}`} app={app} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container-large mt-20 sm:mt-28">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.div
            initial={{ opacity: 0.84, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10"
          >
            <div>
              <p className="text-sm font-semibold text-blue-300">
                Typing creates friction
              </p>
              <p className="mt-5 text-6xl font-black tracking-tight sm:text-7xl">
                5×
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-300">
                faster than typing manually
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Keyboard</span>
                  <span>think → type → fix</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[28%] rounded-full bg-slate-500" />
                </div>
              </div>
              <div className="rounded-2xl bg-blue-500 p-4">
                <div className="mb-3 flex items-center justify-between text-xs font-bold text-blue-50">
                  <span>Zavi</span>
                  <span>speak → send</span>
                </div>
                <motion.div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: '18%' }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.25 }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.84, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-100 p-7 sm:p-10"
          >
            <div className="max-w-md">
              <p className="text-sm font-semibold text-blue-600">
                No copy-paste loop
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Your words appear where your cursor already is.
              </h3>
            </div>
            <div className="absolute inset-x-6 bottom-[-44px] rounded-t-[1.7rem] border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-10 sm:p-7">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ✦
                </span>
                <div>
                  <p className="text-xs text-slate-500">New message</p>
                  <p className="text-sm font-bold text-slate-800">
                    Ready to send
                  </p>
                </div>
              </div>
              <p className="py-8 text-xl font-semibold leading-relaxed text-slate-800">
                We shipped the update. I can walk you through the changes
                tomorrow.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[12, 20, 9, 25, 16, 8, 18].map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-1 rounded-full bg-blue-500"
                      animate={{ height: [6, height, 7] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.9,
                        delay: index * 0.08,
                      }}
                    />
                  ))}
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  Cleaned by Zavi
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
