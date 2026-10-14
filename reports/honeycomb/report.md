# Honeycomb colour image integration

## Honeycomb colour photographs (14 October 2026)

This section supersedes the Honeycomb placeholder and 44 visible colours described above. All five root-level archives were inspected before website edits. They contain flat archive entries, JPEG photographs only, and no collection metadata or additional supplier sheets. Filename size suffixes and the existing supplier catalogue establish each full collection + cell size + fabric type + code mapping. FC size membership comes from the existing supplier records. Unsuffixed S/SF/W files map to Honeycomb-26; ` 38` suffixed files map to Honeycomb-38. Archive order never determines selector order.

| Archive | Images |
| --- | ---: |
| `Honeycomb_Enhanced_SmallPart_01.zip` | 6 |
| `Honeycomb_Enhanced_SmallPart_02.zip` | 8 |
| `Honeycomb_Enhanced_SmallPart_03.zip` | 8 |
| `Honeycomb_Enhanced_SmallPart_04.zip` | 10 |
| `Honeycomb_Enhanced_SmallPart_05.zip` | 10 |

42 images, 42 unique SHA-256 hashes, 42 mapped colours. No duplicate images, unmatched files, or new colour records. Repeated S/SF/W code strings are independent images in separate size/type folders. FC-13 and FC-14 (FC Honeycomb 25mm) lack uploaded photographs: their original catalogue records and original swatches remain intact but are filtered out of the runtime selector, including URL selection.

| Collection | Size | Fabric type | Visible colours |
| --- | --- | --- | ---: |
| fc-25 | 25mm | fc | 14 |
| fc-38 | 38mm | fc | 8 |
| honeycomb-26 | 26mm | blackout | 7 |
| honeycomb-26 | 26mm | mesh-sunscreen | 2 |
| honeycomb-26 | 26mm | semi-blackout | 3 |
| honeycomb-38 | 38mm | mesh-sunscreen | 1 |
| honeycomb-38 | 38mm | semi-blackout | 7 |

The existing supplier classification caveats remain: Honeycomb-38 S/SF codes retain the printed Semi-Blackout grouping provisionally, with the existing customer notice and provenance preserved. FC has no verified printed fabric-type name; none is invented. The older FC 38mm supplier sheet header conflict is still recorded above. These photographs do not independently certify fabric classification.

Assets retain their exact original filenames under `assets/img/products/honeycomb-blinds/<collection-id>/<type-id>/`. All paths are relative and preserve casing and spaces. The main gallery and all other product assets remain unchanged. `closeUpImage` and the approximate photographic `swatchHex` are set on matching supplier records; `imageSource` retains archive entry, SHA-256 and sampled region alongside the original supplier `source`. `honeycombCatalogue` in `assets/js/product-details.js` derives an image-backed view without deleting supplier records. Keep this filter if additional images are added.

Every photo was visually inspected on the contact sheet. Swatches use median RGB from an inner, moderately lit fabric pleat, excluding outer edges, deep fold shadows and brightest reflections. Photos are approximations affected by lighting, not certified physical colour matches. The retained red selected border and outlined swatch chips keep labels and light colours visible. The shared square preview remains capped at 360px with `object-fit:contain`; Honeycomb photos now open the shared image viewer by click/tap or Enter/Space. Size, collection and type changes use the existing state reset, specifications and enquiry paths.

### Complete colour/image/HEX mapping

