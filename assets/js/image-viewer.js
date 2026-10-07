/* Shared native-dialog image viewer. Page code supplies items and their image data. */
window.createBlindsXpertImageViewer = function ({
    dialog,
    image,
    caption,
    status,
    previous,
    next,
    closeButton,
    resolve,
    closeDelay = 0,
    clearOnClose = true
}) {
    if (!dialog || !image || !previous || !next || !closeButton) return null;

    let items = [];
    let index = 0;
    let returnFocus = null;
    let touchStartX = null;
    let closeTimer = null;

    function render() {
        const item = items[index];
        if (!item) return;
        const details = resolve(item, index, items.length);
        image.src = details.src;
        image.alt = details.alt || '';
        if (details.width) image.width = details.width;
        if (details.height) image.height = details.height;
        if (caption) caption.textContent = details.caption || details.alt || '';
        if (status) status.textContent = `Image ${index + 1} of ${items.length}`;
        previous.hidden = details.hideNavigation === true;
        next.hidden = details.hideNavigation === true;
        previous.disabled = items.length < 2;
        next.disabled = items.length < 2;
    }

    function move(direction) {
        if (items.length < 2) return;
        index = (index + direction + items.length) % items.length;
        render();
    }

    function close() {
        if (!dialog.open || dialog.classList.contains('is-closing')) return;
        if (!closeDelay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            dialog.close();
            return;
        }
        dialog.classList.add('is-closing');
        closeTimer = window.setTimeout(() => {
            if (dialog.open) dialog.close();
            dialog.classList.remove('is-closing');
            closeTimer = null;
        }, closeDelay);
    }

    function open(nextItems, nextIndex, trigger) {
        items = nextItems;
        index = Math.max(0, Math.min(nextIndex, items.length - 1));
        returnFocus = trigger || null;
        dialog.classList.remove('is-closing');
        if (closeTimer) window.clearTimeout(closeTimer);
        closeTimer = null;
        render();
        if (!dialog.open) dialog.showModal();
    }

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    closeButton.addEventListener('click', close);
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
    });
    dialog.addEventListener('cancel', event => {
        if (closeDelay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            event.preventDefault();
            close();
        }
    });
    dialog.addEventListener('keydown', event => {
        if (!dialog.open || items.length < 2) return;
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    });
    dialog.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });
    dialog.addEventListener('touchend', event => {
        if (touchStartX === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
        touchStartX = null;
    }, { passive: true });
    dialog.addEventListener('close', () => {
        if (clearOnClose) image.removeAttribute('src');
        returnFocus?.focus();
        returnFocus = null;
    });

    return { open, close };
};
