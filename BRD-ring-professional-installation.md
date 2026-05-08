# Business Requirements Document: Ring Professional Installation on Amazon.com

**Service Provider:** HelloTech, Inc.  
**Version:** 1.1  
**Date:** May 8, 2026  

---

## 1. Executive Summary

### What We Are Building
Professional Installation offered on Amazon.com — a service that enables customers purchasing Ring security devices to add certified technician installation at checkout. The feature integrates into the Amazon mobile Product Detail Page (PDP), allowing customers to discover, select, and purchase professional installation from HelloTech alongside their Ring device order. The experience extends through checkout, post-purchase order management, and cancellation.

### Why
- Ring security devices require hardwired electrical installation. Electrical wiring requires licensed professionals and involves complex state-level licensing requirements, permit regulations, and safety compliance that vary by jurisdiction.
- Professional installation removes a purchase barrier, increasing conversion on high-value security devices.
- Customers who lack DIY confidence or awareness of local electrical codes benefit from a turnkey solution.

### For Whom
- Amazon customers purchasing Ring products on Amazon.com.
- Specifically targets customers who lack DIY confidence for electrical wiring and outdoor mounting tasks, or who are unaware of local licensing requirements for electrical work.
- The service covers multiple device category packs: Ring cameras (single, multi-pack), doorbells (single, multi-pack), and accessories — each with configurable installation tiers mapped to the device ASIN.

---

## 2. Customer User Stories

### US-01: Discover Installation Service on PDP

**As a** customer viewing a Ring product PDP,  
**I want to** see an option to add professional installation,  
**So that** I know help is available before I commit to buying.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | An "Add Additional Items" section appears below the variant selector on the PDP |
| 2 | The section contains a checkbox row with the label "Professional Installation by HelloTech (X Device)" where X matches the selected device size/bundle |
| 3 | Price is displayed inline (e.g., "$129.00") and updates when the device size changes |
| 4 | A chevron (>) on the row opens a detail popover/bottom sheet |
| 5 | A "Terms of Service" link to https://www.hellotech.com/tos is visible below the row |
| 6 | Widget visibility is gated by the customer's GLOW zip code; only displays if the zip is within HelloTech's serviceable area (zip list provided by HelloTech) |

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
| 3 | Popover includes a tile group (role="radiogroup") with installation options; associated ASINs are configured and mapped to the parent device ASIN (e.g., 1 Device $129.00, 2 Devices $248.00, 3 Devices $349.00) |
| 4 | The tile matching the current device size is pre-selected |
| 5 | Selecting a different tile updates the popover price and title without changing the device size on the PDP |
| 6 | A bullet list describes the service inclusions (device installation, removal, mounting/wiring, WiFi config, smart home integration, training) |
| 7 | An "Add to Order" CTA button adds the installation to state and closes the popover |
| 8 | A "Cancel" button in the header dismisses without changes; pressing Escape also closes |

---

### US-03: Select Installation Count Independent of Device Size

**As a** customer who wants a different installation count from the device pack I'm purchasing,  
**I want to** choose an installation tier that differs from my device pack size,  
**So that** I only pay for the number of devices I need installed.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | The popover tile group allows selecting 1, 2, or 3 devices regardless of the device size selected on the PDP |
| 2 | When the device size changes on the PDP, the installation checkbox is unchecked (unselected) to prompt the customer to reconfirm their selection |
| 3 | The install price recalculates based on the selected installation tier (independent of device unit price) |

---

### US-04: Add to Cart with Installation

**As a** customer who has checked the installation checkbox,  
**I want to** add both the device and installation to my cart in one action,  
**So that** I don't have to separately find the service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Clicking "Add to cart" with installation already selected skips the upsell interstitial and navigates directly to cart |
| 2 | Clicking "Add to cart" WITHOUT installation selected navigates to the post-ATC upsell page |
| 3 | "Buy Now" always navigates directly to checkout |

---

### US-05: Post-ATC Upsell (Cart Interstitial)

**As a** customer who added the device without installation,  
**I want to** be presented one more chance to add installation before reaching the cart,  
**So that** I don't miss the service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | A semi-transparent overlay appears over the PDP with a bottom sheet |
| 2 | Bottom sheet shows "Added" confirmation bar with product thumbnail, green checkmark, and "Go to Cart" link |
| 3 | Below the confirmation: "Add Professional Installation" section displays HelloTech logo, title with device count, rating, price, "E-mail delivery" meta, and an "Add to cart" button |
| 4 | Clicking "Add to cart" on the upsell card adds installation to the order, shows confirmation state, then auto-navigates to cart |
| 5 | Clicking the X (close) button dismisses without adding installation |
| 6 | Clicking "Go to Cart" navigates to cart without adding installation |

---

### US-06: Installation Item Card in Cart

