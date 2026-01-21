'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { staggerContainerSlow, fadeUp } from '@/lib/animations'
import { Mail, MessageSquare, Lightbulb, Users, ListTodo } from 'lucide-react'

const useCases = [
  {
    id: 'email',
    label: 'Draft an email',
    icon: Mail,
    demo: {
      to: 'Nora Miller',
      subject: 'My first Zavi message',
      body: `Hi Nora,

I'm looking forward to working with you. Are you available to meet at 3pm on Friday?

Best,
Jacob`
    }
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT prompt',
    icon: MessageSquare,
    demo: {
      to: 'ChatGPT',
      subject: 'Writing prompt',
      body: `Can you help me write a compelling product description for a voice typing app that auto-formats speech into polished text? Focus on the time-saving benefits and professional quality output.`
    }
  },
  {
    id: 'idea',
    label: 'Capture an idea',
    icon: Lightbulb,
    demo: {
      to: 'Ideas',
      subject: 'New feature concept',
      body: `What if we added a collaboration feature that lets teams share voice notes and have them automatically transcribed and formatted for everyone? Could integrate with Slack and Teams.`
    }
  },
  {
    id: 'crm',
    label: 'CRM update',
    icon: Users,
    demo: {
      to: 'Sales CRM',
      subject: 'Client meeting notes',
      body: `Just finished meeting with Acme Corp. They're interested in the enterprise plan. Key decision maker is Sarah Chen, CTO. Follow up next Tuesday to discuss implementation timeline and custom integration needs.`
    }
  },
  {
    id: 'todo',
    label: 'To-Do list',
    icon: ListTodo,
    demo: {
      to: 'Tasks',
      subject: 'Today\'s priorities',
      body: `• Review Q4 marketing budget
• Prepare slides for investor meeting
• Schedule team 1-on-1s for next week
• Follow up with design team on new landing page
• Book flight for SF conference`
    }
  }
]

export default function VoiceTypingDemo() {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0])

  return (
    <section id="try-demo" className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div className="container-large relative z-10">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-display text-center mb-4 md:mb-6"
          >
            Use It Anywhere
          </motion.h2>

          {/* Short declarative line */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl mx-auto mb-6 font-medium"
          >
            Every app you use. Zero setup.
          </motion.p>

          {/* App Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              Gmail
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              Slack
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              ChatGPT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              Notion
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              WhatsApp
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              +1000s more
            </span>
          </motion.div>

          {/* Use Case Tabs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
          >
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveUseCase(useCase)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold
                    transition-all duration-300 border-2
                    ${
                      activeUseCase.id === useCase.id
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:shadow-md'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  {useCase.label}
                </button>
              )
            })}
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            variants={fadeUp}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              key={activeUseCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 mb-8"
            >
              {/* Email Header */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                    {activeUseCase.demo.to.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">To:</div>
                    <div className="font-semibold text-gray-900">{activeUseCase.demo.to}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Subject:</div>
                  <div className="font-semibold text-gray-900">{activeUseCase.demo.subject}</div>
                </div>
              </div>

              {/* Email Body */}
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {activeUseCase.demo.body}
              </div>

              {/* Action Icons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                  <Mail className="w-5 h-5 text-red-500" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Start Dictating Button */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-4"
            >
              <a
                href="/#try-demo"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] text-white text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                Start dictating
              </a>
              <p className="text-sm md:text-base text-gray-600">
                Or hold the <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono text-sm">space</kbd> key and start speaking
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
