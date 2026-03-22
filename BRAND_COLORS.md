# Zavi Brand Color System

## Current Issues
❌ Inconsistent purples: #6B7FE8, #5381d2, #7B68EE, #8B5CF6, #9370DB
❌ Washed-out pastel backgrounds
❌ No clear color hierarchy
❌ Doesn't feel premium or modern

## New Premium Palette

### Primary Brand Colors
```
Primary Purple:   #6366F1  (rgb(99, 102, 241))   - Indigo-500
Secondary Purple: #8B5CF6  (rgb(139, 92, 246))   - Violet-500
Accent Blue:      #3B82F6  (rgb(59, 130, 246))   - Blue-500
```

### Gradient System
```
Primary Gradient:   from-[#6366F1] via-[#8B5CF6] to-[#7C3AED]
CTA Gradient:       from-[#6366F1] to-[#8B5CF6]
Background Gradient: from-slate-950 via-indigo-950 to-slate-950
```

### Neutral Colors
```
Dark:       #0F172A  (Slate-900)  - Headings, text
Medium:     #475569  (Slate-600)  - Body text
Light:      #94A3B8  (Slate-400)  - Muted text
Background: #F8FAFC  (Slate-50)   - Page background
White:      #FFFFFF  - Cards, sections
```

### Semantic Colors
```
Success:    #10B981  (Emerald-500)
Warning:    #F59E0B  (Amber-500)
Error:      #EF4444  (Red-500)
Info:       #3B82F6  (Blue-500)
```

## Usage Guidelines

### Backgrounds
- **Hero sections**: Deep gradient (slate-950 → indigo-950)
- **Alternating sections**: White (#FFFFFF) or Slate-50 (#F8FAFC)
- **Cards**: White with subtle border

### CTAs
- **Primary**: Gradient from-[#6366F1] to-[#8B5CF6]
- **Secondary**: White bg with Indigo-600 text
- **Hover**: Enhanced glow with same gradient

### Text
- **Headlines**: #0F172A (Slate-900)
- **Body**: #475569 (Slate-600)
- **Muted**: #94A3B8 (Slate-400)

### Accents
- **Gradient text**: Primary gradient
- **Badges**: Indigo-100 bg, Indigo-700 text
- **Borders**: Slate-200 (#E2E8F0)

## Modern vs Old

| Element | Old (Inconsistent) | New (Premium) |
|---------|-------------------|---------------|
| Primary | #6B7FE8, #5381d2 | #6366F1 |
| Secondary | #7B68EE, #9370DB | #8B5CF6 |
| Background | #E8E5F5 (pastel) | #0F172A (deep) or #F8FAFC (clean) |
| CTA | Multiple gradients | from-[#6366F1] to-[#8B5CF6] |
| Text | Inconsistent grays | #0F172A, #475569, #94A3B8 |

## Implementation Priority

1. ✅ Update Hero section
2. ✅ Update all CTA buttons
3. ✅ Update section backgrounds
4. ✅ Update text colors
5. ✅ Update accent colors
6. ✅ Add Tailwind config

## Inspiration
Modern tech brands: Linear, Vercel, Stripe, Supabase
- Deep, rich colors (not pastels)
- Consistent gradient system
- High contrast
- Premium feel
