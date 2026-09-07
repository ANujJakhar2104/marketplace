# 1Fi Marketplace \u2014 SDE Intern Assignment

A React Native (Expo) implementation of the **1Fi Marketplace** section on the
Shop page, built to match the visual language of the existing 1Fi app.

## Scope

Per the assignment, the Shop page has three options:

| Tab | Status |
|---|---|
| Top Brands | Not implemented (placeholder), as specified |
| Nearby Stores | Not implemented (placeholder), as specified |
| **1Fi Marketplace** | **Fully implemented** \u2014 this is the focus of the assignment |

The Marketplace flow: browse products by category \u2192 open a product \u2192 pick a
variant and a no-cost EMI tenure \u2192 review the order \u2192 confirm.

## Design consistency

The colour palette, hero banner copy, segmented tab control, search bar and
card styles were matched directly against screenshots of the live 1Fi Shop
page (purple/violet brand colour `#7C3AED`, light neutral background,
rounded white cards, pill-shaped tabs and category chips, 5-tab bottom
navigation).

Two things are intentionally **not** pixel-for-pixel reproductions:

- **Product photography** \u2014 no real product images were available, so each
  item renders as a branded gradient tile with a representative icon
  (`ProductArt.tsx`). Swapping this for real `<Image>` sources is a
  one-file change once photography/URLs exist.
- **Hero illustration** \u2014 the app's hero uses a licensed 3D render. This
  build recreates the same idea (a shopping bag with floating
  phone/laptop/car icons) as an original icon-based composition rather
  than copying the artwork.

## Architecture

```
App.tsx                        Providers: React Query + Navigation
src/
  theme/                       Colours, spacing, typography tokens
  types/product.ts             Domain model (Product, Variant, EMIPlan, Category)
  data/                        Mock catalog (categories.ts, products.ts)
  services/marketplaceApi.ts   Mock async API (delay + simulated failures)
  hooks/useMarketplace.ts      React Query hooks (loading/error/cache)
  utils/                       EMI calculation, currency formatting
  components/                  Reusable UI: cards, chips, buttons, states...
  navigation/                  Bottom tabs (Home/Shop/EMI Dues/Limit/Profile)
                                + Shop stack (list \u2192 detail \u2192 review)
  screens/
    shop/ShopHomeScreen.tsx        Hero + 3-tab segmented control
    shop/MarketplaceTabContent.tsx Category filters + product grid
    shop/ProductDetailScreen.tsx   Variants + EMI plan picker + CTA
    shop/ReviewOrderScreen.tsx     Order summary + confirm + success
    Home/EMIDues/Limit/Profile     Out-of-scope placeholders
```

**Why it's structured this way**

- **No hardcoded UI data.** Every screen reads through `useProducts` /
  `useProductDetail`, which call `marketplaceApi`, which currently reads
  from local mock data but is shaped exactly like a real HTTP client
  (async, can reject). Pointing it at a real backend later doesn't touch
  any screen or component.
- **EMI plans are computed, not stored.** `buildEmiPlans(price)` derives
  tenure/monthly/total from the selected variant's price, so EMI figures
  always match the chosen variant instead of being duplicated data that
  can drift out of sync.
- **State management** uses `@tanstack/react-query` for all server-shaped
  state (loading, error, retry, caching) instead of hand-rolled
  `useState`/`useEffect` fetch logic, and local `useState` only for
  client-only UI state (selected variant, selected EMI tenure, search
  text, active tab).
- **Loading / error / empty states are real, not decorative.** The mock
  API has a small randomized failure rate specifically so the error +
  retry paths are reachable during normal use, not just in a demo you
  have to force by hand.

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android/iOS), or press `a` / `i` for an
emulator/simulator.

## Notes for the reviewer

- `npx tsc --noEmit` passes cleanly.
- The catalog (`src/data/products.ts`) has 9 products across 6 categories,
  each with 2\u20133 variants, so every UI state (multiple variants, single
  variant, out-of-stock variant, discounted vs. no-discount pricing) is
  exercised without extra test scaffolding.
- All EMI plans are no-cost (0% interest, 0 processing fee), matching
  1Fi's actual positioning ("no credit score, no interest, backed by your
  mutual fund holdings") rather than inventing interest-bearing tiers
  that don't fit the product.
