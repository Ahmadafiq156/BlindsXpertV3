// Requests one shared counter increment for this page view, then animates only when visible.
const visitorCounter = document.querySelector('.visitor-counter');
const visitorCounterValue = visitorCounter?.querySelector('.visitor-counter-value');
const visitorCounterNote = visitorCounter?.querySelector('.visitor-counter-note');
const visitorCounterUrl = window.BLINDSXPERT_COUNTER_URL?.trim();

if (visitorCounter && visitorCounterValue && visitorCounterNote) {
    if (!visitorCounterUrl) {
        visitorCounterNote.textContent = 'Shared counter service is not configured yet.';
    } else {
        let targetCount = null;
        let hasAnimated = false;

        function showVisitorCount() {
            if (targetCount === null || hasAnimated) return;
            hasAnimated = true;

            const numberFormat = new Intl.NumberFormat();
            const finalValue = Number(targetCount);
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (reducedMotion) {
                visitorCounterValue.textContent = numberFormat.format(finalValue);
                return;
            }

            const duration = 900;
            const startedAt = performance.now();

            function updateCount(now) {
                const progress = Math.min((now - startedAt) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                visitorCounterValue.textContent = numberFormat.format(Math.round(finalValue * easedProgress));

                if (progress < 1) {
                    window.requestAnimationFrame(updateCount);
                }
            }

            window.requestAnimationFrame(updateCount);
        }

        fetch(visitorCounterUrl, { method: 'GET', cache: 'no-store' })
            .then((response) => {
                if (!response.ok) throw new Error('Counter request failed');
                return response.json();
            })
            .then((data) => {
                const count = Number(data.count);
                if (!Number.isSafeInteger(count) || count < 0) throw new Error('Counter response is invalid');

                targetCount = count;
                visitorCounterNote.textContent = 'Shared website visits';

                if (!('IntersectionObserver' in window)) {
                    showVisitorCount();
                    return;
                }

                const counterObserver = new IntersectionObserver((entries, observer) => {
                    if (entries.some((entry) => entry.isIntersecting)) {
                        showVisitorCount();
                        observer.disconnect();
                    }
                }, { threshold: 0.25 });

                counterObserver.observe(visitorCounter);
            })
            .catch(() => {
                visitorCounterNote.textContent = 'Visitor count is currently unavailable.';
            });
    }
}