**As a** customer with installation in my cart,  
**I want to** see the Installation Item Card as a separate line item,  
**So that** I can review and adjust before checkout.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Cart displays two item cards: device and installation (when selected) |
| 2 | Installation card shows: HelloTech logo, title with device count, price, "Ships from and sold by HelloTech, Inc.", and Terms of Service link |
| 3 | Both items have quantity steppers: trash icon at qty=1, minus at qty>1, plus button always visible. Maximum quantity determined by checkout guardrails |
| 4 | Subtotal at top of page sums device and installation prices |
| 5 | "Proceed to checkout (N items)" button shows combined item count |
| 6 | Deleting all items shows "Your Amazon Cart is empty" state with "continue shopping" link |
| 7 | Cart header badge reflects total item count |

---

### US-07: Checkout with Installation

**As a** customer proceeding to checkout,  
**I want to** see my installation service clearly identified,  
**So that** I confirm I'm paying for both device and service.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Order summary shows Items (N), subtotal, $0.00 shipping, estimated tax, and grand total |
| 2 | Device appears in "Arriving Tomorrow" section with quantity stepper |
| 3 | Installation appears in a separate "Email delivery" section with HelloTech logo, price, device count, and "Ships from HelloTech, Inc. / Sold by HelloTech, Inc." |
| 4 | Installation quantity stepper shows trash icon at qty=1 for removal |
| 5 | Removing installation from checkout updates all totals immediately without page reload |
| 6 | Terms and conditions text displayed below the "Place your order" CTA: "Professional Installation is provided by HelloTech, Inc. By placing your order you agree to HelloTech's [Terms of Service](https://www.hellotech.com/tos)." |
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
| 4 | Installation block explains: "Scheduling for your Professional Installation will be sent by email once your order ships." with HelloTech logo |

---

### US-09: Order History & Order Details

**As a** customer reviewing past orders,  
**I want to** see the installation service as a trackable order,  
**So that** I can monitor scheduling progress.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Orders page shows two purchase history cards: installation (first) and device (second) |
| 2 | Installation card shows HelloTech logo, title with device count, sub-text "Scheduling sent by e-mail once order ships" |
| 3 | Device card shows product image, short name, estimated arrival date |
| 4 | Order details page for installation shows: heading "Email delivery", HelloTech logo, item title, "Sold by: HelloTech, Inc.", price, and "Buy it again" button (no progress tracker — follows existing Amazon service order pattern) |
| 5 | Order details page for device shows: heading "Delivery", product image, standard milestones: Ordered > Shipped > Out for delivery > Delivered |
| 6 | Order summary on details page shows per-item subtotal, tax, and grand total |
| 7 | Action list includes "Cancel items" link |

---

### US-10: Cancel Installation Service

**As a** customer who no longer wants installation,  
**I want to** cancel the service and receive a refund,  
**So that** I'm not charged for something I won't use.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Cancellation and returns follow existing Amazon rules and processes — no custom flow required |
| 2 | Refund amount reflects the install price paid |
| 3 | Cancellation of installation does NOT affect the associated device order |

---

## 3. Pricing and Tax

### 3.1 Installation Pricing

#### Ring Camera Installation (per SKU)

| SKU | Price |
|-----|-------|
| 1 Camera | $129.00 |
| 2 Cameras | $248.00 |
| 3 Cameras | $349.00 |

#### Ring Doorbell Installation (per SKU) — *Placeholder*

| SKU | Price |
|-----|-------|
| 1 Doorbell | $80.00 |
| 2 Doorbells | $140.00 |

### 3.2 State Tax Requirements

Installation services are subject to state-level sales tax. Tax calculation requirements:

| Requirement | Details |
|-------------|---------|
| Tax base | Tax is calculated **only** on the installation service price — NOT on the device price bundled together |
| Rate variability | Tax rates differ by state and jurisdiction; must use Amazon's tax calculation service per customer shipping address |
| Service vs. goods | Some states treat installation services differently from tangible goods (exempt in some jurisdictions, taxable in others) |
| Display | Estimated tax must be displayed separately at checkout; actual tax calculated at time of order placement |
| Nexus | HelloTech service nexus may differ from Amazon physical goods nexus — confirm with Tax Engine team |

---

## 4. Edge Cases & Error Handling

### 4.1 Quantity Synchronization

| Scenario | Behavior |
|----------|----------|
| Device size changes on PDP | Installation checkbox is unchecked; customer must reconfirm installation selection |
| Install quantity changes in cart/checkout | Independent of device quantity (user can adjust freely) |
| Device deleted from cart | `device.quantity = 0`; installation remains visible if selected |
| Installation deleted from cart | Installation deselected; device unaffected |
| All items deleted from cart | Shows "Your Amazon Cart is empty" state |

### 4.2 Device Count Mismatch

| Scenario | Behavior |
|----------|----------|
| User selects 3-device pack but 1-device install in popover | Allowed: customer may already have some devices installed |
| User changes device size after picking install count in popover | Installation checkbox is unchecked to avoid stale selection |
| Missing installation count field | Falls back to device size as default |

### 4.3 Cancellation Mid-Flow

| Scenario | Behavior |
|----------|----------|
| User confirms cancellation | Shows success view, marks installation as cancelled |
| User clicks "Keep my installation" | Navigates to order history without changes |
| User navigates away without confirming | No change (cancellation not processed) |

### 4.4 State Corruption / Missing Data

