# Urban Grunge: High-Fidelity Developer Portfolio

![Project Screenshot](#) <!-- Replace with your actual screenshot -->

A high-contrast, dark-mode digital space designed for developers and creators who thrive in emotional world-building. This template blends an "Urban Grunge" aesthetic with "Anime-Realistic" visual fidelity, built for performance and deep customization.

## 🌑 The Aesthetic: "Calm but Dangerous"
This portfolio isn't just a site; it's an atmosphere. 
- **Typography**: Intentional pairing of high-impact display fonts and clean geometric sans-serifs.
- **Atmosphere**: Distress textures, halftone overlays, and digital grain to simulate a physical, weathered interface.
- **Interactions**: Staggered scroll reveals, custom matrix backgrounds, and fluid Framer Motion transitions.

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Animations**: `motion` (formerly framer-motion) for high-frequency interactions
- **Integrations**: AniList GraphQL API for real-time activity tracking

## 🚀 Quick Start

### 1. Fork and Clone
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development
```bash
npm run dev
```

## ⚙️ Customization Guide

The site is designed to be updated in one place. Open `src/config.ts` to change:

| Parameter | Description |
| :--- | :--- |
| `name` | Your global brand/gamertag |
| `username` | Your handle for API integrations (AniList, etc) |
| `hero.bio` | Your professional philosophy / introduction |
| `socials` | Links to GitHub, YouTube, and socials |
| `skills` | Array of core competencies (toggles for Gold/Active states) |

### Visuals
- **Backgrounds**: Adjust global grain and noise in `src/index.css` under `.grunge-bg`.
- **Colors**: Update the design system palette in the `@theme` block of `src/index.css`.

## 📄 License
MIT License. Feel free to use this as a base for your own digital home.
