# BlindsXpertV3 website maintenance

This guide describes the current static website implementation. It is for developers maintaining the site source; it is not a staff CMS or admin interface.

## 1. Project map

```text
BlindsXpertV3/
â”œâ”€â”€ index.html, about.html, contact.html, gallery.html, product-details.html
â”œâ”€â”€ products.html, projects.html, quote.html, services.html, 404.html
â”œâ”€â”€ careers.html, promotions.html, faqs.html
â”œâ”€â”€ return-policy.html, delivery-policy.html, term-of-payment.html
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ css/                 shared and Product Details styles
â”‚   â”œâ”€â”€ data/                product catalogue data
â”‚   â”œâ”€â”€ img/                 grouped photographs, catalogue and UI images
â”‚   â”œâ”€â”€ js/                  shared and page-specific behavior
â”‚   â””â”€â”€ video/               homepage and motorized product videos
â”œâ”€â”€ sitemap.xml
â”œâ”€â”€ robots.txt
â”œâ”€â”€ visitor-counter-config.js
â”œâ”€â”€ visitor-counter.js
â”œâ”€â”€ visitor-counter-worker.js
â””â”€â”€ wrangler.toml
```

The HTML pages stay at the repository root so current static routes such as `products.html` continue to work. `assets/img/unused/` contains material whose current website use is uncertain; check all references and confirm with the content owner before deleting it. An older nested `mockup1/` checkout is also present in this workspace and is ignored by the active repository; it was left untouched.

## 2. Pages and shared code

- Each root HTML file owns its page-specific structure and repeatable page content.
- `assets/css/site.css` contains shared layout, navigation, responsive rules, and site-wide components.
- `assets/css/product-details.css` contains Product Details page styles.
- `assets/js/site.js` handles shared navigation and site interactions, including the testimonial carousel and the Gallery/testimonial viewer adapter.
- `assets/js/product-details.js` renders product selection, photo/example areas, option changes, and the WhatsApp enquiry.
- `assets/js/image-viewer.js` is the shared native-dialog image viewer controller.
- `assets/data/product-data.js` assigns the catalogue object to `window.BLINDSXPERT_PRODUCTS`; page scripts consume it without a build step.
- Google Fonts are loaded from Google Fonts. The site otherwise uses native browser APIs; no Bootstrap, iStudio, jQuery, or other local JavaScript framework is required.

Keep script order in HTML: product data and `image-viewer.js` load before `product-details.js`; the shared site script runs after the helper on pages that use the viewer.

## 3. Products, variants, and Product Details

Product names, categories, descriptions, galleries, options, specifications, material/series references, and example photos are stored in `assets/data/product-data.js`. Use the existing product IDs and data shape. Product IDs are used in links and query strings; changing an ID requires updating links and any stored references.

The homepage catalogue is rendered from the centralized records by `assets/js/catalogue.js`. Existing Products page cards and category headings remain in `products.html`; the two pending-content records are inserted from the same shared data. Keep existing Products page displays aligned with approved product data. Do not restore an old product merely because an old image exists.

Variants/options are data-driven. Follow the current product's option-to-image mapping in `product-data.js`; preserve option names and IDs. To change a main or variant photo, update the corresponding `src` and optional `thumbnail` in the data, then verify the catalogue and Product Details view. Keep image paths relative to the site root (for example `assets/img/products/...`) and URL-encode spaces and special characters in URLs.

Product Details is `product-details.html`. The product is selected by a query parameter such as `?product=zebra`; option/series state is reflected in the URL. Its gallery data supplies the main image, thumbnails, Photo & Example/completed-project photos, and specification/fabric content. Update those existing records rather than adding image-specific markup in the page script.

The product enquiry form is in `product-details.html`; `assets/js/product-details.js` validates its fields and opens a prefilled `wa.me` link for the customer to review and send. Preserve the destination number and field names unless the business owner approves a change. The separate quote page opens an email draft; there is no form backend.

## 4. Images, video, and page content

Images live under `assets/img/` in usage-oriented folders such as `about`, `contact`, `gallery`, `homepage`, `products`, `projects`, and `services`. Product catalogue source scans and reference sheets are under `assets/img/products/catalogue/` and `assets/img/products/catalogue-reference/`; optimized/generated web images are under `assets/img/products/generated/web/`. Preserve the source originals when preparing a smaller web image.

Use lowercase, hyphen-separated descriptive names for new files, with stable numbering for a series (for example `motorized-demo-01.mp4`). Keep filenames already used by the site unless a rename clearly improves clarity; when moving a file, update all HTML, CSS, JavaScript/data, poster, preload, sitemap, and configuration references.

- **Projects:** cards and navigation are in `projects.html`; completed project photos are in `assets/img/projects/completed/`. Update both the card content and media when approved project details change.
- **Gallery:** cards and captions are in `gallery.html`; files belong under `assets/img/gallery/`.
- **Testimonials:** cards are in the homepage `index.html`; testimonial photos are under `assets/img/homepage/testimonials/images/` and the combined video is `assets/video/homepage/customer-testimonials.mp4`. `assets/js/site.js` controls the carousel.
- **Commercial clients:** logo cards appear in `index.html` and the project/client content is in `projects.html`; client names and logos must remain synchronized and approved.
- **Homepage hero:** image and video markup is in `index.html`; store replacement media under the matching `assets/img/homepage/` or `assets/video/homepage/` folder and preserve poster, autoplay, and loading behavior.
- **Motorized videos:** source elements are in `products.html`; clips live in `assets/video/motorized/`. Keep `preload="none"` and use a real poster image from `assets/img/`.
- **Promotions:** there is no separate promotion data file or admin module in the current site. If approved promotion content is present or added, edit its page section and media in place; do not imply an offer exists when it does not.

## 5. Shared image viewer

The current Product Details full-image dialog remains the visual reference: white dialog, dark blurred backdrop, contained image, caption, close control, and side navigation. `assets/js/image-viewer.js` now supplies the common open/close, arrow-key navigation, touch swipe, backdrop handling, and focus restoration behavior. Product Details adapts its data objects in `assets/js/product-details.js`; Gallery and testimonial thumbnails adapt their trigger images in `assets/js/site.js`. Preserve the Product Details styling in `assets/css/product-details.css` when updating the shared viewer, and keep Gallery/testimonials aligned with it in `assets/css/site.css`.

The native `<dialog>` provides modal focus containment and Escape handling. The shared controller returns focus to the original thumbnail and clears the full-size image on close. Do not replace this with a separate Gallery-only viewer.

## 6. Visitor counter and integrations

`visitor-counter-config.js` contains the public Worker `/count` endpoint used by `visitor-counter.js`; the browser requests it once per page load and shows a graceful unavailable/setup message if needed. `visitor-counter-worker.js` and `wrangler.toml` define the Cloudflare Worker and Durable Object. Keep the endpoint, origin allowlist, binding, class name, and migration aligned. Do not put credentials or secrets in the static repository, and do not casually delete these files.

The Worker adds CORS response headers only for its allowlisted origins; a browser GET from another local origin can still reach `/count` and increment the aggregate even though the page cannot read the response. Avoid repeatedly previewing against the production counter when you do not want test visits included. Use a local test stub or temporarily disable the endpoint for local verification, and never commit the temporary setting.

Navigation, social links, catalogue, phone, email, WhatsApp, and Maps links are in the HTML pages. Preserve the current official URLs unless the owner confirms a change. The sitemap and robots file use the current GitHub Pages `mockup1` URL because this pass does not rename the GitHub repository or Pages configuration.

## 7. Local verification and deployment

Serve the project root with a static HTTP server for local checks; page-relative media paths and the counter's CORS allowlist make HTTP preview more representative than opening files directly. The Worker allowlist currently includes the production GitHub Pages origin and localhost ports 5500. If previewing from a different origin, the counter may be unavailable; do not interpret that as a product-page failure.

Before publishing, check every page, local link and fragment, image, poster and video path, navigation/dropdown, product filter and variant, Product Details selection/viewer/form, project/gallery/testimonial behavior, counter response, and responsive layout. Use representative widths from 320px through 1440px and check keyboard focus, Escape, reduced motion, and touch. GitHub Pages deploys the static root; deploy the Worker separately with Wrangler only when an authorized counter change is needed. Nothing in this maintenance pass pushes or deploys the site.

## 8. Dependencies, safety, and future CMS

There is no package manifest, framework, bundler, or database. The important runtime dependency is the Cloudflare Worker endpoint for the live visitor total; external font delivery is cosmetic and the site should remain readable if fonts fail to load. Preserve `sitemap.xml`, `robots.txt`, the favicon under `assets/img/header/`, the Worker configuration, the WhatsApp/email form behavior, and page-specific script ordering.

Frequently edited product content is already separated into a plain JavaScript data file. Projects, Gallery, testimonials, homepage content, and client logos remain in their page HTML, so those sections require code edits today. A future CMS can replace those sources with validated content records and media URLs while retaining the current presentation functions; no admin login, backend, database, API, or CMS is included here.

The active local project directory is `C:\Users\ahmad\Desktop\BlindsXpertV3`. The GitHub repository and Pages URL remain `mockup1`; local folder naming does not change the hosted project URL.

## Catalogue update and pending images

The two printing products use minimal records marked `contentPending: true`, with temporary illustrative images and empty specifications/options. Complete those records only with approved content. Their placement follows Roller Blinds and Wooden Outdoor Blinds.

Homepage WhatsApp actions derive the existing official destination from the page and encode the selected product name into a neutral enquiry. No message is sent automatically.

Each of the seven videos in `products.html` has a stable `data-video-id` (motorized-demo-01 through motorized-demo-07). Each video now uses its matched PNG poster in `assets/img/products/video-thumbnails/`. Replace that video's `poster` URL when updating its thumbnail. Keep `controls`, `playsinline`, and `preload="none"`. No video assets need to be moved or duplicated.

The three Services story images have stable `data-service-image` markers: explore-ideas, measurement, installation. The supplied portrait images now live in `assets/img/services/assets/` as explore-ideas.png, measure-with-care.png and finish-installation.png. They use `object-fit: contain` within the existing image dimensions to keep the full composition visible.

Social profiles link directly to the official accounts. Facebook uses the official Page Plugin iframe, automatically loaded when its section approaches the viewport, without an SDK, token, or third-party feed service. The direct Facebook link remains visible if the embed fails; Instagram and TikTok use profile cards. External platform availability and browser privacy settings may affect the optional embed.

Homepage actions use flex columns and a bottom-aligned, full-width action area. WhatsApp foreground/background colors are explicit in default, hover, focus and active states. Social media precedes Customer Testimonials: Facebook on the left, with Instagram and TikTok side by side on the right at desktop widths; narrow screens stack. The homepage Payment / Deposit step has no supporting caption; Services retains its description.

### Matched video posters

- motorized-demo-01: Bright Neutral Open-Plan Living Space â†’ `assets/img/products/video-thumbnails/bright-open-plan-living-space.png`.
- motorized-demo-02: Automated Blinds in Oceanview Boardroom â†’ `assets/img/products/video-thumbnails/oceanview-boardroom-motorized-blinds.png`.
- motorized-demo-03: Warm Sunlit Reading Nook â†’ `assets/img/products/video-thumbnails/sunlit-reading-nook-venetian-blinds.png`.
- motorized-demo-04: Tranquil Bedroom with Corner Windows â†’ `assets/img/products/video-thumbnails/bedroom-corner-window-vertical-blinds.png`.
- motorized-demo-05: Tropical Patio with Roller Shades â†’ `assets/img/products/video-thumbnails/tropical-patio-roller-shades.png`.
- motorized-demo-06: Tropical Retreat with Remote Control â†’ `assets/img/products/video-thumbnails/tropical-retreat-remote-control.png`.
- motorized-demo-07: Modern Corner Living Room with Zebra Blinds â†’ `assets/img/products/video-thumbnails/corner-living-room-zebra-blinds.png`.

## Promotions, FAQs and pending policies

- All five new pages are root HTML files. Header and footer markup is repeated across all 16 active root HTML files, including Careers; update every copy when changing shared links. The ignored nested mockup1 checkout is historical and is not the active website.
- Add approved articles to `.promotion-grid` in `promotions.html` using the existing two-column `.promotion-card` structure with poster, h2 title, approved description and action links. The supplied social media poster is the first card; see the poster-card maintenance instructions below. Optional dates use `time` with `datetime`; terms use `.promotion-terms`. Omit dates/terms until approved and do not publish fabricated offers or empty cards.
- In faqs.html, each category is a section with an h2 and each question uses native details/summary. Edit the summary and .faq-answer paragraph directly. All 22 placeholder answers have been replaced with existing website facts, a catalogue-based general explanation, or explicit contact guidance where approval is missing; see the source review below. Keep the contact link or substitute a verified existing page link. Native accordions support keyboard use and work without JavaScript; supported browsers animate details content, with reduced motion respected.
- Replace placeholders in return-policy.html, delivery-policy.html and term-of-payment.html only with approved company text. Keep the exact title Term of Payment. Review and remove each page's noindex,follow robots meta tag when substantive approved policy content is published. Update description and Open Graph/Twitter descriptions at the same time. These pages remain in the sitemap and internal links while pending.
- For new pages, add a url/loc entry to sitemap.xml using the existing https://ahmadafiq156.github.io/mockup1/ base. Keep canonical and og:url consistent with that base and use relative internal links/assets so GitHub Pages project hosting works.
- Shared navigation switches to the existing mobile menu at 1200px; CSS navigation rules and site.js media queries must use matching boundaries.

## Careers records and future admin integration

Careers now has a dedicated `careers.html` page. The existing `about.html#careers` section, six listed role names, ongoing-listing statement and recruitment email remain available. Navigation and footer Careers links point to the dedicated page. Do not treat the old source as a fresh confirmation that a role is open today; the public page asks visitors to confirm availability.

- **Data:** `assets/data/careers-data.js` assigns `window.BLINDSXPERT_CAREERS`. It contains `schemaVersion`, source notes, the approved `recruitment` channel/instructions, and a `jobs` array. `assets/js/careers.js` renders cards, details and application links; `assets/css/careers.css` styles only this page. Keep data before the renderer in the deferred script order.
- **Add manually:** copy a record, give it a stable unique lowercase/hyphenated `id`, use only approved text and set `status: "draft"`. Empty unknown fields stay empty strings or arrays. Never reuse an ID for a different role. Available fields are `title`, `department`, `location`, `employmentType`, `description`, `responsibilities`, `requirements`, `benefits`, `applicationMethod`, `applicationContact`, `applicationInstructions`, `closingDate`, `status`, `sortOrder`, and optional source notes. Job descriptions are previewed on the card and shown fully in details. Optional metadata and lists render only when supplied.
- **Edit:** change the record in place without changing its stable ID. `sortOrder` controls the public sequence. Only the Installer record has an employment type because the existing title explicitly supplies Part-time / Full-time; other departments, locations, descriptions, requirements, benefits and closing dates are unknown and omitted.
- **Publish/unpublish:** set `status: "published"` only after content and availability are approved. Change it back to `draft` to unpublish. The six migrated records are published because the existing About source explicitly lists them as ongoing; the UI labels them Listed opportunity and asks visitors to confirm availability. It does not assert newly verified open status. New records must not inherit published status by accident.
- **Close/archive:** set `status: "closed"` or `status: "archived"`. These records remain in the data file but are excluded from Current Opportunities. Draft/closed/archived/unknown statuses never appear publicly. If none are published, the page shows No Current Openings and the requested check-back message. Invalid/missing data displays a loading-error message rather than pretending there are no jobs.
- **Application information:** use `applicationMethod: "email"` with a verified email, or `"url"` with an approved absolute HTTPS URL. The current approved channel is `job.blindsxpert@gmail.com`; instructions specify sending an application with a photo, as in the original About content. Job-level fields override the `recruitment` defaults. If a role must have no application channel, set applicationMethod to none to prevent inheriting the global default. Invalid/unsafe channels do not produce Apply Now buttons. Email links open a draft with the job title in the subject; nothing is submitted by the site. The global recruitment block supplies the Interested in Joining Us? section. Update both defaults and any per-job overrides when changing contacts. Closing dates use `YYYY-MM-DD` and are displayed only when valid; they do not automatically change a record's status.
- **Future integration:** `window.renderBlindsXpertCareers(data)` accepts the same data contract and re-renders without mutating records. A future API adapter can supply approved jobs to this function. Cards/details use DOM creation and `textContent`, not raw HTML. Record IDs are validated/deduplicated, and application URLs are restricted to verified email syntax or HTTPS. Keep rich-text sanitization separate if it is introduced later.
- **Still not implemented:** login, roles/permissions, publish/edit controls, database persistence, API fetching, application uploads/storage, application processing and an admin dashboard. Those require a real authenticated backend. There are no localStorage accounts or fake forms. Without JavaScript, the page links to the preserved About careers information and approved recruitment email.

## Additional product example images

The six supplied PNGs were moved from the root into the existing `assets/img/products/catalogue-reference/` folder with product-specific lowercase filenames. New entries are appended to the matching `gallery` arrays in `assets/data/product-data.js` with `exampleOnly: true`, factual alt text/captions and the original pixel dimensions. They do not become main/variant images or alter product specifications. No images were converted or generated. The existing Product Details renderer and shared native-dialog viewer handle these examples without changes. Gallery thumbnails retain the existing square crop; the full-image viewer uses `object-fit: contain`.

## Supplied page heroes, heading typography and navigation

The October 2026 targeted pass uses the owner's supplied PNGs without conversion or generation. All six hero files are 2016 Ã— 780; the recruitment graphic is 700 Ã— 570. Original bytes were preserved and root copies were moved, not duplicated.

| Original root filename | Final asset path | Placement |
|---|---|---|
| promotion.png | assets/img/promotions/promotions-hero.png | promotions.html hero |
| faqs.png | assets/img/faqs/faqs-hero.png | faqs.html hero |
| returnpolicy.png | assets/img/policies/return-policy-hero.png | return-policy.html hero |
| deliverypolicy2.png | assets/img/policies/delivery-policy-hero.png | delivery-policy.html hero |
| termofpayment.png | assets/img/policies/term-of-payment-hero.png | term-of-payment.html hero |
| career.png | assets/img/careers/careers-hero.png | careers.html hero |
| hire.png | assets/img/careers/careers-get-in-touch.png | Careers Get in Touch |
| deliverypolicy.png | assets/img/policies/delivery-policy-hero-alternate.png | Retained alternate; no active reference |

Replace the image in the matching page's `.information-hero`, preserving width/height attributes, heading, copy and shade. The individual hero classes in `assets/css/site.css` define each crop with `object-position`; all use cover without changing the existing hero dimensions. The scoped dark shade keeps text readable and becomes uniform on narrow screens. Other page heroes keep their existing images and overlays. These images are illustrative assets, not evidence of completed projects or company promises.

Careers Get in Touch uses `.career-contact-layout` in `assets/css/careers.css`: image and existing recruitment copy side by side, stacking at 760px and below. The image frame retains the graphic's 700:570 ratio and uses cover. Keep the recruitment email, native job details and data/renderer contract unchanged when replacing this graphic; the supplied graphic does not verify current vacancy availability.

H1 and H2 use **DM Sans**, the existing body font, with Arial/sans-serif fallbacks. The Google Fonts import retains weights 400/500/600/700 and `display=optional` to prevent late font swaps; the unused Playfair Display import was removed from all 16 pages. Shared heading rules use 700 weight, tighter letter spacing, balanced wrapping, 1.15 base line height and clamp sizing. Existing component-specific sizes remain; H3 and body rules are preserved. Edit `--heading-font` and the shared H1/H2 rules in `assets/css/site.css`, then inspect component overrides. Preserve semantic heading elements. External font delivery can fall back to system fonts. Optional display uses the fallback for that page view when the font misses its initial brief loading window; a later font download is available for subsequent views and does not replace text after it has painted.