| Collection | Size | Type | Code | Original image | Archive part | HEX |
| --- | --- | --- | --- | --- | --- | --- |
| fc-25 | 25mm | fc | FC-01 | `FC-01.jpg.jpeg` | 04 | `#B6B7B5` |
| fc-25 | 25mm | fc | FC-02 | `FC-02.jpg.jpeg` | 05 | `#BFC1BF` |
| fc-25 | 25mm | fc | FC-03 | `FC-03.jpg.jpeg` | 04 | `#B9BAB3` |
| fc-25 | 25mm | fc | FC-04 | `FC-04.jpg.jpeg` | 05 | `#B9B8B2` |
| fc-25 | 25mm | fc | FC-05 | `FC-05.jpg.jpeg` | 05 | `#ADA691` |
| fc-25 | 25mm | fc | FC-06 | `FC-06.jpg.jpeg` | 04 | `#A6A38E` |
| fc-25 | 25mm | fc | FC-07 | `FC-07.jpg.jpeg` | 05 | `#A3A9A9` |
| fc-25 | 25mm | fc | FC-08 | `FC-08.jpg.jpeg` | 05 | `#A2A6A1` |
| fc-25 | 25mm | fc | FC-09 | `FC-09.jpg.jpeg` | 05 | `#7D7D77` |
| fc-25 | 25mm | fc | FC-10 | `FC-10.jpg.jpeg` | 01 | `#919392` |
| fc-25 | 25mm | fc | FC-11 | `FC-11.jpg.jpeg` | 03 | `#8D8778` |
| fc-25 | 25mm | fc | FC-12 | `FC-12.jpg.jpeg` | 02 | `#9B9283` |
| fc-25 | 25mm | fc | FC-15 | `FC-15.jpg.jpeg` | 02 | `#979AA0` |
| fc-25 | 25mm | fc | FC-16 | `FC-16.jpg.jpeg` | 04 | `#64645F` |
| fc-38 | 38mm | fc | FC-19 | `FC-19.jpg.jpeg` | 05 | `#AFB1B0` |
| fc-38 | 38mm | fc | FC-20 | `FC-20.jpg.jpeg` | 01 | `#7C7C76` |
| fc-38 | 38mm | fc | FC-23 | `FC-23.jpg.jpeg` | 04 | `#B2B2AC` |
| fc-38 | 38mm | fc | FC-24 | `FC-24.jpg.jpeg` | 02 | `#B5B5AB` |
| fc-38 | 38mm | fc | FC-27 | `FC-27.jpg.jpeg` | 03 | `#9E9E98` |
| fc-38 | 38mm | fc | FC-28 | `FC-28.jpg.jpeg` | 02 | `#A3A5A0` |
| fc-38 | 38mm | fc | FC-31 | `FC-31.jpg.jpeg` | 01 | `#7E817D` |
| fc-38 | 38mm | fc | FC-32 | `FC-32.jpg.jpeg` | 03 | `#818785` |
| honeycomb-26 | 26mm | blackout | SF-001 | `SF-001.jpg.jpeg` | 03 | `#A9ADAF` |
| honeycomb-26 | 26mm | blackout | SF-002 | `SF-002.jpg.jpeg` | 03 | `#A9A9A0` |
| honeycomb-26 | 26mm | blackout | SF-003 | `SF-003.jpg.jpeg` | 03 | `#A8A392` |
| honeycomb-26 | 26mm | blackout | SF-006 | `SF-006.jpg.jpeg` | 03 | `#94A5AD` |
| honeycomb-26 | 26mm | blackout | SF-010 | `SF-010.jpg.jpeg` | 03 | `#8B7760` |
| honeycomb-26 | 26mm | blackout | SF-012 | `SF-012.jpg.jpeg` | 01 | `#92999A` |
| honeycomb-26 | 26mm | blackout | SF-014 | `SF-014.jpg.jpeg` | 01 | `#718395` |
| honeycomb-26 | 26mm | mesh-sunscreen | W-001 | `W-001.jpg.jpeg` | 04 | `#A3A4A0` |
| honeycomb-26 | 26mm | mesh-sunscreen | W-002 | `W-002.jpg.jpeg` | 05 | `#A1A39A` |
| honeycomb-26 | 26mm | semi-blackout | S-001 | `S-001.jpg.jpeg` | 04 | `#ABADAA` |
| honeycomb-26 | 26mm | semi-blackout | S-002 | `S-002.jpg.jpeg` | 04 | `#9EA195` |
| honeycomb-26 | 26mm | semi-blackout | S-006 | `S-006.jpg.jpeg` | 01 | `#879394` |
| honeycomb-38 | 38mm | mesh-sunscreen | W-001 | `W-001 38.jpg.jpeg` | 05 | `#A7A8A3` |
| honeycomb-38 | 38mm | semi-blackout | S-001 | `S-001 38.jpg.jpeg` | 05 | `#BABBBE` |
| honeycomb-38 | 38mm | semi-blackout | SF-001 | `SF-001 38.jpg.jpeg` | 02 | `#B7B8B9` |
| honeycomb-38 | 38mm | semi-blackout | SF-002 | `SF-002 38.jpg.jpeg` | 04 | `#ABABA1` |
| honeycomb-38 | 38mm | semi-blackout | SF-006 | `SF-006 38.jpg.jpeg` | 02 | `#8C9BA0` |
| honeycomb-38 | 38mm | semi-blackout | SF-010 | `SF-010 38.jpg.jpeg` | 02 | `#6F5C46` |
| honeycomb-38 | 38mm | semi-blackout | SF-012 | `SF-012 38.jpg.jpeg` | 02 | `#858D8B` |
| honeycomb-38 | 38mm | semi-blackout | SF-014 | `SF-014 38.jpg.jpeg` | 04 | `#6A7D8E` |

### Audit and validation

`reports/honeycomb/inventory.json` is the complete machine-readable inventory, including dimensions, bytes, hashes, exact archive entries, full mappings, asset paths and updated HEX values. `reports/honeycomb/contact-sheet.jpg` shows every uploaded photograph. `reports/honeycomb/test.cjs` runs the local browser checks and writes `test-results.json`; mobile and desktop screenshots are retained beside it. No ZIP files are rendered as galleries. No staging, commit, push or deployment is performed.


### Validation results and changed files

- Inspected all five archives: counts 6, 8, 8, 10 and 10. All 42 original images are unique and every extracted file matches its archive SHA-256.
- Edge browser checks cover all seven size/collection/type combinations at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: correct colour counts, preview maximum width and no horizontal overflow.
- All 42 colour selections load their exact mapped photograph without broken-image or JavaScript errors. Each of seven enquiry drafts contains the selected size, collection, applicable fabric type and code, plus name, phone, address, email, site visit and customer message. Tests intercept the draft URL; no WhatsApp message is sent.
- Keyboard Enter opens the shared viewer and Escape closes it. Touch selects a 26mm colour. Invalid FC-13 links fall back to an image-backed colour; both missing FC codes are absent from the selector.
- Other-product smoke checks load Roller, Zebra, Dream and Venetian pages. A separate data comparison confirms every non-Honeycomb catalogue record is unchanged and all original Honeycomb codes, supplier metadata and specifications are preserved.
- JavaScript syntax checks and `git diff --check` pass. Mobile and desktop screenshots were reviewed.
- Modified: `assets/data/fabric-catalogue.js`, `assets/js/product-details.js`, `WEBSITE-MAINTENANCE.md`.
- Added: 42 photographs under `assets/img/products/honeycomb-blinds/`, plus inventory, contact sheet, browser results, screenshots, verification scripts and report under `reports/honeycomb/`.
- Existing Honeycomb-38 Semi-Blackout supplier classification remains provisional. No unmatched image mappings remain. No staging, commit, push or deployment.
