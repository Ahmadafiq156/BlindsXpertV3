# Venetian Lantex & Aluminium Update Report

Implemented locally only. No staging, commits, push or deployment.

## Files

- assets/data/venetian-colour-collections.js: complete supplier transcription, image availability, source provenance and swatch sampling.
- assets/js/product-details.js: scoped Venetian type, Lantex series, colour preview, specifications and enquiry state.
- product-details.html: loads the new data.
- assets/css/product-details.css: scoped full-width cards.
- 41 JPEG assets under assets/img/products/venetian-blinds/lantex and aluminium/25mm.
- WEBSITE-MAINTENANCE.md and this report.

Product records and shared fabric catalogue are byte-for-byte unchanged. Timber/PVC retain their original specifications and main photos. Enhanced images appear only in the single selected-colour preview; supplier scans are not rendered.

## Availability and complete colour lists

12 of 12 Lantex enhanced photographs mapped; 29 of 31 Aluminium photographs mapped.

### Lantex

**Black-Out Series (DSB)** — 4 visible; 5 hidden supplier records.

Visible: BX 50113-DSB — White; BX 50320-DSB — Alabaster; BX 50334-DSB — Pecan; BX 50378-DSB — Cocoa.

Hidden: LD 50100-DSB — Snow White; LD 50125-DSB — Vanilla; LD 50370-DSB — Champagne Brown; LD 50295-DSB — Country Redwood; LD 50822-DSB — Silver.

Verified specifications:

- Composition: 100% polyster
- Finish Process: Anti Static Coating
- Fabric Width: 50 mm
- Fabric Thickness: 0.50 mm
- Fabric Weight (g/m): 20 g/m
- Light Blockage: 90%
- Light Fastness: Grade 5

**Design Series** — 4 visible; 13 hidden supplier records.

Visible: BX 50895-J897 — Turbulence; BX 50515-J897 — Aspen Green; BX 50357-J897 — Caramel; BX 50357-S897 — Light Chocolat.

Hidden: LD 50023-J897 — Duskblue; LD 50376-J897 — Beluga; LD 50375-J897 — Cub; LD 50433-J897 — Olive; LD 50349-J897 — Crushedberry; LD 50100-J897 — Ash; LD 50417-J897 — Glass; LD 50206-J897 — Stone; LD 50430-J897 — Coke Wheat; LD 50601-J897 — Teal; LD 50100-S897 — Grey; LD 50022-S897 — Dark Grey; LD 50378-S897 — Dark Cocoa.

Verified specifications:

- Composition: 100% polyester
- Finish Process: Anti Static Coating
- Fabric Width: 50 mm
- Fabric Thickness: 0.50 mm
- Fabric Weight (g/m): 20 g/m
- Light Blockage: 80%
- Light Fastness: Grade 5

**Normal Series** — 4 visible; 15 hidden supplier records.

Visible: BX 50417 — Canapy; BX 50203 — Baby Pink; BX 50504 — Moss; BX 50334 — Pecan.

Hidden: LD 50987 — Black; LD 50100 — Snow White; LD 50113 — White; LD 50125 — Vanilla; LD 50206 — Peach; LD 50215-R — Carnation Pink; LD 50822 — Grey; LD 50627 — Provence Blue; LD 50823 — Silver; LD 50503 — Celadon; LD 50601 — Blueice; LD 50430 — Wheat; LD 50357 — Praline; LD 50295 — Country Redwood; LD 50378 — Cocoa.

Verified specifications:

- Composition: 100% polyester
- Finish Process: Anti Static Coating
- Fabric Width: 50 mm
- Fabric Thickness: 0.50 mm
- Fabric Weight (g/m): 20 g/m
- Light Blockage: 80%
- Light Fastness: Grade 5

### Aluminium

**25mm Aluminium** — 29 visible; 69 hidden supplier records.

