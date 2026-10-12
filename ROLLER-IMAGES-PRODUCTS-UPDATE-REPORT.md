# Roller images, Motorized gallery, selectors and new products — 12 October 2026

Implemented locally with original supplied assets and supplier catalogue records preserved. No staging, commits, push, deployment or enquiry sending. Existing user changes, including the pre-existing deletions of unused root Bamboo.png and rollerblinds.png, were retained.

## Image inventory and availability

**50 Roller image files found; 47 verified matches mapped to 12 existing fabric series.** Three SUNSHUT files cannot be matched to the verified supplier catalogue and are excluded pending supplier confirmation. **42 of the original 89 colours** lack matching supplied photos and are hidden only for Roller. BX 110, Carmen and Urban Stripe have no matching images and are hidden only in the Roller selector. All three existing Roller variants have verified images and remain selectable.

| Roller variant from supplied folder | Series | Mapped colours | Verified catalogue codes displayed |
|---|---|---:|---|
| Blackout | Cinma | 4 | CINMA 01, CINMA 02, CINMA 03, CINMA 04 |
| Blackout | Venus | 4 | VENUS 01, VENUS 02, VENUS 03, VENUS 04 |
| Blackout | BX 5406 | 4 | BX 5406R-9, BX 5406R-12, BX 5406R-2, BX 5406R-6 |
| Blackout | BX 200 | 4 | BX 200-1, BX 200-2, BX 200-4, BX 200-5 |
| Sunscreen | BX 210 | 4 | BX 210-6, BX 210-7, BX 210-8, BX 210-9 |
| Sunscreen | BX 211 | 4 | BX 211-1, BX 211-2, BX 211-3, BX 211-4 |
| Sunscreen | BX 3000 | 4 | RITZ 3001, RITZ 3002, RITZ 3003, RITZ 3004 |
| Sunscreen | BX 4000 | 4 | BX 4000-1, BX 4000-4, BX 4000-5, BX 4000-6 |
| Translucent | Aurora | 3 | AURORA 02, AURORA 03, AURORA 04 |
| Translucent | Max | 4 | MAX 01, MAX 02, MAX 03, MAX 04 |
| Translucent | Sunset | 4 | SUNSET 01, SUNSET 02, SUNSET 03, SUNSET 04 |
| Translucent | Econo | 4 | EC 4037, EC 4061, EC 4083, EC 4093 |

The complete shared 89-colour supplier catalogue remains unchanged in `assets/data/fabric-catalogue.js`. Panel, Vertical and Roman retain all 15 collections and 89 colours each, without Roller-only image filtering or image/HEX changes. Their unclassified collections remain accessible through “Browse collections awaiting variant confirmation,” so only the active variant's series are shown in the normal series grid. Existing Roman edge styles and Vertical arrangements remain separate product options.

The new source folders establish BX 210 as Sunscreen and Econo as Translucent for **Roller's image-backed view only**. This overrides the older Translucent/unclassified source assignments on that view without rewriting shared supplier records. BX 3000 image filenames use BX 3001–3004, while the original sheet labels those colours RITZ 3001–3004. Mapping was confirmed by series, exact numeric suffix and colour labels; the verified RITZ display codes are preserved. BX 5406's spaced “-R” filenames map to the original 5406R suffixes. No match was inferred from similar colour alone.

## Colours hidden only for Roller

