# Timber collection implementation report

Verified locally on 14 October 2026. The workspace already contained the Timber implementation, image inventory and browser test script when this request was read; this pass audited the source files, reran verification and completed documentation. Existing unrelated working changes were preserved. No staging, commit, push or deployment was performed.

## Implementation and files

Timber uses the existing Venetian data-driven material, series and colour architecture. The upper material selector remains present and synchronized with the lower controls. Switching materials resets invalid series/colour values. Visible collections are derived only from supplier records with an enhanced-image mapping. The original main gallery and Photos & Examples are not populated with these colour photographs.

Implementation files: assets/data/venetian-colour-collections.js (supplier records, Timber metadata and 16 image mappings); assets/js/product-details.js (Timber steps, series specifications, preview accessibility and enquiry values); assets/css/product-details.css (existing square preview sizing). Enhanced assets: assets/img/products/venetian-blinds/timber/timber-pl-35/ and timber-pl-50/. Documentation: WEBSITE-MAINTENANCE.md and this report. Audit artifacts: inventory.json, baseline.json, test.cjs, test-results.json, contact-sheet.jpg, desktop.png, mobile.png, supplier scans and unmatched/ under reports/timber/. Reference scans and unmatched photographs are audit files, not website galleries. write-report.cjs reproduces this documentation after successful tests.

## Source inspection and availability

info.zip contains three WOODEN BLINDS images: 13.05.02.jpeg supplies the PL colour chart; 13.05.02 (1).jpeg supplies the component data sheet; 13.05.46 (1).jpeg supplies construction diagrams. All three were visually reviewed. The PL chart prints both SP 35mm-WB and SP 50mm-WB. Series labels Wooden 35mm (PL) and Wooden 50mm (PL) distinguish those verified size variants.

The enhanced ZIP contains **48 images**, all inspected in the contact sheet. All 48 ZIP-entry hashes and preserved on-disk copies were checked. **16 series/colour entries** are verified: eight in Wooden 35mm (PL), eight in Wooden 50mm (PL). These represent eight colour codes available in two widths. The two widths are legitimate distinct selections, not duplicate cards in a series. No alternate-view duplicate was identified.

Complete displayed code/name list in each series: PL 01 White; PL 02 Mahogany; PL 03 Beech; PL 04 Teak; PL 05 Dark Walnut; PL 06 Natural; PL 07 Black; PL 08 Grey. All verified PL catalogue colours have matching enhanced photos, so there are no hidden PL catalogue records without photos. The 32 other enhanced files remain preserved but unselectable. W28, W35, W50 and 850xx cannot be assigned to PL colours by visual similarity. PVC/Bamboo archive folders do not establish Timber eligibility. Filenames, exact archive paths, detected series, codes, supplier references, SHA-256 hashes, dimensions, proposed/preserved paths and confidence are retained for every image in inventory.json.

### Verified visible mappings

Each row matches WOODEN BLINDS/WhatsApp Image 2026-10-07 at 13.05.02.jpeg by PL code, printed name and width folder. Original enhanced filenames are preserved. HEX values are approximate slat samples from the central sample region recorded in image metadata; they are not supplier colour specifications. The red selection border and light-swatch outlines remain.

