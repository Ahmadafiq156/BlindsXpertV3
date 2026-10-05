(() => {
    const main = document.querySelector('.pd-main');
    if (!main) return;
    const $ = selector => main.querySelector(selector);
    const data = window.BLINDSXPERT_PRODUCTS;
    const select = $('#enquiryProduct');
    const form = $('#productEnquiryForm');
    const note = $('#productFormNote');
    const dialog = $('[data-product-lightbox]');
    let activeProduct, activeOption = '', activeSeries = null, returnFocus;
    const names = {indoor:'Indoor blinds', outdoor:'Outdoor blinds', motorized:'Motorized solutions', other:'Other products'};
    const node = (tag, className, content) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content !== undefined) el.textContent = content;
        return el;
    };
    function openImage(photo, trigger) {
        returnFocus = trigger;
        $('[data-pd-lightbox-image]').src = photo.src;
        $('[data-pd-lightbox-image]').alt = photo.alt;
        $('[data-pd-lightbox-caption]').textContent = photo.caption;
        dialog.showModal();
    }
    $('[data-pd-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { $('[data-pd-lightbox-image]').removeAttribute('src'); returnFocus?.focus(); });
    function imageFigure(photo, reference = false) {
        const figure = node('figure', reference ? 'pd-reference' : 'pd-photo');
        const button = node('button'); button.type = 'button'; button.setAttribute('aria-label', `View full image: ${photo.caption}`);
        const img = node('img'); img.src = photo.src; img.alt = photo.alt; img.loading = 'lazy';
        button.append(img); button.addEventListener('click', () => openImage(photo, button));
        figure.append(button, node('figcaption', '', photo.caption));
        return figure;
    }
    function updateUrl() {
        const url = new URL(location.href);
        url.searchParams.set('product', activeProduct.id);
        if (activeOption) url.searchParams.set('option', activeOption); else url.searchParams.delete('option');
        if (activeSeries) url.searchParams.set('series', activeSeries.name); else url.searchParams.delete('series');
        history.replaceState({}, '', url);
    }
    function updateSelection() {
        const parts = [activeProduct?.name, activeOption, activeSeries ? `${activeSeries.name} series` : ''].filter(Boolean);
        $('[data-enquiry-selection]').textContent = parts.length ? `Your enquiry: ${parts.join(' · ')}` : '';
        if (activeProduct) updateUrl();
    }
    function renderReferences() {
        const refs = $('[data-references]'); refs.replaceChildren();
        const docs = activeProduct.documents;
        const selected = activeSeries?.document;
        const ordered = selected ? [selected, ...docs.filter(d => d.src !== selected.src)] : docs;
        for (const photo of ordered) refs.append(imageFigure(photo, true));
        $('[data-series-title]').textContent = activeSeries ? `${activeSeries.name} Series` : 'Specifications & fabric references';
        $('[data-series-description]').textContent = activeSeries ? 'Browse the original catalogue sheet below. Specifications apply to this series only; ask our team to confirm colours and option combinations.' : 'View the original sample images and catalogue sheets. Open a reference to read it at full size.';
        const area = $('[data-spec-table]'); area.replaceChildren();
        const specs = Object.entries(activeSeries?.specs || {});
        if (specs.length) {
            const table = node('table', 'pd-spec-table'); const caption = node('caption', 'visually-hidden', `${activeSeries.name} specifications`); table.append(caption);
            const tbody = node('tbody');
            for (const [label, value] of specs) { const row = node('tr'); const heading = node('th','',label); heading.scope = 'row'; row.append(heading, node('td','',value)); tbody.append(row); }
            table.append(tbody); area.append(table, node('p','pd-small','Fabric width is not the guaranteed finished blind width. Final dimensions and suitability require confirmation.'));
        }
        $('[data-spec-section]').hidden = !ordered.length && !specs.length;
        $('[data-nav-specifications]').hidden = $('[data-spec-section]').hidden;
    }
    function showMainImage(photo) {
        const image = $('[data-product-image]'); image.src = photo.src; image.alt = photo.alt;
        $('[data-main-image-button]').onclick = () => openImage(photo, $('[data-main-image-button]'));
        $('[data-thumbnails]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.src === photo.src)));
    }
    function chooseOption(option) {
        activeOption = option;
        $('[data-options]').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === option)));
        // A matching filename can switch the project example; it never recolours a photo.
        const keyword = option.toLowerCase().replace(' edge','');
        const match = activeProduct.gallery.find(photo => decodeURIComponent(photo.src).toLowerCase().includes(keyword));
        if (match) showMainImage(match);
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
        if (activeProduct.id === 'roller') {
            activeOption = {'Blackwell Waterproof':'Blackout','Vado Solarscreen':'Sunscreen','Sega Classic':'Translucent'}[series.name] || '';
            $('[data-options]').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent === activeOption)));
        }
        $('[data-series-grid]').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.series === series.name)));
        renderReferences(); updateSelection();
    }
    function showProduct(product, option = '', seriesName = '', updateHistory = true) {
        activeProduct = product;
        activeOption = product.options.includes(option) ? option : '';
        activeSeries = product.series.find(s => s.name === seriesName) || product.series[0] || null;
        $('[data-product-picker]').hidden = true; $('[data-product-content]').hidden = false;
        $('[data-product-name]').textContent = product.name; $('[data-product-category]').textContent = names[product.category];
        $('[data-product-description]').textContent = product.description; $('[data-breadcrumb]').textContent = product.name;
        document.title = `${product.name} | BlindsXpert Malaysia`;
        const canonical = new URL('product-details.html', 'https://ahmadafiq156.github.io/mockup1/'); canonical.searchParams.set('product',product.id); document.querySelector('link[rel=canonical]').href = canonical.href;
        document.querySelector('meta[name=description]').content = product.description;
        if (![...select.options].some(o => o.value === product.id)) select.add(new Option(product.name,product.id));
        select.value = product.id;
        const thumbs = $('[data-thumbnails]'); thumbs.replaceChildren();
        $('[data-product-visual]').hidden = !product.gallery.length; $('#overview').classList.toggle('pd-no-image',!product.gallery.length);
        for (const photo of product.gallery.slice(0,7)) {
            const button = node('button'); button.type = 'button'; button.dataset.src = photo.src; button.setAttribute('aria-label', `Show ${photo.caption}`);
            const img = node('img'); img.src = photo.src; img.alt = ''; img.loading='lazy'; button.append(img); button.onclick=()=>showMainImage(photo); thumbs.append(button);
        }
        if(product.gallery.length) showMainImage(product.gallery[0]); else $('[data-product-image]').removeAttribute('src');
        const options = $('[data-options]'); options.replaceChildren();
        $('[data-option-wrap]').hidden = !product.options.length; $('[data-option-label]').textContent = product.optionLabel || 'Options';
        for (const option of product.options) { const button = node('button','',option); button.type='button';button.setAttribute('aria-pressed',String(option===activeOption));button.onclick=()=>chooseOption(option);options.append(button); }
        const highlights = $('[data-highlights]');highlights.replaceChildren(); highlights.hidden=!product.highlights?.length;
        for(const label of product.highlights || []) highlights.append(node('li','',label));
        const seriesGrid=$('[data-series-grid]');seriesGrid.replaceChildren();
        for(const series of product.series) {const button=node('button','pd-series-button');button.type='button';button.dataset.series=series.name;button.setAttribute('aria-pressed',String(series===activeSeries));button.append(node('strong','',series.name),node('span','',series.specs['Light transmission'] || 'View catalogue details'));button.onclick=()=>chooseSeries(series);seriesGrid.append(button);}
        $('[data-series-section]').hidden=!product.series.length;$('[data-nav-series]').hidden=!product.series.length;
        renderReferences();
        const gallery=$('[data-gallery]');gallery.replaceChildren();for(const photo of product.gallery) gallery.append(imageFigure(photo));
        $('[data-gallery-section]').hidden=!product.gallery.length;$('[data-nav-gallery]').hidden=!product.gallery.length;
        $('[data-motorized-section]').hidden=product.id!=='motorized';
        const related=$('[data-motorized-links]');related.replaceChildren();
        for(const [label,id] of [['Roller Blinds','roller'],['Venetian Blinds','venetian'],['Ziptrak Outdoor Blinds','ziptrak-outdoor']]){const a=node('a','',label+' →');a.href=`product-details.html?product=${id}`;related.append(a);}
        if(activeOption)chooseOption(activeOption);
        if(activeSeries)chooseSeries(activeSeries);
        if(updateHistory)updateSelection();
    }
    function showPicker(message) {
        activeProduct=null;activeOption='';activeSeries=null;
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
    if(initial)showProduct(initial,params.get('option') || alias?.option,params.get('series'));
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
        lines.push(`Name: ${f.get('name').trim()}`,`Phone: ${phone.value.trim()}`);
        if(f.get('address').trim())lines.push(`Address / area: ${f.get('address').trim()}`);
        if(f.get('email').trim())lines.push(`Email: ${f.get('email').trim()}`);
        lines.push(`Site visit: ${f.get('siteVisit')}`);
        if(f.get('message').trim())lines.push(`Message: ${f.get('message').trim()}`);
        note.textContent='WhatsApp is opening with your prepared message. Review it there before sending.';
        window.open(`https://wa.me/60176356542?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
    });
})();
