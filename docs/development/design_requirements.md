# UNOUN — Design System & Requirements

## Brand Aesthetic

**Style:** Clean Minimalism (Apple / Dyson / Bork level)
**Feeling:** Sterile, premium, high-tech, airy, trustworthy
**User should feel:** "This is an expensive, reliable product from a serious brand"
**What to avoid:** Visual noise, too many colors, aggressive gradients, cheap-looking shadows

---

## Color Palette

| Token | Hex | Tailwind class | Usage |
|---|---|---|---|
| White | #FFFFFF | `bg-white` | Main section backgrounds, card backgrounds |
| Off-white | #FAFAFA | `bg-zinc-50` | Alternate section backgrounds |
| Light grey | #F4F4F5 | `bg-zinc-100` | Badge/pill backgrounds, icon wrappers |
| Border light | #E4E4E7 | `border-zinc-200` | Input borders, dividers |
| Border subtle | #F4F4F5 | `border-zinc-100` | Card borders |
| Primary text | #18181B | `text-zinc-900` | All headings, primary body text |
| Secondary text | #71717A | `text-zinc-500` | Descriptions, labels, captions |
| Muted text | #A1A1AA | `text-zinc-400` | Placeholders, overlines, hints |
| **UNOUN Yellow** | **#E5FF00** | `bg-[#E5FF00]` | **CTA buttons, success icons, feature icons ONLY** |
| Footer bg | #18181B | `bg-zinc-900` | Footer background |

### Critical Rule on UNOUN Yellow
> UNOUN Yellow (`#E5FF00`) is used **exclusively** for:
> - Primary "Купить" / "Buy" buttons
> - Success confirmation icons
> - Feature/benefit icon containers
> - Discount badge background
>
> **Never** use it for decorative backgrounds, borders, or text color.

---

## Typography

### Font Pairing

| Role | Font | CSS variable | Tailwind class |
|---|---|---|---|
| Headings (H1, H2, H3) | Playfair Display (serif) | `--font-playfair` | `font-heading` |
| Body, UI, labels | Inter (sans-serif) | `--font-inter` | `font-body` (default on `body`) |

Both fonts loaded via `next/font/google` in `app/layout.tsx` with `latin` + `cyrillic` subsets.

### Type Scale

| Element | Mobile | Desktop | Weight | Notes |
|---|---|---|---|---|
| H1 (Hero) | `text-4xl` | `lg:text-5xl` | `font-bold` | `tracking-tight`, `leading-tight` |
| H2 (Sections) | `text-3xl` | `md:text-5xl` | `font-bold` | `tracking-tight` |
| H3 (Cards) | `text-base` | — | `font-bold` | |
| Overline (above H2) | `text-xs` | — | `font-semibold` | `uppercase tracking-widest text-zinc-400` |
| Body | `text-base` | — | `font-normal` | `leading-relaxed` |
| Small / Caption | `text-sm` | — | `font-normal` | `text-zinc-500` |
| Tiny / Label | `text-xs` | — | `font-medium` | `text-zinc-700` |

---

## Spacing & Layout

- **Max content width:** `max-w-7xl mx-auto`
- **Section vertical padding:** `py-16 md:py-24`
- **Container horizontal padding:** `px-4 sm:px-6 lg:px-8`
- **Principle:** Generous whitespace. Sections breathe. No visual crowding.
- **Gap between grid items:** `gap-4 sm:gap-5` (cards), `gap-10 md:gap-16` (two-column layouts)

---

## Component Patterns

### Cards
```
rounded-2xl border border-zinc-100 bg-white shadow-sm
hover:shadow-md transition-shadow duration-200
```

### Buttons — Primary CTA (Yellow)
```
h-14 rounded-full bg-[#E5FF00] px-8
text-base font-semibold text-zinc-900
hover:brightness-95 active:scale-[0.98]
transition-all duration-150
```

### Buttons — Secondary / Ghost
```
text-sm font-medium text-zinc-500
hover:text-zinc-900 transition-colors duration-200
```

