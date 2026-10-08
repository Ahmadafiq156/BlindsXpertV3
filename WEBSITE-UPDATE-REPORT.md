# BlindsXpertV3 expansion report — 8 October 2026

Implemented locally. No commit, push, deployment, new images, framework, backend or company/product data changes.

## Files created

- promotions.html
- faqs.html
- return-policy.html
- delivery-policy.html
- term-of-payment.html
- WEBSITE-UPDATE-REPORT.md

## Files modified

- 404.html
- about.html
- contact.html
- gallery.html
- index.html
- product-details.html
- products.html
- projects.html
- quote.html
- services.html
- assets/css/site.css
- assets/js/site.js
- sitemap.xml
- WEBSITE-MAINTENANCE.md

The ignored historical mockup1 checkout remains untouched. The active site comprises 15 root HTML pages.

## Navigation and footer

Home → Products → Projects → Promotions → FAQs → Services → About Us → Gallery → Careers → Contact, followed by the existing Get a Free Quote button. Promotions and FAQs are immediately after Projects on every active HTML page. Existing active-page attributes and the Products dropdown are preserved; Promotions and FAQs have their own active-page attributes. Careers remains about.html#careers.

The existing mobile menu now applies through 1200px to accommodate the extra links. Desktop links retain 44px minimum heights. The Products dropdown's JavaScript queries use the matching 1201px desktop boundary.

Policies appear beneath Products in the existing footer column on all 15 pages. Existing logo, contact links, social links, Maybank banner and visitor counter markup are retained. Promotions and FAQs are also included in Explore.

## Promotions

promotions.html has the existing internal hero proportions with a branded red background, the requested heading and supporting text, Our Latest Promotions empty state, the pending message and a Contact Us button. No offers, cards, prices, dates, discounts or terms are displayed. An empty hidden .promotion-grid and .promotion-card styles support later approved titles, images, descriptions, time elements, terms and enquiry links. Maintenance instructions explain the future markup.

## FAQ categories and questions

### General & Company Info

- What products and services does BlindsXpert offer?
- How can I contact BlindsXpert?
- Where is BlindsXpert located?
- How can I request a quotation?
- Where can I view completed BlindsXpert projects?

### Products (Curtains, Blinds)

- What types of blinds are available?
- Does BlindsXpert offer curtains and curtain hardware?
- What is the difference between roller blinds and zebra blinds?
- Are different colours and materials available?
- Can blinds be customized for different window sizes?
- Are motorized blinds available?

### Services (Measurement, Installation, Customization)

- How do I arrange a site measurement?
- Does BlindsXpert provide installation services?
- Can I request customized blinds?
- How can I obtain a quotation?
- What is the process after confirming a quotation?
- How long does installation usually take?

### Care & Maintenance

- How should I clean my blinds?
- How often should blinds be maintained?
- Can I use water to clean all types of blinds?
- How should I care for motorized blinds?
- What should I do if my blinds are not operating correctly?

All 22 answers use: “Information for this question will be added soon. Please contact our team for assistance.” The contact phrase links to contact.html. No official answers were invented.

Native details/summary accordions provide mouse, touch and Enter/Space operation, visible focus indicators and a plus/minus icon. They work without JavaScript. Supporting browsers animate expansion and collapse via ::details-content; reduced-motion preferences disable that transition. Other browsers use native expansion/collapse. A Still Have Questions? CTA links to Contact Us.

## Policy routes and pending content

- return-policy.html — Return Policy: “Return policy information will be available here soon.”
- delivery-policy.html — Delivery Policy: “Delivery policy information will be available here soon.”
- term-of-payment.html — Term of Payment: “Payment terms and conditions will be available here soon.”

All use matching hero/content layouts and Contact Us links. Official promotion content and images, all FAQ answers and all three policies await business approval. No legal clauses, payment conditions or delivery/return terms were invented.

## SEO and maintenance

The five pages have unique titles and descriptions, canonical links, and the existing Open Graph/Twitter metadata conventions. Canonicals and og:url retain https://ahmadafiq156.github.io/mockup1/. Internal links and assets remain relative for GitHub Pages project hosting.

sitemap.xml includes all five routes and parses successfully, with 14 URL entries (the existing 404 remains excluded). All three policy pages use temporary noindex,follow. Review/remove noindex and update descriptions when approved substantive content is published. WEBSITE-MAINTENANCE.md covers promotions, FAQ editing, policy replacement, noindex review, shared navigation and sitemap edits.

## Verification

- Headless Microsoft Edge tested all 15 active pages at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1440px: 135 page/width combinations.
- Layout failures: 0. JavaScript page errors: 0. Missing local link/anchor/asset references: 0.
- Navigation order, footer policy links, existing active-page behavior and new-page active states checked. Mobile menu and Products dropdown open/close and Escape checked at the mobile/tablet widths; desktop header overlap checked.
- All 22 FAQ questions opened and closed with mouse; Enter/Space keyboard behavior, reduced motion and no-JavaScript fallback passed. Category order checked.
- Homepage slideshow and catalogue filtering passed. Product variant switching, Wooden Outdoor Blinds and Curtain Hardware examples, and product image viewer passed.
- Existing main content on all ten original pages matched HEAD exactly after normalizing line endings. Product data and page-specific scripts were not changed.
- Shared/page JavaScript syntax, sitemap XML parsing, unique new metadata, image alt attributes and git diff whitespace checks passed.
- Screenshots reviewed for the Promotions desktop page, FAQ mobile page and Return Policy at 320px.

## Limits

Third-party requests were blocked during isolated browser tests. Live Facebook/social feeds, external fonts, visitor-counter service, email/WhatsApp delivery and production hosting were not validated. Existing external URLs and integrations remain in place. Native accordion animation gracefully falls back where the relevant CSS is unsupported. No new content may be treated as an approved promotion, FAQ answer or company policy.

## Final git status

This task modified 14 tracked files and created five HTML pages plus this report. Temporary verification scripts and screenshots were removed. Nothing was staged, committed or pushed.

Additional image deletions/new filenames under assets/img/unused/images/06 Project & sample appeared concurrently during the task. These are outside this implementation and were left untouched. The following is the final observed status snapshot; those concurrent changes may continue.

```text
 M 404.html
 M WEBSITE-MAINTENANCE.md
 M about.html
 M assets/css/site.css
 D "assets/img/unused/images/06 Project & sample/12.png"
 D "assets/img/unused/images/06 Project & sample/13.png"
 D "assets/img/unused/images/06 Project & sample/14.png"
 D "assets/img/unused/images/06 Project & sample/16.png"
 M assets/js/site.js
 M contact.html
 M gallery.html
 M index.html
 M product-details.html
 M products.html
 M projects.html
 M quote.html
 M services.html
 M sitemap.xml
?? WEBSITE-UPDATE-REPORT.md
?? "assets/img/unused/images/06 Project & sample/awning.png"
?? "assets/img/unused/images/06 Project & sample/roman.png"
?? "assets/img/unused/images/06 Project & sample/skylight.png"
?? "assets/img/unused/images/06 Project & sample/wooden.png"
?? delivery-policy.html
?? faqs.html
?? promotions.html
?? return-policy.html
?? term-of-payment.html
```
