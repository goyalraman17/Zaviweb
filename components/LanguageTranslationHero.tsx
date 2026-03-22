'use client';

import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';

const LANGUAGE_FLOWS = [
  {
    input: { flag: '🇮🇳', name: 'Hindi', example: 'हाँ तो... आज मीटिंग में, उम्म, quarterly targets के बारे में बात की और marketing budget को 15% बढ़ाने का decide किया था।' },
    output: { flag: '🇬🇧', name: 'English', text: 'In today\'s meeting, we discussed the quarterly targets and agreed to increase our marketing budget by 15%.' },
  },
  {
    input: { flag: '🇪🇸', name: 'Spanish', example: 'Bueno, necesitamos como... hablar del timeline del proyecto, no? Y asegurar que todo el mundo está, eh, alineado con los deliverables.' },
    output: { flag: '🇬🇧', name: 'English', text: 'We need to discuss the project timeline and ensure all stakeholders are aligned on the deliverables.' },
  },
  {
    input: { flag: '🇯🇵', name: 'Japanese', example: 'えーと、来週の月曜日に、あの、クライアントミーティングがあって、プレゼンの準備をしなきゃいけないんですけど...' },
    output: { flag: '🇬🇧', name: 'English', text: 'We have a client meeting next Monday and need to prepare the presentation materials beforehand.' },
  },
  {
    input: { flag: '🇬🇧', name: 'English', example: 'So um, just wanted to let you know that the proposal got approved and we can like, move forward with next phase now.' },
    output: { flag: '🇫🇷', name: 'French', text: 'Je voudrais vous informer que la proposition a été approuvée et nous pouvons procéder à la prochaine étape.' },
  },
];

export default function LanguageTranslationHero() {
  return (
    <section className="py-14 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-large relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              100+ Languages
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0a0a] tracking-tight mb-6" style={{ lineHeight: 1.1 }}>
              Speak in one language.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                Write in another.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Speak Hindi, get perfect English. Speak English, get professional French. Zavi translates, removes filler words, and fixes grammar — all in real-time.
            </p>
          </motion.div>

          {/* Language Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {LANGUAGE_FLOWS.map((flow, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                {/* Input */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{flow.input.flag}</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">You speak</p>
                      <p className="text-sm font-bold text-[#0a0a0a]">{flow.input.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 italic leading-relaxed">{flow.input.example}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Output */}
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{flow.output.flag}</span>
                    <div>
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Zavi writes</p>
                      <p className="text-sm font-bold text-[#0a0a0a]">{flow.output.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{flow.output.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats + CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Language stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {[
                { value: '100+', label: 'Input languages' },
                { value: '15+', label: 'Translation targets' },
                { value: 'Real-time', label: 'Code-switching' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-[#0a0a0a]">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="/#download"
              onClick={(e) => {
                e.preventDefault();
                analytics.track('cta_click', { location: 'translation' });
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
            >
              Break the language barrier
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