| Supplier series | Hidden codes | Reason |
|---|---|---|
| BX 5406 | BX 5406R-5, BX 5406R-7, BX 5406R-10, BX 5406R-11, BX 5406R-13, BX 5406R-14 | No verified matching supplied photo |
| BX 200 | BX 200-3 | No verified matching supplied photo |
| BX 210 | BX 210-1, BX 210-2, BX 210-3, BX 210-4, BX 210-5 | No verified matching supplied photo |
| BX 211 | BX 211-5, BX 211-9 | No verified matching supplied photo |
| BX 3000 | RITZ 3011, RITZ 3012, RITZ 3013, RITZ 3014, RITZ 3015, RITZ 3016 | No verified matching supplied photo |
| BX 4000 | BX 4000-3, BX 4000-7 | No verified matching supplied photo |
| BX 110 | BX 110-2, BX 110-4, BX 110-6 | Entire series lacks verified matching photos |
| Aurora | AURORA 01 | No verified matching supplied photo |
| Carmen | CARMEN CM13, CARMEN CM23, CARMEN CM45, CARMEN CM74, CARMEN CM87, CARMEN CM98 | Entire series lacks verified matching photos |
| Econo | EC 4022, EC 4057, EC 4013, EC 4032 | No verified matching supplied photo |
| Urban Stripe | URBAN STRIPE US14, URBAN STRIPE US23, URBAN STRIPE US34, URBAN STRIPE US48, URBAN STRIPE US88, URBAN STRIPE US97 | Entire series lacks verified matching photos |

Hidden colours cannot be restored through URL colour/series parameters or emitted in Roller enquiries. Incompatible parameters fall back to a currently image-backed selection. No empty colour cards or substitute images are used. If a future variant has no mapped colours, its existing variant control remains with a concise unavailable-state message and no selectable fake colour.

## Unmatched / ambiguous assets

- `ROLLER BLINDS/TRANSLUCENT/SUNSHUT SERIES/SUNSHUT 01 WHITE.png`: SUNSHUT series and codes have no verified match in the existing supplier catalogue.
- `ROLLER BLINDS/TRANSLUCENT/SUNSHUT SERIES/SUNSHUT 02 BEIGE.png`: SUNSHUT series and codes have no verified match in the existing supplier catalogue.
- `ROLLER BLINDS/TRANSLUCENT/SUNSHUT SERIES/SUNSHUT 05 BURGANDY.png`: SUNSHUT series and codes have no verified match in the existing supplier catalogue.

SUNSHUT is not treated as a spelling alias of Sunset. Its files show fabric textures without a printed catalogue code, so appearance cannot establish a catalogue match. The original files remain untouched. The newly supplied INSECT SCREEN and TINTED folders also remain untouched and are not used as photographs, following the explicit placeholder-only instruction.

## Exact mapped files and refined swatches

All 47 approved images were exported without cropping or colour alteration as WebP files, at maximum 1200px, quality 92, under `assets/img/products/roller-blinds/<variant>/<series-id>/`. Original JPEG/PNG files remain intact in `ROLLER BLINDS/`. Approximate HEX values were refined from broad central fabric-only regions, avoiding outer edges/background/glare. These Roller-specific values do not mutate the shared swatches.

