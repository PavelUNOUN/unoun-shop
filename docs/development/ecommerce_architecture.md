# UNOUN — E-commerce Architecture

## 1. Approved Product Model

UNOUN is evolving from a product landing page into a compact premium e-commerce system.

### Core path
`Landing -> Cart -> Checkout -> Payment -> Account -> Repeat Purchase`

### Strategic principles
- The homepage sells.
- The cart confirms intent.
- The checkout closes the order.
- The account increases repeat conversion.
- Academy increases SEO and trust.

---

## 2. Purchase Flow

### Entry points
The user can enter the purchase flow from:
- Hero CTA
- Sticky CTA
- complectation section
- product proof sections
- future accessory blocks

### Flow steps
1. User clicks `Купить`
2. Item is added to cart
3. User opens cart
4. User moves to checkout
5. User chooses:
   - log in for benefits
   - continue as guest
6. User fills contacts or sees prefilled data
7. User selects `СДЭК ПВЗ`
8. User chooses payment:
   - full online payment
   - split
9. User confirms order
10. User is redirected to payment / success result

---

## 3. Guest vs Authorized Checkout

### Guest checkout
Allowed by default.

The guest can:
- add products to cart;
- go through checkout;
- enter contact data manually;
- select pickup point;
- pay online;
- receive order confirmation.

The guest cannot:
- spend welcome bonus;
- access saved addresses later;
- see order history in account unless authorization is linked later.

### Authorized checkout
Preferred in UX.

The authorized user gets:
- saved contact data;
- account context;
- access to `500 RUB` welcome bonus;
- future order history;
- future repeat purchase convenience.

### UX rule
Authorization must never feel like punishment.

Correct tone:
- "Войдите, чтобы использовать 500 бонусов"
- "Войдите, чтобы оформить быстрее"

Incorrect tone:
- "Без входа оформить нельзя"

---

## 4. Loyalty MVP

### Approved rules
- Bonus becomes available only after authorization.
- Welcome amount is fixed: `500 bonuses = 500 RUB`.
- User can spend it immediately on the first order.

### MVP loyalty scope
- one welcome bonus event;
- one bonus balance;
- use up to `500 RUB` in checkout;
- simple history in account.

### Not required in MVP
- tiered loyalty mechanics;
- complicated cashback rules;
- promo stacking logic;
- manual bonus accounting backoffice.

---

## 5. Payment Architecture

### Approved business direction
- no payment on delivery;
- no cash on receipt;
- online-only payment;
- support for split payments.

### MVP payment methods
- `full_online`
- `split`

### Priority provider direction
- Yandex Pay
- Split

### Checkout display logic
- both methods should be visible inside payment step;
- full payment remains the simplest default;
- split is positioned as a premium convenience option;
- the order summary must clearly show how applied bonus changes the payable amount.

---

## 6. Delivery Architecture

### MVP delivery method
- `CDEK pickup point`

### What must be stored in the order
- city
- selected pickup point ID
- pickup point address
- pickup point title
- delivery estimate
- delivery cost if applicable

### UX behavior
- user enters city or delivery context;
- user opens pickup point selector;
- user chooses a point;
- chosen point is shown as a summary card;
- user can replace it before payment.

### Not included in MVP
- courier delivery;
- Yandex Delivery;
- Ozon pickup points.

---

## 7. Account Architecture

### Account sections
1. Dashboard
2. Orders
3. Addresses / pickup points
4. Loyalty
5. Service / manuals

### Dashboard content
- greeting;
- bonus balance;
- latest order block;
- quick actions;
- account value explanation.

### Orders section
- order number;
- date;
- items;
- total;
- status;
- pickup point summary;
- payment state.

### Addresses / pickup points
- saved recipient data;
- saved pickup points if supported later;
- quick selection for future orders.

### Loyalty
- current balance;
- welcome bonus history;
- applied bonus in order history later.

### Service
- instruction PDF;
- warranty-related information;
- future service request history.

---

## 8. Admin MVP

### Purpose
Admin must support daily business operations without turning into a complex ERP system.

### MVP sections
- dashboard
- orders
- products

### Orders admin
- view orders;
- view statuses;
- change statuses manually.

### Product admin
- title;
- active state;
- price;
- old price;
- stock;
- accessory items later.

### Explicitly excluded from MVP
- advanced warehouse logic;
- complex manual loyalty corrections;
- employee role matrix.

---

## 9. Content Architecture

### Section name
Navigation brand name: `UNOUN Academy`

### Content role
- attract search traffic;
- answer pre-purchase objections;
- build category expertise;
- support flagship product and future accessories.

### Content model
- article list page;
- article detail page;
- SEO metadata for each article;
- cover image and excerpt;
- related product opportunities later.

---

## 10. Infrastructure Architecture

### Approved direction
- domain: one main domain
- code: GitHub
- app hosting: Timeweb VDS
- database: Managed MySQL in Russia

### Why this direction is chosen
- supports Next.js server-side logic;
- avoids static-only limitations;
- matches the requirement to keep client and order data in Russian infrastructure;
- is understandable for a growing small e-commerce project.

### Operational model
1. Code is stored in GitHub.
2. Production app runs on Timeweb VDS.
3. MySQL stores business data in Russian region.
4. Deployment updates the site from GitHub.

---

## 11. Domain Model Draft

### Core tables
- `users`
- `addresses`
- `products`
- `orders`
- `order_items`
- `bonus_accounts`
- `bonus_transactions`
- `articles`

### Orders
Expected fields direction:
- id
- user_id nullable
- guest_email nullable
- guest_phone
- customer_name
- delivery_method
- pickup_point_code
- pickup_point_address
- payment_method
- subtotal
- bonus_discount
- total
- status
- created_at

### Products
Expected fields direction:
- id
- slug
- title
- category
- price
- old_price nullable
- stock
- is_active
- is_featured

---

## 12. Legal Surface

The architecture must support legal pages and consent UX for Russian e-commerce.

### Required pages
- privacy policy
- personal data processing policy
- public offer
- delivery and payment
- warranty and service
- seller details

### Form and checkout requirements
- legal wording must be visible before submission;
- consent UX must be clear and not hidden;
- payment and delivery terms must be easy to reach from checkout.

---

## 13. Implementation Priority

1. Fix documentation and source of truth
2. Refactor homepage CTA logic
3. Build cart
4. Build checkout
5. Build account shell
6. Connect MySQL-backed backend
7. Connect payment and CDEK
8. Build admin MVP
9. Launch Academy and SEO layer

This order is mandatory because the old homepage-order-form model should not continue to guide implementation.
