# Ring Professional Installation on Amazon.com

| Field | Value |
|-------|-------|
| **PM** | Stephen Chen |
| **TPM** | [Assign] |
| **Engineering** | [Assign] |
| **Service Partner** | HelloTech, Inc. |
| **Status** | Requirements |
| **Target Launch** | TBD |

---

## What's New

Professional installation by HelloTech offered alongside Ring devices on Amazon.com. Net new vs. existing "Add Additional Items" (warranties):

1. **Dynamic pricing tied to device configuration** — Install price changes based on device size/pack selected
2. **Independent quantity selection** — Customer can choose different install count than device pack via popover tile selector
3. **ZIP code eligibility gating** — Widget only displays for HelloTech serviceable areas (GLOW zip)
4. **Third-party service fulfillment** — Creates separate "Email delivery" order fulfilled by HelloTech

---

## Prototype

| Step | Link |
|------|------|
| PDP (Device) | https://chenstep.github.io/ring-installation-a.com/dp/B0F67KWWQH |
| PDP (Install) | https://chenstep.github.io/ring-installation-a.com/dp/B09INSTALL1 |
| Cart Upsell | https://chenstep.github.io/ring-installation-a.com/gp/cart/upsell |
| Cart | https://chenstep.github.io/ring-installation-a.com/gp/cart/view.html |
| Checkout | https://chenstep.github.io/ring-installation-a.com/gp/buy/spc/handlers/display.html |
| Thank You | https://chenstep.github.io/ring-installation-a.com/gp/buy/thankyou |
| Orders | https://chenstep.github.io/ring-installation-a.com/gp/your-account/order-history |
| Order Details | https://chenstep.github.io/ring-installation-a.com/gp/your-account/order-details?item=install |
| Invoice | https://chenstep.github.io/ring-installation-a.com/gp/your-account/order-details/invoice?item=install |
| Cancellation | https://chenstep.github.io/ring-installation-a.com/gp/help/customer/cancel-items |

**Flow:** PDP → Add to Cart (with install → Cart, without → Upsell → Cart) → Checkout → Thank You → Orders → Order Details

---

## BRD

[Link to BRD page or expand inline]

---

## Engineering Summary

| # | Requirement |
|---|-------------|
| 1 | Widget only renders if customer GLOW zip is in HelloTech's serviceable list |
| 2 | Each device ASIN maps to configured install ASINs (1/2/3 tier) — not hardcoded |
| 3 | Device size change unselects install checkbox (no silent carryover) |
| 4 | Install qty independent of device qty — no coupling or capping |
| 5 | Install is separate order line using existing "Email delivery" pattern |
| 6 | Tax calculated only on install price — state-level service tax rules apply |
| 7 | HelloTech T&C displayed below "Place your order" CTA when install in cart |
| 8 | Zero latency — widget must not add latency to PDP; A/B test gates launch |

---

## Milestone Tracker

### Phase 1: Requirements & Design

| # | Milestone | Owner | Status | Date |
|---|-----------|-------|--------|------|
| 1 | BRD complete | PM | Done | May 8 |
| 2 | Mobile prototype | PM | Done | May 8 |
| 3 | Engineering review | Eng Lead | Not Started | |
| 4 | TPM feasibility review | TPM | Not Started | |
| 5 | HelloTech API contract | PM + HelloTech | Not Started | |
| 6 | Tax Engine consultation | PM + Tax | Not Started | |
| 7 | OMS pattern decision | TPM + OMS | Not Started | |

### Phase 2: Technical Design

| # | Milestone | Owner | Status | Date |
|---|-----------|-------|--------|------|
| 8 | Technical design doc | Eng Lead | Not Started | |
| 9 | HelloTech API integration design | Eng | Not Started | |
| 10 | PDP widget placement approval | PDP Platform | Not Started | |
| 11 | A/B test plan finalized | PM + Data | Not Started | |
| 12 | Security review | AppSec | Not Started | |

### Phase 3: Build

| # | Milestone | Owner | Status | Date |
|---|-----------|-------|--------|------|
| 13 | PDP widget implementation | Eng | Not Started | |
| 14 | Cart/Checkout integration | Eng | Not Started | |
| 15 | Order management integration | Eng | Not Started | |
| 16 | HelloTech API integration | Eng | Not Started | |
| 17 | Tax calculation integration | Eng | Not Started | |

### Phase 4: Test & Launch

| # | Milestone | Owner | Status | Date |
|---|-----------|-------|--------|------|
| 18 | QA / UAT | QA + PM | Not Started | |
| 19 | A/B test (limited) | PM + Eng | Not Started | |
| 20 | A/B readout | Data + PM | Not Started | |
| 21 | Launch decision | PM + Leadership | Not Started | |
| 22 | GA rollout | Eng + TPM | Not Started | |

---

## Open Questions

| # | Question | Owner | Decision |
|---|----------|-------|----------|
| 1 | Separate order numbers vs. sub-item? | TPM + OMS | |
| 2 | HelloTech scheduling — email link or in-app? | PM + HelloTech | |
| 3 | Cancellation cutoff — when too late? | PM + HelloTech | |
| 4 | National coverage or limited markets first? | PM + HelloTech | |
| 5 | Mobile app + mobile web simultaneous? | PM + App team | |
| 6 | Who owns electrical licensing compliance? | Legal + HelloTech | |
| 7 | Post-purchase install add from order details? | PM | |
| 8 | Stale price validation at checkout? | Eng | |

---

## Dependencies

| Dependency | Owner | Status | Risk |
|------------|-------|--------|------|
| HelloTech API (scheduling, eligibility, pricing) | HelloTech Eng | Not Started | High |
| Order Management System | Amazon OMS | Not Started | High |
| Tax Engine (services by state) | Amazon Tax | Not Started | Medium |
| PDP widget placement | PDP Platform | Not Started | Medium |
| ZIP eligibility API / coverage map | HelloTech | Not Started | High |
| Mobile app rendering | Shopping App | Not Started | Low |
