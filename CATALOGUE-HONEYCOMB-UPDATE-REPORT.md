# Product catalogue, selectors and Honeycomb — 12 October 2026

Implemented locally; original ZIPs, supplier photographs and product galleries are preserved. No staging, commits, push, deployment or enquiry sending. Existing uncommitted work was retained.

## Motorized image

Both Home and Products now use the same central `catalogueImage`: **`motorizedblinds.png`**, the newly supplied root image showing motorized roller blinds with a remote control. It is square (1254×1254), fits the existing inner frame with cover sizing and remains at its original source path. Motorized title, category, descriptions, badges, links and Product Details gallery were preserved. The Products HTML fallback also uses the same file.

## Honeycomb colour counts

| Collection | Size | Fabric type | Verified colour records |
|---|---|---|---:|
| FC Honeycomb | 25mm | Not printed / not invented | 16 |
| FC Honeycomb | 38mm | Not printed / not invented | 8 |
| Honeycomb-26 | 26mm | Semi-Blackout | 3 |
| Honeycomb-26 | 26mm | Blackout | 7 |
| Honeycomb-26 | 26mm | Mesh / Sunscreen | 2 |
| Honeycomb-38 | 38mm | Semi-Blackout | 7 |
| Honeycomb-38 | 38mm | Mesh / Sunscreen | 1 |

Total: **44 colour records** across four supplier collections (36 distinct code strings; S/SF/W codes recur across sizes). FC 25mm has exactly FC-01–FC-16; FC 38mm has exactly FC-19, FC-20, FC-23, FC-24, FC-27, FC-28, FC-31, FC-32. FC-17/18 and missing intermediate FC codes were not invented. No Honeycomb-38 Blackout type was created.

## Swatch audit

All **198 colour records** were re-sampled from their supplier images and visually inspected beside the resulting approximate HEX values. The 154 existing Zebra/Roller/Dream records already matched the sample regions and needed **0 HEX corrections**. **44 new Honeycomb swatches** were individually assigned; FC-16 is very dark `#141414`. Shared Roller data remains one central source for Roller, Vertical, Panel and Roman. No neutral fallback was needed for an unidentifiable sample. Photographic lighting and texture still limit colour accuracy; physical samples remain the reference.

## Supplier uncertainties and omitted claims

- Honeycomb-38 prints both S and SF codes under Semi-Blackout. That visible category is preserved provisionally and flagged on the page; no prefix-based reassignment to Blackout.
- The FC 38mm photo header says 25mm, while all eight sample labels say 38mm. The 38mm grouping follows those sample labels and the explicit owner mapping; header discrepancy is flagged.
- Honeycomb colour names and FC fabric-type names are not provided; none were invented. Composition, weight, maximum width, thickness and installation limits lack verified information and are omitted.
- Numerical supplier performance claims (energy saving, UV-blocking, temperature difference and colour-fastness grade) have no verified applicability/test conditions, so none are published as product performance. Overview and features are qualified.
- Previous Zebra/Roller/Dream source questions remain unresolved, including Zebra SP 402 / BL CREAM, missing mass units, Roller unclassified collections and Dream unusual units. This task does not silently reinterpret them.

## Honeycomb source audit and swatches

### FC Honeycomb — 25mm

Source: `C:\Users\ahmad\Downloads\WhatsApp Unknown 2026-10-12 at 09.49.40.zip → WhatsApp Image 2026-10-12 at 09.49.23.jpeg`

| Fabric type | Colour code | Approximate HEX |
|---|---|---|
| Not supplied | FC-01 | #C0C2BD |
| Not supplied | FC-02 | #DFE1E0 |
| Not supplied | FC-03 | #C9C8A8 |
| Not supplied | FC-04 | #DAD6AD |
| Not supplied | FC-05 | #938163 |
| Not supplied | FC-06 | #9E9170 |
| Not supplied | FC-07 | #7E8180 |
| Not supplied | FC-08 | #939B98 |
| Not supplied | FC-09 | #626362 |
| Not supplied | FC-10 | #585961 |
| Not supplied | FC-11 | #5D5346 |
| Not supplied | FC-12 | #5F5547 |
| Not supplied | FC-13 | #72716D |
| Not supplied | FC-14 | #443A43 |
| Not supplied | FC-15 | #5E5D6B |
| Not supplied | FC-16 | #141414 |

