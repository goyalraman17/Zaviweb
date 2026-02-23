'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function Footer() {
  return (
    <footer
      className="relative py-24 md:py-32 overflow-hidden border-t border-blue-100"
      style={{
        background: 'radial-gradient(circle at top right, #eff6ff 0%, #ffffff 40%, #f8fafc 100%)',
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Brand & Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 pb-12 border-b border-blue-50">
            <motion.div variants={fadeUp} className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center p-1.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <img src="/zavi-logo.png" alt="Zavi Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Zavi</h2>
              </div>
              <p className="text-base text-slate-500 font-medium max-w-xs leading-relaxed">
                Empowering humans to think faster than they can type.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4">
              {[
                { label: 'X', href: 'https://x.com/zavivoice', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/zavivoice/', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
                { label: 'Instagram', href: 'https://www.instagram.com/zavivoice/', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{social.icon}</svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-left max-w-6xl mx-auto mb-24">
            {/* Product */}
            <motion.div variants={fadeUp}>
              <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6">Product</p>
              <div className="space-y-4">
                <a href="/demo" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Live Demo</a>
                <a href="/#pricing" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Pricing</a>
                <a href="/integrations" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Integrations</a>
                <a href="/changelog" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Changelog</a>
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div variants={fadeUp}>
              <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6">Platforms</p>
              <div className="space-y-4">
                <a href="/download/macos" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">macOS App</a>
                <a href="/download/windows" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Windows App</a>
                <a href="/download/linux" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Linux (.deb)</a>
                <a href="/download/ios" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">iOS Keyboard</a>
                <a href="/download/android" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">Android Keyboard</a>
              </div>
            </motion.div>

            {/* Comparisons */}
            <motion.div variants={fadeUp}>
              <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6">Comparisons</p>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1.5">Voice Typing</p>
                  <a href="/compare/wispr-flow" className="block text-sm text-slate-600 hover:text-blue-600 font-bold transition-all underline decoration-blue-100 underline-offset-4 decoration-2 hover:decoration-blue-400">vs Wispr Flow</a>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1.5">Reasoning</p>
                  <a href="/compare/chatgpt" className="block text-sm text-slate-600 hover:text-blue-600 font-bold transition-all underline decoration-blue-100 underline-offset-4 decoration-2 hover:decoration-blue-400">vs ChatGPT / Claude</a>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1.5">Screen & Automation</p>
                  <div className="flex gap-3 text-sm text-slate-600 font-bold">
                    <a href="/compare" className="hover:text-blue-600 transition-all">Gemini</a>
                    <span className="text-slate-300">/</span>
                    <a href="/compare" className="hover:text-blue-600 transition-all">Zapier</a>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1.5">Standard</p>
                  <div className="flex gap-3 text-sm text-slate-600 font-bold">
                    <a href="/compare/apple-dictation" className="hover:text-blue-600 transition-all">Apple</a>
                    <span className="text-slate-300">/</span>
                    <a href="/compare/gboard" className="hover:text-blue-600 transition-all">Gboard</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div variants={fadeUp}>
              <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6">Company</p>
              <div className="space-y-4">
                <a href="/about" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">The Zavi Story</a>
                <a href="/blog" className="block text-sm text-slate-500 hover:text-blue-600 font-semibold transition-all">AI Insights</a>
                <a href="/contact" className="block text-sm text-blue-600 hover:text-blue-700 font-black transition-all">Contact Support</a>
                <div className="pt-4 flex gap-4">
                  <a href="/privacy" className="text-[11px] text-slate-400 hover:text-slate-600 font-medium">Privacy</a>
                  <a href="/terms" className="text-[11px] text-slate-400 hover:text-slate-600 font-medium">Terms</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Premium Badges Container */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <a
              href="https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802"
              target="_blank"
              className="group relative px-6 py-3 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/5 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors" />
              <div className="relative flex items-center gap-3">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.24-2.27.81-3.5-1.58.06-2.73 1.17-3.48 1.98-.7.75-1.35 1.93-1.04 3.1 1.58.12 2.98-.75 3.71-1.58z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">Download on</p>
                  <p className="text-base text-white font-black leading-none">App Store</p>
                </div>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.pingpros.keyboard"
              target="_blank"
              className="group relative px-6 py-3 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/5 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors" />
              <div className="relative flex items-center gap-3">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.31.424-.31.702 0 .551.448.999.999.999.278 0 .522-.13.702-.31l10.885-10.885c.18-.18.31-.424.31-.702s-.13-.522-.31-.702L5.001.403c-.18-.18-.424-.31-.702-.31-.551 0-.999.448-.999.999 0 .278.13.522.31.701zM18.887 12l2.311 1.34c.55.32.9.89.9 1.54 0 .65-.35 1.22-.9 1.54L5.61 24.81c-.55.32-1.22.32-1.77 0-.55-.32-.9-.89-.9-1.54V.73c0-.65.35-1.22.9-1.54.55-.32 1.22-.32 1.77 0l15.588 9.03c.55.32.9.89.9 1.54 0 .65-.35 1.22-.9 1.54L18.887 12z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">Get it on</p>
                  <p className="text-base text-white font-black leading-none">Google Play</p>
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Global Support Callout */}
        <motion.div
          variants={fadeUp}
          className="max-w-4xl mx-auto py-8 px-10 rounded-[2.5rem] bg-blue-600 shadow-2xl shadow-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-lg text-white font-bold text-center md:text-left">
            Have questions or need technical support?
          </p>
          <a href="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
            Talk to our team
          </a>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-4"
        >
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">
            © 2026 Zavi • Designed for Deep Work
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
