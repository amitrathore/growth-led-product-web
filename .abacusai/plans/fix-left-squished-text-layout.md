## Context

The page appears left-aligned and cramped when styles fail to load in certain hosting modes. The layout markup already uses the expected centering classes (`max-w-6xl mx-auto px-6`, `max-w-4xl mx-auto px-6`, `text-center`) across sections, so the issue is likely asset URL resolution rather than section structure.

In `next.config.ts`, `basePath` defaults to `/growth-led-product-web` and `assetPrefix` mirrors it. This is correct for GitHub Project Pages, but CSS links can break when the static export is opened directly or served from root (`/`) without an explicit base-path override.

Intended outcome: preserve GitHub Pages compatibility and ensure root/local hosting mode loads CSS correctly so centered spacing remains intact.

## Recommended Approach

1. Update base-path normalization in `next.config.ts`.
   - Read `NEXT_PUBLIC_BASE_PATH` as raw env input.
   - Normalize values:
     - empty string or `/` => root mode (`""`)
     - non-empty path => ensure leading slash and remove trailing slash
   - Apply config conditionally:
     - set `basePath` only when normalized value is non-empty
     - set `assetPrefix` only when normalized value is non-empty

2. Keep the existing default deploy behavior.
   - If env var is unset, continue defaulting to `/growth-led-product-web` for standard GitHub Project Pages deployment.

3. Leave section component layout markup unchanged.
   - Existing container utilities are already correct and should be reused as-is.

## Critical File To Modify

- `next.config.ts`

## Existing Utilities/Patterns To Reuse

- `src/components/Nav.tsx`
- `src/components/Hero.tsx`
- `src/components/BookSection.tsx`
- `src/components/WhyNow.tsx`
- Section composition in `src/app/page.tsx`

## Verification

1. Run lint:
   - `npm run lint`

2. Build in default project-page mode:
   - `npm run build`
   - Verify exported asset links include `/growth-led-product-web/_next/...`

3. Build in root/local mode:
   - `NEXT_PUBLIC_BASE_PATH='' npm run build`
   - Verify exported asset links resolve from root and do not include `/growth-led-product-web/...`

4. Serve export and validate visual behavior:
   - Content remains centered with proper breathing room
   - No left-squished fallback appearance

5. Browser network sanity check:
   - Main CSS bundle returns 200 in both modes
