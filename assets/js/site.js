const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#mainNav');
const dropdowns = [...document.querySelectorAll('[data-nav-dropdown]')].map(menu => ({
    menu, button: menu.querySelector('.products-toggle'), panel: menu.querySelector('.product-dropdown')
}));
const desktopNavigation = window.matchMedia('(min-width: 1201px)');
header?.classList.add('nav-enhanced');
function positionDropdowns() {
    dropdowns.forEach(({menu, panel}) => {
        if (!desktopNavigation.matches) { panel.style.removeProperty('left'); return; }
        const anchor = menu.getBoundingClientRect();
        const width = panel.getBoundingClientRect().width;
        const left = Math.max(16, Math.min(anchor.left, document.documentElement.clientWidth - width - 16));
        panel.style.left = `${left - anchor.left}px`;
    });
}
function closeDropdown(item) {
    item.menu.classList.remove('dropdown-open');
    item.button.setAttribute('aria-expanded', 'false');
}
function closeDropdowns() { dropdowns.forEach(closeDropdown); }
function openDropdown(item) {
    dropdowns.filter(other => other !== item).forEach(closeDropdown);
    positionDropdowns();
    item.menu.classList.add('dropdown-open');
    item.button.setAttribute('aria-expanded', 'true');
}
function closeNavigation() {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    closeDropdowns();
}
function updateHeader() { header?.classList.toggle('scrolled', window.scrollY > 18); }
window.addEventListener('scroll', updateHeader, {passive: true});
updateHeader();
toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) closeNavigation();
    else {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation');
        nav?.classList.add('open');
    }
});
dropdowns.forEach(item => {
    const {menu, button, panel} = item;
    button.addEventListener('click', () => {
        if (button.getAttribute('aria-expanded') === 'true') closeDropdown(item);
        else openDropdown(item);
    });
    button.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            openDropdown(item);
            // Wait for the visible panel to render before moving keyboard focus.
            requestAnimationFrame(() => requestAnimationFrame(() => {
                if (menu.classList.contains('dropdown-open')) panel.querySelector('a')?.focus();
            }));
        }
    });
    menu.addEventListener('pointerenter', event => {
        if (desktopNavigation.matches && event.pointerType !== 'touch') openDropdown(item);
    });
    menu.addEventListener('focusin', event => {
        if (desktopNavigation.matches && event.target !== button && !menu.contains(event.relatedTarget)) openDropdown(item);
    });
    menu.addEventListener('mouseleave', () => {
        if (desktopNavigation.matches && !menu.contains(document.activeElement)) closeDropdown(item);
    });
    menu.addEventListener('focusout', event => {
        if (!menu.contains(event.relatedTarget) && desktopNavigation.matches && !menu.matches(':hover')) closeDropdown(item);
    });
});
window.addEventListener('resize', positionDropdowns, {passive: true});
desktopNavigation.addEventListener('change', () => { closeNavigation(); positionDropdowns(); });
positionDropdowns();
document.fonts?.ready.then(positionDropdowns);
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNavigation));
document.addEventListener('pointerdown', event => {
    if (desktopNavigation.matches && !nav?.contains(event.target)) closeDropdowns();
});
document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = dropdowns.find(item => item.menu.classList.contains('dropdown-open'));
    if (open) {
        const restore = open.menu.contains(document.activeElement);
        closeDropdown(open);
        if (restore) open.button.focus();
    } else if (nav?.classList.contains('open')) {
        closeNavigation();
        toggle?.focus();
    }
});
function updateDealerNavigation() {
    if (!location.pathname.endsWith('/products.html')) return;
    const dealer = location.hash === '#dealer-enquiries';
    const productLink = nav?.querySelector('a[href="products.html"]');
    const aboutLink = nav?.querySelector('a[href="about.html"]');
    const dealerLink = nav?.querySelector('a[href="products.html#dealer-enquiries"]');
    if (dealer) {
        productLink?.removeAttribute('aria-current');
        dealerLink?.setAttribute('aria-current', 'location');
    } else {
        productLink?.setAttribute('aria-current', 'page');
        dealerLink?.removeAttribute('aria-current');
    }
    aboutLink?.classList.toggle('is-current-section', dealer);
}
window.addEventListener('hashchange', updateDealerNavigation);
updateDealerNavigation();
// One FAQ answer across every category. The shared native name also works without JavaScript.
const faqItems = [...document.querySelectorAll('details.faq-item')];
function closeOtherFaqs(selected) {
    faqItems.forEach(item => { if (item !== selected) item.open = false; });
}
faqItems.forEach(item => {
    // Close before the native click opens an answer, including Enter/Space activation.
    item.querySelector('summary')?.addEventListener('click', () => {
        if (!item.open) closeOtherFaqs(item);
    });
    item.addEventListener('toggle', () => {
        if (item.open) closeOtherFaqs(item);
    });
});
const filterButtons = [...document.querySelectorAll('[data-filter]')];
function setProductFilter(value) {
    filterButtons.forEach(button => {
        const active = button.dataset.filter === value;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('#catalogue [data-category]').forEach(card => {
        card.classList.toggle('hidden', value !== 'all' && card.dataset.category !== value);
    });
    const visibleCount = document.querySelectorAll('#catalogue article[data-category]:not(.hidden)').length;
    const status = document.querySelector('[data-catalogue-status]');
    if (status) status.textContent = `${visibleCount} products shown`;
    document.querySelectorAll('#catalogue [data-category-heading]').forEach((heading) => {
        const category = heading.dataset.categoryHeading;
        const hasVisibleProducts = [...document.querySelectorAll(`#catalogue > article[data-category="${category}"]`)]
            .some(card => !card.classList.contains('hidden'));

        heading.hidden = !hasVisibleProducts;
    });
}
filterButtons.forEach(button => button.addEventListener('click', () => setProductFilter(button.dataset.filter)));
function syncProductFilterToHash() {
    const match = window.location.hash.match(/^#category-(indoor|outdoor|motorized|other)$/);
    if (match) {
        setProductFilter(match[1]);
    } else {
        // Keep saved catalogue links working after grouping product variants.
        const aliases = {
            'uv-printing-wooden-outdoor': 'wooden-uv-logo-printing',
            'ziptrak-pvc-outdoor': 'ziptrak-outdoor',
            'ziptrack-motorized-outdoor': 'ziptrak-outdoor',
            'curtain-rail': 'curtain-hardware',
            'curtain-rod': 'curtain-hardware'
        };
        const id = aliases[window.location.hash.slice(1)] || window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (target?.matches('#catalogue > article')) {
            setProductFilter('all');
            requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
        }
    }
}
syncProductFilterToHash();
window.addEventListener('hashchange', syncProductFilterToHash);

const homeProductCatalogue = document.querySelector('.home-product-catalogue');
const homeProductCards = [...(homeProductCatalogue?.querySelectorAll('.product-card') ?? [])];
const touchProductInput = window.matchMedia('(hover: none), (pointer: coarse)');

if (homeProductCatalogue && touchProductInput.matches) {
    homeProductCatalogue.addEventListener('click', (event) => {
        const imageLink = event.target.closest('.home-product-image-link');

        if (!imageLink) return;

        const card = imageLink.closest('.product-card');

        if (!card || card.classList.contains('is-active')) return;

        event.preventDefault();
        homeProductCards.forEach((productCard) => productCard.classList.remove('is-active'));
        card.classList.add('is-active');
    });

    document.addEventListener('click', (event) => {
        if (homeProductCatalogue.contains(event.target)) return;

        homeProductCards.forEach((card) => card.classList.remove('is-active'));
    });
}

const projectFilterButtons = [...document.querySelectorAll('[data-project-filter]')];
const projectGrid = document.querySelector('#projectGrid');
projectFilterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.projectFilter;
    projectFilterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active))
    });
    projectGrid?.querySelectorAll('.project-card').forEach(card => card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected));
}));
const form = document.querySelector('#quoteForm');
form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent('BlindsXpert quotation enquiry');
    const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')||'Not provided'}\nInterested in: ${data.get('interest')}\n\nProject details:\n${data.get('message')||'Not provided'}`);
    document.querySelector('#formNote').textContent = 'Opening an email draft addressed to BlindsXpert.';
    window.location.href = `mailto:sales.blindsXpert@gmail.com?subject=${subject}&body=${body}`;
});
const hero = document.querySelector('[data-hero-slideshow]');
if (hero) {
    const slides = [...hero.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.hero-dot')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = 0;
    let timer = null;
    function showSlide(index) {
        slides[activeIndex]?.classList.remove('is-active');
        slides[activeIndex]?.setAttribute('aria-hidden', 'true');
        dots[activeIndex]?.classList.remove('is-active');
        dots[activeIndex]?.setAttribute('aria-pressed', 'false');
        activeIndex = (index + slides.length) % slides.length;
        slides[activeIndex]?.classList.add('is-active');
        slides[activeIndex]?.setAttribute('aria-hidden', 'false');
        dots[activeIndex]?.classList.add('is-active');
        dots[activeIndex]?.setAttribute('aria-pressed', 'true');
    }
    function stopSlideshow() {
        if (timer) {
            window.clearInterval(timer);
            timer = null
        }
    }
    function startSlideshow(allowFocusedControls = false, allowHoveredHero = false) {
        stopSlideshow();
        const focused = heroSection?.contains(document.activeElement) && !allowFocusedControls;
        const hovered = heroSection?.matches(':hover') && !allowHoveredHero;

        if (slides.length < 2 || reducedMotion.matches || document.hidden || hovered || focused) return;
        timer = window.setInterval(() => showSlide(activeIndex + 1), 2800);
    }
    const heroSection = hero.closest('.home-hero');
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
        showSlide(index);
        startSlideshow(true)
    }));
    heroSection?.querySelector('.hero-arrow-prev')?.addEventListener('click', () => {
        showSlide(activeIndex - 1);
        startSlideshow(true)
    });
    heroSection?.querySelector('.hero-arrow-next')?.addEventListener('click', () => {
        showSlide(activeIndex + 1);
        startSlideshow(true)
    });
    heroSection?.addEventListener('keydown', (event) => {
        if (!heroSection.contains(document.activeElement)) return;

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
            startSlideshow(true);
        }
    });
    heroSection?.addEventListener('mouseenter', stopSlideshow);
    heroSection?.addEventListener('mouseleave', () => startSlideshow(true));
    heroSection?.addEventListener('focusin', stopSlideshow);
    heroSection?.addEventListener('focusout', event => {
        if (!heroSection.contains(event.relatedTarget)) startSlideshow()
    });
    document.addEventListener('visibilitychange', startSlideshow);
    reducedMotion.addEventListener?.('change', startSlideshow);

    let touchStartX = null;
    let touchStartY = 0;
    let swipeIntent = false;

    heroSection?.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1 || event.target.closest('a, button')) return;

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        swipeIntent = false;
    }, { passive: true });

    heroSection?.addEventListener('touchmove', (event) => {
        if (touchStartX === null || event.touches.length !== 1) return;

        const deltaX = event.touches[0].clientX - touchStartX;
        const deltaY = event.touches[0].clientY - touchStartY;
        swipeIntent = Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

        if (swipeIntent) event.preventDefault();
    }, { passive: false });

    heroSection?.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (swipeIntent && Math.abs(deltaX) >= 48) {
            showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
            startSlideshow(true, true);
        }

        touchStartX = null;
        touchStartY = 0;
        swipeIntent = false;
    }, { passive: true });

    heroSection?.addEventListener('touchcancel', () => {
        touchStartX = null;
        touchStartY = 0;
        swipeIntent = false;
    }, { passive: true });

    startSlideshow();
}
const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');
if (testimonialCarousel) {
    const cards = [...testimonialCarousel.querySelectorAll('.testimonial-card')];
    const dots = [...testimonialCarousel.querySelectorAll('.testimonial-dot')];
    const previous = testimonialCarousel.querySelector('[data-testimonial-prev]');
    const next = testimonialCarousel.querySelector('[data-testimonial-next]');
    let active = 0;
    function renderTestimonials() {
        const visibleCount = window.matchMedia('(max-width: 760px)').matches ? 1: 3;
        cards.forEach((card, index) => {
            card.hidden = !Array.from({
                length: visibleCount
            }, (_, offset) => (active + offset) % cards.length).includes(index)
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === active);
            dot.setAttribute('aria-pressed', String(index === active))
        });
    }
    function moveTestimonials(step) {
        active = (active + step + cards.length) % cards.length;
        renderTestimonials()
    }
    previous?.addEventListener('click', () => moveTestimonials( - 1));
    next?.addEventListener('click', () => moveTestimonials(1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
        active = index;
        renderTestimonials()
    }));
    window.addEventListener('resize', renderTestimonials, {
        passive: true
    });
    renderTestimonials();
}

