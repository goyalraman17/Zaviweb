# Zavi AI - Interactive Landing Page

A production-grade, motion-driven landing page for Zavi AI voice typing keyboard. Built with Next.js 14, React, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- 🎨 **Motion-First Design**: Scroll-choreographed animations and micro-interactions throughout
- 📱 **Mobile-First & Responsive**: Optimized for all screen sizes with device-specific interactions
- ⚡ **Performance Optimized**: Fast load times, smooth 60fps animations, efficient rendering
- ♿ **Accessible**: Respects `prefers-reduced-motion` and includes proper semantic HTML
- 🎯 **Conversion Focused**: Strategic CTAs with sticky mobile action bar
- 🎭 **Interactive Demo**: Animated before/after speech transformation showcase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Font**: Inter (Google Fonts)

## Project Structure

```
zaviweb/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx              # Animated hero with ambient background
│   ├── Problem.tsx           # Problem statement cards
│   ├── BeforeAfter.tsx       # Interactive speech demo (centerpiece)
│   ├── Features.tsx          # Feature grid with icons
│   ├── Audience.tsx          # Target personas
│   ├── HowItWorks.tsx        # 3-step process
│   ├── Privacy.tsx           # Privacy assurances
│   ├── Pro.tsx               # Pro tier promotion
│   ├── FinalCTA.tsx          # Cinematic closing CTA
│   ├── Footer.tsx            # Site footer
│   ├── StickyCTA.tsx         # Scroll-aware mobile CTA
│   └── AnimatedSection.tsx   # Reusable scroll animation wrapper
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## Installation & Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=.next
```

Or use the Netlify web interface to connect your repo.

### Environment Variables

No environment variables required. All CTAs link directly to:
```
https://play.google.com/store/apps/details?id=com.pingpros.keyboard
```

## Key Interactions

### Hero Section
- Animated headline reveal with staggered word appearance
- Ambient floating background elements
- Smooth scroll indicator
- Hover/tap button micro-interactions

### Before/After Demo
- Desktop: Side-by-side comparison with arrow transition
- Mobile: Animated text morphing with color/style transformation
- Scroll-triggered activation with smooth easing

### Sticky CTA
- Appears after 800px scroll
- Hides 600px before page end
- Mobile-only with backdrop blur
- Smooth slide-up/down transitions

### Card Animations
- Scroll-triggered fade-in with stagger delays
- Hover lift effects on all interactive cards
- Icon rotation/scale on hover
- Button press feedback

## Performance Notes

- All animations use GPU-accelerated properties (transform, opacity)
- Framer Motion's `useInView` with `once: true` prevents re-renders
- Images and fonts are optimized by Next.js
- Reduced motion support via CSS media queries
- Mobile-first responsive design minimizes paint operations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

© 2026 Zavi. All rights reserved.