| Series | Supplier code | Original supplied file | Website image | Approximate HEX |
|---|---|---|---|---|
| BX 200 | BX 200-1 | ROLLER BLINDS/BLACKOUT/BX 200 SERIES/BX 200-1 WHITE.jpg | assets/img/products/roller-blinds/blackout/bx-200/bx-200-1.webp | #D1D3D2 |
| BX 200 | BX 200-2 | ROLLER BLINDS/BLACKOUT/BX 200 SERIES/BX 200-2 BEIGE.jpg | assets/img/products/roller-blinds/blackout/bx-200/bx-200-2.webp | #BFBCB3 |
| BX 200 | BX 200-4 | ROLLER BLINDS/BLACKOUT/BX 200 SERIES/BX 200-4 GREY.jpg | assets/img/products/roller-blinds/blackout/bx-200/bx-200-4.webp | #B2B6B5 |
| BX 200 | BX 200-5 | ROLLER BLINDS/BLACKOUT/BX 200 SERIES/BX 200-5 LIGHT CREAM.jpg | assets/img/products/roller-blinds/blackout/bx-200/bx-200-5.webp | #C5C5BD |
| BX 5406 | BX 5406R-9 | ROLLER BLINDS/BLACKOUT/BX 5406 SERIES/BX 5406 -R 9 BLACK.jpg | assets/img/products/roller-blinds/blackout/bx-5406/bx-5406r-9.webp | #707272 |
| BX 5406 | BX 5406R-12 | ROLLER BLINDS/BLACKOUT/BX 5406 SERIES/BX 5406-R 12 STONE.jpg | assets/img/products/roller-blinds/blackout/bx-5406/bx-5406r-12.webp | #A5A6A4 |
| BX 5406 | BX 5406R-2 | ROLLER BLINDS/BLACKOUT/BX 5406 SERIES/BX 5406-R 2 BEIGE.png | assets/img/products/roller-blinds/blackout/bx-5406/bx-5406r-2.webp | #B8C4BE |
| BX 5406 | BX 5406R-6 | ROLLER BLINDS/BLACKOUT/BX 5406 SERIES/BX 5406-R 6 BROWN.png | assets/img/products/roller-blinds/blackout/bx-5406/bx-5406r-6.webp | #9E8F79 |
| Cinma | CINMA 01 | ROLLER BLINDS/BLACKOUT/CINMA SERIES/CINMA 01 SNOW.png | assets/img/products/roller-blinds/blackout/cinma/cinma-01.webp | #BDC5C7 |
| Cinma | CINMA 02 | ROLLER BLINDS/BLACKOUT/CINMA SERIES/CINMA 02 GREY.png | assets/img/products/roller-blinds/blackout/cinma/cinma-02.webp | #AAAFB3 |
| Cinma | CINMA 03 | ROLLER BLINDS/BLACKOUT/CINMA SERIES/CINMA 03 BROWN.png | assets/img/products/roller-blinds/blackout/cinma/cinma-03.webp | #BEB9A6 |
| Cinma | CINMA 04 | ROLLER BLINDS/BLACKOUT/CINMA SERIES/CINMA 04 BLACK.png | assets/img/products/roller-blinds/blackout/cinma/cinma-04.webp | #8B8C8B |
| Venus | VENUS 01 | ROLLER BLINDS/BLACKOUT/VENUS SERIES/VENUS 01 WHITE TALE.png | assets/img/products/roller-blinds/blackout/venus/venus-01.webp | #AEB7BD |
| Venus | VENUS 02 | ROLLER BLINDS/BLACKOUT/VENUS SERIES/VENUS 02 TAN.png | assets/img/products/roller-blinds/blackout/venus/venus-02.webp | #B5B5B2 |
| Venus | VENUS 03 | ROLLER BLINDS/BLACKOUT/VENUS SERIES/VENUS 03 DUNE.png | assets/img/products/roller-blinds/blackout/venus/venus-03.webp | #C1C1C0 |
| Venus | VENUS 04 | ROLLER BLINDS/BLACKOUT/VENUS SERIES/VENUS 04 BLACK.png | assets/img/products/roller-blinds/blackout/venus/venus-04.webp | #858585 |
| BX 210 | BX 210-6 | ROLLER BLINDS/SUNSCREEN/BX 210 SERIES/BX 210-6 BLACK.jpg | assets/img/products/roller-blinds/sunscreen/bx-210/bx-210-6.webp | #686C72 |
| BX 210 | BX 210-7 | ROLLER BLINDS/SUNSCREEN/BX 210 SERIES/BX 210-7 GREEN WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-210/bx-210-7.webp | #A0A8A1 |
| BX 210 | BX 210-8 | ROLLER BLINDS/SUNSCREEN/BX 210 SERIES/BX 210-8 ROYAL BLUE.jpg | assets/img/products/roller-blinds/sunscreen/bx-210/bx-210-8.webp | #738BAD |
| BX 210 | BX 210-9 | ROLLER BLINDS/SUNSCREEN/BX 210 SERIES/BX 210-9 SAND.jpg | assets/img/products/roller-blinds/sunscreen/bx-210/bx-210-9.webp | #A59D8F |
| BX 211 | BX 211-1 | ROLLER BLINDS/SUNSCREEN/BX 211 SERIES/BX 211-1 WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-211/bx-211-1.webp | #D5D6D6 |
| BX 211 | BX 211-2 | ROLLER BLINDS/SUNSCREEN/BX 211 SERIES/BX 211-2 BEIGE WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-211/bx-211-2.webp | #BCBAB1 |
| BX 211 | BX 211-3 | ROLLER BLINDS/SUNSCREEN/BX 211 SERIES/BX 211-3 GREY WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-211/bx-211-3.webp | #B5B7B9 |
| BX 211 | BX 211-4 | ROLLER BLINDS/SUNSCREEN/BX 211 SERIES/BX 211-4 DIM GREY WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-211/bx-211-4.webp | #B2B5B5 |
| BX 3000 | RITZ 3001 | ROLLER BLINDS/SUNSCREEN/BX 3000 SERIES/BX 3001 WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-3000/ritz-3001.webp | #CECFD0 |
| BX 3000 | RITZ 3002 | ROLLER BLINDS/SUNSCREEN/BX 3000 SERIES/BX 3002 BEIGE.jpg | assets/img/products/roller-blinds/sunscreen/bx-3000/ritz-3002.webp | #CAC6BD |
| BX 3000 | RITZ 3003 | ROLLER BLINDS/SUNSCREEN/BX 3000 SERIES/BX 3003 WHITE GREY.jpg | assets/img/products/roller-blinds/sunscreen/bx-3000/ritz-3003.webp | #AFB0B1 |
| BX 3000 | RITZ 3004 | ROLLER BLINDS/SUNSCREEN/BX 3000 SERIES/BX 3004 DARK GREY.jpg | assets/img/products/roller-blinds/sunscreen/bx-3000/ritz-3004.webp | #5A5C64 |
| BX 4000 | BX 4000-1 | ROLLER BLINDS/SUNSCREEN/BX 4000 SERIES/BX 4000-1 BEIGE WHITE.jpg | assets/img/products/roller-blinds/sunscreen/bx-4000/bx-4000-1.webp | #B6B4A8 |
| BX 4000 | BX 4000-4 | ROLLER BLINDS/SUNSCREEN/BX 4000 SERIES/BX 4000-4 BRONZE.jpg | assets/img/products/roller-blinds/sunscreen/bx-4000/bx-4000-4.webp | #96928B |
| BX 4000 | BX 4000-5 | ROLLER BLINDS/SUNSCREEN/BX 4000 SERIES/BX 4000-5 COFFEE.jpg | assets/img/products/roller-blinds/sunscreen/bx-4000/bx-4000-5.webp | #ACA59E |
| BX 4000 | BX 4000-6 | ROLLER BLINDS/SUNSCREEN/BX 4000 SERIES/BX 4000-6 BLACK.jpg | assets/img/products/roller-blinds/sunscreen/bx-4000/bx-4000-6.webp | #7C7D7B |
| Aurora | AURORA 02 | ROLLER BLINDS/TRANSLUCENT/AURORA SERIES/AURORA 02.png | assets/img/products/roller-blinds/translucent/aurora/aurora-02.webp | #C7C0B4 |
| Aurora | AURORA 03 | ROLLER BLINDS/TRANSLUCENT/AURORA SERIES/AURORA 03.png | assets/img/products/roller-blinds/translucent/aurora/aurora-03.webp | #BCBCB5 |
| Aurora | AURORA 04 | ROLLER BLINDS/TRANSLUCENT/AURORA SERIES/AURORA 04.png | assets/img/products/roller-blinds/translucent/aurora/aurora-04.webp | #BCB5A5 |
| Econo | EC 4037 | ROLLER BLINDS/TRANSLUCENT/ECONO SERIES/EC 4037 RUSSET.png | assets/img/products/roller-blinds/translucent/econo/ec-4037.webp | #AAACA9 |
| Econo | EC 4061 | ROLLER BLINDS/TRANSLUCENT/ECONO SERIES/EC 4061 GREEN.png | assets/img/products/roller-blinds/translucent/econo/ec-4061.webp | #A5A9A9 |
| Econo | EC 4083 | ROLLER BLINDS/TRANSLUCENT/ECONO SERIES/EC 4083 BROWN.png | assets/img/products/roller-blinds/translucent/econo/ec-4083.webp | #B37B73 |
| Econo | EC 4093 | ROLLER BLINDS/TRANSLUCENT/ECONO SERIES/EC 4093 BLACK.png | assets/img/products/roller-blinds/translucent/econo/ec-4093.webp | #1F1F21 |
| Max | MAX 01 | ROLLER BLINDS/TRANSLUCENT/MAX SERIES/MAX 01 WHITE.png | assets/img/products/roller-blinds/translucent/max/max-01.webp | #BFC0C3 |
| Max | MAX 02 | ROLLER BLINDS/TRANSLUCENT/MAX SERIES/MAX 02 DARK BEIGE.png | assets/img/products/roller-blinds/translucent/max/max-02.webp | #C4BEAE |
| Max | MAX 03 | ROLLER BLINDS/TRANSLUCENT/MAX SERIES/MAX 03 LAND.png | assets/img/products/roller-blinds/translucent/max/max-03.webp | #A6A8A5 |
| Max | MAX 04 | ROLLER BLINDS/TRANSLUCENT/MAX SERIES/MAX 04 GREY.png | assets/img/products/roller-blinds/translucent/max/max-04.webp | #A9AEB0 |
| Sunset | SUNSET 01 | ROLLER BLINDS/TRANSLUCENT/SUNSET SERIES/SUNSET 01 CREAM.png | assets/img/products/roller-blinds/translucent/sunset/sunset-01.webp | #D2CDBF |
| Sunset | SUNSET 02 | ROLLER BLINDS/TRANSLUCENT/SUNSET SERIES/SUNSET 02 BEIGE.png | assets/img/products/roller-blinds/translucent/sunset/sunset-02.webp | #D6D2C6 |
| Sunset | SUNSET 03 | ROLLER BLINDS/TRANSLUCENT/SUNSET SERIES/SUNSET 03 DARK BEIGE.png | assets/img/products/roller-blinds/translucent/sunset/sunset-03.webp | #B4B3AE |
| Sunset | SUNSET 04 | ROLLER BLINDS/TRANSLUCENT/SUNSET SERIES/SUNSET 04 KHAKI.png | assets/img/products/roller-blinds/translucent/sunset/sunset-04.webp | #8B8E87 |