// Gallery and testimonial photos use the same viewer as Product Details.
const imageLightbox = document.querySelector('[data-image-lightbox]');
if (imageLightbox) {
    const viewer = window.createBlindsXpertImageViewer({
        dialog: imageLightbox,
        image: imageLightbox.querySelector('.image-lightbox-image'),
        caption: imageLightbox.querySelector('.image-lightbox-caption'),
        status: imageLightbox.querySelector('.image-lightbox-status'),
        previous: imageLightbox.querySelector('[data-lightbox-previous]'),
        next: imageLightbox.querySelector('[data-lightbox-next]'),
        closeButton: imageLightbox.querySelector('[data-lightbox-close]'),
        closeDelay: 140,
        resolve: (trigger, index, count) => {
            const image = trigger.querySelector('img');
            return { src: image.currentSrc || image.src, alt: image.alt, caption: image.alt };
        }
    });
    document.querySelectorAll('[data-lightbox-gallery]').forEach(gallery => {
        const triggers = [...gallery.querySelectorAll('.lightbox-trigger')];
        triggers.forEach((trigger, index) => trigger.addEventListener('click', () => viewer?.open(triggers, index, trigger)));
    });
}

// Count the approved company totals once when they enter the viewport.
const statsSection = document.querySelector('[data-stats]');
const statCounters = [...document.querySelectorAll('[data-counter]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function formatCounter(value, finalValue) {
    return (finalValue >= 1000 ? Math.floor(value / 1000) + 'K' : String(value)) + '+';
}

function showFinalCounterValues() {
    const numberFormat = new Intl.NumberFormat('en-US');

    statCounters.forEach((counter) => {
        const finalValue = Number(counter.dataset.counter);
        counter.textContent = formatCounter(finalValue, finalValue);
        counter.setAttribute('aria-label', numberFormat.format(finalValue));
    });
}

function animateCounter(counter, duration = 1200) {
    const finalValue = Number(counter.dataset.counter);
    const numberFormat = new Intl.NumberFormat('en-US');
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(finalValue * easedProgress);

        counter.textContent = formatCounter(currentValue, finalValue);

        if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
        } else {
            counter.setAttribute('aria-label', numberFormat.format(finalValue));
        }
    }

    window.requestAnimationFrame(updateCounter);
}

