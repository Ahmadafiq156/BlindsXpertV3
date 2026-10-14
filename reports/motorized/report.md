# Motorized Blinds redesign report

## Motorized Blinds Product Details redesign (14 October 2026)

The Motorized Product Details page now displays Motorized Blinds as its title, breadcrumb, enquiry product and document title. The central product record retains its original Motorized Solutions name, catalogue override, description, highlights and gallery: Home and Products are unchanged. The approved `motorizedblinds.png` upper image, contain sizing, thumbnail/lightbox behaviour and original description remain intact. Existing Photos & Examples retain Seri Kembangan and the office roller-blind photograph; no videos are mixed into that gallery. The earlier compatible-products section and product-name-only specification table are replaced, without duplicating visible sections. Original related Roller, Venetian and Ziptrak links and the Products motorized showcase link remain accessible.

### Structure and verified solutions

Section order: main information; Explore Motorized Solutions; Motor Systems & Brands; How Motorized Blinds Work; Watch Motorized Blinds in Action; Suitable Applications; original Photos & Examples; Get a Custom Quotation. The new content renders only for `product=motorized`. `assets/js/motorized-details.js` exports the dedicated controller; `assets/js/product-details.js` supplies shared DOM/image-viewer utilities, selection updates and enquiry formatting. `product-details.html` loads the new controller before product-details.js. Styles use existing typography, containers and red-and-white colours under unique motorized classes, with compact cards, responsive grids and no external libraries.

Selectable enquiry systems:

- Motorized Roller Blinds: existing official-site-derived motorized roller description in products.html, approved root image, supplied office roller image and videos 01/02. The existing root illustration is reused on its card.
- Motorized Zebra Blinds: video 07 visibly shows zebra blinds and a handheld control. No unverified motor brand or extra capabilities are inferred.
- Ziptrak Motorized Outdoor Blinds: existing Ziptrak product description/highlight explicitly lists motorized options, conditional on compatible combinations. Outdoor demonstration videos 05/06 are not identified as Ziptrak merely from appearance.

Venetian and vertical demonstrations are labelled by visible blind type, without claiming a particular model/brand or adding them as purchasable system selections. No decorative selector is added for unverified systems. Suitable Applications uses Home and Office from the unchanged motorized product suitableFor data. Four informational cards describe handheld controls observed in assets, system-dependent blind movement, position-based light/privacy adjustment and discussing dimensions/location for installation. No universal app, Wi-Fi, voice, scheduling, solar, performance, warranty or power claims are added.

### Original brand asset inventory

| Original filename | Relative path | Content | Bytes |
| --- | --- | --- | ---: |
| `motorized brand (1).png` | `assets/img/products/motorized/brands/motorized brand (1).png` | Window covering and motorization brand sheet | 234680 |
| `motorized brand (1).jpg` | `assets/img/products/motorized/brands/motorized brand (1).jpg` | Somfy motor and remote poster | 45554 |
| `motorized brand (2).png` | `assets/img/products/motorized/brands/motorized brand (2).png` | Somfy motorization products poster | 28020 |

The first image is a mixed fabric/window covering/motorization brand sheet (ATEJA, novo, MEHLER, Nice, PHIFER, Glen Raven, WINTEC, Dickson, Somfy and Serge Ferrari), not a claim that all those companies supply motors for these systems. The two other images are Somfy promotional posters. Dooya remains mentioned in the original catalogue-backed description; no Dooya image or selector is fabricated. Brand cards show the complete images with contain sizing and shared full-size viewing. Percent-encoded paths preserve the original filenames, spaces and casing.

### Original video inventory

All seven original files were inspected using browser metadata plus start and midpoint frames before website edits. Subject labels reflect visible content, not poster filenames. Existing approved poster mappings come from products.html; posters are presentation assets and do not independently establish motor compatibility.