The dropdown overflow came from a 780px absolute panel with `right: -24px` relative to the much narrower Products item. Before the fix its left edge was approximately -268px at 1201px, -148px at 1366px and -111px at 1440px. Desktop CSS now starts from left alignment, caps width to the viewport minus 32px and limits height with vertical scrolling. `positionDropdowns()` in `assets/js/site.js` measures the anchor and clamps the panel within 16px viewport insets on opening, resize and font readiness. No fixed negative offset is used. At 1200px and below it remains an in-flow submenu inside the scrollable mobile navigation, with wrapping links. Mobile flex items must not shrink: the old Products wrapper shrank to 308px around 444px of content at 390px, allowing the submenu to overlap Projects, Promotions and FAQs. `.nav.open > * { flex-shrink: 0; }` reserves the full wrapper height so later links remain accessible by scrolling; the desktop hover bridge pseudo-element is disabled on mobile. Keep the CSS and JS breakpoint synchronized. Enhanced desktop visibility follows `.dropdown-open` so Escape closes the panel even while the item retains hover/focus; no-JavaScript hover/focus fallback remains. Pointer hover, keyboard focus/Enter, touch toggle and `aria-expanded` are coordinated; Escape restores focus and resizing across the breakpoint resets menus.

## FAQ sources and company approval

Keep the four categories and 22 questions in their current order. Edit only the `.faq-answer` paragraph when updating answers, with concise customer wording and relevant relative links. All FAQ `details` elements share `name="blindsxpert-faq"` to allow zero or one open answer across all four categories. `assets/js/site.js` also closes other FAQ items on native summary activation and toggle as a compatibility fallback; it does not intercept the native keyboard action. Confirm business-specific promises with the owner before publishing them and update this source review when facts change. Do not add policies to the FAQ by inference.

| Question number(s) | Current factual basis | Approval still needed |
|---|---|---|
| 1â€“5: company, contact, location, quote, projects | products.html, services.html, contact.html, quote.html and its existing email-draft handler, projects.html | Any new hours, branches or company claims |
| 6: blind types | products.html and assets/data/product-data.js | New product/availability claims |
| 7: curtains and hardware | curtain-hardware catalogue record verifies rails and rods | Curtain fabric and curtain supply availability |
| 8: roller versus zebra | General explanation grounded in the two catalogue descriptions | No company-specific performance promise is made |
| 9: colours/materials | Roller Blackout/Sunscreen/Translucent and Venetian Aluminium/Timber/PVC/Lantex catalogue ranges | Current colours, materials and stock |
| 10: window sizes | about.html states customised and ready-made coverings | Particular dimensions, suitability and custom options |
| 11: motorized blinds | Catalogue and products.html list motorized demonstrations and Somfy/Dooya ranges | Project-specific options |
| 12: measurement | services.html lists measurement in Kuala Lumpur/Selangor | Appointment availability, arrangements and any fee; this does not establish delivery coverage |
| 13â€“14: installation/customization | services.html customer journey; about.html custom-covering statement | Project arrangements and suitable custom requirements |
| 15: quote | quote.html and existing site.js email-draft behavior, contact.html | No automatic sending or backend submission is claimed |
| 16: after quotation | Existing six-step customer journey in services.html/index.html | Payment amounts/deadlines, deposit terms and scheduling |
| 17: installation duration | Contact guidance only; no approved duration | Company/project installation schedule |
| 18â€“22: cleaning, frequency, water, motorized care, operating problems | Product-specific contact guidance; question 18 follows the owner's supplied neutral wording | Approved product-specific care methods, maintenance frequency, water suitability, motorized instructions and troubleshooting; repair/warranty terms remain unconfirmed |

Of the 22 answers, 15 primarily use existing company/catalogue content, one provides a catalogue-grounded general product explanation (question 8), and six require company guidance (questions 17â€“22). Some supported answers also explicitly defer the particulars listed above. Policies remain pending and retain `noindex,follow`; promotions still contain no invented offers.

The targeted pass was verified locally in headless Edge at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px (144 page/width combinations). All six hero heights match the pre-change CSS at those widths. Heading semantics/copy, shared headers/footers, body/H3 styles, product/careers data and non-navigation handlers were preserved. Asset checks covered 1,444 HTML/catalogue references; local links/fragments and browser requests had no missing files or JavaScript errors. Navigation checks also included 1201px, every mobile link's unobscured click target, keyboard/Enter/Tab/Escape and desktop touch toggles. FAQ accordions work without JavaScript and with reduced motion; Careers cards/details, catalogue filters, product/shared viewers and seven video posters were checked. The visitor counter used a local deterministic response, not the production service; quote validation was checked without sending an enquiry. Font delivery was tested separately with only Google Fonts allowed: optional display prevents late text swaps, although the unchanged Careers and Product Details renderers can still shift sections during initial data rendering. This is not a guarantee of zero overall page CLS or a live integration/deployment test.

## Zebra BX Fabric & Colour Collection (8 October 2026 — historical source extraction)

The current shared configurator is documented at the end of this guide; supplier photographs described below remain source references and are not displayed in the current configurator.

The existing Zebra record (`id: zebra`) in `assets/data/product-data.js` retains all eight source series: BX 101Z, BX 201Z, BX 301Z, BX 401BL, BX 501BL, BX 601BL, BX 701BL and BX 801BL. The current visible selector is restricted to four series as documented below. Each has two JPEG catalogue photographs (colour catalogue and technical specification sheet). Old fabric/series references were removed from the Zebra `documents` array; Custom/Generic non-collection documents remain. Older shared assets were not deleted.

| Website series / displayCode | Original sourceCode | Image directory |
|---|---|---|
| BX 101Z | SP 101Z | assets/img/products/fabric-collections/zebra/bx-101z/ |
| BX 201Z | SP 201Z | assets/img/products/fabric-collections/zebra/bx-201z/ |
| BX 301Z | SP 301Z | assets/img/products/fabric-collections/zebra/bx-301z/ |
| BX 401BL | SP 401BL | assets/img/products/fabric-collections/zebra/bx-401bl/ |
| BX 501BL | SP 501BL | assets/img/products/fabric-collections/zebra/bx-501bl/ |
| BX 601BL | SP 601BL | assets/img/products/fabric-collections/zebra/bx-601bl/ |
| BX 701BL | SP 701BL | assets/img/products/fabric-collections/zebra/bx-701bl/ |
| BX 801BL | SP 801BL | assets/img/products/fabric-collections/zebra/bx-801bl/ |

Each directory contains `<directory>-catalogue-01.jpeg` (colours) and `<directory>-catalogue-02.jpeg` (specifications). The existing 16 assets were reused and renamed, with no duplicate set. Four sideways originals (BX 101Z specification, both BX 201Z photographs and BX 401BL colours) use JPEG EXIF orientation 6, rotating clockwise for display without recompressing or changing the encoded image pixels. Every display image is 563 Ã— 1000 after orientation. The other twelve JPEGs retain their original bytes. Printed SP labels remain untouched. `info.zip` retains the source originals; preserve it when replacing assets.

Series `name` and `displayCode` use the website BX identifier; `sourceCode` retains the source SP identifier internally. The `fabrics` array contains verified `{code, colourName}` records; these are the original printed fabric references, including their SP prefix, rather than renamed or inferred codes. `specs` holds only legible printed specifications and units. `photos` contains paths, BX alt text/captions and oriented width/height. A description is optional and is rendered only when supplied and verified; no source fabric names, patterns, light-transmission classifications or descriptive claims were inferred from appearance.

Forty-three printed code/colour pairs were verified. Upright inspection corrected BX 201Z to SP 201Z CREAM, SP 203Z GREY, SP 204Z BROWN, SP 205Z GREEN and SP 206Z BLUE. BX 401BL's verified references are SP 403BL BROWN, SP 404BL GREY, SP 411BL DARK GREY, SP 412BL DARK BROWN and SP 413BL BLACK. Its first cream label is split as `SP 402` / `BL CREAM` and is not confidently transcribed as a complete code/name pair. BX 601BL, BX 701BL and BX 801BL weight lines lack a clear mass unit and remain untranscribed. The unusual BX 401BL colour-fastness wording `7 to fast 8` is retained as printed; no test standard is assumed.

The additional seventeenth photograph directly under `ZEBRA BLINDS/` depicts ZEBRA-C8 crystal-ball-chain and ZEBRA-CC 45mm ball-chain system diagrams. It is not a fabric colour or specification sheet for one of the eight series and is excluded from the collection. No hardware compatibility/performance claims are inferred.

`assets/js/product-details.js` reuses the existing selector and shared image viewer. The Zebra section becomes **Fabric & Colour Collection**; selecting a BX series updates its heading, colour palette, verified specification table and both original catalogue photographs. The former printed-code table was replaced by the compact palette and single preview described below. Native buttons expose aria-pressed/aria-controls and support Tab, Enter, Space and touch. Mobile selection scrolls only the selector horizontally, keeping its selected label fully visible without jumping the page. Existing SP-series links are accepted through sourceCode mapping and normalized to BX names; product IDs and URL parameter keys are unchanged. The WhatsApp draft uses the selected BX name. No message is sent automatically.

The collection uses scoped `.pd-bx-collection` and `.pd-catalogue-*` rules in `assets/css/product-details.css`: red selected controls, white photographs, #F5F5F5 section background, wrapping desktop buttons, horizontally scrolling mobile buttons, paired desktop information/images and stacked mobile content. Document photographs use contain and intrinsic oriented dimensions; no catalogue pixels are cropped. Both photographs open the existing native-dialog viewer with next/previous, arrow keys, touch swipe, Escape, close-button access and focus restoration. Original-photograph links permit browser zoom. Zebra's separate product-information section still presents the product/range information; other products retain their previous specifications behavior.

To add a verified Zebra series, append one uniquely named record to the Zebra `series` array with name/displayCode, sourceCode, nonempty verified fabrics/specs and its photos. Keep `catalogueCollection: true` on Zebra only. Place JPEGs in a BX directory, set correct EXIF orientation where needed, and use the displayed dimensions in photo width/height. Do not infer missing codes, colour names, units or descriptions. To replace a photograph, update that record's src, factual BX alt/caption and intrinsic dimensions; preserve the complete page and source resolution. Before changing fabric codes or numeric specifications, verify the original photograph and retain source references. Do not change Zebra's main gallery, range options, optionImages, description or completed examples for a collection edit.

Verified locally in headless Edge at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px: all eight BX series, sixteen upright photographs, correct code/specification tables, keyboard selection, original links, viewer navigation/closing/focus restoration, touch swipe and zero horizontal page overflow passed. Source-series deep links normalized correctly. The WhatsApp draft contained the BX series; window.open was intercepted so no message or external enquiry was sent. Zebra hero/variant/thumbnail checks and mobile/desktop regression checks for Roller, Roman, Venetian and Wooden Outdoor passed with no JavaScript errors. All 189 local product asset paths were valid.

After editing, test all eight series and sixteen photographs at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px. Check selector reachability/selected state, orientation, full-image links/viewer, keyboard/touch, zero page overflow, deep links, product switching and the prepared WhatsApp text without sending it. Compare other product records and the unchanged Zebra hero/variants/gallery with the pre-edit state.

## Supplied catalogue main images (8 October 2026)

The five PNG uploads are retained byte-for-byte at their original dimensions. The existing product names, IDs, categories, order, descriptions, specifications, gallery examples and Zebra fabric collection are unchanged.

| Original upload | Existing product / ID | Final path | Pixels |
|---|---|---|---|
| pvcblinds.png | PVC Outdoor Blinds / pvc-outdoor | assets/img/products/outdoor/pvc/outdoor-pvc-blinds-main.png | 3919 Ã— 3919 |
| rollerblindsprint.png | Roller Blinds Logo Printing / roller-logo-printing | assets/img/products/indoor/roller-logo-printing/roller-blinds-logo-printing-main.png | 1254 Ã— 1254 |
| zebrablinds.png | Zebra Blinds / zebra | assets/img/products/indoor/zebra/zebra-blinds-main.png | 3919 Ã— 3919 |
| woodenblinds.png | Wooden Outdoor Blinds / wooden-outdoor | assets/img/products/outdoor/wooden/wooden-outdoor-blinds-main.png | 3919 Ã— 3919 |
| woodenblindsprint.png | Wooden UV/Logo Printing / wooden-uv-logo-printing | assets/img/products/outdoor/wooden-logo-printing/wooden-blinds-uv-logo-printing-main.png | 1254 Ã— 1254 |

Replace a product's `gallery[0]` in `assets/data/product-data.js`: update src, thumbnail (the same original path here), factual alt/caption and actual width/height; set `mainImage: true`. If a default `optionImages` entry points to the replaced image, update that path too. `assets/js/catalogue.js` uses this record for the homepage, the dynamically inserted printing cards, and the corresponding existing static Products-page cards after JavaScript loads. Static HTML images remain as the pre-existing no-JavaScript fallback. Do not add duplicate cards or image files. The Product Details renderer recognizes `mainImage` explicitly, keeping supplied images outside `/generated/` in the main gallery rather than Photos & examples.

All five images are square, matching the existing square placeholders without distortion or cropping. Printing records additionally use `fit: "contain"`; the catalogue renderer, main-image renderer and gallery thumbnails apply this per-photo setting to keep logos visible. Other images retain their previous CSS fit. The outer frame, inner placeholder, card dimensions and interactions are unchanged. Old assets remain because other records, variants and static fallbacks still reference them. Root upload copies were moved and verified by SHA-256; no conversions or generated thumbnails were added.

Verification update (9 October 2026): the previously pending nine-width browser checks have now run in local headless Edge. Both 18-card catalogues and all 18 Product Details pages passed rendering/image and overflow checks at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px. Zebra now uses its restored illustrative main image as described below; the other supplied main images remain unchanged. These are local checks, not production integration tests.


## Shared navigation dropdowns

All sixteen root HTML headers use this order: Home, Products, Projects, About Us, Services, Promotions, FAQs, Contact, Get a Free Quote. Products retains its category links. Projects has only Gallery (`gallery.html`); its parent links to `projects.html`. About Us has only Careers (`careers.html`) and Join as Dealer (`products.html#dealer-enquiries`); its parent links to `about.html`. The dealer anchor targets the existing dealer/reseller section and its existing WhatsApp enquiry link; no new form or page is added.

Each dropdown uses the same `nav-products`, `nav-products-top`, `products-toggle`, `product-dropdown` and `product-dropdown-group` classes plus `data-nav-dropdown`. Keep panel IDs unique and match each toggle's `aria-controls`. Projects/About panels add `navigation-simple-dropdown` for a compact single column. Parent links stay separate from toggle buttons. Edit every root HTML header when changing links; footer links are independent.

`assets/js/site.js` initializes all disclosures through one shared collection. Hover/focus opens desktop menus; click, Enter and Space toggle them; ArrowDown on a toggle opens and focuses the first link. Tab follows native link order. Opening a menu closes the previous one. Escape closes a submenu and restores toggle focus; a subsequent Escape closes the mobile navigation. Outside desktop clicks close dropdowns. Panels clamp to 16px viewport insets. At 1200px and below, submenus expand in normal flow inside the scrollable hamburger menu and never shrink their wrappers or cover later links. Keep the CSS/JS breakpoint aligned.

Projects/Gallery highlight the Projects parent; About/Careers highlight About Us, with the actual submenu page marked `aria-current="page"`. The dealer fragment highlights About Us and marks Join as Dealer as the current location. Preserve the restored static logo, sticky header and existing CTA. The parent itself carries aria-current on Projects/About pages; child pages highlight their parent section.

Local verification: all sixteen pages at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px (144 page/width checks) passed. Checks covered exact navigation order, all three dropdowns, local navigation files/fragments, viewport bounds, mobile in-flow spacing and unobstructed links, Enter/Space/ArrowDown/Escape, desktop hover/outside click, sticky positioning, unchanged 72px/82px header heights and active section indicators. Native mobile touch toggles and dealer navigation passed separately. Normal-motion desktop checks at 1366/1440px also passed with the animated logo enabled. No horizontal overflow, missing local browser requests or JavaScript errors were found. This was local testing; no enquiry was sent and no deployment performed.


## Navigation and homepage improvements (current)

The static header markup is restored from Git revision `888e2ae`: `assets/img/header/logo no background.png` (32×35px contained emblem), “BlindsXpert” text and “Your Window, Our Expertise” tagline in the existing 170px branding area. Every root HTML header uses the same original markup and styling, with the homepage link and accessible name retained. Animated navbar markup/styles are removed; the GIF asset is retained. Earlier animated-logo notes describe the previous implementation.

Homepage-only typography uses a 30–48px heading on larger screens and 24–30px on mobile, with 1.18–1.2 line spacing and balanced wrapping. Supporting copy is 14–16px desktop/tablet and 13px mobile. CTA sizes are unchanged. Slideshow controls are 56×56px with 34px icons on desktop and 48×52px with 32px white icons on mobile. Swipe and automatic slideshow handlers are unchanged.

The Zebra main image is restored from the same Git revision: `assets/img/products/generated/web/zebra-main.webp` (1254×1254px). Its original illustrative-image caption is preserved. Homepage, Products static fallback, the Generic range mapping and central `gallery[0]` use this same image; `mainImage: true` keeps it in the Product Details gallery. The newer supplied PNG remains on disk. All BX series records, sixteen photographs, specifications, selectors, additional gallery entries and example photos remain unchanged.

### Catalogue labels

Edit each product's `suitableFor` array and `bestSeller` boolean in `assets/data/product-data.js`. `assets/js/catalogue.js` renders the labels for homepage cards and supplements existing static Products-page cards, including the printing cards. Suitable-use lines go directly below names; compact red-tinted badges stay in the content area. Applications are broad recommendations based on existing type/description, not a promise about moisture resistance or technical performance. Confirm the exact installation with the team. Only Zebra, Roller, Wooden Outdoor and PVC Outdoor are flagged as Best Sellers at the owner's request.

| Product | Suitable for | Best Seller |
|---|---|---|
| Zebra Blinds | Home, Office | Yes |
| Roller Blinds | Bedroom, Office | Yes |
| Roller Blinds Logo Printing | Office, Retail Shop | — |
| Panel Blinds | Living Room, Office | — |
| Venetian Blinds | Home, Office | — |
| Vertical Blinds | Office, Commercial Space | — |
| Roman Blinds | Bedroom, Living Room | — |
| Dream Blinds | Living Room, Home | — |
| Honeycomb Blinds | Bedroom, Living Room | — |
| Wooden Outdoor Blinds | Balcony, Patio | Yes |
| Wooden UV/Logo Printing | Retail Shop, Outdoor Area | — |
| Bamboo Outdoor Blinds | Patio, Outdoor Area | — |
| Ziptrak Outdoor Blinds | Balcony, Patio | — |
| PVC Outdoor Blinds | Balcony, Outdoor Area | Yes |
| Awnings & Canopies | Patio, Outdoor Area | — |
| Motorized Solutions | Home, Office | — |
| Skylight Blinds | Home, Commercial Space | — |
| Curtain Hardware | Home, Office | — |

### Social snapshots

The owner-supplied Instagram and TikTok screenshots are retained unchanged at `assets/img/homepage/social/instagram-profile.png` (1917×1000px) and `tiktok-profile.png` (1917×1001px). On 9 October 2026, the unused root-level `instagram.png` and `tiktok.png` copies were removed after matching SHA-256 hashes and checking source references. These are genuine profile screenshots, linked to their respective official profiles; individual post URLs were not provided, so none are invented. Update the image source, dimensions, accessible text and official link together in the homepage social section. Do not treat captured follower/view counts as live statistics. Instagram and TikTok remain static screenshots. Facebook uses its restored live Page Plugin; see the configuration below. Its official link is always visible as a fallback.

### Testimonial ratings and customer video

