const allowedOrigins = new Set([
    'https://ahmadafiq156.github.io',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
]);

function corsHeaders(request) {
    const origin = request.headers.get('Origin') || '';
    const headers = new Headers({
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store'
    });

    if (allowedOrigins.has(origin)) {
        headers.set('Access-Control-Allow-Origin', origin);
        headers.set('Vary', 'Origin');
    }

    return headers;
}

export class VisitorCounter {
    constructor(state) {
        this.state = state;
    }

    async fetch() {
        const previousCount = await this.state.storage.get('count') || 0;
        const count = previousCount + 1;
        await this.state.storage.put('count', count);

        return Response.json({ count });
    }
}

export default {
    async fetch(request, env) {
        const headers = corsHeaders(request);

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        if (request.method !== 'GET' || new URL(request.url).pathname !== '/count') {
            return new Response('Not found', { status: 404, headers });
        }

        const counterId = env.COUNTERS.idFromName('blindsxpert-total-page-visits');
        const counter = env.COUNTERS.get(counterId);
        const response = await counter.fetch('https://counter/increment');
        const body = await response.text();

        headers.set('Content-Type', 'application/json; charset=utf-8');
        return new Response(body, { status: response.status, headers });
    }
};