/* Static Careers presentation. A future authenticated service can supply the same data contract. */
(() => {
    const listing = document.querySelector('[data-careers-list]');
    const empty = document.querySelector('[data-careers-empty]');
    const loading = document.querySelector('[data-careers-loading]');
    const application = document.querySelector('[data-careers-application]');
    if (!listing || !empty || !application) return;

    const text = value => typeof value === 'string' ? value.trim() : '';
    const node = (tag, className, value) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (value !== undefined) element.textContent = value;
        return element;
    };
    function applicationLink(method, contact, title = '') {
        contact = text(contact);
        if (method === 'email' && /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(contact)) {
            return `mailto:${contact}${title ? `?subject=${encodeURIComponent(`Application enquiry: ${title}`)}` : ''}`;
        }
        if (method === 'url') {
            try {
                const url = new URL(contact);
                if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
            } catch { /* Missing/invalid application channels never produce an Apply button. */ }
        }
        return '';
    }
    function link(href, label, className = 'btn btn-red') {
        const anchor = node('a', className, label);
        anchor.href = href;
        if (href.startsWith('https:')) {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
        }
        return anchor;
    }
    function metadata(job) {
        const list = node('dl', 'career-metadata');
        for (const [key, label] of [['department', 'Department'], ['location', 'Location'], ['employmentType', 'Employment type']]) {
            if (!text(job[key])) continue;
            const row = node('div');
            row.append(node('dt', '', label), node('dd', '', text(job[key])));
            list.append(row);
        }
        return list;
    }
    function listSection(parent, title, values) {
        const entries = Array.isArray(values) ? values.map(text).filter(Boolean) : [];
        if (!entries.length) return;
        const list = node('ul');
        for (const value of entries) list.append(node('li', '', value));
        parent.append(node('h4', '', title), list);
    }
    function details(job, recruitment, href) {
        const panel = node('details', 'career-details');
        const summary = node('summary', 'btn career-details-toggle', 'View Details');
        summary.setAttribute('aria-label', `View details for ${text(job.title)}`);
        summary.append(node('span', 'career-details-icon'));
        summary.lastChild.setAttribute('aria-hidden', 'true');
        const content = node('div', 'career-details-content');
        content.append(node('h4', '', text(job.title)));
        const meta = metadata(job);
        if (meta.childElementCount) content.append(meta);
        if (text(job.description)) content.append(node('h4', '', 'Description'), node('p', '', text(job.description)));
        listSection(content, 'Responsibilities', job.responsibilities);
        listSection(content, 'Requirements', job.requirements);
        listSection(content, 'Benefits', job.benefits);
        const closingDate = text(job.closingDate);
        // Validate calendar dates rather than silently normalizing impossible dates.
        if (/^\d{4}-\d{2}-\d{2}$/.test(closingDate)) {
            const date = new Date(`${closingDate}T00:00:00Z`);
            if (!Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === closingDate) {
                const paragraph = node('p', '', 'Closing date: ');
                const time = node('time', '', date.toLocaleDateString('en-MY', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'}));
                time.dateTime = closingDate;
                paragraph.append(time);
                content.append(paragraph);
            }
        }
        const instructions = text(job.applicationInstructions) || text(recruitment.instructions);
        if (instructions) content.append(node('h4', '', 'Application instructions'), node('p', '', instructions));
        if (href) content.append(link(href, 'Application contact', 'text-link'));
        panel.append(summary, content);
        return panel;
    }
    function card(job, recruitment) {
        const article = node('article', 'career-card');
        const heading = node('h3', '', text(job.title));
        heading.id = `job-${text(job.id)}`;
        article.setAttribute('aria-labelledby', heading.id);
        const main = node('div', 'career-card-main');
        main.append(node('p', 'career-status', 'Listed opportunity'), heading);
        const meta = metadata(job);
        if (meta.childElementCount) main.append(meta);
        if (text(job.description)) main.append(node('p', 'career-description', text(job.description)));
        const method = text(job.applicationMethod) || text(recruitment.method);
        const contact = text(job.applicationContact) || text(recruitment.contact);
        const href = applicationLink(method, contact, text(job.title));
        const actions = node('div', 'career-card-actions');
        actions.append(details(job, recruitment, href));
        if (href) actions.append(link(href, 'Apply Now'));
        article.append(main, actions);
        return article;
    }

    // Public presentation entry point; it does not fetch, authenticate, store or mutate records.
    window.renderBlindsXpertCareers = function (data) {
        listing.replaceChildren();
        application.replaceChildren();
        if (loading) loading.hidden = true;
        const ready = data && Array.isArray(data.jobs);
        const recruitment = data?.recruitment || {};
        const seen = new Set();
        const jobs = ready ? data.jobs.filter(job => {
            if (!job) return false;
            const id = text(job.id);
            if (job.status !== 'published' || !text(job.title) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || seen.has(id)) return false;
            seen.add(id);
            return true;
        }).slice().sort((a, b) => (Number.isFinite(a.sortOrder) ? a.sortOrder : 0) - (Number.isFinite(b.sortOrder) ? b.sortOrder : 0)) : [];
        for (const job of jobs) listing.append(card(job, recruitment));
        listing.hidden = jobs.length === 0;
        empty.hidden = !ready || jobs.length > 0;
        if (!ready) listing.append(node('p', '', 'Career opportunities could not be loaded. Please contact our team for assistance.'));
        if (!ready) listing.hidden = false;
        if (text(recruitment.instructions)) application.append(node('p', '', text(recruitment.instructions)));
        const href = applicationLink(text(recruitment.method), recruitment.contact);
        if (href) {
            application.append(link(href, text(recruitment.contact)));
            application.append(node('p', 'career-application-note', recruitment.method === 'email'
                ? 'This link opens your email app. Your application is sent only when you send the email.'
                : 'This link opens the application website in a new tab.'));
        } else {
            application.append(node('p', '', 'Please contact our team for information about applying.'), link('contact.html', 'Contact Us'));
        }
        return jobs.length;
    };
    window.renderBlindsXpertCareers(window.BLINDSXPERT_CAREERS);
})();