The seven `Screenshot 2026-09-30 ...` review images visibly show five gold stars; their factual `data-rating="5"` markers remain. Individual cards no longer have added star elements. One gold five-star accent appears immediately below the section heading using `.testimonial-section-accent` and `aria-hidden="true"`; it is decorative and does not assert an average rating, review count or rating for every customer. The four chat-based cards retain no numeric rating. Existing customer photographs, carousel and shared full-image viewer are preserved.

The existing 51.17-second customer video includes spoken recommendations and thanks, confirmed in its supplied subtitles. Its heading is “Hear From Our Customers”; supporting copy is “Watch customers share their experience with BlindsXpert and see our blinds in their homes and spaces.” The video file, controls, muted autoplay, loop, playsinline and aspect ratio are unchanged.

### WhatsApp contact widget

The shared `assets/js/site.js` injects one lightweight WhatsApp disclosure on every page. Edit the `whatsappContact.number` and `.message` configuration there; the current verified sales number is `60176356542`, reused from the existing site. The message is URL-encoded into a wa.me link. Edit popup heading/body in the same block. Opening the widget never sends a message; the user must select the WhatsApp link and send it in WhatsApp.

The popup is initially closed, opens only on request, focuses its close button and supports close/ Escape with focus restoration, outside click and leaving focus. Focus does not scroll the page. Closing restores focus after collision positioning; if dense controls require hiding the opener, focus moves to the visible header navigation button (or brand link on desktop). The floating button respects safe-area spacing, stays below the header/native image dialogs, hides during mobile navigation and image viewing, and moves away from visible form/CTA controls on scroll or resize. If a dense form fills every safe position, the idle button temporarily hides and is restored when scrolling frees space. Product Details uses its existing separate enquiry form; its logic is untouched. No plugin or new dependency is required.


Earlier supplied Wooden Outdoor and PVC Outdoor main PNGs contained large Best Seller ribbons baked into their pixels. Their catalogue cards previously used the existing approved project photographs `assets/img/projects/completed/Saujana Impian.png` and `Sunway Eastwood.png` through an optional `catalogueImage` object. This optional object takes precedence over gallery[0] only in the catalogue renderer. The 9 October replacement below removes these two overrides so both catalogues and Product Details use the newly supplied originals. Earlier photographs remain on disk; no photo editing, cropping to hide captions or generation was performed.


## Interrupted-work completion verification (9 October 2026)

Resumed from `2b84b95` without reimplementing the completed features. Corrected 24 encoding-corrupted arrow/close/navigation symbols in `products.html`, aligned Zebra's Generic option image with the restored main image, and fixed WhatsApp keyboard focus restoration after collision positioning. Removed only the unused, hash-identical root social screenshot copies. Product data is identical to the starting commit except for that Generic image mapping; all eight BX series and their sixteen photographs remain unchanged.

Local headless Edge verification passed at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px: all sixteen page headers/WhatsApp widgets (144 page/width combinations), all eighteen Product Details pages (162 combinations), both eighteen-card catalogues, filters and equal card heights within each row, all BX selectors/tables/photos and viewer navigation, hero sizing/centered arrows/manual navigation, social snapshots, testimonial carousel/viewer, customer-video playback and no horizontal page overflow. Additional checks covered normal-motion slideshow autoplay, emulated touch controls and synthetic swipe events, form-control collision avoidance, the dense-picker Escape focus fallback, direct Projects/About parent links, popup keyboard/bounds at 568px viewport height, and decoding/playback of all eight local videos. The seven review screenshots support the displayed five-star ratings; the four chat testimonials retain no numeric rating.

All 1,492 checked local HTML/data/CSS references and static fragments resolved. JavaScript syntax and `git diff --check` passed; tested flows produced no JavaScript errors or missing local browser responses. Browser tests blocked external requests; WhatsApp enquiry drafts were intercepted for inspection without sending. Production counter service, external social-account availability, external font delivery, physical-device gestures and browsers other than Edge were not verified. No staging, commit, push or deployment was performed.


## Homepage social media and new project collections (9 October 2026)

Facebook is first, Instagram second and TikTok third. The shared social grid uses three equal-width, top-aligned columns above 960px and one stacked column at 960px and below. Cards can have different heights so Facebook is not cropped into a screenshot frame. Instagram and TikTok use their unchanged files in `assets/img/homepage/social/`; replace an approved screenshot in that directory and update its `src`, alt text and actual intrinsic width/height together in `index.html`. Keep `height:auto`, its original proportions and its official profile URL. Do not restore the removed root duplicates.

### Facebook live configuration

The Facebook card in `index.html` restores `[data-facebook-feed]`. The existing loader at the end of `assets/js/catalogue.js` inserts the official `https://www.facebook.com/plugins/page.php` iframe as the section approaches the viewport, with `href=https://www.facebook.com/blindsxpertmy/`, `tabs=timeline`, `height=400`, `small_header=true`, `adapt_container_width=true`, `hide_cover=false` and `show_facepile=false`. Width is measured from the card and clamped to 180–500px; its ResizeObserver reloads the embed after resizing. The card reserves 400px for the feed and keeps the iframe within its container, centered when the card is wider than 500px. The official Facebook link and explanatory fallback note are always visible, including when JavaScript, network access or Facebook restrictions prevent the feed from displaying. No SDK, unofficial scraper, static Facebook screenshot or copied posts were added.

The official embed was observed loading genuine page identity and timeline posts in local headless Edge at 1440px on 9 October 2026, with a successful HTTP 200 response. A separate blocked-network check verified the visible fallback at 320px. Facebook can still restrict an individual visitor's embed access; the site cannot inspect or guarantee cross-origin content availability.

### Supplied project photographs

All 35 original PNGs are upright 1254×1254px images, extracted byte-for-byte and verified against their uploaded ZIP entries using SHA-256. They are stored once under `assets/img/projects/`, with no converted or generated photographs. The five original uploaded project ZIPs were subsequently deleted after a second byte/hash comparison confirmed every non-directory entry was preserved; see the product/ZIP cleanup section below. They were ignored by the existing `*.zip` rule. Project labels use the supplied folder names, with only capitalization/spacing normalized. Client details, dates, specifications and detailed descriptions were not supplied and were not invented. New cards use the neutral Other projects filter pending approved categorization. Historical Projects-page labels, cover sources, alt text and styling are preserved. Their covers now use semantic viewer buttons as documented below.

| Supplied project | Image directory | Total photos | Representative source / final image | Homepage |
|---|---|---|---|---|
| Hulu Langat | `assets/img/projects/hulu-langat/` | 8 | `4.png` → `hulu-langat-04.png` | Yes |
| Edgewood Residence | `assets/img/projects/edgewood-residence/` | 8 | `6.png` → `edgewood-residence-06.png` | Yes |
| Taman Putra Perdana | `assets/img/projects/taman-putra-perdana/` | 7 | `3.png` → `taman-putra-perdana-03.png` | Yes |
| Surau Al-Idris Rawang | `assets/img/projects/surau-al-idris-rawang/` | 8 | `4.png` → `surau-al-idris-rawang-04.png` | Yes |
| SK Setiawangsa | `assets/img/projects/sk-setiawangsa/` | 4 | `3.png` → `sk-setiawangsa-03.png` | No |

Homepage selection is four static `.project-card-link` anchors in `index.html`, one per project, pointing to matching `project-[directory-name]` IDs in `projects.html`. The selected photographs show clear, varied installations with good lighting and fewer obstructions. SK Setiawangsa has a complete Projects-page gallery but is not one of the four featured cards. All supplied photographs are square; the existing consistent homepage cover frame uses `object-fit:cover` without stretching. Full originals are available through the shared viewer.

Each Projects-page `.project-collection` uses the same cover frame, `.card-copy`, heading and `.project-detail` label as historical cards. The selected cover button opens the complete collection. Remaining source images are listed as `.lightbox-trigger.project-photo-trigger` buttons in a hidden `.project-photo-grid` inside the same `data-lightbox-gallery` container; these supply the shared viewer without changing the visible card height. Do not duplicate the cover. The viewer displays a consistent thumbnail strip only when its dialog contains `[data-lightbox-thumbnails]`; keyboard arrows, previous/next, swipe, Escape and focus restoration remain shared with other pages. All originals remain available at full resolution. To add an approved photograph, add its file and source button, update the cover's accessible photograph count and image alt text/intrinsic dimensions, and confirm the viewer count. Keep the group key unique.

Edit the `.project-detail` paragraph immediately below each featured title in `index.html` and its matching `projects.html` card together. Edgewood Residence uses “Venetian Blinds” based on the visible horizontal louvers and ladder tapes; Surau Al-Idris Rawang uses “Vertical Blinds” based on its hanging vertical vanes. Hulu Langat, Taman Putra Perdana and SK Setiawangsa use “Window Blinds Installation”: their exact outdoor product/material needs owner confirmation. No wood, bamboo, PVC or motorization specification is inferred. Keep labels short and reuse the existing muted, smaller typography.

### Single-open FAQs

All 22 native `.faq-item` elements use the same `name="blindsxpert-faq"` across the entire page. The shared handler closes other FAQ answers before native summary activation and also handles toggle events as a fallback for browsers without native details grouping. Enter, Space, Tab, focus and expanded semantics remain native; selecting the open question again closes it. The existing details-content animation and reduced-motion rule are unchanged. When adding an approved FAQ, use the same class/name and keep the existing summary/answer structure. No questions or answers were rewritten in this update.


Validation for this update: local headless Edge passed at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px. Checks covered four distinct featured projects and aligned cover frames, all five galleries and all 35 original photographs, additional thumbnails, grouped viewer navigation/closing/focus restoration, social screenshot proportions, iframe sizing/resizing configuration, official outgoing URLs, the single decorative star accent, all 22 FAQ questions across categories, Enter/Space/Tab, navigation and WhatsApp. Native FAQ grouping also passed with JavaScript disabled using keyboard activation, and the JavaScript compatibility fallback passed with native name grouping removed. Normal-motion and reduced-motion FAQ checks passed. Actual homepage project-link navigation passed at 320/1440px; a mobile cover tap and simulated viewer swipe passed at 390px. The unchanged BX collection passed all eight selectors and sixteen images at 320/1440px, and its complete product data matches the starting commit. All thirteen historical project cards and all FAQ copy were preserved.

The nine-width layout tests used a blank deterministic Facebook iframe response for sizing only; genuine live content was separately observed at 1440px, and the blocked-feed fallback was tested at 320px. These checks do not guarantee Facebook availability for every visitor or physical-device/cross-browser behavior. All 1,528 checked local references and static fragments resolved; JavaScript syntax, browser page-error/missing-local-response checks and `git diff --check` passed. The 35 new image files match the uploaded ZIP entries byte-for-byte; both social screenshot files are unchanged. No enquiry was sent and no staging, commit, push or deployment was performed.


## Promotions poster cards (9 October 2026)

The uploaded `BlindsXpert Social Media Showcase.png` was moved to `assets/img/promotions/blindsxpert-follow-social-media.png` (1672×941px), with identical SHA-256 `3a35b27631b071b4ae8d620e5cc74402a256930972106fa3204668854e1aa71f`. No duplicate or generated image was added. The existing `promotions-hero.png` and hero markup are unchanged. Profile counts already embedded in the supplied poster are a static snapshot, not a live statistic.

`promotions.html` contains one static `article.promotion-card` inside `.promotion-grid`. To add an approved update, copy this article and change its poster source, intrinsic dimensions, accessible label/alt text, unique `data-lightbox-gallery` key, title, description and action URLs. Posters belong in `assets/img/promotions/`; preserve originals and use descriptive filenames. Add validity dates (a `time` element) or `.promotion-terms` only when supplied and approved. No data framework is needed for this static page.

The card uses CSS Grid with 45/55 poster/details columns above 760px, then stacks poster, copy and actions at 760px and below. The poster uses `height:auto` and `object-fit:contain`; it opens in the existing shared image viewer. The details title is “Follow BlindsXpert on Social Media”. The previous coming-soon sentence was unsuitable for this supplied poster, so the approved suggested description is used: “Stay connected with BlindsXpert on Facebook, Instagram and TikTok for the latest promotions, new products, project updates and window blinds inspiration.” Existing supporting wording (“Contact our team to enquire about our current products and services.”) and Contact Us destination are retained. This is a social update; no discount, deadline or eligibility claim was added.

Edit the compact `.promotion-actions` anchors to update official destinations. Current URLs are `https://www.facebook.com/blindsxpertmy/`, `https://www.instagram.com/blindsxpert/` and `https://www.tiktok.com/@blindsxpert_tiktok`. Keep new-tab links protected with `rel="noopener noreferrer"` and tap targets at least 44px high.


Verification for the project-label and Promotions update: local headless Edge passed all nine requested widths (320, 360, 375, 390, 430, 768, 1024, 1366, 1440px). Checks covered four homepage labels/anchor destinations; eighteen cards with shared frame, padding, typography, equal row heights and titles/labels contained inside each visible card; all 35 gallery originals with next/previous, keyboard navigation, thumbnail selection, Escape and focus return; the full poster, 45/55 desktop ratio, mobile stacking, official action destinations and 44px tap targets; navigation/WhatsApp; and no page overflow, JavaScript errors or missing local browser responses. Actual homepage links passed at 320/1440px and mobile cover tap/simulated swipe at 390px. All eight BX selectors and sixteen photographs passed at 320/1440px, and BX shared-viewer keyboard navigation passed separately. All thirteen historical project cards, Promotions hero and complete product data match HEAD; all 35 project photographs still match their original ZIP bytes. All 1,530 checked local asset references and fragments resolved. JavaScript syntax and git diff whitespace checks passed.

External social destinations were verified in link markup, with new-tab protection; third-party account availability was not checked in these local tests. No enquiry was sent. Physical-device gestures and browsers other than Edge remain unverified. The WhatsApp widget's existing collision hiding is respected by testing at a clear page position. No staging, commit, push or deployment was performed.


## All-project full-image viewing and cursor correction (9 October 2026)

All eighteen Projects-page cards now have a unique `data-lightbox-gallery` group. The thirteen historical cards use `historical-[project-name]` keys and one `.lightbox-trigger.project-cover-trigger` button around the existing cover image. Their image files, alt text, titles, product labels, filter categories and existing anchor IDs are unchanged. The five supplied collections retain their 35 photographs, selected covers and hidden source lists. No additional historical photographs or separate higher-resolution originals were found in the current project assets; historical images open from their existing original PNGs without upscaling or file changes. If approved additional photos become available, use the same hidden-source structure as the new collections within the correct card group. Do not group unrelated project cards together.

The existing `site.js` resolves each image's current source and initializes only triggers within its own `[data-lightbox-gallery]` container. The unchanged shared `image-viewer.js` handles full-image contain scaling, next/previous, arrows, swipe, thumbnail selection, Escape/close and return focus. Single-image groups disable both navigation buttons. Image buttons have project-specific accessible labels and the existing red keyboard focus outline. Decorative hero images and client logos remain non-interactive.

Cursor investigation found three explicit `cursor:zoom-in` rules on `.project-cover-trigger`, `.project-photo-trigger` and `.promotion-poster`. Browser inspection confirmed this inherited zoom cursor on the five new covers and the poster; historical images previously had `auto` and no viewer trigger. No `wait`/`progress` CSS, JavaScript cursor mutation, stale busy class or image-hover overlay was found. A stuck OS/browser loading cursor was not reproduced. These three scoped rules now use `pointer`, without `!important`; decorative Projects/Promotions heroes and client logos use `default`. Close, enabled navigation and viewer-thumbnail buttons retain their existing pointer rules. No image-loading condition sets a busy cursor.


Validation: local headless Edge passed 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px. At each width all 13 historical originals and 35 new photographs were opened in their 18 distinct groups; every viewer thumbnail selected the correct source. Checks covered pointer cursor inheritance and unobstructed image hit targets, Enter/Space activation, keyboard focus outlines, next/previous/arrow navigation, simulated swipe, single-photo disabled navigation, Escape/close and original-trigger focus restoration. Promotions passed pointer, full-poster contain scaling, both keyboard activations, close/focus and preserved 45/55 desktop/mobile stacking. Cursor checks with intentionally delayed image responses passed before and after decode on both pages. Navigation and WhatsApp passed at all widths with existing collision hiding respected.

Gallery, testimonial viewer, FAQ grouping and Products passed at 320/1440px; actual homepage anchors and mobile tap/swipe passed separately. All eight BX selectors/sixteen images passed at 320/1440px. Homepage, Promotions HTML, Products, Product Details, Gallery, FAQs, product data and both shared viewer/init scripts match the starting HEAD byte-for-byte after line-ending normalization. Historical image markup/alt text, titles and product labels were preserved. All 1,530 local reference/fragment checks resolved; tested flows had no JavaScript errors, missing local responses or page overflow. Git diff whitespace checks passed. No image files were changed, added or deleted; no staging, commit, push or deployment was performed. Physical Windows cursor rendering, physical-device gestures and browsers other than Edge were not verified; a true stuck OS/browser wait cursor was not reproduced.


## Product image replacement, demonstration counts and verified ZIP cleanup (9 October 2026)

Four root uploads were moved, preserving every byte and their original 1254×1254px PNG dimensions. Match filenames and visible content: the Roller printing image shows a Kedai Kopi logo, the wooden printing image shows a Natura Plant & Decor logo, ordinary Wooden shows an unprinted outdoor blind, and PVC shows a grey roller blind above a sheltered doorway. `Bamboo.png` is outside this request and remains untouched. Older product photographs remain on disk; only the four new upload copies were organized, without conversion, recompression or duplication.

| Product ID | Original upload | Previous main image | New main/catalogue/viewer image |
|---|---|---|---|
| `roller-logo-printing` | `Roller indoor logo.png` | `assets/img/products/indoor/roller-logo-printing/roller-blinds-logo-printing-main.png` | `assets/img/products/indoor/roller-logo-printing/roller-blinds-logo-printing-upload.png` |
| `wooden-uv-logo-printing` | `Wooden logo.png` | `assets/img/products/outdoor/wooden-logo-printing/wooden-blinds-uv-logo-printing-main.png` | `assets/img/products/outdoor/wooden-logo-printing/wooden-blinds-logo-printing-upload.png` |
| `wooden-outdoor` | `Wooden.png` | `assets/img/products/outdoor/wooden/wooden-outdoor-blinds-main.png` | `assets/img/products/outdoor/wooden/wooden-outdoor-blinds-upload.png` |
| `pvc-outdoor` | `Pvc blinds.png` | `assets/img/products/outdoor/pvc/outdoor-pvc-blinds-main.png` | `assets/img/products/outdoor/pvc/pvc-outdoor-blinds-upload.png` |

Wooden and PVC catalogue cards previously used `assets/img/projects/completed/Saujana%20Impian.png` and `Sunway%20Eastwood.png`. Their `catalogueImage` overrides were removed. Both catalogue renderers now use the same `gallery[0]` as Product Details; existing static Wooden/PVC HTML fallbacks were also updated. The two printing cards are still inserted from centralized data, preserving their IDs, categories, descriptions and destinations. All four records use the actual original path for `src` and `thumbnail`, correct intrinsic dimensions and `fit:"contain"`; the existing square outer/inner card frames remain unchanged.

To replace an approved main photograph, put the unmodified file in the appropriate existing product folder, update `gallery[0]` in `assets/data/product-data.js` (src, thumbnail, alt, caption, width, height, mainImage and fit), and update an existing static Products fallback where present. Remove or update any `catalogueImage` override and any option mapping pointing at the old main photo. Inspect the resulting catalogue/main/full-image viewer rather than editing only one page. Do not delete old images without checking other references.

Ordinary `wooden-outdoor` now has exactly its one newly supplied main photograph. Its gallery references to earlier examples/printing variants, Standard finish/UV option list, optionImages, optionLabel and defaultOption were removed from that record; image files were retained. The renderer already hides option UI and thumbnail navigation when they are not needed, so no new special-case UI was added. The description was minimally shortened to “Wooden blinds for outdoor spaces.” to remove the obsolete printing-option claim. The independent `wooden-uv-logo-printing` product remains separate, with only its main photograph replaced. The legacy `uv-printing-wooden-outdoor` Product Details alias and catalogue hash mapping now target that separate printing product without an obsolete option parameter. Other product records, variants, specifications, descriptions and all BX data are unchanged.