| Series | Code | Name | Original filename | Website path | Approximate HEX |
| --- | --- | --- | --- | --- | --- |
| timber-pl-35 | PL 03 | Beech | PL 03 BEECH.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 03 BEECH.jpg | #8E7C6E |
| timber-pl-50 | PL 05 | Dark Walnut | PL 05 DARK WALNUT.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 05 DARK WALNUT.jpg | #90867C |
| timber-pl-50 | PL 06 | Natural | PL 06 NATURAL.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 06 NATURAL.jpg | #CBB591 |
| timber-pl-35 | PL 04 | Teak | PL 04 TEAK.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 04 TEAK.jpg | #9E7E6E |
| timber-pl-50 | PL 08 | Grey | PL 08 GREY.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 08 GREY.jpg | #8C8C89 |
| timber-pl-50 | PL 03 | Beech | PL 03 BEECH.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 03 BEECH.jpg | #A38E7A |
| timber-pl-50 | PL 01 | White | PL 01 WHITE.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 01 WHITE.jpg | #E4E5D5 |
| timber-pl-35 | PL 08 | Grey | PL 08 GREY.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 08 GREY.jpg | #8A8A86 |
| timber-pl-35 | PL 01 | White | PL 01 WHITE.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 01 WHITE.jpg | #E0E2D6 |
| timber-pl-35 | PL 02 | Mahogany | PL 02 MAHOGANY.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 02 MAHOGANY.jpg | #887B76 |
| timber-pl-35 | PL 06 | Natural | PL 06 NATURAL.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 06 NATURAL.jpg | #D7C4A3 |
| timber-pl-50 | PL 02 | Mahogany | PL 02 MAHOGANY.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 02 MAHOGANY.jpg | #81756F |
| timber-pl-50 | PL 04 | Teak | PL 04 TEAK.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 04 TEAK.jpg | #9B8478 |
| timber-pl-35 | PL 05 | Dark Walnut | PL 05 DARK WALNUT.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 05 DARK WALNUT.jpg | #837A71 |
| timber-pl-35 | PL 07 | Black | PL 07 BLACK.jpg | assets/img/products/venetian-blinds/timber/timber-pl-35/PL 07 BLACK.jpg | #605F5B |
| timber-pl-50 | PL 07 | Black | PL 07 BLACK.jpg | assets/img/products/venetian-blinds/timber/timber-pl-50/PL 07 BLACK.jpg | #676461 |

### Excluded files

| Detected archive collection | Original filename | Reason | Preserved path |
| --- | --- | --- | --- |
| real-wood-28 | W28 - 06A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 06A.jpg |
| real-wood-28 | W28 - 03A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 03A.jpg |
| real-wood-28 | W28 - 08A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 08A.jpg |
| pvc-25 | TPW - 5 White.jpg | Not mapped: different material | reports/timber/unmatched/pvc-25/TPW - 5 White.jpg |
| real-wood-50 | W50 - 05.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/W50 - 05.jpg |
| real-wood-35 | W35 - 04.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-35/W35 - 04.jpg |
| bamboo-25 | 85021 Bright Natural.jpg | Not mapped: different material | reports/timber/unmatched/bamboo-25/85021 Bright Natural.jpg |
| real-wood-35 | W35 - 05.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-35/W35 - 05.jpg |
| real-wood-35 | W35 - 01.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-35/W35 - 01.jpg |
| real-wood-50 | 85004.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/85004.jpg |
| pvc-25 | TPW - 4 Mahogany.jpg | Not mapped: different material | reports/timber/unmatched/pvc-25/TPW - 4 Mahogany.jpg |
| pvc-25 | TPW - 3 Golden Walnut.jpg | Not mapped: different material | reports/timber/unmatched/pvc-25/TPW - 3 Golden Walnut.jpg |
| real-wood-28 | W28 - 02A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 02A.jpg |
| pvc-25 | TPW - 2 Pecan.jpg | Not mapped: different material | reports/timber/unmatched/pvc-25/TPW - 2 Pecan.jpg |
| real-wood-50 | W50 - 01.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/W50 - 01.jpg |
| real-wood-50 | 85001.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/85001.jpg |
| real-wood-28 | W28 - 012A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 012A.jpg |
| real-wood-50 | W50 - 04.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/W50 - 04.jpg |
| real-wood-50 | W50 - 03.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/W50 - 03.jpg |
| pvc-25 | TPW - 1 Birch.jpg | Not mapped: different material | reports/timber/unmatched/pvc-25/TPW - 1 Birch.jpg |
| real-wood-28 | W28 - 01A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 01A.jpg |
| real-wood-50 | 85003.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/85003.jpg |
| real-wood-50 | 85006.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/85006.jpg |
| real-wood-28 | W28 - 015A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 015A.jpg |
| bamboo-25 | 85043 Fawn Cherry.jpg | Not mapped: different material | reports/timber/unmatched/bamboo-25/85043 Fawn Cherry.jpg |
| real-wood-28 | W28 - 011A.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-28/W28 - 011A.jpg |
| bamboo-25 | 85054 Antique Rose.jpg | Not mapped: different material | reports/timber/unmatched/bamboo-25/85054 Antique Rose.jpg |
| bamboo-25 | 85032 Golden Oak.jpg | Not mapped: different material | reports/timber/unmatched/bamboo-25/85032 Golden Oak.jpg |
| real-wood-35 | W35 - 03.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-35/W35 - 03.jpg |
| bamboo-25 | 85065 Tiger Eye.jpg | Not mapped: different material | reports/timber/unmatched/bamboo-25/85065 Tiger Eye.jpg |
| real-wood-35 | W35 - 02.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-35/W35 - 02.jpg |
| real-wood-50 | W50 - 02.jpg | Not mapped: no matching code chart in info.zip | reports/timber/unmatched/real-wood-50/W50 - 02.jpg |

