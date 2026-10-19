# Pip's Dreamland

A playful single-page portfolio experience for Pip, a junior dream engineer who builds cozy dreams at the Midnight Nursery.

## Features

- Sticky retro-inspired navigation with mobile menu
- Mint retro-web hero with framed Pip art, floating dialogue, pixel-style decorations, and accessible moon secret
- Interactive wake/sleep toggle, live dream counter, and responsive nursery status panel
- About Pip profile with rotating character dialogue, an interactive portrait fact, and four mood settings
- Personality scanner with a brief scan animation, randomized classifications, and repeat scans
- Mood-reactive Energy, Imagination, and Dream Power meters with accessible progress values
- Six imaginative project demos:
  - Lullaby Lab
  - Nightlight Collection
  - Dream Delivery Routes
  - Rattle & Block Toys
  - Bedtime Storybook
  - Pip's Growth Chart
- Pip's Midnight Workshop with a local story-based dream generator, selectable dream ingredients, magic buttons, an on-demand star-catching game, and an interactive dream machine
- Five-chapter branching storybook with keyboard-accessible chapter selection, collectible stars, and a local browser bookmark
- Keepsake guestbook with inline validation, safe text-only rendering, localStorage persistence, individual deletion, and a 50-note limit
- Footer with visitor counter, random messages, and a secret reveal

## Run locally

Open `index.html` directly in a browser, or run a simple local server:

```bash
cd "C:\Users\hp\Documents\Hexbabyhackathon"
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to Vercel

This is a static HTML, CSS, and JavaScript site. It has no build step, backend, or required environment variables.

### Deploy from Git

1. Push the project files to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository in Vercel.
3. Use the project root as the root directory and select **Other** as the framework preset if prompted.
4. Deploy with the included `vercel.json`; it serves the project-root files as-is without installing packages or running a build.

### Deploy with the Vercel CLI

From the project directory, run `npx vercel` and follow the prompts. To publish to production, run `npx vercel --prod`.

## Files

- `index.html` — page structure and section content
- `style.css` — theme, layout, responsive design, and animations
- `script.js` — interactive logic, state handling, and localStorage behavior
- `vercel.json` — serves this static site from the project root without a build step

## Judging checklist

- Functionality: all interactive controls work and localStorage persists guestbook entries
- Theme commitment: pastel, chaotic, baby-inspired, and character-driven design
- Creativity and novelty: dream machine, storybook, star game, and secret surprise
- Technical execution: responsive layout, accessible labels, reduced-motion support, and safe input handling
