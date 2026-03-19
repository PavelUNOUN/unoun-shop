# Project: UNOUN — Premium Steam Mop E-commerce
# Document Version: 2.0 (Approved Product Direction)
# Type: Next.js Web Application (Landing + Cart + Checkout + Account + Academy)

## 1. Brand & Product Strategy
**Brand:** UNOUN.
**Core Product:** Premium steam mop 12-in-1.
**Near-term expansion:** accessories and расходники for repeat purchases.
**Aesthetic:** Dyson / Bork / Apple. Sterile, premium, high-trust, visually calm.
**Primary business goal:** build a premium direct-to-consumer store that converts cold traffic from the landing page into paid online orders.
**Secondary goal:** prepare the site for repeat purchases through loyalty, saved addresses, account history, accessories, and SEO content.

## 2. Final Purchase Logic
The project is no longer a single landing page with a form on the homepage. The approved purchase flow is:

`Landing -> Cart -> Checkout -> Payment -> Account / Order History`

### Checkout rules
- A customer **can place an order without authorization**.
- Authorization must remain the **priority scenario** in UX.
- The account should be positioned as a clear benefit: faster checkout, saved data, bonus balance, order history, warranty/service context.
- The homepage should focus on product presentation and CTA, not on the full final order form.

### Loyalty rules
- Welcome bonus is available **only after authorization**.
- Welcome bonus amount: **500 bonuses = 500 RUB**.
- The bonus can be **spent immediately on the first order**.
- On the first implementation stage, bonus usage is fixed and simple: one authorized customer can apply up to **500 RUB** from the welcome balance.

### Payment rules
- No cash on delivery.
- No payment on receipt.
- Only two payment scenarios:
  - **Full online payment**
  - **Payment in installments / split**
- Priority payment direction: **Yandex Pay + Split**
- The UX must communicate both options clearly at checkout.

### Delivery rules
- First release delivery method: **CDEK pickup point only**
- No courier delivery in MVP.
- No Yandex Delivery in MVP.
- No Ozon pickup points in MVP.
- The checkout must support city input, pickup point selection, replacement of pickup point, and saving the selected pickup point to the order.
- Positioning for the first release: simple, nationwide, predictable delivery to pickup points.

## 3. Infrastructure & Data Residency
- The store must use infrastructure compatible with **Russian Federation requirements**.
- Customer data and order data must be stored in infrastructure located in **Russia**.
- Approved baseline direction:
  - **Code repository:** GitHub
  - **App hosting:** Timeweb VDS / server-side deployment
  - **Database:** Managed MySQL in Russian region
- The project should avoid architecture tied only to static hosting because the product requires:
  - checkout
  - account
  - payment integration
  - delivery integration
  - admin functionality
  - SEO article section

## 4. Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Icons:** lucide-react
- **Database:** MySQL
- **Deployment direction:** server-rendered / hybrid Next.js deployment, not static-only

## 5. UX Principles
1. **Premium first impression:** the landing must sell the product before asking for data.
2. **Guest checkout allowed:** do not create a forced login barrier.
3. **Authorization as advantage:** use login prompts around benefits, not as friction.
4. **Minimal checkout complexity:** one delivery provider in MVP, two payment choices, clear order summary.
5. **Trust architecture:** dedicated pages for delivery, payment, service, privacy, loyalty, FAQ, and later public offer.
6. **Mobile-first:** purchase path must feel effortless on mobile.

## 6. Landing Page Strategy
The landing page remains the main conversion surface, but its role changes:
- sell the flagship product;
- explain use cases, nozzles, specs, proof, and service confidence;
- introduce loyalty and future account benefits;
- send users to cart / checkout instead of finishing the whole order directly on the homepage.

### Required landing sections
1. Hero
2. Trust strip / marquee
3. Product story / deep description
4. Use cases
5. Nozzles and complectation
6. Technical proof
7. Loyalty teaser
8. Instruction / warranty / service trust blocks
9. FAQ
10. Strong repeated CTAs leading into cart / checkout

## 7. Core Site Pages
### Commerce
1. Homepage
2. Cart
3. Checkout
4. Order success / confirmation page

### Customer trust
1. Delivery and payment
2. Warranty and service
3. FAQ
4. Privacy policy
5. Public offer
6. Consent / personal data information

### Account
1. Authorization page
2. Account dashboard
3. Orders
4. Addresses / pickup points
5. Loyalty / bonuses
6. Service and warranty materials

### Content
1. Academy index
2. Article page template

## 8. Account Structure
The account should eventually contain:
- greeting and summary dashboard;
- bonus balance;
- order history;
- saved recipient data;
- saved pickup points / addresses;
- access to service information, manuals, warranty-related materials.

## 9. Admin MVP Scope
The first admin release should stay lean.

### Must-have
- view orders;
- change order status;
- manage products;
- manage prices;
- manage stock / availability;
- manage accessory assortment;
- later manage Academy content.

### Not required in MVP
- complex manual loyalty corrections;
- advanced CRM logic;
- deep warehouse automation.

## 10. SEO & Content Direction
The project must include an article section integrated into the premium brand language.

### Naming
- Navigation name: **UNOUN Academy**
- SEO/content framing can use: **Полезные статьи**, **Гид по чистоте и уходу**, **Статьи и советы**

### SEO goals
- build informational traffic around steam cleaning and home care;
- support trust and expertise before purchase;
- strengthen long-tail search visibility for the flagship product and accessories.

## 11. Legal & Compliance Direction
The site must be prepared for compliant operation in Russia.

### Required document set
- Privacy Policy
- Personal Data Processing Policy
- Public Offer
- Delivery and Payment terms
- Warranty / Return / Service information
- Seller details
- Consent-related wording for forms and account flows

### Compliance note
The architecture must respect Russian personal data requirements, payment regulations, and online sales document flow. This affects hosting, database, payment integration, and checkout consent UX.

## 12. Development Principles
- Work in small, testable steps.
- Do not continue implementation based on outdated docs.
- The roadmap and technical docs are source-of-truth before code changes.
- Any new checkout, account, or admin work must follow the approved product direction in this document.
