# Global Motion System Documentation

A centralized, performance-optimized animation system for the Zavi AI application.

## 🎯 Overview

This motion system provides:
- **Standardized durations** (fast, base, slow, slower)
- **Premium easing curves** (smooth, snappy, gentle, spring, emphasized)
- **Stagger rules** for grouped elements
- **Reduced-motion support** (WCAG 2.1 Level AA compliant)
- **30+ reusable variants** for common patterns
- **Custom hooks** for scroll animations and interactions
- **GPU-safe animations** (transform and opacity only)

## 📁 File Structure

```
lib/animations/
├── motionConfig.ts    # Core configuration (durations, easing, stagger)
├── variants.ts        # Reusable animation variants
├── hooks.ts           # Custom animation hooks
├── utils.ts           # Helper functions
├── index.ts           # Central export
└── README.md          # This file
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { fadeUp, useScrollAnimation } from '@/lib/animations';

function MyComponent() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
    >
      Content
    </motion.div>
  );
}
```

### Staggered Children

```tsx
import { staggerContainer, fadeUp } from '@/lib/animations';

function FeatureGrid() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {features.map((feature) => (
        <motion.div key={feature.id} variants={fadeUp}>
          {feature.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### CTA Buttons

```tsx
import { ctaPrimary } from '@/lib/animations';

function CTAButton() {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={ctaPrimary}
      className="btn-primary"
    >
      Download Now
    </motion.button>
  );
}
```

## 📚 Configuration

### Durations

```typescript
duration.fast    // 0.2s - Micro-interactions, hovers
duration.base    // 0.4s - Standard transitions
duration.slow    // 0.6s - Entrance animations
duration.slower  // 0.8s - Hero sections, dramatic reveals
```

### Easing Curves

```typescript
easing.smooth      // [0.22, 1, 0.36, 1] - Natural, most transitions
easing.snappy      // [0.4, 0, 0.2, 1] - Responsive micro-interactions
easing.gentle      // [0.25, 0.46, 0.45, 0.94] - Soft entrances
easing.spring      // [0.68, -0.55, 0.265, 1.55] - Playful interactions
easing.emphasized  // [0.83, 0, 0.17, 1] - Important actions
```

### Stagger Delays

```typescript
stagger.fast    // 0.05s - Quick succession
stagger.base    // 0.1s  - Standard stagger
stagger.slow    // 0.15s - Deliberate reveals
stagger.slower  // 0.2s  - Dramatic sequences
```

## 🎨 Available Variants

### Entrance Animations
- `fadeIn` - Opacity only
- `fadeUp` - Opacity + Y-axis (standard)
- `fadeUpLarge` - Larger Y movement (hero sections)
- `fadeDown` - Fade from above (headers)

### Stagger Containers
- `staggerContainerFast` - Quick succession (0.05s delay)
- `staggerContainer` - Standard (0.1s delay)
- `staggerContainerSlow` - Deliberate (0.15s delay)

### Hover Effects
- `hoverLift` - Y-axis lift (-4px)
- `hoverScale` - Scale to 1.05
- `hoverScaleSubtle` - Scale to 1.02

### Press/Tap Effects
- `pressCompression` - Scale to 0.97
- `tapFeedback` - Quick scale to 0.95

### CTA Animations
- `ctaPrimary` - Lift + scale (primary actions)
- `ctaSecondary` - Subtle scale (secondary actions)

### Navigation
- `navItem` - Subtle hover for nav links
- `navItemActive` - Active state indication
- `headerReveal` - Header background on scroll

### Form Fields
- `focusRing` - Focus state animation
- `errorShake` - Error feedback (shake)
- `successPop` - Success indicator (pop)

### Loading States
- `loadingSpinner` - Continuous rotation
- `disabled` - Reduced opacity (0.5)

### Scroll-Based
- `scrollReveal` - Standard viewport entry
- `pageTransition` - Route-level fade

## 🎣 Custom Hooks

### Viewport Detection

```tsx
const isInView = useScrollAnimation(ref);
const isInView = useScrollAnimation(ref, {
  amount: 0.5,    // 50% visible to trigger
  once: false,    // Trigger multiple times
  margin: '-200px' // Trigger earlier
});
```

### Scroll Progress

```tsx
const scrollProgress = useParallax(ref);
const opacity = useScrollOpacity(ref);
const yOffset = useScrollY(ref, 100);
```

### Header Scroll

```tsx
const isScrolled = useScrollThreshold(50);
const { isScrolled, isScrollingDown, scrollY } = useHeaderScroll();
```

### Interactions

```tsx
const { isHovered, onMouseEnter, onMouseLeave } = useHover();
const { isFocused, onFocus, onBlur } = useFocus();
```

### Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion();
```

## 🛠️ Utility Functions

### Transition Builders

```tsx
const transition = createTransition({
  duration: 0.5,
  ease: easing.smooth,
  delay: 0.1
});

const springTransition = createSpringTransition({
  stiffness: 300,
  damping: 30
});
```

### Variant Builders

