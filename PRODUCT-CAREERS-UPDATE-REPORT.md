# BlindsXpertV3 — Product images and Careers enhancement

Completed locally on 8 October 2026. No commit, push, deployment, generated images, framework, backend, admin dashboard, authentication or CMS.

## Uploaded image mapping and final paths

All six root-level PNGs were visually inspected and matched using both their filenames and visible content. All moved into the existing assets/img/products/catalogue-reference folder. This shared reference-image folder avoids unnecessary new nesting. None were converted or overwritten. SHA-256 comparisons confirm that original bytes were preserved. No uploaded image remains duplicated at the root; no images were left unmatched.

| Original root filename | Matching existing product | Final path | Visual basis |
| --- | --- | --- | --- |
| awning.png | Awnings & Canopies (awning-canopy) | assets/img/products/catalogue-reference/awning-purple-salon-entrance-canopy.png | Purple dome-shaped canopy above a salon entrance |
| motorized.png | Motorized Solutions (motorized) | assets/img/products/catalogue-reference/motorized-roller-blinds-office-remote.png | Office roller blinds with an overlaid remote-control illustration |
| roman.png | Roman Blinds (roman) | assets/img/products/catalogue-reference/roman-blinds-cream-kitchen-window.png | Cream Roman blinds with dark trim above a kitchen sink |
| skylight.png | Skylight Blinds (skylight) | assets/img/products/catalogue-reference/skylight-blinds-fabric-shades-glass-roof.png | Fabric skylight shades suspended beneath a sloping glass roof |
| venetian.png | Venetian Blinds (venetian) | assets/img/products/catalogue-reference/venetian-blinds-white-sunlit-window.png | White Venetian blinds beside a vase of flowers on a sunlit windowsill |
| wooden.png | Wooden Outdoor Blinds (wooden-outdoor) | assets/img/products/catalogue-reference/wooden-outdoor-blinds-green-geometric-print.png | Green horizontal outdoor blinds with a white geometric printed pattern |

Alt text and captions describe the visible content without attributing unverified locations, materials, specifications or completion claims. The motorized image's remote-control illustration is identified as an overlay. Venetian material/variant was not guessed from its white finish.

## Gallery counts before and after

The data gallery includes main/variant images; Photo & Examples counts exclude overview images and follow the existing Product Details filtering rules.

| Product | Data gallery before → after | Photo & Examples before → after |
| --- | --- | --- |
| Awnings & Canopies | 2 → 3 | 1 → 2 |
| Motorized Solutions | 2 → 3 | 1 → 2 |
| Roman Blinds | 7 → 8 | 4 → 5 |
| Skylight Blinds | 2 → 3 | 1 → 2 |
| Venetian Blinds | 12 → 13 | 7 → 8 |
| Wooden Outdoor Blinds | 6 → 7 | 4 → 5 |

Six objects were appended to the matching existing gallery arrays in assets/data/product-data.js. Each has src, factual alt/caption, original width/height and exampleOnly: true. A structural comparison proves that every original product field and gallery entry/order remains unchanged. Main images, option mappings, series, descriptions, documents and specifications were preserved. No product record was added or removed. Product Details CSS, its renderer and the shared viewer were not modified. Thumbnails retain the existing square crop with object-fit: cover; the full-image viewer uses contain.

## Careers design and existing content

There was no standalone careers.html at the start of this task. Existing Careers content was in about.html#careers. The dedicated page now uses the shared red hero, header/footer and buttons; a responsive three/two/one-column card grid; native expandable View Details panels; an Interested in Joining Us? section; and a clear empty state. Careers navigation/footer links now point to careers.html on all 16 active root HTML pages. The old About anchor, original paragraph and recruitment link remain intact, with a new link to the dedicated page.

The six original roles were preserved in their existing sequence:

- Business Manager
- Admin & Sales & Marketing Executive
- Graphic and Video Editor
- Sales & Marketing
- Business Internship
- Part-time / Full-time Installer

The original About section explicitly lists these roles as ongoing. They have been migrated as published records with sourceStatus: ongoing and a source reference to that section. Public cards say Listed opportunity and the page asks visitors to confirm current availability. These are preserved listings, not newly verified open vacancies. No salaries, departments, locations, responsibilities, requirements, benefits or closing dates were invented. Employment type appears only for the Installer because Part-time / Full-time is explicit in the original title.

## Career data, publication and application behavior

- assets/data/careers-data.js contains schemaVersion, source notes, recruitment defaults and the jobs array.
- Records have stable unique IDs and the requested optional fields, status and sortOrder, plus source notes. Missing optional fields are omitted from presentation. Descriptions have a short card preview and full details view when supplied.
- Only status === published records appear publicly. Draft, closed, archived, unknown statuses and invalid/duplicate IDs are excluded. New/unverified records must be entered as draft; no automatic publishing or status mutation occurs.
- If no records are published, No Current Openings and Please check back for future career opportunities. appear. Invalid/unavailable data shows an error rather than a false empty state.
- Native details/summary controls support mouse, touch, Enter/Space and visible keyboard focus without a modal dependency.
- The preserved approved recruitment channel is job.blindsxpert@gmail.com. Original application-with-photo instructions are retained. Apply Now opens an email draft with the job title in its subject; no submission, application storage or success claim occurs on the website.
- Approved job-level application channels override recruitment defaults. Email syntax and HTTPS URLs are validated; unsafe/invalid channels produce no Apply Now button. applicationMethod: none disables inherited application links. HTTPS links use noopener noreferrer. Dates are rendered only when calendar-valid and supplied; they do not automatically close a job.
- Without JavaScript, the page links to the preserved About careers information and displays the approved recruitment email.

