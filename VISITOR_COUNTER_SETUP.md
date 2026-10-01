# Set up the shared BlindsXpert visitor counter

The website is hosted on GitHub Pages, which cannot store a shared counter by itself. The included Cloudflare Worker and Durable Object store one aggregate page-view total. The browser makes one request per page load; animation and rerenders do not increment it again. This is a page-view count, not a count of unique people.

## Deploy the Worker

1. Create or sign in to a Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Install Node.js if it is not already installed.
3. Open a terminal in the `mockup1` project folder.
4. Run `npx wrangler login` and complete Cloudflare's browser sign-in.
5. Run `npx wrangler deploy`. Wrangler reads `wrangler.toml` and deploys `visitor-counter-worker.js`, including its Durable Object storage migration.
6. Copy the `workers.dev` URL printed after deployment. It will look like `https://blindsxpert-visitor-counter.<your-account-subdomain>.workers.dev`.

## Connect the website

Open `visitor-counter-config.js` and set the URL from step 6 with `/count` appended:

```js
window.BLINDSXPERT_COUNTER_URL = 'https://blindsxpert-visitor-counter.<your-account-subdomain>.workers.dev/count';
```

Replace `<your-account-subdomain>` with the exact subdomain in Wrangler's deployment output. This URL is public and is not a secret. Do not put Cloudflare API tokens or account credentials in this file or in the GitHub Pages project.

Commit/deploy the website files to GitHub Pages after configuring the URL.

## Verify it

1. Open the deployed website and scroll to the footer. The counter should replace its setup message with a number after the request succeeds.
2. Reload the page once. The count should increase by one page view.
3. Open the Worker endpoint ending in `/count` directly. It should return JSON such as `{"count":123}` and increment once for that request too.

If the endpoint is unreachable or returns an error, the footer shows an unavailable message and the rest of the website continues to work. A blank endpoint intentionally shows a setup message instead of a fabricated number.
