'use client';

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const demos = [
  {
    app: 'Gmail',
    icon: '/icons/gmail.svg',
    color: 'bg-red-50',
    recipient: 'Sarah — Product',
    spoken:
      'Um, we shipped the update and I can walk you through it tomorrow if that works.',
    written:
      'We shipped the update. I can walk you through the changes tomorrow if that works for you.',
  },
  {
    app: 'Slack',
    icon: '/icons/slack.svg',
    color: 'bg-violet-50',
    recipient: '# launch-room',
    spoken: 'Kal meeting shift kar do. Send it in professional English.',
    written:
      'Could we move tomorrow’s meeting? Please share a time that works for everyone.',
  },
  {
    app: 'Google Docs',
    icon: '/icons/google-docs.svg',
    color: 'bg-blue-50',
    recipient: 'Launch brief',
    spoken: 'Make this shorter, sharper, and ready to send.',
    written:
      'The release is ready. Two follow-ups remain before we announce it.',
  },
];

const waveform = [9, 15, 23, 13, 29, 20, 10, 25, 16, 8, 19, 12, 24, 11];

type DemoPhase = 'listening' | 'writing' | 'ready';

function AppIcon({
  demo,
  size = 22,
}: {
  demo: (typeof demos)[number];
  size?: number;
}) {
  return <Image src={demo.icon} alt="" width={size} height={size} />;
}

