# Dhanvis Elevators website

Next.js 16 · React 19 · Tailwind CSS 4 · Motion · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All business content lives in **`src/lib/site.ts`**: phone, address, Instagram, lift types, services, process,
safety features, FAQs, gallery captions and headline stats. Items marked `CONFIRM` should be checked with the client.

Photos are in `src/assets/` and mapped in `src/lib/images.ts`.

## Showreel video

The showreel plays as a cinematic photo story by default. To add real footage, either:

- put an MP4 in `public/videos/` and set `showreel.videoSrc` (e.g. `"/videos/showreel.mp4"`), or
- set `showreel.youtubeId` to a YouTube video id.

A "Watch the full film" button then appears and opens the video in a full-screen player.

## Concept

Every section is a "floor" (G → 10). The fixed floor indicator, modelled on Dhanvis's own red seven-segment
displays, tracks where you are and lets visitors ride between sections. Floors are defined in `floors` in `site.ts`.