### Demonstration sold-count configuration

`assets/data/sales-counts.js` contains `window.BLINDSXPERT_SALES_COUNTS`, loaded before `catalogue.js` on Home and Products. It is deliberately separate from factual product data. Both catalogues use the same `demoCounts` map, with a small `.product-sold-count` badge at the right of the `.product-meta-row`, opposite the category and above the title. Per the owner's local-preview request, badges show only “[count] Sold”; the visible Demo suffix was removed. All entries in `demoCounts`, including Roller 1K+ and Wooden Outdoor 3K+, remain temporary, unverified values. Removing the visible suffix does not verify the figures or authorize publishing them. Existing BEST SELLER badges remain controlled by their original product records. Product Details does not load this configuration or show sold badges.

- `enabled:false`: hide every sold-count badge on both pages after reload.
- `demo:true`: use the internally identified, unverified `demoCounts` map for the local preview. Badges display “[count] Sold” without a visible Demo suffix.
- `demo:false`: use only `verifiedCounts`. It is currently empty, so switching off demo mode automatically hides all unverified values.
- To publish approved counts, add only verified entries to `verifiedCounts`, then set `demo:false`. Omit/delete a product key to remove its badge. Store the count string without “Sold” (e.g. “900+”); the renderer supplies the suffix. Before public release, disable all badges or replace the entries with company-approved verified figures; removing visible Demo text for the local preview does not change their unverified status.

The required explanatory comment is in the file: “Temporary demonstration values only. Replace with verified BlindsXpert sales figures before public release.”

| Product ID | Local preview badge |
|---|---|
| `zebra` | 1.5K+ Sold |
| `roller` | 1K+ Sold |
| `roller-logo-printing` | 500+ Sold |
| `panel` | 800+ Sold |
| `venetian` | 1.2K+ Sold |
| `vertical` | 500+ Sold |
| `roman` | 800+ Sold |
| `dream` | 500+ Sold |
| `honeycomb` | 500+ Sold |
| `wooden-outdoor` | 3K+ Sold |
| `wooden-uv-logo-printing` | 800+ Sold |
| `bamboo-outdoor` | 1.2K+ Sold |
| `ziptrak-outdoor` | 500+ Sold |
| `pvc-outdoor` | 2K+ Sold |
| `awning-canopy` | 500+ Sold |
| `motorized` | 1.5K+ Sold |
| `skylight` | 500+ Sold |
| `curtain-hardware` | 2.5K+ Sold |

### ZIP cleanup

The short names `proj 2.zip` through `proj 6.zip` were not present. Their five original upload archives had the longer names below. Each was opened, passed its ZIP CRC/readability test, and had every non-directory entry compared byte-for-byte and by SHA-256 with the correctly named extracted project photo. No extra/unpreserved files were found, and the active HTML/JS/CSS contained no ZIP references. Only these five verified archives were deleted. All 35 extracted project PNGs and all 18 cards remain; `info.zip`, unrelated ZIPs and product assets were retained. The archives were already Git-ignored, so these deletions do not appear as tracked Git deletions.

| Deleted archive | Preserved photos |
|---|---|
| `Proj 2 - Hulu Langat-20261009T003529Z-1-001.zip` | 8 |
| `Proj 3 - Edgewood Residence-20261009T003532Z-1-001.zip` | 8 |
| `Proj 4 - Taman Putra Perdana-20261009T003542Z-1-001.zip` | 7 |
| `Proj 5 - Surau Al- Idris Rawang-20261009T003548Z-1-001.zip` | 8 |
| `Proj 6 - SK setiawangsa-20261009T003554Z-1-001.zip` | 4 |


Validation for this update: local headless Edge passed all nine widths (320, 360, 375, 390, 430, 768, 1024, 1366, 1440px). At each width checks covered 18 products and 18 matching Demo badges on each catalogue; all four new images at original resolution, square two-layer frames and contain fit; main/full-image source matching, Escape and focus restoration on all four Product Details pages; ordinary Wooden single-photo/no-option UI; equal card row heights; unchanged BEST SELLER membership; category filters, navigation, WhatsApp and no horizontal overflow. Separate reload tests confirmed central disable on both pages, demo-off hiding all unverified values, and only one explicitly configured verified value rendering without a Demo tag. The legacy printing alias resolves to the separate printing product.

All fourteen unrelated product records, including the full Zebra BX series/fabric data and other variants, match their pre-edit records. Four new PNGs match their root upload SHA-256 hashes; no image conversion occurred. Post-cleanup checks at 320/1440px opened all 48 project photographs (including every one of the 35 ZIP-sourced originals) across eighteen groups and opened the unchanged Promotions poster. The five archives' deletion report confirms 35 verified entries with no unpreserved files; info.zip and Bamboo.png remain. All eight BX selectors/sixteen images passed separately at 320/1440px. All 1,521 local references/fragments resolved; JavaScript syntax, git diff whitespace and tested browser error/missing-local-response checks passed. No staging, commit, push, enquiry sending or deployment was performed. Physical-device gestures, browsers other than Edge and external service availability were not verified. Sales figures are visibly marked demonstration values and remain unverified.


### Sold badge position update (9 October 2026)

The shared catalogue renderer now puts the existing category and sold badge in one `.product-meta-row` on both Home and Products. Flexbox aligns category left/count right, with a gap, a wrapping category and non-wrapping compact badge to avoid mobile overlap. The former below-title badge margin is removed. Product data, all count values, internal demo/enabled flags, suitable text, BEST SELLER badges, images and action links are unchanged. Visible badges contain no Demo word; the configuration and documentation continue identifying the local preview values as unverified. Disable them before publishing unless the company approves the figures.

Verification for the badge-position update passed in local Edge at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px: all 18 cards on both catalogues have unchanged values and a right-aligned badge opposite the category, no visible Demo suffix, no category/count overlap (including a long-text stress check), equal row heights, unchanged BEST SELLER membership, decoded images and preserved product/WhatsApp destinations. Actual product-link navigation passed for all four categories at 320/1440px. Central disable and demo-off hiding of unverified values still work. No horizontal overflow, JavaScript errors or missing local responses were observed; syntax and whitespace checks passed. No staging, commit, push or deployment was performed.


## Catalogue rating mockup and green sold badges (9 October 2026)

Both catalogues use the shared `.product-meta-row`: category left, `.product-meta-badges` right, with the rating first and the unchanged sold value second. Flexbox wraps the right-hand badge group or the whole group onto a new line when space is limited; neither badge overlays the photograph. Sold badges retain their compact 11px/600 typography, padding and 4px corners, with background `#E8F5E9` and text `#2E7D32`. The new rating badge shows one inline filled SVG star and “5.0”, with background `#FFF8E6`, star `#D49A16` and text `#8B6508`. No icon library, review count, reviewer identity, review snippet or review/rating schema was added. Screen readers identify the demo as “Sample rating: 5.0 out of 5”; the SVG itself is decorative.

The clearly marked temporary configuration is `window.BLINDSXPERT_SALES_COUNTS.rating` in `assets/data/sales-counts.js`. This sample 5.0 is an unverified local-mockup score, not a company/customer review fact. All sold values and their existing internal demo mode remain unchanged.

- `rating.enabled:false` disables ratings on both catalogues after reload, while keeping sold badges.
- `rating.demo:true` uses `rating.demoValue` (currently “5.0”) for the mockup. Edit that value only as a visual sample, not as a verified score.
- `rating.demo:false` uses only `rating.verifiedValues[productId]`. The map is empty by default, so this switch hides every unverified placeholder score.
- To replace samples with genuine approved scores, populate `rating.verifiedValues` with the existing product IDs and numeric scores from 0 to 5, then set `rating.demo:false`. Missing or invalid scores are omitted; displayed scores use one decimal place.
- The top-level `enabled:false` disables sold counts only. To hide all badges, also set `rating.enabled:false`. Disable unverified mockup badges before public deployment unless genuine approved figures replace them.

Product Details does not load this catalogue configuration. Product names, images, descriptions, variants, suitability, BEST SELLER flags, actions, filters and the entire Zebra BX data are unchanged.

Validation for this rating/colour update passed in local headless Edge at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px: all 18 cards on each catalogue have exact requested badge colours, one SVG star and 5.0, unchanged sold values, preserved names/suitability/BEST SELLER membership, decoded images and unchanged action destinations. Geometry checks covered category separation, right alignment, badge wrapping, no image/title overlap, long-category stress, consistent row heights and no page overflow. Category filters passed. Independent rating/sold disable settings, demo-off omission of unverified ratings and a configured verified-only score passed on both pages. Product data matches the starting HEAD; no review/rating schema was added. No JavaScript errors or missing local responses occurred; syntax and git diff whitespace checks passed. No staging, commit, push or deployment was performed.


## Shared Fabric & Colour Collection — current (12 October 2026)

This section supersedes the earlier four-series Zebra and eight-collection Roller configurator instructions. All seven configurators use the full Product Details container (1180px maximum), the shared 360px preview, approximate CSS swatches, selected code/name caption and specifications beneath. Honeycomb shows Product Specifications; the other six show Fabric Specifications. At 760px and below the preview and palette stack. No supplier photographs, per-colour placeholders or fabric thumbnails are rendered here. The original galleries, Photos & Examples and product options remain intact. Honeycomb's Product Details description was explicitly updated; its catalogue copy and other product descriptions are preserved.

### Authoritative data and product relationships

- `assets/data/fabric-catalogue.js` assigns `window.BLINDSXPERT_FABRIC_CATALOGUES`. It is the authoritative runtime source for fabric selections, colour codes/names, swatches, specifications and provenance. Keys are `zebra`, `roller`, `dream` and `honeycomb`.
- `assets/data/product-data.js` keeps existing product records and adds `fabricCatalogue` and `fabricSelectionMode` for the seven products. The old Roller `fabricVariants` duplication and Zebra four-series `visibleSeries` restriction were removed. Existing `series`/`documents` records remain historical source references; edits to them do not change these seven fabric configurators.
- Zebra uses `zebra` (8 collections, 44 colours); Dream uses `dream` (3 explicitly labelled code groups, 21 colours). Roller, Vertical, Panel and Roman all reference the same `roller` objects (15 collections, 89 colours); their colour/specification arrays are never copied per product.
- `product-variant` mode links Roller/Panel's existing Blackout/Sunscreen/Translucent options to the fabric variant. `fabric-variant` mode gives Vertical and Roman a separate fabric type layer, preserving Custom colour/Mix & match colour and Straight edge/Scallop edge. `flat` mode preserves Zebra/Dream product options independently.
- `assets/js/product-details.js` renders the shared configurator, validates URL selections, maintains focus, resets incompatible colours/fabrics and composes the existing WhatsApp draft. `assets/css/product-details.css` supplies the responsive layout and visible light-swatch borders. `product-details.html` loads product data, then fabric catalogue data, before the renderer.

A catalogue contains `collections` and optional `variants`. Each collection stores a stable `id`, display `name`, `variant` (or null), optional original `sourceSeries`, `fabrics`, `specs`, `source` and optional `reviewNotice`. Colour records contain original `code`, derived `displayCode`, exact `colourName` (empty if absent in the source), editable `swatchHex`, optional `closeUpImage` and `source`.

### Sources and naming

`info.zip` supplies every Zebra and Roller collection. Roller data is reused on Vertical, Panel and Roman at the owner's request, as fabric information only; it does not certify identical product hardware or installation suitability. `info2.zip` supplies the Dream sheets. Both original archives and all existing supplier assets remain untouched. Each collection records exact archive/path references for its colour and specification sheets; each colour additionally records its sample position and rotation for audit. Sample coordinates use a portrait-normalised image of width 563px and a 24px square region; rotation is stated in counter-clockwise degrees. These references are documentation, not rendered photo URLs.

Convert only a leading SP prefix to BX for displayed codes. Preserve all suffixes and original source codes, including 5406R. RITZ, EC, CINMA, VENUS, CARMEN, MAX, AURORA, SUNSET, URBAN STRIPE and A1 source codes remain unchanged; Dream display prefixes are converted as described below. Do not infer names or variant classifications from numeric codes. Aurora has no printed colour names. Dream sheets lack collection names; A1-1xx/A1-2xx/A1-8xx colours are explicit website code groups derived from the separate sheets, not invented supplier brands.

SP 210 follows its TRANSLUCENT ZIP folder in this expanded catalogue even though its sheet lists 5% openness; this replaces the earlier requested Sunscreen placement. Carmen, Econo and Urban Stripe have null variants and appear under “Collections awaiting variant confirmation.” Choosing one clears Roller/Panel's fabric-type option and omits that variant from the draft, while retaining independent Roman/Vertical product options. Once supplier classification is confirmed, set its `variant` to an existing verified variant, update source notes and retest. Do not create an additional product variant by guessing.

### Editing swatches and future close-ups

Edit the colour's `swatchHex` using a six-digit HEX string such as `#RRGGBB`; null retains a neutral fallback. Current values use median RGB from manually identified supplier sample regions, visually reviewed for the correct fabric. They approximate the photographed colour under its lighting, not certified fabric colour. Keep the approximation notice and visible border on pale swatches. Do not derive colours from numeric codes or apply one arbitrary HEX across a collection.

For future approved close-ups, put files under `assets/img/products/fabric-collections/<catalogue>/<collection-id>/`, and set the exact case-sensitive project-relative `closeUpImage` for that colour. A shared Roller close-up then appears for every product referencing that fabric. If a product needs its own photograph, add `closeUpImages: {roman: "assets/...", panel: "assets/..."}`; the renderer checks the active product's path before falling back to `closeUpImage`. The colour belongs to its collection/variant, so validate each product/variant/collection/code mapping. Leave null when unavailable. Load failures keep the single placeholder, while successful images use contain sizing and late previous-colour loads cannot replace the current preview. Do not map catalogue or specification photographs into the close-up fields.

### Updating specifications and enquiries

Edit only verified label/value pairs in the selected collection's `specs`. Preserve source values, original units and terminology; omit empty or unreadable values and record missing information in `source.notes`. Use `reviewNotice` for customer-relevant uncertainty. Empty specifications display a concise pending message. Shared Roller edits apply to all four dependent products. Do not infer hardware dimensions or finished blind widths from fabric widths.

Known source questions are documented in `FABRIC-COLLECTION-INTEGRATION-REPORT.md`: Zebra's SP 402 / BL CREAM line break, missing weight mass units in three Zebra sheets, SP 210 classification mismatch, Sunset composition totalling 50%, Urban Stripe's unusual strength units, and Dream's printed 40cm±1cm thickness/light-fastness percentages. No values were silently corrected or extrapolated. SP 200 provides no weight/thickness for its listed 3.0m width.

The draft includes Product, the existing product option when selected, Fabric series and Colour. Separate Roman/Vertical fabric classification is included as Fabric type; unclassified collections explicitly state that supplier confirmation is pending. Switching products resets fabric/colour state, and cross-variant or cross-fabric URL parameters fall back to valid choices. Original customer fields and WhatsApp destination remain unchanged. No message is sent automatically.

### Validation

After catalogue changes, test all seven products at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px. Check every code/specification mapping, coloured swatch, first-colour resets, one preview, keyboard focus/Enter/Space/Tab, touch, URL combinations and intercepted WhatsApp drafts. Inspect overflow, missing images, browser errors and unrelated product regressions. Stub external requests during local testing to avoid incrementing the live counter or opening real enquiries. Current results are recorded in `FABRIC-COLLECTION-INTEGRATION-REPORT.md`.

## Catalogue image, shared cards and Honeycomb (12 October 2026)

### Motorized catalogue image

The supplied root `motorizedblinds.png` is the central Motorized `catalogueImage` in `assets/data/product-data.js`. It shows motorized roller blinds with a remote and uses cover sizing within the existing square catalogue frame. `assets/js/catalogue.js` resolves the same override on Home and Products; the static Motorized Products-card fallback also references that file. The Product Details gallery is unchanged. Keep the source file intact; replace this catalogue override without changing gallery records.

Honeycomb's new Product Details overview is separated from its existing Home-card text through `catalogueDescription`, which the Home renderer prefers. The Products-card copy stays unchanged.

### One full-width selector style

`assets/css/product-details.css` defines one responsive Grid/card system for `.pd-series-grid`, `.pd-catalogue-selector` and `.pd-roller-variants`, including all current and legacy fabric selectors. Cards have 104px height, 16px padding (12px at 340px and below), 8px radius, 16px title type, 13px secondary type, 12px gaps, common hover and red selected/focus states. Grid uses auto-fit with a 240px minimum: normally four columns in the 1180px container, three/two as space narrows, then two below 760px. There is no 900px cap, fixed four-column limit or horizontal scrolling. Variant, size, collection, type, palette and specification sections inherit full container alignment. The preview alone remains capped at 360px.

### Honeycomb source and selection structure

Honeycomb uses `fabricCatalogue: "honeycomb"`, `fabricSelectionMode: "cell-size"`, and `productSpecs` on the Honeycomb product record. The central catalogue has `sizes: ["25mm", "26mm", "38mm"]` and four supplier collection records with `cellSize`, `types`, source references and minimal verified collection specifications. Types contain their own colour arrays; `provisional` marks the Honeycomb-38 Semi-Blackout group. No extra supplier fabric series are invented.

| Supplier collection | Cell size | Type groups and colour counts |
|---|---|---|
| FC Honeycomb | 25mm | 16 FC codes; no type printed |
| FC Honeycomb | 38mm | 8 FC codes; no type printed |
| Honeycomb-26 | 26mm | Semi-Blackout 3; Blackout 7; Mesh / Sunscreen 2 |
| Honeycomb-38 | 38mm | Semi-Blackout 7 (provisional); Mesh / Sunscreen 1 |

The four colour photographs are in `C:/Users/ahmad/Downloads/WhatsApp Unknown 2026-10-12 at 09.49.40.zip`; two overview sheets are in the same Downloads folder's `WhatsApp Unknown 2026-10-12 at 09.27.40.zip`. These archives were read in place and are not moved, overwritten or embedded on the website. Every Honeycomb colour records its exact archive entry and sampled fabric position. Keep these source ZIPs accessible for future audits.

25mm directly shows FC colours; 26mm directly shows the three real fabric-type groups. Single collections are labelled rather than adding redundant selectable series. At 38mm, choose FC Honeycomb or Honeycomb-38 before the applicable types/colours. FC type names are absent and are omitted from enquiries. Changing size/collection/type resets incompatible choices. Duplicate S/SF/W code strings belong to independent size/collection/type records and must never be deduplicated by code alone.

`renderHoneycombConfigurator`, `chooseCellSize`, `chooseHoneycombType` and the shared colour renderer in `assets/js/product-details.js` handle selections, focus and enquiries. Honeycomb links use `cellSize`, `series`, `fabricType` and `colour` parameters; invalid cross-size/type selections fall back to a compatible first colour. The draft includes Product, Cell Size, Collection, applicable Fabric Type and selected Colour, then the original customer fields. Product switching clears Honeycomb parameters and state.

Honeycomb-38 SF codes remain provisionally under Semi-Blackout as printed; no Blackout group is created from the prefix. The FC 38mm photo's header says 25mm while each sample label says 38mm; the sample labels and owner mapping govern its 38mm assignment, with the conflict recorded for supplier review. No colour names are printed, so these records keep empty names and display verified codes only.

### Honeycomb information and close-up mapping

Product Details uses the qualified Cellular Blinds overview and features requested by the owner. Product Specifications lists verified product/design/cell-size information and the selected collection/type's colour count. Material composition, weight, maximum width, thickness and installation limits remain pending. Numerical energy-saving, UV-blocking, temperature-difference and colour-fastness performance claims are not published because applicable products and test conditions are unverified.