Visible: BX-902 P; BX-9625; BX-045; BX-101 P; BX-9601; BX-080; BX-809 P; BX-156; BX-065; BX-109 P; BX-155; BX-123; BX-512 P; BX-150; BX-021; BX-073; BX-601 P; BX-035; BX-022; BX-9610; BX-151; BX-158; BX-9632; BX-149; BX-9628; BX-129; BX-9612; BX-154; BX-068.

Hidden: SP-036; SP-038; SP-027; SP-066; SP-126; SP-132; SP-084; SP-128; SP-137; SP-078 M; SP-074; SP-028; SP-024; SP-011; SP-054; SP-098; SP-157; SP-152; SP-134; SP-017; SP-067; SP-086; SP-095; SP-140; SP-146; SP-153; SP-133; SP-075; SP-014; SP-069; SP-057 M; SP-143; SP-142; SP-131; SP-201; SP-081 M; SP-209 M; SP-029; SP-033; SP-107; SP-120; SP-060 M; SP-042; SP-011; SP-112 M; SP-019; SP-016; SP-051; SP-043; SP-139; SP-111; SP-103; SP-055 M; SP-096; SP-103; SP-013; SP-146; SP-064 M; SP-012; SP-070; SP-037; SP-106; SP-040; SP-210 M; SP-099; SP-089; SP-015; SP-092 M; SP-061.

Verified specifications:

- Material: Aluminium
- Slat width: 25mm

**50mm Aluminium** — 0 visible; 6 hidden supplier records.

Visible: None — collection hidden.

Hidden: SP-011; SP-019; SP-043; SP-051; SP-061; SP-064 M.

Verified specifications:

- Material: Aluminium
- Slat width: 50mm

## Mapping decisions and source limitations

LD is converted to BX and SP to BX without changing the numeric identifier or suffix. Both Design 50357-J897 and 50357-S897 remain distinct. Archive spelling “Caramet” and its separator 0 do not replace the verified supplier name Caramel/J897. The archive folder BSD does not replace the supplier DSB suffix.

The two SP-148 images (Red and Purple folders) have no matching code in the supplied catalogue; both are excluded. Hue folders are not supplier series and are not shown as series. Aluminium has one image-backed 25mm collection; the 50mm collection has no mapped photographs and is hidden. No unverified colour names, thickness or finish are added. Repeated chart codes remain separate source records. One cropped 50mm sample has no readable code and is documented in data notes rather than invented.

Source spelling “100% polyster” and “Canapy” is preserved. Light blockage is 90% for Black-Out and 80% for Design/Normal. Supplier NFPA wording has no supplied standard/report and is not presented as certification.

All images retain their source bytes and original filenames. Each mapping stores both source archive paths; sample rectangles and median RGB-to-HEX method are recorded. Lantex samples use the central texture; Aluminium samples use the centre of the slat face, avoiding background and glare strips.

## Validation

The automated browser run covers all 41 colours at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px (410 image/WhatsApp draft checks), all four type switches, Lantex series changes, stale-state removal and document horizontal overflow. Other product pages receive a JavaScript/render smoke check. Screenshots and machine-readable results are retained outside the repository in the task visualization folder. Additional keyboard, touch, URL restoration, gallery preservation and file integrity checks are recorded there.

## Upper Material Selection restoration

Restored the original upper Venetian material controls directly after the title and description by removing the Venetian-only hide condition. Placement, markup, styling and material options match the previous Git version. Both upper and collection controls call `chooseOption`, maintaining one active material, selected button states, collection/colour/specification updates and WhatsApp drafts. No image, specification, title, description or gallery data changed.

Validation: 80 material-switch/WhatsApp checks passed across 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px; both directions of selector synchronization, all three four-colour Lantex series, 29-colour Aluminium availability, Timber/PVC stale-state removal, keyboard activation and horizontal overflow checks passed. All 20 product pages passed the JavaScript/render smoke check.