| Scenario | Behavior |
|----------|----------|
| Storage is empty or inaccessible | Returns default state (1 device, install not selected, $129.00) |
| Partial state object | Fills missing fields from defaults |
| Cart accessed without prior PDP visit | Shows "Your Amazon Cart is empty" state |

---

## 5. Metrics & KPIs

### 5.1 Primary Metrics

| Metric | Definition |
|--------|------------|
| **Install Attach Rate** | (Orders with installation) / (Total Ring device orders) |
| **PDP Widget Engagement** | (Popover opens + checkbox toggles) / (PDP page views) |
| **Upsell Conversion Rate** | (Installation added from cart-upsell interstitial) / (Cart-upsell impressions) |

### 5.2 Revenue Metrics

| Metric | Definition |
|--------|------------|
| **AOV Lift** | Average order value with install vs. without |
| **Install Revenue per PDP View** | (Total installation revenue) / (PDP views) |
| **Multi-Device Tier Adoption** | % of install orders at 2-device or 3-device tier |

### 5.3 Funnel Health

| Metric | Definition |
|--------|------------|
| **Installation Cancellation Rate** | (Cancelled installs) / (Purchased installs) |
| **Scheduling Completion Rate** | (Installations completed) / (Installations purchased) |
| **Checkout Drop-off (install selected)** | (Checkout started with install) / (Orders placed with install) |
| **Cart Removal Rate** | (Install deleted from cart) / (Install in cart sessions) |

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
| 1 | **No authentication model** — prototype uses hardcoded user. How does the feature interact with real Amazon sign-in, address book, and payment instruments? | High | Define auth requirements and API contracts for user session data |
| 2 | **Install quantity vs. device quantity coupling** — cart/checkout allow independent adjustment. A customer could buy 1 device but 3 installations. | Medium | Define business rule: should install quantity be capped at device quantity? |
| 3 | **No scheduling flow** — the prototype shows "Scheduling" as a milestone but provides no mechanism to actually schedule. What triggers transitions between milestones? | High | Spec the HelloTech scheduling integration (email link? in-app flow?) |
| 4 | **Order number pattern** — are device and installation split into separate orders or is installation a sub-item within one order? | High | Clarify with OMS team |
| 5 | **No eligibility check** — what happens if HelloTech is unavailable in the customer's area? No zip-code check exists. | High | Add availability check (API call) before showing the widget |
| 6 | **Cancellation window** — when is it too late to cancel? Is there a cutoff once the technician is dispatched? | Medium | Define cancellation policy timeline and integrate with HelloTech status API |
| 7 | **No price validation** — if HelloTech raises prices between PDP visit and checkout, stale prices could be used. | Medium | Validate price server-side at checkout |
| 8 | **Electrical licensing scope** — installation requires licensed electricians in many jurisdictions. Who is responsible for compliance — HelloTech or Amazon? | High | Confirm HelloTech handles all state-level licensing and permits |

### 6.2 Potential Pitfalls

| # | Pitfall | Impact |
|---|---------|--------|
| 1 | **Client-side state only** — if user switches devices/browsers, state is lost mid-funnel | Recommend server-side cart persistence |
| 2 | **PDP always resets state** — if user goes back to PDP from cart, all selections reset | Could frustrate users who navigate back; consider preserving on back-navigation |
| 3 | **No deep-link support** — sharing cart/checkout URL won't reproduce the user's state | URL params could encode key selections |
| 4 | **No A/B testing framework** — how do we measure the upsell interstitial vs. no interstitial? | Integrate with Amazon's experimentation platform |
| 5 | **Service availability gaps** — if HelloTech cannot serve a region, showing the widget creates broken expectations | Gate widget display on ZIP-code eligibility check |

### 6.3 Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| HelloTech API integration (scheduling, status, cancellation) | HelloTech Engineering / Amazon Services API | Not started |
| Order Management System (install order handling) | Amazon OMS | Needs design review |
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
| 2 | Validate order management pattern — separate orders vs. sub-items within one order | |
| 3 | Confirm cancellation policy: full refund timeline, cutoff once technician is dispatched | |
| 4 | Confirm the post-ATC upsell interstitial is approved by the PDP/Cart platform team | |
| 5 | Determine ZIP-code eligibility requirements — national coverage or limited markets? | |
| 6 | Clarify whether install device count can differ from device size — or should they always match? | |
| 7 | Confirm the scheduling flow: who initiates contact? Where does the customer manage their appointment? | |
| 8 | Validate tax treatment: state-by-state service tax applicability and rate differences | |
| 9 | Identify the experimentation plan: control group and launch/rollback criteria | |
| 10 | Confirm whether the "Buy Now" path should also show the upsell interstitial | |
| 11 | Determine mobile app vs. mobile web scope — simultaneous launch? | |
| 12 | Verify accessibility requirements (WCAG 2.1 AA) for popover interactions | |
| 13 | Confirm whether installation can be added post-purchase (from order details) | |
| 14 | Review cancellation reason categories with CX team for analytics segmentation | |
| 15 | Confirm HelloTech handles all state-level electrical licensing and permit compliance | |

---

*End of document.*
