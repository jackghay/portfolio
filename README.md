# Amine Nasser Allah — Portfolio

**`Full-Stack Developer & AI Engineer`** · `Vite 6 + Vanilla JS` · `Three.js` · `Transformers.js (WebGPU)` · `5 Themes` · `PWA` · `Bilingual AR/EN`

> Architecture — Performance — Precision — Security

---

## 📋 Contents

- [Overview](#-overview)
- [Why This Exists](#-why-this-exists)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Security Hardening](#-security-hardening)
- [Performance Metrics](#-performance-metrics)
- [Get Started](#-get-started)
- [Deployment](#-deployment)
- [The Thinking Process](#-the-thinking-process)
- [What I Learned](#-what-i-learned)

---

## 🧠 Overview

This is not just a portfolio. It is a **living case study** of how I build software:

- **Code quality**: Clean, modular ESM architecture with zero frameworks
- **Security**: Enterprise-grade — CSP, HSTS, SRI, XSS-free, Honeypot, Rate-limited
- **Performance**: Lazy loading, code splitting, RAF-throttled handlers, `content-visibility`
- **UX**: 5 unique themes, bilingual AR/EN with full RTL, AI chatbot with real RAG pipeline
- **AI**: Client-side vector search via Transformers.js + WebGPU — no server, no API keys

---

## 🤔 Why This Exists

I built this portfolio for one reason: **to prove that I can build production-grade software from scratch**.

Not with a template. Not with a framework. Not with AI slop. **Hand-crafted, line by line.**

Every byte is intentional. Every animation is measured. Every security header is deliberate.

When a potential client or employer visits this site, I want them to feel:
> "This person actually understands what he builds."

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Build** | Vite 6 (esbuild) | Fast, tree-shaking, code-splitting |
| **Language** | Vanilla JS (ES2022) | Zero framework lock-in |
| **3D** | Three.js (lazy loaded) | 8 wireframe icosahedra + 600 particles |
| **AI** | Transformers.js + WebGPU (Worker) | Client-side RAG pipeline |
| **Themes** | CSS Custom Properties | 5 themes: Dark, Light, Neon, Chrome, Hologram |
| **PWA** | Service Worker + Manifest | Offline-capable, installable |
| **I18n** | Custom runtime | EN/AR with RTL support |
| **Security** | CSP, HSTS, SRI, Honeypot | Enterprise-level headers |
| **Fonts** | Space Grotesk + Inter + JetBrains Mono + Cairo | Typography & Arabic support |

---

## 🏛️ Architecture

```
portfolio/
├── index.html              # SPA shell — inline-script-free
├── vite.config.js          # SRI plugin, code splitting, sourcemap:false
├── public/
│   ├── _headers            # Netlify: CSP, HSTS, XFO, XCTO, RP, PP
│   ├── sw.js               # Service Worker (scoped, validated)
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO
│   └── .well-known/
│       └── security.txt    # Security disclosure
├── src/
│   ├── main.js             # Entry point — init orchestrator
│   ├── data.js             # Single source of truth for all content
│   ├── i18n.js             # Runtime i18n engine
│   ├── theme.js            # Theme cycler + localStorage
│   ├── scrollEffects.js    # IntersectionObserver + RAF throttle
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js       # Responsive nav + scroll hide
│   │   ├── Chatbot.js      # AI chatbot with sanitized output
│   │   ├── GitHubStats.js  # Live GitHub profile data
│   │   ├── ProjectModal.js # Case study modal
│   │   ├── CustomCursor.js # Event-delegated cursor
│   │   └── BackToTop.js    # RAF-throttled visibility
│   ├── sections/           # Page sections
│   │   ├── Hero.js         # Typing effect
│   │   ├── About.js        # Stats animation
│   │   ├── Skills.js       # Animated bars
│   │   ├── Projects.js     # Filterable grid + gradient visuals
│   │   ├── Experience.js   # Timeline
│   │   ├── AIWorkflow.js   # Pipeline cards
│   │   ├── Testimonials.js # Auto-rotate carousel
│   │   ├── Blog.js         # Technical articles with modals
│   │   └── Contact.js      # Honeypot + Rate limit + Validation
│   ├── effects/
│   │   ├── threeHero.js    # Lazy-loaded Three.js scene
│   │   └── generativeArt.js# Lazy-loaded canvas art
│   ├── workers/
│   │   └── ai.worker.js    # Web Worker with message validation
│   └── styles/
│       ├── themes.css      # 5 themes via CSS custom properties
│       ├── main.css        # Layout, components, responsive
│       └── animations.css  # Keyframes + utility classes
```

**Key architectural decisions:**

- **`data.js` as SSOT** — All content centralized, no duplication. Change once, updates everywhere.
- **Lazy loading via dynamic `import()`** — Three.js (466 kB) and generative art only load on desktop without `prefers-reduced-motion`.
- **Web Worker isolation** — Transformers.js runs in a Worker thread with validated `postMessage` channel.
- **Event delegation** — Custom cursor attaches one listener to `document`, not 50 elements.
- **CSS `data-*` attributes** — Navbar hide/show uses attribute selectors, not inline `style` mutations (avoids CSS-in-JS performance tax).
- **`content-visibility: auto`** — Every section gets automatic lazy rendering with `contain-intrinsic-size`.

---

## 🌟 Key Features

### AI Chatbot — Real RAG In-Browser

```mermaid
User Query → Embed (all-MiniLM-L6-v2) → Cosine Similarity → Best Context → Response
                ↑                              ↑
        WebGPU Acceleration         384-dim vector search
```

- **Zero server cost**: Runs entirely in browser via Web Worker
- **WebGPU accelerated**: 3-5x faster than WASM for embeddings
- **RAG pipeline**: Portfolio data embedded, searched, retrieved
- **Fallback**: Keyword-based when models not loaded
- **Sanitized output**: All responses use `textContent`, never `innerHTML`

### 5 Themes

| Theme | Vibe | Background |
|---|---|---|
| Dark | Cyberpunk deep blue | `#0a0a1a` |
| Light | Clean professional | `#f8fafc` |
| Neon | Synthwave purple | `#050510` |
| Chrome | Metallic silver | `#e8e8ec` |
| Hologram | Iridescent rainbow | `#0a0015` |

### Bilingual AR/EN

- Full RTL support via `dir="rtl"` on `<html>`
- Arabic typography via Cairo font family
- All text managed through `data-i18n` attributes

### Visual Effects

- **Three.js**: 8 wireframe icosahedra + 600 particles with mouse parallax
- **Generative art**: 80 connected dots with seeded random (unique per visitor)
- **Testimonial carousel**: Auto-rotate every 5s, pause on hover, prev/next + dots
- **Project cards**: Gradient backgrounds per category + shine hover effect
- **Intro animation**: Name fades in on first load, removes itself from DOM

### Responsive Design

| Breakpoint | Devices |
|---|---|
| ≤1024px | iPad landscape, small laptops |
| ≤820px | iPad mini portrait, large phones |
| ≤480px | Regular phones |
| ≤375px | iPhone SE, tiny Androids |

- Uses `clamp()`, `dvh`, `env(safe-area-inset-bottom)` for all phones
- Touch-first interactions with `(pointer: coarse)` queries
- `-webkit-tap-highlight-color` removal for better tap UX

---

## 🔒 Security Hardening

This portfolio treats security as a **first-class feature**, not an afterthought.

### What I Fixed

| Vulnerability | Severity | Location | Fix |
|---|---|---|---|
| XSS via `innerHTML` with user text | **Critical** | `Chatbot.js:81` | → `textContent + createElement` |
| No Content Security Policy | **Critical** | index.html | → CSP in `_headers` restricting all sources |
| No HSTS / HTTPS enforcement | **High** | — | → `Strict-Transport-Security: max-age=31536000; preload` |
| No X-Frame-Options | **High** | — | → `DENY` (prevents clickjacking) |
| No Rate Limiting on form | **High** | `Contact.js` | → 30s rate limit via localStorage |
| No Input Validation | **Medium** | Contact form | → Honeypot + regex email + length checks |
| No Referrer Policy | **Medium** | — | → `strict-origin-when-cross-origin` |
| No Permissions Policy | **Medium** | — | → `camera=(), microphone=(), geolocation=()` |
| GitHub API data not sanitized | **Medium** | `GitHubStats.js` | → `encodeURI` + type validation |
| Build signature in HTML | **Low** | index.html | → Removed |
| No `security.txt` | **Low** | — | → Added `/.well-known/security.txt` |
| No Subresource Integrity | **Low** | — | → Vite SRI plugin injects `integrity` + `crossorigin` |
| Source maps in production | **Low** | `vite.config.js` | → `sourcemap: false` |
| npm vulnerabilities | **High** | protobufjs deps | → `npm audit fix --force` (4 → 0) |

### HTTP Headers (`public/_headers`)

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), ...
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
```

### CSP Breakdown

```
default-src 'self';
script-src 'self';                              # No inline scripts = no XSS
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https://avatars.githubusercontent.com;
connect-src 'self' https://api.github.com https://formspree.io https://huggingface.co;
worker-src 'self' blob:;
frame-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self' https://formspree.io;
```

### Contact Form Defenses

```
┌────────────────────────────────────────────┐
│  Honeypot (hidden input "website")         │
│  → Bots auto-fill → silently rejected      │
├────────────────────────────────────────────┤
│  Rate Limit (30s between submissions)      │
│  → localStorage timestamp check            │
├────────────────────────────────────────────┤
│  Validation                                │
│  → Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/│
│  → Name: 2-100 chars                       │
│  → Message: 10-5000 chars                  │
├────────────────────────────────────────────┤
│  Formspree Ready (configure endpoint)       │
│  → Falls back to simulated send            │
└────────────────────────────────────────────┘
```

---

## ⚡ Performance Metrics

| Metric | Before Optimization | After |
|---|---|---|
| **Main JS bundle** | 495 kB | **45.3 kB** (91% smaller) |
| **CSS bundle** | 29.3 kB | **36.3 kB** (includes blog + carousel) |
| **Build time** | ~2.8s | **~2.5s** |
| **Three.js** | Inlined | **466 kB (lazy on desktop)** |
| **Transformers** | Inlined | **509 kB (lazy in Worker)** |
| **npm vulns** | 4 (1 critical) | **0** |

### Optimization Techniques

- `requestAnimationFrame` throttling on all scroll handlers
- `content-visibility: auto` + `contain-intrinsic-size` on every section
- `will-change: transform` on animated cards
- Code splitting: vendor chunk (Three.js) separated from main
- Event delegation instead of per-element listeners
- `data-*` attributes instead of inline `style` mutations
- Dynamic `import()` for heavy modules
- CSS `contain: layout style paint` on navbar
- Lazy Worker initialization (first chat open only)

---

## 🚀 Get Started

```bash
# Clone
git clone https://github.com/jackghay/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

### Before Deploying

1. **Formspree**: Replace `FORMSPREE_URL` in `src/sections/Contact.js:3` with your endpoint
2. **CV**: Replace `public/cv-placeholder.html` with `public/cv.pdf` and update links in `index.html`
3. **Plausible**: Uncomment the script in `index.html` and set your domain
4. **OG Image**: Add `public/og-image.png` (1200×630, replace URL in `<meta>` tags)

---

## 🌐 Deployment

| Platform | Config |
|---|---|
| **Netlify** | `public/_headers` works automatically |
| **Vercel** | Convert `_headers` to `vercel.json` at root |
| **Cloudflare Pages** | Copy headers to `_headers` or dashboard |
| **GitHub Pages** | Use GitHub Actions or `gh-pages` branch |

All platforms support the `_headers` file for security headers.

---

## 💭 The Thinking Process

### Why no framework?

I chose **Vanilla JS + Vite** over React/Next.js intentionally. This portfolio is a **craft project**. Every line is intentional. No virtual DOM diffing overhead. No hydration mismatches. No build-time framework lock-in. Just clean, modular ESM architecture.

### Why a Web Worker for AI?

The chatbot had to run **entirely client-side** — no server, no API keys, no monthly fees. Transformers.js runs in a Web Worker to keep the main thread responsive. The Worker validates every `postMessage` channel, preventing injection attacks.

### Why 5 themes?

A theme toggle shows **attention to UX detail**. Each theme is a complete color system via CSS custom properties — not just light/dark. Chrome and Hologram were experiments in material and iridescent design.

### Why security-first?

Most developer portfolios have zero security. I wanted mine to demonstrate enterprise-level practices. CSP, HSTS, SRI, XSS-free render, Honeypot, Rate limiting — this isn't a feature list, it's a **philosophy**.

### Why `data.js` as SSOT?

All content lives in one file. Projects, skills, experience, testimonials, blog posts — everything. The chatbot reads the same data. The timeline renders the same experience. **One source of truth, zero duplication.**

### Code review as a feature

I went back through every file and:
- Removed dead code (unused `state.js`, orphan variables)
- Fixed every `innerHTML` → `textContent` for XSS prevention
- Added RAF throttling to every scroll listener
- Replaced inline styles with CSS `data-*` attributes
- Fixed the i18n double-call bug

Every improvement is documented in commit history.

---

## 📚 What I Learned

1. **Security is not a feature, it's a constraint.** CSP forced me to eliminate inline scripts. Honeypot forced me to think about bots. These constraints made the code better.

2. **`textContent` over `innerHTML` always.** There is no case where `innerHTML` is better when rendering user data. The 3ms difference is not worth the XSS risk.

3. **CSS custom properties are powerful enough for theming.** 5 complete themes with zero CSS duplication. No Tailwind, no styled-components, no CSS-in-JS.

4. **Vite 6 is a beast.** 2.5s build for a 15kB-ish app with automatic code splitting and SRI.

5. **Transformers.js with WebGPU is production-ready.** The model loads once and runs at native speed in a Worker. No server costs, no data leaves the browser.

6. **The best code is the code you don't write.** Every unused function I removed, every unnecessary listener I deleted, made the code faster and more maintainable.

---

## 📄 License

MIT — Use freely. Built by [Amine Nasser Allah](https://github.com/jackghay).

---

<p align="center">
  <sub>Built with ❤️ and 🧠 — not templates, not AI slop, not copy-paste.</sub>
</p>
