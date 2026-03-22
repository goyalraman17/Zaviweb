'use client';

import { motion } from 'framer-motion';

const problems = [
  {
    pain: "You're still typing emails with your thumbs.",
    stat: "Average professional types 40 WPM. You speak at 150.",
    solution: "Speak naturally. Zavi removes filler words, fixes grammar, and types perfect text.",
    command: '"Reply to Sarah saying I approve the budget"',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    pain: "You check Slack, Gmail, and Notion 50+ times a day.",
    stat: "Context switching costs 23 minutes per interruption.",
    solution: "Background agents monitor your apps and send summaries to WhatsApp.",
    command: '"Summarize my unread Slack and email every morning at 9"',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    pain: "You forget to follow up. Every single time.",
    stat: "80% of deals need 5+ follow-ups. Most people stop at 1.",
    solution: "Tell Zavi once. It drafts, schedules, and reminds you automatically.",
    command: '"Follow up with the design team about Q3 assets on Friday"',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    pain: "You're doing the same tasks manually, every day.",
    stat: "Professionals waste 2+ hours daily on repetitive digital tasks.",
    solution: "Create voice-triggered automations that run across your entire stack.",
    command: '"Every Monday, pull my Notion tasks and post a summary to #team"',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="container-large">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">
              You're still doing this manually?
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
              Every problem. One voice command.
            </h2>
          </motion.div>

          {/* Problem Cards */}
          <div className="space-y-6">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                  {/* Left: Problem */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#0a0a0a]">{p.pain}</p>
                        <p className="text-sm text-gray-400 mt-1">{p.stat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Solution */}
                  <div className="border-t border-gray-100 pt-4 md:border-t-0 md:border-l md:border-gray-200 md:pt-0 md:pl-6">
                    <p className="text-[15px] text-gray-600 mb-3">{p.solution}</p>
                    <div className="bg-white rounded-xl px-4 py-3 border border-blue-100 shadow-sm">
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Just say:</p>
                      <p className="text-sm text-gray-700 font-medium italic">{p.command}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="/#download"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
            >
              Stop doing this manually
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