| Original filename | Relative path | Display title | Duration (s) | Frame size | Existing poster |
| --- | --- | --- | ---: | --- | --- |
| `motorized-demo-01.mp4` | `assets/video/motorized/motorized-demo-01.mp4` | Living room roller blinds | 99.71 | 1280 × 720 | `assets/img/products/video-thumbnails/bright-open-plan-living-space.png` |
| `motorized-demo-02.mp4` | `assets/video/motorized/motorized-demo-02.mp4` | Roller blind motor demonstration | 207.92 | 1920 × 1080 | `assets/img/products/video-thumbnails/oceanview-boardroom-motorized-blinds.png` |
| `motorized-demo-03.mp4` | `assets/video/motorized/motorized-demo-03.mp4` | Venetian blind demonstration | 50.62 | 1280 × 720 | `assets/img/products/video-thumbnails/sunlit-reading-nook-venetian-blinds.png` |
| `motorized-demo-04.mp4` | `assets/video/motorized/motorized-demo-04.mp4` | Vertical blind demonstration | 45.42 | 1920 × 1080 | `assets/img/products/video-thumbnails/bedroom-corner-window-vertical-blinds.png` |
| `motorized-demo-05.mp4` | `assets/video/motorized/motorized-demo-05.mp4` | Outdoor roller shade demonstration | 31.32 | 848 × 480 | `assets/img/products/video-thumbnails/tropical-patio-roller-shades.png` |
| `motorized-demo-06.mp4` | `assets/video/motorized/motorized-demo-06.mp4` | Outdoor shade demonstration | 33.81 | 848 × 480 | `assets/img/products/video-thumbnails/tropical-retreat-remote-control.png` |
| `motorized-demo-07.mp4` | `assets/video/motorized/motorized-demo-07.mp4` | Zebra blinds with handheld control | 17.62 | 638 × 360 | `assets/img/products/video-thumbnails/corner-living-room-zebra-blinds.png` |

No media file was moved, replaced, renamed or duplicated. Exact bytes, dimensions, durations and SHA-256 hashes are recorded in `reports/motorized/video-inventory.json` and `brand-inventory.json`; inspected frames/contact sheet are audit artifacts, not new website images. All seven files exist and play in Edge. Their exact motor brands/models are not established by the inspected footage.

### Video switching and loading

One native controls-enabled, playsinline video sits in a reserved 16:9 frame. The initial feature is video 01; six fixed poster buttons select videos 02–07. Selecting a button pauses the previous clip, assigns the exact new source/poster/title, resets playback through load and highlights the selected thumbnail in red without autoplay or navigation. Return to first demonstration makes video 01 reachable after switching; its featured title uses the red active accent. All seven remain accessible with one player and six thumbnail buttons. Native fullscreen controls remain available. Buttons support native Enter/Space and touch.

Only the featured video has a media source; all thumbnails are lazy-loaded images. The player uses preload=none, never autoplay, and pauses when the document is hidden or another product is selected. The observed Edge initial load requested only video 01; no alternative video resources were requested initially. Browser behaviour may fetch initial featured metadata despite preload=none. Switching away removes the source and resets the preference/fields. The reserved frame prevents video-dimension changes from moving nearby content. An unsupported/missing clip hides the failed player and shows an accessible alert while retaining the frame and all other choices; selecting a valid clip recovers playback. There are no missing supplied videos.

### Enquiry integration

Get a Custom Quotation uses the requested supporting description. Original Product, Name, Address, Phone, Email, Site Visit and Message fields, WhatsApp number and message formatting remain intact. Optional Preferred Motorized System uses the same three verified choices as the cards, with Discuss with our team as an empty preference. Cards and dropdown synchronize in both directions; empty preference clears pressed states. Optional Approximate Window Dimensions and Installation Location accept free text. Non-empty values generate Product: Motorized Blinds, Preferred System (if selected), dimensions and location before existing customer information. Undefined/null values are not emitted. Leaving the product clears and disables the optional fields and stops the video, preserving other-product configurators. Choosing the blank product picker also stops/resets the Motorized controls.

### Validation and files

Edge checks passed at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px: no horizontal overflow, fitting grids and a constant 16:9 featured frame. All seven clips played with valid dimensions/durations, standard controls, inline support and no autoplay. Source and active state changed correctly; previous playback paused. A deliberately failed video request showed the alert and the following valid clip played. Shared brand/example image viewers, keyboard selection, touch system/video selection and opening/closing mobile navigation passed. All three system selections produced the correct intercepted WhatsApp drafts with every original customer field; empty preference omitted Preferred System. No WhatsApp message was sent. Switching Motorized to Honeycomb and back cleared preference/fields and paused/removed media. Eleven unrelated product smoke checks passed, including the three quotation-led pages. No JavaScript exceptions or failed normal local asset responses were recorded. Syntax checks and git diff whitespace checks pass. Desktop/mobile screenshots are retained and visually reviewed.

The Homepage, Products page, central product records and original media assets are unchanged by this task. Earlier Honeycomb and quotation-led changes are preserved. Modified files for this task: `product-details.html`, `assets/js/product-details.js`, `assets/css/product-details.css`, `WEBSITE-MAINTENANCE.md`. Added: `assets/js/motorized-details.js` and audit files under `reports/motorized/`. To change clips or posters, update the exact arrays in the controller and inventory; preserve originals. Add only supplier-verified selectable systems and conditional descriptions.

Supplier confirmation remains necessary for exact motor models, brand/system pairing, compatible mechanisms and limits, control packages, power supply, installation requirements, warranties and pricing. No universal compatibility is promised. No staging, commit, push or deployment.
