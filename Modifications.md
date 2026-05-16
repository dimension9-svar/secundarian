# Modifications

Running log of changes to the Secundarian landing page.

## Pending

_None — round 1 closed off._

## In progress

_None._

## Done

### Round 1 — closed 2026-05-16 (commit `d9c4429`)

1. **Hero — viewport sizing & mobile responsiveness.** Clamped H1 across breakpoints (was overflowing at 100% zoom), switched min-height to `100svh` on mobile, restored top padding to clear the nav, tightened the grid columns and image max-width on `md` so both columns sit comfortably without zoom-out. CTAs now stack on `xs`.
2. **Hero subtitle copy.** Replaced with: _"Where industrial heritage meets modern craftsmanship. Every stitch, every seam, every detail is purpose-built for those who demand more from their workwear."_
3. **Origin Story — new copy.** Section title now reads _"From the Stage to the Shift"_, body rewritten to the Wayne-Stuart-from-Secunda paragraph + identity-into-inspiration follow-up.
4. **Navbar — logo size & padding.** Logo bumped to 240×44, toolbar min-height 80 (desktop) / 64 (mobile), container padding increased, AppBar vertical padding increased.
5. **Origin Story — stats card replaced with product image placeholder.** Stats block + quote removed; right column is now a 4:5 dark placeholder card labelled "Product image · Placeholder" ready to drop product photography into.
6. **Collections — "Engineered for every demand" stronger.** Promoted from body copy to a Bebas-display line at 1.5–2rem, uppercase, full letter-spacing.
7. **Collections — keep subheadings, remove subtext, images only.** Cards are now image + Title + product-line subhead only:
   - Foundation → Oversized Tee
   - Forge → Shirts
   - Meridian → Cargo Pants
   - Sable → Beanies
8. **Our Journey — new section copy.** Subhead now reads: _"From comedy stages to cooling towers — how a hometown identity became a brand shaped by the road and sharpened by friendship."_
9. **Timeline — new milestone copy.**
   - 2021 retitled **"The Beginning"** with the small-but-authentic-tees paragraph.
   - 2023 **"The Range Grows"** updated to the bucket-hats → trucker-caps momentum line.
   - 2025 updated to the Mother City conversation + "fashion meets workwear, not PPE" quote.
   - 2026 updated to the cooling-towers logo / fashion-forward workwear relaunch paragraph.
10. **Timeline — reveal on scroll, not click.** Removed click-to-expand interaction. Each milestone now uses framer-motion `useInView` to fade/slide in once as it enters the viewport. Descriptions are always visible.
11. **Timeline — scroller redesigned.** Replaced the fake-button progress strip with a real centre rail and an animated fill bar driven by `useScroll` / `useTransform` — the rail fills as you scroll through the section. Layout is alternating left/right on desktop, single-column on mobile.
12. **Our Principles — removed.** Section unmounted from `page.tsx`; `SecundarianValues.tsx` deleted from the repo.
13. **Stay Connected — dark layout.** CTA now sits on `#0D0D0D` with a warm radial accent + scanline texture; inputs, copy and helper text recoloured for the dark surface; submit button keeps the brand contrast.
14. **Footer — Secundarian wordmark font.** Switched the footer wordmark from Playfair Display to Bebas Neue (`var(--font-bebas)`) to match the H1/H2 system used everywhere else.

**Deployment:** auto-deployed via Vercel on push to `master`.