## Future admin readiness and maintenance

window.renderBlindsXpertCareers(data) re-renders the same data contract without mutating records. Data, cards/details and page styling are separate. An eventual API adapter can pass approved jobs into this function. DOM creation/textContent, safe links, optional-field handling, stable IDs and status filtering are implemented. WEBSITE-MAINTENANCE.md documents adding/editing, publishing/unpublishing, closing/archiving, application contacts and future integration.

Login, role-based permissions, vacancy editing controls, API fetching, persistent storage, application processing/uploads and an admin dashboard remain unimplemented. They require a real authenticated backend. No fake accounts, localStorage authentication or application forms were created.

## Files created

- careers.html
- assets/data/careers-data.js
- assets/js/careers.js
- assets/css/careers.css
- PRODUCT-CAREERS-UPDATE-REPORT.md

Six moved image files are listed separately in the mapping table above.

## Existing files modified in this task

- 404.html
- about.html
- contact.html
- delivery-policy.html
- faqs.html
- gallery.html
- index.html
- product-details.html
- products.html
- projects.html
- promotions.html
- quote.html
- return-policy.html
- services.html
- term-of-payment.html
- assets/data/product-data.js
- sitemap.xml
- WEBSITE-MAINTENANCE.md

The prior task's existing red/white theme, promotional/FAQ/policy pages and footer policy links remain in place. The sitemap has one new Careers URL, for 15 entries excluding 404. Careers metadata uses the existing canonical GitHub Pages base and Open Graph/Twitter conventions. Deployment configuration was not changed. The ignored historical mockup1 checkout was untouched.

## Verification results

- 16 active HTML pages × nine widths (320, 360, 375, 390, 430, 768, 1024, 1366, 1440): 144 page/width layout combinations passed. No horizontal overflow, missing local links/anchors/assets or JavaScript page errors.
- All six images loaded with correct original dimensions and alt text. Existing examples remained visible. All six product pages were checked at all nine widths, including 54 viewer opens and Escape closes. Full-image fitting, stable main images, mobile tap, synthetic swipe events and close controls passed.
- All original product data and gallery ordering passed structural preservation checks; moved PNGs passed byte-hash checks.
- Six role titles and recruitment email passed preservation checks. Cards, optional fields, six mouse detail toggles, keyboard Enter/Space, email URL subjects, no-JavaScript fallback and mobile navigation/dropdown passed.
- In-memory test records verified draft/closed/archived filtering, empty state, duplicate IDs, missing data, invalid application URLs, no-channel handling, valid/invalid closing dates and HTML-injection protection. Test records were never saved to site data.
- Homepage slideshow/filtering and FAQ accordion interactions passed. Regression page/link/layout checks covered Products, Projects, Promotions, FAQs, Services, Gallery, Contact, Quote, header/footer and visitor-counter asset loading. All original non-About main content matched the start-of-task snapshot; About retained its original career paragraph and anchor.
- JavaScript syntax, sitemap XML parsing, Git whitespace checks and desktop/320px Careers visual review passed. No new animations were added; existing reduced-motion styling is retained.

## Unresolved or unsupported information

Current availability of the six existing ongoing listings has not been independently reconfirmed. The company must approve future changes and provide missing job details. No uploaded image was left unresolved.

Third-party requests were blocked during isolated browser tests. Live social feeds, external fonts, live visitor-counter values, email delivery, WhatsApp sending, external application websites and deployed GitHub Pages behavior were not exercised. Existing integrations and configuration remain unchanged. Apply links were validated without sending applications.

## Git status

No files were staged, committed or pushed. The worktree also contains the earlier page expansion changes. Six deleted paths under assets/img/unused/images/06 Project & sample were already absent when this turn began; the supplied root images were present then. This task moved those root PNGs and preserved their bytes, without deleting other existing product images. See the final observed status below.

```text
 M 404.html
 M WEBSITE-MAINTENANCE.md
 M about.html
 M assets/css/site.css
 M assets/data/product-data.js
 D "assets/img/unused/images/06 Project & sample/12.png"
 D "assets/img/unused/images/06 Project & sample/13.png"
 D "assets/img/unused/images/06 Project & sample/14.png"
 D "assets/img/unused/images/06 Project & sample/16.png"
 D "assets/img/unused/images/06 Project & sample/3.png"
 D "assets/img/unused/images/06 Project & sample/6.png"
 M assets/js/site.js
 M contact.html
 M gallery.html
 M index.html
 M product-details.html
 M products.html
 M projects.html
 M quote.html
 M services.html
 M sitemap.xml
?? PRODUCT-CAREERS-UPDATE-REPORT.md
?? WEBSITE-UPDATE-REPORT.md
?? assets/css/careers.css
?? assets/data/careers-data.js
?? assets/img/products/catalogue-reference/awning-purple-salon-entrance-canopy.png
?? assets/img/products/catalogue-reference/motorized-roller-blinds-office-remote.png
?? assets/img/products/catalogue-reference/roman-blinds-cream-kitchen-window.png
?? assets/img/products/catalogue-reference/skylight-blinds-fabric-shades-glass-roof.png
?? assets/img/products/catalogue-reference/venetian-blinds-white-sunlit-window.png
?? assets/img/products/catalogue-reference/wooden-outdoor-blinds-green-geometric-print.png
?? assets/js/careers.js
?? careers.html
?? delivery-policy.html
?? faqs.html
?? promotions.html
?? return-policy.html
?? term-of-payment.html
```
