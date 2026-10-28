const HUGGING_FACE_URL = 'https://huggingface.co';
const MODEL = 'meta-llama/Llama-3.2-3B-Instruct';
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

function jsonResponse(body, status, origin) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers.Vary = 'Origin';
  }
  return new Response(JSON.stringify(body), { status, headers });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigins = (env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (!origin || !allowedOrigins.includes(origin)) {
      return jsonResponse({ error: 'Origin not allowed.' }, 403);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        },
      });
    }

    if (request.method !== 'POST' || new URL(request.url).pathname !== '/api/chat') {
      return jsonResponse({ error: 'Not found.' }, 404, origin);
    }

    if (!env.HF_TOKEN) {
      return jsonResponse({ error: 'Chat service is not configured.' }, 500, origin);
    }

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > 32000) {
      return jsonResponse({ error: 'Request is too large.' }, 413, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body.' }, 400, origin);
    }

    const messages = payload?.messages;
    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > MAX_MESSAGES ||
      messages.some(
        (message) =>
          !message ||
          !['user', 'assistant'].includes(message.role) ||
          typeof message.content !== 'string' ||
          message.content.trim().length === 0 ||
          message.content.length > MAX_MESSAGE_LENGTH
      )
    ) {
      return jsonResponse({ error: 'Invalid messages.' }, 400, origin);
    }

    let upstream;
    try {
      upstream = await fetch(HUGGING_FACE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, model: MODEL }),
      });
    } catch {
      return jsonResponse({ error: 'Could not reach the model service.' }, 502, origin);
    }

    if (!upstream.ok) {
      return jsonResponse(
        { error: `Model service returned ${upstream.status}.` },
        502,
        origin
      );
    }

    let result;
    try {
      result = await upstream.json();
    } catch {
      return jsonResponse({ error: 'Model service returned invalid JSON.' }, 502, origin);
    }

    return jsonResponse(result, 200, origin);
  },
};
