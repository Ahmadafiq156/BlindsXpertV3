// Shared catalogue records; no second catalogue to maintain.
(() => {
    const products = (window.BLINDSXPERT_PRODUCTS?.products || []).filter(product => product.active !== false);
    const grid = document.querySelector('#catalogue');
    if (!grid) return;
    const home = grid.hasAttribute('data-home-catalogue');
    function element(tag, className, text) {
        const item = document.createElement(tag);
        if (className) item.className = className;
        if (text) item.textContent = text;
        return item;
    }
    function addProductLabels(copy, product) {
        const name = copy.querySelector('h3');
        if (!name) return;
        let label = name;
        if (product.suitableFor?.length) {
            const suitable = element('p', 'product-suitable', `Suitable for: ${product.suitableFor.join(', ')}`);
            name.after(suitable); label = suitable;
        }
        if (product.bestSeller) label.after(element('span', 'product-best-seller', 'BEST SELLER'));
    }
    function imagePlaceholder(name) {
        const placeholder = element('span', 'product-image-placeholder');
        placeholder.append(element('span', '', name)); return placeholder;
    }
    function card(product) {
        const article = element('article', 'product-card');
        if (product.placeholderOnly) article.classList.add('product-card-pending');
        article.id = product.id;
        article.dataset.category = product.category;
        const url = `product-details.html?product=${encodeURIComponent(product.id)}`;
        const frame = element('a', 'home-product-image-link product-image-frame');
        frame.href = url;
        frame.setAttribute('aria-label', `View ${product.name} details`);
        const inner = element('span', 'product-image-inner');
        const photo = product.catalogueImage || product.gallery[0];
        if (photo) {
            const image = element('img', 'catalogue-image');
            image.src = photo.thumbnail || photo.src;
            image.alt = photo.alt;
            if (photo.fit) image.style.objectFit = photo.fit;
            image.width = 640; image.height = 640;
            image.loading = 'lazy'; image.decoding = 'async';
            image.addEventListener('error', () => {
                image.hidden = true;
                inner.append(imagePlaceholder(product.name));
            }, {once: true});
            inner.append(image);
        } else inner.append(imagePlaceholder(product.name));
        frame.append(inner);
        const copy = element('div', 'card-copy');
        copy.append(element('p', 'eyebrow', product.category.toUpperCase()), element('h3', '', product.name));
        addProductLabels(copy, product);
        const description = element('p', 'product-detail', (home && product.catalogueDescription) || product.description);
        if (home && !product.placeholderOnly) frame.append(description); else copy.append(description);
        const actions = element('div', 'catalogue-actions');
        const details = element('a', 'home-product-action', 'View product details →'); details.href = url;
        actions.append(details);
        if (home) {
            const enquiry = element('a', 'btn btn-red product-whatsapp', 'Enquire on WhatsApp');
            const destination = document.querySelector('a[href^="https://wa.me/"]')?.href;
            if (destination) {
                const link = new URL(destination); link.searchParams.set('text', `Hello BlindsXpert, I'm interested in ${product.name}. I would like to know more about this product.`);
                enquiry.href = link.href; enquiry.target = '_blank'; enquiry.rel = 'noopener noreferrer';
                enquiry.setAttribute('aria-label', `Enquire on WhatsApp about ${product.name}`);
                actions.append(enquiry);
            }
        }
        copy.append(actions); article.append(frame, copy); return article;
    }
    if (home) grid.replaceChildren(...products.map(card));
    else products.filter(product => product.contentPending || product.catalogueDynamic).forEach(product => {
        if (document.getElementById(product.id)) return;
        const index = products.indexOf(product);
        document.getElementById(products[index - 1].id)?.after(card(product));
    });
    if (!home) products.forEach(product => {
        const copy = document.getElementById(product.id)?.querySelector('.card-copy');
        if (copy && !copy.querySelector('.product-suitable')) addProductLabels(copy, product);
    });
    // Supplied main images also update the existing static Products-page cards.
    if (!home) products.filter(product => product.catalogueImage || product.gallery[0]?.mainImage).forEach(product => {
        const image = document.getElementById(product.id)?.querySelector('.product-image-inner img.catalogue-image');
        if (!image) return;
        const photo = product.catalogueImage || product.gallery[0];
        image.src = photo.thumbnail || photo.src;
        image.alt = photo.alt;
        image.style.objectFit = photo.fit || '';
    });
    // Both catalogues share the header row; demo status stays in the configuration.
    const sales = window.BLINDSXPERT_SALES_COUNTS;
    products.forEach(product => {
        const copy = document.getElementById(product.id)?.querySelector('.card-copy');
        if (!copy) return;
        copy.querySelector('.product-sold-count')?.remove();
        const category = copy.querySelector('.eyebrow');
        if (!category) return;
        let row = copy.querySelector('.product-meta-row');
        if (!row) {
            row = element('div', 'product-meta-row');
            category.before(row);
            row.append(category);
        }
        row.querySelector('.product-meta-badges')?.remove();
        if (product.catalogueBadges === false) return;
        const badges = element('div', 'product-meta-badges');
        const ratings = sales?.rating;
        const value = ratings?.demo ? ratings.demoValue : ratings?.verifiedValues?.[product.id];
        if (ratings?.enabled && value != null && value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 5) {
            const rating = element('span', 'product-rating');
            rating.setAttribute('aria-label', `${ratings.demo ? 'Sample rating' : 'Rating'}: ${Number(value).toFixed(1)} out of 5`);
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            star.setAttribute('viewBox', '0 0 24 24');
            star.setAttribute('aria-hidden', 'true');
            star.setAttribute('focusable', 'false');
            const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            shape.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
            star.append(shape);
            rating.append(star, element('span', '', Number(value).toFixed(1)));
            if (product.catalogueDemoLabels && ratings.demo) {
                rating.append(element('span', 'product-demo-label', 'Demo'));
                rating.title = 'Demo rating; no verified reviews configured';
            }
            badges.append(rating);
        }
        const count = sales?.enabled ? (sales.demo ? sales.demoCounts : sales.verifiedCounts)?.[product.id] : null;
        if (count) {
            const label = product.catalogueDemoLabels && !String(count).endsWith('+') ? `${count}+` : count;
            const sold = element('span', 'product-sold-count', `${label} Sold`);
            if (product.catalogueDemoLabels && sales.demo) {
                sold.append(element('span', 'product-demo-label', 'Demo'));
                sold.title = 'Demo sold count; not verified sales';
            }
            badges.append(sold);
        }
        if (badges.childElementCount) row.append(badges);
    });
})();

