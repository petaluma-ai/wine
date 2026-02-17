# wine.petaluma.ai — Build Brief

## What You're Building

A single-page marketing site for **Luma for Wine** — an AI business operator for wineries. This is a vertical landing page under the Petaluma AI brand, deployed at `wine.petaluma.ai`.

**Tech stack:** Next.js (latest stable) + Tailwind CSS + Framer Motion. Must deploy cleanly on Vercel free tier.

---

## Brand Identity

### Color Palette (match petaluma.ai exactly)

```css
--sage: #6B7B6B;
--sage-light: #8A9A8A;
--sage-lighter: #B5C4B5;
--sage-dark: #4A5A4A;
--sage-darker: #3A4A3A;
--cream: #FAFAF8;
--warm-white: #F5F5F2;
--warm-gray: #EDEDEA;
--text: #2C3E2C;
--text-light: #5A6B5A;
--text-lighter: #7A8B7A;
--white: #FFFFFF;
--accent: #4A6741;
```

Light mode only. Background is `--cream`. Cards use `--white` with subtle `--sage` borders. Primary buttons use `--sage-dark` with white text.

### Typography

- **Headings:** `Cormorant Garamond` (serif) — elegant, wine-appropriate
- **Body:** `Inter` (sans-serif) — clean, modern
- Load from Google Fonts.

### Logo

The file `assets/petal-mark.png` contains the Petaluma AI petal mark (five overlapping leaf shapes with neural network nodes inside). This is the logo for this page.

- Display the petal mark at the top of the hero section
- Add a subtle, continuous animation: gentle breathing scale (1.0 → 1.03 → 1.0, ~4s cycle) + very slow rotation (~0.5° oscillation). The neural network nodes inside should feel alive — if you can overlay small dots that softly pulse/twinkle, do it. Keep it elegant, not busy.
- Below the mark, display "Luma" in Cormorant Garamond, and below that in smaller text: "by Petaluma AI"
- The full original logo (with text) is in `assets/logo-full.png` for reference only — do NOT use it directly on the page

### Icons

For the tool/system icons (Commerce7, Klaviyo, Gmail, etc.):
- **Preferred:** Use simple, clean SVG icons that represent each tool category (shopping cart for POS, envelope for email, chart for analytics, calendar, phone, clipboard for compliance, barrel for production, truck for shipping)
- Don't try to use trademarked logos. Clean abstract icons in the sage color palette are better.
- Each icon should be a consistent style — thin stroke, rounded, ~24px

---

## Animation Philosophy

**The site should feel alive on load — not require scrolling to animate.**

When the page loads:
1. The petal mark fades in and begins its breathing animation
2. "Luma" text fades up below it
3. The hero headline animates in (fade + slight upward motion)
4. Supporting text follows with a stagger delay
5. Tool icons appear (staggered, from scattered to organized) — within ~2-3 seconds of page load

As the user scrolls, additional sections animate in as they enter the viewport. But the hero section is fully alive without any scrolling. Think: **animated slide deck that plays on arrival.**

For scroll-triggered sections below the hero:
- Fade up + slight Y translation on enter
- Cards stagger in
- Numbers count up when visible (animated counters for $127K, member counts, etc.)
- Keep all animations smooth, 60fps, GPU-composited (transforms + opacity only)

**No scroll-jacking.** The user scrolls naturally; animations trigger on intersection.

---

## Page Structure (6 Sections)

### Section 1: Hero — "The Overwhelmed GM"

**Layout:** Centered. Petal mark at top (animated). Headline. Subtext. Then a visual showing scattered tool icons that represent the chaos of disconnected systems.

```
[Animated Petal Mark]
Luma
by Petaluma AI

# Your winery runs on tools that don't talk to each other.

You're the connective tissue. Your memory, your spreadsheets, your late nights.

[Visual: 8-9 tool icons floating/scattered — POS, Email, Phone, Spreadsheet, 
 Compliance, Production, Calendar, Analytics, CRM. They drift gently, 
 disconnected. On load, they animate from chaos into an orbital arrangement 
 around a central Luma node, showing connection.]
```

The tool icons animation is the hero moment: chaos → order → Luma at center connecting everything.

---

### Section 2: Morning Briefing — "Your Day, Summarized"

**Layout:** Left text, right phone mockup.

```
Kicker: 7 AM, Every Day

# Your day, summarized. Before your first coffee.

Luma checks every system overnight and delivers one message 
with everything that matters.

[Right side: Phone/message mockup showing a WhatsApp-style briefing]

--- Briefing Content ---
"Good morning. Tuesday at a glance."  7:00 AM

• 12 club shipments going out — all compliant
• 3 members at risk of canceling — rescue drafts ready for review
• 8 reservations today, 2 walk-in slots open
• $4,200 in orders yesterday — up 12% vs last Tuesday
• TTB quarterly filing: 18 days out, 94% populated

Delivered • 7:00 AM
```

