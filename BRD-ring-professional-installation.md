# Business Requirements Document: Ring Professional Installation Upsell

**Product:** Professional Installation by HelloTech on Amazon PDP  
**Device:** Ring Floodlight Cam Pro, Wired (ASIN: B0F67KWWQH)  
**Service Provider:** HelloTech, Inc.  
**Version:** 1.0  
**Date:** May 7, 2026  

---

## 1. Executive Summary

### What We Are Building
An end-to-end "Professional Installation" upsell experience integrated into the Amazon mobile Product Detail Page (PDP) for the Ring Floodlight Cam Pro. The feature allows customers to add a HelloTech professional installation service to their camera order — from discovery on the PDP through checkout, post-purchase order management, and cancellation.

### Why
- Ring security cameras require hardwired electrical installation that many customers cannot or prefer not to do themselves.
- Professional installation removes a purchase barrier, increasing conversion on high-value security devices.
- This creates incremental revenue through a service attach that grows average order value (AOV) by $129-$349 per transaction.

### For Whom
- Amazon Prime customers purchasing the Ring Floodlight Cam Pro, Wired.
- Specifically targets customers who lack DIY confidence for electrical wiring and outdoor mounting tasks.
- The service covers 1-camera, 2-camera, and 3-camera bundles to match all available size configurations.

---

## 2. Customer User Stories

### US-01: Discover Installation Service on PDP

**As a** customer viewing the Ring Floodlight Cam Pro PDP,  
**I want to** see an option to add professional installation,  
**So that** I know help is available before I commit to buying.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | An "Add Additional Items" section appears below the variant selector on the PDP |
| 2 | The section contains a checkbox row with the label "Professional Installation by HelloTech (X Camera)" where X matches the selected device size |
| 3 | Price is displayed inline (e.g., "$129.00") and updates when the device size changes |
| 4 | A chevron (>) on the row opens a detail popover/bottom sheet |
| 5 | A "Terms of Service" link to https://www.hellotech.com/tos is visible below the row |

---

### US-02: View Installation Details in Popover

**As a** customer who wants more information,  
**I want to** open a full-screen detail popover about the installation service,  
**So that** I understand what is included before committing.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Tapping the row text or chevron opens a mobile takeover popover (role="dialog", aria-modal="true") |
| 2 | Popover displays: title, "from HelloTech, Inc.", price, and a link to Terms of Service |
| 3 | Popover includes a tile group (role="radiogroup") with options for 1 Camera ($129.00), 2 Cameras ($248.00), and 3 Cameras ($349.00) |
| 4 | The tile matching the current device size is pre-selected |
| 5 | Selecting a different tile updates the popover price and title without changing the device size on the PDP |
| 6 | A bullet list describes the service inclusions (device installation, removal, mounting/wiring, WiFi config, smart home integration, training) |
| 7 | An "Add to Order" CTA button adds the installation to state and closes the popover |
| 8 | A "Cancel" button in the header dismisses without changes; pressing Escape also closes |

---

### US-03: Select Installation Camera Count Independent of Device Size

**As a** customer with an existing camera already installed,  
**I want to** choose an installation tier that differs from my device pack size,  
**So that** I only pay for the cameras I need installed.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | The popover tile group allows selecting 1, 2, or 3 cameras regardless of the device size selected on the PDP |
| 2 | When the device size changes on the PDP, the install camera count defaults to match but does NOT override a prior explicit popover selection |
| 3 | The install price recalculates based on the selected camera tier (independent of device unit price) |

---

### US-04: Add to Cart with Installation

**As a** customer who has checked the installation checkbox,  
**I want to** add both the device and installation to my cart in one action,  
**So that** I don't have to separately find the service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Clicking "Add to cart" with installation already selected skips the upsell interstitial and navigates directly to `/gp/cart/view.html` |
| 2 | Clicking "Add to cart" WITHOUT installation selected navigates to the post-ATC upsell page at `/gp/cart/upsell` |
| 3 | State is persisted to localStorage before navigation (key: `ring.journey.state`) |
| 4 | "Buy Now" always navigates directly to checkout at `/gp/buy/spc/handlers/display.html` |

---

### US-05: Post-ATC Upsell (Cart Interstitial)

