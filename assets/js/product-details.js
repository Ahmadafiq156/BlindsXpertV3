(() => {
    const main = document.querySelector('.pd-main');
    if (!main) return;
    const $ = selector => main.querySelector(selector);
    const data = window.BLINDSXPERT_PRODUCTS;
    const select = $('#enquiryProduct');
    const form = $('#productEnquiryForm');
    const note = $('#productFormNote');
    const dialog = $('[data-product-lightbox]');
    let activeProduct, activeOption = '', activeSeries = null, activeColour = null;
    const selectableSeries = product => product.id === 'zebra' && product.visibleSeries
        ? product.visibleSeries.map(name => product.series.find(series => series.name === name)).filter(Boolean)
        : product.series;
    const colourCode = fabric => fabric.displayCode || fabric.code;
    const seriesColours = series => (series?.fabrics || []).filter(fabric => fabric.code && fabric.colourName);
    const names = {indoor:'Indoor blinds', outdoor:'Outdoor blinds', motorized:'Motorized solutions', other:'Other products'};
    const node = (tag, className, content) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content !== undefined) el.textContent = content;
        return el;
    };
    const imageViewer = window.createBlindsXpertImageViewer({
        dialog,
        image: $('[data-pd-lightbox-image]'),
        caption: $('[data-pd-lightbox-caption]'),
        previous: $('[data-pd-previous]'),
        next: $('[data-pd-next]'),
        closeButton: $('[data-pd-close]'),
        resolve: (photo, index, count) => ({ ...photo, hideNavigation: count < 2 })
    });
    function openImage(photo, trigger, collection = [photo]) {
        const index = Math.max(0, collection.findIndex(image => image.src === photo.src));
        imageViewer?.open(collection, index, trigger);
    }
    function imageFigure(photo, reference = false, collection = [photo]) {
        const figure = node('figure', reference ? 'pd-reference' : 'pd-photo');
        const button = node('button'); button.type = 'button'; button.setAttribute('aria-label', `View full image: ${photo.caption}`);
        const img = node('img'); img.src = photo.thumbnail || photo.src; img.alt = photo.alt; img.loading = 'lazy'; img.decoding = 'async';
        if (photo.width) img.width = photo.width;
        if (photo.height) img.height = photo.height;
        button.append(img); button.addEventListener('click', () => openImage(photo, button, collection));
        figure.append(button, node('figcaption', '', photo.caption));
        return figure;
    }
    function updateUrl() {
        const url = new URL(location.href);
        url.searchParams.set('product', activeProduct.id);
        if (activeOption) url.searchParams.set('option', activeOption); else url.searchParams.delete('option');
        if (activeSeries) url.searchParams.set('series', activeSeries.name); else url.searchParams.delete('series');
        if (activeColour) url.searchParams.set('colour', colourCode(activeColour)); else url.searchParams.delete('colour');
        history.replaceState({}, '', url);
    }
    function updateSelection() {
        const parts = [activeProduct?.name, activeOption, activeSeries ? `${activeSeries.name} series` : '', activeColour ? `${colourCode(activeColour)} · ${activeColour.colourName}` : ''].filter(Boolean);
        $('[data-enquiry-selection]').textContent = parts.length ? `Your enquiry: ${parts.join(' · ')}` : '';
        if (activeProduct) updateUrl();
    }
    const overviewPhotos = product => product.gallery.filter(photo => (photo.mainImage === true || (photo.src.includes('/generated/') && (!photo.src.includes('-detail') || photo.overview === true))) && !photo.exampleOnly);
    const examplePhotos = product => product.gallery.filter(photo => !overviewPhotos(product).includes(photo) || photo.exampleOnly).filter(photo => !photo.src.includes('colour-material-inspiration'));
    function renderColourPalette() {
        const section = node('div', 'pd-colour-selection');
        const controls = node('div', 'pd-colour-controls');
        controls.append(node('h4', '', 'Choose a colour'), node('p', 'pd-small', 'Neutral swatches: exact fabric colours are not yet verified. Please confirm with physical samples.'));
        const palette = node('div', 'pd-colour-palette');
        palette.setAttribute('role', 'group');
        palette.setAttribute('aria-label', `${activeSeries.name} colours`);
        const preview = node('figure', 'pd-colour-preview');
        const frame = node('div', 'pd-colour-preview-frame');
        const caption = node('figcaption');
        caption.setAttribute('aria-live', 'polite');
        preview.append(frame, caption);
        function updatePreview() {
            palette.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.colour === colourCode(activeColour))));
            const fabric = activeColour;
            const placeholder = node('div', 'pd-colour-placeholder');
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('aria-hidden', 'true');
            const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            shape.setAttribute('d', 'M3 3h18v18H3z M3 17l5-5 4 4 3-3 6 6 M16 7h.01');
            icon.append(shape);
            placeholder.append(icon, node('span', '', 'Colour photo pending'));
            frame.replaceChildren(placeholder);
            frame.getAnimations().forEach(animation => animation.cancel());
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                frame.animate([{opacity:0.65}, {opacity:1}], {duration:180, easing:'ease-out'});
            }
            caption.replaceChildren(node('span', 'pd-selected-series', activeSeries.name), document.createTextNode(' · '), node('strong', 'pd-selected-code', colourCode(fabric)), document.createTextNode(' · '), node('span', 'pd-selected-name', fabric.colourName));
            if (fabric.closeUpImage) {
                const image = node('img');
                image.alt = `${activeSeries.name} ${colourCode(fabric)} ${fabric.colourName} fabric close-up`;
                image.hidden = true;
                image.addEventListener('load', () => {
                    if (activeColour !== fabric || image.parentElement !== frame) return;
                    placeholder.remove(); image.hidden = false;
                }, {once:true});
                image.addEventListener('error', () => {
                    image.remove();
                    if (activeColour === fabric && placeholder.isConnected) placeholder.querySelector('span').textContent = 'Colour photo unavailable';
                }, {once:true});
                frame.append(image);
                image.src = fabric.closeUpImage;
            }
        }
        for (const fabric of seriesColours(activeSeries)) {
            const button = node('button', 'pd-colour-swatch');
            button.type = 'button';
            button.dataset.colour = colourCode(fabric);
            const verified = fabric.swatch?.verified === true && /^#[0-9a-f]{6}$/i.test(fabric.swatch.value || '');
            button.setAttribute('aria-label', `Select ${colourCode(fabric)} ${fabric.colourName}${verified ? '' : '; exact fabric colour not verified'}`);
            button.title = `${colourCode(fabric)} · ${fabric.colourName}`;
            const chip = node('span', 'pd-swatch-chip');
            chip.setAttribute('aria-hidden', 'true');
            if (verified) chip.style.backgroundColor = fabric.swatch.value;
            button.append(chip, node('span', 'pd-swatch-code', colourCode(fabric)));
            button.addEventListener('click', () => { activeColour = fabric; updatePreview(); updateSelection(); });
            palette.append(button);
        }
        controls.append(palette);
        section.append(preview, controls);
        if (activeColour) updatePreview();
        return section;
    }
    function renderReferences() {
        if (activeProduct.id === 'zebra') {
            $('[data-spec-table]').replaceChildren();
            $('[data-spec-section]').hidden = true;
            $('[data-nav-specifications]').hidden = true;
            renderCataloguePhotos();
            return;
        }
        const referenceSeries = activeProduct.catalogueCollection ? null : activeSeries;
        $('[data-series-title]').textContent = referenceSeries ? `${referenceSeries.name} Series` : 'Specifications & product information';
        $('[data-series-description]').textContent = referenceSeries ? 'Specifications apply to this series only. Confirm colours, availability and option combinations with our team.' : activeProduct.description;
        const area = $('[data-spec-table]'); area.replaceChildren();
        const specs = Object.entries(referenceSeries?.specs || { 'Product': activeProduct.name, ...(activeProduct.options.length ? {[activeProduct.optionLabel || 'Available options']: activeProduct.options.join(', ')} : {}) });
        if (specs.length) {
            const table = node('table', 'pd-spec-table'); const caption = node('caption', 'visually-hidden', `${referenceSeries?.name || activeProduct.name} specifications`); table.append(caption);
            const tbody = node('tbody');
            for (const [label, value] of specs) { const row = node('tr'); const heading = node('th','',label); heading.scope = 'row'; row.append(heading, node('td','',value)); tbody.append(row); }
            table.append(tbody); area.append(table, node('p','pd-small',referenceSeries ? 'Fabric width is not the guaranteed finished blind width. Final dimensions and suitability require confirmation.' : 'Confirm final dimensions, materials, colours and suitability with our team.'));
        }
        $('[data-spec-section]').hidden = false;
        $('[data-nav-specifications]').hidden = $('[data-spec-section]').hidden;
        renderCataloguePhotos();
    }
    function renderCataloguePhotos() {
        const panel = $('[data-catalogue-panel]');
        if (!panel) return;
        panel.hidden = !activeProduct.catalogueCollection || !activeSeries;
        panel.replaceChildren();
        if (panel.hidden) return;
        const heading = node('h3', '', activeSeries.name);
        heading.id = 'catalogue-series-heading';
        heading.setAttribute('aria-live', 'polite');
        if (activeProduct.id === 'zebra') {
            panel.removeAttribute('aria-labelledby');
            panel.setAttribute('aria-label', 'Fabric colour configurator');
            panel.append(renderColourPalette());
            const specs = Object.entries(activeSeries.specs || {}).filter(([, value]) => value !== '' && value != null);
            if (specs.length) {
                const specificationSection = node('section', 'pd-fabric-specifications');
                specificationSection.append(node('h4', '', 'Fabric Specifications'));
                const table = node('table', 'pd-spec-table');
                table.append(node('caption', 'visually-hidden', `${activeSeries.name} fabric specifications`));
                const body = node('tbody');
                for (const [label, value] of specs) {
                    const row = node('tr'); const th = node('th', '', label); th.scope = 'row';
                    row.append(th, node('td', '', value)); body.append(row);
                }
                table.append(body);
                specificationSection.append(table, node('p', 'pd-small', 'Catalogue fabric widths are not guaranteed finished blind widths. Confirm final dimensions, suitability and availability with our team.'));
                panel.append(specificationSection);
            }
            return;
        }
        const information = node('div', 'pd-catalogue-information');
        const fabrics = (activeSeries.fabrics || []).filter(fabric => fabric.code && fabric.colourName);
        if (fabrics.length) {
            const fabricSection = node('div');
            fabricSection.append(node('h4', '', 'Fabric codes & colour labels'));
            const table = node('table', 'pd-spec-table pd-fabric-table');
            table.append(node('caption', 'visually-hidden', `${activeSeries.name} printed fabric codes and colour labels`));
            const head = node('thead'); const headers = node('tr');
            for (const label of ['Fabric code (catalogue)', 'Colour label']) {
                const th = node('th', '', label); th.scope = 'col'; headers.append(th);
            }
            head.append(headers); table.append(head);
            const body = node('tbody');
            for (const fabric of fabrics) {
                const row = node('tr'); const code = node('th', '', fabric.code); code.scope = 'row';
                row.append(code, node('td', '', fabric.colourName)); body.append(row);
            }
            table.append(body); fabricSection.append(table); information.append(fabricSection);
        }
        const specs = Object.entries(activeSeries.specs || {}).filter(([, value]) => value !== '' && value != null);
        if (specs.length) {
            const specSection = node('div'); specSection.append(node('h4', '', 'Catalogue specifications'));
            const table = node('table', 'pd-spec-table');
            table.append(node('caption', 'visually-hidden', `${activeSeries.name} catalogue specifications`));
            const body = node('tbody');
            for (const [label, value] of specs) {
                const row = node('tr'); const th = node('th', '', label); th.scope = 'row';
                row.append(th, node('td', '', value)); body.append(row);
            }
            table.append(body); specSection.append(table, node('p', 'pd-small', 'Catalogue fabric widths are not guaranteed finished blind widths. Confirm final dimensions, suitability and availability with our team.'));
            information.append(specSection);
        }
        const photos = activeSeries.photos || [];
        const grid = node('div', 'pd-catalogue-photos');
        for (const photo of photos) {
            const figure = imageFigure(photo, true, photos);
            const original = node('a', 'pd-text-link', 'Open original photograph to zoom ↗');
            original.href = photo.src; original.target = '_blank'; original.rel = 'noopener noreferrer';
            original.setAttribute('aria-label', `Open original photograph to zoom: ${photo.caption} (new tab)`);
            figure.append(original); grid.append(figure);
        }
        panel.append(heading);
        if (activeSeries.description) panel.append(node('p', 'pd-small', activeSeries.description));
        panel.append(node('p', 'pd-small', activeProduct.id === 'zebra' ? 'BX labels use the catalogue code suffixes. Original sheets retain their printed SP labels. Open either catalogue photograph for a larger view.' : 'BX names identify the series on this website. Fabric references retain the codes and colour labels printed in the catalogue. Open either photograph for a larger view, or use its link for browser zoom.'), information, grid);
    }
    function showMainImage(photo) {
        const image = $('[data-product-image]'); image.src = photo.src; image.alt = photo.alt;
        image.style.objectFit = photo.fit || '';
        if (photo.width) image.width = photo.width;
        if (photo.height) image.height = photo.height;
        $('[data-main-image-button]').onclick = () => openImage(photo, $('[data-main-image-button]'), overviewPhotos(activeProduct));
        $('[data-thumbnails]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.src === photo.src)));
    }
    function showOptionImage() {
        const photos = overviewPhotos(activeProduct);
        const target = activeProduct.optionImages?.[activeOption];
        const photo = photos.find(photo => photo.src === target) || photos[0];
        if (photo) showMainImage(photo);
    }
    function chooseOption(option) {
        activeOption = option;
        $('[data-options]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === option)));
        showOptionImage();
        // Roller series and light-control choices must not contradict one another.
        if (activeProduct.id === 'roller' && activeSeries) {
            const matching = {'Blackwell Waterproof':'Blackout','Vado Solarscreen':'Sunscreen','Sega Classic':'Translucent'};
            if (matching[activeSeries.name] !== option) {
                activeSeries = null;
                $('[data-series-grid]').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed','false'));
                renderReferences();
            }
        }
        updateSelection();
    }
    function chooseSeries(series) {
        activeSeries = series;
        activeColour = activeProduct.id === 'zebra' ? seriesColours(series)[0] || null : null;
        if (activeProduct.id === 'roller') {
            activeOption = {'Blackwell Waterproof':'Blackout','Vado Solarscreen':'Sunscreen','Sega Classic':'Translucent'}[series.name] || '';
            $('[data-options]').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent === activeOption)));
        }
        $('[data-series-grid]').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.series === series.name)));
        if (activeProduct.catalogueCollection && window.matchMedia('(max-width: 760px)').matches) {
            const selector = $('[data-series-grid]');
            const selected = selector.querySelector('button[aria-pressed="true"]');
            if (selected) {
                const bounds = selector.getBoundingClientRect(); const button = selected.getBoundingClientRect();
                if (button.left < bounds.left + 4) selector.scrollLeft += button.left - bounds.left - 4;
                else if (button.right > bounds.right - 4) selector.scrollLeft += button.right - bounds.right + 4;
            }
        }
        showOptionImage();
        renderReferences(); updateSelection();
    }
    function showProduct(product, option = '', seriesName = '', updateHistory = true, requestedColour = '') {
        activeProduct = product;
        activeOption = product.options.includes(option) ? option : (product.defaultOption || '');
        const visibleSeries = selectableSeries(product);
        activeSeries = visibleSeries.find(s => s.name === seriesName || (product.catalogueCollection && s.sourceCode && [s.sourceCode, `${s.sourceCode} SERIES`, `${s.displayCode} SERIES`].includes(seriesName))) || (product.catalogueCollection || !option ? visibleSeries[0] : null) || null;
        activeColour = product.id === 'zebra' ? seriesColours(activeSeries)[0] || null : null;
        $('[data-product-picker]').hidden = true; $('[data-product-content]').hidden = false;
        $('[data-product-name]').textContent = product.name; $('[data-product-category]').textContent = names[product.category];
        $('[data-product-description]').textContent = product.description; $('[data-breadcrumb]').textContent = product.name;
        document.title = `${product.name} | BlindsXpert Malaysia`;
        const canonical = new URL('product-details.html', 'https://ahmadafiq156.github.io/mockup1/'); canonical.searchParams.set('product',product.id); document.querySelector('link[rel=canonical]').href = canonical.href;
        document.querySelector('meta[name=description]').content = product.description;
        if (![...select.options].some(o => o.value === product.id)) select.add(new Option(product.name,product.id));
        select.value = product.id;
        const thumbs = $('[data-thumbnails]'); thumbs.replaceChildren();
        const primaryPhotos = overviewPhotos(product).filter(photo => !photo.exampleOnly);
        $('[data-product-visual]').hidden = !primaryPhotos.length; $('#overview').classList.toggle('pd-no-image',!primaryPhotos.length);
        thumbs.hidden = primaryPhotos.length < 2;
        for (const photo of primaryPhotos) {
            const button = node('button'); button.type = 'button'; button.dataset.src = photo.src; button.setAttribute('aria-label', `Show ${photo.caption}`);
            const img = node('img'); img.src = photo.thumbnail || photo.src; img.alt = ''; img.width = 320; img.height = 320; img.loading='lazy'; img.decoding='async'; button.append(img); button.onclick=()=>showMainImage(photo); thumbs.append(button);
            if (photo.fit) img.style.objectFit = photo.fit;
        }
        if(primaryPhotos.length) showMainImage(primaryPhotos[0]); else $('[data-product-image]').removeAttribute('src');
        const options = $('[data-options]'); options.replaceChildren();
        $('[data-option-wrap]').hidden = !product.options.length; $('[data-option-label]').textContent = product.optionLabel || 'Options';
        for (const option of product.options) { const button = node('button','',option); button.type='button';button.setAttribute('aria-pressed',String(option===activeOption));button.onclick=()=>chooseOption(option);options.append(button); }
        const highlights = $('[data-highlights]');highlights.replaceChildren(); highlights.hidden=!product.highlights?.length;
        for(const label of product.highlights || []) highlights.append(node('li','',label));
        const seriesGrid=$('[data-series-grid]');seriesGrid.replaceChildren();
        $('[data-series-section] h2').textContent = product.catalogueCollection ? 'Fabric & Colour Collection' : 'Choose a fabric series';
        $('[data-series-section]').classList.toggle('pd-bx-collection', !!product.catalogueCollection);
        $('[data-nav-series]').textContent = product.catalogueCollection ? 'Fabric & colour' : 'Series & fabrics';
        seriesGrid.classList.toggle('pd-catalogue-selector', !!product.catalogueCollection);
        if (product.catalogueCollection) {
            seriesGrid.setAttribute('role', 'group');
            seriesGrid.setAttribute('aria-label', 'Fabric series');
        } else {
            seriesGrid.removeAttribute('role');
            seriesGrid.removeAttribute('aria-label');
        }
        for(const series of visibleSeries) {const button=node('button','pd-series-button');button.type='button';button.dataset.series=series.name;button.setAttribute('aria-pressed',String(series===activeSeries));button.append(node('strong','',series.name),node('span','',series.specs['Light transmission'] || 'View catalogue details'));button.onclick=()=>chooseSeries(series);seriesGrid.append(button);}
        let cataloguePanel = $('[data-catalogue-panel]');
        if (product.catalogueCollection && !cataloguePanel) {
            cataloguePanel = node('div', 'pd-catalogue-panel');
            cataloguePanel.id = 'fabric-catalogue-panel';
            cataloguePanel.dataset.cataloguePanel = '';
            cataloguePanel.setAttribute('role', 'region');
            cataloguePanel.setAttribute('aria-labelledby', 'catalogue-series-heading');
            seriesGrid.after(cataloguePanel);
        }
        if (product.catalogueCollection) {
            seriesGrid.querySelectorAll('button').forEach(button => {
                button.setAttribute('aria-controls', 'fabric-catalogue-panel');
                button.querySelector('span').textContent = product.id === 'zebra' ? 'Choose a colour' : '2 catalogue photographs';
            });
        }
        $('[data-series-section]').hidden=!product.series.length;$('[data-nav-series]').hidden=!product.series.length;
        renderReferences();
        const examples = examplePhotos(product);
        const gallery=$('[data-gallery]'); gallery.replaceChildren();
        for(const photo of examples) gallery.append(imageFigure(photo, false, examples));
        if (!examples.length) gallery.append(node('p','pd-small','Contact our team for product photos and suitable installation examples.'));
        $('[data-gallery-section]').hidden=false; $('[data-nav-gallery]').hidden=false;
        $('[data-motorized-section]').hidden=product.id!=='motorized';
        const related=$('[data-motorized-links]');related.replaceChildren();
        for(const [label,id] of [['Roller Blinds','roller'],['Venetian Blinds','venetian'],['Ziptrak Outdoor Blinds','ziptrak-outdoor']]){const a=node('a','',label+' →');a.href=`product-details.html?product=${id}`;related.append(a);}
        if(activeOption)chooseOption(activeOption);
        if(activeSeries)chooseSeries(activeSeries);
        if (product.id === 'zebra' && requestedColour) {
            activeColour = seriesColours(activeSeries).find(fabric => [colourCode(fabric), fabric.code].includes(requestedColour)) || activeColour;
            renderCataloguePhotos();
        }
        if(updateHistory)updateSelection();
    }
    function showPicker(message) {
        activeProduct=null;activeOption='';activeSeries=null;activeColour=null;
        $('[data-product-content]').hidden=true;$('[data-product-picker]').hidden=false;
        $('[data-product-picker] > p').textContent=message;
        const grid=$('[data-picker-grid]');grid.replaceChildren();
        for(const product of data.products.filter(p=>!p.legacy)){const a=node('a','',product.name);a.href=`product-details.html?product=${product.id}`;grid.append(a);}
        select.value='';$('[data-enquiry-selection]').textContent='';
    }
    if(!data?.products?.length){note.textContent='Product details could not load. Please return to the catalogue or contact us directly.';select.replaceChildren(new Option('Products unavailable',''));return;}
    select.replaceChildren(new Option('Please select a product',''));
    for(const product of data.products.filter(p=>!p.legacy))select.add(new Option(product.name,product.id));
    const params=new URLSearchParams(location.search);const requested=params.get('product');const alias=data.aliases[requested];
    const initial=data.products.find(p=>p.id===(alias?.id || requested));
    if(initial)showProduct(initial,params.get('option') || alias?.option,params.get('series'),true,params.get('colour'));
    else showPicker(requested ? 'That product link is unavailable. Choose a product family below.' : 'Choose a product family to explore the available options.');
    select.addEventListener('change',()=>{const p=data.products.find(p=>p.id===select.value);if(p)showProduct(p);else showPicker('Choose a product family to explore the available options.');note.textContent='WhatsApp will open with your enquiry for you to review and send.';});
    const required=[...form.querySelectorAll('[required]')];required.forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
    form.addEventListener('submit',event=>{
        event.preventDefault();required.forEach(field=>{field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');});
        const phone=form.elements.phone;const digits=phone.value.replace(/\D/g,'');if(!/^[+\d\s().-]+$/.test(phone.value)||digits.length<7||digits.length>16)phone.setCustomValidity('Enter a phone number containing 7 to 16 digits.');
        if(!form.reportValidity()||!activeProduct)return;
        const f=new FormData(form);const lines=['BlindsXpert product enquiry','',`Product: ${activeProduct.name}`];
        if(activeOption)lines.push(`${activeProduct.optionLabel || 'Option'}: ${activeOption}`);
        if(activeSeries)lines.push(`Fabric series: ${activeSeries.name}`);
        if(activeColour)lines.push(`Colour: ${colourCode(activeColour)} · ${activeColour.colourName}`);
        lines.push(`Name: ${f.get('name').trim()}`,`Phone: ${phone.value.trim()}`);
        if(f.get('address').trim())lines.push(`Address / area: ${f.get('address').trim()}`);
        if(f.get('email').trim())lines.push(`Email: ${f.get('email').trim()}`);
        lines.push(`Site visit: ${f.get('siteVisit')}`);
        if(f.get('message').trim())lines.push(`Message: ${f.get('message').trim()}`);
        note.textContent='WhatsApp is opening with your prepared message. Review it there before sending.';
        window.open(`https://wa.me/60176356542?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
    });
})();


