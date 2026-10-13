# Insect Screen and Tinted Product Details

Implemented locally only; no staging, commit, push, deployment or enquiry sending. Earlier Zebra/shared-Roller changes are retained.


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

## Files modified / added in this task

- assets/data/product-data.js: complete only the two Other product records and approved main-image paths.
- assets/data/other-product-details.js: supplier transcription, provenance and image audit.
- assets/js/product-details.js: screen and film selectors, previews, specifications, URL and enquiry integration.
- assets/js/catalogue.js: insert completed dynamic cards once.
- assets/css/product-details.css: scoped screen/film styling and supplier-diagram fitting.
- product-details.html: load supplier details.
- assets/img/products/insect-screen/: approved main image plus six supplier reference files.
- assets/img/products/tinted/: approved main image plus 29 labelled sample files.
- WEBSITE-MAINTENANCE.md and this report.

## Validation

Local headless Microsoft Edge checks passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px.

- 290 film selections, 40 screen-system selections and 330 intercepted WhatsApp drafts matched the selected code/type, shade, applicable mesh/finish, exact specification rows and image paths. No stale film metric or sliding-screen material remained after a selection change. Bulk selections used the real DOM click handlers; separate native mouse checks also passed.
- 40 catalogue-card checks (four cards at each width) verified the approved images, Other category, working detail links and absence of ratings, sold counts and BEST SELLER badges. Product category filters passed.
- One film preview remained square, contain-fit and at most 360px wide at every width. No horizontal overflow, missing local response or JavaScript error was found.
- Main-image, screen gallery and selected-film label lightboxes opened and closed correctly; gallery next-image controls worked. Native Tab/Enter/Space, focus retention after screen re-rendering and emulated touch taps passed for both selectors.
- Valid film-code links restore selection; unknown film codes fall back to a verified film. Switching between screen, film and existing blind/honeycomb products clears the previous selector state.
- All 20 non-legacy product pages passed load/name checks. Structured comparison against the pre-task snapshot confirms all other product records and aliases are unchanged. Earlier Zebra and shared-Roller work is preserved.
- The entire matrix ran below /mockup1/, exercising GitHub Pages-style relative paths, including source filenames containing spaces. External services/visitor counter and WhatsApp opening were intercepted. No message was sent.
- Desktop and mobile selector screenshots were visually inspected. Byte hashes confirm all 37 public images are identical to their supplier/approved source files. Original root PNGs and all nine screen / 47 film source photos remain intact.
- JavaScript syntax checks and git diff --check passed. No index staging, commit, push or deployment occurred.

Physical touch devices and other browser engines were not tested. Nine unclear film photographs remain excluded, and nine readable alternates remain unused. Two cord top-rail profiles, the chain inner/outer pull-rail gap ordering, the additional hardware's applicability/obscured head-rail weight, finish abbreviations and unassigned glass-yarn mesh require supplier confirmation. UV400's handwritten IRR value has no supplied test method and is not presented as TSER.