**As a** customer who added the device without installation,  
**I want to** be presented one more chance to add installation before reaching the cart,  
**So that** I don't miss the service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | A semi-transparent overlay (30vh scrim) appears over the PDP (shown in a background iframe scrolled to the ATC button position) |
| 2 | A bottom sheet shows "Added" confirmation bar with product thumbnail, green checkmark, and "Go to Cart" link |
| 3 | Below the confirmation: "Add Professional Installation" section displays HelloTech logo, title with camera count, 4.4-star rating, price, "E-mail delivery" meta, and an "Add to cart" button |
| 4 | Clicking "Add to cart" on the upsell card sets `install.selected = true`, shows a green "Added" state on the button, then auto-navigates to cart after 1200ms |
| 5 | Clicking the X (close) button sets `install.selected = false` and navigates back (history.back()) |
| 6 | Clicking "Go to Cart" navigates to `/gp/cart/view.html` without adding installation |

---

### US-06: Cart with Installation Line Item

**As a** customer with installation in my cart,  
**I want to** see it as a separate line item with quantity controls,  
**So that** I can review and adjust before checkout.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Cart displays two item cards: device and installation (when selected) |
| 2 | Installation card shows: HelloTech logo, title with camera count, price, "Ships from and sold by HelloTech, Inc.", and Terms of Service link |
| 3 | Both items have quantity steppers: trash icon at qty=1, minus at qty>1, plus button always visible |
| 4 | Subtotal at top of page sums device and installation prices |
| 5 | "Proceed to checkout (N items)" button shows combined item count |
| 6 | Deleting installation sets `install.selected = false` and removes the card |
| 7 | Cart header badge reflects total item count |

---

### US-07: Checkout with Installation

**As a** customer proceeding to checkout,  
**I want to** see my installation service clearly identified,  
**So that** I confirm I'm paying for both device and service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Order summary shows Items (N), subtotal, $0.00 shipping, estimated tax (8%), and grand total |
| 2 | Device appears in "Arriving Tomorrow" section with quantity stepper |
| 3 | Installation appears in a separate "Email delivery" section with HelloTech logo, price, camera count, and "Ships from HelloTech, Inc. / Sold by HelloTech, Inc." |
| 4 | Installation quantity stepper shows trash icon at qty=1 for removal |
| 5 | Removing installation from checkout updates all totals immediately without page reload |
| 6 | Legal footer includes: "Professional Installation is provided by HelloTech, Inc. and governed by the Terms of Service." |
| 7 | "Place your order" navigates to thank-you page |

---

### US-08: Order Confirmation (Thank You)

**As a** customer who placed an order with installation,  
**I want to** see confirmation that both items are ordered,  
**So that** I know what to expect next.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Green checkmark banner: "Order placed, thanks!" |
| 2 | Shipping info shows delivery address |
| 3 | Device block shows estimated delivery date with product image |
| 4 | Installation block explains: "Scheduling for your Professional Installation will be sent by email once your order ships. Your HelloTech technician will contact you to schedule your appointment." with HelloTech logo |
| 5 | If installation was NOT selected, the installation block is hidden |

---

### US-09: Order History & Order Details

**As a** customer reviewing past orders,  
**I want to** see the installation service as a trackable order,  
**So that** I can monitor scheduling progress.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Orders page shows two purchase history cards: installation (first) and device (second) |
| 2 | Installation card shows HelloTech logo, title with camera count, sub-text "Scheduling sent by e-mail once order ships" |
| 3 | Device card shows product image, short name, "Arriving May 7, 2026" |
| 4 | Order details page (`?item=install`) shows: heading "Scheduling", order number 112-9644586-3876245, HelloTech logo, progress tracker with milestones: Ordered > Confirmed > Scheduled > Completed |
| 5 | Order details page (`?item=device`) shows: heading "Delivery", order number 112-9644586-3876244, product image, standard milestones: Ordered > Shipped > Out for delivery > Delivered |
| 6 | Order summary on details page shows per-item subtotal, tax, and grand total |
| 7 | Action list includes "Cancel items" link pointing to `/gp/help/customer/cancel-items` |

---

### US-10: Cancel Installation Service

**As a** customer who no longer wants installation,  
**I want to** cancel the service and receive a refund,  
**So that** I'm not charged for something I won't use.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Cancel page header: "Cancel Installation Service" |
| 2 | Reason selection with 5 radio options: "I'll install it myself", "Too expensive", "Scheduling doesn't work for me", "No longer need the device", "Other reason" |
| 3 | Warning box titled "Before you cancel" with 4 bullet points: lose appointment (Fri, May 9), re-booking may have longer wait, full refund of $X within 3-5 business days, Ring device order is NOT affected |
| 4 | Refund amount dynamically reflects the install price from state |
| 5 | "Cancel installation - Refund $X" destructive button transitions to success view |
| 6 | "Keep my installation" button navigates back to order history |
| 7 | Success view shows: green "Installation cancelled" banner, refund message with payment method, note that device order is unaffected, and a "Want to install it yourself?" card linking to self-install guide |
| 8 | Upon confirmation, `install.selected` is set to `false` in state |

