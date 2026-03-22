# Voice-to-Text UI Components

A collection of whimsical, warm, and premium React components for voice-to-text interfaces, built with Next.js, Tailwind CSS, and Framer Motion.

## Design Language

- **Colors**: Soft off-white backgrounds (#F5F1EC), gentle pastels, warm beige, muted purples (#9B86BD) and greens (#B8D4C8)
- **Typography**: Large expressive serif fonts for headlines (Georgia, Cambria), clean sans-serif for body text
- **Style**: Rounded corners, curved edges, playful micro-interactions, smooth transitions
- **No cold blues, generic shadows, or heavy borders**

## Components

### Hero
Big, bold hero section with pulsing mic icon and call-to-action.

```tsx
import { Hero } from '@/components/voice';

<Hero />
```

**Features:**
- Large serif headline with accent color
- Animated pulsing mic button
- Decorative background blobs
- Fully responsive

---

### DemoCard
Two-panel visual showing spoken input transforming into polished text.

```tsx
import { DemoCard } from '@/components/voice';

<DemoCard />
```

**Features:**
- Side-by-side comparison (raw vs polished)
- Animated arrow divider
- Multiple examples with switcher dots
- Hover interactions
- Mobile-friendly stacked layout

---

### CurvedText
Decorative curved text using SVG textPath.

```tsx
import {
  CurvedText,
  CurvedTextChaotic,
  CurvedTextPolished,
  CurvedTextFeature
} from '@/components/voice';

// Custom
<CurvedText
  text="Your custom text"
  variant="swirl"  // 'swirl' | 'arc' | 'wave'
  subtitle="Optional subtitle"
/>

// Presets
<CurvedTextChaotic />
<CurvedTextPolished />
<CurvedTextFeature />
```

**Features:**
- Three path variants: swirl, arc, wave
- Animated path drawing
- Moving dot animation
- Gradient text

---

### TrustStrip
Logo showcase with hover effects.

```tsx
import { TrustStrip, TrustStripLogos } from '@/components/voice';

<TrustStrip />        // Default with initials
<TrustStripLogos />   // Alternative with logo placeholders
```

**Features:**
- Grayscale hover effect
- Staggered animation entrance
- Company name reveal on hover
- Replace placeholders with actual logos

---

### ToneSwitcher
Interactive tone selector with animated examples.

```tsx
import { ToneSwitcher, ToneSwitcherCompact } from '@/components/voice';

<ToneSwitcher />          // Full version
<ToneSwitcherCompact />   // Compact pill variant
```

**Features:**
- Three tones: Formal, Casual, Playful
- Animated text transitions
- Color-coded badges
- Smooth example switching

---

### DeviceGrid
Platform support showcase with playful device cards.

```tsx
import {
  DeviceGrid,
  DeviceGridCompact,
  DeviceIconStrip
} from '@/components/voice';

<DeviceGrid />         // Full grid with descriptions
<DeviceGridCompact />  // Compact cards
<DeviceIconStrip />    // Icons only
```

**Features:**
- iOS, Android, macOS, Windows, Linux, Web
- Hover lift effect
- Gradient backgrounds
- Responsive grid (1→2→3 columns)

---

## Demo Page

View all components in action on the landing page:

```
http://localhost:3000/#download
```

## Customization

### Colors
Update the Tailwind config or use inline styles:

```tsx
// Main brand colors used:
- Primary: #9B86BD (muted purple)
- Background: #F5F1EC (soft beige)
- Accent: #B8D4C8 (muted green)
- Text: #34384c (charcoal)
```

### Animations
All components use Framer Motion with shared animation variants from `@/lib/animations`:

- `fadeIn`, `fadeUp` - Entrance animations
- `staggerContainer` - Sequential reveals
- Custom hover/tap effects

### Responsive
Mobile-first design using Tailwind breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px

## Performance

- GPU-accelerated transforms
- Lazy loading ready
- Optimized animations
- Reduced motion support

## Accessibility

- Semantic HTML
- ARIA labels
- Focus states
- Keyboard navigation
- `prefers-reduced-motion` support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Integration

To add to your existing page:

```tsx
import {
  Hero,
  DemoCard,
  ToneSwitcher,
  DeviceGrid
} from '@/components/voice';

export default function MyPage() {
  return (
    <>
      <Hero />
      <DemoCard />
      <ToneSwitcher />
      <DeviceGrid />
    </>
  );
}
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion 11.2
- **Language**: TypeScript 5.4

## License

Part of the Zavi AI project.