### Badges / Pills
```
rounded-full bg-zinc-100 px-3 py-1.5
text-xs font-medium text-zinc-700
```

### Icon Containers (Feature icons)
```
flex h-12 w-12 items-center justify-center
rounded-full bg-[#E5FF00]
```

### Small numbered markers (Nozzle cards)
```
flex h-5 w-5 items-center justify-center
rounded-full bg-zinc-900 text-[10px] font-bold text-white
```

### Form Inputs
```
h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4
text-sm text-zinc-900 placeholder:text-zinc-400
outline-none transition-colors duration-150
focus:border-zinc-900 focus:bg-white
```

### Section Header Pattern (consistent across all sections)
```tsx
<div className="mb-10 md:mb-14">
  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
    OVERLINE TEXT
  </p>
  <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
    Section Heading
  </h2>
</div>
```

---

## Animation Principles (Framer Motion)

### Philosophy
> Premium, smooth, intentional. Animations confirm user actions and guide attention.
> They never distract or entertain. No jank. No abruptness.

### Scroll Reveal — FadeInSection wrapper
```tsx
initial: { opacity: 0, y: 40 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: "easeOut", delay: 0–0.2 }
trigger: useInView({ once: true, amount: 0.15 })
```
Used to wrap every `<section>` in `app/page.tsx`.

### Spring Physics — Overlays & Sticky Elements
```tsx
type: "spring", stiffness: 300, damping: 30
```
Used for: StickyBottomCTA slide-in, modal open/close.

### Micro-interactions
| Interaction | Spec |
|---|---|
| Menu icon (burger ↔ close) | `rotate ±90, opacity, duration: 0.15` |
| FAQ accordion open/close | `height + opacity, duration: 0.25, ease: "easeInOut"` |
| Floating consultant pulse | `scale [1, 1.08, 1], duration: 2.4, repeat: Infinity, ease: "easeInOut"` |
| Nozzle card hover | `scale-105 on image, duration: 0.3` |
| Page section entrance | `FadeInSection wrapper (see above)` |

### Rules
- Always wrap appearance/disappearance in `<AnimatePresence>`
- Use `easeOut` for entrances, `easeInOut` for toggles
- Never block user interaction with long animations (max entrance: 0.6s)
- `once: true` on scroll triggers — animation fires only on first viewport entry

---

## Responsive Strategy

**Mobile-First.** Design and code for 390px screen width first, then scale up.

| Breakpoint | Min-width | Key layout changes |
|---|---|---|
| Default | 0px | 1 column, stacked, vertical rhythm |
| `sm` | 640px | Wider padding, CTA row layout, larger text |
| `md` | 768px | 2-column grids, desktop header nav |
| `lg` | 1024px | 4-column grids, larger hero headings |

### Grid Patterns in Use
| Section | Mobile | Desktop |
|---|---|---|
| Hero | 1 col (text + image stacked) | `md:grid-cols-2` |
| Feature Cards | `grid-cols-1` | `sm:grid-cols-2 lg:grid-cols-4` |
| Nozzle Cards | `grid-cols-2` | `md:grid-cols-3 lg:grid-cols-4` |
| Complectation | 1 col | `md:grid-cols-2` |
| Footer | 1 col | `md:grid-cols-3` |

---

## Global Overlays

### StickyBottomCTA
- Appears after user scrolls **400px** past top
- `fixed bottom-0 left-0 right-0 z-40`
- Spring animation: slides in from bottom
- Contains: Price (7,990 ₽) + Yellow "Купить" button

### FloatingConsultant
- `fixed bottom-20 right-4 z-50` (above StickyBottomCTA)
- Yellow circle button with `MessageCircle` icon
- Gentle pulse animation (not aggressive)
- `bottom-20` ensures no overlap with StickyBottomCTA

### Header
- `sticky top-0 z-50`
- White background, `border-b border-zinc-200`
- Height: `h-16`
- Layout: `grid-cols-3` — [burger/nav] [logo] [cart]
