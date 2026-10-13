# Dream Blinds, Insect Screen and Tinted update report

Implemented locally only. Earlier Zebra/shared Roller and Insect/Tinted work is preserved. No staging, commit, push or deployment.


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

## Files changed in this task

- assets/data/dream-colour-images.js and 13 Dream image assets.
- assets/data/other-product-details.js and six new Insect Screen example/reference assets.
- assets/data/product-data.js: Insect/Tinted suitability and demo-badge participation; Insect overview gallery/option mapping.
- assets/data/sales-counts.js: explicit null Insect/Tinted sales and verified ratings.
- assets/js/product-details.js: Dream derived catalogue, features/navigation, retained screen hardware diagrams.
- assets/js/site.js: shared dropdown additions.
- assets/js/catalogue.js: visible demo status and configured Number+ Sold formatting for these two cards.
- assets/css/product-details.css and assets/css/site.css: scoped feature/demo labels.
- product-details.html: load Dream manifest.
- WEBSITE-MAINTENANCE.md and this report.

## Validation

Local headless Microsoft Edge validation passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px.

- 160 navigation checks covered all 16 relevant root pages at every width: both new entries were present once, visible in the open dropdown, correctly linked, and all previous product links remained. Native mobile taps, desktop hover, ArrowDown and Escape/focus restoration were exercised for navigation; both new links navigated to the correct Product Details page. Native Tab/Enter/Space and touch taps were also exercised on the Dream colour selector. Visibility checks wait for the existing mobile menu animation before moving focus.
- 120 Dream colour selections and 40 screen selections verified exact photograph paths, collection/code or screen-type labels, selected states, preserved specification rows and 160 intercepted WhatsApp drafts. Dream displays exactly three collections with four images each. Hidden-colour deep links fall back to available colours; stale/hidden colours never enter enquiries.
- Dream preview is square, object-fit: contain and no wider than 360px at every width. Approximate swatch values match the visually reviewed image manifest.
- 40 default catalogue-card checks verified Suitable for, unchanged approved catalogue images, visible 5.0 Demo ratings, hidden unconfigured sold counts and no BEST SELLER badge. Four test-only badge states (missing verified values, configured verified values, configured demo values, and disabled badges) passed at every width on both catalogues. Existing green/gold colours and + Sold formatting were verified; synthetic test values were never saved to the website.
- Screen gallery lightboxes and next-image controls passed. The Dream supplier information viewer and retained Chain/Cord hardware-diagram viewers passed. Desktop/mobile card, Dream feature/selector and new screen overview screenshots were inspected; lazy reference images were loaded before final captures.
- All 20 non-legacy Product Details pages passed load/name checks. Structured comparisons confirm other product records/aliases, the complete Tinted supplier details and every screen's original specifications/features/accessories remain unchanged. The full fabric-catalogue.js file is byte-identical to the pre-task snapshot.
- No JavaScript errors, missing local responses or horizontal overflow were recorded. The matrix ran under /mockup1/, exercising GitHub Pages-style relative paths and exact filename casing. External services and WhatsApp opening were intercepted; no message was sent.
- All 19 new asset files (12 Dream colours, one Dream information image and six screen images) are byte-identical to the supplied originals. JavaScript syntax and git diff --check passed. No staging, commit, push or deployment occurred.

Physical touch devices and other browser engines were not tested. There are no unmatched new Dream or screen images. Existing supplier uncertainties remain: Dream thickness/light-fastness units; two Cord top-rail profiles; Chain pull-rail inner/outer gap ordering; unassigned glass-yarn mesh and additional aluminium hardware/finish abbreviations. Verified sales/reviews for Insect Screen and Tinted are still absent, so sold counts remain hidden and the visible rating is explicitly labelled Demo. The third Dream collection's original 8xx identifiers are intentionally preserved under the requested BX-300 collection label.
