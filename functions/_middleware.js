/**
 * Cloudflare Pages Middleware
 * Enforces clean, self-referencing canonical URLs sitewide on both HTML responses
 * and via standard RFC 6596 Link HTTP headers.
 * 
 * This completely eliminates duplicate URL indexing caused by UTM marketing parameters
 * (?utm_source=fb&utm_medium=paid...), ad click IDs (?fbclid, ?gclid), and tracking queries
 * across both socialninjas.in and fit.socialninjas.in.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const cleanPath = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;

  // 301-redirect duplicate service pages
  if (cleanPath === '/services/performance-marketing') {
    return Response.redirect(`${url.origin}/services/paid-ads`, 301);
  }
  if (cleanPath === '/services/creative-studio') {
    return Response.redirect(`${url.origin}/services/content-production`, 301);
  }

  // 301-redirect standalone satellite tools
  if (cleanPath === '/tools/whatsapp-link-generator') {
    return Response.redirect('https://linkwa.in/', 301);
  }
  if (cleanPath === '/tools/us-take-home-pay-calculator') {
    return Response.redirect('https://salary.socialninjas.in/salary-calculator/', 301);
  }
  if (cleanPath === '/tools/hourly-to-salary-calculator') {
    return Response.redirect('https://salary.socialninjas.in/', 301);
  }
  if (cleanPath === '/tools/mortgage-rate-calculator') {
    return Response.redirect('https://mortgage.socialninjas.in/', 301);
  }

  // SPA Route rewrite for dynamic client-only views (/app, /app/*, /admin)
  if (cleanPath === '/app' || cleanPath.startsWith('/app/') || cleanPath === '/admin') {
    return context.env.ASSETS.fetch(new URL('/index.html', request.url));
  }

  let response = await next();

  // If asset was not found (404) and this is a page navigation request (no file extension),
  // fallback to /index.html so React Router SPA handles client-side routing
  if (response.status === 404 && !/\.[a-zA-Z0-9]+$/.test(cleanPath)) {
    response = await context.env.ASSETS.fetch(new URL('/index.html', request.url));
  }

  // Only process HTML document responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  // Clean canonical URL without any query string or hash
  const canonicalUrl = `${url.origin}${cleanPath}`;

  // Clone headers to inject Google/RFC compliant canonical Link header
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Link', `<${canonicalUrl}>; rel="canonical"`);

  let canonicalFound = false;

  return new HTMLRewriter()
    .on('link[rel="canonical"]', {
      element(element) {
        canonicalFound = true;
        element.setAttribute('href', canonicalUrl);
      }
    })
    .on('head', {
      element(element) {
        element.onEndTag(endTag => {
          if (!canonicalFound) {
            endTag.before(`<link rel="canonical" href="${canonicalUrl}" />`, { html: true });
          }
        });
      }
    })
    .transform(new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    }));
}
