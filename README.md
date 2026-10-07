# BlindsXpertV3

Static, multi-page BlindsXpert Malaysia website. This project keeps the current HTML/CSS/JavaScript architecture and is intended for static hosting such as GitHub Pages. No build step is required.

## Pages

Home (`index.html`), About (`about.html`), Contact (`contact.html`), Gallery (`gallery.html`), Product Details (`product-details.html`), Products (`products.html`), Projects (`projects.html`), Quote (`quote.html`), Services (`services.html`), and the GitHub Pages 404 page (`404.html`).

## Structure and local preview

- `assets/css/` — shared and Product Details styles.
- `assets/js/` — shared page behavior, Product Details behavior, and the shared image viewer.
- `assets/data/` — product catalogue data.
- `assets/img/` — images grouped by page, product, or purpose; `unused/` preserves unclassified source material.
- `assets/video/` — homepage testimonial and motorized product videos.
- Root HTML files — pages and page-specific content.
- Root visitor-counter and Wrangler files — the existing Cloudflare Durable Object integration.

Preview from this directory with any static file server (for example, `npx wrangler pages dev .` if Wrangler is already installed), or open `index.html` directly. See [WEBSITE-MAINTENANCE.md](WEBSITE-MAINTENANCE.md) for editing guidance and deployment cautions.

The product enquiry opens WhatsApp for the user to review and send. The quote form opens a prefilled email draft; neither form uses a website backend.
