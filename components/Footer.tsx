'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function Footer() {
  return (
    <footer
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #DBEAFE 0%, #E0F2FE 50%, #F0F9FF 100%)',
      }}
    >
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/zavi-logo.png"
                  alt="Zavi Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Zavi</h2>
            </div>
            <p className="text-sm text-gray-600">
              Think faster than you type.
            </p>
          </motion.div>

          {/* Social Media Links */}
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-sm text-gray-600 mb-4 font-medium">Follow us</p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://x.com/zavivoice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                aria-label="X (Twitter)"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/zavivoice/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.reddit.com/user/Vanilla-Green/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Reddit"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zavivoice/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@goyalraman17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-3xl mx-auto mb-8">
              {/* Product */}
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Product</p>
                <div className="space-y-2">
                  <a href="/demo" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Live Demo</a>
                  <a href="/#pricing" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Download</p>
                    <div className="space-y-1 ml-1 border-l border-gray-200 pl-3">
                      <a href="/download/macos" className="block text-xs text-gray-500 hover:text-blue-600 transition-colors">for macOS</a>
                      <a href="/download/windows" className="block text-xs text-gray-500 hover:text-blue-600 transition-colors">for Windows</a>
                      <a href="/download/linux" className="block text-xs text-gray-500 hover:text-blue-600 transition-colors">for Linux</a>
                      <a href="/download/ios" className="block text-xs text-gray-500 hover:text-blue-600 transition-colors">for iOS</a>
                      <a href="/download/android" className="block text-xs text-gray-500 hover:text-blue-600 transition-colors">for Android</a>
                    </div>
                  </div>
                  <a href="/changelog" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Changelog</a>
                  <a href="/partners" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Partner with Zavi</a>

                  {/* App Store Badges - Inline SVGs for reliability */}
                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href="https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/badge transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg width="135" height="40" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[34px] w-auto drop-shadow-sm">
                        <rect width="135" height="40" rx="6.8" fill="black" />
                        <path d="M19.1418 25.1328C19.2319 25.1328 19.3364 25.1102 19.4604 25.0425C19.8661 24.8113 20.3005 24.6477 20.7629 24.5575C21.2253 24.4673 21.6819 24.4221 22.1327 24.4221C22.6286 24.4221 23.0909 24.4786 23.5194 24.597C23.9479 24.7154 24.3257 24.8847 24.6527 25.1102C24.7317 25.161 24.8106 25.1863 24.8896 25.1863C25.0135 25.1863 25.115 25.1187 25.1884 24.9777C25.5605 24.2388 25.7523 23.4659 25.7635 22.6593C25.7748 21.8527 25.5943 21.0855 25.2222 20.3575C24.8501 19.6295 24.3312 19.0485 23.6656 18.6141C22.9999 18.1797 22.2104 17.9625 21.2968 17.9625C20.8454 17.9625 20.3996 18.019 19.9594 18.1317C19.5192 18.2445 19.1171 18.4251 18.7529 18.6734L15.9392 14.5029C15.8601 14.3901 15.7531 14.3338 15.6178 14.3338C15.4824 14.3338 15.3865 14.3846 15.3302 14.4861L12.5671 19.0321C12.4826 19.1673 12.4404 19.297 12.4404 19.421C12.4404 19.5562 12.4967 19.6635 12.6094 19.7423L18.4144 23.7011C18.6286 23.8475 18.8258 24.0335 19.0062 24.2592C19.0965 24.3831 19.1418 24.524 19.1418 24.682C19.1418 24.8399 19.0911 24.9809 18.9897 25.1051C18.8881 25.2292 18.7584 25.2911 18.6006 25.2911C18.4989 25.2911 18.403 25.2685 18.3129 25.2235C17.5574 24.8847 16.7845 24.7154 15.9941 24.7154C15.1593 24.7154 14.381 24.8847 13.66 25.2235C12.9383 25.5623 12.2854 26.0416 11.7015 26.6617C11.1176 27.2818 10.632 28.0207 10.2448 28.8785C0.9857 29.7364 9.6828 30.6726 9.6152 31.6877C9.5476 32.7027 9.6547 33.7177 9.9366 34.7329C10.2185 35.7479 10.6358 36.6839 11.1883 37.5408C11.7409 38.3978 12.3781 39.1141 13.0999 39.6896C13.8216 40.2649 14.6167 40.7105 15.4852 41.0263C16.3537 41.3421 17.2561 41.5 18.1923 41.5C19.1284 41.5 20.0308 41.3421 20.8993 41.0263C21.7678 40.7105 22.5684 40.2649 23.3013 39.6896C24.0343 39.1141 24.6714 38.3978 25.2127 37.5408C25.7538 36.6839 26.1712 35.7479 26.4646 34.7329C26.758 33.7177 26.8876 32.7027 26.8539 31.6877C26.8202 30.6726 26.6229 29.7364 26.2618 28.8785L25.3255 28.8C25.2127 28.8 25.1057 28.8282 25.0044 28.8847C24.9028 28.9411 24.8183 29.0256 24.7507 29.1384C24.4124 29.7248 24.001 30.2212 23.5165 30.6273C23.032 31.0334 22.513 31.3323 21.9593 31.5239C21.4057 31.7155 20.8304 31.8115 20.2332 31.8115C19.636 31.8115 19.0494 31.7155 18.4735 31.5239C17.8976 31.3323 17.3676 31.0279 16.8831 30.6105C16.3985 30.1931 15.9869 29.68 15.6486 29.0712C15.6149 29.0035 15.5755 28.9415 15.5303 28.8851L18.8431 25.1843C18.9106 25.1054 19.0102 25.066 19.1418 25.066V25.1328ZM19.5786 11.2384C19.5786 11.2721 19.5843 11.3341 19.5956 11.4243C19.5956 11.7513 19.5392 12.1124 19.4264 12.5072C19.3138 12.9018 19.1502 13.2685 18.9358 13.6068C18.7214 13.9451 18.4564 14.2327 18.1408 14.4697C17.825 14.7066 17.4698 14.8927 17.0749 15.028C16.6801 15.1633 16.2629 15.2311 15.823 15.2311C15.4283 15.2311 15.0506 15.1859 14.6897 15.0957C14.3288 15.0055 13.9736 14.8475 13.6241 14.6219C13.2745 14.3963 12.9642 14.1029 12.6934 13.7421C12.4227 13.3813 12.197 12.9472 12.0166 12.4397C11.8361 11.9322 11.7459 11.3626 11.7459 10.7308C11.7459 10.0911 11.9039 9.5385 12.22 9.0728C12.536 8.6071 12.9532 8.2464 13.4719 7.9904C13.9905 7.7345 14.5601 7.6065 15.1802 7.6065C16.1499 7.6065 16.9622 7.8997 17.6164 8.4859C18.2707 9.0722 18.7501 9.8732 19.0544 10.8884L19.4938 10.8378C19.5501 10.8378 19.6121 10.866 19.6798 10.9224C19.7474 10.9788 19.7813 11.0463 19.7813 11.1252C19.7813 11.1702 19.7756 11.2078 19.7643 11.238L19.5786 11.2384Z" fill="white" />
                        <text x="36" y="17" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="9" fill="white">Download on the</text>
                        <text x="36" y="32" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="white">App Store</text>
                      </svg>
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.pingpros.keyboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/badge transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg width="135" height="40" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[34px] w-auto drop-shadow-sm">
                        <rect width="135" height="40" rx="6.8" fill="black" />
                        <path d="M14.9333 11L14 11.9333L21.0667 19L14 26.0667L14.9333 27L22 19.9333L29.0667 27L30 26.0667L22.9333 19L30 11.9333L29.0667 11L22 18.0667L14.9333 11Z" fill="none" />
                        <path d="M9.6631 8.84752C9.43285 9.0886 9.3 9.4287 9.3 9.84523V29.3516C9.3 29.7681 9.43285 30.1082 9.6631 30.3493L9.72893 30.4103L20.6277 19.8242V19.5939L9.72893 8.7845L9.6631 8.84752Z" fill="#3BCCFF" />
                        <path d="M24.269 23.3644L20.6277 19.8251V19.5947L24.271 16.0553L24.3414 16.0953L28.6531 18.4735C29.8864 19.1481 29.8864 20.2711 28.6531 20.9482L24.3414 23.3245L24.269 23.3644Z" fill="#FFD400" />
                        <path d="M24.3414 23.3235L9.72891 30.4103C10.1257 30.8245 10.7716 30.865 11.5113 30.4578L24.3414 23.3235Z" fill="#FF3333" />
                        <path d="M24.3414 16.097L11.5113 8.96275C10.7716 8.55556 10.1257 8.59613 9.72891 9.01026L24.3414 16.097Z" fill="#48FF48" />
                        <text x="36" y="17" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="8" fill="white">GET IT ON</text>
                        <text x="36" y="32" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="white">Google Play</text>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* Compare */}
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Compare</p>
                <div className="space-y-2">
                  <a href="/compare/wispr-flow" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs Wispr Flow</a>
                  <a href="/compare/gboard" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs Gboard</a>
                  <a href="/compare/chatgpt" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs ChatGPT</a>
                  <a href="/compare/dragon" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs Dragon</a>
                  <a href="/compare/willow" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs Willow</a>
                  <a href="/compare/apple-dictation" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">vs Apple Dictation</a>
                  <a href="/compare" className="block text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">All Comparisons →</a>
                </div>
              </div>
              {/* Resources */}
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Resources</p>
                <div className="space-y-2">
                  <a href="/blog" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
                  <a href="/languages" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Languages</a>
                  <a href="/glossary" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Glossary</a>
                  <a href="/about" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
                  <a href="/press-kit" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Press Kit</a>
                  <a href="/investors" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Investors</a>
                </div>
              </div>
              {/* Legal */}
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Legal</p>
                <div className="space-y-2">
                  <a href="/privacy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
                  <a href="/terms" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
                  <a href="/contact" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Contact & Support</a>
                  <a href="/feed.xml" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">RSS Feed</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Global Support Callout */}
        <motion.div
          variants={fadeUp}
          className="max-w-3xl mx-auto mb-12 py-6 px-8 rounded-2xl bg-white/50 border border-white/20 backdrop-blur-sm text-center"
        >
          <p className="text-sm text-gray-600">
            Have questions or need help? <a href="/contact" className="text-blue-600 font-bold hover:underline">Get in touch with our team →</a>
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 border-t border-gray-300 text-center"
        >
          <p className="text-xs text-gray-600">
            © 2026 Zavi. Built for people who think faster than they type.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
