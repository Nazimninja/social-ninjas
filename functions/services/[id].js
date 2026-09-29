const VALID_SLUGS = new Set([
  'paid-ads',
  'content-production',
  'email-whatsapp',
  'social-media',
  'web-seo',
  'ai-automation',
  'growth-consulting',
  'geo-agency',
  'instagram-seo',
  'meta-ads-audit',
  'ai-appointment-setter'
]);

export async function onRequest(context) {
  const { request, params, env } = context;
  const slug = params.id;
  const url = new URL(request.url);

  // 301-redirect duplicate service pages to canonical primary pages
  if (slug === 'performance-marketing') {
    return Response.redirect(`${url.origin}/services/paid-ads`, 301);
  }
  if (slug === 'creative-studio') {
    return Response.redirect(`${url.origin}/services/content-production`, 301);
  }

  if (VALID_SLUGS.has(slug)) {
    // Valid service slug - forward directly to the prerendered static asset
    return env.ASSETS.fetch(request);
  }

  // Unknown service slug - return true 404 HTTP status
  try {
    const notFoundUrl = new URL('/404.html', request.url);
    const notFoundRes = await env.ASSETS.fetch(notFoundUrl);
    return new Response(notFoundRes.body, {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (err) {
    return new Response('404 Not Found', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