### FC Honeycomb — 38mm

Source: `C:\Users\ahmad\Downloads\WhatsApp Unknown 2026-10-12 at 09.49.40.zip → WhatsApp Image 2026-10-12 at 09.49.23 (1).jpeg`

| Fabric type | Colour code | Approximate HEX |
|---|---|---|
| Not supplied | FC-19 | #DBDCE1 |
| Not supplied | FC-20 | #343434 |
| Not supplied | FC-23 | #D4D0B5 |
| Not supplied | FC-24 | #BDBAAB |
| Not supplied | FC-27 | #75746F |
| Not supplied | FC-28 | #8B8D8A |
| Not supplied | FC-31 | #383C3B |
| Not supplied | FC-32 | #4E5152 |

### Honeycomb-26 — 26mm

Source: `C:\Users\ahmad\Downloads\WhatsApp Unknown 2026-10-12 at 09.49.40.zip → WhatsApp Image 2026-10-12 at 09.49.23 (2).jpeg`

| Fabric type | Colour code | Approximate HEX |
|---|---|---|
| Semi-Blackout | S-001 | #D6D6D6 |
| Semi-Blackout | S-002 | #989585 |
| Semi-Blackout | S-006 | #77858E |
| Blackout | SF-001 | #A0A3A7 |
| Blackout | SF-002 | #727368 |
| Blackout | SF-003 | #908566 |
| Blackout | SF-006 | #6B7D8B |
| Blackout | SF-010 | #6D5745 |
| Blackout | SF-012 | #717578 |
| Blackout | SF-014 | #455469 |
| Mesh / Sunscreen | W-001 | #BCBDB8 |
| Mesh / Sunscreen | W-002 | #9F9D91 |

### Honeycomb-38 — 38mm

Source: `C:\Users\ahmad\Downloads\WhatsApp Unknown 2026-10-12 at 09.49.40.zip → WhatsApp Image 2026-10-12 at 09.49.24.jpeg`

| Fabric type | Colour code | Approximate HEX |
|---|---|---|
| Semi-Blackout | S-001 | #BDBEC0 |
| Semi-Blackout | SF-001 | #A7A9AE |
| Semi-Blackout | SF-002 | #74746A |
| Semi-Blackout | SF-006 | #48575C |
| Semi-Blackout | SF-010 | #544130 |
| Semi-Blackout | SF-012 | #4F5555 |
| Semi-Blackout | SF-014 | #364354 |
| Mesh / Sunscreen | W-001 | #989A99 |

The two supplied overview/measurement images in `C:/Users/ahmad/Downloads/WhatsApp Unknown 2026-10-12 at 09.27.40.zip` were also inspected. No original supplier images appear in a colour configurator.

## Dream codes renamed

All **21 displayed colour codes** retain their source separator and suffix. The three displayed code groups change from A1-1xx/A1-2xx/A1-8xx colours to BX-1xx/BX-2xx/BX-8xx colours. Original source codes, stable IDs, colour names, HEX values and source/image paths remain unchanged.

| Original code | Displayed code |
|---|---|
| A1-101 | BX-101 |
| A1-102 | BX-102 |
| A1-103 | BX-103 |
| A1-104 | BX-104 |
| A1-105 | BX-105 |
| A1-109 | BX-109 |
| A1-111 | BX-111 |
| A1-201 | BX-201 |
| A1-202 | BX-202 |
| A1-203 | BX-203 |
| A1-204 | BX-204 |
| A1-205 | BX-205 |
| A1-211 | BX-211 |
| A1-212 | BX-212 |
| A1-801 | BX-801 |
| A1-802 | BX-802 |
| A1-804 | BX-804 |
| A1-805 | BX-805 |
| A1-812 | BX-812 |
| A1-813 | BX-813 |
| A1-814 | BX-814 |

