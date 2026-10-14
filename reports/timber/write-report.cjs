const fs = require('fs');
const vm = require('vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync('assets/data/venetian-colour-collections.js', 'utf8'), context);
const source = context.window.BLINDSXPERT_VENETIAN;
const inventory = JSON.parse(fs.readFileSync('reports/timber/inventory.json'));
const results = JSON.parse(fs.readFileSync('reports/timber/test-results.json'));
if (!results.passed) throw new Error('Browser verification must pass before writing the report');
const rows = inventory.filter(x => x.status === 'mapped').map(x => `| ${x.series} | ${x.code} | ${x.colourName} | ${x.filename} | ${x.path} | ${x.swatchHex} |`).join('\n');
const unmatched = inventory.filter(x => x.status !== 'mapped').map(x => `| ${x.series} | ${x.filename} | ${x.confidence} | ${x.path} |`).join('\n');
const components = source.timberInformation.components.map(x => `| ${x.name} | ${Object.values(x.specs).join(' | ')} |`).join('\n');
const report = `# Timber collection implementation report

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
${rows}

### Excluded files

| Detected archive collection | Original filename | Reason | Preserved path |
| --- | --- | --- | --- |
${unmatched}

## Verified specifications and uncertainties

The selected PL series displays Material: Wooden blinds and Slat Width: 35 mm or 50 mm. No finish or PL-specific slat thickness/wood species is asserted. The supplier data sheet separately gives the following component information, retaining its original units and Thickness/Specification labels:

| Component | Thickness (as printed) | Weight | Specification (as printed) |
| --- | --- | --- | --- |
${components}

These component values are not attributed to either selected PL series. The construction sheet shows 35 mm and 50 mm chain and pull systems, but its smaller technical labels are too small to transcribe confidently; no extra dimensions or system-to-colour compatibility were inferred. Finish and per-series thickness require supplier confirmation.

## Enquiries and verification

The local browser suite passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920 px, with both Timber series checked at each width. No horizontal overflow; preview width stays at or below 360 px. All 16 previews loaded from their exact mapped paths. Square frames, image fit and selected labels were visually reviewed in desktop/mobile screenshots. Keyboard Enter opens the existing image viewer and Escape closes it; touch selects Timber, the 50 mm series and PL 08.

All 16 WhatsApp drafts were intercepted locally and checked for Product: Venetian Blinds, Material: Timber, the correct Series and Colour, plus existing customer fields. The WhatsApp number remains unchanged and no message was sent. No undefined/null values were found. Invalid hidden colour URL values fall back to PL 01. Switching among Lantex, Aluminium, PVC and Timber passes: Lantex retains 12 colours, Aluminium 29, and PVC its original fallback. Baseline comparisons preserve non-Timber supplier/image records. No JavaScript page exceptions or failed local asset responses occurred. No supplier scan appeared in the rendered image selectors. JavaScript syntax and git diff --check passed. Full machine results are in test-results.json.

## Adding colours later

Keep full supplier records in supplier.Timber even if no image exists. Add a colour image mapping only after obtaining an exact supplier code/series match and a verified enhanced photograph. Preserve original filenames and casing under the appropriate Timber series folder. Record provenance, hash and slat HEX sampling in images and inventory.json. The configurator filters records without image mappings, so they cannot be selected or submitted. Do not expose unmatched W/850xx, Bamboo or PVC files without new supporting catalogue evidence. Rerun test.cjs and update count assertions when verified availability changes.
`;
fs.writeFileSync('reports/timber/report.md', report);
const maintenance = 'WEBSITE-MAINTENANCE.md';
const marker = '\n## Timber enhanced colour collection — 14 October 2026\n';
const existing = fs.readFileSync(maintenance,'utf8');
const before = existing.includes(marker) ? existing.slice(0, existing.indexOf(marker)) : existing;
fs.writeFileSync(maintenance, before + marker + '\n48 enhanced files audited; 16 verified selections (PL 01–08 in each of 35 mm and 50 mm), with 32 unmatched or other-material files preserved and excluded. No PL supplier colours are missing photographs. The complete specifications, colour names, image mappings, excluded filenames, future update procedure and ten-width browser results are documented in [reports/timber/report.md](reports/timber/report.md). Full source records remain in assets/data/venetian-colour-collections.js; provenance and confidence for every ZIP image remain in reports/timber/inventory.json. Component measurements are separate from PL series specifications because species/thickness applicability is unverified. Lantex 12, Aluminium 29 and PVC regression checks pass. No stage, commit, push or deployment.\n');
console.log('Timber report and maintenance documentation updated');