Honeycomb uses CSS swatches plus one shared preview placeholder. All 44 colour records have individually sampled approximate HEX values; FC-16 is `#141414`, from the very dark sample. Existing 154 Zebra/Roller/Dream swatches were re-sampled and visually audited without requiring HEX changes. Shared Roller users inherit the same values automatically. Honeycomb strips use 20px × 6px sample regions at normalised width 563px to avoid paper labels, glare and edges; older samples retain their 24px square regions. These are photographic approximations, not certified fabric colours.

Add future close-ups to `assets/img/products/fabric-collections/honeycomb/<collection-id>/<type-id>/<code>.<extension>` and set the exact `closeUpImage` on that type's colour record. Keep the size, collection and type in the mapping when S/SF/W codes repeat. Leave null for absent photos. Never use supplier catalogue photographs as close-up placeholders. Existing shared per-product `closeUpImages` overrides still work.

### Dream displayed BX codes

Only Dream display labels convert an actual leading `A1` prefix to `BX`, preserving the separator: `A1-101` → `BX-101`; `A1 101` → `BX 101`. The three visible groups are now BX-1xx/BX-2xx/BX-8xx colours. Their stable IDs, original `code`, `sourceName`, archive references and image paths retain A1 for traceability. The selected caption, swatches and WhatsApp draft use `displayCode`. Original A1 colour parameters still resolve to the same record. Do not do global string replacement across files or other product data.

See `CATALOGUE-HONEYCOMB-UPDATE-REPORT.md` for all counts, renamed Dream codes, source questions, modified files and current verification results.

## Roller photographs, selector steps and new products (12 October 2026 — current)

This section supersedes the earlier instructions that all Roller colours use placeholders and all selectors use identical cards. `assets/data/fabric-catalogue.js` remains the complete supplier source (89 Roller colours, 15 collections). Do not remove its missing-photo records: Panel, Vertical and Roman depend on the full source.

### Roller-only availability and future photographs

`assets/data/roller-colour-images.js` assigns `window.BLINDSXPERT_ROLLER_IMAGES`. Its `collections` object is keyed by the stable supplier-series ID. Each entry has the latest supplied-folder `variant` and `colours` keyed by the **original supplier code**, not an approximate colour name. Each mapped colour records `src`, Roller-specific `swatchHex`, original `source`, sample method and source/web dimensions. The Product Details page loads this mapping after the complete supplier catalogue and before the renderer.

The renderer builds one stable derived Roller view: include only mapped series/colours, resolve their sparse photograph/HEX records, and apply the supplied-folder category. Nothing is mutated in the shared supplier catalogue. Other Roller-source users retain all 89 choices and their original image behaviour. Current Roller view has 12 series/47 colours: Blackout 16, Sunscreen 16, Translucent 15. BX 210 and Econo follow Sunscreen/Translucent in the new folder only on this view. BX 110, Carmen and Urban Stripe are hidden only for Roller. Unavailable codes are rejected by URL lookup and cannot enter enquiry state.

To add an approved future image, verify its series and original code against supplier information first; add verified new supplier data only when actually supported. Export an uncropped, visually checked web derivative under `assets/img/products/roller-blinds/<variant>/<series-id>/<code>.webp` and retain the original source. Add the exact case-sensitive **relative** `src`, representative photographic `swatchHex` and source reference to that code's mapping. For code aliases, preserve the original supplier code key (e.g. RITZ 3001 rather than guessing a new code from the BX-labelled filename). Never match solely by colour appearance. Keep filenames/folders ASCII and consistently lower-case where practical; verify casing for GitHub Pages. Re-test image decoding, exact preview selection, rapid image changes, resets, unavailable deep links and enquiry drafts.

Original files remain in `ROLLER BLINDS/`; all 50 were inspected. The 47 approved files were exported with contain-preserving dimensions, at maximum 1200px, WebP quality 92. SUNSHUT 01/02/05 have no verified supplier-catalogue match and remain excluded, with original files intact. Confirm the new supplier series/codes before adding them; do not silently merge SUNSHUT with Sunset. The complete mapping, hidden codes and source questions are in `ROLLER-IMAGES-PRODUCTS-UPDATE-REPORT.md`.

The shared preview stays capped at 360px and square, using contain sizing. Roller valid selections show one real photograph and a loading status until decoded; “photo pending” placeholders are retained for other products. Existing per-product future photo overrides remain available.

### Distinct variant and series controls

The `.pd-stepped-fabrics` section is used by Roller, Panel, Vertical and Roman. Step headings identify fabric variant, supplier series and colour. `.pd-variant-button` is tinted, taller (112px desktop/88px narrow mobile), with stronger type and an active red accent; series cards in `.pd-catalogue-selector` are compact white 80px controls. Grid remains aligned to the full 1180px container and wraps without horizontal scrolling or a 900px cap. The preview/palette/specification layout is otherwise unchanged. Roman's Edge style and Vertical's Colour arrangement remain separate original product options.

Known series cards are filtered by the active fabric variant. Panel/Vertical/Roman's originally unclassified supplier collections remain accessible through “Browse collections awaiting variant confirmation”; that view does not invent a category and enquiries mark classification pending. Normal variant views therefore do not mix unclassified cards into the selected variant. Buttons preserve Enter/Space/Tab, pressed states, focus retention and touch behaviour.

### Motorized shared image

`motorizedblinds.png` is referenced in place by the Motorized catalogue override and main gallery record; no duplicate copy is needed. Keep `mainImage: true` so the root-supplied image appears in the overview gallery, and retain thumbnail/lightbox dimensions, caption, alt and contain sizing. The old Motorized examples are preserved.

### Insect Screen and Tinted placeholders

New central `assets/data/product-data.js` entries use IDs `insect-screen` and `tinted`, titles Insect Screen/Tinted, category `other`, empty media/options/specifications, `contentPending: true`, `placeholderOnly: true` and `catalogueBadges: false`. Home and Products use the existing square branded placeholder with the product name, then link to the shared Product Details template. The template shows “Product information coming soon.” and the normal enquiry form without fabricated gallery/specification content. Both catalogue filter counts include the new entries. Products now includes the same accessible count status as Home.

Do not enable ratings/sales/BEST SELLER unless verified values and authorization are supplied. `catalogueBadges: false` specifically opts these records out of the global demonstration badges. The shared card component skips an empty suitability list instead of creating a blank claim.

When approved content arrives, place its image under an organised product asset folder and set the product's `catalogueImage`/`gallery` mapping, with verified alt/caption/dimensions; remove `placeholderOnly` when the detail content is ready. Add only verified descriptions, options and specifications. Keep the existing `INSECT SCREEN/` and `TINTED/` source folders intact; their photographs were intentionally not added under the current placeholder-only request. Re-test both catalogue cards, filters/count announcements, links and enquiry values at all required widths.


## Enhanced Zebra and shared Roller photographs — 13 October 2026

The complete supplier catalogue remains in `assets/data/fabric-catalogue.js`. Visible catalogues are derived in `assets/js/product-details.js`; unavailable colours and empty series never enter selection state, URL selection, or enquiry drafts. Original source ZIPs and supplier records are retained.

Zebra source: `Zebra_Blinds_Enhanced_All_26.zip` (the supplied filename differs from the requested All_26S name). All 26 JPG files were inspected, including their subfolders. 22 verified images are stored without renaming or recompression in `assets/img/products/zebra-blinds/colours/<series>/`. `assets/data/zebra-colour-images.js` records each source path, supplier-record key, photograph path, approximate HEX and central-texture median sampling method. The four conflicting files are recorded in its unmatched list and remain excluded.

| Zebra series | Available displayed codes | Hidden original codes |
|---|---|---|
| BX 101Z | BX 107Z, BX 112Z, BX 120Z | BX 102Z, BX 116Z, BX 121Z, BX 122Z, BX 123Z, BX 125Z |
| BX 201Z | BX 204Z, BX 205Z | BX 207Z, BX 203Z, BX 206Z |
| BX 301Z | Hidden series | BX 301Z, BX 304Z, BX 305Z, BX 308Z, BX 309Z, BX 310Z |
| BX 401BL | BX 402BL, BX 403BL, BX 404BL, BX 411BL | BX 412BL, BX 413BL |
| BX 501BL | BX 501BL, BX 502BL, BX 503BL, BX 505BL | BX 504BL, BX 506BL, BX 508BL |
| BX 601BL | BX 601BL, BX 603BL, BX 604BL, BX 605BL | BX 606BL |
| BX 701BL | BX 701BL, BX 704BL | BX 703BL |
| BX 801BL | BX 801BL, BX 802BL, BX 803BL | None |

BX 301Z is hidden entirely. 22 of 44 original Zebra colours are visible; 22 are hidden. The SP 402 record was transcribed as code SP 402 and name BL CREAM. Its printed supplier label SP 402 BL CREAM and supplied SP402BL Cream photograph verify the visible BX 402BL / CREAM correction; only the derived display is corrected. Original data remains intact.

Unmatched files and catalogue conflicts:

- SP112Z Pink.jpg: supplier SP 112Z is BLACK; PINK is SP 116Z. No reassignment from appearance.
- SP201Z Cream.jpg: supplier CREAM is SP 207Z; no SP 201Z colour record.
- SP201Z Grey.jpg: supplier GREY is SP 203Z; no SP 201Z colour record.
- SP703BL Cream.jpg: supplier SP 703BL is BROWN, not CREAM.

Roller, Vertical, Panel and Roman resolve the same derived catalogue using the unchanged `assets/data/roller-colour-images.js`: 47 image-backed colours across 12 series, with 42 of 89 supplier colours hidden for each product. BX 110, Carmen and Urban Stripe are hidden entirely. No Roller image, swatch or classification assignment was changed, and no Roller assets were copied.

| Shared series | Available displayed codes | Hidden codes for Vertical, Panel and Roman (also already hidden for Roller) |
|---|---|---|
| Cinma | CINMA 01, CINMA 02, CINMA 03, CINMA 04 | None |
| Venus | VENUS 01, VENUS 02, VENUS 03, VENUS 04 | None |
| BX 5406 | BX 5406R-9, BX 5406R-2, BX 5406R-6, BX 5406R-12 | BX 5406R-5, BX 5406R-7, BX 5406R-10, BX 5406R-11, BX 5406R-13, BX 5406R-14 |
| BX 200 | BX 200-1, BX 200-2, BX 200-4, BX 200-5 | BX 200-3 |
| BX 210 | BX 210-6, BX 210-7, BX 210-8, BX 210-9 | BX 210-1, BX 210-2, BX 210-3, BX 210-4, BX 210-5 |
| BX 211 | BX 211-1, BX 211-2, BX 211-3, BX 211-4 | BX 211-5, BX 211-9 |
| BX 3000 | RITZ 3001, RITZ 3002, RITZ 3003, RITZ 3004 | RITZ 3011, RITZ 3012, RITZ 3013, RITZ 3014, RITZ 3015, RITZ 3016 |
| BX 4000 | BX 4000-1, BX 4000-4, BX 4000-5, BX 4000-6 | BX 4000-3, BX 4000-7 |
| BX 110 | Hidden series | BX 110-2, BX 110-4, BX 110-6 |
| Aurora | AURORA 02, AURORA 03, AURORA 04 | AURORA 01 |
| Max | MAX 01, MAX 02, MAX 03, MAX 04 | None |
| Sunset | SUNSET 01, SUNSET 02, SUNSET 03, SUNSET 04 | None |
| Carmen | Hidden series | CARMEN CM13, CARMEN CM23, CARMEN CM45, CARMEN CM74, CARMEN CM87, CARMEN CM98 |
| Econo | EC 4037, EC 4083, EC 4093, EC 4061 | EC 4022, EC 4057, EC 4013, EC 4032 |
| Urban Stripe | Hidden series | URBAN STRIPE US14, URBAN STRIPE US23, URBAN STRIPE US34, URBAN STRIPE US48, URBAN STRIPE US88, URBAN STRIPE US97 |

Product variants are controlled separately by `fabricSelectionMode` in product-data.js. Roller and Panel link Blackout / Sunscreen / Translucent product options to fabric variants. Vertical retains Mix & match colour / Custom colour, and Roman retains Straight edge / Scallop edge independently of fabric variants. Verified image-map classifications determine available fabric series; unclassified supplier collections remain in the explicit pending-classification browser. Never infer a classification or replace a product's options with Roller options.

To add future Zebra images, verify both series and printed colour code/name against the source catalogue, place the photograph under the matching series folder, and add its original supplier-record key to zebra-colour-images.js. Sample representative fabric texture away from labels, borders, glare and shadows, then inspect the swatch visually. Keep the BX display suffix intact. To restore a hidden colour or series, supply and verify the missing photograph and add its mapping; the derived selector automatically restores it. Resolve the four conflicts with authoritative supplier mapping before restoring them. Do not bypass the availability filter or use a generic photograph.

To add a shared Roller image, follow the same verification process in roller-colour-images.js; its path and colour automatically apply to all four products. Preserve original supplier data and the explicit variant associations. Relative paths, exact filename casing and existing source filenames are retained. Spaces in preserved Zebra filenames are URL-encoded by the browser and work under a GitHub Pages subdirectory.

The preview uses the existing single square frame, maximum width 360px and object-fit: contain. Specifications, full-width selectors, red selection borders, gallery assets, keyboard buttons and touch support continue using the existing design system.

Validation: all ten requested widths passed, with 2,100 selected-colour checks and intercepted WhatsApp drafts. Specifications, option preservation, keyboard/focus, emulated touch, 20 product pages and GitHub Pages subdirectory paths were checked. See ZEBRA-SHARED-FABRIC-UPDATE-REPORT.md for the complete inventory and testing limits.


## Insect Screen and Tinted — 13 October 2026

Both products remain in Other, without sold counts, ratings or BEST SELLER badges. Product overview, catalogueImage and gallery records are maintained in assets/data/product-data.js. The two completed dynamic cards use catalogueDynamic; catalogue.js inserts them once on the Products page and uses the same records on Homepage. Main images are the explicitly supplied root Insect Screen.png and Tinted Glass.png, kept intact and copied byte-for-byte to:

- assets/img/products/insect-screen/main/insect-screen.png
- assets/img/products/tinted/main/tinted.png

Each path supplies Homepage, Products and the main Product Details image using the existing square frames and cover fitting. These are approved product images, not claimed completed projects. Source originals remain in the project root. All other product records, galleries and images are preserved.

Supplier details are in assets/data/other-product-details.js, loaded only by product-details.html. assets/js/product-details.js handles product-specific selectors through detailSelector (screen / film) without forcing either product into the fabric catalogue.

### Insect Screen

Four systems: Magnet Insect Screen; Chain Type Sliding Insect Screen; Cord Type Sliding Insect Screen; Roll-Up Insect Screen. Selection uses Screen Type → Applicable Mesh / Colour → Specifications, four keyboard-accessible cards, and full-width responsive layout. Enquiries include only the selected system's verified material and finish. Magnet and Roll-Up have no verified selectable material/finish and therefore add neither value to the enquiry.

Sliding-only mesh: 100% Polyester; Dark Grey; Water Repellency Grade 4; Oil Repellency Grade 6; Colour Fastness to Light Grade 6; 20 × 20 normal mesh count; supplier declaration “Free Formaldehyde.” No testing standard is invented. Source: INSECT SCREEN/WhatsApp Image 2026-10-12 at 15.15.07.jpeg. Applied to Chain and Cord only.

### Chain Type Sliding Insect Screen

- Top Rail: Height ±49.67mm; Width ±38.8mm; Thickness ±1.79mm; Alloy 6063 T5 (Powder Coated)
- Vertical Rail: Width ±38.75mm; Gap (Outer) ±31.54mm; Gap (Inner) ±29.11mm; Thickness ±1.12mm; Alloy 6063 T5 (Powder Coated)
- Pull Rail: Width ±56.58mm; Gap (Outer) ±32.39mm; Gap (Inner) ±34.80mm; Thickness ±1.12mm; Alloy 6063 T5 (Powder Coated)

Accessories: Top Rail End Cap, Chain, Bottom PVC Guide Tape, Installation Bracket, Vertical Rail End Cap, Pull Rod End Cap.

### Cord Type Sliding Insect Screen

- Top Rail (45mm): Height ±45mm; Width (Outer) ±33.91mm; Width (Inner) ±26.85mm; Thickness ±1.50mm; Alloy 6063 T5 (Powder Coated)
- Top Rail (40mm): Height ±40mm; Width (Outer) ±33.91mm; Width (Inner) ±26.85mm; Thickness ±1.50mm; Alloy 6063 T5 (Powder Coated)
- Bottom Rail: Height ±14.95mm; Width (Outer) ±37.97mm; Width (Inner) ±25.48mm; Thickness ±1.50mm; Alloy 6063 T5 (Powder Coated)
- Vertical Rail: Width ±23.2mm; Gap (Outer) ±25.70mm; Gap (Inner) ±15.15mm; Thickness ±1.52mm; Alloy 6063 T5 (Powder Coated)
- Pull Rail: Width ±45.22mm; Gap (Outer) ±24.87mm; Gap (Inner) ±30.75mm; Thickness ±1.52mm; Alloy 6063 T5 (Powder Coated)

Accessories: Top Rail End Cap, PVC Strip, Vertical Rail End Cap, Pull Rail End Cap, Bottom Rail End Cap, Installation Bracket, Side Guide End Cap.

The two cord top-rail profiles are separate supplier tables, not interchangeable values. Chain Pull Rail has inner gap ±34.80mm and outer ±32.39mm as printed; the unusual ordering is flagged for confirmation.

Additional glass-yarn reference: PVC-coated glass yarn; mesh 18 × 16; Anthracite Charcoal; widths 24–92 inches. Kept separate with system applicability pending, never submitted as a selected option. Additional unheaded aluminium hardware is shown in a separate reference disclosure, with obscured head-rail weight omitted. Adjacent-page context is not treated as a verified Roll-Up hardware assignment. Finish abbreviations MB, NA and MF remain uninterpreted.

Clip-On Extension Frame is an accessory, not a fifth screen type. Compatibility needs confirmation. The original frame photo and maintenance/hardware pages contain historical prices; those scans remain local and are not exposed on the public page. No old price-list numbers are published.

Features are system-specific: magnet fit/removal; chain removal, washing, vacuum cleaning and water resistance from its labelled maintenance page; sliding polyester properties for Chain/Cord; roll-down insect barrier and roll-up window access from the Roll-Up page. No universal washable/removable claim is made.

Six price-free reference photographs are stored under assets/img/products/insect-screen/reference/: magnet-system, chain-system, cord-system, roll-up-system, sliding-mesh and glass-yarn-mesh JPEGs. Four system scans appear in the gallery with supplier-example/technical captions and contain fitting. The sliding-mesh label is available in a disclosure for the two sliding systems. The additional glass-yarn reference is displayed separately. Supplier originals and all nine original source files are untouched.

### Tinted films

47 TINTED photographs inspected. 29 primary labelled sample photographs map confidently to 29 selectable films. Nine alternate photographs carry readable matching codes and remain unused to avoid redundant options/previews. Nine other photos have no fully readable code association and are excluded. No unlabelled sample is linked by visual similarity or timestamp alone. No film groups are inferred.

The film object stores id, code, shade, image (src/alt/caption), specs with exact metric names, source and notes. Preview and per-card sample use that film's own labelled photograph. One large contain-fit square preview remains at maximum 360px; it updates with the selected film, specifications, URL film parameter and WhatsApp draft. The shared viewer opens the full supplier sample/label. Originals remain in TINTED, with verified primary copies under assets/img/products/tinted/samples/.

2ply/3ply is labelled construction, not mil thickness. Safety 800 and Safety 400 labels explicitly state 8mil and 4mil. UV400 6590's handwritten IRR 90% is kept under IRR only, with no TSER inference or invented measurement definition. RS 15 USA actually prints 17% VLT; its code does not override that figure. Film-specific VLT, UVR and TSER are not treated as equivalent metrics, and no night-privacy promise is made.

