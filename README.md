# Shortellers — Frontend Demo

A polished, interactive frontend demo of **Shortellers**, a marketplace for local
content that connects local businesses with nearby photographers and
videographers. Built to the approved *Local Editorial* design direction and the
5-screen Demo Specification. No backend — all data is mocked and demo state lives
client-side.

## The story the demo tells

**Rosewood Bakehouse** (a bakery in Alberta Arts, Portland) needs autumn menu
photos → discovers **Lena Ortiz** → evaluates her portfolio and reviews →
picks the **Signature Menu Shoot** package → books it with a date, address and
brief → manages the resulting project and **approves** the delivered gallery,
releasing payment.

`Home → Discovery → Creator Profile → Booking → Business Project → Approve → Review`

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint (next/core-web-vitals)
npm run typecheck   # tsc --noEmit
```

Requires Node 18.17+ (developed on Node 24).

## Routes

| Route | Screen |
|-------|--------|
| `/` | Marketplace Home |
| `/discover` | Creator Discovery (filters, map, sort, empty state) — accepts `?q=`, `?cat=`, `?hood=`, `?max=`, `?min=`, `?verified=1`, `?avail=1`, `?sort=` |
| `/creators/lena-ortiz` | Creator Profile (10 creators have pages; Lena is fully detailed) |
| `/book` | Booking flow — accepts `?package=quick-refresh\|signature-menu-shoot\|full-brand-day` |
| `/projects/rosewood-bakehouse` | Business Project (delivery, approval, request-changes, review) |
| `/messages`, `/account` | Honest stub pages (out of scope) |

## Demo state

Booking choices and project status persist in `localStorage`
(`shortellers-demo-v1`) so navigating between screens never resets the story.
**Reset demo** is available in the header account menu and the footer.

## Architecture

```
src/
  app/                 # App Router pages (thin; delegate to client components)
  components/
    layout/            # Header, MobileTabBar, Footer, Breadcrumbs, PageShell
    ui/                # Button, Dialog, Toast, StubButton
    marketplace/       # CreatorCard, PortfolioGrid, Lightbox, MapCanvas, RatingStat, …
    booking/           # DatePicker, PriceBreakdown, BookingSummary, FormField, …
    project/           # ProgressStepper, ApprovalBar, DeliverablesBento, ReviewPrompt, …
    home/ discover/ creator/   # per-screen client components
    media/SmartImage   # resilient <img> with photo + placeholder fallbacks
  data/                # mock data layer — swap these modules for a real API
  lib/                 # cn, format, pricing, demo-store (context), use-reveal
```

Design tokens are defined once as CSS variables in `src/app/globals.css` and
mapped into Tailwind in `tailwind.config.ts`. Components consume tokens only.

## Known limitations

- No auth, payments, real messaging, map API, admin, or creator app — all mocked.
- Portfolio/deliverable **video** is shown as poster + play affordance (no playback).
- The map is a stylised representation, not a real map service.
- External imagery loads from the Unsplash CDN with a Lorem Picsum fallback and
  finally an on-brand placeholder block; the UI never shows a broken image.
