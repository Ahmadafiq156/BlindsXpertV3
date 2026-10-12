# Roller Blinds source extraction and implementation — 12 October 2026

Implemented locally from the original `info.zip`. No staging, commit, push, deployment or enquiry sending. Existing uncommitted changes were preserved. Only Roller fabric data and Roller-specific rendering were updated; shared Zebra palette rendering and CSS remain unchanged from the start of this task.

| Variant | Collection | Verified colours | Specifications extracted |
|---|---|---:|---|
| Blackout | Cinma | 4 | Yes |
| Blackout | Venus | 4 | Yes |
| Blackout | BX 5406 | 10 | Yes |
| Blackout | BX 200 | 5 | Yes |
| Sunscreen | BX 210 | 9 | Yes |
| Sunscreen | BX 211 | 6 | Yes |
| Sunscreen | BX 3000 | 10 | Yes |
| Sunscreen | BX 4000 | 6 | Yes |

Total: 54 verified colours. Translucent has zero collections/colours and remains pending for four future collections.

## Source mapping and verified labels

### Blackout — Cinma

Colour photograph: `info.zip → ROLLER BLINDS/CINMA SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.02.02.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/CINMA SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.02.02 (1).jpeg`

CINMA 01 — SNOW; CINMA 02 — GREY; CINMA 03 — BROWN; CINMA 04 — BLACK.

### Blackout — Venus

Colour photograph: `info.zip → ROLLER BLINDS/VENUS SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.01.42.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/VENUS SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.01.43.jpeg`

VENUS 01 — WHITE TALE; VENUS 02 — TAN; VENUS 03 — DUNE; VENUS 04 — BLACK.

### Blackout — BX 5406

Colour photograph: `info.zip → ROLLER BLINDS/SP 5406 SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.01.14.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 5406 SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.01.15.jpeg`

BX 5406R-1 — BLACK; BX 5406R-2 — BEIGE; BX 5406R-5 — GREY; BX 5406R-6 — BROWN; BX 5406R-7 — DARK BROWN; BX 5406R-10 — WHITE; BX 5406R-11 — DARK GREY; BX 5406R-12 — DUNE; BX 5406R-13 — ASH; BX 5406R-14 — GREEN.

### Blackout — BX 200

Colour photograph: `info.zip → ROLLER BLINDS/SP 200 SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.00.45.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 200 SERIES BLACKOUT/WhatsApp Image 2026-10-07 at 12.00.46.jpeg`

BX 200-1 — WHITE; BX 200-2 — BEIGE; BX 200-3 — PEACH; BX 200-4 — GREY; BX 200-5 — LIGHT CREAM.

### Sunscreen — BX 210

Colour photograph: `info.zip → ROLLER BLINDS/SP 210 SERIES TRANSLUCENT/WhatsApp Image 2026-10-07 at 12.00.28.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 210 SERIES TRANSLUCENT/WhatsApp Image 2026-10-07 at 12.00.28 (1).jpeg`

BX 210-1 — WHITE; BX 210-2 — BEIGE WHITE; BX 210-3 — GREY WHITE; BX 210-4 — GREY BLACK; BX 210-5 — BRONZE BLACK; BX 210-6 — BLACK; BX 210-7 — GREEN WHITE; BX 210-8 — ROYAL BLUE; BX 210-9 — SAND.

### Sunscreen — BX 211

Colour photograph: `info.zip → ROLLER BLINDS/SP 211 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.58.23.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 211 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.58.24.jpeg`

BX 211-1 — WHITE; BX 211-2 — BEIGE WHITE; BX 211-3 — GREY WHITE; BX 211-4 — DIM GREY WHITE; BX 211-5 — BLUE GREY WHITE; BX 211-9 — BLACK.

### Sunscreen — BX 3000

Colour photograph: `info.zip → ROLLER BLINDS/SP 3000 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.57.48.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 3000 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.57.48 (1).jpeg`

RITZ 3000 — WHITE; RITZ 3002 — BEIGE; RITZ 3003 — WHITE GREY; RITZ 3004 — DARK GREY; RITZ 3011 — GREY; RITZ 3012 — CREAM GREY; RITZ 3013 — BONE; RITZ 3014 — GREEN CREAM; RITZ 3015 — BROWN BLACK; RITZ 3016 — BLACK.

### Sunscreen — BX 4000

Colour photograph: `info.zip → ROLLER BLINDS/SP 4000 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.57.20.jpeg`

Specification photograph: `info.zip → ROLLER BLINDS/SP 4000 SERIES SUNSCREEN/WhatsApp Image 2026-10-07 at 11.57.20 (1).jpeg`

BX 4000-1 — BEIGE WHITE; BX 4000-3 — GREY WHITE; BX 4000-4 — BRONZE; BX 4000-5 — COFFEE; BX 4000-6 — BLACK; BX 4000-7 — COFFEE BLACK.

## Source limitations and review notes

- SP 210 is filed under TRANSLUCENT but shows 5% openness. Assigned to Sunscreen as explicitly requested.
- SP 3000 uses RITZ colour codes, which are preserved; there is no SP prefix to convert.
- VENUS 01 is printed WHITE TALE; spelling is preserved.
- SP 200 lists 3.0m width but provides weight/thickness only for 2.0m and 2.5m. Missing width-specific values were not extrapolated. Printed JLS/IOS standards spellings are preserved.
- All requested source colour labels and specification fields were readable. Digital swatch values were not supplied reliably, so all swatches remain neutral. Close-up images and the future four Translucent collections remain pending.

## Validation

Local headless Edge checks passed at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px. All eight collections and 54 colours were checked at each width: 486 colour selections and 495 intercepted WhatsApp drafts (including nine pending Translucent drafts). No message was sent. Exact rendered specification rows match the transcribed source data.

Checks passed for variant/fabric resets, one pressed colour, one neutral preview, no supplier images in the configurator, preview maximum width of 360px, mouse clicks, Tab/Enter/Space, focus retention after selector rendering, valid deep links and rejection of cross-variant fabric/colour parameters. No horizontal page overflow, JavaScript errors or missing local responses were observed. External requests were stubbed to avoid contacting the live visitor counter or messaging services.

All 18 product pages passed regression checks; Zebra still exposes exactly 26 colours. Structural comparisons against a snapshot taken before these edits confirmed every other product record and all Roller fields outside `fabricVariants` (including gallery, examples and original supplier reference data) remain unchanged. Existing CSS and the shared Zebra palette renderer were not edited by this task. Mobile and desktop configurator screenshots were visually inspected. JavaScript syntax and `git diff --check` passed.

Physical touch devices and other browser engines were not tested. Future uploaded close-ups and the four pending Translucent collections require validation when supplied.
