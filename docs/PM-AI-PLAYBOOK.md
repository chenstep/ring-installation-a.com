# PM Playbook: Building Prototypes with AI

> **Purpose:** A step-by-step guide for Product Managers to build high-fidelity, shareable prototypes using AI (Kiro/Claude) — no engineering background required.  
> **Audience:** Amazon PMs who want to quickly create clickable prototypes for stakeholder review.  
> **Last Updated:** May 4, 2026  
> **Author:** Chen (based on live prototype build session)

---

## 🎯 What You'll Learn

By following this playbook, you'll be able to:
1. Go from product idea → clickable prototype in ~1 hour
2. Share a link with stakeholders so they can click through the experience
3. Iterate rapidly based on feedback
4. Document requirements alongside the prototype

---

## 📋 Prerequisites

| Tool | What It Is | How to Get It |
|------|-----------|---------------|
| **Kiro** (or similar AI IDE) | AI coding assistant that builds pages for you | Install from your team's tools |
| **Git** | Version control (saves your work, enables hosting) | https://git-scm.com/download/win |
| **GitHub account** | Hosts your prototype as a shareable link | https://github.com (free, private repos) |
| **Browser** | To preview your prototype locally | You already have this ✓ |

**You do NOT need:**
- ❌ Coding experience
- ❌ Design tools (Figma, Sketch, etc.)
- ❌ A developer on your team
- ❌ Any backend/server infrastructure

---

## 🚀 The Process (Step by Step)

### Phase 1: Define Your Prototype (15-20 min)

**What to tell the AI:**

1. **The product/feature:** What are you building? Be specific.
   > Example: "A prototype showing how customers can add professional installation when buying a Ring device on Amazon.com"

2. **The pages/screens:** List the customer journey.
   > Example: "Product page → Cart upsell → Cart → Checkout → Thank you → Orders → Cancellation"

3. **Visual fidelity:** How real should it look?
   > Example: "Must match Amazon.com look and feel — high fidelity"

4. **Reference pages:** Share real URLs the AI should mimic.
   > Example: "Use this section from this Amazon page as reference: [URL]"

5. **Key interactions:** What should be clickable?
   > Example: "User can check a box to add installation, click Add to Cart, and flow through checkout"

**💡 Pro Tips:**
- Start with a clear CX flow (customer journey)
- Reference existing Amazon pages for UI patterns
- Don't try to spec everything upfront — iterate page by page
- The AI will ask clarifying questions — that's good! It helps refine the concept

---

### Phase 2: Build Page by Page (30-45 min)

**How the conversation goes:**

```
You: "Build page 1 — the product detail page"
AI: [Creates the page with HTML/CSS]
You: "Open it in my browser"
AI: [Opens it — you review]
You: "Change X, move Y, make Z look more like the real Amazon page"
AI: [Makes changes]
You: "Looks good, let's move to page 2"
...repeat for each page
```

**Key points:**
- Review each page in your browser before moving on
- Give specific feedback (reference real Amazon pages)
- The AI maintains state — it remembers previous decisions
- You can always go back and change earlier pages

---

### Phase 3: Host & Share (10 min)

**Option A: GitHub Pages (Recommended)**
1. AI helps you push code to GitHub
2. Enable GitHub Pages in repo settings
3. Get a shareable link: `https://username.github.io/your-prototype/`

**Option B: Quick Share (No setup)**
1. Ask the AI to zip the project folder
2. Email the zip to colleagues
3. They unzip and open `index.html` — works instantly

---

## 💬 Conversation Templates

### Starting a new prototype:

```
"I'm a PM and I want to build a high-fidelity clickable prototype.

Product: [What you're building]
Target pages: [List the pages/screens in the journey]
Visual style: Must match Amazon.com
Reference: [Link to existing Amazon page for style reference]

Let's go page by page. Start with requirements, then build."
```

### Giving feedback:

```
"On this page, I want to change:
1. [Specific change]
2. [Another change]
Also, look at [Amazon URL] — make section X look more like that."
```

### Moving to next page:

```
"Page [N] looks good. Let's move to the next page: [page name].
Here's what should be on it: [description]"
```

---

## 📁 Project Structure

When the AI builds your prototype, it creates this structure:

