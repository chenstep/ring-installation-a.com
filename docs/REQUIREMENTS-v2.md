# Product Requirements Document: Professional Installation Service for Ring Devices

**Version:** 2.0  
**Date:** May 7, 2026  
**Author:** Product & Design  
**Status:** Draft  

---

## 1. Executive Summary / Problem Statement

### Problem Statement

Customers purchasing Ring security cameras (specifically the Ring Floodlight Cam Pro, Wired) face friction during device setup that involves electrical wiring, mounting, WiFi configuration, and smart home integration. Many customers lack the confidence, tools, or time to perform these tasks, leading to delayed activation, returns, or negative reviews.

### Proposed Solution

Introduce a **"Professional Installation by HelloTech"** service as an add-on item within the Amazon mobile product detail page (PDP) purchase flow. The service is presented as an optional upsell at the point of purchase, integrated seamlessly into the existing Amazon cart, checkout, order management, and cancellation experiences.

### Scope

This PRD covers the complete customer journey for the professional installation add-on:
- Discovery and selection on the PDP
- Post-add-to-cart upsell interstitial
- Cart management (with quantity sync)
- Checkout with combined device + service order
- Order confirmation
- Order history and detail views (with separate order tracking for device vs. service)
- Invoice generation
- Cancellation flow with reason capture

### Key Product: Ring Floodlight Cam Pro, Wired (newest model)

- Product ID: `ring-floodlight-cam-pro-wired`
- Base price: $279.99 (1 Camera)
- List price: $319.99 (12% discount displayed)
- Available in: Black, White (default: White)

---

## 2. User Stories

### Primary User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|------------|
| US-1 | Customer on PDP | See a professional installation option alongside my camera purchase | I can decide whether to hire a pro before checkout |
| US-2 | Customer on PDP | View installation service details (scope, price, provider) via a popover | I can make an informed decision without leaving the page |
| US-3 | Customer on PDP | Select the number of cameras for installation independently from my device purchase | I can install only the cameras I need help with |
| US-4 | Customer who skipped install on PDP | Be shown a last-chance upsell after adding to cart | I have a second opportunity to add installation before checkout |
| US-5 | Customer in cart | See the installation as a separate line item with its own quantity control | I can manage the service independently |
| US-6 | Customer at checkout | See combined totals including device, installation, and tax | I understand my full order cost before placing |
| US-7 | Customer post-purchase | View my installation order separately from my device order | I can track scheduling independently |
| US-8 | Customer post-purchase | Cancel my installation service and receive a refund | I can change my mind without affecting my device order |
| US-9 | Customer post-purchase | View an invoice for either the device or the installation | I have records for expense tracking |

### Secondary User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|------------|
| US-10 | Customer on PDP | Change the device size (1/2/3 cameras) and have the installation price update automatically | Pricing stays accurate as I configure my order |
| US-11 | Customer in cart | Delete the installation without affecting the device | I can remove the service but keep the product |
| US-12 | Customer in cart | See a trash icon when quantity is 1 (instead of a minus button) | I understand that reducing further will remove the item |

---

## 3. Functional Requirements

### 3.1 Product Detail Page (index.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PDP-1 | On page load, clear any existing localStorage state and initialize to default (1 Camera, White, no install selected) | P0 |
| FR-PDP-2 | Display an "Add Additional Items" section below the variant selectors containing the installation checkbox row | P0 |
| FR-PDP-3 | The installation row must show: checkbox, title ("Professional Installation by HelloTech (N Camera(s))"), price, and a chevron button to open details | P0 |
| FR-PDP-4 | Tapping the text area or chevron opens a full-screen popover with service details | P0 |
| FR-PDP-5 | The popover must include: title, provider attribution ("from HelloTech, Inc."), price, Terms of Service link, a tile selector for 1/2/3 cameras, a bullet list of service inclusions, and an "Add to Order" CTA | P0 |
| FR-PDP-6 | Selecting a tile in the popover updates the install camera count and price WITHOUT changing the device size selector on the PDP | P1 |
| FR-PDP-7 | Clicking "Add to Order" in the popover sets `install.selected = true`, checks the checkbox, and closes the popover | P0 |
| FR-PDP-8 | Changing device size on the PDP resets install camera count to match, with a 600ms loading animation on the install row | P1 |
| FR-PDP-9 | "Add to cart" button: if install is already selected, navigate to cart.html; if not selected, navigate to cart-upsell.html | P0 |
| FR-PDP-10 | "Buy Now" button: navigate directly to checkout.html regardless of install selection state | P0 |
| FR-PDP-11 | On navigation, persist state to localStorage key `ring.journey.state` and save scroll position to sessionStorage | P0 |
| FR-PDP-12 | Provide a "Terms of Service" link below the install row, linking to https://www.hellotech.com/tos (opens in new tab) | P0 |
| FR-PDP-13 | Escape key must close the popover if open | P1 |

