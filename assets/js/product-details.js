(() => {
    const main = document.querySelector('.pd-main');
    if (!main) return;
    const $ = selector => main.querySelector(selector);
    const data = window.BLINDSXPERT_PRODUCTS;
    const select = $('#enquiryProduct');
    const form = $('#productEnquiryForm');
    const note = $('#productFormNote');
    const dialog = $('[data-product-lightbox]');
    const defaultGalleryHeading = $('[data-gallery-section] h2').textContent;
    const defaultGalleryIntro = $('[data-gallery-section] .pd-section-intro').textContent;
    const defaultImageNote = $('[data-product-visual] .pd-image-note')?.textContent;
    let activeProduct, activeOption = '', activeFabricVariant = '', activeCellSize = '', activeFabricType = '', activeSeries = null, activeColour = null;
    let activeFilm = null;
    const otherDetails = product => window.BLINDSXPERT_OTHER_DETAILS?.[product?.id];
    const isVenetian = (product = activeProduct) => product?.id === 'venetian';
    const venetianSource = window.BLINDSXPERT_VENETIAN;
    const venetianCollections = Object.fromEntries(Object.entries(venetianSource?.supplier || {}).map(([type, collections]) => [type, collections.map(collection => ({...collection, fabrics:collection.fabrics.filter(fabric => venetianSource.images[fabric.id]).map(fabric => ({...fabric, closeUpImage:venetianSource.images[fabric.id].src, swatchHex:venetianSource.images[fabric.id].swatchHex}))})).filter(collection => collection.fabrics.length)]));
    const selectedScreen = () => otherDetails(activeProduct)?.systems?.find(system => system.name === activeOption);
    const sharedRoller = window.BLINDSXPERT_FABRIC_CATALOGUES?.roller;
    const rollerImages = window.BLINDSXPERT_ROLLER_IMAGES;
    // Shared image-backed view; original supplier records and product options stay intact.
    const rollerCatalogue = sharedRoller ? {
        variants: rollerImages?.variants || sharedRoller.variants,
        collections: sharedRoller.collections.filter(series => rollerImages?.collections[series.id]).map(series => {
            const availability = rollerImages.collections[series.id];
            return {...series, variant:availability.variant, fabrics:series.fabrics.filter(fabric => availability.colours[fabric.code]).map(fabric => ({...fabric, closeUpImage:availability.colours[fabric.code].src, swatchHex:availability.colours[fabric.code].swatchHex}))};
        }).filter(series => series.fabrics.length)
    } : null;
    const zebraImages = window.BLINDSXPERT_ZEBRA_IMAGES;
    const zebraCatalogue = {
        collections: (window.BLINDSXPERT_FABRIC_CATALOGUES?.zebra.collections || []).map(series => ({
            ...series,
            fabrics: series.fabrics.filter(fabric => zebraImages?.collections[series.id]?.colours[fabric.code]).map(fabric => {
                const image = zebraImages.collections[series.id].colours[fabric.code];
                return {...fabric, displayCode:image.displayCode || fabric.displayCode, colourName:image.colourName || fabric.colourName, closeUpImage:image.src, swatchHex:image.swatchHex};
            })
        })).filter(series => series.fabrics.length)
    };
    const dreamImages = window.BLINDSXPERT_DREAM_IMAGES;
    const dreamCatalogue = {
        collections: (window.BLINDSXPERT_FABRIC_CATALOGUES?.dream.collections || []).map(series => ({
            ...series, name:dreamImages?.collections[series.id]?.name || series.name,
            fabrics: series.fabrics.filter(fabric => dreamImages?.collections[series.id]?.colours[fabric.code]).map(fabric => {
                const image = dreamImages.collections[series.id].colours[fabric.code];
                return {...fabric, closeUpImage:image.src, swatchHex:image.swatchHex};
            })
        })).filter(series => series.fabrics.length)
    };
    const catalogue = product => product?.fabricCatalogue === 'roller' ? rollerCatalogue : product?.id === 'zebra' ? zebraCatalogue : product?.id === 'dream' ? dreamCatalogue : window.BLINDSXPERT_FABRIC_CATALOGUES?.[product?.fabricCatalogue];
    const usesCatalogue = product => !!catalogue(product);
    const isHoneycomb = (product = activeProduct) => product?.fabricSelectionMode === 'cell-size';
    const linkedVariant = product => product.fabricSelectionMode === 'product-variant';
    const selectableSeries = product => {
        const source = catalogue(product);
        if (isHoneycomb(product)) return source?.collections.filter(collection => collection.cellSize === activeCellSize) || [];
        return source ? source.collections.filter(collection => !source.variants || collection.variant === (activeFabricVariant || null))
            : product.series;
    };
    const colourCode = fabric => fabric?.displayCode || fabric?.code || '';
    const seriesColours = series => (series?.types ? series.types.find(type => type.id === activeFabricType)?.fabrics || [] : series?.fabrics || []).filter(fabric => fabric.code);
    const selectedFabricType = () => activeSeries?.types?.find(type => type.id === activeFabricType);
    const selectedFabricLabel = () => isHoneycomb() ? [activeCellSize, activeSeries?.name, selectedFabricType()?.name].filter(Boolean).join(' · ') : [isVenetian() ? activeOption : activeFabricVariant, activeSeries?.name].filter(Boolean).join(' · ');
    const previewImage = fabric => fabric?.closeUpImages?.[activeProduct.id] || fabric?.closeUpImage;
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
        if (activeSeries) url.searchParams.set('series', usesCatalogue(activeProduct) || isVenetian() ? activeSeries.id : activeSeries.name); else url.searchParams.delete('series');
        if (usesCatalogue(activeProduct) && catalogue(activeProduct).variants) url.searchParams.set('fabricVariant', activeFabricVariant || 'unclassified'); else url.searchParams.delete('fabricVariant');
        if (isHoneycomb()) { url.searchParams.set('cellSize', activeCellSize); url.searchParams.set('fabricType', activeFabricType); }
        else { url.searchParams.delete('cellSize'); url.searchParams.delete('fabricType'); }
        if (activeColour) url.searchParams.set('colour', colourCode(activeColour)); else url.searchParams.delete('colour');
        if (activeFilm) url.searchParams.set('film', activeFilm.code); else url.searchParams.delete('film');
        history.replaceState({}, '', url);
    }
    function updateSelection() {
        const parts = [activeProduct?.name, activeOption, selectedScreen()?.mesh, selectedScreen()?.finish, activeFilm ? `${activeFilm.code} · ${activeFilm.shade}` : '', isHoneycomb() ? selectedFabricLabel() : !linkedVariant(activeProduct) ? activeFabricVariant : '', !isHoneycomb() && activeSeries ? `${activeSeries.name} series` : '', activeColour ? [colourCode(activeColour), activeColour.colourName].filter(Boolean).join(' · ') : ''].filter(Boolean);
        $('[data-enquiry-selection]').textContent = parts.length ? `Your enquiry: ${parts.join(' · ')}` : '';
        if (activeProduct) updateUrl();
    }
    const overviewPhotos = product => product.gallery.filter(photo => (photo.mainImage === true || (photo.src.includes('/generated/') && (!photo.src.includes('-detail') || photo.overview === true))) && !photo.exampleOnly);
    const examplePhotos = product => product.gallery.filter(photo => !overviewPhotos(product).includes(photo) || photo.exampleOnly).filter(photo => !photo.src.includes('colour-material-inspiration'));
    function renderColourPalette() {
        const section = node('div', 'pd-colour-selection');
        const controls = node('div', 'pd-colour-controls');
        controls.append(node('h4', '', isVenetian() ? (activeOption === 'Lantex' ? 'STEP 3 — Choose a Colour' : 'STEP 2 — Choose a Colour') : activeProduct.fabricCatalogue === 'roller' ? 'STEP 3 — Choose a Colour' : 'Choose a colour'), node('p', 'pd-small', 'Swatch colours approximate supplier photographs. Please confirm with physical samples.'));
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
            const actualImage = previewImage(fabric);
            const loading = node('div', 'pd-colour-loading', 'Loading fabric photo…'); loading.setAttribute('role', 'status');
            frame.replaceChildren(actualImage ? loading : placeholder);
            frame.getAnimations().forEach(animation => animation.cancel());
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                frame.animate([{opacity:0.65}, {opacity:1}], {duration:180, easing:'ease-out'});
            }
            caption.replaceChildren(node('span', 'pd-selected-series', selectedFabricLabel()), document.createTextNode(' · '), node('strong', 'pd-selected-code', fabric ? colourCode(fabric) : 'Colour not selected'), document.createTextNode(fabric?.colourName ? ' · ' : ''), node('span', 'pd-selected-name', fabric?.colourName || ''));
            if (previewImage(fabric)) {
                const image = node('img');
                image.alt = `${activeSeries.name} ${colourCode(fabric)} ${fabric.colourName} fabric close-up`;
                image.hidden = true;
                image.addEventListener('load', () => {
                    if (activeColour !== fabric || image.parentElement !== frame) return;
                    placeholder.remove(); loading.remove(); image.hidden = false;
                }, {once:true});
                image.addEventListener('error', () => {
                    image.remove();
                    if (activeColour === fabric && loading.isConnected) { loading.textContent = 'Fabric image could not load. Please try another colour.'; loading.setAttribute('role', 'alert'); }
                    if (activeColour === fabric && placeholder.isConnected) placeholder.querySelector('span').textContent = 'Colour photo unavailable';
                }, {once:true});
                frame.append(image);
                image.src = previewImage(fabric);
            }
        }
        for (const fabric of seriesColours(activeSeries)) {
            const button = node('button', 'pd-colour-swatch');
            button.type = 'button';
            button.dataset.colour = colourCode(fabric);
            const approximate = /^#[0-9a-f]{6}$/i.test(fabric.swatchHex || '');
            button.setAttribute('aria-label', `Select ${colourCode(fabric)} ${fabric.colourName}${approximate ? '; approximate photographed colour' : '; colour sample pending review'}`);
            button.title = `${colourCode(fabric)} · ${fabric.colourName}`;
            const chip = node('span', 'pd-swatch-chip');
            chip.setAttribute('aria-hidden', 'true');
            if (approximate) chip.style.backgroundColor = fabric.swatchHex;
            button.append(chip, node('span', 'pd-swatch-code', colourCode(fabric)));
            button.addEventListener('click', () => { activeColour = fabric; updatePreview(); updateSelection(); });
            palette.append(button);
        }
        controls.append(palette);
        if (!seriesColours(activeSeries).length) {
            controls.replaceChildren(node('h4', '', 'Choose a colour'), node('p', 'pd-small', 'Colour options coming soon. Verified supplier colour codes and close-up photographs are pending.'));
        }
        section.append(preview, controls);
        updatePreview();
        return section;
    }
    function chooseFabricVariant(variant) {
        activeFabricVariant = variant;
        activeSeries = selectableSeries(activeProduct)[0] || null;
        activeColour = seriesColours(activeSeries)[0] || null;
        renderReferences(); updateSelection();
    }
    function chooseCellSize(size) {
        activeCellSize = size;
        activeSeries = selectableSeries(activeProduct)[0] || null;
        activeFabricType = activeSeries?.types[0]?.id || '';
        activeColour = seriesColours(activeSeries)[0] || null;
        renderReferences(); updateSelection();
    }
    function chooseHoneycombType(type) {
        activeFabricType = type.id;
        activeColour = seriesColours(activeSeries)[0] || null;
        renderReferences(); updateSelection();
    }
    function renderHoneycombConfigurator() {
        $('[data-series-section]').classList.remove('pd-stepped-fabrics');
        const source = catalogue(activeProduct);
        const focus = {size:document.activeElement?.dataset.cellSize, collection:document.activeElement?.dataset.series, type:document.activeElement?.dataset.honeycombType};
        const section = $('[data-series-section]'); section.hidden = false; section.classList.add('pd-bx-collection');
        section.querySelector(':scope > .container > h2').textContent = 'Fabric & Colour Collection';
        section.querySelector(':scope > .container > .pd-section-intro').textContent = 'Choose Honeycomb size, the applicable collection or fabric type, and colour.';
        $('[data-nav-series]').hidden = false; $('[data-nav-series]').textContent = 'Fabric & colour';
        let variants = $('[data-fabric-variants]');
        if (!variants) { variants = node('div'); variants.dataset.fabricVariants = ''; $('[data-series-grid]').before(variants); }
        variants.hidden = false; variants.className = ''; variants.replaceChildren();
        variants.setAttribute('role', 'group'); variants.setAttribute('aria-label', 'Honeycomb cell size');
        variants.append(node('h3', 'pd-selector-label', 'Choose Honeycomb Size'));
        const sizes = node('div', 'pd-series-grid');
        for (const size of source.sizes) {
            const button = node('button', 'pd-series-button'); button.type = 'button'; button.dataset.cellSize = size;
            button.append(node('strong', '', size), node('span', '', 'Cell size'));
            button.setAttribute('aria-pressed', String(size === activeCellSize)); button.onclick = () => chooseCellSize(size); sizes.append(button);
        }
        variants.append(sizes);
        let collectionLabel = $('[data-honeycomb-collection-label]');
        const grid = $('[data-series-grid]'); grid.classList.add('pd-catalogue-selector'); grid.replaceChildren();
        if (!collectionLabel) { collectionLabel = node('h3', 'pd-selector-label'); collectionLabel.dataset.honeycombCollectionLabel = ''; grid.before(collectionLabel); }
        const collections = selectableSeries(activeProduct);
        collectionLabel.hidden = false; collectionLabel.textContent = collections.length > 1 ? 'Choose Collection' : 'Collection: '+activeSeries.name;
        grid.hidden = collections.length < 2; grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Honeycomb supplier collection');
        for (const collection of collections) {
            const button = node('button', 'pd-series-button'); button.type = 'button'; button.dataset.series = collection.id;
            button.append(node('strong', '', collection.name), node('span', '', collection.cellSize));
            button.setAttribute('aria-pressed', String(activeSeries === collection)); button.onclick = () => chooseSeries(collection); grid.append(button);
        }
        let types = $('[data-honeycomb-types]');
        if (!types) { types = node('div'); types.dataset.honeycombTypes = ''; grid.after(types); }
        types.replaceChildren(); types.hidden = activeSeries.types.every(type => !type.name);
        if (!types.hidden) {
            types.append(node('h3', 'pd-selector-label', 'Choose Fabric Type'));
            const typeGrid = node('div', 'pd-series-grid'); typeGrid.setAttribute('role', 'group'); typeGrid.setAttribute('aria-label', 'Honeycomb fabric type');
            for (const type of activeSeries.types) {
                const button = node('button', 'pd-series-button'); button.type = 'button'; button.dataset.honeycombType = type.id;
                button.append(node('strong', '', type.name), node('span', '', type.fabrics.length+' colours'));
                button.setAttribute('aria-pressed', String(type.id === activeFabricType)); button.onclick = () => chooseHoneycombType(type); typeGrid.append(button);
            }
            types.append(typeGrid);
        }
        if ($('[data-fabric-unclassified]')) $('[data-fabric-unclassified]').hidden = true;
        if ($('[data-catalogue-panel]')) $('[data-catalogue-panel]').hidden = true;
        let panel = $('[data-fabric-panel]');
        if (!panel) { panel = node('div', 'pd-catalogue-panel'); panel.dataset.fabricPanel = ''; }
        types.after(panel); panel.hidden = false; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', 'Honeycomb colours and product specifications');
        panel.replaceChildren(renderColourPalette());
        if (selectedFabricType()?.provisional) panel.append(node('p', 'pd-small', 'Honeycomb-38 Semi-Blackout grouping includes S and SF codes as printed. Supplier classification verification is pending.'));
        const specs = node('section', 'pd-fabric-specifications'); specs.append(node('h4', '', 'Product Specifications'));
        const table = node('table', 'pd-spec-table'); table.append(node('caption', 'visually-hidden', 'Honeycomb product specifications'));
        const body = node('tbody');
        const values = {...activeProduct.productSpecs, 'Selected Cell Size':activeCellSize, 'Selected Collection':activeSeries.name, ...(selectedFabricType()?.name ? {'Selected Fabric Type':selectedFabricType().name} : {}), 'Colour Options':seriesColours(activeSeries).length+' verified codes in the selected collection'+(selectedFabricType()?.name ? ' / fabric type' : '')};
        for (const [label, value] of Object.entries(values)) { const row = node('tr'); const th = node('th', '', label); th.scope = 'row'; row.append(th, node('td', '', value)); body.append(row); }
        table.append(body); specs.append(table, node('p', 'pd-small', 'Fabric composition, weight, maximum width and installation limits are pending verified supplier information. Confirm suitability with our team.')); panel.append(specs);
        const selector = focus.size ? '[data-cell-size]' : focus.type ? '[data-honeycomb-type]' : focus.collection ? '[data-series]' : null;
        if (selector) [...section.querySelectorAll(selector)].find(button => focus.size ? button.dataset.cellSize === focus.size : focus.type ? button.dataset.honeycombType === focus.type : button.dataset.series === focus.collection)?.focus({preventScroll:true});
    }
    function renderFabricConfigurator() {
        if (isHoneycomb()) { renderHoneycombConfigurator(); return; }
        const source = catalogue(activeProduct);
        const focusedVariant = document.activeElement?.dataset.fabricVariant;
        const focusedCollection = document.activeElement?.dataset.series;
        const focusedPending = document.activeElement?.hasAttribute('data-pending-browse');
        const section = $('[data-series-section]');
        const stepped = activeProduct.fabricCatalogue === 'roller';
        section.classList.toggle('pd-stepped-fabrics', stepped);
        section.hidden = false; section.classList.add('pd-bx-collection');
        section.querySelector(':scope > .container > h2').textContent = 'Fabric & Colour Collection';
        $('[data-nav-series]').hidden = false; $('[data-nav-series]').textContent = 'Fabric & colour';
        section.querySelector(':scope > .container > .pd-section-intro').textContent = source.variants
            ? 'Choose a fabric type, collection and colour. Confirm availability with our team.'
            : 'Choose a fabric collection and colour. Confirm availability with our team.';
        let variants = $('[data-fabric-variants]');
        if (!variants) {
            variants = node('div', 'pd-roller-variants'); variants.dataset.fabricVariants = '';
            $('[data-series-grid]').before(variants);
        }
        variants.className = stepped ? 'pd-roller-variants pd-fabric-variants' : 'pd-roller-variants';
        let variantLabel = $('[data-fabric-variant-label]');
        if (!variantLabel) { variantLabel = node('h3', 'pd-config-step'); variantLabel.dataset.fabricVariantLabel = ''; variants.before(variantLabel); }
        variantLabel.hidden = !stepped; variantLabel.textContent = 'STEP 1 — Choose Fabric Variant';
        variants.hidden = !source.variants; variants.replaceChildren();
        variants.setAttribute('role', 'group');
        variants.setAttribute('aria-label', linkedVariant(activeProduct) ? 'Product fabric variant' : 'Fabric type (separate from product options)');
        for (const variant of source.variants || []) {
            const button = node('button', stepped ? 'pd-series-button pd-variant-button' : 'pd-series-button'); button.type = 'button';
            button.dataset.fabricVariant = variant;
            const count = source.collections.filter(collection => collection.variant === variant).length;
            button.append(node('strong', '', variant), node('span', '', count+' fabric collections'));
            button.setAttribute('aria-pressed', String(activeFabricVariant === variant));
            button.onclick = () => linkedVariant(activeProduct) ? chooseOption(variant) : chooseFabricVariant(variant);
            variants.append(button);
        }
        const grid = $('[data-series-grid]'); grid.hidden = false; grid.classList.add('pd-catalogue-selector'); grid.replaceChildren();
        let seriesLabel = $('[data-fabric-series-label]');
        if (!seriesLabel) { seriesLabel = node('h3', 'pd-config-step'); seriesLabel.dataset.fabricSeriesLabel = ''; grid.before(seriesLabel); }
        seriesLabel.hidden = !stepped; seriesLabel.textContent = 'STEP 2 — Choose Fabric Series';
        grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Fabric collections');
        const appendButton = (collection, target) => {
            const button = node('button', 'pd-series-button'); button.type = 'button'; button.dataset.series = collection.id;
            button.append(node('strong', '', collection.name), node('span', '', collection.fabrics.length+' colours'));
            button.setAttribute('aria-pressed', String(activeSeries === collection));
            button.onclick = () => chooseSeries(collection); target.append(button);
        };
        for (const collection of source.collections.filter(collection => !source.variants || collection.variant === activeFabricVariant)) appendButton(collection, grid);
        let pending = $('[data-fabric-unclassified]');
        if (!pending) { pending = node('section', 'pd-unclassified'); pending.dataset.fabricUnclassified = ''; grid.after(pending); }
        pending.replaceChildren(); pending.hidden = !source.variants || !source.collections.some(collection => collection.variant == null);
        if (!pending.hidden) {
            const browse = node('button', 'pd-text-link pd-pending-browse', activeFabricVariant ? 'Browse collections awaiting variant confirmation' : 'Return to '+source.variants[0]+' fabrics');
            browse.type = 'button'; browse.dataset.pendingBrowse = ''; browse.setAttribute('aria-expanded', String(!activeFabricVariant));
            browse.onclick = () => linkedVariant(activeProduct) ? chooseOption(activeFabricVariant ? '' : source.variants[0]) : chooseFabricVariant(activeFabricVariant ? '' : source.variants[0]); pending.append(browse);
            if (!activeFabricVariant) {
                pending.append(node('h3', '', 'Collections awaiting variant confirmation'), node('p', 'pd-small', 'These supplier sheets do not state Blackout, Sunscreen or Translucent. Select a collection to enquire without assigning a variant.'));
                const pendingGrid = node('div', 'pd-series-grid pd-catalogue-selector');
                pendingGrid.setAttribute('role', 'group'); pendingGrid.setAttribute('aria-label', 'Collections with classification pending');
                for (const collection of source.collections.filter(collection => collection.variant == null)) appendButton(collection, pendingGrid);
                pending.append(pendingGrid);
            }
        }
        let panel = $('[data-fabric-panel]');
        if (!panel) { panel = node('div', 'pd-catalogue-panel'); panel.dataset.fabricPanel = ''; pending.after(panel); }
        pending.after(panel);
        panel.hidden = false; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', 'Fabric colours and specifications');
        if (!activeSeries) panel.replaceChildren(node('p', 'pd-small', activeProduct.id === 'roller' ? 'No supplied colour images are available for this variant. Please contact our team.' : 'Fabric collection information coming soon.'));
        else {
            panel.replaceChildren();
            if (source.variants && activeSeries.variant == null) panel.append(node('p', 'pd-small', 'Selected fabric classification is pending supplier confirmation.'));
            if (activeProduct.fabricCatalogue === 'dream') panel.append(node('p', 'pd-small', 'Choose a verified photographed colour from the selected BX collection. Individual colour identifiers retain the supplier code suffixes.'));
            panel.append(renderColourPalette());
            const specs = node('section', 'pd-fabric-specifications'); specs.append(node('h4', '', 'Fabric Specifications'));
            const entries = Object.entries(activeSeries.specs || {}).filter(([, value]) => value !== '' && value != null);
            if (entries.length) {
                const table = node('table', 'pd-spec-table'); table.append(node('caption', 'visually-hidden', activeSeries.name+' fabric specifications'));
                const body = node('tbody');
                for (const [label, value] of entries) { const row = node('tr'); const th = node('th', '', label); th.scope = 'row'; row.append(th, node('td', '', value)); body.append(row); }
                table.append(body); specs.append(table);
                specs.append(node('p', 'pd-small', 'Supplier fabric specifications only. Finished blind dimensions, hardware and installation suitability require confirmation.'));
                if (activeSeries.reviewNotice) specs.append(node('p', 'pd-small', activeSeries.reviewNotice));
            } else specs.append(node('p', 'pd-small', 'Verified fabric specifications are pending.'));
            panel.append(specs);
        }
        if ($('[data-catalogue-panel]')) $('[data-catalogue-panel]').hidden = true;
        const buttons = focusedVariant ? variants.querySelectorAll('button') : focusedCollection ? section.querySelectorAll('button[data-series]') : [];
        [...buttons].find(button => focusedVariant ? button.dataset.fabricVariant === focusedVariant : button.dataset.series === focusedCollection)?.focus({preventScroll:true});
        if (focusedPending) pending.querySelector('[data-pending-browse]')?.focus({preventScroll:true});
    }
    function specificationTable(title, values) {
        const table = node('table', 'pd-spec-table');
        table.append(node('caption', 'visually-hidden', title));
        const body = node('tbody');
        for (const [label, value] of Object.entries(values || {})) {
            const row = node('tr'); const th = node('th', '', label); th.scope = 'row';
            row.append(th, node('td', '', value)); body.append(row);
        }
        table.append(body); return table;
    }
    function detailsList(items) {
        const list = node('ul', 'pd-detail-list');
        for (const item of items || []) list.append(node('li', '', item));
        return list;
    }
    function renderOtherProductDetails() {
        const source = otherDetails(activeProduct);
        const screenMode = activeProduct.detailSelector === 'screen';
        const section = $('[data-series-section]');
        const focusedScreen = document.activeElement?.dataset.screen;
        section.hidden = false; section.classList.add('pd-bx-collection', 'pd-other-details');
        section.querySelector(':scope > .container > h2').textContent = screenMode ? 'Choose Screen Type' : 'Choose Window Film';
        section.querySelector(':scope > .container > .pd-section-intro').textContent = screenMode
            ? 'Choose a screen system to review its applicable material, finish and supplier specifications.'
            : 'Explore our supplied window tinting film samples. Contact our team to discuss the right option for your windows.';
        $('[data-nav-series]').hidden = false;
        $('[data-nav-series]').textContent = screenMode ? 'Screen types' : 'Window films';
        $('[data-spec-section]').hidden = true; $('[data-nav-specifications]').hidden = true;
        if ($('[data-catalogue-panel]')) $('[data-catalogue-panel]').hidden = true;
        const grid = $('[data-series-grid]'); grid.replaceChildren(); grid.hidden = !screenMode;
        grid.className = 'pd-series-grid pd-catalogue-selector pd-screen-types';
        grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Screen types');
        let heading = $('[data-other-step]');
        if (!heading) { heading = node('h3', 'pd-config-step'); heading.dataset.otherStep = ''; grid.before(heading); }
        heading.hidden = !screenMode; heading.textContent = 'STEP 1 — Choose Screen Type';
        let panel = $('[data-other-panel]');
        if (!panel) { panel = node('div', 'pd-catalogue-panel'); panel.dataset.otherPanel = ''; grid.after(panel); }
        panel.hidden = false; panel.replaceChildren();
        if (screenMode) {
            const screen = selectedScreen();
            for (const system of source.systems) {
                const button = node('button', 'pd-series-button pd-screen-button'); button.type = 'button'; button.dataset.screen = system.id;
                button.setAttribute('aria-pressed', String(system === screen));
                button.append(node('strong', '', system.name), node('span', '', system.description));
                button.addEventListener('click', () => chooseOption(system.name)); grid.append(button);
            }
            const selection = node('div', 'pd-screen-selection'); selection.setAttribute('aria-live', 'polite');
            const material = node('section', 'pd-screen-material');
            material.append(node('h3', 'pd-config-step', 'STEP 2 — View Available Mesh / Material'), node('p', 'pd-verified-option', screen.mesh || 'Material specification pending supplier confirmation.'));
            const finish = node('section', 'pd-screen-finish');
            finish.append(node('h3', 'pd-config-step', 'STEP 3 — View Available Colour / Finish'), node('p', 'pd-verified-option', screen.finish || 'Colour / finish options pending supplier confirmation.'));
            selection.append(material, finish); panel.append(selection);
            const specs = node('section', 'pd-screen-specifications');
            specs.append(node('h3', 'pd-config-step', 'STEP 4 — Review Specifications'), node('h4', '', screen.name));
            if (screen.meshSpecs) {
                specs.append(node('h4', '', 'Sliding-screen mesh'), specificationTable(screen.name + ' mesh specifications', screen.meshSpecs), node('p', 'pd-small', 'Supplier-labelled for sliding insect screens only. “Free Formaldehyde” is a supplier declaration; no testing standard is supplied.'));
                const reference = node('details', 'pd-supplier-reference');
                reference.append(node('summary', '', 'View sliding-mesh supplier label'), imageFigure(source.slidingMeshPhoto, true));
                specs.append(reference);
            } else specs.append(node('p', 'pd-small', 'Mesh specifications for this system require supplier confirmation.'));
            for (const [component, values] of Object.entries(screen.hardware)) {
                specs.append(node('h4', '', component), specificationTable(screen.name + ' — ' + component, values));
            }
            if (screen.id === 'chain') specs.append(node('p', 'pd-small', 'Pull-rail gap values are preserved as printed. The listed inner gap exceeds the outer gap; confirm dimensions before ordering.'));
            if (screen.id === 'cord') specs.append(node('p', 'pd-small', 'The supplier lists two top-rail profiles (45mm and 40mm). Confirm the applicable profile before ordering.'));
            if (['chain', 'cord'].includes(screen.id) && screen.originalReferencePhotos?.length) {
                const diagram = node('details', 'pd-supplier-reference');
                diagram.append(node('summary', '', 'View original supplier hardware diagram'), imageFigure(screen.originalReferencePhotos[0], true)); specs.append(diagram);
            }
            if (screen.accessories.length) specs.append(node('h4', '', 'Installation & accessories'), detailsList(screen.accessories));
            specs.append(node('h4', '', 'Features & care'), detailsList(screen.features));
            panel.append(specs);
            const references = node('div', 'pd-screen-references');
            const mesh = source.referenceMesh;
            const meshDetails = node('details', 'pd-supplier-reference');
            meshDetails.append(node('summary', '', mesh.title), specificationTable(mesh.title, mesh.specs), node('p', 'pd-small', 'This PVC-coated glass-yarn mesh is separate from the polyester sliding mesh. Its compatible screen system requires confirmation; it is not an enquiry selection.'), imageFigure(mesh.photo, true));
            const hardware = node('details', 'pd-supplier-reference');
            hardware.append(node('summary', '', source.referenceHardware.title), node('p', 'pd-small', source.referenceHardware.note));
            for (const [component, values] of Object.entries(source.referenceHardware.components)) hardware.append(node('h4', '', component), specificationTable(component, values));
            const accessory = node('section');
            accessory.append(node('h4', '', source.extensionFrame.name), node('p', 'pd-small', source.extensionFrame.note));
            references.append(accessory, meshDetails, hardware); panel.append(references);
            if (focusedScreen) grid.querySelector(`[data-screen="${focusedScreen}"]`)?.focus({preventScroll:true});
        } else {
            const gallery = node('div', 'pd-window-film-gallery');
            for (const photo of source.gallery) gallery.append(imageFigure(photo, false, source.gallery));
            panel.append(gallery);
        }
    }

    function renderMoreOptionsLink() {
        let message = $('[data-more-options]');
        const collection = isVenetian() || usesCatalogue(activeProduct) || activeProduct.series.length || otherDetails(activeProduct);
        const hasSelection = collection || activeProduct.options.length;
        if (!hasSelection) { if (message) message.hidden = true; return; }
        if (!message) { message = node('p', 'pd-more-options'); message.dataset.moreOptions = ''; }
        const parent = collection ? $('[data-series-section] > .container') : $('[data-option-wrap]');
        parent.append(message); message.hidden = false;
        const wording = activeProduct.detailSelector === 'film' ? 'Looking for more window film options? '
            : activeProduct.detailSelector === 'screen' || !collection ? 'Looking for more finishes or custom options? '
            : 'Looking for more colours or fabric options? ';
        const link = node('a', 'pd-text-link', 'Enquire with us for more choices'); link.href = '#product-enquiry';
        const arrow = node('span', '', ' →'); arrow.setAttribute('aria-hidden', 'true'); link.append(arrow);
        message.replaceChildren(document.createTextNode(wording), link);
    }

    function renderVenetianConfigurator() {
        const section = $('[data-series-section]');
        section.hidden = false; $('[data-nav-series]').hidden = false; section.classList.add('pd-venetian');
        section.querySelector('.eyebrow').textContent = 'EXPLORE THE OPTIONS';
        section.querySelector(':scope > .container > h2').textContent = 'Choose your Venetian blinds';
        section.querySelector(':scope > .container > .pd-section-intro').textContent = 'Select a type to explore its available options.';
        const container = $('[data-series-section] > .container');
        let panel = $('[data-venetian-panel]');
        if (!panel) { panel = node('div', 'pd-venetian-panel'); panel.dataset.venetianPanel = ''; $('[data-series-grid]').before(panel); }
        const focused = document.activeElement?.dataset.venetianChoice;
        panel.hidden = false; panel.replaceChildren(node('h2', 'pd-config-step', 'STEP 1 — Choose a Venetian Blind Type'));
        const types = node('div', 'pd-fabric-variants');
        for (const type of activeProduct.options) {
            const button = node('button', 'pd-variant-button', type); button.type = 'button'; button.dataset.venetianChoice = type;
            button.setAttribute('aria-pressed', String(type === activeOption)); button.addEventListener('click', () => chooseOption(type)); types.append(button);
        }
        panel.append(types);
        $('[data-series-grid]').hidden = true;
        const collections = venetianCollections[activeOption] || [];
        if (!collections.includes(activeSeries)) { activeSeries = collections[0] || null; activeColour = seriesColours(activeSeries)[0] || null; }
        if (activeSeries) {
            $('[data-series-title]').textContent = 'Venetian colour collections';
            $('[data-series-description]').textContent = 'Explore the supplied colour photographs and specifications for your selected type.';
            if (activeOption === 'Lantex') {
                panel.append(node('h3', 'pd-config-step', 'STEP 2 — Choose a Lantex Series'));
                const grid = node('div', 'pd-venetian-series');
                for (const collection of collections) {
                    const button = node('button', 'pd-variant-button', collection.name); button.type = 'button'; button.dataset.venetianChoice = collection.id;
                    button.setAttribute('aria-pressed', String(collection === activeSeries));
                    button.addEventListener('click', () => { activeSeries = collection; activeColour = seriesColours(collection)[0] || null; renderReferences(); updateSelection(); }); grid.append(button);
                }
                panel.append(grid);
            }
            panel.append(renderColourPalette(), node('h3', 'pd-config-step', 'Specifications'), specificationTable(activeSeries.name + ' specifications', activeSeries.specs));
            $('[data-spec-section]').hidden = true; $('[data-nav-specifications]').hidden = true;
            if ($('[data-catalogue-panel]')) $('[data-catalogue-panel]').hidden = true;
        }
        if (focused) [...panel.querySelectorAll('button')].find(button => button.dataset.venetianChoice === focused)?.focus({preventScroll:true});
        return !!activeSeries;
    }
    function renderReferences() {
        renderMoreOptionsLink();
        if (isVenetian() && renderVenetianConfigurator()) return;
        if (otherDetails(activeProduct)) { renderOtherProductDetails(); return; }
        if (activeProduct.placeholderOnly) {
            $('[data-spec-table]').replaceChildren(); $('[data-spec-section]').hidden = true; $('[data-nav-specifications]').hidden = true;
            if ($('[data-catalogue-panel]')) $('[data-catalogue-panel]').hidden = true;
            return;
        }
        if (usesCatalogue(activeProduct)) {
            $('[data-spec-table]').replaceChildren(); $('[data-spec-section]').hidden = true; $('[data-nav-specifications]').hidden = true;
            renderFabricConfigurator(); return;
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
        const changed = activeOption !== option;
        activeOption = option;
        if (isVenetian() && changed) { activeSeries = null; activeColour = null; }
        $('[data-options]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === option)));
        showOptionImage();
        if (otherDetails(activeProduct) || isVenetian()) renderReferences();
        if (usesCatalogue(activeProduct) && linkedVariant(activeProduct)) {
            activeFabricVariant = option;
            if (!selectableSeries(activeProduct).includes(activeSeries)) {
                activeSeries = selectableSeries(activeProduct)[0] || null;
                activeColour = seriesColours(activeSeries)[0] || null;
            }
            renderReferences();
        }
        updateSelection();
    }
    function chooseSeries(series) {
        activeSeries = series;
        if (isHoneycomb()) { activeCellSize = series.cellSize; activeFabricType = series.types[0]?.id || ''; }
        activeColour = usesCatalogue(activeProduct) ? seriesColours(series)[0] || null : null;
        if (usesCatalogue(activeProduct)) {
            const source = catalogue(activeProduct);
            if (source.variants) {
                activeFabricVariant = series.variant || '';
                if (linkedVariant(activeProduct)) {
                    activeOption = activeFabricVariant;
                    $('[data-options]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === activeOption)));
                }
            }
            renderReferences(); updateSelection(); return;
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
    function renderDreamInformation(product) {
        let section = $('[data-dream-information]');
        let link = $('[data-nav-dream-information]');
        if (!section && product.id === 'dream') {
            section = node('section', 'container pd-section pd-dream-information'); section.id = 'dream-information'; section.dataset.dreamInformation = '';
            $('[data-gallery-section]').before(section);
            section.append(node('p', 'eyebrow', 'LIGHT, PRIVACY & EVERYDAY LIVING'), node('h2', '', 'Why Choose Dream Blinds?'));
            const features = node('div', 'pd-dream-feature-grid');
            for (const feature of dreamImages.features) {
                const card = node('article', 'pd-dream-feature-card'); card.append(node('h3', '', feature.title), node('p', '', feature.description)); features.append(card);
            }
            section.append(features);
            const operation = node('div', 'pd-dream-operation'); const copy = node('div');
            copy.append(node('h3', '', 'How Dream Blinds Work'), node('p', '', dreamImages.operation));
            operation.append(copy); section.append(operation);
            link = node('a', '', 'Why Dream Blinds?'); link.href = '#dream-information'; link.dataset.navDreamInformation = ''; $('[data-nav-gallery]').before(link);
        }
        if (section) section.hidden = product.id !== 'dream';
        if (link) link.hidden = product.id !== 'dream';
    }

    function showProduct(product, option = '', seriesName = '', updateHistory = true, requestedColour = '', requestedFabricVariant = '', requestedCellSize = '', requestedFabricType = '') {
        activeProduct = product;
        activeFilm = null;
        for (const selector of ['[data-fabric-variants]', '[data-fabric-panel]', '[data-fabric-unclassified]', '[data-honeycomb-types]', '[data-honeycomb-collection-label]', '[data-fabric-variant-label]', '[data-fabric-series-label]', '[data-other-step]', '[data-other-panel]', '[data-venetian-panel]']) if ($(selector)) $(selector).hidden = true;
        $('[data-series-section]').classList.remove('pd-stepped-fabrics', 'pd-other-details', 'pd-venetian');
        activeOption = product.options.includes(option) ? option : (product.defaultOption || '');
        const source = catalogue(product);
        activeCellSize = isHoneycomb(product) ? source.sizes.includes(requestedCellSize) ? requestedCellSize : source.sizes[0] : '';
        activeFabricType = '';
        activeFabricVariant = source?.variants ? linkedVariant(product) ? activeOption : source.variants.includes(requestedFabricVariant) ? requestedFabricVariant : source.variants[0] : '';
        if (source?.variants && requestedFabricVariant === 'unclassified') {
            activeFabricVariant = ''; if (linkedVariant(product)) activeOption = '';
        }
        const visibleSeries = selectableSeries(product);
        activeSeries = visibleSeries.find(s => s.id === seriesName || s.name === seriesName || ([s.sourceSeries, s.sourceCode].filter(Boolean).some(code => [code, `${code} SERIES`, `${s.name} SERIES`].includes(seriesName)))) || (usesCatalogue(product) || product.catalogueCollection || !option ? visibleSeries[0] : null) || null;
        if (isHoneycomb(product)) activeFabricType = activeSeries?.types.find(type => type.id === requestedFabricType)?.id || activeSeries?.types[0]?.id || '';
        activeColour = usesCatalogue(product) ? seriesColours(activeSeries)[0] || null : null;
        $('[data-product-picker]').hidden = true; $('[data-product-content]').hidden = false;
        $('[data-product-name]').textContent = product.name; $('[data-product-category]').textContent = names[product.category];
        $('[data-product-description]').textContent = product.description; $('[data-breadcrumb]').textContent = product.name;
        const imageNote = $('[data-product-visual] .pd-image-note');
        if (imageNote) imageNote.textContent = product.id === 'insect-screen' ? 'Supplied screen examples. Confirm materials, finishes and suitability with our team.' : defaultImageNote;
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
        $('[data-option-wrap]').hidden = !product.options.length || product.detailSelector === 'screen'; $('[data-option-label]').textContent = product.optionLabel || 'Options';
        for (const option of product.options) { const button = node('button','',option); button.type='button';button.setAttribute('aria-pressed',String(option===activeOption));button.onclick=()=>chooseOption(option);options.append(button); }
        const highlights = $('[data-highlights]');highlights.replaceChildren(); highlights.hidden=!product.highlights?.length;
        for(const label of product.highlights || []) highlights.append(node('li','',label));
        $('[data-series-section] .pd-section-intro').textContent = 'Select a series to view its catalogue details. Confirm colours and availability with our team.';
        const seriesGrid=$('[data-series-grid]');seriesGrid.replaceChildren();
        seriesGrid.classList.remove('pd-screen-types');
        seriesGrid.hidden = false;
        $('[data-series-section] > .container > h2').textContent = product.catalogueCollection ? 'Fabric & Colour Collection' : 'Choose a fabric series';
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
        $('[data-series-section]').hidden=!isVenetian(product) && !usesCatalogue(product) && !product.series.length;$('[data-nav-series]').hidden=$('[data-series-section]').hidden;
        renderReferences();
        renderDreamInformation(product);
        const examples = product.detailSelector === 'screen' ? otherDetails(product).systems.flatMap(system => system.photos) : examplePhotos(product);
        const gallery=$('[data-gallery]'); gallery.replaceChildren();
        gallery.classList.toggle('pd-supplier-gallery', product.detailSelector === 'screen');
        $('[data-gallery-section] h2').textContent = product.detailSelector === 'screen' ? 'Screen type examples & technical diagrams' : defaultGalleryHeading;
        $('[data-gallery-section] .pd-section-intro').textContent = product.detailSelector === 'screen' ? 'Supplier catalogue examples and hardware diagrams. Open any image for a full view.' : product.detailSelector === 'film' ? 'Explore the supplied window tinting film samples in the gallery above.' : defaultGalleryIntro;
        for(const photo of examples) gallery.append(imageFigure(photo, false, examples));
        if (!examples.length) gallery.append(node('p','pd-small',product.detailSelector === 'film' ? 'Window tinting film samples are shown above. Completed-project photographs are not supplied.' : 'Contact our team for product photos and suitable installation examples.'));
        $('[data-gallery-section]').hidden=!!product.placeholderOnly; $('[data-nav-gallery]').hidden=!!product.placeholderOnly;
        $('[data-motorized-section]').hidden=product.id!=='motorized';
        const related=$('[data-motorized-links]');related.replaceChildren();
        for(const [label,id] of [['Roller Blinds','roller'],['Venetian Blinds','venetian'],['Ziptrak Outdoor Blinds','ziptrak-outdoor']]){const a=node('a','',label+' →');a.href=`product-details.html?product=${id}`;related.append(a);}
        if(activeOption)chooseOption(activeOption);
        if (isVenetian()) {
            const collections = venetianCollections[activeOption] || [];
            activeSeries = collections.find(collection => collection.id === seriesName || collection.name === seriesName) || activeSeries;
            activeColour = seriesColours(activeSeries).find(fabric => [colourCode(fabric), fabric.code].includes(requestedColour)) || seriesColours(activeSeries)[0] || null;
            renderReferences();
        }
        if(activeSeries && !isHoneycomb() && !isVenetian())chooseSeries(activeSeries);
        if (usesCatalogue(product) && requestedColour) {
            activeColour = seriesColours(activeSeries).find(fabric => [colourCode(fabric), fabric.code].includes(requestedColour)) || activeColour;
            renderFabricConfigurator();
        }
        if(updateHistory)updateSelection();
    }
    function showPicker(message) {
        activeFilm=null;activeProduct=null;activeOption='';activeFabricVariant='';activeCellSize='';activeFabricType='';activeSeries=null;activeColour=null;
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
    if(initial)showProduct(initial,params.get('option') || alias?.option,params.get('series'),true,params.get('colour'),params.get('fabricVariant'),params.get('cellSize'),params.get('fabricType'));
    else showPicker(requested ? 'That product link is unavailable. Choose a product family below.' : 'Choose a product family to explore the available options.');
    select.addEventListener('change',()=>{const p=data.products.find(p=>p.id===select.value);if(p)showProduct(p);else showPicker('Choose a product family to explore the available options.');note.textContent='WhatsApp will open with your enquiry for you to review and send.';});
    const required=[...form.querySelectorAll('[required]')];required.forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
    form.addEventListener('submit',event=>{
        event.preventDefault();required.forEach(field=>{field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');});
        const phone=form.elements.phone;const digits=phone.value.replace(/\D/g,'');if(!/^[+\d\s().-]+$/.test(phone.value)||digits.length<7||digits.length>16)phone.setCustomValidity('Enter a phone number containing 7 to 16 digits.');
        if(!form.reportValidity()||!activeProduct)return;
        const f=new FormData(form);const lines=['BlindsXpert product enquiry','',`Product: ${activeProduct.name}`];
        if(activeOption)lines.push(`${isVenetian() ? 'Type' : activeProduct.id === 'roller' ? 'Variant' : activeProduct.optionLabel || 'Option'}: ${activeOption}`);
        const screen = selectedScreen();
        if (screen?.mesh) lines.push('Mesh / material: '+screen.mesh);
        if (screen?.finish) lines.push('Colour / finish: '+screen.finish);
        if (activeFilm) {
            lines.push('Film code: '+activeFilm.code, 'Film shade: '+activeFilm.shade);
            for (const [metric, value] of Object.entries(activeFilm.specs).filter(([key]) => !['Film code', 'Film shade / colour'].includes(key))) lines.push(metric+': '+value);
        }
        if (isHoneycomb()) {
            lines.push('Cell Size: '+activeCellSize, 'Collection: '+activeSeries.name);
            if (selectedFabricType()?.name) lines.push('Fabric Type: '+selectedFabricType().name);
        } else if(activeSeries)lines.push((isVenetian() ? (activeOption === 'Lantex' ? 'Series: ' : 'Collection: ') : 'Fabric series: ')+activeSeries.name);
        if (usesCatalogue(activeProduct) && catalogue(activeProduct).variants && !linkedVariant(activeProduct) && activeFabricVariant) lines.push('Fabric type: '+activeFabricVariant);
        if (usesCatalogue(activeProduct) && catalogue(activeProduct).variants && activeSeries?.variant == null) lines.push('Fabric classification: Pending supplier confirmation');
        if(activeColour)lines.push('Colour: '+[colourCode(activeColour), activeColour.colourName].filter(Boolean).join(' · '));
        lines.push(`Name: ${f.get('name').trim()}`,`Phone: ${phone.value.trim()}`);
        if(f.get('address').trim())lines.push(`Address / area: ${f.get('address').trim()}`);
        if(f.get('email').trim())lines.push(`Email: ${f.get('email').trim()}`);
        lines.push(`Site visit: ${f.get('siteVisit')}`);
        if(f.get('message').trim())lines.push(`Message: ${f.get('message').trim()}`);
        note.textContent='WhatsApp is opening with your prepared message. Review it there before sending.';
        window.open(`https://wa.me/60176356542?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
    });
})();


