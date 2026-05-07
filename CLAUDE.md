# Ring Installation Prototype

## Project Overview

Mobile-first prototype simulating the Amazon.com product detail page for the Ring Floodlight Cam Pro with a **Professional Installation by HelloTech** upsell widget. Demonstrates the full customer journey: PDP → cart-upsell → cart → checkout → thank you → orders → order-details → invoice → cancellation.

**Purpose:** Building/validating the "Add Additional Items" professional installation widget for the Amazon mobile PDP experience.

## Project Structure

- **Path:** `src/` contains all source files
- **Server:** `node server.js` on port 3000
- **Pages:** index.html (PDP), cart.html, cart-upsell.html, checkout.html, thankyou.html, orders.html, order-details.html, invoice.html, cancellation.html
- **CSS:** `css/amazon.css` (PDP + shared base), `css/pages.css` (downstream pages)
- **JS:** `js/shared.js` (constants, state, utils), `js/app.js` (PDP interactivity)
- **Fonts:** AmazonEmber_Rg.ttf, AmazonEmber_Bd.ttf in `src/fonts/`
- **State:** localStorage key `ring.journey.state` with device + install objects

## Startup Procedure

On every new session:

1. Start the server: `node server.js` (port 3000)
2. Initialize Playwright (MCP) with mobile viewport 390x844
3. Set iPhone user-agent header via `context.setExtraHTTPHeaders`:
   ```
   Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1
   ```
4. Navigate to `http://localhost:3000` to verify the prototype loads

## MCP Tools Required

- **Playwright** — Browser automation, screenshots, DOM inspection, navigation
- **Chrome DevTools (via browser_evaluate)** — getComputedStyle, bounding rects, element inspection

Both must be used TOGETHER on every inspection task. Screenshots for visual truth, DevTools for exact values. Never one without the other.

## Audit Workflow (Agents 1–4)

When auditing pages against the live Amazon reference, create 4 independent agents:

### Agent 1: Visual & Typography
- Font family, sizes, weights, colors, line-heights, letter-spacing
- Borders (width, color, radius, style)
- Colors (background, text, link, badge, hover/active states)
- Shadows, padding, margins, icon sizes

### Agent 2: Layout & Behavior
- Position (sticky/fixed/relative) — SCROLL to verify
- Overflow (horizontal scroll bugs)
- Flex/grid alignment, z-index stacking
- Touch targets (44px minimum), image sizing
- Scroll behavior, tap highlight, link navigation
- State management (localStorage population)

### Agent 3: Structure & Content
- Text copy accuracy (exact wording)
- Missing/extra sections vs real Amazon
- Data formats, link destinations, dynamic data
- JS calculations, conditional logic (?item=device vs ?item=install)
- Heading hierarchy, alt text, title tags

### Agent 4: Final Quality Gate
- Compares all findings from Agents 1–3
- Takes screenshots of BOTH live and prototype
- Uses getComputedStyle on BOTH pages to compare numerically
- ONLY passes if ALL agents agree on PERFECT MATCH
- Reports remaining fixes in priority order if not perfect

## Quality Standards (NON-NEGOTIABLE)

- **100% accuracy required** — never optimize for speed, take as long as needed
- **NEVER say "closely matches"** — only "perfect match" is acceptable
- **Keep iterating** until all 4 agents agree zero differences remain
- **Always navigate live first** — never build from screenshots alone
- **Use iPhone UA** — Amazon serves different HTML based on user-agent, not viewport
- **Never draw from memory** — always trace SVGs/icons from reference images
- **Capture every element** — crop/zoom, extract ALL elements including subtle ones
- **Visual comparison is mandatory** — automated JS extraction is step 1, visual screenshot comparison is step 2, never skip step 2

## Amazon Mobile Design System (Verified Values)

- Body font: "Amazon Ember Modern Text", "Amazon Ember", Arial, sans-serif; 16px
- Text primary: #0F1111
- Text secondary: #565959
- Link color: #2162A1 (confirmed on live — NOT #007185)
- Divider: #D5D9D9
- Header bg: #131921
- Deliver bar bg: #37475A
- Button yellow: #FFD814
- Button border gray: #888C8C
- Progress tracker blue: #1C89E3
- Progress tracker gray (pending dots/bars): #888C8C
- Card padding: 12px 15px (order details deck style)
- Card separator: 2px gap with gray bg showing through
- Pill button radius: 100px
- Card radius: 8px
- Footer bg: #0D141E
- Footer "TOP OF PAGE" bg: #37475A
- Footer text: #CCC (links, locale, legal), #999 (copyright)
- Footer links: 15px, weight 400

## Common Pitfalls

1. Amazon serves desktop HTML at mobile viewport if UA is not set — always set iPhone UA FIRST
2. `getComputedStyle` won't show sprite-based colors (stars) — must compare visually
3. Progress tracker uses gray connecting bars (#888C8C), not blue
4. "Problem with order" button is yellow bg with invisible border (border matches bg color)
5. Action pills are font-weight 400 (not bold), even the yellow primary one
6. The PDP always starts fresh (clears localStorage) — state persists from PDP onward
7. Device quantity change must sync install quantity
8. Cart qty stepper: show trash icon at qty=1, minus sign at qty>1