### 3.2 Cart Upsell Interstitial (cart-upsell.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-UP-1 | Display as a bottom-sheet overlay with the PDP visible (scrolled to the add-to-cart button) as an iframe behind a semi-transparent scrim | P0 |
| FR-UP-2 | Show a gray "Added" confirmation bar at the top of the sheet with product thumbnail, green checkmark, and "Go to Cart" button | P0 |
| FR-UP-3 | Below the confirmation bar, show an "Add Professional Installation" section with HelloTech logo, title (matching selected camera count), rating (4.4 stars, 128 reviews), price, "E-mail delivery" meta, and "Add to cart" button | P0 |
| FR-UP-4 | Clicking "Add to cart" on the install card: set `install.selected = true`, animate button to green "Added" state, then redirect to cart.html after 1200ms | P0 |
| FR-UP-5 | Clicking the X close button: set `install.selected = false` and navigate back (history.back()) | P0 |
| FR-UP-6 | The "Go to Cart" link navigates to cart.html without adding install | P1 |

### 3.3 Shopping Cart (cart.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CART-1 | Display subtotal at top, updated dynamically as quantities change | P0 |
| FR-CART-2 | Show device item card with: checkbox, product image, title, "2K+ bought in past month", price, per-unit price (for multi-packs), Prime badge, delivery estimates, FREE Returns, pay-in-monthly option, and quantity stepper | P0 |
| FR-CART-3 | Show install item card (if selected) with: checkbox, HelloTech logo, title with camera count, price, "Ships from and sold by HelloTech, Inc.", Terms of Service link, and quantity stepper | P0 |
| FR-CART-4 | Quantity stepper: show trash icon at qty=1, minus sign at qty>1 | P0 |
| FR-CART-5 | Quantity minimum is 1; at qty=1, pressing trash/delete removes the item entirely | P0 |
| FR-CART-6 | Deleting the device sets `device.quantity = 0` | P1 |
| FR-CART-7 | Deleting the install sets `install.selected = false` and resets `install.quantity = 1` | P0 |
| FR-CART-8 | Display sticky footer CTA: "Proceed to checkout (N items)" with dynamic item count | P0 |
| FR-CART-9 | Cart tabs: Cart (active), Lists, Buy Again (non-functional links) | P2 |
| FR-CART-10 | "Deselect all items" link (non-functional in prototype) | P2 |

### 3.4 Checkout (checkout.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CO-1 | Display minimal Amazon Prime header (no full nav) | P0 |
| FR-CO-2 | Show legal agreement text at top and bottom of page | P0 |
| FR-CO-3 | Display order summary: Items count, Items subtotal, Shipping & handling ($0.00), Estimated tax, Order total | P0 |
| FR-CO-4 | Display payment method section (Visa ending in 0087) with links to change | P1 |
| FR-CO-5 | Display delivery address: "Harry Potter, 11 DIAGON ALLEY, #11, HOGWARTS, 00000, United Kingdom" | P0 |
| FR-CO-6 | Show delivery estimate: "Arriving Tomorrow, May 7" with shipping method radio (One Day, FREE) | P0 |
| FR-CO-7 | Show device product card with quantity stepper (inline, orange border style) | P0 |
| FR-CO-8 | If install selected, show separate "Email delivery" section with install product card, HelloTech details, and quantity stepper | P0 |
| FR-CO-9 | Install card shows: "Ships from HelloTech, Inc.", "Sold by HelloTech, Inc.", Terms of Service link, "Gift options not available" | P0 |
| FR-CO-10 | Install quantity stepper: trash icon at qty=1 deletes the install; minus at qty>1 decrements | P0 |
| FR-CO-11 | Totals update dynamically when quantities change | P0 |
| FR-CO-12 | Display 3-month payment plan option: Grand total / 3 at 0% APR | P1 |
| FR-CO-13 | "Place your order" buttons (top and bottom) navigate to thankyou.html | P0 |
| FR-CO-14 | "Back to cart" link returns to cart.html | P1 |
| FR-CO-15 | Legal footer includes HelloTech Terms of Service attribution: "Professional Installation is provided by HelloTech, Inc. and governed by the Terms of Service." | P0 |

