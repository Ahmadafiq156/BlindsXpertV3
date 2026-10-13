# Dream Blinds corrections and catalogue improvements

Implemented locally only.


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

## Files changed

- assets/data/dream-colour-images.js: BX-800, corrected mapping/swatches and preserved prior provenance.
- assets/img/products/dream-blinds/colours/corrected/: 12 corrected source PNGs.
- assets/js/product-details.js: shared enquiry prompt and removal of the supplier illustration rendering.
- assets/css/product-details.css: compact prompt, enquiry scroll offset and full-width operating text.
- assets/data/product-data.js: explicit unverified placeholder status and hidden Demo labels for two cards only.
- assets/data/sales-counts.js: configurable 100+ demo values and production-safe allowDemoBadges switch.
- assets/js/catalogue.js: verified-source fallback and placeholder presentation/accessibility.
- WEBSITE-MAINTENANCE.md and this report.

## Validation

Local headless Microsoft Edge checks passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px.

- 120 Dream colour selections and 120 intercepted WhatsApp drafts matched the corrected photograph path, individual code and BX-100 / BX-200 / BX-800 collection. Every collection has four colours; preview frames are square, contain-fit and at most 360px. Swatch styles match the visually inspected corrected-photo manifest.
- 110 enquiry-link checks covered the 11 applicable selector pages at every width; all 20 product pages were checked for correct prompt applicability. Each applicable page has one prompt, pointing to #product-enquiry. Hash navigation preserves the product/selection query, enquiry summary and draft name field, opens no new window and does not submit the form. The destination is visible below the sticky header.
- Reduced-motion pages use auto scrolling; normal-motion pages retain smooth scrolling. A native touch check reached the enquiry section while preserving the selected film. Native keyboard Enter activates the enquiry link, and Tab/Enter/Space plus touch taps select Dream colours.
- All six written Dream feature cards and How Dream Blinds Work remain. No supplier-information figure or image is rendered; no empty frame remains. The main/example gallery viewer still opens approved images and excludes the removed illustration. Desktop/mobile screenshots were inspected.
- 40 catalogue-card checks verified 5.0 and 100+ Sold, no fixed visible Demo label, sample status in accessible labels, and the existing gold/star/green styling. Test-only production configuration with allowDemoBadges:false hides missing/unverified values and retains configured verified data for another product, even with legacy demo flags enabled. Synthetic verified test values were never saved.
- Structured comparisons confirm unrelated product records and all existing main galleries/descriptions remain unchanged. The complete fabric-catalogue.js is byte-identical to the pre-task snapshot. All 12 corrected public assets match their ZIP entries byte-for-byte; previous photo paths and the preserved supplier illustration asset still exist.
- No broken local references, JavaScript errors or horizontal overflow were recorded. The matrix ran under /mockup1/ to exercise GitHub Pages relative paths and filename casing. External services and WhatsApp opening were intercepted; no message was sent.
- JavaScript syntax and git diff --check passed. No staging, commit, push or deployment occurred.

Physical touch devices and other browser engines were not tested. No corrected file is unmatched or ambiguous. Existing unusual Dream supplier specification units remain flagged for confirmation. The default 5.0 / 100+ values are local preview placeholders, not verified statistics; the production switch is documented above.
