'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'email', label: 'Email' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'work', label: 'Work' },
  { id: 'automation', label: 'Automations' },
  { id: 'writing', label: 'Writing' },
];

const useCases = [
  {
    category: 'email',
    emoji: '📧',
    title: 'Draft & send emails',
    command: '"Email John the meeting notes from yesterday. Keep it professional."',
    result: 'Zavi pulls notes, drafts the email, and sends it.',
  },
  {
    category: 'automation',
    emoji: '☀️',
    title: 'Morning briefings',
    command: '"Summarize my inbox every morning at 8 AM and text me on WhatsApp."',
    result: 'Runs daily. Reads Gmail. Sends WhatsApp summary.',
  },
  {
    category: 'messaging',
    emoji: '💬',
    title: 'Reply to WhatsApp & Slack',
    command: '"Tell the team on Slack that the deploy is done."',
    result: 'Posts to the right channel with perfect formatting.',
  },
  {
    category: 'work',
    emoji: '📋',
    title: 'Create tasks & tickets',
    command: '"Create a Notion task: review the Q3 marketing deck by Friday."',
    result: 'Creates the task with deadline in your Notion workspace.',
  },
  {
    category: 'automation',
    emoji: '👀',
    title: 'Monitor Slack channels',
    command: '"Watch #incidents and alert me on WhatsApp if severity is high."',
    result: 'Runs 24/7. Filters by severity. Pings you instantly.',
  },
  {
    category: 'writing',
    emoji: '✍️',
    title: 'Write long-form content',
    command: '"Write a LinkedIn post about our Series A announcement."',
    result: 'Drafts a professional post with proper tone and formatting.',
  },
  {
    category: 'email',
    emoji: '🔄',
    title: 'Auto-reply to emails',
    command: '"Draft replies to my 3 most urgent unread emails."',
    result: 'Reads context, drafts replies, saves as drafts for review.',
  },
  {
    category: 'work',
    emoji: '📅',
    title: 'Schedule meetings',
    command: '"Find 30 minutes with Sarah next week for a design review."',
    result: 'Checks calendars, finds a slot, sends the invite.',
  },
  {
    category: 'writing',
    emoji: '🌍',
    title: 'Translate anything',
    command: '"Translate this email to Japanese and make it more formal."',
    result: 'Translates in-place with cultural tone adjustments.',
  },
  {
    category: 'messaging',
    emoji: '📱',
    title: 'Send iMessages',
    command: '"Text mom that I\'ll be home by 7."',
    result: 'Sends via iMessage on Mac. No phone needed.',
  },
  {
    category: 'automation',
    emoji: '📊',
    title: 'Weekly team updates',
    command: '"Every Friday at 5 PM, summarize our GitHub PRs and post to #engineering."',
    result: 'Pulls PR data, formats summary, posts to Slack.',
  },
  {
    category: 'work',
    emoji: '🔍',
    title: 'Research anything',
    command: '"What\'s NVIDIA\'s current stock price and their top 3 competitors?"',
    result: 'Searches the web, compiles data, gives you a summary.',
  },
];

export default function UseCaseShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const allFiltered = activeCategory === 'all'
    ? useCases
    : useCases.filter((uc) => uc.category === activeCategory);
  
  const filtered = showAll ? allFiltered : allFiltered.slice(0, 6);

  return (
    <section className="py-14 md:py-24 bg-gray-50">
      <div className="container-large">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
              What people actually{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                use Zavi for.
              </span>
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Real commands. Real results. Every single day.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Use Case Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{uc.emoji}</span>
                  <h3 className="text-sm font-bold text-[#0a0a0a]">{uc.title}</h3>
                </div>
                <p className="text-[13px] text-gray-500 italic mb-3 leading-relaxed">{uc.command}</p>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[13px] text-gray-600 font-medium">{uc.result}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More Toggle */}
          {!showAll && allFiltered.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Show all {allFiltered.length} use cases
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="/#download"
              onClick={(e) => {
                e.preventDefault();
                analytics.track('cta_click', { location: 'use_cases' });
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
            >
              Start using Zavi for free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