### 3.5 Order Confirmation / Thank You (thankyou.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-TY-1 | Show green checkmark with "Order placed, thanks!" heading | P0 |
| FR-TY-2 | Display "Confirmation will be sent to your email." | P0 |
| FR-TY-3 | Show shipping address: "Shipping to Harry Potter, 11 Diagon Alley, #11, Hogwarts 00000. Phone number: +1 (800) 555-0100" | P0 |
| FR-TY-4 | Device block: "Tomorrow, May 7 / Estimated delivery" with product thumbnail | P0 |
| FR-TY-5 | Install block (shown only if install was selected): "Scheduling for your Professional Installation will be sent by email once your order ships. Your HelloTech technician will contact you to schedule your appointment." with HelloTech logo | P0 |
| FR-TY-6 | Link: "Review or edit your recent orders" navigates to orders.html | P0 |
| FR-TY-7 | "Keep shopping for" carousel with category tiles (non-functional) | P2 |
| FR-TY-8 | Cart badge resets to 0 | P1 |

### 3.6 Orders List (orders.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ORD-1 | Display "Your Orders" title with search input and filter button | P0 |
| FR-ORD-2 | Show savings card: "$206 with Prime" and "16 hours saved" | P2 |
| FR-ORD-3 | Show "Buy again" section with placeholder thumbnails | P2 |
| FR-ORD-4 | Show "Purchase history" section with two cards: install order (linking to order-details.html?item=install) and device order (linking to order-details.html?item=device) | P0 |
| FR-ORD-5 | Install card: shows HelloTech logo, dynamic title with camera count, "Scheduling sent by e-mail once order ships" | P0 |
| FR-ORD-6 | Device card: shows product image, dynamic name with pack label, "Arriving May 7, 2026" | P0 |

### 3.7 Order Details (order-details.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-OD-1 | Accept `?item=device` or `?item=install` query parameter to show the appropriate order (defaults to install) | P0 |
| FR-OD-2 | Display "Your Orders" back navigation link | P0 |
| FR-OD-3 | For device: heading "Delivery", order number `112-9644586-3876244`, progress milestones: Ordered (completed), Shipped, Out for delivery, Delivered | P0 |
| FR-OD-4 | For install: heading "Scheduling", order number `112-9644586-3876245`, progress milestones: Ordered (completed), Confirmed, Scheduled, Completed | P0 |
| FR-OD-5 | "See details" collapsible section with item image, name, seller info, and unit price | P0 |
| FR-OD-6 | Action pills: "Problem with order" (primary/yellow), "Cancel items", "Write a product review", "Buy it again" | P0 |
| FR-OD-7 | Order summary with computed values: Item(s) Subtotal, Shipping ($0.00), Total before tax, Estimated tax, Grand Total | P0 |
| FR-OD-8 | "View invoice" link navigates to invoice.html?item=[device|install] | P0 |
| FR-OD-9 | Payment method card: "Visa ending in 0000" | P0 |
| FR-OD-10 | "Change shipping address" link | P2 |
| FR-OD-11 | Full Amazon footer with links, locale, sign-out, and legal | P2 |

### 3.8 Invoice (invoice.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-INV-1 | Accept `?item=device` or `?item=install` query parameter (defaults to install) | P0 |
| FR-INV-2 | Display "Order Summary" heading with Print button (triggers window.print()) | P0 |
| FR-INV-3 | Show order metadata: date placed, order number | P0 |
| FR-INV-4 | Two-column layout: Payment method (left), Order Summary totals (right) | P1 |
| FR-INV-5 | For device: fulfillment type "Delivery", seller "Amazon.com", hides "Supplied by" line | P0 |
| FR-INV-6 | For install: fulfillment type "Email delivery", seller "HelloTech, Inc.", shows "Supplied by: Other" | P0 |
| FR-INV-7 | Compute and display: subtotal, shipping ($0.00), pre-tax total, estimated tax, grand total | P0 |

