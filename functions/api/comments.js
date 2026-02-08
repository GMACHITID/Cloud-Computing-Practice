// functions/api/comments.js - Cloudflare D1 comment API

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
};

const MAX_CHARS = 400;

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: CORS });
}

function errorResponse(message, status = 400) {
    return jsonResponse({ error: message }, status);
}

function getDB(env) {
    return env.DB || env.D1 || env.DATABASE || null;
}

export async function onRequestGet(context) {
    const { env } = context;
    const DB = getDB(env);

    if (!DB) {
        return jsonResponse({ error: 'Database not configured. Bind D1 with variable name DB (or D1/DATABASE).', comments: [] }, 500);
    }

    try {
        const { results } = await DB.prepare(
            'SELECT id, content, created_at FROM comments ORDER BY created_at DESC'
        ).all();

        return jsonResponse({
            comments: (results || []).map(r => ({
                id: r.id,
                content: r.content,
                created_at: r.created_at,
            })),
        });
    } catch (err) {
        return jsonResponse({ error: 'Failed to fetch comments', comments: [] }, 500);
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const DB = getDB(env);

    if (!DB) {
        return errorResponse('Database not configured. Bind D1 with variable name DB (or D1/DATABASE).', 500);
    }

    try {
        const body = await request.json();
        let content = typeof body.content === 'string' ? body.content.trim() : '';

        if (!content) {
            return errorResponse('Comment is required');
        }

        if (content.length > MAX_CHARS) {
            return errorResponse(`Comment must be at most ${MAX_CHARS} characters`);
        }

        await DB.prepare('INSERT INTO comments (content) VALUES (?)')
            .bind(content)
            .run();

        return jsonResponse({ success: true });
    } catch (err) {
        const msg = err?.message || 'Failed to post comment';
        return jsonResponse({ error: msg }, 500);
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
        },
    });
}