```
your-prototype/
├── README.md              ← Project overview
├── docs/
│   ├── SPEC.md            ← CX spec (page-by-page details)
│   ├── REQUIREMENTS.md    ← Formal requirements (for Pippin)
│   └── HOSTING-GUIDE.md   ← How to share the prototype
├── src/
│   ├── index.html         ← Page 1 (entry point)
│   ├── page2.html         ← Page 2
│   ├── page3.html         ← Page 3...
│   ├── css/
│   │   └── amazon.css     ← Amazon-style styling
│   └── js/
│       └── app.js         ← Click interactions
```

---

## ⚠️ Safety Rules

When working with AI on your computer:

1. **Keep prototypes in their own folder** — don't let AI tools run git commands in your Desktop or home directory
2. **Use private repos** — your prototype concepts are pre-launch Amazon IP
3. **Review before pushing** — make sure only prototype files are being committed
4. **Don't put real customer data in prototypes** — use fake names, addresses, order numbers

---

## 📝 Lessons Learned (Live Session)

> These are real lessons from building the Ring Installation prototype:

| # | Lesson | Why It Matters |
|---|--------|---------------|
| 1 | **Start with the CX flow, not the tech** | The AI needs to know the customer journey before building |
| 2 | **Reference real Amazon pages** | Saying "make it look like [URL]" is 10x more effective than describing layouts |
| 3 | **Use noun-style headers** | Amazon uses label-style headers ("Protection Plan") not action-style ("Add Protection") |
| 4 | **Go page by page** | Review each page before moving on — easier to iterate |
| 5 | **Keep a requirements doc updated** | The AI can maintain this in parallel — useful for Pippin |
| 6 | **Git safety: always specify the project folder** | Never let git operations run in your Desktop folder |
| 7 | **Ask the AI to explain trade-offs** | It can give you options with pros/cons for UX decisions |
| 8 | **The AI remembers context** | You don't need to re-explain — it tracks all previous decisions |

---

## 🔄 Iteration Workflow

After sharing with stakeholders:

```
Stakeholder: "Can you make the installation section more prominent?"
You → AI: "On the PDP page, make the installation card more prominent. 
           Maybe add a colored border or highlight."
AI: [Makes the change]
You: [Push to GitHub — link auto-updates]
You → Stakeholder: "Updated! Same link, refresh to see changes."
```

---

## 📊 When to Use This vs. Other Tools

| Approach | Best For | Time | Fidelity |
|----------|----------|------|----------|
| **This playbook (AI prototype)** | Functional clickable flows, stakeholder demos | 1-2 hours | High |
| **Figma/Sketch** | Pixel-perfect visual design, design system work | 4-8 hours | Very High |
| **Paper sketches** | Early brainstorming, quick ideation | 10 min | Low |
| **PowerPoint mockups** | Simple screen flows for docs | 1-2 hours | Medium |
| **Actual development** | Production features | Weeks | Production |

**Use AI prototypes when you want:**
- A clickable experience (not just static images)
- Fast turnaround (hours, not days)
- Easy iteration (change in minutes)
- Shareable link (stakeholders don't need any tools)

---

## 🎓 Getting Started — Your First 5 Minutes

1. Open Kiro
2. Type: *"I want to build a prototype for [your feature]. It should look like Amazon.com. The customer journey is: [list pages]. Let's start with requirements and then build page by page."*
3. Answer the AI's clarifying questions
4. Review each page in your browser
5. Iterate until it looks right
6. Push to GitHub for a shareable link

**That's it. You're a prototype builder now. 🚀**

---

---

## 🧠 AI Coding Guidelines (Karpathy Principles)

> Source: [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls, adapted from [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills).

These four principles dramatically improve AI-assisted coding quality. Apply them when working with any AI coding assistant (Kiro, Claude, Cursor, Copilot, etc.):

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### How to Know It's Working

- **Fewer unnecessary changes in diffs** — Only requested changes appear
- **Fewer rewrites due to overcomplication** — Code is simple the first time
- **Clarifying questions come before implementation** — Not after mistakes
- **Clean, minimal PRs** — No drive-by refactoring or "improvements"

### PM Tips for Applying These Principles

| When You... | Do This... |
|-------------|-----------|
| Ask for a UI change | Include a screenshot or reference URL as the "success criteria" |
| Notice the AI is over-building | Say: "Simplify this — I only need X" |
| See changes to code you didn't ask about | Say: "Revert changes outside of [specific section]" |
| Want to iterate safely | Say: "Only change [this file/section], don't touch anything else" |

---

*This playbook is a living document — updated as we learn more from real prototype sessions.*