---

## 3. Technical Requirements

### 3.1 State Management

**Storage Mechanism:** `localStorage`  
**Key:** `ring.journey.state`  
**Persistence:** Written on PDP interactions, read on all downstream pages.

#### State Schema

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

**Behaviors:**
- PDP always clears state on load (`Ring.clearState()`) and starts from defaults.
- All other pages read state on load and never clear it.
- State is written just before navigation to ensure consistency.
- `readState()` merges with `defaultState()` to handle missing fields (forward-compatible migration).

---

### 3.2 Price Calculation Logic

#### Device Pricing (per size tier / pack)

| Size | Price | Per-Unit |
|------|-------|----------|
| 1 Camera | $279.99 | $279.99 |
| 2 Cameras | $499.99 | $250.00 |
| 3 Cameras | $779.98 | $259.99 |

#### Installation Pricing (per camera count)

| Cameras | Price | Discount vs. Linear |
|---------|-------|---------------------|
| 1 Camera | $129.00 | -- |
| 2 Cameras | $248.00 | $10.00 off ($258) |
| 3 Cameras | $349.00 | $38.00 off ($387) |

#### Tax & Totals

```
taxRate = 0.08 (8%)
deviceSubtotal = device.unitPrice * device.quantity
installSubtotal = install.selected ? install.price * install.quantity : 0
itemsSubtotal = deviceSubtotal + installSubtotal
tax = itemsSubtotal * taxRate
grandTotal = itemsSubtotal + tax
itemCount = device.quantity + (install.selected ? install.quantity : 0)
```

---

### 3.3 Integration Points

| System | Role | Details |
|--------|------|---------|
| HelloTech | Service fulfillment provider | Technician scheduling, on-site installation, Terms of Service at https://www.hellotech.com/tos |
| Amazon PDP | Discovery surface | Widget renders within "Add Additional Items" section below variant selector |
| Amazon Cart | Line item management | Installation appears as a separate cart item sold by "HelloTech, Inc." |
| Amazon Checkout | Order placement | Installation line item marked as "Email delivery" with separate fulfillment timeline |
| Amazon Orders | Post-purchase tracking | Separate order number (112-9644586-3876245) with scheduling-specific progress milestones |

---

### 3.4 URL Routing Structure

| Page | URL Path | Purpose |
|------|----------|---------|
| PDP | `/dp/B0F67KWWQH` | Product detail page with installation widget |
| Cart Upsell | `/gp/cart/upsell` | Post-ATC interstitial for customers who didn't select installation |
| Cart | `/gp/cart/view.html` | Shopping cart with device + install line items |
| Checkout | `/gp/buy/spc/handlers/display.html` | Single-page checkout |
| Thank You | `/gp/buy/thankyou` | Order confirmation |
| Orders | `/gp/your-account/order-history` | Order list view |
| Order Details | `/gp/your-account/order-details?item={device\|install}` | Per-item order details with progress tracker |
| Invoice | `/gp/your-account/order-details/invoice?item={device\|install}` | Printable invoice |
| Cancellation | `/gp/help/customer/cancel-items` | Installation cancellation flow |

---

### 3.5 Cross-Page State Propagation

1. **PDP to Cart Upsell/Cart:** `Ring.writeState(state)` called inside `persistAndGo()` before `window.location.href` assignment.
2. **Cart Upsell to Cart:** After "Add to cart" click, state is written, then 1200ms delay before navigation.
3. **Cart/Checkout:** Both pages mutate state via quantity steppers and immediately call `Ring.writeState(state)` after each change.
4. **Checkout to Thank You:** State persisted before navigation; thank-you reads it to decide whether to show installation block.
5. **Cancellation:** Sets `install.selected = false` and writes state; subsequent pages reflect the cancellation.
6. **Scroll Position:** `sessionStorage.setItem('ring.pdp.scrollY', window.scrollY)` preserves PDP scroll position for the background iframe on the upsell page.

---

## 4. Edge Cases & Error Handling

### 4.1 Quantity Synchronization

