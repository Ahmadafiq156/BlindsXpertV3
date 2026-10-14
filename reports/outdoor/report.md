# Outdoor configurators and Motorized selection-card report

Completed locally on 14 October 2026 using the existing records, as explicitly confirmed by the owner. No new catalogue products or URLs. No staging, commit, push or deployment.

| Existing product | Changes |
| --- | --- |
| Wooden Outdoor Blinds | Meranti Benang (Thread), Tangsi (Fishing Line), Dawai (Wire) binding selector; noted 3 mm thickness and 25 mm width, explicitly scoped to Meranti and not every wooden blind/method. |
| Bamboo Outdoor Blinds | Bamboo (Normal) — DB838, Bamboo — DB833, Bamboo (Timber Lux); noted 10 mm single-blind width and 3 mm thickness, not assumed identical for every variant. |
| Ziptrak Outdoor Blinds | Zip Tracks, Guided (Cable), Straight Drop selector. The latter two are clearly separate outdoor roller systems, not Ziptrak mechanisms. Full Surface/Slat Printing information and a separate optional request with unverified compatibility. |
| Motorized Blinds | Only the Roller system-card image reference removed. Matching compact card styling; option, title, description, selection and enquiry preserved. Main image, brands and videos intact. |

Existing IDs, titles, descriptions, images, links, customer fields and WhatsApp number are preserved. Central note-backed configuration supplies the original record's runtime options, using existing buttons, selected borders, URL state and enquiry generation. The three outdoor selectors support keyboard/touch and live selection labels. UV printing is never required or attached automatically; only a customer's explicit request is included with a compatibility-confirmation label. Product changes/blank picker clear and disable printing state.

Supplier confirmation: DB838 remains explicitly flagged in source, visible copy and its enquiry draft. No conflicting supplier record was found. Meranti/material applicability, measurements across methods/variants, Zip Tracks branding and printing/system compatibility remain unconfirmed. All statements follow the owner's text transcription and clarified existing-record mapping; the handwritten image is not available in the accessible project/attachments.

Files modified: `product-details.html`, `assets/js/product-details.js`, `assets/js/motorized-details.js`, `assets/css/product-details.css`, `WEBSITE-MAINTENANCE.md`. Added `assets/data/outdoor-product-details.js` and this audit folder. Original central product records, Home/Products catalogue and all approved assets are unchanged. Earlier local work is preserved.

Testing: 40 product/width combinations passed across 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px; no horizontal overflow. Twelve correct option enquiry drafts plus two printing preferences; keyboard selection, touch, shared viewers, valid URL fallback and product-switch cleanup passed. Focused checks passed for the blank picker and DB838 enquiry note. Thirteen unrelated-product smoke checks passed. No JavaScript errors or failed normal local media paths. Syntax and whitespace checks passed. Eight desktop/mobile screenshots were reviewed. See `test-results.json`, `test.cjs` and `focused-test.cjs`; no WhatsApp message was sent.

See WEBSITE-MAINTENANCE.md for the complete source notes and future maintenance guidance.
