# Design Document: Ring Installation Service — Product Detail Page (PDP)

## Overview

This feature adds a professional installation service ($129.99, provided by Amazon Pro) as a purchasable add-on to the Ring Floodlight Cam Pro, Wired (newest model) on Amazon's mobile PDP. The existing `src/index.html` will be scrapped and rebuilt to match the user-provided mobile screenshots of the real Amazon PDP. Scope for this iteration is the PDP only; the six downstream pages (cart-upsell, cart, checkout, thankyou, orders, cancellation) will be designed in follow-up phases once the user provides reference screenshots for each. The new piece of UI introduced on the PDP is the Installation Service card, which follows Amazon's real "Add Additional Items" / Protection Plan row pattern — a checkbox row with a chevron that opens a full-screen mobile takeover popover with service details.

## Design Approach

### Mobile-first
All dimensions, typography, and hit targets are authored against a mobile viewport. The body is pinned to `max-width: 480px` and centered on wider screens. Desktop is explicitly out of scope.

### Install card pattern (Amazon "Add Additional Items" row)
The user provided a real Amazon Protection Plan screenshot and the raw HTML/CSS of the popover. The install card follows that exact pattern:
- A **row** on the PDP with a left checkbox, title, price, and right chevron `›`.
- Tapping the chevron opens a **full-screen mobile takeover popover** with service details and an "Add to Order" / "Update" CTA.
- Tapping the checkbox on the PDP row directly toggles inclusion (no popover needed).
- The section header is "Add Additional Items" — same phrase Amazon uses.

### Where the row goes
Per the buy-box screenshot, the Add Additional Items block sits inline, directly below the orange "Buy Now" button and directly above the shipper/seller line ("Ships from Amazon.com"). Same placement Amazon uses for Protection Plans.

### What was removed from the reference
User-confirmed deletions from the reference:
- **Financing row** (`Or $93.34/mo (3 mo). Select from 4 plans`) — removed.
- **Prime Visa offer line** (`Thank you for being a Prime member…`) — removed.
- **Ring category rail thumbnails** (Indoor Cam Plus, Outdoor Cam, etc.) — removed. Only the `ring ▾` chip remains.

