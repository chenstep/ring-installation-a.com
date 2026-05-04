# Ring Professional Installation - Prototype

## Project Overview
A high-fidelity clickable prototype demonstrating the customer experience for adding professional installation services when purchasing a Ring device on Amazon.com.

## Goal
Enable Amazon stakeholders to click through a realistic prototype showing how customers can discover, add, purchase, and manage professional installation services for Ring devices.

## Tech Stack
- Static HTML/CSS/JavaScript (no framework dependencies)
- Amazon-style UI (high fidelity)
- Shareable via link (can be hosted on GitHub Pages, S3, or any static host)

## Project Structure
```
ring-installation-prototype/
├── README.md
├── docs/
│   └── SPEC.md              ← Product spec & requirements
├── src/
│   ├── index.html           ← Product detail page (entry point)
│   ├── cart-upsell.html     ← Post-add-to-cart upsell
│   ├── cart.html            ← Cart page
│   ├── checkout.html        ← Checkout page
│   ├── thankyou.html        ← Order confirmation
│   ├── orders.html          ← Order details page
│   ├── cancellation.html    ← Cancellation flow
│   ├── css/
│   │   └── amazon.css       ← Amazon-style stylesheet
│   ├── js/
│   │   └── app.js           ← Interaction logic
│   └── assets/
│       └── (images)
└── 
```

## Status
🟡 In Progress - Defining requirements & spec
