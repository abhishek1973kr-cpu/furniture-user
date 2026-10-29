# LivFabs — Haute Joaillerie & Wholesale Atelier Storefront

An ultra-luxury, mobile-first e-commerce storefront for **LivFabs**, showcasing curated **Ladies Ornaments** and **Gents Ornaments** at an exclusive flat wholesale price of **₹99** (Original MRP ₹349), with guaranteed **12-Hour Priority Dispatch** and **Cash on Delivery (COD)**.

Built as a **100% standalone frontend prototype** with zero external backend or Firebase dependencies, using Next.js 14 (App Router), TypeScript, and Tailwind CSS.

---

## 💎 Design & Brand Guidelines

- **Brand Name**: LivFabs
- **Color Palette**:
  - Deep Rich Charcoal / Off-Black (`#1A1A1A`, `#141414`, `#121212`)
  - Warm Ivory / Classic Cream (`#F9F8F6`)
  - Muted Royal Gold (`#C5A880`) for wholesale prices, luxury seals, accents, and badges
- **Typography**:
  - Headings: *Cormorant Garamond* (Elegant classical serif)
  - Body & UI: *Plus Jakarta Sans* (Clean, modern geometric sans)
- **Borders & Elevation**: Thin, subtle luxury hairline borders (`1px border-[#C5A880]/20`) with soft gold glow shadows.

---

## ⚡ Key Features

1. **Top Infinite Scrolling Marquee**:
   - Loop: *"⚡ LivFabs | Fastly Shipped Within 12 Hours | Exclusive Ladies & Gents Ornaments at Flat ₹99 Wholesale Price"*
   - Smooth continuous CSS animation with pause-on-hover.

2. **Mobile-First Luxury Experience**:
   - Native-app feel with generous whitespace, sticky header, mobile drawer menu, and instant search filter.
   - Real-time countdown timer for the next 12-hour dispatch batch cutoff.

3. **Curated Product Catalog**:
   - Filter between **"All Collections"**, **"Ladies Ornaments"**, and **"Gents Ornaments"**.
   - Subcategory pills (Chokers, Drops, Bangles, Cuban Chains, Signet Rings, Kadas, Brooches).
   - Struck-through MRP ₹349 with glowing Royal Gold **₹99 Wholesale Price** and **"SAVE 72%"** badge.
   - Secondary angle preview on hover.

4. **Product Detail Fluid 5-Thumbnail Gallery**:
   - Seamless interactive image switching across 5 distinct high-resolution artisan photography angles.
   - Zoom hover effect, material specifications (18K micro-gold electroplate, anti-tarnish, hypoallergenic), star ratings, and quantity selector.

5. **Centered Half-Screen Checkout Modal (~60-70% size)**:
   - **Zero full-page redirects**: Opens a centered half-screen modal with a dark blurred backdrop (`backdrop-blur-md bg-black/80`).
   - Form inputs: Full Name, 10-Digit Mobile Number, Full Street Address, City, State, and 6-digit PIN code.
   - Payment method: **Cash on Delivery (COD)** preselected with doorstep inspection guarantee, plus UPI/Card option.
   - Dynamic item breakdown: Subtotal, Wholesale Privilege Savings, Free 12-Hour Shipping, Total Due.
   - **Order Confirmation Success Screen**: Luxury seal, confetti burst, unique Order Reference ID (e.g. `LF-884219`), delivery timeframe (2-3 business days), and direct WhatsApp dispatch tracking button.

6. **Side-Scrolling Swipable Reviews Carousel**:
   - Horizontal snap-scrolling carousel featuring verified buyer testimonials from Mumbai, Bangalore, Hyderabad, Delhi, Pune, and Kolkata with customer avatars and item previews.

7. **Slide-Over Luxury Cart Drawer**:
   - Multi-item management, quantity adjustment, real-time savings calculation, and single-click checkout trigger.

8. **Professional Luxury Footer**:
   - LivFabs atelier address on Linking Road, Bandra West, Mumbai.
   - Helpline telephone, concierge email, and interactive modal dialogs for Shipping Policy, 7-Day Replacement, 6-Month Warranty, and Privacy.

---

## 🚀 Running the Storefront Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create an optimized production build:
```bash
npm run build
npm run start
```

