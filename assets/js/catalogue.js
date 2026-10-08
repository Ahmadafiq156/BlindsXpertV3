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
        const suitable = element('p', 'product-suitable', `Suitable for: ${(product.suitableFor || []).join(', ')}`);
        name.after(suitable);
        if (product.bestSeller) suitable.after(element('span', 'product-best-seller', 'BEST SELLER'));
    }
    function card(product) {
        const article = element('article', 'product-card');
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
                inner.append(element('span', 'product-image-placeholder', product.name));
            }, {once: true});
            inner.append(image);
        } else inner.append(element('span', 'product-image-placeholder', product.name));
        frame.append(inner);
        const copy = element('div', 'card-copy');
        copy.append(element('p', 'eyebrow', product.category.toUpperCase()), element('h3', '', product.name));
        addProductLabels(copy, product);
        const description = element('p', 'product-detail', product.description);
        if (home) frame.append(description); else copy.append(description);
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
    else products.filter(product => product.contentPending).forEach(product => {
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