### 3.9 Cancellation Flow (cancellation.html)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CX-1 | Display "Cancel Installation Service" header | P0 |
| FR-CX-2 | Present cancellation reason radio buttons: "I'll install it myself", "Too expensive", "Scheduling doesn't work for me", "No longer need the device", "Other reason" | P0 |
| FR-CX-3 | Display warning section: loss of appointment (Fri, May 9), longer re-booking wait, full refund of $129.99 in 3-5 business days, device order unaffected | P0 |
| FR-CX-4 | "Cancel installation -- Refund $129.99" confirm button | P0 |
| FR-CX-5 | "Keep my installation" button returns to orders.html | P0 |
| FR-CX-6 | On confirm: hide cancellation form, show success state with checkmark, refund details, self-install guide CTA, and "Return to Your Orders" button | P0 |
| FR-CX-7 | Success state displays: refund amount ($129.99), payment method (Visa ending in 4242), timeline (3-5 business days), device still arriving message | P0 |

---

## 4. Data Model / State Management

### 4.1 Storage Mechanism

- **Key:** `ring.journey.state`
- **Storage:** localStorage (persists across page navigations within the session)
- **Scroll Position:** sessionStorage key `ring.pdp.scrollY` (used by cart-upsell iframe)

### 4.2 State Schema

```json
{
  "device": {
    "id": "ring-floodlight-cam-pro-wired",
    "name": "Ring Floodlight Cam Pro, Wired (newest model)",
    "color": "White",
    "size": "1",
    "unitPrice": 279.99,
    "quantity": 1
  },
  "install": {
    "selected": false,
    "price": 129.00,
    "provider": "HelloTech",
    "quantity": 1,
    "cameras": "1"
  }
}
```

### 4.3 State Lifecycle

| Page | State Behavior |
|------|---------------|
| PDP (index.html) | CLEARS all existing state on load; initializes fresh default state | 
| Cart Upsell | Reads state; may set `install.selected` |
| Cart | Reads state; modifies quantities; may delete items |
| Checkout | Reads state; modifies quantities; may delete install |
| Thank You | Reads state (read-only) |
| Orders | Reads state (read-only) |
| Order Details | Reads state (read-only) |
| Invoice | Reads state (read-only) |
| Cancellation | Does not interact with shared state module |

### 4.4 Constants (defined in shared.js)

| Constant | Value |
|----------|-------|
| `CONST.device.id` | `ring-floodlight-cam-pro-wired` |
| `CONST.device.name` | `Ring Floodlight Cam Pro, Wired (newest model)` |
| `CONST.device.shortName` | `Ring Floodlight Cam Pro` |
| `CONST.device.defaults.color` | `White` |
| `CONST.device.defaults.size` | `1` |
| `CONST.device.defaults.quantity` | `1` |
| `CONST.device.sizePrice['1']` | `279.99` |
| `CONST.device.sizePrice['2']` | `499.99` |
| `CONST.device.sizePrice['3']` | `779.98` |
| `CONST.device.listPrice` | `319.99` |
| `CONST.device.discountPct` | `12` |
| `CONST.device.image` | `images/ring-product-hero.jpg` |
| `CONST.install.name` | `Professional Installation` |
| `CONST.install.longName` | `Professional Installation by HelloTech` |
| `CONST.install.provider` | `HelloTech` |
| `CONST.install.price` | `129.00` |
| `CONST.install.sizePrice['1']` | `129.00` |
| `CONST.install.sizePrice['2']` | `248.00` |
| `CONST.install.sizePrice['3']` | `349.00` |
| `CONST.install.logo` | `assets/hellotech-logo.png` |
| `CONST.user.firstName` | `Harry` |
| `CONST.user.fullName` | `Harry Potter` |
| `CONST.user.address` | `11 Diagon Alley, #11, Hogwarts 00000` |
| `CONST.user.addressShort` | `Hogwarts 00000` |
| `CONST.user.phone` | `+1 (800) 555-0100` |
| `CONST.payment.last4` | `0000` |
| `CONST.payment.brand` | `Visa` |
| `CONST.order.number` | `112-9644586-3876244` |
| `CONST.order.installNumber` | `112-9644586-3876245` |
| `CONST.order.datePlaced` | `May 4, 2026` |
| `CONST.taxRate` | `0.08` (8%) |

### 4.5 Computed Values (computeTotals function)

