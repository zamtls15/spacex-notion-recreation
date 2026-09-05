# SPACEX — Private Access Program

A responsive React recreation of the provided SPACEX Notion page, designed as a quiet editorial document with Notion-style navigation, access-tier blocks, custom aerospace visuals, and persistent light/dark themes.

## Features

The site includes a responsive document shell, sticky desktop outline navigation, a mobile navigation drawer, smooth in-page section links, light/dark theme persistence through local storage, tiered access cards, credential details, accessible focus states, reduced-motion support, and a transparent verified-feedback placeholder rather than unverified testimonials.

## Development

Install dependencies with `pnpm install`, then run `pnpm dev` to start the Vite development server. Use `pnpm check` for TypeScript validation and `pnpm build` for the production build.

## Project structure

Application code lives under `client/src`, with the page in `client/src/pages/Home.tsx`, global design tokens and responsive styling in `client/src/index.css`, and the top-level entry in `client/src/App.tsx`. Generated visual assets are stored in `client/public/assets/` so the repository can serve them directly.

## GitHub Pages

The production site is published from the `gh-pages` branch. The Vite base path is configured for `https://zamtls15.github.io/spacex-notion-recreation/` when the build runs with `GITHUB_ACTIONS=true`.

All generated visual assets are stored in `client/public/assets/` and are referenced through `import.meta.env.BASE_URL`, so they work both locally and from the repository Pages subpath.

## Notes

This is a frontend-only static recreation. The private briefing CTA and search overlay are intentionally presented as interaction-ready static placeholders until a real form endpoint or search index is connected.
