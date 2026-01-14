
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "/og-image.png",
  url = window.location.href,
  type = "website",
  keywords = "digital marketing, social media agency, performance marketing, AI automation, video production, ROAS, growth agency"
}) => {
  useEffect(() => {
    const prevTitle = document.title;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attributeName: string = 'name') => {
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for canonical link
    const updateCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 1. Basic Meta
    document.title = title;
    updateMeta('description', description);
    updateMeta('keywords', keywords);

    // 2. Open Graph / Facebook / LinkedIn
    updateMeta('og:type', type, 'property');
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:site_name', "Social Ninja's", 'property');

    // 3. Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // 4. Canonical
    updateCanonical(url.split('?')[0]); // Remove query params for canonical

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, url, type, keywords]);

  return null;
};

export default SEO;
