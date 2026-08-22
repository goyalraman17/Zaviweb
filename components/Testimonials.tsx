'use client';

import { motion } from 'framer-motion';
import JsonLd from '@/components/SEO/JsonLd';
import { generateReviewSchema } from '@/lib/schemaData';

const testimonials = [
  {
    quote:
      'I speak in Hindi and English together and Zavi turns it into clean client emails. It finally feels faster than typing.',
    author: 'Sarah Chen',
    role: 'Product Manager',
    initials: 'SC',
    tone: 'from-blue-500 to-sky-400',
  },
  {
    quote:
      'The best part is that it works everywhere I write. Slack, Gmail, docs, WhatsApp—same habit every time: speak and send.',
    author: 'Marcus Rodriguez',
    role: 'Engineering Lead',
    initials: 'MR',
    tone: 'from-violet-500 to-fuchsia-400',
  },
  {
    quote:
      'I dictate in Spanish and it types polished English emails. Magic Wand lets me highlight any text and simply say “make this formal.”',
    author: 'Elena Rossi',
    role: 'Marketing Director',
    initials: 'ER',
    tone: 'from-amber-500 to-orange-400',
  },
];

export default function Testimonials() {
  const reviewSchema = generateReviewSchema(
    testimonials.map((testimonial) => ({
      author: testimonial.author,
      role: testimonial.role,
      content: testimonial.quote,
    }))
  );

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <JsonLd data={reviewSchema} />
      <div className="container-large">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0.84, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              People who stopped typing
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              It becomes a daily habit.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.author}
                initial={{ opacity: 0.84, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="flex min-h-[330px] flex-col justify-between rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-8"
              >
                <div>
                  <div className="text-4xl font-black leading-none text-blue-200">
                    “
                  </div>
                  <p className="mt-5 text-xl font-semibold leading-relaxed text-slate-800">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="mt-9 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.tone} text-xs font-black text-white`}
                  >
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
