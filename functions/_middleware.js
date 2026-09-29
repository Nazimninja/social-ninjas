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
  const response = await next();

  // Only process HTML document responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const url = new URL(request.url);

  // Normalize path: strip trailing slashes (except for root '/')
  const cleanPath = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;

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
