# BlindsXpert multi-page website

Static website files for the approved BlindsXpert visual direction, updated to a restrained red and white theme.

## Pages

Home, About Us, Products, Projects, Services, Gallery, Contact, Product Details, Get a Free Quote, and 404.

Open `index.html` directly or serve this folder with a static web server. Shared layout styles and interactions are in `style.css` and `script.js`.

## Quote form

The form validates required fields and opens a prefilled email draft to `sales.blindsXpert@gmail.com`. It does not submit to a website backend.

## Images and social links

Website photography reuses the 86 existing image assets in `img/`, grouped into storefront, installed blinds, product catalogue, fabric, project, factory, sample and gallery collections. Product and fabric images are matched to their visible content; project and lifestyle photography is used for the hero, company, service and portfolio sections. Image URLs are relative to the project root and work with GitHub Pages. The official Facebook page was verified. Instagram and TikTok links were not available in the project or verified source.

## Shared visitor counter deployment

GitHub Pages serves only static files, so the global counter needs the included Cloudflare Worker and Durable Object.

1. From this project folder, install or use Wrangler and deploy `wrangler.toml` with `npx wrangler deploy`.
2. Copy the deployed Worker URL and add `/count` to it, then set that URL in `visitor-counter-config.js` as `window.BLINDSXPERT_COUNTER_URL`.
3. Deploy the updated static website to GitHub Pages.

The Worker stores only the aggregate page-view count. The browser calls it once per page load; the visual count-up animation does not make additional requests. Until a Worker is deployed and configured, the website displays an honest setup message instead of a fabricated count.