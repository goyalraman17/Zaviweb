'use client';

import { motion } from 'framer-motion';
import { Mail, Globe, Lightbulb, Package, CheckSquare, Mic } from 'lucide-react';
import { useState } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function TryFreePage() {
  const [selectedUseCase, setSelectedUseCase] = useState('email');
  const [isRecording, setIsRecording] = useState(false);

  const useCases = [
    { id: 'email', label: 'Draft an email', icon: Mail, color: '#FF9B71' },
    { id: 'chatgpt', label: 'ChatGPT prompt', icon: Globe, color: '#10A37F' },
    { id: 'idea', label: 'Capture an idea', icon: Lightbulb, color: '#FFD666' },
    { id: 'crm', label: 'CRM update', icon: Package, color: '#A78BFA' },
    { id: 'todo', label: 'To-Do list', icon: CheckSquare, color: '#60A5FA' },
  ];

  const demoContent = {
    email: {
      to: 'Nora Miller',
      subject: 'My first Zavi message',
      body: "Hi Nora,\n\nI'm looking forward to working with you. Are you available to meet at 3pm on Friday?\n\nBest,\nJacob",
    },
    chatgpt: {
      to: 'ChatGPT',
      subject: 'Research prompt',
      body: "Can you help me analyze the latest trends in AI voice technology and summarize the key findings in a concise format?",
    },
    idea: {
      to: 'Notes',
      subject: 'Product idea',
      body: "New feature concept: Add collaborative voice notes where team members can leave audio comments that auto-transcribe.",
    },
    crm: {
      to: 'Salesforce',
      subject: 'Client update',
      body: "Meeting with Acme Corp went well. They're interested in the enterprise plan. Follow up next Tuesday to discuss implementation timeline.",
    },
    todo: {
      to: 'Tasks',
      subject: 'Today\'s priorities',
      body: "1. Review Q1 marketing analytics\n2. Prepare deck for investor meeting\n3. Schedule team standup\n4. Follow up on partnership proposals",
    },
  };

  const currentDemo = demoContent[selectedUseCase as keyof typeof demoContent];

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #F0E8F5 30%, #E5F0F8 70%, #E8F5F0 100%)'
      }}
    >
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="max-w-5xl mx-auto"
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[#1a1a1a] text-center"
            variants={fadeUpLarge}
            style={{ lineHeight: 1.15 }}
          >
            Try voice typing for any use case.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-3xl mx-auto"
            variants={fadeUp}
          >
            Zavi auto-formats your speech into polished text in seconds—across all your favorite apps.
          </motion.p>

          {/* Use Case Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              const isActive = selectedUseCase === useCase.id;
              return (
                <button
                  key={useCase.id}
                  onClick={() => setSelectedUseCase(useCase.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 shadow-sm hover:shadow-md
                    ${isActive
                      ? 'bg-white text-gray-900 scale-105'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                    }
                  `}
                  style={{
                    backgroundColor: isActive ? useCase.color : undefined,
                    color: isActive ? '#ffffff' : undefined,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {useCase.label}
                </button>
              );
            })}
          </motion.div>

          {/* Demo Card */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-200 max-w-3xl mx-auto"
          >
            {/* Email Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {currentDemo.to[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">To:</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {currentDemo.to}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Subject:</div>
                <div className="text-base font-semibold text-gray-900">
                  {currentDemo.subject}
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {currentDemo.body}
              </p>
            </div>

            {/* App Icons */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Dictation CTA */}
          <motion.div
            variants={fadeUp}
            className="text-center"
          >
            <motion.button
              onClick={() => setIsRecording(!isRecording)}
              className={`
                px-12 py-5 text-lg font-semibold rounded-full
                shadow-2xl transition-all duration-300
                flex items-center gap-3 mx-auto mb-6
                ${isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-[#6B7FE8] text-white hover:bg-[#5a6fd4]'
                }
              `}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
            >
              <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
              {isRecording ? 'Recording...' : 'Start dictating'}
            </motion.button>

            <p className="text-base text-gray-600">
              Or hold the{' '}
              <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-300 font-mono text-sm">
                space
              </kbd>{' '}
              key and start speaking
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-3xl" />
      </div>
    </main>
  );
}