### Asset strategy
- Product/hero imagery uses `src/images/ring-bold-lights.jpg`, `ring-product-hero.jpg`, `ring-product-white.jpg` (already in repo).
- Alexa logo: inline SVG of the Alexa "pulse" mark shipped with the repo (no CDN hotlinking per AI-CODING-GUIDELINES — Amazon's CDN URLs are not reliably fetchable and the agent cannot visually verify an image).
- Video card still: reuses `ring-bold-lights.jpg` as fallback.
- All icons (hamburger, search, cart, heart, share, pin, star, chevron, leaf, checkmark): unicode glyphs or inline SVG.

### What we do NOT do
- Do not invent UI that isn't in the reference screenshots.
- Do not preserve anything from the current `src/index.html` — it's being rebuilt.
- Do not add a multi-tier install plan selector. Only one service: Professional Installation.
- Do not design the other 6 pages in this pass.

---

## PDP Page Design

### Section Inventory (top to bottom, after user edits)

Each row maps to what remains after removing financing, Prime Visa, and category thumbnails. Citations `[A]`, `[B]`, `[C]` refer to the user's reference screenshots.

| # | Section | Source |
|---|---------|--------|
| 1 | Amazon mobile header | A |
| 2 | Search row | A |
| 3 | Deliver-to strip | A |
| 4 | Ring brand rail — `ring ▾` chip only (thumbnails removed) | A |
| 5 | "Visit the Ring Store" link | A |
| 6 | Product title | A |
| 7 | Rating row (4.2 + orange stars + (474)) | A |
| 8 | "Amazon's Choice" pill | A |
| 9 | "2K+ bought in past month" | A |
| 10 | Hero image carousel | A |
| 11 | Carousel dots + save/share icons | B |
| 12 | Works With Alexa card | B |
| 13 | Price row ($279⁹⁹) | B |
| 14 | Prime Overnight delivery badge | B |
| 15 | Trade-in banner ("Save 20% with Trade-In") | B |
| 16 | Configuration: Wired | B |
| 17 | Color swatches (Black, White) | B |
| 18 | Size tiles (1 / 2 / 3 Camera) | B |
| 19 | Free/fast delivery copy + Shorter shipping + Deliver-to link | B |
| 20 | "In Stock" status | B |
| 21 | Quantity dropdown | B |
| 22 | Yellow "Add to cart" button | B |
| 23 | Orange "Buy Now" button | B |
| **24** | **Installation Service row ("Add Additional Items")** — NEW | user directive |
| 25 | Shipper / Seller | B |
| 26 | FREE 30-day refund/replacement link | B |
| 27 | Product support included link | B |
| 28 | "See more" expandable (no-op) | B |
| 29 | "This is a gift" checkbox | B |
| 30 | "Add to Auto Buy" link | B |
| 31 | "Save this item" heading + 3 pill buttons | B |
| 32 | "Bundles with this item" carousel | C |
| 33 | Ring Protect upsell card | C |
| 34 | "Report an issue…" link | C |
| 35 | Video card ("Ring Floodlight Cam Pro") | C |
| 36 | Editorial headline ("Bold lights. Brilliant 4K clarity.") — headline only | C |

### Component Specs

Colors and sizes cite the user-supplied CSS token paste from the real Amazon PDP where possible. See Design Tokens section below for the full table.

#### 1. Amazon mobile header `[A]`
- Background `#131921`.
- Left-to-right: hamburger (☰, white), Amazon wordmark + small "prime" wordmark, spacer, "Stephen ›" with user icon, cart icon with orange `#FF9900` circle badge showing `5`.
- Sticky to viewport top.

#### 2. Search row `[A]`
- Rounded pill, yellow `#FEBD69` border, input pre-populated `ring+floodlight+camera`, clear × inside, yellow magnifier button as right cap.

#### 3. Deliver-to strip `[A]`
- Navy `#37475A` bar, white 13px: `📍 Deliver to Stephen - Walnut 91789 ›`.

#### 4. Ring brand rail `[A]` — simplified
- Thin `#1998D5` top rule.
- Single element: `ring ▾` chip in italic blue `#1a98d5`, Arial, 16px, 700.
- All category thumbnails (Indoor Cam Plus, Outdoor Cam, Outdoor Cam Plus, Outdoor Cam Pro) are **removed** per user directive.

#### 5. "Visit the Ring Store" `[A]`
- Link, 13px, `#2162a1` (Amazon brand-store blue from token paste — overrides prior `#0066C0`).

#### 6. Product title `[A]`
- 14px, weight 400, `#0F1111`.
- Text: "Ring Floodlight Cam Pro, Wired (newest model), Home or business security, Retinal 4K with wide-angle video, 10x Enhanced Zoom, and 2000 Lumen Floodlights, White".

#### 7. Rating row `[A]`
- "4.2" in `#0F1111` 13px, 5-star glyph in `#ffb14a` (from token paste), "(474)" in `#2162a1` 13px.

#### 8. Amazon's Choice badge `[A]`
- Black `#232f3e` pill, white text, 12px, 4px radius.

#### 9. Social proof `[A]`
- "**2K+ bought**" bold + " in past month" regular, `#0F1111` 14px.

#### 10. Hero carousel `[A]`
- Horizontal snap carousel, slides `flex: 0 0 calc(100% - 28px)` so the next slide peeks ~14–28px.
- Slide 1: `src/images/ring-bold-lights.jpg` (navy, "Bold lights. 4K clarity.").
- Slide 2: `src/images/ring-product-hero.jpg` (product on white).
- Slide 3: `src/images/ring-product-white.jpg`.
- No `overflow: hidden` on parents.

#### 11. Carousel indicators `[B]`
- 5 centered dots (first `#232f3e` active, rest `#D5D9D9`), right side `♡` + `↗` icons.

#### 12. Works With Alexa card `[B]`
- Rounded card, 1px `#D5D9D9` border, 8px radius, 12px padding.
- Left: inline SVG Alexa mark (blue).
- Small-caps eyebrow "WORKS WITH ALEXA" 11px.
- Body: "Control this with your device: **Echo Show**" — Echo Show in `#2162a1`.

#### 13. Price row `[B]`
- `$279` 28px weight 400 `#0F1111`, `99` superscript 14px.

#### 14. Prime Overnight delivery badge `[B]`
- Orange `✓` prime checkmark, word `prime` in prime-blue `#246fb6`, then `Overnight` in `#0F1111`.
- Sits directly under price — financing and Prime Visa rows that were between them are removed.

#### 15. Trade-in banner `[B]`
- Full-width light-blue rounded card, background `#DEFAFF`, 1px border `#91DFEB`, 5px radius (values from the user's CSS token paste — `background-color: #DEFAFF; border-color: #91DFEB; border-width: 1px; border-radius: 5px;` observed in the paste for this container type).
- Center-aligned: "Save 20% with **Trade-In**" — "Trade-In" in `#2162a1`.
- Right side: chevron `›`.

#### 16. "Configuration: Wired" `[B]`
- 13px, label `#565959`, value bold `#0F1111`.

#### 17. Color swatches `[B]`
- Label "Color: **White**".
- Two tiles ~80×80 each, 8px radius.
  - Black: solid black square inside, label "Black" under.
  - White (selected): empty with 2px `#2162a1` border, label "White" under.

#### 18. Size tiles `[B]`
- Label "Size: **1 Camera**".
- Horizontal scroll row of 3 tiles ~130px wide, 8px radius, 1px `#D5D9D9` border.
  - Tile 1 selected: "1 Camera" bold, "$279⁹⁹", `prime` + "In Stock" green. Border `#2162a1`, fill `#edf8ff`.
  - Tile 2: "2 Cameras", "$499⁹⁹", "($250.00 / count)" grey, "$559.98" strike, `prime` "In Stock".
  - Tile 3: "3 Cameras", "$779⁹⁸", "($259.99 / count)" grey, "$839.97" strike, `prime` "In Stock".
- Thin horizontal scroll indicator bar below.

#### 19. Delivery copy `[B]`
- "**FREE** delivery **Overnight 4 AM - 8 AM**"
- "Or **$4.99** delivery **in 3 hours**"
- "🍃 Shorter shipping distance ▾" — green leaf, teal dropdown.
- "📍 Deliver to Stephen - Walnut 91789" — `#2162a1` link.

#### 20. Stock status `[B]`
- "In Stock" `#0b7b3c` (from token paste — overrides prior `#007600`), weight 500, 16px.

#### 21. Quantity dropdown `[B]`
- Full-width pill, "Quantity: 1 ▾", 1px `#D5D9D9`, 24px radius, 13px.

#### 22. Add to cart button `[B]`
- Full-width yellow pill, fill `#ffd814`, hover `#ffce12`, active `#f8bd19` (token paste), 24px radius, black text 16px.

#### 23. Buy Now button `[B]`
- Full-width orange pill, fill `#ffa41c`, hover `#ff8400`, active `#ff6e21` (token paste), 24px radius, black text 16px.

#### 24. Installation Service row (NEW — detailed spec below)

#### 25. Shipper/Seller `[B]`
- "Ships from **Amazon.com**"
- "Sold by **Amazon.com**"

#### 26. Returns link `[B]`
- "FREE 30-day refund/replacement" `#2162a1` 13px.

#### 27. Product support link `[B]`
- "Product support included" `#2162a1` 13px.

#### 28. "See more" expandable `[B]`
- "▾ See more" `#2162a1` 13px. **No-op in prototype** (confirmed).

#### 29. "This is a gift" checkbox `[B]`
- `[ ] This is a gift` 13px.

#### 30. "Add to Auto Buy" link `[B]`
- `#2162a1` 13px.

#### 31. Save this item block `[B]`
- Bold heading "Save this item".
- 3 stacked pill buttons (1px `#D5D9D9`, 24px radius, white fill): "Add to List", "Add to Baby Registry", "Add to Registry & Gifting".

#### 32. Bundles carousel `[C]`
- Heading "Bundles with this item" + collapse chevron.
- 3 horizontally scrolling tiles:
  - "with Ring Indoor Cam Plus (White)" — "-12%" red pill `#cc0c39`, `$299.99`, "List: $339.98" strike.
  - "with 4 Window and Door Sensors (newe..." — `$379.97`.
  - "with Ring Ou... Cam Pro Plu..." — "-15%" red pill, `$409...`, "List: $479.98" strike.
- "See all bundles ›" `#2162a1` link.
- Tile images use neutral placeholder until user provides assets (see Asset Inventory).

#### 33. Ring Protect upsell `[C]`
- Light-blue rounded card, background `#DEFAFF`, border `#91DFEB` 1px, 5px radius.
- Bold headline "See more. Know more. Protect more."
- Body: rewatching footage, intelligent alerts, Ring Protect subscription (sold separately).
- Teal link: "Learn about subscription benefits on Ring.com".

#### 34. Report issue `[C]`
- Flag icon + "Report an issue with this product or seller" `#2162a1` link.

#### 35. Video card `[C]`
- Dark tile, `src/images/ring-bold-lights.jpg` as background (fallback from user), play button `▶` overlay center, "Ring Floodlight Cam Pro" text overlay bottom.

#### 36. Editorial headline `[C]`
- Large bold "Bold lights. Brilliant 4K clarity.", 24–28px, `#0F1111`, weight 700. **Headline only** — no supporting body content designed in this pass.

---

### Installation Service — Row + Popover (NEW component)

This component has two parts: the inline **row** on the PDP, and the full-screen **mobile takeover popover** that opens when the chevron is tapped. Structure mirrors Amazon's real Protection Plan pattern per the HTML/CSS the user supplied from DevTools.

#### Part A — PDP Row

**Visual structure**

```
Add Additional Items                               ← section header, 17px bold #0F1111
┌───────────────────────────────────────────────┐
│                                               │
│  [ ]   Professional Installation          ›   │   ← row
│        $129.99                                │
│                                               │
└───────────────────────────────────────────────┘
```

**Copy**
- Section header: `Add Additional Items`
- Row title: `Professional Installation`
- Row subtitle: *(none — matches Amazon's 4-Year Protection Plan row which has no subtitle)*
- Price: `$129.99` in red `#c10015`
- Chevron: `›` right-aligned, `#565959`

**Layout**
- Card container: 1px `#D5D9D9` border, 8px radius, white fill, no inner dividers (only one row).
- Row height ≥ 56px for touch target comfort.
- Left-to-right: checkbox (20px, teal `#2162a1` accent via `accent-color`), text block (title + price stacked, 4px gap), spacer, chevron.
- Vertical padding 12px, horizontal padding 14px.

**States**

| State | Visual |
|-------|--------|
| Unchecked (default) | Empty checkbox, card `#fff`. |
| Checked | Filled teal `#2162a1` checkbox, card remains `#fff` (Amazon doesn't tint the row when the plan is selected). |
| Pressed | 3% black overlay on tap. |

**Row-level interactions**
- Tap checkbox or tap text block → toggles `install.selected` directly. Does not open popover.
- Tap chevron (or the chevron tap zone, right third of the row) → opens popover.

#### Part B — Mobile Takeover Popover

Matches the HTML/CSS from the user's DevTools paste (class names `a-popover-inner`, `mabb-product-view-description`, `mabb-product-feature-bullets`, `mabb-product-cta`, etc.). We don't use those class names; we replicate the visual + behavior.

**Visual structure**

```
┌───────────────────────────────────────────────┐
│  ‹ Cancel                                     │   ← header, sticky top
├───────────────────────────────────────────────┤
│  Professional Installation                    │   ← title, 22px bold
│  by Amazon Pro                                │   ← provider, secondary text
│  $129.99                                      │   ← price, red #c10015, 16px bold
│                                               │
│  ┌─────────────────┐                          │
│  │ Professional    │                          │   ← selectable tile (only one)
│  │ Installation    │                          │
│  │ $129.99         │                          │
│  └─────────────────┘                          │
│                                               │
│  • Expert mounting, wiring, and power-up      │
│  • Wi-Fi connection and Ring app setup        │
│  • System test and walkthrough                │
│  • Schedule after delivery, typically within  │
│    5 days                                     │
│  • Backed by Amazon's Happiness Guarantee     │
│  • Cancel anytime for a full refund before    │
│    your technician is dispatched              │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │            Add to Order                 │  │   ← yellow CTA, full-width
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

**Header**
- Sticky top bar, background `#f0f2f2` or white, 1px bottom `#D5D9D9`.
- `‹ Cancel` left-aligned, `#0F1111` 14px bold.
- Tap Cancel → closes popover, returns to PDP. PDP scroll position restored.

**Body**
- Title `Professional Installation` — 22px bold `#0F1111`.
- Provider line `from Amazon Pro` — 14px `#565959` (Amazon uses "from SquareTrade, Inc." in the reference — same pattern, we say "from Amazon Pro").
- Price `$129.99` — 16px bold `#c10015`.
- **Plan tile group (radiogroup)** — Amazon's reference shows two tiles (4 year / 3 year). We have **one** service, so the group contains **one tile** which is always selected. This preserves the DOM pattern for parity even if visually it looks redundant. Tile: "Professional Installation / $129.99", selected state (2px `#2162a1` border, `#edf8ff` fill).
- **Bullet list** — 6 bullets as shown. 14px `#0F1111`, default disc markers.

**CTA**
- Full-width yellow pill, same spec as Add to cart (`#ffd814` fill, black text, 24px radius, 48px height).
- Label dynamics:
  - If install is currently **not** selected on PDP when popover opens → label reads `Add to Order`. Tap: sets `install.selected = true`, closes popover.
  - If install is currently **already** selected on PDP when popover opens → label reads `Update`. Tap: closes popover (no state change needed since nothing to change with one tile).
- Matches Amazon's `mabb-product-ato` / `mabb-product-update` dual-button pattern from the DevTools paste.

**Entry/exit animation**
- Slide up from bottom on open (200ms ease-out).
- Slide down on Cancel/Add to Order (200ms ease-in).
- While open, PDP body scroll is locked.

**Accessibility**
- Popover has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title.
- Cancel button is reachable via keyboard. Esc closes the popover.
- Focus trapped in the popover while open; returns to the chevron tap target on close.

---

### Interaction Spec

| Interaction | Behavior |
|-------------|----------|
| Tap install checkbox on PDP row | Toggles `install.selected`. No navigation. |
| Tap title/price text on PDP row | Same as tapping checkbox — toggles `install.selected`. |
| Tap chevron `›` on PDP row | Opens the mobile takeover popover. |
| Tap `‹ Cancel` in popover header | Closes popover, returns to PDP with no state change. |
| Tap `Add to Order` / `Update` in popover | Sets `install.selected = true`, closes popover. |
| Tap variant color swatch | Updates `device.color`. |
| Tap variant size tile | Updates `device.size` and `device.unitPrice` from the size→price map. |
| Change quantity dropdown | Updates `device.quantity`. |
| Tap "Add to cart" | Serializes full state to `localStorage` under key `ring.pdp.state`, then navigates to `cart-upsell.html`. If install is already selected, whether upsell page shows a confirmation vs. skips is deferred to cart-upsell design phase. |
| Tap "Buy Now" | Serializes full state to `localStorage`, then navigates to `cart.html`. |
| Tap hero carousel | Horizontal scroll/swipe with snap. |
| Tap bundles carousel | Horizontal scroll/swipe. Tiles non-interactive. |
| Tap Visit the Ring Store / Save-this-item pills / See more / Auto Buy / Report issue / Ring Protect link / video card / editorial headline | No-op. |

### State Spec

In-memory state on PDP, serialized to `localStorage` on Add to cart / Buy Now:

```js
{
  device: {
    id: "ring-floodlight-cam-pro-wired",
    name: "Ring Floodlight Cam Pro, Wired (newest model)",
    color: "White",          // "Black" | "White"
    size: "1",               // "1" | "2" | "3"
    unitPrice: 279.99,       // derived from size via lookup
    quantity: 1
  },
  install: {
    selected: false,
    price: 129.99,
    provider: "Amazon Pro"
  }
}
```

Size→unit price lookup: `{ "1": 279.99, "2": 499.99, "3": 779.98 }`.

localStorage key: `ring.pdp.state`.

---

## Asset Inventory

| Asset | Used In | Source |
|-------|---------|--------|
| `src/images/ring-bold-lights.jpg` | Hero slide 1, video card | existing in repo |
| `src/images/ring-product-hero.jpg` | Hero slide 2 | existing in repo |
| `src/images/ring-product-white.jpg` | Hero slide 3 | existing in repo |
| Alexa mark SVG | Works With Alexa card | inline SVG shipped with repo (new file: `src/assets/alexa-mark.svg`) |
| Bundle tile images | Bundles carousel | Neutral placeholder tiles with product name text. User may supply later. |
| Ring Protect icon | Ring Protect upsell | none needed — text-only card |
| Prime wordmark | Header + delivery badge | CSS-styled text, no image |
| Hamburger / search / cart / heart / share / pin / star / chevron / leaf / checkmark icons | Various | unicode glyphs |
| `src/fonts/AmazonEmber_Rg.ttf`, `AmazonEmber_Bd.ttf` | Body/display font | existing in repo |

Ring category thumbnails: **removed**, no longer needed. Assistants do not guess Amazon CDN URLs per AI-CODING-GUIDELINES.

---

## Design Tokens

Derived from the user's CSS token paste from the real Amazon PDP. Values are authoritative; approximations from earlier drafts are replaced.

### Colors
| Token | Value | Observed on |
|-------|-------|-------------|
| `--color-text` | `#0f1111` | Body text (token `--__dChNmAmGoMXsw4B`) |
| `--color-text-secondary` | `#565959` | Secondary/meta text (token `--__dChiAXwPaPxT`) |
| `--color-link-teal` | `#2162a1` | Primary link (token `--__dChFn118uMXsw4B`, `--__dChsbGMXsw4B`) |
| `--color-link-blue` | `#0a7cd1` | Alt link (token `--__dChFn118ufIs…`) |
| `--color-link-bright-blue` | `#1c89e3` | Strong link / selected accent (token `--__dChFn118uloe…`) |
| `--color-stars` | `#ffb14a` | Rating stars (token `--__dChWb2S9k…`) |
| `--color-in-stock` | `#0b7b3c` | "In Stock" text (token `--__dChWb2ruQ…`) |
| `--color-price-red` | `#c10015` | Install card price, deal prices (token `--__dChWb2ygD…`, `--__dChF3jKG1w4B`) |
| `--color-deal-red` | `#cc0c39` | Deal badges / "-12%" red pills (token `--__dChF3j-Wy…`) |
| `--color-accent-blue` | `#0064f9` | Selected state accent (token `--__dChF3j3Mx…`) |
| `--color-accent-blue-hover` | `#0045a5` | Hover (token `--__dChw-LQy8W2GfIs…`) |
| `--color-btn-yellow` | `#ffd814` | Add to cart fill |
| `--color-btn-yellow-hover` | `#ffce12` | Add to cart hover |
| `--color-btn-yellow-active` | `#f8bd19` | Add to cart active |
| `--color-btn-orange` | `#ffa41c` | Buy Now fill |
| `--color-btn-orange-hover` | `#ff8400` | Buy Now hover |
| `--color-btn-orange-active` | `#ff6e21` | Buy Now active |
| `--color-divider` | `#d5d9d9` | Card borders (token `--__dChFn1F-sw4B`) |
| `--color-divider-subtle` | `#f0f2f2` | Section separator (token `--__dChFn1F-s7XAPxT`) |
| `--color-surface-hover` | `#f7fafa` | Hover fill (token `--__dChw-LwPafIsPxT`) |
| `--color-surface-selected` | `#edf8ff` | Selected tile fill (token `--__dChFn118u7XAMXsPxT`) |
| `--color-info-card-bg` | `#DEFAFF` | Trade-in banner, Ring Protect card (from the inline style paste) |
| `--color-info-card-border` | `#91DFEB` | Same cards |
| `--color-header-bg` | `#131921` | Amazon header |
| `--color-deliver-bar-bg` | `#37475A` | Deliver-to strip |
| `--color-search-border` | `#FEBD69` | Search pill border |
| `--color-orange-accent` | `#ff9900` | Cart badge |
| `--color-prime-blue` | `#246fb6` | `prime` word, Alexa Works With (token `--__dChWb2Bic…`) |
| `--color-muted` | `#888c8c` | Disabled/muted (token `--__dChFn1OGN…`) |
| `--shadow-card` | `0px 2px 5px rgba(15,17,17,0.15)` | Card shadow (token `--__3LVC7CbB_`) |
| `--shadow-popover` | `0px 0px 14px rgba(15,17,17,0.5)` | Popover shadow (token `--__3LVC7Cbvf`) |

### Typography
| Token | Value | Notes |
|-------|-------|-------|
| `--font-body` | `"Amazon Ember Modern Text","Amazon Ember",Arial,sans-serif` | from `--aui-font-text` |
| `--font-display` | `"Amazon Ember Modern Display","Amazon Ember",Arial,sans-serif` | from `--aui-font-display` |
| `--weight-light` | `300` | from `--__SARCETmac` |
| `--weight-regular` | `400` | from `--__SARCETZnk` |
| `--weight-bold` | `700` | from `--__SARCET4AB` |
| `--base-font-size` | `16px (1.6rem)` | root `font-size: 1.6rem` |
| `--line-height-base` | `1.25` | from root |

### Size ramp (text, from `--__SAR2l0zNy*`)
| Token | Value |
|-------|-------|
| `--text-xs` | `1rem` (10px) |
| `--text-sm` | `1.2rem` (12px) |
| `--text-md` | `1.4rem` (14px) |
| `--text-base` | `1.6rem` (16px) |
| `--text-lg` | `1.8rem` (18px) |
| `--text-xl` | `2rem` (20px) |
| `--text-2xl` | `2.4rem` (24px) |
| `--text-3xl` | `2.8rem` (28px) |
| `--text-4xl` | `3.6rem` (36px) |

### Spacing ramp (from `--__TxpmBl*`)
| Token | Value |
|-------|-------|
| `--space-0` | `0` |
| `--space-1` | `0.2rem` (2px) |
| `--space-2` | `0.4rem` (4px) |
| `--space-3` | `0.8rem` (8px) |
| `--space-4` | `1.2rem` (12px) |
| `--space-5` | `1.6rem` (16px) |
| `--space-10` | `10rem` (100px) |

### Border / radius
| Token | Value |
|-------|-------|
| `--radius-pill` | `24px` (buttons) |
| `--radius-card` | `8px` (tiles, card, install card) |
| `--radius-info` | `5px` (info-callout cards) |
| `--border-hairline` | `1px solid var(--color-divider)` |
| `--separator-heavy` | `8px solid var(--color-divider-subtle)` |

---

## Prototype Behavior

### Clickable
- Hero carousel: swipe/scroll.
- Color swatches, size tiles, quantity dropdown.
- Install row checkbox + text area → toggles install.
- Install row chevron → opens popover.
- Popover Cancel, Add to Order/Update buttons.
- Add to cart → persists state + navigates to `cart-upsell.html`.
- Buy Now → persists state + navigates to `cart.html`.
- Bundle carousel scrolls horizontally.

### Static (no-op)
- Search submit.
- Hamburger, account, cart icon.
- Ring brand chip, Visit the Ring Store.
- Works With Alexa card.
- Trade-in banner.
- See more, This is a gift, Add to Auto Buy.
- Save this item pills.
- Ring Protect upsell, Report issue, video play, editorial headline.

### State persistence
- localStorage key `ring.pdp.state` written on Add to cart / Buy Now.
- Popover close via Cancel or Add to Order also updates in-memory state immediately; localStorage write only happens at cart/checkout navigation.

---

## Open Design Questions (remaining)

The user's latest round resolved OQ-1, OQ-2, OQ-3, OQ-4, OQ-6, OQ-7, OQ-8, OQ-9. Only OQ-5 remains and is deferred to cart-upsell phase.

- **OQ-5 (deferred).** After tapping Add to cart WITH install checked, should cart-upsell show a "Great, installation is already added" confirmation, or skip straight to cart? Will be resolved in the cart-upsell design phase once the user provides the cart-upsell reference screenshots.

---

## Future Phases

| Phase | Page | File | Status |
|-------|------|------|--------|
| 2 | Cart Upsell | `src/cart-upsell.html` | TBD, pending reference screenshots |
| 3 | Cart | `src/cart.html` | TBD, pending reference screenshots |
| 4 | Checkout | `src/checkout.html` | TBD, pending reference screenshots |
| 5 | Thank You | `src/thankyou.html` | TBD, pending reference screenshots |
| 6 | Orders | `src/orders.html` | TBD, pending reference screenshots |
| 7 | Cancellation | `src/cancellation.html` | TBD, pending reference screenshots |

The localStorage state contract is fixed as of this doc. Future phases consume it; changes require revisiting this design.

---

## Mapping Forward

1. **requirements.md** — derived from this design. EARS-style acceptance criteria covering: every section renders per spec, install row checkbox toggles state, chevron opens popover, popover Cancel returns to PDP, popover CTA toggles install, Add to cart/Buy Now persist + navigate, size tile selection updates price, removed sections (financing/Prime Visa/category thumbnails) are not present.
2. **tasks.md** — derived from requirements. Expected task groups: scrap `index.html`, rebuild header/search/brand-rail-simplified, rebuild hero carousel, rebuild price + variant + buy box (without financing/Prime Visa), build Install Service row, build Install Service popover (mobile takeover), wire state + localStorage + navigation, asset additions (Alexa SVG), polish/visual-pass against the reference screenshots.
