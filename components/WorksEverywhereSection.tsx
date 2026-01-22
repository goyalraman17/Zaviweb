'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

const APP_GROUPS = [
  {
    category: 'Messaging',
    helperText: 'Chat naturally with anyone',
    apps: [
      {
        name: 'WhatsApp',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        ),
      },
      {
        name: 'Telegram',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#0088cc">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        ),
      },
      {
        name: 'Discord',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#5865F2">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Work',
    helperText: 'Stay professional across your team',
    apps: [
      {
        name: 'Slack',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A"/>
            <path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0"/>
            <path d="M18 9a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2V9zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" fill="#2EB67D"/>
            <path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E"/>
          </svg>
        ),
      },
      {
        name: 'Teams',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#6264A7">
            <path d="M20.625 8.25h-7.5v7.5h7.5v-7.5zM22.875 6v11.25c0 1.034-.841 1.875-1.875 1.875H10.125c-1.034 0-1.875-.841-1.875-1.875V6c0-1.034.841-1.875 1.875-1.875H21c1.034 0 1.875.841 1.875 1.875zM6.375 9.375H1.5v7.5h4.875v-7.5zM8.625 21h-6.75C.841 21 0 20.159 0 19.125v-11.25C0 6.841.841 6 1.875 6h6.75v15z"/>
          </svg>
        ),
      },
      {
        name: 'Gmail',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
            <path fill="#FBBC04" d="M0 5.457C0 3.434 2.309 2.28 3.927 3.493L12 9.548V16.64L0 8.91z"/>
            <path fill="#34A853" d="M12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457V8.91L12 16.64z"/>
            <path fill="#C5221F" d="M12 9.548L5.455 4.64 3.927 3.493C2.309 2.28 0 3.434 0 5.457V8.91L12 16.64V9.548z"/>
          </svg>
        ),
      },
      {
        name: 'Outlook',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#0078D4">
            <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/>
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Writing',
    helperText: 'Create better docs and notes',
    apps: [
      {
        name: 'Docs',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/>
            <path fill="#A1C2FA" d="M14 2v6h6L14 2z"/>
            <path fill="#fff" d="M8 12h8v2H8v-2zm0 3h8v2H8v-2zm0-6h5v2H8V9z"/>
          </svg>
        ),
      },
      {
        name: 'Notion',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#000">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.887-.748-.84l-15.177.887c-.56.047-.747.327-.747.887zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
          </svg>
        ),
      },
      {
        name: 'LinkedIn',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        ),
      },
      {
        name: 'Twitter',
        logo: (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#000">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        ),
      },
    ],
  },
];

export default function WorksEverywhereSection() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Heading - Benefit Driven */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-6 leading-tight"
              variants={fadeUpLarge}
            >
              Write Anywhere
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-blue-600">
                You Work.
              </span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-zavi-gray-text max-w-3xl mx-auto leading-relaxed"
              variants={fadeUp}
            >
              One tap in any app. No switching tools. No copy-paste.
            </motion.p>
          </div>

          {/* Apps Grid - Grouped by Use Case */}
          <motion.div className="space-y-12 mb-16" variants={staggerContainer}>
            {APP_GROUPS.map((group, groupIndex) => (
              <motion.div key={groupIndex} variants={fadeUp}>
                {/* Category Header */}
                <div className="text-center mb-6">
                  <h3 className="text-sm font-semibold text-zavi-blue uppercase tracking-wide mb-1">
                    {group.category}
                  </h3>
                  <p className="text-sm text-zavi-gray-text">
                    {group.helperText}
                  </p>
                </div>

                {/* Apps in Category */}
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {group.apps.map((app, appIndex) => (
                    <motion.div
                      key={appIndex}
                      className="group flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {app.logo}
                      </div>
                      <span className="text-xs font-medium text-zavi-charcoal">
                        {app.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Cards - Trust First, Outcome Focused */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
          >
            {/* Card 1: Trust First */}
            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-sky-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zavi-charcoal mb-2">
                    Private & Secure
                  </h3>
                  <p className="text-sm text-zavi-gray-text leading-relaxed">
                    Your writing stays on your device. Nothing sent to the cloud.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Functionality */}
            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-sky-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zavi-charcoal mb-2">
                    Works Everywhere
                  </h3>
                  <p className="text-sm text-zavi-gray-text leading-relaxed">
                    One tap in any app. No switching windows or tools.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Smart Functionality */}
            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-sky-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zavi-charcoal mb-2">
                    Understands Context
                  </h3>
                  <p className="text-sm text-zavi-gray-text leading-relaxed">
                    Adapts tone automatically. Professional in email, casual in chat.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Clear Conversion Action */}
          <motion.div className="text-center" variants={fadeUp}>
            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 text-base font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-all shadow-lg hover:shadow-xl shadow-zavi-blue/30 hover:shadow-zavi-blue/40 inline-flex items-center gap-2"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
            >
              Start Using Zavi
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            {/* Friction-Removing Microcopy */}
            <motion.p
              className="text-sm text-zavi-gray-text mt-4"
              variants={fadeUp}
            >
              Works in 30 seconds. No account required.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