`assets/data/roller-colour-images.js` holds the sparse code-to-photo/HEX/source mapping. The renderer derives a stable Roller-only catalogue view from the complete shared records. All production photo paths are project-relative and exact-case checked. The preview stays a square at maximum 360px with contain sizing, one active supplied photograph, selected code/name and red swatch outline. Valid photos use a loading status, not a “photo pending” placeholder. Other products keep their existing placeholder behaviour.

## Motorized main image

The shared source path is **`motorizedblinds.png`**. Home and Products already used this file; Motorized Product Details now uses it as the main gallery image and thumbnail too, with preserved viewer/lightbox behaviour. Remaining Motorized examples and every unrelated product gallery are unchanged. No duplicate image file was created.

## Selector hierarchy

Roller, Panel, Vertical and Roman now show STEP 1 — Choose Fabric Variant, STEP 2 — Choose Fabric Series, and STEP 3 — Choose a Colour. Primary variants have larger tinted segmented cards, stronger typography and a red accent; secondary series cards are compact (80px) with white backgrounds/thin outlines. Full-width responsive Grid and the existing 360px preview are preserved. Known series belong only to the active variant; pending-classification supplier series remain available through an explicit separate browse control. Styles/arrangements on Roman and Vertical stay separate and remain in enquiry drafts.

