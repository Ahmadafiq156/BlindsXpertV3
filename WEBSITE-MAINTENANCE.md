# BlindsXpertV3 website maintenance

This guide describes the current static website implementation. It is for developers maintaining the site source; it is not a staff CMS or admin interface.

## 1. Project map

```text
BlindsXpertV3/
├── index.html, about.html, contact.html, gallery.html, product-details.html
├── products.html, projects.html, quote.html, services.html, 404.html
├── assets/
│   ├── css/                 shared and Product Details styles
│   ├── data/                product catalogue data
│   ├── img/                 grouped photographs, catalogue and UI images
│   ├── js/                  shared and page-specific behavior
│   └── video/               homepage and motorized product videos
├── sitemap.xml
├── robots.txt
├── visitor-counter-config.js
├── visitor-counter.js
├── visitor-counter-worker.js
└── wrangler.toml
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

The catalogue cards and filter/category sections are in `products.html`; featured homepage cards are in `index.html`. Keep those page displays aligned with the product data when adding or removing an approved product. Do not restore an old product merely because an old image exists.

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

For the local project folder label, this guide and README call the project **BlindsXpertV3**. The active workspace directory remains named `mockup1`; renaming the containing folder is a separate filesystem action because this workspace is opened at that path. The GitHub repository and Pages URL remain `mockup1`.