```tsx
const customFade = createFadeVariant({ from: 0, to: 1 });
const customSlide = createSlideVariant({
  direction: 'up',
  distance: 20,
  fade: true
});
```

### Stagger Helpers

```tsx
const delay = getStaggerDelay(index, 0.1, 0.2);
const cascadeDelay = getCascadeDelay(index, 0.1, 1.2);
```

## 🎨 CSS Classes (globals.css)

### Buttons
- `.btn-primary` - Primary CTA with lift + shadow
- `.btn-secondary` - Secondary with scale + border

### Links
- `.link` - Animated underline + color shift

### Form Fields
- `.input-field` - Focus ring + border transitions
- `.input-field-error` - Error state (red)
- `.input-field-success` - Success state (green)

### Utilities
- `.focus-ring` - Consistent focus states
- `.icon-interactive` - Scale + rotate on hover
- `.badge` - Status indicators with hover
- `.card` - Card hover lift

## ♿ Accessibility

All animations respect `prefers-reduced-motion`:

```tsx
// Automatically disabled for users who prefer reduced motion
const transition = getTransition(); // Returns instant transition if reduced motion

// Manual check
if (shouldReduceMotion()) {
  // Skip animation
}
```

The system:
- ✅ Reduces all durations to 0.01s when reduced motion is preferred
- ✅ Removes stagger delays
- ✅ Maintains layout without causing reflows
- ✅ WCAG 2.1 Level AA compliant

## ⚡ Performance

All animations are GPU-accelerated:
- ✅ Only animates `transform` and `opacity`
- ✅ Uses `will-change` hints
- ✅ Avoids layout-affecting properties
- ✅ Lazy loads where appropriate
- ✅ Targets 60fps on mobile

### Performance Tips

1. **Use willChange sparingly:**
```tsx
<motion.div style={{ willChange: 'transform, opacity' }}>
```

2. **Avoid animating layout properties:**
```tsx
// ❌ Bad - causes reflow
animate={{ width: 100, padding: 20 }}

// ✅ Good - GPU-accelerated
animate={{ scale: 1.1, opacity: 1 }}
```

3. **Use appropriate durations:**
```tsx
// ❌ Too slow
duration: 2

// ✅ Feels responsive
duration: duration.base // 0.4s
```

## 📝 Examples

### Hero Section

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainerSlow}
>
  <motion.h1 variants={fadeUpLarge}>
    Headline
  </motion.h1>
  <motion.p variants={fadeUp}>
    Subheading
  </motion.p>
  <motion.button variants={fadeUp} {...ctaPrimary}>
    CTA
  </motion.button>
</motion.div>
```

### Feature Grid with Scroll Reveal

```tsx
const ref = useRef(null);
const isInView = useScrollAnimation(ref);

<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={staggerContainer}
>
  {features.map(feature => (
    <motion.div key={feature.id} variants={fadeUp}>
      {feature.content}
    </motion.div>
  ))}
</motion.div>
```

### Navigation with Scroll Effect

```tsx
const isScrolled = useScrollThreshold(50);

<motion.nav
  initial="top"
  animate={isScrolled ? "scrolled" : "top"}
  variants={headerReveal}
>
  {/* Nav content */}
</motion.nav>
```

## 🐛 Debugging

Enable performance logging in development:

```tsx
import { debugAnimationPerformance } from '@/lib/animations';

// In useEffect or animation callback
debugAnimationPerformance('myAnimation', startTime, endTime);
```

## 📖 Best Practices

1. **Always use variants over inline animations**
   - ✅ `variants={fadeUp}`
   - ❌ `animate={{ opacity: 1, y: 0 }}`

2. **Import from the barrel export**
   - ✅ `import { fadeUp } from '@/lib/animations'`
   - ❌ `import { fadeUp } from '@/lib/animations/variants'`

3. **Use appropriate duration for context**
   - Micro-interactions: `duration.fast`
   - Standard transitions: `duration.base`
   - Entrances: `duration.slow`
   - Hero sections: `duration.slower`

4. **Always add willChange for animated elements**
   ```tsx
   style={{ willChange: 'transform, opacity' }}
   ```

5. **Test with reduced motion enabled**
   - macOS: System Preferences → Accessibility → Display → Reduce motion
   - Chrome DevTools: Rendering → Emulate CSS media → prefers-reduced-motion

## 🔧 Troubleshooting

### Animations not working?
- Ensure you're importing from `'@/lib/animations'`
- Check that the component is client-side (`'use client'`)
- Verify Framer Motion is installed: `npm list framer-motion`

### Animations feel janky?
- Only animate `transform` and `opacity`
- Add `willChange` hints
- Reduce duration
- Check if animating too many elements simultaneously

### Stagger not working?
- Ensure parent has `variants={staggerContainer}`
- Children must have `variants` (not inline `animate`)
- Parent must have `initial="hidden" animate="visible"`

## 📚 Further Reading

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations Performance](https://web.dev/animations/)
- [WCAG 2.1 - Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-16
**Maintained by:** Zavi AI Team
