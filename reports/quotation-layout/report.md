# Three quotation-led Product Details pages

Completed locally on 14 October 2026. No staging, commit, push or deployment.

| Product | Options/overview | Applications | Supplied images | Optional enquiry fields |
| --- | --- | --- | --- | --- |
| Skylight Blinds | Glass roof/inclined window shading overview | Glass roofs; inclined windows | Glass-roof fabric shades (1) | Installation location; window dimensions |
| Curtain Hardware | Selectable Curtain rail and Curtain rod | Home; office interiors | Packaged rods; finials; bundled rods (3) | Installation length; quantity |
| Awnings & Canopies | Sheltered outdoor space overview | Patios; outdoor areas; outdoor entrances | Purple entrance canopy (1) | Installation area; covering dimensions |

Shared sections replace product-name-only specification tables: Explore Available Options, Where It Can Be Used, Photos & Examples, Get a Custom Quotation. Main galleries and descriptions remain intact. The new example grids omit illustrative scenes and render only the five supplied photos listed in WEBSITE-MAINTENANCE.md. Existing customer fields remain. Rod/rail selection synchronizes with the original hero image, URL and enquiry. Fields and layout clear correctly when switching to other products.

Modified files: `assets/js/product-details.js`, `assets/css/product-details.css`, `product-details.html`, `WEBSITE-MAINTENANCE.md`. Added `assets/data/quotation-product-details.js` and audit artifacts in this folder. Existing Honeycomb changes remain intact; product-data, Homepage, Products page and all assets are unchanged by this task.

Missing supplier information: verified individual skylight operating systems and awning/canopy categories; materials, dimensions/limits, performance ratings, warranties and pricing. No new unsupported categories or technical claims are displayed. Curtain rails are not renamed to tracks and no accessory category is invented.

Testing: all 30 product/width combinations passed across 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px. Correct original descriptions/main gallery counts, supplied image paths, zero horizontal overflow, loaded photographs, keyboard/touch lightboxes, interactive rod/rail selection, optional fields and four correct intercepted WhatsApp drafts. Original customer fields are retained; no WhatsApp message is sent. Product-switch reset and eight unrelated product smoke checks passed. No JavaScript exceptions or failed local assets. Syntax checks and git diff whitespace checks passed. Six final mobile/desktop previews are retained.

See `test-results.json` for detailed results and `WEBSITE-MAINTENANCE.md` for provenance and adding verified specifications later.