| Film code | Verified shade | Verified label figures | Primary source |
|---|---|---|---|
| UV400 6590 | Nature Green | Visible Light Transmittance (VLT): 65%; Ultraviolet Rejected (UVR): 100%; Labelled construction: 2ply; IRR (handwritten label): 90% | TINTED/WhatsApp Image 2026-10-12 at 15.15.08 (1).jpeg |
| DBK 35 USA | Black | Visible Light Transmittance (VLT): 35%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 60% | TINTED/WhatsApp Image 2026-10-12 at 15.15.09 (1).jpeg |
| DBK 50 USA | Black | Visible Light Transmittance (VLT): 50%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 55% | TINTED/WhatsApp Image 2026-10-12 at 15.15.09.jpeg |
| DBK 05 USA | Black | Visible Light Transmittance (VLT): 05%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 65% | TINTED/WhatsApp Image 2026-10-12 at 15.15.10 (2).jpeg |
| DBK 20 USA | Black | Visible Light Transmittance (VLT): 20%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 63% | TINTED/WhatsApp Image 2026-10-12 at 15.15.10.jpeg |
| RS 50 USA | Silver | Visible Light Transmittance (VLT): 50%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 60% | TINTED/WhatsApp Image 2026-10-12 at 15.15.13 (1).jpeg |
| Blackout USA | Black | Visible Light Transmittance (VLT): 00%; Ultraviolet Rejected (UVR): 99%; Total Solar Energy Rejected (TSER): 95% | TINTED/WhatsApp Image 2026-10-12 at 15.15.13.jpeg |
| RS 15 USA | Silver | Visible Light Transmittance (VLT): 17%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 85% | TINTED/WhatsApp Image 2026-10-12 at 15.15.14 (1).jpeg |
| NSN 20 | Light Grey | Visible Light Transmittance (VLT): 20%; Ultraviolet Rejected (UVR): 100%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 75% | TINTED/WhatsApp Image 2026-10-12 at 15.15.15 (1).jpeg |
| BL6018 USA | Light Blue | Visible Light Transmittance (VLT): 38%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 56% | TINTED/WhatsApp Image 2026-10-12 at 15.15.15 (2).jpeg |
| RS 05 USA | Silver | Visible Light Transmittance (VLT): 05%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 95% | TINTED/WhatsApp Image 2026-10-12 at 15.15.15.jpeg |
| GN50 USA | Light Green | Visible Light Transmittance (VLT): 30%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 60% | TINTED/WhatsApp Image 2026-10-12 at 15.15.16.jpeg |
| GL8055 USA | Light Gold | Visible Light Transmittance (VLT): 50%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 65% | TINTED/WhatsApp Image 2026-10-12 at 15.15.18.jpeg |
| BZ5048 USA | Light Brown | Visible Light Transmittance (VLT): 30%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 67% | TINTED/WhatsApp Image 2026-10-12 at 15.15.21.jpeg |
| 3610 USA | Silver (out) / Grey (in) | Visible Light Transmittance (VLT): 10%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 80% | TINTED/WhatsApp Image 2026-10-12 at 15.15.22.jpeg |
| 4050 USA | Blue (out) / Silver (in) | Visible Light Transmittance (VLT): 12%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 80% | TINTED/WhatsApp Image 2026-10-12 at 15.15.41.jpeg |
| 4061 USA | Green (out) / Silver (in) | Visible Light Transmittance (VLT): 12%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 80% | TINTED/WhatsApp Image 2026-10-12 at 15.15.42 (1).jpeg |
| 3630 USA | Gold (out) / Silver (in) | Visible Light Transmittance (VLT): 15%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 80% | TINTED/WhatsApp Image 2026-10-12 at 15.15.43.jpeg |
| 3510 USA | Brown (out) / Silver (in) | Visible Light Transmittance (VLT): 12%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 2ply; Total Solar Energy Rejected (TSER): 80% | TINTED/WhatsApp Image 2026-10-12 at 15.15.44.jpeg |
| 5038 USA | Dark Grey | Visible Light Transmittance (VLT): 10%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.45 (1).jpeg |
| 5035 USA | Dark Green | Visible Light Transmittance (VLT): 12%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.46.jpeg |
| 5030 USA | Dark Gold | Visible Light Transmittance (VLT): 12%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.47.jpeg |
| 6035 USA | Blue | Visible Light Transmittance (VLT): 15%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.49.jpeg |
| 6036 USA | Green | Visible Light Transmittance (VLT): 10%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.50 (1).jpeg |
| 6037 USA | Bronze | Visible Light Transmittance (VLT): 15%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.51.jpeg |
| 7035 USA | Blue (out) / Black (in) | Visible Light Transmittance (VLT): 5%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.52.jpeg |
| 7036 USA | Green (out) / Black (in) | Visible Light Transmittance (VLT): 5%; Ultraviolet Rejected (UVR): 99%; Labelled construction: 3ply; Total Solar Energy Rejected (TSER): 86% | TINTED/WhatsApp Image 2026-10-12 at 15.15.53.jpeg |
| Safety 800 | Clear Safety Film | Visible Light Transmittance (VLT): 90%; Ultraviolet Rejected (UVR): 99%; Total Solar Energy Rejected (TSER): 19%; Film thickness: 8mil | TINTED/WhatsApp Image 2026-10-12 at 15.15.54 (1).jpeg |
| Safety 400 | Clear Safety Film | Visible Light Transmittance (VLT): 90%; Ultraviolet Rejected (UVR): 99%; Total Solar Energy Rejected (TSER): 19%; Film thickness: 4mil | TINTED/WhatsApp Image 2026-10-12 at 15.15.54.jpeg |

### Unused / uncertain film photographs

- `TINTED/WhatsApp Image 2026-10-12 at 15.15.08 (2).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.10 (1).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.11.jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.14 (2).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.14.jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.21 (1).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.40.jpeg`: Alternate photograph with same readable code: 4050 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.42 (2).jpeg`: Alternate photograph with same readable code: 3630 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.42.jpeg`: Alternate photograph with same readable code: 4061 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.43 (1).jpeg`: Alternate photograph with same readable code: 3510 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.45 (2).jpeg`: Alternate photograph with same readable code: 5035 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.45.jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.46 (1).jpeg`: Alternate photograph with same readable code: 5030 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.48.jpeg`: Alternate photograph with same readable code: 6035 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.50 (2).jpeg`: Alternate photograph with same readable code: 6037 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.50.jpeg`: Alternate photograph with same readable code: 6036 USA; primary verified photograph already used.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.51 (1).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.
- `TINTED/WhatsApp Image 2026-10-12 at 15.15.52 (1).jpeg`: No fully readable code/shade association; glare, paper occlusion or unlabelled reverse sample. Excluded pending supplier confirmation.

### Future maintenance

To add a film, inspect the sample's own label; add a unique film record to other-product-details.js with a supplier-verified code/shade, exact metric names/values/units, one matched sample path and source provenance. Omit unreadable fields and add a review note. Preserve construction versus thickness. If no usable sample exists, omit image.src and the selector will show a clearly labelled technical-label placeholder. Do not create film groups or map a reverse image without authoritative evidence.

To replace a main image, update both catalogueImage and its mainImage gallery record in product-data.js to the same approved relative path. The shared catalogue renderer uses that record on both listing pages. Keep catalogueDynamic for these two cards and catalogueBadges: false; keep source originals. To add a screen option, update both its product options/defaultOption and the systems data, separating applicable mesh properties and per-system hardware. Keep additional unassigned materials out of selectable enquiries.

See INSECT-TINTED-IMPLEMENTATION-REPORT.md for testing and the final modified-file list.

Insect/Tinted validation: all ten requested widths passed, including 290 film selections, 40 screen selections, 330 intercepted WhatsApp drafts and 40 listing-card checks. Native keyboard/focus, emulated touch, galleries/lightboxes, category filters, 20 product pages and GitHub Pages-style /mockup1/ paths passed. See INSECT-TINTED-IMPLEMENTATION-REPORT.md for evidence and limits.


## Dream, Insect Screen and Tinted updates — 13 October 2026

This section supersedes the earlier Insect/Tinted badge opt-out and image-gallery notes. All updates are local; original assets and the full supplier fabric catalogue are retained. Pre-existing user deletions of nine root INSECT SCREEN WhatsApp files were observed and not reverted or repeated by this task; their existing website reference assets remain intact.

### Dream photographs and collections

DREAM BLINDS contains 13 files: 12 colour PNGs and Information.jpeg (a supplier features/operating reference, not a colour). All 12 colour filenames match both an existing BX display code and supplier colour label in the three original info2.zip sheets. No unmatched Dream file remains; the information photo is classified separately. Every collection has four verified colours.

assets/data/dream-colour-images.js holds image availability, displayed collection names, source paths, approximate HEX samples and the supplier feature text. assets/js/product-details.js derives a filtered Dream catalogue without altering assets/data/fabric-catalogue.js. The 21 original supplier colour records/specifications remain intact; nine colours without a new photo are excluded from selectors, selection state and WhatsApp drafts.

The third existing record is actually BX-8xx, not BX-3xx. It is displayed as BX-300 as requested, while individual BX-801/812/813/814 identifiers remain unchanged. Stable original series IDs and A1 supplier keys are retained for links/provenance. Collection labels and enquiries now use BX-100 / BX-200 / BX-300; no colour identifier is replaced with a collection name.

| Displayed collection | Available colours | Hidden original colours |
|---|---|---|
| BX-100 (source a1-1xx) | BX-101 — White; BX-104 — Smoke Grey; BX-105 — Khaki; BX-109 — Ocean Blue | BX-102 — Beige; BX-103 — Apricot yellow; BX-111 — Ice Grey |
| BX-200 (source a1-2xx) | BX-202 — beige; BX-203 — Apricot yellow; BX-211 — Ice Grey; BX-212 — Black | BX-201 — White; BX-204 — Smoke Grey; BX-205 — Khaki |
| BX-300 (source a1-8xx) | BX-801 — White; BX-812 — Bone; BX-813 — Light brown; BX-814 — Silver grey | BX-802 — beige; BX-804 — Smoke Gray; BX-805 — Khaki |

| Collection | Supplier key | Original photograph | Public path | Approximate HEX |
|---|---|---|---|---|
| BX-100 | A1-101 | DREAM BLINDS/BX-101 WHITE.png | assets/img/products/dream-blinds/colours/bx-100/BX-101 WHITE.png | #A78F71 |
| BX-100 | A1-104 | DREAM BLINDS/BX-104 SMOKE GREY.png | assets/img/products/dream-blinds/colours/bx-100/BX-104 SMOKE GREY.png | #545659 |
| BX-100 | A1-105 | DREAM BLINDS/BX-105 KHAKI.png | assets/img/products/dream-blinds/colours/bx-100/BX-105 KHAKI.png | #8B857D |
| BX-100 | A1-109 | DREAM BLINDS/BX-109 OCEAN BLUE.png | assets/img/products/dream-blinds/colours/bx-100/BX-109 OCEAN BLUE.png | #50687E |
| BX-200 | A1-202 | DREAM BLINDS/BX-202 BEIGE.png | assets/img/products/dream-blinds/colours/bx-200/BX-202 BEIGE.png | #AEA9A0 |
| BX-200 | A1-203 | DREAM BLINDS/BX-203 APRICOT YELLOW.png | assets/img/products/dream-blinds/colours/bx-200/BX-203 APRICOT YELLOW.png | #A89D91 |
| BX-200 | A1-211 | DREAM BLINDS/BX-211 ICE GREY.png | assets/img/products/dream-blinds/colours/bx-200/BX-211 ICE GREY.png | #8C8B8D |
| BX-200 | A1-212 | DREAM BLINDS/BX-212 BLACK.png | assets/img/products/dream-blinds/colours/bx-200/BX-212 BLACK.png | #202224 |
| BX-300 | A1-801 | DREAM BLINDS/BX-801 WHITE.png | assets/img/products/dream-blinds/colours/bx-300/BX-801 WHITE.png | #A9A8A8 |
| BX-300 | A1-812 | DREAM BLINDS/BX-812 BONE.png | assets/img/products/dream-blinds/colours/bx-300/BX-812 BONE.png | #CCC1B2 |
| BX-300 | A1-813 | DREAM BLINDS/BX-813 LIGHT BROWN.png | assets/img/products/dream-blinds/colours/bx-300/BX-813 LIGHT BROWN.png | #ADA79C |
| BX-300 | A1-814 | DREAM BLINDS/BX-814 SILVER GREY.png | assets/img/products/dream-blinds/colours/bx-300/BX-814 SILVER GREY.png | #6B6D70 |

Images are copied without renaming, resizing or recompression below assets/img/products/dream-blinds/colours/. Each HEX is the median RGB of the central 35%–65% fabric region, after inspecting all photographs; sample areas contain fabric texture without printed labels/borders. Photographed colour appearance is approximate, and supplier colour names remain unchanged. The existing single contain-fit square preview remains at maximum 360px with red selection borders.

Dream information is copied to assets/img/products/dream-blinds/reference/information.jpeg. “Why Choose Dream Blinds?” presents Flexible Light Control, Custom Colour Combinations, Quality Fabric & Accessories, Easy Cleaning & Maintenance, Replaceable Components and Convenient Walk-Through. “How Dream Blinds Work” explains light/privacy adjustment, vane movement and walk-through access using the supplied reference and no invented mechanism or figures. A new Why Dream Blinds? jump link is shown only for Dream; all existing navigation, gallery, examples, supplier specifications and enquiries remain. Original unusual thickness/light-fastness units stay flagged for supplier review.

### Shared Products navigation

assets/js/site.js adds Insect Screen and Tinted once to each existing Other products dropdown group, before the shared click/focus/touch handlers bind. Exact links are product-details.html?product=insect-screen and product-details.html?product=tinted. Existing links/styling are preserved; deduplication allows later static entries without duplicating them. This one shared list applies to all 16 root HTML pages with a Products dropdown.

### Catalogue metadata and badges

Both records remain in Other and retain their approved catalogueImage paths. Suitable for: Insect Screen — Residential windows and door openings; Tinted — Residential and commercial glass windows. These scopes follow the supplier door/window examples and commercial/residential film labels. Existing card typography, frames, actions and hover styles are reused. Neither product is marked BEST SELLER.

The existing sales-counts.js configuration explicitly runs in demo mode. Both new records now allow configured badges through catalogueBadges: true and catalogueDemoLabels: true. The shared 5.0 demo rating appears in the existing gold badge with a visible Demo label and a demo title/accessible label. No verified review score is invented. Demo sold counts for both products are null, so no numerical sold badge is displayed. Verified sales and review values are also null. All existing products' configured values are unchanged.

To add genuine sales, put the confirmed value under verifiedCounts['insect-screen'] / verifiedCounts.tinted and set sales.demo: false. New configured counts display Number+ Sold in the existing #E8F5E9 / #2E7D32 badge. To add genuine ratings, set rating.verifiedValues for the product and rating.demo: false. Set each enabled flag to false to hide its badge type. Demo counts may be configured only as explicit placeholders; these two products then display Demo visibly. Never treat demoValue or demoCounts as genuine statistics. Global mode switches affect all products, so review every product's verified data before disabling demo mode.

### New Insect Screen images

Six named source PNGs were inspected and mapped by their explicit names and correspondence with prior supplier examples:

| Source | Public path | Purpose |
|---|---|---|
| INSECT SCREEN/Magnet Insect Screen.png | assets/img/products/insect-screen/examples/magnet.png | Magnet Insect Screen overview selection and Photos & Examples |
| INSECT SCREEN/Chain Type Sliding Insect Screen.png | assets/img/products/insect-screen/examples/chain.png | Chain Type Sliding Insect Screen overview selection and Photos & Examples |
| INSECT SCREEN/Cord Type Sliding Insect Screen.png | assets/img/products/insect-screen/examples/cord.png | Cord Type Sliding Insect Screen overview selection and Photos & Examples |
| INSECT SCREEN/Roll-Up Insect Screen.png | assets/img/products/insect-screen/examples/roll-up.png | Roll-Up Insect Screen overview selection and Photos & Examples |
| INSECT SCREEN/PVC-coated glass-yarn mesh.png | assets/img/products/insect-screen/examples/glass-yarn-mesh.png | Separate unassigned glass-yarn mesh reference |
| INSECT SCREEN/Supplier sliding-screen mesh specification label.png | assets/img/products/insect-screen/examples/sliding-mesh-label.png | Sliding-only specification disclosure |

Screen selection changes the Product Details overview to the matching new type photo. The overview gallery also retains the approved general product image. Homepage/Products still use assets/img/products/insect-screen/main/insect-screen.png; Tinted's catalogue image is unchanged. The four new system images also serve the Photos & Examples grid: this intentionally reuses the same file for overview selection and the separate example/lightbox browser, with no duplicate files or duplicate entries within either list. Original Chain/Cord hardware scans remain accessible as technical disclosures in the selected specifications. All original mesh, hardware, features, accessories, supplier uncertainties and enquiry data remain intact. Roll-Up's new image retains its side-guide diagram. Additional mesh remains unassigned and cannot enter enquiries.

### Future updates

Verify Dream filenames against the supplier key and colour label before adding availability entries. Add a photo mapping to restore a hidden colour; do not bypass image filtering. Keep collection names separate from colour identifiers. For screens, update systems.photos and the matching product gallery/optionImages record together; keep catalogueImage separate when changing only Product Details. Preserve originalReferencePhotos for verified diagrams and source history.

Dream/Insect/Tinted validation: all ten requested widths passed, including 160 dropdown checks across 16 pages, 120 Dream colour selections, 40 screen selections, 160 intercepted WhatsApp drafts and 40 default listing-card checks. Four badge configuration states were checked on both catalogues at every width. See DREAM-INSECT-TINTED-UPDATE-REPORT.md for results, supplier uncertainties and test limits.


## Dream corrections, shared enquiry links and local preview badges — 13 October 2026

This update supersedes the previous BX-300 collection label, original Dream colour photo paths and visible Demo badge wording. Implemented locally only; no staging, commit, push or deployment.

### Dream corrected image mapping

BX_Fabric_Color_Corrected_12.zip contains exactly 12 PNGs. Every filename matches both an existing individual BX display code and supplier colour label. All 12 are verified and integrated, four per collection, with no unmatched files or code corrections required. Final collection labels are BX-100, BX-200 and BX-800. The third stable supplier/URL collection ID remains a1-8xx; individual BX-801/812/813/814 codes are unchanged. BX-100 and BX-200 codes/collection labels are unchanged.

The active manifest is assets/data/dream-colour-images.js. Corrected assets are copied byte-for-byte under assets/img/products/dream-blinds/colours/corrected/<collection>/, preserving each original filename and casing. Old photographs and original supplier records remain retained; previousPhotographs stores the prior provenance and is not used by the selector. New paths prevent old cached images from resolving in the active preview. HEX swatches are visually reviewed central-fabric median RGB values (35%–65% on both axes), excluding labels/backgrounds. The existing single square contain-fit preview remains at maximum 360px.