```
deviceSubtotal = device.unitPrice * device.quantity
installSubtotal = install.selected ? install.price * install.quantity : 0
itemsSubtotal = deviceSubtotal + installSubtotal
tax = itemsSubtotal * 0.08
grand = itemsSubtotal + tax
itemCount = device.quantity + (install.selected ? install.quantity : 0)
```

---

## 5. UI/UX Requirements

### 5.1 Platform & Viewport

| Attribute | Value |
|-----------|-------|
| Target device | iPhone (mobile-first) |
| Viewport | 390x844 (iPhone 14/15 class) |
| Max page width | 414px (centered, overflow hidden) |
| User-Agent requirement | Must serve mobile layout (requires iPhone UA string) |
| Font stack | "Amazon Ember Modern Text", "Amazon Ember", Arial, sans-serif |
| Custom fonts | AmazonEmber_Rg.ttf, AmazonEmber_Bd.ttf |

### 5.2 Design System Tokens

| Token | Value |
|-------|-------|
| Text primary | #0F1111 |
| Text secondary | #565959 |
| Link color | #2162A1 |
| Divider | #D5D9D9 |
| Header background | #131921 |
| Deliver bar background | #37475A |
| Button yellow (primary CTA) | #FFD814 |
| Button border gray | #888C8C |
| In-stock green | #0b7b3c |
| Prime blue | #146eb4 |
| Star orange | #de7921 |
| Progress tracker blue (completed) | #1C89E3 |
| Progress tracker gray (pending) | #888C8C |
| Card border radius | 8px |
| Pill button radius | 100px |
| Card padding | 12px 15px |
| Footer background | #0D141E |
| Footer "TOP OF PAGE" background | #37475A |
| Footer text | #CCC (links), #999 (copyright) |

### 5.3 Component Specifications

#### Amazon Header (shared across pages)
- Fixed/sticky header with hamburger menu, Amazon logo + "prime" sub-label, user name, account icon, cart icon with badge
- Search bar with pill-shaped input and magnifier button
- Deliver-to bar with pin icon and address

#### Installation Widget ("Add Additional Items")
- Section title: "Add Additional Items" (bold heading)
- Card with checkbox row: left-aligned checkbox, title + price text, right-aligned chevron
- "Terms of Service" link below the card

#### Installation Popover (full-screen takeover)
- Header: "Cancel" back button (left-aligned)
- Body: H1 title, provider attribution, price, TOS link, tile radio group (1/2/3 cameras with prices), bullet list of service inclusions, "Add to Order" CTA button
- Dismissable via Cancel button or Escape key
- Body scroll locked when popover is open (`body.popover-open`)

