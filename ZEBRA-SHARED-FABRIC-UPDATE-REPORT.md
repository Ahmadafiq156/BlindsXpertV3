# Zebra enhanced images and shared Roller photographs

Implemented locally only. No staging, commit, push or deployment.


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

## Files changed

- assets/js/product-details.js: shared image-backed Roller view, derived Zebra availability/display correction and image-loading state.
- product-details.html: load the Zebra image manifest.
- assets/data/zebra-colour-images.js: verified availability, swatches, source paths and exclusions.
- assets/img/products/zebra-blinds/colours/: 22 source photographs, original names and bytes preserved.
- WEBSITE-MAINTENANCE.md and this report.

## Validation

Local headless Microsoft Edge validation passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px.

- 2,100 automated colour selections and 2,100 intercepted WhatsApp drafts verified the exact shared/Zebra photograph path, displayed colour code, selected series, one pressed swatch, square frame, maximum 360px width, object-fit: contain and absence of horizontal page overflow. Bulk selections trigger the actual DOM click handlers; native mouse checks were performed separately.
- Every visible series specification table was compared with the preserved supplier record on all five affected products. Series changes reset to an available colour and synchronize the URL; hidden-series deep links fall back to an available series. No unavailable colour entered a draft.
- Native mouse, Tab navigation, Enter, Space, focus retention after series rendering and emulated touch taps passed for all five selectors. Roman Straight edge / Scallop edge and Vertical Mix & match colour / Custom colour options were checked; Panel and Roller linked variants were exercised in the full responsive matrix, including pending classifications.
- All 20 non-legacy product pages passed load/name checks. Source comparisons confirm product-data.js, fabric-catalogue.js, roller-colour-images.js and existing CSS are unchanged, preserving unrelated products, product galleries, supplier data and Roller assignments.
- Local /mockup1/ subdirectory validation passed for each mapped series, matching GitHub Pages relative-path hosting. No broken local responses or JavaScript errors were recorded. External services, visitor-counter requests and WhatsApp opening were intercepted; no message was sent.
- Zebra desktop/mobile and Roman mobile screenshots were visually inspected. Hash comparisons confirm all 22 added photographs are byte-identical to their original ZIP entries.
- JavaScript syntax checks and git diff --check passed.

Physical touch devices and other browser engines were not tested. Four conflicting Zebra filenames remain excluded pending supplier confirmation; no mapping was inferred from appearance. No staging, commit, push or deployment was performed.