| Scenario | Behavior |
|----------|----------|
| Device quantity changes on PDP | `install.quantity` is synced to match `device.quantity` (same change handler) |
| Device size changes on PDP | Device quantity resets to 1; install cameras default to new size; install price recalculates with 600ms loading animation |
| Install quantity changes in cart/checkout | Independent of device quantity (user can adjust freely) |
| Device deleted from cart | `device.quantity = 0`; installation remains visible if selected |
| Installation deleted from cart | `install.selected = false`, `install.quantity = 1`; device unaffected |

### 4.2 Camera Count Mismatch

| Scenario | Behavior |
|----------|----------|
| User selects 3-camera device but 1-camera install in popover | Allowed: `install.cameras = "1"` persists independently of `device.size = "3"` |
| User changes device size after picking install cameras in popover | Install cameras reset to match new device size (defaults back) |
| State has no `install.cameras` field | Falls back to `device.size` via `state.install.cameras \|\| state.device.size` |

### 4.3 Cancellation Mid-Flow

| Scenario | Behavior |
|----------|----------|
| User clicks "Cancel installation - Refund $X" | Hides cancel form, shows success view, sets `install.selected = false` |
| User clicks "Keep my installation" | Navigates to order history without state changes |
| User navigates away without confirming | No state change (cancellation not processed) |

### 4.4 State Corruption / Missing Data

| Scenario | Behavior |
|----------|----------|
| `localStorage` is empty or inaccessible | `readState()` returns `defaultState()` (1 camera, $279.99, install not selected, $129.00) |
| Partial state object in storage | `Object.assign({}, base.device, s.device)` fills missing fields from defaults |
| JSON parse error | Caught by try/catch, returns `defaultState()` |
| `localStorage.setItem` fails (quota/private browsing) | Silently caught; user flow continues but state won't persist across pages |

### 4.5 Navigation Edge Cases

| Scenario | Behavior |
|----------|----------|
| User lands directly on cart-upsell without PDP visit | State reads as defaults (1 camera, $129 install); upsell still functional |
| User navigates back from cart to PDP | PDP calls `Ring.clearState()` on load, resetting all selections |
| User refreshes checkout page | State re-read from localStorage; totals recalculated; no data loss |

---

## 5. Metrics & KPIs

### 5.1 Primary Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Install Attach Rate** | (Orders with installation) / (Total Ring Floodlight Cam Pro orders) | 15-25% |
| **PDP Widget Engagement** | (Popover opens + checkbox toggles) / (PDP page views) | 30%+ |
| **Upsell Conversion Rate** | (Installation added from cart-upsell interstitial) / (Cart-upsell impressions) | 10-15% |

### 5.2 Revenue Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **AOV Lift** | Average order value with install vs. without | +$129-$349 |
| **Install Revenue per PDP View** | (Total installation revenue) / (PDP views) | Track trend |
| **Multi-Camera Tier Adoption** | % of install orders at 2-cam or 3-cam tier | 20%+ |

### 5.3 Funnel Health

| Metric | Definition | Concern Threshold |
|--------|------------|-------------------|
| **Installation Cancellation Rate** | (Cancelled installs) / (Purchased installs) | >20% |
| **Scheduling Completion Rate** | (Installations completed) / (Installations purchased) | <70% |
| **Checkout Drop-off (install selected)** | (Checkout started with install) / (Orders placed with install) | >40% drop |
| **Cart Removal Rate** | (Install deleted from cart) / (Install in cart sessions) | >30% |

### 5.4 Customer Satisfaction

| Metric | Definition |
|--------|------------|
| **Post-Install CSAT** | Survey score after installation completion |
| **Device Return Rate (with install vs. without)** | Compare return rates between cohorts |
| **Contact Rate** | CS contacts mentioning installation issues |

---

## 6. Engineering Manager Audit

### 6.1 Ambiguities & Missing Specs

