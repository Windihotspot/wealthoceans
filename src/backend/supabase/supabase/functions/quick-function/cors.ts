// Shared CORS helper for Supabase Edge Functions.
// Allows any localhost/127.0.0.1 port (dev) plus your production app domains.

const ALLOWED_ORIGINS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/(www\.)?wealthoceanstech\.com$/,
  // add any preview/staging domain here, e.g. Vercel/Netlify previews:
  // /^https:\/\/.*\.vercel\.app$/,
]

export function getCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get('origin') ?? ''
  const isAllowed = ALLOWED_ORIGINS.some((pattern) => pattern.test(origin))

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

export function handlePreflight(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: getCorsHeaders(req) })
  }
  return null
}