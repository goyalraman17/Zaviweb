'use client';

import { motion } from 'framer-motion';

const messages = [
  { from: 'zavi', text: "Good morning! Here's your daily briefing:", time: '8:00 AM' },
  { from: 'zavi', text: "3 urgent emails:\n1. Sarah (Budget approval needed)\n2. DevOps (Server alert - resolved)\n3. HR (Benefits enrollment deadline tomorrow)\n\nShall I draft replies?", time: '8:00 AM' },
  { from: 'user', text: "Reply to Sarah: Approved. Send it.", time: '8:02 AM' },
  { from: 'zavi', text: "Done. Email sent to Sarah:\n\n\"Hi Sarah, the budget is approved. Please proceed with the next steps. Best, [You]\"\n\nAnything else?", time: '8:02 AM' },
  { from: 'user', text: "Draft a reply to HR about the benefits.", time: '8:03 AM' },
  { from: 'zavi', text: "Draft ready:\n\n\"Hi HR Team, Thank you for the reminder. I'll complete my benefits enrollment today before the deadline. Best regards.\"\n\nApprove or edit?", time: '8:03 AM' },
  { from: 'user', text: "Approve", time: '8:03 AM' },
  { from: 'zavi', text: "Sent. You're all caught up. Have a great day!", time: '8:03 AM' },
];

export default function WhatsAppBot() {
  return (
    <section id="how-it-works" className="py-14 md:py-28 bg-white relative overflow-hidden">
      <div className="container-large">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-semibold mb-6">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp & Telegram
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-6" style={{ lineHeight: 1.1 }}>
                Your AI that{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-emerald-500">
                  messages you back.
                </span>
              </h2>

              <p className="text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                Zavi doesn't just execute tasks silently. It reports back to you on WhatsApp or Telegram, asks for approvals, and lets you respond with a simple "yes" or "edit this."
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Agents deliver results to your chat',
                  'Reply "approve" to send emails or messages',
                  'Ask follow-up questions naturally',
                  'Run any agent from a text message',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[15px] text-gray-600 font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-400 font-medium mb-6">
                It's like having a chief of staff in your pocket.
              </p>

              <a
                href="/#download"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
              >
                Try it free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>

            {/* Right: WhatsApp Chat Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div               className="bg-[#0B141A] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 max-w-sm mx-auto w-full">
                {/* WhatsApp Header */}
                <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white text-sm font-bold">Z</div>
                  <div>
                    <p className="text-white text-sm font-semibold">Zavi Assistant</p>
                    <p className="text-[11px] text-emerald-400">online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-3 space-y-2 max-h-[420px] overflow-y-hidden" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        msg.from === 'user' 
                          ? 'bg-[#005C4B] text-white' 
                          : 'bg-[#1F2C34] text-gray-200'
                      }`}>
                        <p className="text-[13px] leading-relaxed whitespace-pre-line">{msg.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${msg.from === 'user' ? 'text-emerald-300/60' : 'text-gray-500'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="bg-[#1F2C34] px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2">
                    <p className="text-[13px] text-gray-500">Message Zavi...</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