| # | Issue | Risk | Recommendation |
|---|-------|------|----------------|
| 1 | **No authentication model** -- prototype uses hardcoded user ("Harry Potter"). How does the feature interact with real Amazon sign-in, address book, and payment instruments? | High | Define auth requirements and API contracts for user session data |
| 2 | **Install quantity vs. device quantity coupling** -- PDP syncs install qty to device qty, but cart/checkout allow independent adjustment. Is this intentional? A customer could buy 1 camera but 3 installations. | Medium | Define business rule: should install quantity be capped at device quantity? |
| 3 | **No scheduling flow** -- the prototype shows "Scheduling" as a milestone on order details but provides no mechanism to actually schedule the appointment. What triggers the transition from "Ordered" to "Confirmed" to "Scheduled"? | High | Spec the HelloTech scheduling integration (email link? in-app flow? HelloTech calls customer?) |
| 4 | **Order number generation** -- two hardcoded order numbers (device: 112-9644586-3876244, install: 112-9644586-3876245). In production, are these actually split into separate orders or is installation a sub-item? | High | Clarify with OMS team whether install is a separate order or a shipment group within one order |
| 5 | **No error states** -- what happens if HelloTech is unavailable in the customer's area? No zip-code eligibility check exists. | High | Add availability check (API call) before showing the widget |
| 6 | **Cancellation window** -- when is it too late to cancel? The prototype allows cancellation at any point. Is there a cutoff once the technician is dispatched? | Medium | Define cancellation policy timeline and integrate with HelloTech status API |
| 7 | **No price change handling** -- if HelloTech raises prices between PDP visit and checkout, the prototype uses localStorage values. | Medium | Validate price server-side at checkout to prevent stale pricing |
| 8 | **Tax calculation** -- flat 8% rate hardcoded. Real tax varies by jurisdiction and may differ for services vs. goods. | Medium | Use Amazon's tax calculation service; confirm services are taxable in each state |

### 6.2 Potential Pitfalls

| # | Pitfall | Impact |
|---|---------|--------|
| 1 | **localStorage dependency** -- if user switches devices/browsers, state is lost mid-funnel | Cart could show zero items; recommend server-side cart persistence |
| 2 | **PDP always clears state** -- if user goes back to PDP from cart, all selections reset | Could frustrate users who navigate back to compare; consider preserving on back-navigation |
| 3 | **No deep-link support** -- sharing the upsell or cart URL won't reproduce the user's state | State is client-only; URL params could encode key selections |
| 4 | **Background iframe on upsell page** -- loading PDP inside iframe doubles resource usage and may cause CORS/CSP issues in production | Consider a static screenshot or CSS-only background representation |
| 5 | **No A/B testing framework** -- how do we measure the upsell interstitial vs. no interstitial? | Integrate with Amazon's experimentation platform (Weblab) |

### 6.3 Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| HelloTech API integration (scheduling, status, cancellation) | HelloTech Engineering / Amazon Services API | Not started |
| Order Management System (separate install order number) | Amazon OMS | Needs design review |
| Tax calculation for services by state | Amazon Tax Engine | Needs confirmation |
| PDP widget placement approval (Add Additional Items section) | Amazon PDP Platform | Pending UX review |
| Mobile webview vs. native app rendering | Amazon Shopping App | Needs verification |
| Availability/eligibility by ZIP code | HelloTech Coverage Map | API needed |

---

## 7. Review Checklist for Product Manager

Before sharing this BRD with stakeholders, verify the following:

| # | Item | Status |
|---|------|--------|
| 1 | Confirm installation pricing tiers ($129 / $248 / $349) are contractually agreed with HelloTech | |
| 2 | Validate that separate order numbers for device vs. installation is the correct OMS pattern (vs. shipment groups) | |
| 3 | Confirm cancellation policy: is full refund available at any time before technician dispatch? What about partial refunds? | |
| 4 | Confirm the post-ATC upsell interstitial is approved by the PDP/Cart platform team (this is a new pattern) | |
| 5 | Determine ZIP-code eligibility requirements -- does HelloTech have national coverage or is this limited markets? | |
| 6 | Clarify whether install.cameras can differ from device.size -- or should they always match? | |
| 7 | Confirm the scheduling flow: who initiates contact (HelloTech or customer)? Where does the customer manage their appointment? | |
| 8 | Validate tax treatment: are installation services subject to sales tax in all states? Are there different rates for services vs. goods? | |
| 9 | Identify the experimentation plan: what is the control group, and which metrics determine launch vs. rollback? | |
| 10 | Confirm whether the "Buy Now" path should also show the upsell interstitial (current prototype skips it entirely) | |
| 11 | Determine mobile app vs. mobile web scope -- does this launch on both simultaneously? | |
| 12 | Verify accessibility requirements pass WCAG 2.1 AA for the popover (focus trap, screen reader announcements, keyboard navigation) | |
| 13 | Confirm whether installation can be added post-purchase (e.g., from order details) or only at time of device purchase | |
| 14 | Review the cancellation reason options with the CX team -- are these the right categories for analytics segmentation? | |
| 15 | Validate that "E-mail delivery" is the correct fulfillment label for a service (vs. "Digital delivery" or "Service scheduling") | |

---

*End of document.*