## New products

| Product | Category | Shared Product Details link | Images, badges and data |
|---|---|---|---|
| Insect Screen | Other | product-details.html?product=insect-screen | Branded placeholder only; no images, specifications, variants, colours, counts, ratings or BEST SELLER claim |
| Tinted | Other | product-details.html?product=tinted | Branded placeholder only; no images, specifications, variants, colours, counts, ratings or BEST SELLER claim |

Both products are central records and appear in Home and Products. Shared detail pages show “Product information coming soon.” and preserve the normal enquiry form, while hiding unprovided galleries/specifications. `catalogueBadges: false` prevents the global demonstration rating from being applied to these products. Existing products' badges/configuration are unchanged. Other-category filters and accessible product-count announcements include the new cards.

## Files modified / added by this task

- `assets/data/roller-colour-images.js` — Roller-only availability and image/HEX/source mappings.
- `assets/img/products/roller-blinds/` — 47 approved WebP image derivatives.
- `assets/data/product-data.js` — Motorized main gallery record and two minimal Other product entries.
- `assets/js/product-details.js` — derived Roller catalogue, real-photo loading, distinct step selectors, pending-collection browse and coming-soon detail states.
- `assets/js/catalogue.js` — complete branded placeholders, optional suitability and per-product badge suppression.
- `assets/css/product-details.css` — distinct full-width variant/series styles.
- `assets/css/site.css` — placeholders filling existing square inner frames.
- `product-details.html` — sparse image mapping script loading.
- `products.html` — accessible filter-count status matching Home.
- `WEBSITE-MAINTENANCE.md` — updated data, image, selector and product-entry instructions.
- `ROLLER-IMAGES-PRODUCTS-UPDATE-REPORT.md` — this report.

