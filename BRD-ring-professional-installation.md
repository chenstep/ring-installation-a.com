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
**I want to** see the installation service in my order history,  
**So that** I can access details and manage my order.

**Acceptance Criteria:**
| # | Criterion |
|---|-----------|
| 1 | Orders page shows two purchase history cards: installation (first) and device (second) |
| 2 | Installation card shows HelloTech logo, title with device count, sub-text "Scheduling sent by e-mail once order ships" |
| 3 | Device card shows product image, short name, estimated arrival date |
| 4 | Order details page for installation shows: "Email delivery" heading, HelloTech logo, item title, "Sold by: HelloTech, Inc.", price, and "Buy it again" button. No progress tracker — follows existing Amazon email delivery/service order pattern |
| 5 | Order details page for device shows: "Delivery" heading, product image, progress tracker (Ordered > Shipped > Out for delivery > Delivered) |
| 6 | Order summary shows: order placed date, order number, item subtotal, shipping ($0.00), tax, and grand total |
| 7 | Payment method card shows card type and last 4 digits |
| 8 | Action pills include: "Problem with order", "Cancel items", "Write a product review", "Buy it again" |

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

## 4. Metrics & KPIs


### 4.1 Primary Metrics

| Metric | Definition |
|--------|------------|
| **Install Attach Rate** | (Orders with installation) / (Total Ring device orders) |
| **PDP Widget Engagement** | (Popover opens + checkbox toggles) / (PDP page views) |
| **Upsell Conversion Rate** | (Installation added from cart-upsell interstitial) / (Cart-upsell impressions) |

### 4.2 Revenue Metrics

| Metric | Definition |
|--------|------------|
| **AOV Lift** | Average order value with install vs. without |
| **Install Revenue per PDP View** | (Total installation revenue) / (PDP views) |
| **Multi-Device Tier Adoption** | % of install orders at 2-device or 3-device tier |

### 4.3 Funnel Health

| Metric | Definition |
|--------|------------|
| **Installation Cancellation Rate** | (Cancelled installs) / (Purchased installs) |
| **Scheduling Completion Rate** | (Installations completed) / (Installations purchased) |
| **Checkout Drop-off (install selected)** | (Checkout started with install) / (Orders placed with install) |

### 4.4 Customer Satisfaction

| Metric | Definition |
|--------|------------|
| **Post-Install CSAT** | Survey score after installation completion |
| **Device Return Rate (with install vs. without)** | Compare return rates between cohorts |
| **Contact Rate** | CS contacts mentioning installation issues |

### 4.5 A/B Test Plan (PDP Widget)

**Experiment:** Widget visible (treatment) vs. widget hidden (control) on eligible Ring PDPs.

#### Primary Metrics (determines launch decision)

| Metric | Definition |
|--------|------------|
| **Device Conversion Rate** | (Device orders) / (PDP views) — must not regress |
| **Install Attach Rate** | (Orders with installation) / (Device orders in treatment) |

#### Secondary Metrics (monitors for harm)

| Metric | Definition |
|--------|------------|
| **Add-to-Cart Rate** | (ATC clicks) / (PDP views) — widget must not reduce ATC |
| **Checkout Abandonment** | (Checkout starts) / (Orders placed) — monitor for install-related friction |

#### Guardrail

| Metric | Requirement |
|--------|-------------|
| Latency | No additional latency introduced by the widget |

---

*End of document.*