export default function LiveProductDemo({
  compact = false,
}: {
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>(
    reduceMotion ? 'ready' : 'listening'
  );
  const pointerX = useMotionValue(560);
  const pointerY = useMotionValue(220);
  const smoothX = useSpring(pointerX, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${smoothX}px ${smoothY}px, rgba(96,165,250,0.16), transparent 68%)`;

  useEffect(() => {
    if (reduceMotion) {
      setPhase('ready');
      return;
    }

    setPhase('listening');
    const writingTimer = window.setTimeout(() => setPhase('writing'), 1700);
    const readyTimer = window.setTimeout(() => setPhase('ready'), 4100);
    const nextTimer = window.setTimeout(
      () => setActive((current) => (current + 1) % demos.length),
      5900
    );

    return () => {
      window.clearTimeout(writingTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(nextTimer);
    };
  }, [active, reduceMotion, replayKey]);

  const demo = demos[active];
  const words = demo.written.split(' ');

  const selectDemo = (index: number) => {
    setPhase(reduceMotion ? 'ready' : 'listening');
    if (active === index) {
      setReplayKey((key) => key + 1);
    } else {
      setActive(index);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-[#f3f5f8] shadow-[0_35px_110px_-52px_rgba(15,23,42,0.55)] ${
        compact ? 'p-3 sm:p-5' : 'p-3 sm:p-6'
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -top-20 left-[15%] h-72 w-72 rounded-full bg-blue-300/20 blur-[75px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 180, 40], y: [0, 35, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-28 right-[8%] h-72 w-72 rounded-full bg-violet-300/15 blur-[80px]"
        animate={
          reduceMotion ? undefined : { x: [0, -130, 0], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <motion.div
        whileHover={reduceMotion ? undefined : { y: -3, scale: 1.002 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative z-[2] overflow-hidden rounded-[1.55rem] border border-white bg-white/95 shadow-[0_12px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl"
      >
        <div className="flex h-12 items-center justify-between border-b border-slate-100 px-4 sm:px-6">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="relative flex items-center gap-1.5 overflow-hidden rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(16,185,129,0)',
                        '0 0 0 5px rgba(16,185,129,.14)',
                        '0 0 0 0 rgba(16,185,129,0)',
                      ],
                    }
              }
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            Zavi is ready
          </div>
        </div>

        <div
          className={`grid ${compact ? 'min-h-[300px]' : 'min-h-[410px]'} md:grid-cols-[0.72fr_1.28fr]`}
        >
          <div className="hidden border-r border-slate-100 bg-slate-50/75 p-5 md:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Works in your apps
            </p>
            <div className="mt-5 space-y-2">
              {demos.map((item, index) => (
                <button
                  type="button"
                  key={item.app}
                  onClick={() => selectDemo(index)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-500 ${
                    active === index
                      ? 'text-slate-900'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {active === index && (
                    <motion.span
                      layoutId="active-demo-app"
                      className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 32,
                      }}
                    />
                  )}
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <AppIcon demo={item} size={18} />
                  </span>
                  <span className="relative">{item.app}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-full bg-slate-200/70">
              <motion.div
                key={`progress-${active}`}
                className="h-0.5 origin-left bg-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 5.9,
                  ease: 'linear',
                }}
              />
            </div>
          </div>

          <div className="relative flex flex-col p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${demo.app}-header`}
                initial={{ opacity: 0, x: 12, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: cinematicEase }}
                className="flex items-center gap-3 border-b border-slate-100 pb-4"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${demo.color}`}
                >
                  <AppIcon demo={demo} />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Writing in {demo.app}
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {demo.recipient}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex flex-1 items-center py-7">
              <AnimatePresence mode="wait">
                {phase === 'listening' ? (
                  <motion.div
                    key={`${active}-listening`}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.6, ease: cinematicEase }}
                    className="max-w-xl"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      You say
                    </p>
                    <p className="mt-4 text-xl font-medium leading-relaxed text-slate-400 sm:text-2xl">
                      “{demo.spoken}”
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key={`${active}-written`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-xl text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl"
                  >
                    {words.map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        className="inline-block"
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, y: 8, filter: 'blur(5px)' }
                        }
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.055,
                          ease: cinematicEase,
                        }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                    {phase === 'writing' && (
                      <motion.span
                        className="ml-0.5 inline-block h-6 w-0.5 translate-y-1 bg-blue-500"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.85 }}
                      />
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              animate={{
                borderColor:
                  phase === 'ready'
                    ? 'rgba(16,185,129,.35)'
                    : 'rgba(51,65,85,.55)',
              }}
              className="relative overflow-hidden rounded-2xl border bg-slate-950 p-3.5 text-white shadow-[0_18px_35px_-20px_rgba(15,23,42,.8)] sm:p-4"
            >
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"
                animate={reduceMotion ? undefined : { x: ['-140%', '650%'] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => setReplayKey((key) => key + 1)}
                  aria-label="Replay voice demo"
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${phase === 'ready' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  animate={
                    reduceMotion
                      ? undefined
                      : phase === 'listening'
                        ? { scale: [1, 1.06, 1] }
                        : { scale: 1 }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: phase === 'listening' ? Infinity : 0,
                  }}
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.08, rotate: -3 }
                  }
                  whileTap={{ scale: 0.92 }}
                >
                  {phase === 'ready' ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 12 4 4L19 6"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
                    </svg>
                  )}
                </motion.button>

                <div
                  className="flex h-8 flex-1 items-center gap-1"
                  aria-hidden="true"
                >
                  {waveform.map((height, index) => (
                    <motion.span
                      key={index}
                      className={`w-1 rounded-full ${phase === 'ready' ? 'bg-emerald-400/70' : 'bg-gradient-to-t from-blue-500 to-sky-300'}`}
                      animate={{
                        height:
                          phase === 'listening' && !reduceMotion
                            ? [height * 0.35, height, height * 0.48]
                            : phase === 'writing'
                              ? 7 + (index % 3) * 2
                              : 5,
                      }}
                      transition={{
                        duration: 0.82,
                        repeat: phase === 'listening' ? Infinity : 0,
                        repeatType: 'mirror',
                        delay: index * 0.035,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      phase === 'ready'
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {phase === 'listening'
                      ? 'Listening'
                      : phase === 'writing'
                        ? 'Polishing'
                        : 'Ready to send'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