## Verified specifications and uncertainties

The selected PL series displays Material: Wooden blinds and Slat Width: 35 mm or 50 mm. No finish or PL-specific slat thickness/wood species is asserted. The supplier data sheet separately gives the following component information, retaining its original units and Thickness/Specification labels:

| Component | Thickness (as printed) | Weight | Specification (as printed) |
| --- | --- | --- | --- |
| Paulownia-wood louver | 50mm × 2.5mm | 0.064kg | 100cm |
| Paulownia-wood M-type sealing board | 63.5mm × 7mm | 0.222kg | 100cm |
| Paulownia-wood type bottom rail | 50mm × 15mm | 0.354kg | 100cm |
| Basswood louver | 50mm × 2.6mm | 0.052kg | 100cm |
| Basswood M-type sealing board | 63.5mm × 7mm | 0.150kg | 100cm |
| Basswood type bottom rail | 50mm × 15mm | 0.279kg | 100cm |

These component values are not attributed to either selected PL series. The construction sheet shows 35 mm and 50 mm chain and pull systems, but its smaller technical labels are too small to transcribe confidently; no extra dimensions or system-to-colour compatibility were inferred. Finish and per-series thickness require supplier confirmation.

## Enquiries and verification

The local browser suite passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920 px, with both Timber series checked at each width. No horizontal overflow; preview width stays at or below 360 px. All 16 previews loaded from their exact mapped paths. Square frames, image fit and selected labels were visually reviewed in desktop/mobile screenshots. Keyboard Enter opens the existing image viewer and Escape closes it; touch selects Timber, the 50 mm series and PL 08.

All 16 WhatsApp drafts were intercepted locally and checked for Product: Venetian Blinds, Material: Timber, the correct Series and Colour, plus existing customer fields. The WhatsApp number remains unchanged and no message was sent. No undefined/null values were found. Invalid hidden colour URL values fall back to PL 01. Switching among Lantex, Aluminium, PVC and Timber passes: Lantex retains 12 colours, Aluminium 29, and PVC its original fallback. Baseline comparisons preserve non-Timber supplier/image records. No JavaScript page exceptions or failed local asset responses occurred. No supplier scan appeared in the rendered image selectors. JavaScript syntax and git diff --check passed. Full machine results are in test-results.json.

## Adding colours later

Keep full supplier records in supplier.Timber even if no image exists. Add a colour image mapping only after obtaining an exact supplier code/series match and a verified enhanced photograph. Preserve original filenames and casing under the appropriate Timber series folder. Record provenance, hash and slat HEX sampling in images and inventory.json. The configurator filters records without image mappings, so they cannot be selected or submitted. Do not expose unmatched W/850xx, Bamboo or PVC files without new supporting catalogue evidence. Rerun test.cjs and update count assertions when verified availability changes.