#### Quantity Stepper
- Inline horizontal control: [trash/minus] [value] [plus]
- At quantity 1: left button shows trash can SVG icon
- At quantity >1: left button shows minus sign
- Orange/amber border style in checkout (2px solid #ffa41c, border-radius 999px)
- Standard gray style in cart

#### Cart Item Card
- Top row: checkbox + image (left) + body content (right)
- Body: title, social proof, price (split dollar/cents), per-unit for multi-packs, Prime badge, delivery info, FREE Returns
- Pay monthly row with checkbox
- Actions row: qty stepper + Delete + Save for later (+ Compare + Share)

#### Progress Tracker (Order Details)
- Horizontal 4-step milestone indicator
- Dot + label for each step
- "Completed" state: blue dot (#1C89E3)
- "Pending" state: gray dot (#888C8C)
- Gray connecting bars between dots

### 5.4 Interaction Patterns

| Interaction | Behavior |
|-------------|----------|
| Size tile selection on PDP | Updates price display; resets install camera count to match; triggers 600ms loading animation on install row |
| Color swatch selection | Toggles selected state (visual only; no price impact) |
| Checkbox toggle (install) | Sets `install.selected` directly |
| Popover tile selection | Updates install camera count and price only (not device size) |
| Add to Cart click (no install) | Saves state + scroll position; navigates to cart-upsell.html |
| Add to Cart click (with install) | Saves state + scroll position; navigates to cart.html (skips upsell) |
| Buy Now click | Saves state; navigates to checkout.html |
| Cart upsell "Add to cart" | Animates to green "Added" state; redirects after 1200ms delay |
| Cart upsell close (X) | Sets install.selected = false; navigates back |
| See details toggle (order details) | Collapses/expands the item detail section (aria-expanded toggled) |

---

## 6. Business Rules

### 6.1 Pricing Rules

| Rule | Detail |
|------|--------|
| Device pricing is tiered by size | 1 Camera: $279.99, 2 Cameras: $499.99, 3 Cameras: $779.98 |
| Install pricing is tiered by camera count | 1 Camera: $129.00, 2 Cameras: $248.00, 3 Cameras: $349.00 |
| Install camera count is independent of device size | User can purchase 3 cameras but only get install for 1 |
| Tax rate | 8% flat rate applied to (device subtotal + install subtotal) |
| Shipping | Always $0.00 (FREE with Prime) |
| Monthly payment calculation | Displayed as: Grand total / 3 (checkout), unit price / 5 (cart) |
| Discount display | Device list price $319.99, -12% shown on PDP |

### 6.2 Quantity Rules

| Rule | Detail |
|------|--------|
| Device quantity range | 1-5 (dropdown on PDP); 1+ via stepper in cart/checkout |
| Install quantity range | 1+ (no upper bound in prototype) |
| Device quantity change on PDP | Syncs install quantity to match (`state.install.quantity = state.device.quantity`) |
| Install quantity in cart/checkout | Independent of device quantity |
| Deletion at qty=1 | Removes item entirely (device.quantity = 0 or install.selected = false) |

### 6.3 Provider Information

| Attribute | Value |
|-----------|-------|
| Provider name | HelloTech |
| Legal entity | HelloTech, Inc. |
| Terms of Service URL | https://www.hellotech.com/tos |
| Fulfillment method | E-mail delivery (scheduling sent via email) |
| Seller attribution | "Ships from and sold by HelloTech, Inc." |
| Rating (upsell card) | 4.4 stars, 128 reviews |

### 6.4 Order Number Rules

| Order Type | Number Format | Example |
|------------|--------------|---------|
| Device order | `112-XXXXXXX-XXXXXXX` | `112-9644586-3876244` |
| Install order | Sequential to device (+1 on last segment) | `112-9644586-3876245` |

### 6.5 Service Inclusions (displayed in popover)

1. Installation of your device by certified technicians.
2. Complete removal service -- including unwiring and dismounting of your existing doorbell or device.
3. Professional mounting and wiring of your new 4K devices. If required, modifications and extensions to existing wiring available at additional cost.
4. Device configuration including WiFi network connection and Ring app setup.
5. Integration with your existing smart home system and voice assistants.
6. Hands-on training for both your device and mobile apps, ensuring you are comfortable with all features.

### 6.6 Cancellation Rules

| Rule | Detail |
|------|--------|
| Cancellation is available for install service only | Device order is explicitly stated as unaffected |
| Refund amount | Full refund ($129.99 as displayed in prototype) |
| Refund timeline | 3-5 business days |
| Refund method | Original payment method (Visa ending in 4242 in prototype) |
| Re-booking warning | "Re-booking may have a longer wait time" |

---

## 7. Edge Cases / Constraints

### 7.1 State Management Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| User navigates directly to cart.html without going through PDP | State initializes to default (1 camera, no install, $279.99) |
| localStorage is unavailable or full | Graceful degradation; functions return default state; writes silently fail |
| Corrupted JSON in localStorage | `readState()` catches parse error and returns defaultState() |
| Missing fields in stored state (schema migration) | `Object.assign({}, base, stored)` fills missing fields from defaults |
| User refreshes PDP | State is cleared and reset to defaults (by design) |
| User navigates back to PDP from cart | State is cleared (PDP always starts fresh) |

### 7.2 UI Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Cart with device qty=0 | Device card not rendered; only install card shown (if selected) |
| Cart with neither device nor install | Empty cart state; checkout button shows "(0 items)" |
| Very long product titles | Truncated with CSS overflow (ellipsis implied by card layout) |
| Multi-pack pricing display | Per-unit price shown: "($250.00 / count)" for 2-pack, "($259.99 / count)" for 3-pack |
| Install tile selected in popover doesn't match device size | Allowed -- install cameras count is independent |

### 7.3 Navigation Constraints

| Constraint | Detail |
|-----------|--------|
| No browser back button handling | Prototype does not intercept popstate events |
| Popover uses body scroll lock | `document.body.classList.add('popover-open')` prevents background scroll |
| Cart-upsell iframe background | PDP loaded in iframe with `pointer-events: none` (non-interactive) |
| Cart-upsell scroll restoration | Iframe scrolls to saved scrollY or to the add-to-cart button if no saved position |

### 7.4 Platform Constraints

| Constraint | Detail |
|-----------|--------|
| Mobile-only design | No desktop/tablet responsive breakpoints |
| iPhone User-Agent required | Amazon serves different HTML based on UA, not viewport width |
| Local server required | `node server.js` on port 3000 |
| No real API calls | All data is client-side; no backend validation |
| No authentication | User identity is hardcoded |

---

## 8. Success Metrics

### 8.1 Primary Metrics (Feature Adoption)

| Metric | Definition | Target |
|--------|-----------|--------|
| Install attach rate | % of Ring camera purchases that include professional installation | Baseline to be established |
| PDP-to-cart conversion (with install) | % of PDP visitors who add both device + install to cart | Higher than device-only conversion |
| Upsell interstitial acceptance rate | % of users shown cart-upsell.html who click "Add to cart" on install | > 15% |
| Popover engagement rate | % of PDP visitors who open the install details popover | > 25% |

### 8.2 Secondary Metrics (Funnel Health)

| Metric | Definition | Target |
|--------|-----------|--------|
| Cart-to-checkout retention | % of carts containing install that proceed to checkout without removing install | > 80% |
| Checkout-to-order conversion | % of checkout page loads that result in "Place your order" click | Parity with baseline (no regression) |
| Install cancellation rate | % of completed install orders that are subsequently cancelled | < 10% |
| Cancellation reason distribution | Breakdown of why users cancel (self-install, cost, timing, etc.) | Tracked for product insights |

### 8.3 Experience Quality Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Page load time (PDP with widget) | Time to interactive for PDP including install widget | < 2s on LTE |
| State persistence reliability | % of sessions where state correctly persists across all page transitions | 100% |
| Price accuracy | % of sessions where displayed price matches computed price at checkout | 100% |
| Order detail accuracy | % of post-purchase views showing correct item, price, and order number | 100% |

### 8.4 Business Impact Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Revenue per device unit | Average total revenue per Ring camera unit sold (device + install) | Increase vs. baseline |
| Device return rate (with install) | Return rate for devices purchased with professional installation | Lower than devices without install |
| NPS for install customers | Net Promoter Score from customers who purchased professional installation | > 50 |
| HelloTech appointment completion rate | % of install orders that result in a completed installation appointment | > 95% |

---

## Appendix A: Page Flow Diagram

```
[PDP] ---(Add to Cart, no install)---> [Cart Upsell] ---(Add install)---> [Cart]
  |                                          |                               |
  |---(Add to Cart, with install)------------|----(Go to Cart)-------------->|
  |                                                                          |
  |---(Buy Now)---> [Checkout] ---(Place Order)---> [Thank You]              |
                         ^                               |                   |
                         |                               v                   |
                    [Cart] -----(Proceed to Checkout)---> [Checkout]          |
                                                                             |
                                                    [Orders] <---------------+
                                                       |
                                          +------------+------------+
                                          |                         |
                                 [Order Details           [Order Details
                                  ?item=device]            ?item=install]
                                          |                         |
                                    [Invoice               [Invoice
                                     ?item=device]          ?item=install]
                                                                    |
                                                             [Cancellation]
```

## Appendix B: File Structure

```
src/
  index.html          - Product Detail Page with install widget
  cart-upsell.html    - Post-add-to-cart upsell interstitial
  cart.html           - Shopping cart
  checkout.html       - Checkout flow
  thankyou.html       - Order confirmation
  orders.html         - Order history list
  order-details.html  - Individual order detail (parameterized)
  invoice.html        - Printable order summary (parameterized)
  cancellation.html   - Installation cancellation flow
  js/
    shared.js         - Constants, state management, utility functions, header renderer
    app.js            - PDP interactivity (variant selection, popover, navigation)
  css/
    amazon.css        - PDP styles + shared base styles
    pages.css         - Downstream page styles (cart, checkout, orders, etc.)
  fonts/
    AmazonEmber_Rg.ttf
    AmazonEmber_Bd.ttf
  images/
    ring-product-hero.jpg
    ring-bold-lights.jpg
    ring-product-white.jpg
    ring-product-hero-gray.jpg
  assets/
    hellotech-logo.png
    wwa-v2-logo-no-text.png
```