## Validation

Local headless Edge validation passed at **320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px**.

- **750 palette-group checks, 470 actual Roller photo selections/decodes and 4,250 intercepted WhatsApp drafts.** Every visible Roller colour displayed its exact mapped photograph with no pending-photo placeholder; selected code, refined HEX, fabric specifications and enquiry variant/series/code stayed correct. No enquiry was sent.
- Every new image path was checked segment by segment for exact filesystem casing and project-relative syntax. All 47 WebP files decode; all 135 existing gallery image/thumbnail references resolve. No broken local responses or JavaScript errors were observed.
- Hidden BX 200-3 and the entirely hidden BX 110 series were tested through direct URL parameters: neither unavailable colour became selectable or entered Roller state. Panel still resolves its full-catalogue BX 210-1 choice. Original shared supplier data and sales/rating configuration matched the pre-edit snapshot exactly.
- Panel, Vertical and Roman retained all 15 collections/89 colours and their placeholder behaviour. Independent Roman styles/Vertical arrangements, explicit pending-classification browsing, first-colour resets, focus retention, Enter/Space/Tab and emulated touch taps passed.
- The four stepped selectors used full-container CSS Grid at every width, visibly distinct variant/series styling, compact secondary series cards and a square preview capped at 360px. No horizontal page/grid overflow occurred. Other Zebra/Dream/Honeycomb configurators and all 20 Product Details entries were checked for regressions.
- Home and Products each contain 20 cards. Both new Other entries have correctly sized neutral placeholders, valid shared detail links and no images, suitability claims, ratings, sales counts or BEST SELLER badges. Every existing category filter and count announcement returned the expected counts. The new coming-soon detail pages include the normal enquiry form without fabricated fabric/variant/colour lines.
- Home, Products and Motorized Product Details all resolve `motorizedblinds.png`. Opening/closing the Motorized lightbox and returning keyboard focus works; remaining Motorized examples and every unrelated gallery were preserved by structural comparison.
- Rapid successive Roller colour changes retained the current photograph. Mobile/desktop photo previews, hierarchy and product placeholders were visually inspected. A placeholder hover overlay caught during visual review was corrected only for the new placeholder-only cards; a separate final check passed both catalogue pages at all ten widths, including hovered-state neutral backgrounds and visible coming-soon text.
- JavaScript syntax and `git diff --check` passed. External services/fonts/the live counter were stubbed during local validation. Physical touch devices and other browser engines were not tested.

The three SUNSHUT files still need verified supplier-series/code confirmation; this is the only unmatched new Roller asset group. Original source files were not deleted or modified.
