# UNOUN — Frontend Technical Documentation

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | App Router, hybrid SSR/RSC app |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Strict typing |
| Tailwind CSS | v4 | Design system and styling |
| Framer Motion | ^12 | Premium animations |
| Zustand | ^5 | Cart and UI state |
| lucide-react | ^0.577 | Icons |
| clsx | ^2.1.1 | Conditional classes |
| tailwind-merge | ^3.5 | Safe Tailwind class merging |
| MySQL | planned | Orders, users, bonuses, content |

---

## Project Direction

This project is no longer a landing-only funnel. The approved direction is a small premium e-commerce platform with:

- landing page;
- cart;
- checkout;
- account;
- loyalty;
- Academy articles;
- service and legal trust pages.

### Approved purchase model

`Landing -> Cart -> Checkout -> Payment -> Account / Order History`

### Critical business rules
- Guest checkout is allowed.
- Authorization is preferred in UX, but not mandatory.
- Welcome bonus is available only after authorization.
- Welcome bonus amount is fixed at `500 RUB`.
- In MVP the checkout supports:
  - full online payment;
  - split / installment payment.
- Cash on delivery is removed from the target product flow.
- Delivery MVP uses `Yandex pickup points` only.

---

## Critical: Tailwind v4 Syntax

> Tailwind v4 is different from v3. There is no `tailwind.config.js`.
> Theme tokens live in `app/globals.css` through `@theme`.

```css
@import "tailwindcss";

@theme inline {
  --color-brand-yellow: #e5ff00;
  --color-background: #ffffff;
  --color-foreground: #18181b;
}
```

Do not use:
- `tailwind.config.js`
- `theme.extend`
- old Tailwind v3 conventions as source of truth

---

## Architecture Rules

### Server vs Client Components

Default: **React Server Components**.

Add `"use client"` only when required by:
- hooks;
- Zustand;
- Framer Motion;
- browser-only event handlers;
- local interactive checkout logic.

### TypeScript rules
- Always define types for props and data structures.
- Never use `any`.
- Use `as const` for static content arrays.
- Keep shared domain types in dedicated files when the project starts introducing order, bonus, article, and account entities.

### Utility function
Use `cn()` from `@/lib/utils` for conditional class composition.

---

## Approved App Structure

```txt
unoun-shop/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── checkout/success/
│   │   └── page.tsx
│   ├── account/
│   │   ├── layout.tsx
│   │   ├── auth/page.tsx
│   │   ├── page.tsx
│   │   ├── orders/page.tsx
│   │   ├── addresses/page.tsx
│   │   ├── loyalty/page.tsx
│   │   └── service/page.tsx
│   ├── academy/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── delivery/page.tsx
│   ├── service/page.tsx
│   ├── privacy/page.tsx
│   ├── offer/page.tsx
│   ├── faq/page.tsx
│   └── admin/
│       ├── page.tsx
│       ├── products/page.tsx
│       └── orders/page.tsx
│
├── src/
│   ├── components/
│   │   ├── sections/
│   │   ├── account/
│   │   ├── checkout/
│   │   ├── academy/
│   │   └── ui/
│   ├── store/
│   │   ├── cartStore.ts
│   │   └── uiStore.ts
│   ├── lib/
│   └── types/
│
└── docs/
    └── development/
```

---

## Landing Page Role

The homepage must:
- create premium first impression;
- explain the product and the brand;
- prove value;
- introduce loyalty;
- send users into cart / checkout.

The homepage must not be the final place where a full real order is completed in the approved architecture.

### Landing blocks
- Splash / premium intro
- Hero
- Trust marquee
- Product description
- Use cases
- Nozzles
- Specs / proof
- Loyalty preview
- Instruction / service trust block
- FAQ
- Repeated CTA into cart / checkout

---

## Checkout Requirements

### UX principles
- Keep checkout simple and focused.
- Show authorization as a useful shortcut, not as a wall.
- Support both guest and authorized flow.

### MVP checkout flow
1. Contact details
2. City / location context
3. Pickup point selection via Yandex Delivery
4. Payment choice
5. Order review
6. Redirect to payment / success state

### Payment choices
- Full online payment
- Split / installments

### Loyalty block
- Only visible for authorized user, or visible as an authorization prompt.
- Welcome bonus is fixed at `500 RUB`.
- If user is not authorized, show benefit messaging instead of active bonus controls.

---

## Account Requirements

The account should evolve into a real customer space, not a decorative page.

### MVP sections
- dashboard
- orders
- addresses / pickup points
- loyalty / bonuses
- service / manuals

### Value of authorization
- saved contact data;
- saved pickup points;
- access to bonuses;
- order history;
- service and warranty context.

---

## Data Model Direction

The project is moving away from Supabase planning and toward MySQL-backed architecture.

### Planned domain entities
- `users`
- `addresses`
- `products`
- `orders`
- `order_items`
- `bonus_accounts`
- `bonus_transactions`
- `articles`

### Examples of shared TypeScript domain types
```ts
type PaymentMethod = "full_online" | "split";

type DeliveryMethod = "yandex_pickup";

type OrderStatus =
  | "new"
  | "awaiting_payment"
  | "paid"
  | "ready_for_shipping"
  | "in_delivery"
  | "ready_for_pickup"
  | "done"
  | "cancelled";
```

---

## Cart State Direction

`src/store/cartStore.ts` should become the central client-side entry point for purchase initiation.

### Cart MVP responsibilities
- add item;
- remove item;
- update quantity;
- calculate subtotal;
- support future accessories and consumables.

### UI store MVP responsibilities
- mobile menu state;
- cart drawer visibility;
- future lightweight modal and checkout-helper state.

---

## Infrastructure Constraints

- Data must be stored in infrastructure located in Russia.
- The deployment direction is server-side capable hosting, not static-only hosting.
- Approved strategic direction:
  - GitHub for source control
  - Timeweb VDS for app hosting
  - Managed MySQL in Russian region for data

This matters because the project requires:
- authentication;
- checkout;
- payment integrations;
- delivery integrations;
- account pages;
- admin logic;
- Academy content.

---

## Media and Images

- Always use `next/image`.
- Use high-quality product imagery on light backgrounds.
- Prepare the media library not only for the flagship product, but also for:
  - before / after proofs;
  - service trust pages;
  - Academy previews;
  - future accessories.

---

## Source of Truth Rules

- `project_requirements.md` defines approved business direction.
- `roadmap.md` defines implementation order.
- `docs/development/ecommerce_architecture.md` defines target storefront, checkout, account, and infrastructure logic.
- This file defines frontend structure and implementation guardrails.

No new checkout, account, or admin implementation should rely on the old landing-only assumptions.