// Load the official Page Plugin as its section approaches the viewport.
(() => {
    const holder = document.querySelector('[data-facebook-feed]');
    if (!holder) return;
    function loadFacebook() {
        if (holder.childElementCount) return;
        const frame = document.createElement('iframe');
        const width = Math.max(180, Math.min(500, Math.floor(holder.getBoundingClientRect().width)));
        frame.src = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent('https://www.facebook.com/blindsxpertmy/') + '&tabs=timeline&width=' + width + '&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false';
        frame.title = 'BlindsXpert official Facebook updates';
        frame.width = width; frame.height = 400; frame.loading = 'lazy';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        holder.append(frame);
        // Keep the plugin width in sync when a visitor rotates or resizes the screen.
        if ('ResizeObserver' in window) {
            let timer;
            const resize = new ResizeObserver(() => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const nextWidth = Math.max(180, Math.min(500, Math.floor(holder.getBoundingClientRect().width)));
                    if (nextWidth === Number(frame.width)) return;
                    const url = new URL(frame.src);
                    url.searchParams.set('width', nextWidth);
                    frame.width = nextWidth;
                    frame.src = url.href;
                }, 250);
            });
            resize.observe(holder);
        }
    }
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                loadFacebook(); observer.disconnect();
            }
        }, {rootMargin: '200px'});
        observer.observe(holder.closest('.social-updates'));
    } else loadFacebook();
})();
