# Color Standardization Guide

## Zavi Brand Colors

This document defines the standardized color palette for consistency across the website.

### Core Blue Palette (zavi-blue)

Use ONLY these zavi-blue shades. DO NOT use default Tailwind `blue-*` or `sky-*` colors.

| Use Case | Color | Hex | Usage |
|----------|-------|-----|-------|
| **Light backgrounds** | `zavi-blue-50` | #EDF3FC | Card backgrounds, light sections |
| **Subtle borders/dividers** | `zavi-blue-200` | #B7CFF3 | Borders, dividers, subtle accents |
| **Primary brand** | `zavi-blue-400` | #5381d2 | Primary buttons, brand elements, main CTA |
| **Hover/Interactive** | `zavi-blue-600` | #395FA8 | Hover states, active elements |
| **Text/Dark accents** | `zavi-blue-700` | #2D4E92 | Dark text on light backgrounds |

### Migration Mapping

Replace these Tailwind colors with standardized zavi-blue:

```
OLD (Tailwind default) → NEW (Zavi brand)

blue-50, sky-50           → zavi-blue-50
blue-100, sky-100         → zavi-blue-50
blue-200, sky-200         → zavi-blue-200
blue-300                  → zavi-blue-300
blue-400, sky-400         → zavi-blue-400
blue-500                  → zavi-blue-400
blue-600                  → zavi-blue-500
blue-700, sky-600, sky-700 → zavi-blue-600
blue-800, blue-900        → zavi-blue-700
```

### Gradient Usage

**Standard gradients:**
```tsx
// Primary gradient (most common)
from-zavi-blue-500 to-zavi-blue-400

// Light gradient (backgrounds)
from-zavi-blue-50 to-white

// Dark gradient (headers, CTAs)
from-zavi-blue-600 to-zavi-blue-500
```

### Examples

**Before:**
```tsx
className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
```

**After:**
```tsx
className="bg-zavi-blue-50 border-zavi-blue-200 text-zavi-blue-700 hover:bg-zavi-blue-50"
```

## Implementation Status

- [x] Color migration guide created
- [ ] DeviceDownload.tsx
- [ ] PricingNew.tsx
- [ ] LanguageTranslationHero.tsx
- [ ] HeroWithScreenshot.tsx
- [ ] Other components

## Notes

- The brand color #5381d2 is `zavi-blue-400`
- Always use `zavi-blue-*` for consistency
- Avoid mixing Tailwind blue/sky with zavi-blue
