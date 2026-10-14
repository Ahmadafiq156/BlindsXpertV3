# Homepage hero slideshow replacement

Completed locally on 14 October 2026. Three supplied photographs replace the three active hero slides, in filename order.

| Order | Original filename | Original size | 1280px WebP | 1672px WebP |
| --- | --- | ---: | ---: | ---: |
| 1 | `Golden Hour Modern Terrace Retreat.png` | 2,320,844 bytes | 143,550 bytes | 210,028 bytes |
| 2 | `Golden-Hour Modern Patio Retreat.png` | 2,541,961 bytes | 166,986 bytes | 248,164 bytes |
| 3 | `Sunlit Living Room with City Views.png` | 2,241,511 bytes | 135,032 bytes | 190,240 bytes |

All originals are 1672 × 941px. Exact PNG copies are preserved under `assets/img/homepage/hero/originals/`; uploaded source files remain unchanged. Optimized versions live directly under the existing `assets/img/homepage/hero/` folder with the original stems and width suffixes. Pillow encoded WebP at quality 84; 1280px versions use proportional Lanczos resizing. The full-width version preserves original pixel dimensions; no source cropping, stretching, generated background or text overlay is applied to any image file. The three 1672px WebPs total 648,432 bytes versus 7,104,316 original bytes (90.9% smaller).

Modified files: `index.html`, `assets/css/site.css`, `assets/js/site.js`. Added six WebP variants, three preserved originals and audit files under `reports/homepage-hero/`. Old assets remain preserved on disk but have no active hero references. Other page/section images and earlier local integrations are unchanged.

The existing title, description and two CTA labels/links are preserved. The hero uses cover-fit images with per-slide desktop/mobile object positions. Portrait crops prioritize outdoor shades and zebra blinds over sky/scenery. Copy sits lower, away from the upper installation details, with a homepage-only bottom gradient and subtle text shadow. Existing hero heights remain unchanged. Mobile buttons use compact sizing to fit side by side where possible and naturally wrap on narrow screens. Arrow controls and keyboard focus visibility remain intact. No slideshow dots are present.

The first image has responsive srcset, fixed intrinsic dimensions, async decoding and high fetch priority. The other two defer their image URLs until selected by autoplay or navigation. The current photo stays visible until the chosen image decodes; a request token prevents stale loads overriding later navigation. The timer stays at 2800ms and the original 1.2-second fade, hover/focus/visibility pauses, reduced-motion handling, arrow keys and touch-swipe logic remain. Only the first hero image was requested initially during the browser test; subsequent variants are loaded as needed. No full-resolution PNG is requested by the slideshow.

Testing passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px, checking all three ordered slides at each width. No horizontal overflow, failed local image paths or JavaScript exceptions. Images fill the hero with cover fit; copy and buttons fit within the hero. Desktop (1440px), tablet (768px) and mobile (390px) screenshots for all three slides were captured and reviewed. Autoplay, previous/next arrows, keyboard arrows, mobile arrow taps and horizontal touch-event swipe passed. The unchanged CTA links resolve to existing products.html and quote.html. Original PNG copies match uploaded hashes. `node --check assets/js/site.js` and `git diff --check` pass.

Issues addressed: the source markup still contained legacy dots, which were removed to keep the requested dot-free layout. The generic container’s auto vertical margins initially kept copy centred despite lower alignment; a homepage-only margin override fixes its position. No unresolved broken media or functional issues remain. Cover-fit on portrait screens necessarily crops lateral scenery; positions retain the main blinds. No staging, commit, push or deployment.
