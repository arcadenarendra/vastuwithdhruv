# vastu-with-dhruv

Marketing site for Dhruv Dave's Vastu consulting practice (Ahmedabad). React + Vite + Tailwind CSS v4.

## Commands

```bash
pnpm install     # install dependencies
pnpm dev         # dev server on $PORT (default 8443)
pnpm build       # typecheck, then production build to dist/
pnpm preview     # serve the production build
pnpm typecheck   # tsc --noEmit
pnpm format      # oxfmt
```

## Project structure

- `src/main.tsx` — entrypoint; imports `src/index.css`, mounts `src/App.tsx`
- `src/App.tsx` — router, layout shell, and the 404 route. Every page is `lazy()`-loaded
- `src/index.css` — global CSS entrypoint, Tailwind v4 import, `@theme` design tokens, shared utility classes
- `src/pages/` — one file per route. `legal/` holds the three policy pages
- `src/components/` — shared UI. `PageHero` and `SectionHeading` replace the per-page hero markup
- `src/data/` — content: site config, services, directions, FAQs
- `src/lib/` — non-React logic: `motion.ts` (shared variants), `validation.ts`, `submitEnquiry.ts`
- `public/favicon.svg` — the mark used in the browser tab
- `index.html` — document shell; the `<title>` and meta tags are edited here directly

## Routing

`/` · `/about` · `/services` · `/services/:slug` · `/science-of-vastu` · `/success-stories` ·
`/appointment` · `/contact` · `/privacy-policy` · `/terms` · `/refund-policy`

Adding a page: create it in `src/pages/`, `lazy()` it in `src/App.tsx`, add a `<Route>`.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite`. No config file and no PostCSS config — theme
customization lives in the `@theme` block in `src/index.css`.

Use the token names rather than raw hex, so the palette stays in one place:

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#0F172A` | Dark sections, body text on light |
| `navy-soft` | `#1B2537` | Raised surfaces on dark |
| `gold` | `#D4AF37` | Accent, CTAs, rules |
| `gold-light` | `#E8CC6A` | Gold hover state |
| `ivory` | `#FDFBF7` | Light section background |
| `stone` | `#F5F0E8` | Alternating section background |
| `muted` | `#8B7D6B` | Body copy on light |
| `muted-dark` | `#5C5248` | Emphasised body copy |

Fonts are set through `fontFamily` on `@theme`: `--font-serif` (Playfair Display, headings),
`--font-display` (Cinzel, wordmark), `--font-sans` (Lato, everything else). Reach them with
`style={{ fontFamily: 'var(--font-serif)' }}` or the `font-serif` / `font-display` utilities.

Shared utility classes in `index.css`: `.section-label` (gold uppercase eyebrow),
`.gold-divider` (60px rule), `.link-underline` (animated underline), `.grid-texture` (hairline
grid for dark sections), and the `shimmer` keyframe.

## Motion

`src/lib/motion.ts` holds the shared variants (`fadeUp`, `fadeIn`, `staggerParent`,
`staggerChild`) and the `easeOutQuint` curve. `ScrollReveal` wraps any element to fade and
slide it in on first scroll into view.

Rules that matter here:

- Honour `useReducedMotion()` for anything looping or large. `ScrollReveal` already does.
- Add `aria-*` to every interaction. The accordions, tabs, and the direction compass are all
  keyboard-operable — keep it that way when editing them.
- Animate `transform` and `opacity` only, so nothing triggers layout.

## Forms

Both forms (`/contact` and `/appointment`) are built on `src/components/EnquiryForm.tsx`, which
validates via `src/lib/validation.ts` and hands off to `src/lib/submitEnquiry.ts`.

**There is no backend.** `submitEnquiry.ts` opens the visitor's mail client with the enquiry
pre-filled. To move to a real endpoint, replace the body of `deliver` in that one file — the
loading, error, and success states already key off the promise it returns.

## Content

All copy lives in `src/data/` and inline in the page components. `siteConfig.ts` is the single
source for contact details, navigation, and the service list — the header dropdown, footer,
contact form, and services page all read from it, so adding a service means editing that one
array plus `src/data/services.ts`.

The testimonials page deliberately shows shimmer placeholders. `src/data/testimonials.ts` is
empty on purpose — only publish reviews that are verified.