## Shared selector styling

Every fabric, variant, Honeycomb-size and type card uses the same 104px height, 8px radius, 16px title, 13px secondary text, responsive padding, 12px gap, hover treatment and red selected/focus outlines. Full-width CSS Grid wraps naturally, normally four across at desktop, narrowing to three/two and two on mobile. Cards/palette/specifications have no 900px restriction or horizontal scrolling. The shared preview remains capped at 360px. Existing product hierarchies and Roman styles remain intact; single Honeycomb collections are labelled instead of adding fake fabric-series controls.

## Files modified

- `assets/data/product-data.js`: Motorized catalogue override; Honeycomb overview/features, verified product specifications, central catalogue link and preserved Home-card copy.
- `assets/data/fabric-catalogue.js`: four Honeycomb collections/types/colours/HEX values/source references; Dream displayed BX prefixes.
- `assets/js/product-details.js`: Honeycomb dependent selectors, deep links, preview caption and WhatsApp draft.
- `assets/css/product-details.css`: shared full-width Grid/card styling for all selectors.
- `assets/js/catalogue.js`: catalogue-specific description support, preserving Honeycomb Home copy.
- `products.html`: static Motorized image fallback.
- `WEBSITE-MAINTENANCE.md`: current source/data/styling/colour/photo maintenance guidance.
- `CATALOGUE-HONEYCOMB-UPDATE-REPORT.md`: this report.

The original supplied `motorizedblinds.png` is referenced in place and was not modified. No other product gallery, card copy, description, badge, rating, navigation or footer source was edited.

## Validation

Local headless Edge validation passed at **320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px**.

- **780 palette-group checks and 4,650 intercepted WhatsApp drafts**, including 440 Honeycomb drafts. Every colour record's displayed HEX, selected code, applicable collection/type and rendered specification rows matched the central data. No message was sent.
- Both Home and Products were checked at every width: the Motorized card resolves `motorizedblinds.png`, decodes successfully and fills its unchanged inner frame with cover sizing. Each page's original title and Home's original Honeycomb catalogue text were verified.
- Every fabric/variant/size/type grid used full container width, CSS Grid, consistent 104px cards/8px radii/16px titles and no horizontal grid scrolling. One shared preview/placeholder, no supplier images in configurators and the 360px preview cap passed throughout.
- Honeycomb size, collection and type changes reset to compatible first colours. Duplicate S/SF/W codes stay in their correct size/type records; 25mm cannot display Honeycomb-38 codes, and Honeycomb-38 has no unsupported Blackout type. Cross-size/type URL parameters fall back safely. The mixed-prefix Semi-Blackout notice is retained.
- All 21 Dream displayed BX codes map to their original A1 records and unchanged swatches. Original A1 colour deep links still resolve; enquiries contain the displayed BX codes.
- Native Enter/Space/Tab and focus retention passed. A separate mobile context with touch enabled passed actual tap events on all seven products, including Honeycomb size/type/colour controls.
- Existing Roman styles and Vertical arrangements remain independent of fabric type. Switching from Honeycomb to Roller clears Honeycomb controls/state and restores correctly ordered selectors. All 18 existing Product Details pages were checked at every width, including other products using the shared card styling.
- No horizontal page overflow, JavaScript errors or missing local HTTP responses were observed. Structural comparisons verified that every product gallery and original option list is unchanged; other product data is unchanged except the explicitly requested Honeycomb information and Motorized catalogue override.
- All 198 sampled patches were visually reviewed. Representative mobile/desktop configurators and both Motorized cards were inspected. JavaScript syntax and `git diff --check` passed. External services, fonts and the live counter were stubbed during local tests.

Physical touch devices and other browser engines were not tested. Actual future close-up photographs need path/load/error and visual checks when supplied. Supplier category/header questions remain pending as documented above.
