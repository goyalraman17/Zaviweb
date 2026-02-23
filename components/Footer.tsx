'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAFA] pt-24 pb-32 md:pb-12 overflow-hidden border-t border-slate-200">
      <div className="container-large relative z-10 max-w-7xl mx-auto px-6">

        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mb-32">

          {/* Company */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-slate-800 font-medium mb-6">Company</h3>
            <div className="space-y-4">
              <a href="/about" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">The Zavi Story</a>
              <a href="/blog" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">AI Insights</a>
              <a href="/contact" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Contact Support</a>
              <a href="/privacy" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Privacy Policy</a>
              <a href="/terms" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Terms of Service</a>
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-slate-800 font-medium mb-6">Product</h3>
            <div className="space-y-4">
              <a href="/demo" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Live Demo</a>
              <a href="/#pricing" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Pricing</a>
              <a href="/integrations" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Integrations</a>
              <a href="/use-cases" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Use Cases</a>
              <a href="/changelog" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Changelog</a>
            </div>
          </motion.div>

          {/* Platforms */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-slate-800 font-medium mb-6">Platforms</h3>
            <div className="space-y-4">
              <a href="/download/macos" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Mac App</a>
              <a href="/download/windows" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Windows App</a>
              <a href="/download/linux" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Linux App</a>
              <a href="/download/ios" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">iOS App</a>
              <a href="/download/android" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">Android App</a>
            </div>
          </motion.div>

          {/* Comparisons */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-slate-800 font-medium mb-6">Comparisons</h3>
            <div className="space-y-4">
              <a href="/compare/wispr-flow" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">vs Wispr Flow</a>
              <a href="/compare/chatgpt" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">vs ChatGPT</a>
              <a href="/compare/claude" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">vs Claude</a>
              <a href="/compare/gemini-live" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">vs Gemini Live</a>
              <a href="/compare/siri" className="block text-[15px] font-bold text-slate-800 hover:text-slate-500 transition-colors">vs Apple Siri</a>
            </div>
          </motion.div>

        </div>

        {/* Massive Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center mb-16"
        >
          <div className="flex items-center gap-8 px-4 w-full justify-center">
            <h1 className="text-[100px] md:text-[200px] leading-none font-black text-slate-900 tracking-tighter">Zavi</h1>
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright, Links, Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 w-full pt-8 border-t border-slate-200"
        >

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[12px] font-bold text-slate-800">
            <span>© Zavi 2026</span>
            <a href="/terms" className="hover:text-slate-500 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-slate-500 transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-slate-500 transition-colors">Data Controls</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {[
              { label: 'YouTube', href: 'https://www.youtube.com/@goyalraman17', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
              { label: 'Instagram', href: 'https://www.instagram.com/zavivoice/', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
              { label: 'X', href: 'https://x.com/zavivoice', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
              { label: 'LinkedIn', href: 'https://linkedin.com/company/zavivoice/', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
              { label: 'Reddit', href: 'https://www.reddit.com/user/Vanilla-Green/', icon: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /> },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 text-slate-800 hover:text-slate-500 transition-colors"
                aria-label={social.label}
              >
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">{social.icon}</svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
