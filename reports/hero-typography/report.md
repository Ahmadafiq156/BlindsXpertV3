# Hero description removal and shared H1 typography

Modified: `index.html` and `assets/css/site.css`. Audit files added under `reports/hero-typography/`.

Removed only the homepage hero description paragraph. The existing H1, eyebrow, two CTA labels/links, three photographs, slideshow JavaScript, navigation and hero heights are preserved. The H1-to-CTA spacing is 20px; no empty paragraph remains.

Shared rule: `.page-hero .page-hero-copy h1`, using weight 700, the existing heading font, balanced wrapping and a 24ch maximum width. CSS variables supply the exact former homepage settings:

| Viewport | Font size | Line height |
| --- | --- | --- |
| Above 760px | clamp(30px, 3.5vw, 48px) | 1.18 |
| Up to 760px | clamp(24px, 6vw, 30px) | 1.2 |

Examples: desktop 1440/1920px = 48px; tablet 768px = 30px and 1024px = 35.84px; mobile 320–390px = 24px and 430px = 25.8px. The homepage H1 size itself is unchanged. H2/H3 and headings outside hero sections are excluded.

Checked Home, Products, Projects, Services, About, Gallery, Promotions, FAQs, Contact, Careers, Quote, 404, Delivery Policy, Return Policy and Term of Payment at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: 150 page/width checks passed for exact font size/weight/line height, wrapping, clipping and horizontal overflow. Product Details has no page-hero section; its product/picker headings are intentionally unchanged. All existing page H1 text, images, overlays, backgrounds and heights are preserved. No JavaScript errors were recorded.

Homepage tests also verify no description paragraph, unchanged H1, all three slides, CTA links, previous/next arrows, autoplay, keyboard arrows and mobile swipe. See the existing `reports/homepage-hero/test-results.json` and updated hero screenshots for the slideshow checks; `test-results.json` in this folder records the typography results. Syntax/whitespace checks pass. No unresolved issues. No staging, commit, push or deployment.