| Collection | Individual colour | Corrected ZIP filename | Active public path | Approximate HEX |
|---|---|---|---|---|
| BX-100 | BX-101 — White | BX-101 WHITE.png | assets/img/products/dream-blinds/colours/corrected/bx-100/BX-101 WHITE.png | #F2F3F2 |
| BX-100 | BX-104 — Smoke Grey | BX-104 SMOKE GREY.png | assets/img/products/dream-blinds/colours/corrected/bx-100/BX-104 SMOKE GREY.png | #7C8084 |
| BX-100 | BX-105 — Khaki | BX-105 KHAKI.png | assets/img/products/dream-blinds/colours/corrected/bx-100/BX-105 KHAKI.png | #A19B80 |
| BX-100 | BX-109 — Ocean Blue | BX-109 OCEAN BLUE.png | assets/img/products/dream-blinds/colours/corrected/bx-100/BX-109 OCEAN BLUE.png | #5A83A6 |
| BX-200 | BX-202 — beige | BX-202 BEIGE.png | assets/img/products/dream-blinds/colours/corrected/bx-200/BX-202 BEIGE.png | #D1C4B1 |
| BX-200 | BX-203 — Apricot yellow | BX-203 APRICOT YELLOW.png | assets/img/products/dream-blinds/colours/corrected/bx-200/BX-203 APRICOT YELLOW.png | #E7C596 |
| BX-200 | BX-211 — Ice Grey | BX-211 ICE GREY.png | assets/img/products/dream-blinds/colours/corrected/bx-200/BX-211 ICE GREY.png | #D4DADD |
| BX-200 | BX-212 — Black | BX-212 BLACK.png | assets/img/products/dream-blinds/colours/corrected/bx-200/BX-212 BLACK.png | #1C1D1E |
| BX-800 | BX-801 — White | BX-801 WHITE.png | assets/img/products/dream-blinds/colours/corrected/bx-800/BX-801 WHITE.png | #F2F3F3 |
| BX-800 | BX-812 — Bone | BX-812 BONE.png | assets/img/products/dream-blinds/colours/corrected/bx-800/BX-812 BONE.png | #E4DDD0 |
| BX-800 | BX-813 — Light brown | BX-813 LIGHT BROWN.png | assets/img/products/dream-blinds/colours/corrected/bx-800/BX-813 LIGHT BROWN.png | #B69575 |
| BX-800 | BX-814 — Silver grey | BX-814 SILVER GREY.png | assets/img/products/dream-blinds/colours/corrected/bx-800/BX-814 SILVER GREY.png | #BABFC3 |

The nine previously unavailable supplier colours remain hidden: BX-102/103/111, BX-201/204/205, BX-802/804/805. The complete 21-colour supplier catalogue and specifications remain unchanged.

### Removed illustration

The Dream supplier features/operating illustration is no longer rendered, thumbnailed or included in a visible viewer group. assets/img/products/dream-blinds/reference/information.jpeg is preserved; its metadata is retained with visible:false. The pre-existing deletion of root DREAM BLINDS/Information.jpeg was left intact. The six written features, How Dream Blinds Work, all other main/gallery images and the existing navigation/WhatsApp flow are retained. The operation paragraph now occupies a full-width column with no empty figure.

### Shared enquiry prompt

renderMoreOptionsLink in assets/js/product-details.js creates one compact data-more-options paragraph beneath the relevant selector, or beneath overview options for products without a collection. Wording adapts to fabric colours, window film, and finishes/custom requirements. Products with no selections receive no duplicate or misplaced prompt. Re-rendering/switching products reuses and moves the same node.

The native link points to the existing #product-enquiry section, keeping the page/query and selection/form state. It does not open WhatsApp or submit the form. Existing site scroll-behavior:smooth applies normally; the existing reduced-motion stylesheet sets auto. The enquiry section has scroll-margin-top:calc(var(--header-height) + 20px), keeping the destination below the sticky header at mobile and desktop sizes. Relative same-page fragments work below a GitHub Pages project subdirectory.

### Rating and sold-count placeholders

The centralized assets/data/sales-counts.js retains demo:true and rating.demo:true for local design preview. Insect Screen and Tinted each now have demoCounts:"100+" and share demoValue:"5.0". These are user-requested dummy figures, not real sales/reviews. Both product records mark catalogueBadgeStatus:"unverified-demo" and catalogueDemoLabels:false. No fixed visible Demo text appears on their cards; sample status remains in accessible labels/tooltips and underlying data. Existing gold/green colours, star icon, spacing and all other products' values/verified data are preserved. No review count, testimonial or BEST SELLER claim was added.

Production-safe switch: set allowDemoBadges:false. This makes both badge types use verifiedCounts / rating.verifiedValues even if legacy demo flags remain true, hiding missing/unverified values while retaining configured verified values. Populate those verified maps only with genuine documented data. Individual enabled flags still hide their badge types; demo:false and rating.demo:false also select verified-only data. Never publish the local dummy values as real statistics.

For future colour corrections, verify each archive filename against its individual supplier record, retain previous provenance/assets, and update only the active manifest entry/photo and representative swatch. Keep collection labels separate from colour codes.

Corrections validation: all ten requested widths passed, including 120 corrected Dream photo selections/drafts, 110 shared-link checks across 11 applicable selector pages, and 40 catalogue-card checks. All 20 product pages were checked for prompt applicability. Native keyboard/touch, normal/reduced motion, preserved gallery viewers and production-only badge fallback passed. See DREAM-CORRECTIONS-CATALOGUE-REPORT.md for details and limits.


## Venetian enhanced colours — 13 October 2026

Venetian now uses `assets/data/venetian-colour-collections.js`. `supplier` preserves all original records and per-series specifications; `images` is the explicit availability map. Only records with mapped images enter the selector. Lantex has Black-Out (DSB), Design and Normal collections with four enhanced photographs each. Aluminium has 29 verified 25mm colours, no supplier-defined named series, and no selectable 50mm colours. The two unmatched SP-148 photographs are excluded. Full visible/hidden lists and source limitations are in VENETIAN-COLLECTIONS-REPORT.md.

Display LD as BX and SP as BX, preserving every number and suffix. Never combine the Design J897/S897 records. To add a future photograph, verify its exact supplier code and series, copy the original JPEG into the relevant image directory, then add its record ID to `images` with source paths, central sample rectangle and HEX. Do not use background or highlights for swatches. Never expose a colour or collection without a verified image. Keep ambiguous images in `unmatched` until supplier evidence resolves them.

Update technical specifications only in the relevant `supplier` collection after checking its source scan; preserve units and series boundaries. Do not infer missing aluminium thickness/finish or claim certification without evidence. Source scans stay as provenance and are not public selector images. The Venetian product record, Timber/PVC specifications, galleries and listing assets must remain intact. The renderer handles Type, Lantex Series, colour code and verified name in WhatsApp drafts.

## Window Tinting Film and Venus correction — 13 October 2026

The internal `tinted` ID and `product-details.html?product=tinted` route remain unchanged. Its display name is now **Window Tinting Film** in shared product data; `assets/js/site.js` supplies that same name for the shared Products dropdown. It remains in Other with the existing catalogue image, description, badges and Suitable for information.

`assets/data/other-product-details.js` now has a separate `tinted.gallery` containing the three original TINTED.zip images: `DBK 50 USA.png`, `IR-60 BLUE USA.png`, and `UV400 6590.png`. Copies retain their original filenames under `assets/img/products/tinted/gallery/`. The Choose Window Film section renders only this static gallery with the existing shared lightbox. The 29-film `films` dataset and all original sample images remain preserved for future use. No film is selected by default or required for enquiry; stale film URL parameters are cleared. Do not re-enable film selection by assigning a default film unless the product flow is intentionally changed.

Venus code `VENUS 01` in the shared Roller fabric catalogue now has the display name **White Talc**, used by Roller, Panel, Vertical and Roman. Its source filename contains the historical spelling WHITE TALE and remains unchanged as provenance. Code, source image, enhanced image, HEX and variant relationships remain intact.

## Honeycomb colour photographs (14 October 2026)

This section supersedes the Honeycomb placeholder and 44 visible colours described above. All five root-level archives were inspected before website edits. They contain flat archive entries, JPEG photographs only, and no collection metadata or additional supplier sheets. Filename size suffixes and the existing supplier catalogue establish each full collection + cell size + fabric type + code mapping. FC size membership comes from the existing supplier records. Unsuffixed S/SF/W files map to Honeycomb-26; ` 38` suffixed files map to Honeycomb-38. Archive order never determines selector order.

| Archive | Images |
| --- | ---: |
| `Honeycomb_Enhanced_SmallPart_01.zip` | 6 |
| `Honeycomb_Enhanced_SmallPart_02.zip` | 8 |
| `Honeycomb_Enhanced_SmallPart_03.zip` | 8 |
| `Honeycomb_Enhanced_SmallPart_04.zip` | 10 |
| `Honeycomb_Enhanced_SmallPart_05.zip` | 10 |

42 images, 42 unique SHA-256 hashes, 42 mapped colours. No duplicate images, unmatched files, or new colour records. Repeated S/SF/W code strings are independent images in separate size/type folders. FC-13 and FC-14 (FC Honeycomb 25mm) lack uploaded photographs: their original catalogue records and original swatches remain intact but are filtered out of the runtime selector, including URL selection.

| Collection | Size | Fabric type | Visible colours |
| --- | --- | --- | ---: |
| fc-25 | 25mm | fc | 14 |
| fc-38 | 38mm | fc | 8 |
| honeycomb-26 | 26mm | blackout | 7 |
| honeycomb-26 | 26mm | mesh-sunscreen | 2 |
| honeycomb-26 | 26mm | semi-blackout | 3 |
| honeycomb-38 | 38mm | mesh-sunscreen | 1 |
| honeycomb-38 | 38mm | semi-blackout | 7 |

The existing supplier classification caveats remain: Honeycomb-38 S/SF codes retain the printed Semi-Blackout grouping provisionally, with the existing customer notice and provenance preserved. FC has no verified printed fabric-type name; none is invented. The older FC 38mm supplier sheet header conflict is still recorded above. These photographs do not independently certify fabric classification.

Assets retain their exact original filenames under `assets/img/products/honeycomb-blinds/<collection-id>/<type-id>/`. All paths are relative and preserve casing and spaces. The main gallery and all other product assets remain unchanged. `closeUpImage` and the approximate photographic `swatchHex` are set on matching supplier records; `imageSource` retains archive entry, SHA-256 and sampled region alongside the original supplier `source`. `honeycombCatalogue` in `assets/js/product-details.js` derives an image-backed view without deleting supplier records. Keep this filter if additional images are added.

Every photo was visually inspected on the contact sheet. Swatches use median RGB from an inner, moderately lit fabric pleat, excluding outer edges, deep fold shadows and brightest reflections. Photos are approximations affected by lighting, not certified physical colour matches. The retained red selected border and outlined swatch chips keep labels and light colours visible. The shared square preview remains capped at 360px with `object-fit:contain`; Honeycomb photos now open the shared image viewer by click/tap or Enter/Space. Size, collection and type changes use the existing state reset, specifications and enquiry paths.

### Complete colour/image/HEX mapping

| Collection | Size | Type | Code | Original image | Archive part | HEX |
| --- | --- | --- | --- | --- | --- | --- |
| fc-25 | 25mm | fc | FC-01 | `FC-01.jpg.jpeg` | 04 | `#B6B7B5` |
| fc-25 | 25mm | fc | FC-02 | `FC-02.jpg.jpeg` | 05 | `#BFC1BF` |
| fc-25 | 25mm | fc | FC-03 | `FC-03.jpg.jpeg` | 04 | `#B9BAB3` |
| fc-25 | 25mm | fc | FC-04 | `FC-04.jpg.jpeg` | 05 | `#B9B8B2` |
| fc-25 | 25mm | fc | FC-05 | `FC-05.jpg.jpeg` | 05 | `#ADA691` |
| fc-25 | 25mm | fc | FC-06 | `FC-06.jpg.jpeg` | 04 | `#A6A38E` |
| fc-25 | 25mm | fc | FC-07 | `FC-07.jpg.jpeg` | 05 | `#A3A9A9` |
| fc-25 | 25mm | fc | FC-08 | `FC-08.jpg.jpeg` | 05 | `#A2A6A1` |
| fc-25 | 25mm | fc | FC-09 | `FC-09.jpg.jpeg` | 05 | `#7D7D77` |
| fc-25 | 25mm | fc | FC-10 | `FC-10.jpg.jpeg` | 01 | `#919392` |
| fc-25 | 25mm | fc | FC-11 | `FC-11.jpg.jpeg` | 03 | `#8D8778` |
| fc-25 | 25mm | fc | FC-12 | `FC-12.jpg.jpeg` | 02 | `#9B9283` |
| fc-25 | 25mm | fc | FC-15 | `FC-15.jpg.jpeg` | 02 | `#979AA0` |
| fc-25 | 25mm | fc | FC-16 | `FC-16.jpg.jpeg` | 04 | `#64645F` |
| fc-38 | 38mm | fc | FC-19 | `FC-19.jpg.jpeg` | 05 | `#AFB1B0` |
| fc-38 | 38mm | fc | FC-20 | `FC-20.jpg.jpeg` | 01 | `#7C7C76` |
| fc-38 | 38mm | fc | FC-23 | `FC-23.jpg.jpeg` | 04 | `#B2B2AC` |
| fc-38 | 38mm | fc | FC-24 | `FC-24.jpg.jpeg` | 02 | `#B5B5AB` |
| fc-38 | 38mm | fc | FC-27 | `FC-27.jpg.jpeg` | 03 | `#9E9E98` |
| fc-38 | 38mm | fc | FC-28 | `FC-28.jpg.jpeg` | 02 | `#A3A5A0` |
| fc-38 | 38mm | fc | FC-31 | `FC-31.jpg.jpeg` | 01 | `#7E817D` |
| fc-38 | 38mm | fc | FC-32 | `FC-32.jpg.jpeg` | 03 | `#818785` |
| honeycomb-26 | 26mm | blackout | SF-001 | `SF-001.jpg.jpeg` | 03 | `#A9ADAF` |
| honeycomb-26 | 26mm | blackout | SF-002 | `SF-002.jpg.jpeg` | 03 | `#A9A9A0` |
| honeycomb-26 | 26mm | blackout | SF-003 | `SF-003.jpg.jpeg` | 03 | `#A8A392` |
| honeycomb-26 | 26mm | blackout | SF-006 | `SF-006.jpg.jpeg` | 03 | `#94A5AD` |
| honeycomb-26 | 26mm | blackout | SF-010 | `SF-010.jpg.jpeg` | 03 | `#8B7760` |
| honeycomb-26 | 26mm | blackout | SF-012 | `SF-012.jpg.jpeg` | 01 | `#92999A` |
| honeycomb-26 | 26mm | blackout | SF-014 | `SF-014.jpg.jpeg` | 01 | `#718395` |
| honeycomb-26 | 26mm | mesh-sunscreen | W-001 | `W-001.jpg.jpeg` | 04 | `#A3A4A0` |
| honeycomb-26 | 26mm | mesh-sunscreen | W-002 | `W-002.jpg.jpeg` | 05 | `#A1A39A` |
| honeycomb-26 | 26mm | semi-blackout | S-001 | `S-001.jpg.jpeg` | 04 | `#ABADAA` |
| honeycomb-26 | 26mm | semi-blackout | S-002 | `S-002.jpg.jpeg` | 04 | `#9EA195` |
| honeycomb-26 | 26mm | semi-blackout | S-006 | `S-006.jpg.jpeg` | 01 | `#879394` |
| honeycomb-38 | 38mm | mesh-sunscreen | W-001 | `W-001 38.jpg.jpeg` | 05 | `#A7A8A3` |
| honeycomb-38 | 38mm | semi-blackout | S-001 | `S-001 38.jpg.jpeg` | 05 | `#BABBBE` |
| honeycomb-38 | 38mm | semi-blackout | SF-001 | `SF-001 38.jpg.jpeg` | 02 | `#B7B8B9` |
| honeycomb-38 | 38mm | semi-blackout | SF-002 | `SF-002 38.jpg.jpeg` | 04 | `#ABABA1` |
| honeycomb-38 | 38mm | semi-blackout | SF-006 | `SF-006 38.jpg.jpeg` | 02 | `#8C9BA0` |
| honeycomb-38 | 38mm | semi-blackout | SF-010 | `SF-010 38.jpg.jpeg` | 02 | `#6F5C46` |
| honeycomb-38 | 38mm | semi-blackout | SF-012 | `SF-012 38.jpg.jpeg` | 02 | `#858D8B` |
| honeycomb-38 | 38mm | semi-blackout | SF-014 | `SF-014 38.jpg.jpeg` | 04 | `#6A7D8E` |

### Audit and validation

`reports/honeycomb/inventory.json` is the complete machine-readable inventory, including dimensions, bytes, hashes, exact archive entries, full mappings, asset paths and updated HEX values. `reports/honeycomb/contact-sheet.jpg` shows every uploaded photograph. `reports/honeycomb/test.cjs` runs the local browser checks and writes `test-results.json`; mobile and desktop screenshots are retained beside it. No ZIP files are rendered as galleries. No staging, commit, push or deployment is performed.


### Validation results and changed files

- Inspected all five archives: counts 6, 8, 8, 10 and 10. All 42 original images are unique and every extracted file matches its archive SHA-256.
- Edge browser checks cover all seven size/collection/type combinations at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: correct colour counts, preview maximum width and no horizontal overflow.
- All 42 colour selections load their exact mapped photograph without broken-image or JavaScript errors. Each of seven enquiry drafts contains the selected size, collection, applicable fabric type and code, plus name, phone, address, email, site visit and customer message. Tests intercept the draft URL; no WhatsApp message is sent.
- Keyboard Enter opens the shared viewer and Escape closes it. Touch selects a 26mm colour. Invalid FC-13 links fall back to an image-backed colour; both missing FC codes are absent from the selector.
- Other-product smoke checks load Roller, Zebra, Dream and Venetian pages. A separate data comparison confirms every non-Honeycomb catalogue record is unchanged and all original Honeycomb codes, supplier metadata and specifications are preserved.
- JavaScript syntax checks and `git diff --check` pass. Mobile and desktop screenshots were reviewed.
- Modified: `assets/data/fabric-catalogue.js`, `assets/js/product-details.js`, `WEBSITE-MAINTENANCE.md`.
- Added: 42 photographs under `assets/img/products/honeycomb-blinds/`, plus inventory, contact sheet, browser results, screenshots, verification scripts and report under `reports/honeycomb/`.
- Existing Honeycomb-38 Semi-Blackout supplier classification remains provisional. No unmatched image mappings remain. No staging, commit, push or deployment.
## Shared quotation-led Product Details layout (14 October 2026)

Applies only to `skylight`, `curtain-hardware` and `awning-canopy`. Their prior Specifications section repeated product names and available options without technical data; it is replaced with Explore Available Options, Where It Can Be Used, supplied Photos & Examples and Get a Custom Quotation. Empty fabric controls and specifications navigation are hidden. Existing product descriptions, main galleries/thumbnails, highlights, source records, catalogue link, header/footer and upper WhatsApp CTA remain intact. No Homepage, Products catalogue or product-data records/assets are changed.

### Content and provenance

| Product | Available options | Applications | Supplied example photos |
| --- | --- | --- | --- |
| Skylight Blinds | General overview; no verified individual options | Glass roofs; inclined windows | Fabric shades beneath a glass roof (1) |
| Curtain Hardware | Curtain rail; Curtain rod | Home interiors; office interiors | Packaged rods; finial details; bundled rods (3) |
| Awnings & Canopies | General overview; no verified individual options | Patios; outdoor areas; outdoor entrances | Purple entrance canopy (1) |

Options come directly from each product's original `options` array. Curtain rails retain their existing name; tracks/accessories are not invented or substituted. Skylight applications come from its description; Curtain Hardware applications from `suitableFor: Home, Office`; awning patios/outdoor areas from `suitableFor`, and outdoor entrances from the supplied entrance canopy photograph. Manual/motorized skylight systems, retractable/fixed awning categories, ratings, pricing, material specifications and warranty terms require supplier confirmation and are not added. Existing illustrative hero photographs are retained without being used as proof of a specific operating mechanism or category.

Exact supplied photographs (existing filenames and files preserved):

- `assets/img/products/catalogue-reference/skylight-blinds-fabric-shades-glass-roof.png`
- `assets/img/products/catalogue-reference/awning-purple-salon-entrance-canopy.png`
- `assets/img/products/generated/web/curtain-rods-packaged-stock.png`
- `assets/img/products/generated/web/curtain-rod-finial-details.png`
- `assets/img/products/generated/web/curtain-rods-bundled-stock.png`

