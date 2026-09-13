# Sisay Tadewos — Portfolio

Next.js 14 + TypeScript + Tailwind CSS. Content-driven: almost everything you'll
want to change lives in `lib/data.ts`, not in the components.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. (Build requires internet access once, to fetch
Space Grotesk / IBM Plex Sans / IBM Plex Mono from Google Fonts — this is
normal on any machine with a network connection, including Vercel.)

## Deploy

Push to a GitHub repo and import it on [vercel.com](https://vercel.com) —
zero config needed, it's a standard Next.js app.

## Editing content

Everything factual lives in `lib/data.ts`:

- `projects` — the three case studies. Each has `sections` (overview, problem,
  solution, role, challenges, decisions, results), `metrics`, `stack`, and
  `architecture` (rendered as the flow diagram on the case study page).
- `experience` — the timeline on the homepage.
- `stack` — the grouped technology list.
- `contact` — email, phone, LinkedIn, GitHub, location.
- `telegramChannel` / `blogHighlights` — see below.

Anything marked with a `[placeholder]` in brackets (demo URLs, GitHub links,
the Telegram handle) is intentionally left for you to fill in rather than
invented — search the file for `[Add` and `[add_` to find them all.

## Connecting the blog to Telegram

The blog page (`/blog`) is built around a **public** Telegram channel:

1. Create (or use) a public Telegram channel and note its username — the
   part after `t.me/`, e.g. `t.me/sisay_builds` → `sisay_builds`.
2. In `lib/data.ts`, set:
   ```ts
   export const telegramChannel = {
     handle: "sisay_builds",
     displayName: "@sisay_builds",
   };
   ```
3. The "Live from Telegram" panel embeds `https://t.me/s/<handle>` in an
   iframe — this is Telegram's public web preview, so new posts appear with
   **no rebuild or redeploy needed**.
4. Optionally, add hand-picked posts to `blogHighlights` for a curated,
   better-designed summary above the live feed — each entry links back to
   its original Telegram post and has its own "Share" / "Copy link" row.

No bot token or Telegram API access is required for this setup, since the
channel is public. If you'd rather pull posts server-side (e.g. to filter or
cache them), that would use the Telegram Bot API's `getUpdates` /
channel-post webhook instead — a reasonable next step but not required for
the current design.

## Extra features

- **Custom cursor** (`components/CustomCursor.tsx`) — desktop-only, disabled
  automatically on touch devices and when the visitor prefers reduced motion.
  Add `data-cursor="link" | "project" | "expand" | "drag"` to any element to
  change how the cursor reacts to it (see existing usage in `WorkLog.tsx` and
  `ArchitectureFlow.tsx` for examples), plus an optional
  `data-cursor-label="View"` for the project-hover label.
- **Platform / tech icons** (`lib/icons.tsx`) — official brand icons via
  `react-icons`. Add an entry to `techIconMap` to give any stack item in
  `lib/data.ts` an icon; anything not listed renders as a plain text badge
  (no emoji fallback, by design).
- **Interactive architecture diagrams** — each case study's flow diagram
  (`components/ArchitectureFlow.tsx`) is tap-to-expand; edit a layer's
  `detail` string in `lib/data.ts` to change what it reveals.
- **GitHub section** (`components/GithubSection.tsx`) — set
  `contact.githubUsername` in `lib/data.ts` to enable the link and a live
  contribution graph (via the public `ghchart.rshah.org` image endpoint — no
  API key needed).
- **Scroll reveal** (`components/Reveal.tsx`) — visible by default with no
  JS; only animates for visitors who don't prefer reduced motion.
- **`/play`** — the experimental, non-professional page. A canvas-based
  interactive image: drag to warp it, swipe hard to "tear" it. Fully
  isolated and lazy-loaded (`next/dynamic`, `ssr: false`), so it adds zero
  weight to every other page. It currently loads your photo from
  `profileImageUrl` in `lib/data.ts` (a hosted Cloudinary URL) — point that
  at a different hosted URL any time, or switch it to `/images/profile.jpg`
  if you'd rather self-host the file under `public/images/`. Either way, if
  it ever fails to load it falls back to an abstract placeholder graphic
  (never a fake stock portrait). There's also a small,
  intentionally low-contrast link to it in the footer, a console message for
  anyone poking at devtools, and typing "play" anywhere on the site jumps
  straight there (`components/EasterEggs.tsx`).

## Structure

```
app/
  page.tsx                  Homepage (hero, work, philosophy, experience, stack, about)
  projects/[slug]/page.tsx  Case study template — one per project in lib/data.ts
  blog/page.tsx             Blog / Telegram feed
  play/page.tsx             Experimental /play easter-egg page
components/
  WorkLog.tsx               Expandable "Selected work" rows
  ArchitectureFlow.tsx      Interactive, expandable system-flow diagram
  TelegramEmbed.tsx         Live channel iframe
  ShareRow.tsx              Share / copy-link controls for blog highlights
  CustomCursor.tsx          Desktop custom pointer
  GithubSection.tsx         GitHub link + contribution graph
  Reveal.tsx                Scroll-reveal wrapper
  TearPlayground.tsx        Canvas warp/tear interaction (used by /play)
  SiteHeader.tsx / SiteFooter.tsx
lib/
  data.ts                   All content — the single source of truth
  icons.tsx                 Tech-stack / platform icon map
public/images/
  profile-placeholder.svg   fallback shown if profileImageUrl fails to load
```
