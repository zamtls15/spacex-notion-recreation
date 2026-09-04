# Design Direction: Ground-Truth Notion Recreation

This project reproduces the user-provided SPACEX Notion page at https://spacexhq.notion.site/SPACEX-2680eb1ba7be80bfa594fb87e23055ed. The reference page is the ground-truth spec; fidelity to its Notion-style reading experience takes priority over introducing a separate marketing-site aesthetic.

## Reference Spec

The page is a long-form, editorial Notion document with a wide cover image, small page icon, a large `SPACEX` page title, a concise introductory callout, tiered access-plan sections, embedded visual assets, inclusion lists, a rationale section, and customer-thoughts content. It uses Notion's quiet gray/white workspace palette, narrow readable text measure, generous vertical rhythm, understated borders, small monochrome utility controls, and responsive single-column behavior.

## Design Movement

Digital editorial minimalism shaped by Notion's block-based productivity UI: calm, functional, content-first, with visual emphasis coming from hierarchy, spacing, and carefully selected editorial imagery rather than decoration.

## Core Principles

1. **Document first.** The page should read like a premium internal brief, not a generic landing page.
2. **Quiet hierarchy.** Use weight, size, inline labels, and Notion-like blocks to establish structure without heavy chrome.
3. **Tactile restraint.** Keep borders, radii, shadows, and colors subtle; allow imagery and content to carry emphasis.
4. **Responsive continuity.** Preserve the same reading flow on mobile, converting utility/navigation elements into compact controls rather than hiding content.

## Color Philosophy

Light mode uses warm paper white and graphite text with Notion-like gray surfaces, while the signature accent is a muted aerospace orange used sparingly for tags, the active theme state, and key affordances. Dark mode inverts the same material logic into near-black graphite, soft gray text, and a slightly brighter burnt orange so contrast remains comfortable without becoming neon.

## Layout Paradigm

An asymmetric document shell: a compact utility rail and sticky reading outline sit outside a centered narrow content column on large screens; on smaller screens the rail collapses into a top bar and the outline becomes a horizontal scroll strip. Content blocks alternate between prose, callouts, embedded visual cards, and checklist rows.

## Signature Elements

- A thin aerospace-orange index rule that marks each access tier and anchors the document's hierarchy.
- Notion-inspired soft callout panels with an icon tile, very light surface tint, and no excessive rounding.
- A small floating theme control that echoes Notion's unobtrusive page utilities.

## Interaction Philosophy

Interactions should feel direct and low-friction: theme switching is immediate and persists locally; outline links scroll to sections; tier cards gently lift on hover; buttons expose their purpose through clear labels and focus states. Avoid ornamental animation that competes with reading.

## Animation

Use fast, quiet transitions under 220ms for hover, buttons, and theme changes. Reveal the main document with a restrained fade-and-rise on first load, then keep scrolling static. Respect `prefers-reduced-motion`; no motion is essential to understanding the page.

## Typography System

Use `Space Grotesk` for display headings and labels to give the page an aerospace/editorial edge, paired with `DM Sans` for body copy and UI text. H1 is compact and bold, H2 is strong but not oversized, H3 is used for metadata and inclusion groupings, and body copy stays at a comfortable 15–16px with 1.7 line height.

## Brand Essence

A curated access program for serious builders and decision-makers who value high-trust proximity over surface-level networking. Personality: **selective, composed, exacting**.

## Brand Voice

Headlines are declarative and specific; CTAs are calm and action-oriented; microcopy sounds like a private briefing rather than a sales funnel.

- Example headline: “Access is structured. The opportunity is not.”
- Example CTA: “Request a private briefing”

## Wordmark & Logo

Use a compact geometric orbital mark: a rounded-square frame with an offset launch trajectory cut through it. It appears as a standalone symbol, not the word SPACEX, so it can sit beside the page title and in the browser favicon without feeling like default text.

## Signature Brand Color

**Launch Orange `#F0783C`** — warm, precise, and recognizable against Notion's neutral paper surfaces without turning the interface into a high-saturation tech theme.

## Style Decisions

- Preserve the Notion-like quiet visual language even when adding polish.
- Prefer content-rich editorial blocks over generic hero/feature grids.
- Keep dark mode material and legible, with Launch Orange as a restrained accent only.
