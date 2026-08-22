'use client';

import { motion } from 'framer-motion';
import { EyeOff, Fingerprint, LockKeyhole, Mic } from 'lucide-react';

const points = [
  {
    icon: Mic,
    title: 'Audio disappears',
    desc: 'Processed live, then deleted.',
  },
  { icon: EyeOff, title: 'Never trains AI', desc: 'Your data stays yours.' },
  {
    icon: Fingerprint,
    title: 'You control the mic',
    desc: 'Active only when pressed.',
  },
  {
    icon: LockKeyhole,
    title: 'Encrypted in transit',
    desc: 'Protected while processing.',
  },
];

export default function PrivacyStrip() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-large">
        <motion.div
          initial={{ opacity: 0.86, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#111416] text-white lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden p-10">
            <motion.div
              className="absolute h-[380px] w-[380px] rounded-full border border-emerald-300/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_24px_8px_rgba(110,231,183,.25)]" />
            </motion.div>
            <motion.div
              className="absolute h-[270px] w-[270px] rounded-full border border-white/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute bottom-6 right-6 h-1.5 w-1.5 rounded-full bg-blue-300" />
            </motion.div>
            <div className="absolute h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />
            <motion.div
              whileHover={{ scale: 1.06, rotate: -2 }}
              className="relative flex h-36 w-36 items-center justify-center rounded-[2.2rem] border border-white/10 bg-white/[0.07] shadow-2xl backdrop-blur-xl"
            >
              <LockKeyhole
                className="h-14 w-14 text-emerald-300"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center px-7 pb-10 sm:px-12 lg:py-16 lg:pr-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
              Private by design
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Your voice is not the product.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-slate-300">
              Zavi processes only what it needs—and keeps nothing it does not.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0.78, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 + index * 0.04,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                  >
                    <Icon className="h-5 w-5 text-emerald-300" />
                    <h3 className="mt-3 text-sm font-bold text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300">{point.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
