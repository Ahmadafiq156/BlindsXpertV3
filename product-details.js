const productDetailsPage = document.querySelector('.product-detail-section');

if (productDetailsPage) {
    const productSelect = document.querySelector('#enquiryProduct');
    const productName = document.querySelector('[data-product-name]');
    const productDescription = document.querySelector('[data-product-description]');
    const productImage = document.querySelector('[data-product-image]');
    const productVisual = document.querySelector('[data-product-visual]');
    const productInformation = document.querySelector('[data-product-information]');
    const form = document.querySelector('#productEnquiryForm');
    const formNote = document.querySelector('#productFormNote');

    function showProduct(product) {
        productName.textContent = product.name;
        productDescription.textContent = product.description;
        productDescription.hidden = !product.description;
        productInformation.replaceChildren();
        productInformation.hidden = true;

        if (product.informationTemplate) {
            const information = product.informationTemplate.content.cloneNode(true);
            information.querySelector('[data-product-description]')?.remove();

            if (information.childElementCount > 0) {
                productInformation.replaceChildren(information);
                productInformation.hidden = false;
            }
        }
        document.title = `${product.name} | BlindsXpert Malaysia`;
        productVisual.hidden = !product.image;

        if (product.image) {
            productImage.src = product.image;
            productImage.alt = product.imageAlt || `${product.name} product image`;
        } else {
            productImage.removeAttribute('src');
            productImage.alt = '';
        }
    }

    async function loadProducts() {
        const response = await fetch('products.html');
        if (!response.ok) throw new Error('The product catalogue could not be loaded.');

        const pageText = await response.text();
        const catalogue = new DOMParser().parseFromString(pageText, 'text/html');
        const informationTemplates = new Map();

        catalogue.querySelectorAll('template[data-product-information-for]').forEach((template) => {
            template.dataset.productInformationFor.split(/\s+/).forEach((productId) => {
                informationTemplates.set(productId, template);
            });
        });

        const products = [...catalogue.querySelectorAll('#catalogue > article[id]')].map((card) => {
            const image = card.querySelector('img.catalogue-image');
            const informationTemplate = informationTemplates.get(card.id);

            return {
                id: card.id,
                name: card.querySelector('h2, h3')?.textContent.trim() || card.id,
                category: card.querySelector('.eyebrow')?.textContent.trim() || '',
                description: informationTemplate?.content.querySelector('[data-product-description]')?.textContent.trim()
                    || card.querySelector('.product-detail')?.textContent.trim()
                    || '',
                image: image?.getAttribute('src') || '',
                imageAlt: image?.alt || '',
                informationTemplate
            };
        });

        productSelect.replaceChildren(new Option('Please select a product', ''));

        products.forEach((product) => {
            productSelect.add(new Option(product.name, product.id));
        });

        const requestedProduct = new URLSearchParams(window.location.search).get('product');
        const initialProduct = products.find((product) => product.id === requestedProduct);

        if (initialProduct) {
            productSelect.value = initialProduct.id;
            showProduct(initialProduct);
        } else {
            productName.textContent = 'Select a product';
            productDescription.textContent = 'Choose a product below to see its available description and image.';
            productVisual.hidden = true;
        }

        productSelect.addEventListener('change', () => {
            const selectedProduct = products.find((product) => product.id === productSelect.value);
            if (!selectedProduct) return;

            showProduct(selectedProduct);
            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.set('product', selectedProduct.id);
            window.history.replaceState({}, '', nextUrl);
        });
    }

    productSelect.addEventListener('change', () => {
        formNote.textContent = 'Review the selected product and enquiry information before opening WhatsApp.';
    });

    const phoneInput = form.querySelector('[name="phone"]');
    const requiredFields = [...form.querySelectorAll('[required]')];
    requiredFields.forEach((field) => field.addEventListener('input', () => field.setCustomValidity('')));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        requiredFields.forEach((field) => field.setCustomValidity(''));

        requiredFields.forEach((field) => {
            if (field.value.trim() === '') {
                field.setCustomValidity('Please complete this field.');
            }
        });

        const digits = phoneInput.value.replace(/\D/g, '');
        if (!/^[+\d\s().-]+$/.test(phoneInput.value) || digits.length < 7 || digits.length > 16) {
            phoneInput.setCustomValidity('Enter a phone number containing 7 to 16 digits.');
        }

        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const message = [
            'BlindsXpert product enquiry',
            '',
            `Product: ${formData.get('product') && productSelect.selectedOptions[0].textContent}`,
            `Name: ${formData.get('name').trim()}`,
            `Address: ${formData.get('address').trim()}`,
            `Phone Number: ${formData.get('phone').trim()}`,
            `Email: ${formData.get('email').trim()}`,
            `Site Visit: ${formData.get('siteVisit')}`,
            `Message: ${formData.get('message').trim()}`
        ].join('\n');
        const whatsappUrl = `https://wa.me/60176356542?text=${encodeURIComponent(message)}`;

        formNote.textContent = 'WhatsApp is opening with your prepared message. Review it there, then choose whether to send it.';
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });

    loadProducts().catch(() => {
        productSelect.replaceChildren(new Option('Products unavailable', ''));
        productName.textContent = 'Products are temporarily unavailable';
        productDescription.textContent = 'Please return to the product catalogue or contact BlindsXpert directly.';
        formNote.textContent = 'The product catalogue could not be loaded. Please try again later.';
    });
}
