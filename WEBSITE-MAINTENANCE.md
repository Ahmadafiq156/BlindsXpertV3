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

## Zebra BX Fabric & Colour Collection (8 October 2026)

The existing Zebra record (`id: zebra`) in `assets/data/product-data.js` has the only active Zebra collection: BX 101Z, BX 201Z, BX 301Z, BX 401BL, BX 501BL, BX 601BL, BX 701BL and BX 801BL. Each has two JPEG catalogue photographs (colour catalogue and technical specification sheet). Old fabric/series references were removed from the Zebra `documents` array; Custom/Generic non-collection documents remain. Older shared assets were not deleted.

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

`assets/js/product-details.js` reuses the existing selector and shared image viewer. The Zebra section becomes **Fabric & Colour Collection**; selecting a BX series updates its heading, printed fabric-code table, verified specification table and both photographs. Native buttons expose aria-pressed/aria-controls and support Tab, Enter, Space and touch. Mobile selection scrolls only the selector horizontally, keeping its selected label fully visible without jumping the page. Existing SP-series links are accepted through sourceCode mapping and normalized to BX names; product IDs and URL parameter keys are unchanged. The WhatsApp draft uses the selected BX name. No message is sent automatically.

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


The supplied Wooden Outdoor and PVC Outdoor main PNGs already contain large Best Seller ribbons baked into their pixels. Their catalogue cards instead use the existing approved project photographs `assets/img/projects/completed/Saujana Impian.png` and `Sunway Eastwood.png` through an optional `catalogueImage` object. Edit this object to choose a clean approved card photo; it takes precedence over gallery[0] only in the catalogue renderer. Static Products fallback sources match it. Product Details galleries, original PNGs and project sections remain unchanged; no photo editing, cropping to hide captions or generation was performed.


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

All 35 original PNGs are upright 1254×1254px images, extracted byte-for-byte and verified against their uploaded ZIP entries using SHA-256. They are stored once under `assets/img/projects/`, with no converted or generated photographs. The original uploaded ZIPs remain untouched and ignored by the existing `*.zip` rule. Project labels use the supplied folder names, with only capitalization/spacing normalized. Client details, dates, specifications and detailed descriptions were not supplied and were not invented. New cards use the neutral Other projects filter pending approved categorization. Historical Projects-page labels, cover sources, alt text and styling are preserved. Their covers now use semantic viewer buttons as documented below.

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
