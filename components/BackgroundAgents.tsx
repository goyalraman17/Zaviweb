'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

const agents = [
  {
    icon: "📧",
    title: "Morning Email Briefing",
    command: "Check my Gmail every morning at 8 AM and WhatsApp me a summary of urgent emails.",
    steps: ["Reads your inbox at 8 AM", "Filters by urgency & sender", "Sends WhatsApp summary", "Asks: 'Want me to draft replies?'"],
    tag: "Runs daily at 8:00 AM",
  },
  {
    icon: "💬",
    title: "Slack Watchdog",
    command: "Monitor #engineering on Slack and alert me on WhatsApp if there's an incident or my name is mentioned.",
    steps: ["Watches Slack channel 24/7", "Detects incidents & mentions", "Sends instant WhatsApp alert", "You reply to take action"],
    tag: "Always monitoring",
  },
  {
    icon: "📅",
    title: "Meeting Prep Autopilot",
    command: "30 minutes before each meeting, pull the relevant Notion docs and email threads, then summarize them for me.",
    steps: ["Checks your calendar", "Pulls Notion docs & emails", "Creates a briefing summary", "Delivers it before you walk in"],
    tag: "Triggered by calendar events",
  },
];

export default function BackgroundAgents() {
  const [activeAgent, setActiveAgent] = useState(0);
  const active = agents[activeAgent];

  return (
    <section className="py-14 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-large relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Only Zavi does this
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0a0a] tracking-tight mb-6" style={{ lineHeight: 1.1 }}>
              You sleep.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                Zavi works.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Create background agents with a single sentence. They run on a schedule, connect to your apps, and report back via WhatsApp.
            </p>
          </motion.div>

          {/* Agent Selector Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {agents.map((agent, i) => (
              <button
                key={i}
                onClick={() => setActiveAgent(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeAgent === i
                    ? 'bg-[#0a0a0a] text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-lg">{agent.icon}</span>
                {agent.title}
              </button>
            ))}
          </motion.div>

          {/* Active Agent Detail */}
          <motion.div
            key={activeAgent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: The Command */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">You say:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                  <p className="text-xl md:text-2xl text-[#0a0a0a] font-medium leading-relaxed italic">
                    &ldquo;{active.command}&rdquo;
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {active.tag}
                </div>
              </div>

              {/* Right: What Zavi Does */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Zavi automatically:</p>
                <div className="space-y-4">
                  {active.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 text-blue-600 text-sm font-bold">
                        {i + 1}
                      </div>
                      <p className="text-gray-600 text-[15px] leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Proof */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 text-sm font-medium mb-6">
              No code. No Zapier. One sentence creates the automation.
            </p>
            <a
              href="/#download"
              onClick={(e) => {
                e.preventDefault();
                analytics.track('cta_agents_click');
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all hover:scale-[1.02]"
            >
              Try Background Agents Free
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