The message card should animate in — slide up from below + fade. The bullet items should stagger in one by one.

---

### Section 3: Three Promises — "What Luma Sees"

**Layout:** Three cards/panels, each with a number (01, 02, 03), headline, description, and a mini data visualization.

```
Kicker: What Luma Sees

# What Luma Sees.

--- Card 01 ---
## Members about to cancel, before they know it themselves.

Luma analyzes purchase patterns, engagement, and club activity 
to flag at-risk members. Then drafts a personalized save.

[Mini UI showing at-risk member list:]
Sarah Chen — No order in 90 days — [Rescue]
Miguel Alvarez — Skipped last two shipments — [Rescue]  
Amanda Brooks — Email engagement dropped 64% — [Rescue]
Henry Cole — Club renewal due in 10 days — [Rescue]

--- Card 02 ---
## Revenue you're leaving on the table.

Bad data means lost customers. Luma continuously audits your 
records and fixes what's broken.

$127,400  ← animated counter
Recoverable annual revenue

• 847 invalid emails
• 234 outdated addresses  
• 92 duplicate records

--- Card 03 ---
## Every customer, known. Every shipment, personal.

Luma remembers every interaction, every preference, every purchase. 
Six months in, it knows your customers better than your best employee.

[Side-by-side comparison:]
Standard Shipment          →  Sarah's Shipment
2022 Estate Cabernet          2022 Reserve Cabernet (favorite varietal)
2023 Chardonnay               2023 Rosé (seasonal preference)
```

---

### Section 4: Progressive Trust — "Trust, Earned"

**Layout:** Three steps in a vertical timeline or horizontal progression.

```
Kicker: Trust, Earned

# Trust, Earned.

--- Step 1 ---
Icon: Plug
### Luma plugs into your tools
Commerce7, Klaviyo, your email — Luma connects in hours, not months. 
No migration, no disruption.

--- Step 2 ---
Icon: Checkmark/Document  
### You review everything
Luma works in shadow mode first. Every customer response, every action — 
you see it before it sends. Nothing goes out without your approval.

[Inline mockup: approval card]
"Luma drafted a response to Sarah Chen."
[Approve] [Edit] [Reject]

--- Step 3 ---
Icon: Growth/Chart
### Luma earns your trust
Over weeks, approvals speed up. Then Luma handles routine inquiries 
on its own. You choose what to delegate, one task at a time.
```

---

### Section 5: CTA — "See What Luma Can Do"

```
# See what Luma can do for your winery.

A free AI Impact Audit — we connect to your data, show you what's 
possible. 30 minutes, no strings.

[Button: Book Your Audit → mailto:contact@petaluma.ai?subject=Wine%20AI%20Impact%20Audit]
```

---

### Section 6: Footer

```
[Petal mark, small]
Petaluma AI — Named after the place we call home.
Sonoma County, California
petaluma.ai → https://petaluma.ai
```

---

## Technical Requirements

1. **Framework:** Next.js with App Router. Use `next.config.ts` (TypeScript config).
2. **Styling:** Tailwind CSS v4. Define color tokens as CSS custom properties.
3. **Animation:** Framer Motion for all animations. Use `useInView` for scroll-triggered sections. Use `motion` components for entrance animations. Hero animations should fire on mount (not on scroll).
4. **Responsive:** Mobile-first. Must look great on iPhone through 4K desktop. Cards stack vertically on mobile.
5. **Performance:** No heavy dependencies. Images optimized. Lazy load below-fold images. Target Lighthouse 95+ on performance.
6. **Deployment:** Must deploy on Vercel free tier with zero config. Include proper `<meta>` tags for SEO and social sharing.
7. **Accessibility:** Semantic HTML, proper heading hierarchy, alt text, reduced-motion media query (disable animations for users who prefer reduced motion).

## Assets Provided

- `assets/petal-mark.png` — Cropped petal mark (496x287), transparent background
- `assets/logo-full.png` — Full logo with text (for reference only)
- `assets/petaluma-ai-site.html` — The current petaluma.ai homepage HTML (for color/style reference)

## What NOT to Do

- No dark mode / dark theme — this is a light, earthy, premium wine aesthetic
- No emoji anywhere — use SVG icons
- No stock photography
- No pricing section
- No chatbot widget or demo
- No "AI" jargon (no "LLM", "neural network", "machine learning" in copy)
- No scroll-jacking or scroll-hijacking
- Do NOT use the full logo PNG directly — build the logo display from the petal mark + text in code
