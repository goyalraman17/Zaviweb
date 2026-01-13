# Zavi AI - World-Class Marketing Website

A world-class, motion-driven marketing website for Zavi AI voice typing keyboard. Built to compete with the best SaaS product sites with premium restraint, intelligent motion, and conversion-focused design.

## Philosophy

This website demonstrates intelligence through interaction, not explanation. Every animation has meaning. Every section earns its space. Built to the quality standard of Wispr Flow, Linear, and Arc.

## Features

- 🎯 **Show, Don't Tell**: Live typing demo shows intelligence happening in real-time
- 🎨 **App-Matched Design**: Visual language extracted from actual app screenshots
- ⚡ **Meaningful Motion**: Typing effects, mic pulse, word cleanup - motion that clarifies transformation
- 🏆 **Premium Restraint**: Fewer words, bigger spacing, calm confidence
- 📱 **Mobile-First**: Optimized interactions for touch and desktop
- 🚀 **Performance**: 60fps animations, GPU-accelerated, instant load

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom blue/navy palette
- **Animation**: Framer Motion
- **Font**: Inter via Google Fonts

## Project Structure

```
zaviweb/
├── app/
│   ├── globals.css          # Tailwind + Inter font
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page (5 sections)
├── components/
│   ├── Hero.tsx             # Navy gradient hero with Z-icon + CTA
│   ├── LiveDemo.tsx         # Live typing demo (centerpiece) ⭐
│   ├── HowItWorks.tsx       # 3 steps with visual icons
│   ├── Trust.tsx            # Privacy points
│   ├── FinalCTA.tsx         # Cinematic blue gradient CTA
│   ├── Footer.tsx           # Simple footer
│   └── StickyCTA.tsx        # Mobile sticky CTA
├── package.json
├── tsconfig.json
├── tailwind.config.ts       # Custom blue/navy palette
├── next.config.js
└── postcss.config.js
```

### Section Flow

1. **Hero** - Navy gradient, Z-icon, bold headline, blue CTA
2. **LiveDemo** - Shows intelligence: speech → cleanup → typed text ⭐
3. **HowItWorks** - 3 visual steps, minimal copy
4. **Trust** - Privacy points, calm presentation
5. **FinalCTA** - Blue gradient, conversion-focused

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
- Navy gradient background with subtle grid pattern
- Animated Z-icon with blue gradient fill
- Headline reveal with blue gradient text
- Blue gradient CTA button with play icon
- Ambient glow animation

### Live Demo (Centerpiece)
- Mic button with pulsing animation while "listening"
- Words appear one by one with red strikethrough on fillers
- Transition to "Cleaning up..." state
- Clean text types out character-by-character with cursor
- Progress indicator shows 3 phases
- Demonstrates intelligence through motion

### How It Works
- 3 visual step icons with subtle animations
- Mic pulse, speech waves, checkmark path animation
- Hover scale on icons

### Trust Section
- Icon animations on hover
- Minimal, calm presentation

### Final CTA
- Matching navy gradient background
- Blue gradient CTA matches hero
- Ambient background animations

### Sticky Mobile CTA
- Appears after 800px scroll
- Blue gradient button
- Smooth slide-up/down transitions

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
