# Window Tinting Film & Venus Corrections Report

Implemented locally only; nothing staged, committed, pushed or deployed.

## Files changed

- `assets/data/product-data.js`: renamed only the tinted product's displayed name to Window Tinting Film.
- `assets/js/site.js`: updated the shared Products dropdown name; existing tinted ID/link preserved.
- `assets/data/other-product-details.js`: added a separate three-photo gallery; original 29-film dataset unchanged.
- `assets/js/product-details.js`: replaced film selection controls with the static gallery and shared lightbox; removed automatic film selection. Enquiries require no film. Updated the empty Photos & Examples message to refer to the sample gallery.
- `assets/css/product-details.css`: scoped gallery styling: three desktop columns, two at tablet widths, one on mobile; square frames with contain fitting preserve image aspect ratios.
- `assets/data/fabric-catalogue.js`: Venus 01 display name corrected from WHITE TALE to White Talc.
- Three original PNG files under `assets/img/products/tinted/gallery/`.
- `WEBSITE-MAINTENANCE.md` and this report.

## Selected TINTED.zip images

The archive contains exactly three distinct relevant sample photographs; all were inspected and selected:

1. `DBK 50 USA.png`
2. `IR-60 BLUE USA.png`
3. `UV400 6590.png`

Original filenames and bytes are preserved. Captions identify the source samples only and make no performance claims. No images were generated. The existing viewer supports keyboard activation, touch and navigation among all three photographs.

## Preservation and Venus corrections

The 29-film dataset, original sample images and technical source records remain in the project. The main tinting image/gallery, product description, Other category, Suitable for information and badge metadata are unchanged. The enquiry flow generates a Window Tinting Film message without film code/shade or obsolete metric values. No hidden required film input remains; the removed controls are absent from the DOM.

Roller, Panel, Vertical and Roman share the corrected Venus record. White Talc now appears in selection accessibility labels, preview names, image alternative text and WhatsApp messages on all four pages. VENUS 01, both supplier/enhanced HEX data, existing image mappings and all other colours/variant relationships are unchanged. The historical WHITE TALE source filename remains deliberately unchanged; no duplicate colour was created.

## Validation

Integrity comparisons confirm the entire original supplier detail dataset is unchanged apart from the separate gallery addition, all 29 original film image paths exist, product data differs only in the tinted name, fabric data differs only in the Venus 01 name, and the shared enhanced Roller image map is byte-for-byte unchanged. All three copied gallery photographs match the source bytes.

Browser validation covers 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: home/products card names and existing detail links, shared dropdown name/link, exactly three loaded film photographs, expected column counts, absence of the old selector, keyboard/touch lightbox activation, film-free WhatsApp drafts and removal of obsolete film URL state. All four Venus pages are checked at every width for name, accessible label, loaded original enhanced image and WhatsApp text. Horizontal overflow and JavaScript errors are checked. A 20-product render smoke check follows. Evidence is stored outside the repository in the task visualization folder.

Results: all ten widths passed; 40 Venus page/name/image/WhatsApp checks passed (four products × ten widths). Film gallery, name/link, film-free enquiry, keyboard/touch viewer and responsive-column checks passed at every width. Viewer next/previous navigation passed. All 20 product pages passed smoke checks, with zero JavaScript errors or horizontal overflow on tested detail pages. Integrity checks passed as described above.
