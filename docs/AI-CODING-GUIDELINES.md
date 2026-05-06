
Behavioral guidelines to reduce common LLM coding mistakes. Derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

Source: [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

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

## 4. Goal-Driven Execution

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

---

## How to Know It's Working

These guidelines are working if you see:

- **Fewer unnecessary changes in diffs** — Only requested changes appear
- **Fewer rewrites due to overcomplication** — Code is simple the first time
- **Clarifying questions come before implementation** — Not after mistakes
- **Clean, minimal PRs** — No drive-by refactoring or "improvements"

---

## Project-Specific Application

For our Ring Installation prototype:

| Principle | Application |
|-----------|-------------|
| Think Before Coding | Confirm fidelity target (pixel-perfect vs. close-enough) before rewriting pages |
| Simplicity First | Keep CSS lean; prefer inline styles for one-off elements over new classes |
| Surgical Changes | When updating PDP, don't break other pages' shared styles |
| Goal-Driven | Each UI change should pass a visual check: "Does it look like the reference screenshot?" |

---

## PM Communication Rules

These rules govern how to interpret PM requests:

1. **"Match" or "should look like [reference]" = 100% pixel-perfect match.** Not 80/20. Not "most impactful." Everything.
2. **Never selectively scope PM requests.** If the PM wanted a subset, they'd say so.
3. **Don't optimize for "shipping faster."** Optimize for "exactly what was asked."
4. **If something is truly infeasible** (e.g., can't access an asset), call it out explicitly — don't silently skip it.
5. **Fix ALL issues, not "most impactful."** When asked to match a reference, every difference is a bug.

---

## Getting the Right UI Pattern (Lessons Learned)

When trying to match a real production UI (like Amazon.com), follow this approach:

### The Problem
- You can't reliably guess CDN image URLs — they contain opaque hashes
- You can't always fetch production pages programmatically (CAPTCHA, bot detection)
- AI-generated "approximations" of UI layouts always drift from reality

### The Solution: Give the AI a Reference Image

The #1 most effective technique is: **Upload a screenshot of the target UI and say "match this."**

From the UTR GenAI session (Tyler Cotter, Nov 2025):
> "You could actually just draw it and you could hit the plus button and upload the file and tell it, hey, I want you to make it look like this."

### Best Practices for UI Matching

| Step | What to Do |
|------|-----------|
| 1. Screenshot | Take a mobile screenshot of the real page at the exact viewport you want |
| 2. Upload | Give the screenshot directly to the AI as the reference |
| 3. Be specific | Say: "Match this exactly. Same layout, spacing, fonts, colors." |
| 4. Provide assets | If you need specific images, right-click → "Copy image address" from the real page and paste the URLs |
| 5. Iterate section by section | Don't try to match the whole page at once — go section by section with screenshots |
| 6. Verify | Open your result side-by-side with the screenshot and audit every difference |

### What NOT to Do
- ❌ Don't let the AI guess image URLs (they'll be wrong)
- ❌ Don't describe the UI in words when you can show a screenshot
- ❌ Don't say "make it look like Amazon" — show WHICH part of Amazon
- ❌ Don't accept "close enough" if you asked for exact match
- ❌ Don't let the AI fix "most impactful" issues — fix ALL issues

### Context Is King
The more context you give, the better the result:
- Reference screenshots > text descriptions
- Exact URLs > "make it look like Amazon"
- Specific feedback ("move X 4px left") > vague feedback ("looks off")
- Real asset URLs from DevTools > AI-guessed URLs

---

## LEARNED LESSONS (from real mistakes on this project)

### 1. I Cannot See Screenshots — Don't Pretend Otherwise
- I (the AI) **cannot view image files**. Taking a Puppeteer screenshot and "opening" it does NOT give me visual feedback.
- Never claim to "visually audit" a screenshot. I can only audit code.
- **Correct approach**: Take the screenshot, ask the USER to compare it against the reference, and iterate on their feedback. The user's eyes are the source of truth.

### 2. Don't Claim Self-Validation When It's Impossible
- If I can't verify something myself, say so immediately. Don't waste cycles on fake validation.
- Be transparent: "I've made the CSS changes but I cannot visually verify. Please check on your device and tell me what's off."

### 3. Server Persistence
- When running `node server.js` via Kiro/Cline, the process is tied to a terminal session that may timeout.
- **Always start the server with** `start /B node server.js` on Windows, or use `pm2` if available, so it persists between interactions.
- If the user reports the server stopped, restart it immediately before doing other work.

### 4. Color/Font Matching Requires the Real Reference
- Never guess CSS values for colors or fonts. Amazon uses specific hex codes that vary by element.
- When the user says "colors don't match", ask them to specify WHICH element, or better yet, have them use a color picker on the real Amazon app and give you the exact hex.
- Common Amazon mobile colors to remember:
  - Brand store links: `#0066C0` (blue)
  - Teal action links: `#007185`
  - Title text: `#0F1111`, weight 400, 14px
  - Rating stars: `#de7921`
  - "2K+ bought" = bold black `#0F1111`; "in past month" = regular black `#0F1111`

---

## MANDATORY: Pre-Implementation Visual Checklist

**BEFORE writing ANY CSS/HTML for a visual change, I MUST answer these questions by looking ONLY at the user's reference image:**

1. □ What EXACT element am I changing?
2. □ In the reference: Is it rounded or flat? → Write answer explicitly
3. □ In the reference: What color is the text? → Write the observed color (not guessed)
4. □ In the reference: What font weight? Bold or regular? → Write answer
5. □ In the reference: What size relative to other elements? → Write answer
6. □ Does my planned CSS match ALL of the above? If ANY mismatch → STOP and fix before coding

**If I cannot determine any of these from the reference image, I MUST ask the user before writing code. I will NOT guess based on "what Amazon usually looks like."**

### Enforcement
- This checklist output MUST appear in my response before any CSS/HTML edits
- The user can see if I skipped it and call me out
- "I assumed" is never acceptable — only "the reference shows" is valid justification

---

## 12. Always Verify Before Reporting Done

**NEVER tell the user "it's fixed" without verifying it yourself first.**

### Mandatory Pre-Completion Checklist:
1. □ I made the code change
2. □ I verified the server is serving the updated content (curl/check)
3. □ I confirmed the rendered output matches what the user asked for
4. □ For interactive features (carousel swipe, scroll, clicks): I verified the CSS/JS structure enables them (no `overflow: hidden` on scrollable parents, correct flex sizing, etc.)
5. □ I explicitly state in my completion message: "I verified this works by [specific check I did]"

### Rules for CSS/Layout Changes:
- **Keep image styling minimal**: `width: 100%; height: auto; display: block;` — don't add `object-fit`, `aspect-ratio`, or forced dimensions unless specifically needed
- **Never put `overflow: hidden` on a parent** of a scrollable/swipable container
- **Don't over-engineer**: If the fix is getting more complex with each iteration, STOP and simplify back to basics
- **When the user provides a reference screenshot, match it EXACTLY** — don't reinterpret or deviate

### Anti-Pattern:
❌ "Please refresh on your phone and let me know if it works"
✅ "I verified: the CSS shows `overflow-x: auto` on the carousel, no `overflow: hidden` on parents, slide width is `calc(100% - 28px)` which creates scrollable overflow. The server returns the correct HTML with image 71ckIR2LWOL first."