if (statsSection && statCounters.length) {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
        showFinalCounterValues();
    } else {
        statCounters.forEach((counter) => {
            counter.textContent = '0';
        });

        const statsObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                statCounters.forEach((counter) => animateCounter(counter));
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        statsObserver.observe(statsSection);
    }
}

// Subtle scroll reveals are progressive enhancement and never cover click targets.

if ('IntersectionObserver' in window && !reduceMotion.matches) {
    // Long galleries must stay visible even when only a small part fits on screen.
    const revealTargets = [...document.querySelectorAll('main > section:not(.page-hero):not(.product-listing-section), .about-grid, .benefit-grid > div, .contact-grid > div')]
        .filter(target => !target.querySelector('.gallery-grid') && !target.closest('.pd-main'));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target)
        }
    }), {
        threshold: 0, rootMargin: '0px 0px -32px 0px'
    });
    revealTargets.forEach(target => {
        target.classList.add('scroll-reveal');
        revealObserver.observe(target)
    });
}


// Shared WhatsApp contact disclosure. Official sales number already used by the site.
(() => {
    const whatsappContact = {
        number: '60176356542',
        message: 'Hello BlindsXpert, I would like help choosing blinds and arranging a measurement or quotation.'
    };
    const widget = document.createElement('aside');
    widget.className = 'whatsapp-widget';
    widget.setAttribute('aria-label', 'WhatsApp contact');
    widget.innerHTML = `<div class="whatsapp-popup" id="whatsappContactPopup" role="region" aria-labelledby="whatsappContactTitle" hidden>
        <button class="whatsapp-close" type="button" aria-label="Close WhatsApp contact">×</button>
        <h2 id="whatsappContactTitle">Chat With BlindsXpert</h2>
        <p>Need help choosing the right blinds? Chat with our team for product enquiries, measurements, and quotations.</p>
        <a class="btn btn-red whatsapp-chat" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
    </div>
    <button class="whatsapp-toggle" type="button" aria-label="Open WhatsApp contact" aria-controls="whatsappContactPopup" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.1-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.6.9 1-3.5-.3-.4A10 10 0 1 1 12 22Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.3 8.3 0 0 1-4.1-3.6c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.7.7-1.1 1.5-1.1 2.5 0 1.5 1.1 2.9 1.2 3.1.2.2 2.2 3.4 5.4 4.7 2 .9 2.8.9 3.8.8.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z"/></svg>
    </button>`;
    const button = widget.querySelector('.whatsapp-toggle');
    const popup = widget.querySelector('.whatsapp-popup');
    const close = widget.querySelector('.whatsapp-close');
    const chat = widget.querySelector('.whatsapp-chat');
    chat.href = `https://wa.me/${whatsappContact.number}?text=${encodeURIComponent(whatsappContact.message)}`;
    document.body.append(widget);
    let restoreWidgetFocus = false;
    function setOpen(open, restoreFocus = false) {
        popup.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close WhatsApp contact' : 'Open WhatsApp contact');
        if (open) { restoreWidgetFocus = false; widget.style.setProperty('--whatsapp-offset', '16px'); close.focus({preventScroll: true}); }
        else { restoreWidgetFocus ||= restoreFocus; schedulePosition(); }
    }
    button.addEventListener('click', () => setOpen(popup.hidden));
    close.addEventListener('click', () => setOpen(false, true));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !popup.hidden) {
            event.preventDefault();
            setOpen(false, true);
        }
    });
    document.addEventListener('pointerdown', event => {
        if (!popup.hidden && !widget.contains(event.target)) setOpen(false);
    });
    widget.addEventListener('focusout', event => {
        if (!widget.contains(event.relatedTarget)) setOpen(false);
    });
    // Move the idle button above visible forms/CTAs rather than covering them.
    let queued = false;
    function schedulePosition() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            if (!popup.hidden || widget.hidden) return;
            button.hidden = false;
            const targets = [...document.querySelectorAll('.btn,button,input,select,textarea,[data-filter],a.home-product-action')]
                .filter(el => !widget.contains(el) && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')
                .map(el => el.getBoundingClientRect());
            let found = false;
            const limit = Math.max(16, innerHeight - (header?.getBoundingClientRect().height || 72) - 84);
            for (let offset = 16; offset <= limit; offset += 8) {
                widget.style.setProperty('--whatsapp-offset', `${offset}px`);
                const r = button.getBoundingClientRect();
                if (!targets.some(t => r.left < t.right && r.right > t.left && r.top < t.bottom && r.bottom > t.top)) { found = true; break; }
            }
            // Dense mobile forms can leave no safe position; restore on the next scroll.
            const needsFocus = restoreWidgetFocus || (!found && document.activeElement === button);
            button.hidden = !found;
            if (needsFocus) {
                // Keep keyboard focus on a visible control when collision avoidance hides the opener.
                const fallback = toggle?.getClientRects().length ? toggle : header?.querySelector('.logo');
                (found ? button : fallback)?.focus({preventScroll: true});
                restoreWidgetFocus = false;
            }
        });
    }
    window.addEventListener('scroll', schedulePosition, {passive:true});
    window.addEventListener('resize', schedulePosition, {passive:true});
    new MutationObserver(() => {
        const suspended = nav?.classList.contains('open') || !!document.querySelector('dialog[open]');
        widget.hidden = suspended;
        if (suspended) setOpen(false);
        else schedulePosition();
    }).observe(document.body, {subtree:true, attributes:true, attributeFilter:['open','class']});
    schedulePosition();
})();
