const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#mainNav');
const productsMenu = document.querySelector('.nav-products');
const productsToggle = document.querySelector('.products-toggle');
function updateHeader() {
    header?.classList.toggle('scrolled', window.scrollY > 18)
}
window.addEventListener('scroll', updateHeader, {
    passive: true
});
updateHeader();
function closeProductsMenu() {
    productsMenu?.classList.remove('dropdown-open');
    productsToggle?.setAttribute('aria-expanded', 'false');
}
toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav?.classList.toggle('open', !open);
    if (open) closeProductsMenu();
});
productsToggle?.addEventListener('click', () => {
    const desktop = window.matchMedia('(min-width: 961px)').matches;
    const open = desktop || productsToggle.getAttribute('aria-expanded') !== 'true';
    productsToggle.setAttribute('aria-expanded', String(open));
    productsMenu?.classList.toggle('dropdown-open', open);
});
productsMenu?.addEventListener('pointerenter', () => {
    if (window.matchMedia('(min-width: 961px)').matches) {
        productsMenu.classList.add('dropdown-open');
        productsToggle?.setAttribute('aria-expanded', 'true')
    }
});
productsMenu?.addEventListener('focusin', () => {
    if (window.matchMedia('(min-width: 961px)').matches) {
        productsMenu.classList.add('dropdown-open');
        productsToggle?.setAttribute('aria-expanded', 'true')
    }
});
productsMenu?.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 961px)').matches) closeProductsMenu();
});
productsMenu?.addEventListener('focusout', event => {
    if (!productsMenu.contains(event.relatedTarget) && window.matchMedia('(min-width: 961px)').matches && !productsMenu.matches(':hover')) closeProductsMenu();
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    closeProductsMenu();
}));
document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (productsMenu?.classList.contains('dropdown-open')) closeProductsMenu();
    if (nav?.classList.contains('open')) {
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.focus();
    }
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
    if (match) setProductFilter(match[1]);
}
syncProductFilterToHash();
window.addEventListener('hashchange', syncProductFilterToHash);
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

// Accessible full-image viewer shared by the testimony and gallery pages.
const imageLightbox = document.querySelector('[data-image-lightbox]');
if (imageLightbox) {
    const lightboxImage = imageLightbox.querySelector('.image-lightbox-image');
    const lightboxStatus = imageLightbox.querySelector('.image-lightbox-status');
    const previousImage = imageLightbox.querySelector('[data-lightbox-previous]');
    const nextImage = imageLightbox.querySelector('[data-lightbox-next]');
    let activeImages = [];
    let activeImageIndex = 0;
    let lightboxReturnFocus = null;
    function closeImageLightbox() {
        if (!imageLightbox.open || imageLightbox.classList.contains('is-closing')) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            imageLightbox.close();
            return
        }
        imageLightbox.classList.add('is-closing');
        window.setTimeout(() => {
            imageLightbox.close();
            imageLightbox.classList.remove('is-closing')
        }, 140);
    }
    function renderLightboxImage() {
        const trigger = activeImages[activeImageIndex];
        const image = trigger?.querySelector('img');
        if (!image) return;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxStatus.textContent = `Image ${activeImageIndex+1} of ${activeImages.length}`;
        previousImage.disabled = activeImages.length < 2;
        nextImage.disabled = activeImages.length < 2;
    }
    document.querySelectorAll('[data-lightbox-gallery]').forEach(gallery => {
        const triggers = [...gallery.querySelectorAll('.lightbox-trigger')];
        triggers.forEach((trigger, index) => trigger.addEventListener('click', () => {
            activeImages = triggers;
            activeImageIndex = index;
            lightboxReturnFocus = trigger;
            renderLightboxImage();
            imageLightbox.classList.remove('is-closing');
            document.body.classList.add('lightbox-open');
            if (!imageLightbox.open) imageLightbox.showModal();
        }));
    });
    previousImage.addEventListener('click', () => {
        activeImageIndex = (activeImageIndex - 1 + activeImages.length) % activeImages.length;
        renderLightboxImage()
    });
    nextImage.addEventListener('click', () => {
        activeImageIndex = (activeImageIndex + 1) % activeImages.length;
        renderLightboxImage()
    });
    imageLightbox.querySelector('[data-lightbox-close]').addEventListener('click', closeImageLightbox);
    imageLightbox.addEventListener('click', event => {
        if (event.target === imageLightbox) closeImageLightbox()
    });
    imageLightbox.addEventListener('cancel', event => {
        event.preventDefault();
        closeImageLightbox()
    });
    imageLightbox.addEventListener('keydown', event => {
        if (!imageLightbox.open || activeImages.length < 2) return;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousImage.click()
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextImage.click()
        }
    });
    imageLightbox.addEventListener('close', () => {
        document.body.classList.remove('lightbox-open');
        lightboxReturnFocus?.focus()
    });
}

// Count the approved company totals once when they enter the viewport.
const statsSection = document.querySelector('[data-stats]');
const statCounters = [...document.querySelectorAll('[data-counter]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function showFinalCounterValues() {
    const numberFormat = new Intl.NumberFormat('en-US');

    statCounters.forEach((counter) => {
        const finalValue = Number(counter.dataset.counter);
        counter.textContent = numberFormat.format(finalValue);
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

        counter.textContent = numberFormat.format(currentValue);

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
    const revealTargets = document.querySelectorAll('main > section:not(.page-hero):not(.product-listing-section), .about-grid, .benefit-grid > div, .contact-grid > div');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target)
        }
    }), {
        threshold: 0.12, rootMargin: '0px 0px -32px 0px'
    });
    revealTargets.forEach(target => {
        target.classList.add('scroll-reveal');
        revealObserver.observe(target)
    });
}