The three Curtain Hardware PNG files are existing supplied product photographs despite their historical folder name. Existing illustrative example images remain in source data but are omitted from these pages' Photos & Examples sections. No images are created, replaced, renamed, duplicated or removed from the main galleries. Five supplied photos use consistent square contain-fit frames, relative GitHub Pages-compatible paths, original descriptive alt text/captions and the shared viewer. A single photo is displayed once in a maximum 440px column; if no configured example matches the gallery, both the section and its navigation link are hidden.

### Implementation and enquiries

`assets/data/quotation-product-details.js` defines the three page-specific overviews, descriptions, application cards, exact approved photo paths and optional installation fields. `product-details.html` loads it before the shared controller. `renderQuotationOptions` and `renderQuotationContent` in `assets/js/product-details.js` render shared components. `quotationDetails` gates every change to these three IDs. The scoped CSS in `assets/css/product-details.css` uses existing colours, typography, containers and radii; informational application cards are non-interactive. Curtain option buttons show pressed states and support native keyboard/touch selection through `chooseOption`, synchronizing the original option image, URL, enquiry summary and WhatsApp draft.

Optional enquiry fields:

- Skylight: installation location; approximate window dimensions.
- Curtain Hardware: approximate installation length; quantity. Hardware type comes from the existing rod/rail selection.
- Awnings & Canopies: installation area; approximate covering dimensions.

No new field is required. A supplied quantity must be a positive whole number. Dimensions are free text with units; no limits are invented. All original Name, Phone, Address, Email, Site Visit and Message fields remain. Non-empty additional values are included only for the active product, alongside the original message generation. Switching products rebuilds/clears optional fields and restores the original enquiry heading, other configurators and navigation; changing rod/rail preserves typed installation details. The fieldset is hidden and disabled outside these three pages.

### Adding verified information later

Add supplier-verified technical values to the applicable product's `productSpecs` object in `assets/data/product-data.js`. Non-empty values appear in a compact Product Information panel within Explore Available Options; no generic Product-name table or missing-specification notice is emitted. Preserve source information and document its provenance. Add genuinely verified selectable options to the original `options` array and descriptions to `optionDescriptions`; keep any `optionImages` mapping compatible with existing main gallery photographs. Add approved photographs to the original gallery and explicitly list their paths in `photoPaths`. Do not infer product offerings from illustrative assets. Other products remain on their existing fabric/colour/specification rendering paths.

### Validation

All three pages passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px, without horizontal overflow or cards exceeding the viewport. Browser checks verify original descriptions and main thumbnail counts, supported options, exact supplied photo paths, loaded images, hidden specifications/colour controls, optional fields, all original customer fields and correct product/option WhatsApp drafts. Draft URLs are intercepted: no message is sent. Keyboard Enter/Escape opens/closes the shared viewer; rod/rail buttons support Enter; mobile touch selects a rail and opens/closes its example photo. Switching the enquiry product back to Roller removes quotation fields/content and restores the original heading. Smoke checks passed for Roller, Zebra, Venetian, Honeycomb, Panel, Vertical, Roman and Dream. No JavaScript exceptions or failed local asset requests were recorded. JavaScript syntax and `git diff --check` pass. Final desktop/mobile screenshots are retained and reviewed.

Audit files: `reports/quotation-layout/test.cjs`, `test-results.json`, `screenshots.cjs`, six screenshots and `report.md`. Prior Honeycomb changes are preserved. No staging, commit, push or deployment.

## Motorized Blinds Product Details redesign (14 October 2026)

The Motorized Product Details page now displays Motorized Blinds as its title, breadcrumb, enquiry product and document title. The central product record retains its original Motorized Solutions name, catalogue override, description, highlights and gallery: Home and Products are unchanged. The approved `motorizedblinds.png` upper image, contain sizing, thumbnail/lightbox behaviour and original description remain intact. Existing Photos & Examples retain Seri Kembangan and the office roller-blind photograph; no videos are mixed into that gallery. The earlier compatible-products section and product-name-only specification table are replaced, without duplicating visible sections. Original related Roller, Venetian and Ziptrak links and the Products motorized showcase link remain accessible.

### Structure and verified solutions

Section order: main information; Explore Motorized Solutions; Motor Systems & Brands; How Motorized Blinds Work; Watch Motorized Blinds in Action; Suitable Applications; original Photos & Examples; Get a Custom Quotation. The new content renders only for `product=motorized`. `assets/js/motorized-details.js` exports the dedicated controller; `assets/js/product-details.js` supplies shared DOM/image-viewer utilities, selection updates and enquiry formatting. `product-details.html` loads the new controller before product-details.js. Styles use existing typography, containers and red-and-white colours under unique motorized classes, with compact cards, responsive grids and no external libraries.

Selectable enquiry systems:

- Motorized Roller Blinds: existing official-site-derived motorized roller description in products.html, approved root image, supplied office roller image and videos 01/02. The existing root illustration is reused on its card.
- Motorized Zebra Blinds: video 07 visibly shows zebra blinds and a handheld control. No unverified motor brand or extra capabilities are inferred.
- Ziptrak Motorized Outdoor Blinds: existing Ziptrak product description/highlight explicitly lists motorized options, conditional on compatible combinations. Outdoor demonstration videos 05/06 are not identified as Ziptrak merely from appearance.

Venetian and vertical demonstrations are labelled by visible blind type, without claiming a particular model/brand or adding them as purchasable system selections. No decorative selector is added for unverified systems. Suitable Applications uses Home and Office from the unchanged motorized product suitableFor data. Four informational cards describe handheld controls observed in assets, system-dependent blind movement, position-based light/privacy adjustment and discussing dimensions/location for installation. No universal app, Wi-Fi, voice, scheduling, solar, performance, warranty or power claims are added.

### Original brand asset inventory

| Original filename | Relative path | Content | Bytes |
| --- | --- | --- | ---: |
| `motorized brand (1).png` | `assets/img/products/motorized/brands/motorized brand (1).png` | Window covering and motorization brand sheet | 234680 |
| `motorized brand (1).jpg` | `assets/img/products/motorized/brands/motorized brand (1).jpg` | Somfy motor and remote poster | 45554 |
| `motorized brand (2).png` | `assets/img/products/motorized/brands/motorized brand (2).png` | Somfy motorization products poster | 28020 |

The first image is a mixed fabric/window covering/motorization brand sheet (ATEJA, novo, MEHLER, Nice, PHIFER, Glen Raven, WINTEC, Dickson, Somfy and Serge Ferrari), not a claim that all those companies supply motors for these systems. The two other images are Somfy promotional posters. Dooya remains mentioned in the original catalogue-backed description; no Dooya image or selector is fabricated. Brand cards show the complete images with contain sizing and shared full-size viewing. Percent-encoded paths preserve the original filenames, spaces and casing.

### Original video inventory

All seven original files were inspected using browser metadata plus start and midpoint frames before website edits. Subject labels reflect visible content, not poster filenames. Existing approved poster mappings come from products.html; posters are presentation assets and do not independently establish motor compatibility.

| Original filename | Relative path | Display title | Duration (s) | Frame size | Existing poster |
| --- | --- | --- | ---: | --- | --- |
| `motorized-demo-01.mp4` | `assets/video/motorized/motorized-demo-01.mp4` | Living room roller blinds | 99.71 | 1280 × 720 | `assets/img/products/video-thumbnails/bright-open-plan-living-space.png` |
| `motorized-demo-02.mp4` | `assets/video/motorized/motorized-demo-02.mp4` | Roller blind motor demonstration | 207.92 | 1920 × 1080 | `assets/img/products/video-thumbnails/oceanview-boardroom-motorized-blinds.png` |
| `motorized-demo-03.mp4` | `assets/video/motorized/motorized-demo-03.mp4` | Venetian blind demonstration | 50.62 | 1280 × 720 | `assets/img/products/video-thumbnails/sunlit-reading-nook-venetian-blinds.png` |
| `motorized-demo-04.mp4` | `assets/video/motorized/motorized-demo-04.mp4` | Vertical blind demonstration | 45.42 | 1920 × 1080 | `assets/img/products/video-thumbnails/bedroom-corner-window-vertical-blinds.png` |
| `motorized-demo-05.mp4` | `assets/video/motorized/motorized-demo-05.mp4` | Outdoor roller shade demonstration | 31.32 | 848 × 480 | `assets/img/products/video-thumbnails/tropical-patio-roller-shades.png` |
| `motorized-demo-06.mp4` | `assets/video/motorized/motorized-demo-06.mp4` | Outdoor shade demonstration | 33.81 | 848 × 480 | `assets/img/products/video-thumbnails/tropical-retreat-remote-control.png` |
| `motorized-demo-07.mp4` | `assets/video/motorized/motorized-demo-07.mp4` | Zebra blinds with handheld control | 17.62 | 638 × 360 | `assets/img/products/video-thumbnails/corner-living-room-zebra-blinds.png` |

No media file was moved, replaced, renamed or duplicated. Exact bytes, dimensions, durations and SHA-256 hashes are recorded in `reports/motorized/video-inventory.json` and `brand-inventory.json`; inspected frames/contact sheet are audit artifacts, not new website images. All seven files exist and play in Edge. Their exact motor brands/models are not established by the inspected footage.

### Video switching and loading

One native controls-enabled, playsinline video sits in a reserved 16:9 frame. The initial feature is video 01; six fixed poster buttons select videos 02–07. Selecting a button pauses the previous clip, assigns the exact new source/poster/title, resets playback through load and highlights the selected thumbnail in red without autoplay or navigation. Return to first demonstration makes video 01 reachable after switching; its featured title uses the red active accent. All seven remain accessible with one player and six thumbnail buttons. Native fullscreen controls remain available. Buttons support native Enter/Space and touch.

Only the featured video has a media source; all thumbnails are lazy-loaded images. The player uses preload=none, never autoplay, and pauses when the document is hidden or another product is selected. The observed Edge initial load requested only video 01; no alternative video resources were requested initially. Browser behaviour may fetch initial featured metadata despite preload=none. Switching away removes the source and resets the preference/fields. The reserved frame prevents video-dimension changes from moving nearby content. An unsupported/missing clip hides the failed player and shows an accessible alert while retaining the frame and all other choices; selecting a valid clip recovers playback. There are no missing supplied videos.

### Enquiry integration

Get a Custom Quotation uses the requested supporting description. Original Product, Name, Address, Phone, Email, Site Visit and Message fields, WhatsApp number and message formatting remain intact. Optional Preferred Motorized System uses the same three verified choices as the cards, with Discuss with our team as an empty preference. Cards and dropdown synchronize in both directions; empty preference clears pressed states. Optional Approximate Window Dimensions and Installation Location accept free text. Non-empty values generate Product: Motorized Blinds, Preferred System (if selected), dimensions and location before existing customer information. Undefined/null values are not emitted. Leaving the product clears and disables the optional fields and stops the video, preserving other-product configurators. Choosing the blank product picker also stops/resets the Motorized controls.

### Validation and files

Edge checks passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: no horizontal overflow, fitting grids and a constant 16:9 featured frame. All seven clips played with valid dimensions/durations, standard controls, inline support and no autoplay. Source and active state changed correctly; previous playback paused. A deliberately failed video request showed the alert and the following valid clip played. Shared brand/example image viewers, keyboard selection, touch system/video selection and opening/closing mobile navigation passed. All three system selections produced the correct intercepted WhatsApp drafts with every original customer field; empty preference omitted Preferred System. No WhatsApp message was sent. Switching Motorized to Honeycomb and back cleared preference/fields and paused/removed media. Eleven unrelated product smoke checks passed, including the three quotation-led pages. No JavaScript exceptions or failed normal local asset responses were recorded. Syntax checks and git diff whitespace checks pass. Desktop/mobile screenshots are retained and visually reviewed.

The Homepage, Products page, central product records and original media assets are unchanged by this task. Earlier Honeycomb and quotation-led changes are preserved. Modified files for this task: `product-details.html`, `assets/js/product-details.js`, `assets/css/product-details.css`, `WEBSITE-MAINTENANCE.md`. Added: `assets/js/motorized-details.js` and audit files under `reports/motorized/`. To change clips or posters, update the exact arrays in the controller and inventory; preserve originals. Add only supplier-verified selectable systems and conditional descriptions.

Supplier confirmation remains necessary for exact motor models, brand/system pairing, compatible mechanisms and limits, control packages, power supply, installation requirements, warranties and pricing. No universal compatibility is promised. No staging, commit, push or deployment.
## Outdoor note-backed configurators and Motorized card adjustment (14 October 2026)

This section uses the owner's transcribed Product Detail (Outdoor) note and explicit confirmation to reuse the existing three product records. No separate Meranti or Outdoor Roller product is created. IDs, existing titles/descriptions, catalogue products, URLs, approved galleries, thumbnails, image files and links remain unchanged. Preserve the distinction between an existing catalogue product and the particular systems/materials mentioned in the note.

| Existing record | Selector | Note-backed details |
| --- | --- | --- |
| Wooden Outdoor Blinds (`wooden-outdoor`) | Choose Meranti Binding Method: Benang (Thread), Tangsi (Fishing Line), Dawai (Wire) | Thickness 3 mm; Width 25 mm. These are Meranti measurements, not a statement that every wooden blind is Meranti or every binding method has identical dimensions. |
| Bamboo Outdoor Blinds (`bamboo-outdoor`) | Bamboo (Normal) — DB838; Bamboo — DB833; Bamboo (Timber Lux) | Single Blind Width 10 mm; Thickness 3 mm. These are noted single-blind measurements; applicability to each variant requires confirmation. |
| Ziptrak Outdoor Blinds (`ziptrak-outdoor`) | Zip Tracks; Guided (Cable); Straight Drop | No additional technical specifications are invented. Guided (Cable) and Straight Drop are separate outdoor roller systems, not Ziptrak mechanisms. Zip Tracks is retained exactly as written; system/branding must be confirmed. |

### Central configuration and source handling

`assets/data/outdoor-product-details.js` contains note-backed options, measurements, source metadata, scope/confirmation copy and enquiry labels. The original source product records in `assets/data/product-data.js` are preserved. `showProduct` derives a runtime record with these options and the relevant option label; the existing internal ID, title, description, gallery and links remain authoritative. The source is the owner's text transcription in the 14 October request and mapping clarification; the original handwritten image is not present in the accessible project/attachments and no details beyond the supplied transcription are inferred.

DB838 is explicitly stored as `requiresSupplierVerification: true`, with a review note that forbids substituting a different code. A visible DB838 supplier-verification notice remains below the selector, and selecting that variant includes the handwritten-code verification note in the enquiry draft. No conflicting DB838/DB833 supplier record was found in existing product data; DB838 is not silently corrected. Do not remove the source flag until supplier verification is documented.

`renderOutdoorDetails` in `assets/js/product-details.js` uses the existing `pd-series-button` components and state/URL/enquiry paths. All three options on each page are selectable native buttons with red pressed borders, native keyboard/touch behaviour and a live selected-option label. The first valid option is selected by default; an invalid option URL falls back to a valid option. Changes synchronize pressed state, selection label, existing `option` URL parameter and WhatsApp message. There are no new images in these selector cards. Outside these IDs the existing configurators remain on their original rendering paths.

Layout order is existing upper information, the note-backed selector, Product Specifications where the note supplies measurements, UV Printing Options on Ziptrak only, existing Photos & Examples and Get a Custom Quotation. Measurement tables are product-note information, not per-option specifications. Ziptrak has no fabricated specification table. Existing Photos & Examples and shared image viewer remain intact; no gallery photographs are deleted, replaced or added. Wooden Outdoor Blinds retains its existing contact-for-example guidance because its source contains no separate example photograph. The new CSS only adds the outdoor grid and selected-label treatment, using existing colours/fonts and cards.

### UV printing and enquiries

UV Printing Options shows informational Full Surface and Slat Printing cards. These are not selectable system cards and do not imply compatibility with Zip Tracks, Guided (Cable), Straight Drop or a particular Ziptrak product. The source contains `printingCompatibilityVerified: false`. A separate optional enquiry dropdown defaults to No printing preference; it is never required or selected automatically. An explicitly selected value is sent as `UV Printing Preference (compatibility requires confirmation)`, independently of system choice. Switching systems preserves that explicit customer request without claiming compatibility. Switching products or choosing the blank product picker clears/disables/hides the field and UV content/navigation.

WhatsApp preserves original customer fields, number and formatting and uses the existing product titles:

- Product: Wooden Outdoor Blinds; Binding Method: selected method; Meranti/material scope confirmation.
- Product: Bamboo Outdoor Blinds; Variant: selected variant; DB838 verification note when applicable.
- Product: Ziptrak Outdoor Blinds; Selected System: selected system; branding/other-system clarification; explicit UV preference only if requested, with compatibility confirmation.

The original Name, Phone, Address, Email, Site Visit and Message fields remain intact. No undefined/null/stale selection values are emitted. All three pages use Get a Custom Quotation with the shared installation-requirements supporting copy. Product descriptions, upper CTA, header/footer and original product images remain unchanged.

### Motorized selection-card image removal

The `image` property is removed only from the Motorized Roller Blinds system entry in `assets/js/motorized-details.js`. Its existing title, verified description, ID, pressed-state interaction and enquiry integration remain. It now uses the same compact decorative SVG/card treatment as the two other solution cards; no blank image placeholder remains. No other card image was removed. `motorizedblinds.png` stays in the upper Motorized gallery and catalogues. All three brand images, seven original videos, video posters, dedicated player and Photos & Examples remain intact. This supersedes the previous documentation that the Roller system card reused the root illustration.

### Testing and changed files

All four affected products passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px (40 product/width combinations): no horizontal overflow and selector cards fit their viewport. Browser checks verify original titles/descriptions, approved main image paths and thumbnail counts, all three selector options, measurements, visible DB838 flag, separate UV content/confirmation, red selected states, selected labels, valid URL state and every selected option in WhatsApp drafts. All original customer fields are checked. Twelve option drafts plus two explicit printing requests were intercepted; no WhatsApp message was sent. The separate focused test verifies blank-picker cleanup and the DB838 enquiry review note. Product switching clears printing values and hides outdoor controls; invalid Bamboo option URLs fall back to valid data.

Keyboard Enter selects cards and Escape closes image viewers. Touch checks select the third method/variant/system on each outdoor product. Original example photographs load and use the shared viewer. Motorized Roller selection contains no image but all three system selections, three brand images, one featured player and six video thumbnail buttons remain. Thirteen unrelated-product smoke checks passed. No JavaScript exceptions or failed normal local image/asset responses were recorded. JavaScript syntax and `git diff --check` passed. Eight desktop/mobile previews were captured and visually reviewed. Existing Homepage, Products page, central product records and media assets are unchanged; earlier Honeycomb, quotation-led and Motorized changes are preserved.

Modified for this task: `product-details.html`, `assets/js/product-details.js`, `assets/js/motorized-details.js`, `assets/css/product-details.css`, `WEBSITE-MAINTENANCE.md`. Added: `assets/data/outdoor-product-details.js` and `reports/outdoor/` audit scripts, results, screenshots and report. Supplier confirmation remains necessary for DB838, measurement applicability across methods/variants, the material/system for each enquiry, Zip Tracks branding, and all system/UV-printing compatibility. No additional performance, material, warranty or dimensional claims are made. No staging, commit, push or deployment.

## Timber enhanced colour collection — 14 October 2026

48 enhanced files audited; 16 verified selections (PL 01–08 in each of 35 mm and 50 mm), with 32 unmatched or other-material files preserved and excluded. No PL supplier colours are missing photographs. The complete specifications, colour names, image mappings, excluded filenames, future update procedure and ten-width browser results are documented in [reports/timber/report.md](reports/timber/report.md). Full source records remain in assets/data/venetian-colour-collections.js; provenance and confidence for every ZIP image remain in reports/timber/inventory.json. Component measurements are separate from PL series specifications because species/thickness applicability is unverified. Lantex 12, Aluminium 29 and PVC regression checks pass. No stage, commit, push or deployment.
