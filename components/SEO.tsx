
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: string[];
    author: string;
  };
  faq?: { q: string; a: string }[];
  softwareApp?: {
    name: string;
    category?: string;
    description: string;
    url: string;
    price?: string;
    ratingValue?: string;
    ratingCount?: string;
  };
  service?: {
    name: string;
    description: string;
    price?: string;
    providerName?: string;
  };
  localBusiness?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://socialninjas.in/og-image.png',
  type = 'website',
  keywords,
  article,
  faq,
  softwareApp,
  service,
  localBusiness
}) => {
  const location = useLocation();
  const origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://socialninjas.in';
  const cleanPath = location.pathname.length > 1 ? location.pathname.replace(/\/+$/, '') : location.pathname;
  const canonicalUrl = `${origin}${cleanPath}`;
  const siteTitle = "AI Performance Marketing Agency | Social Ninja's";
  const defaultDescription = "We build AI lead pipelines, run high-ROAS Meta & Google ads, and automate content for 150+ brands. Book a free strategy session.";
  const defaultKeywords = "performance marketing agency, AI automation agency, global digital marketing agency, AI lead automation, growth marketing agency, paid ads, international media buying";

  const fullTitle = title ? `${title}` : siteTitle;

  const localBusinessSchema = localBusiness ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Social Ninja's",
    "url": "https://socialninjas.in/",
    "hasMap": "https://www.google.com/maps/place/Social+Ninja's/@21.0680074,82.7525294,17z/data=!3m1!4b1!4m6!3m5!1s0x2027c91d5288325f:0xbad4c06d3856e671!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11zyznkfn_",
    "email": "info@socialninjas.in",
    "telephone": "+918147757479",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Social Ninja's Agency",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.linkedin.com/company/social-ninja-s",
      "https://clutch.co/profile/social-ninjas-0"
    ]
  } : null;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Social Ninja's",
    "url": "https://socialninjas.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://socialninjas.in/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title || fullTitle,
    "description": description || defaultDescription,
    "image": image,
    "datePublished": article.publishedTime ? article.publishedTime.substring(0, 10) : '2026-06-15',
    "dateModified": (article.modifiedTime || article.publishedTime) ? (article.modifiedTime || article.publishedTime).substring(0, 10) : '2026-06-15',
    "author": {
      "@type": "Person",
      "name": article.author || "Social Ninja's Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Ninja's",
      "logo": {
        "@type": "ImageObject",
        "url": "https://socialninjas.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  const softwareAppSchema = softwareApp ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": softwareApp.name,
    "operatingSystem": "Web",
    "applicationCategory": softwareApp.category || "BusinessApplication",
    "description": softwareApp.description,
    "url": softwareApp.url,
    "offers": {
      "@type": "Offer",
      "price": softwareApp.price || "0",
      "priceCurrency": "INR"
    },
    ...(softwareApp.ratingValue && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": softwareApp.ratingValue,
        "ratingCount": softwareApp.ratingCount || "100"
      }
    })
  } : null;

  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.providerName || "Social Ninja's",
      "url": "https://socialninjas.in"
    }
  } : null;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      <meta name="author" content="Social Ninja's" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Social Ninja's" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} — Social Ninja's`} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@socialninjasin" />
      <meta name="twitter:creator" content="@socialninjasin" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} — Social Ninja's`} />

      {/* Article Specific Metadata */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          <meta property="article:author" content={article.author} />
          {article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD Structured Data */}
      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {softwareAppSchema && (
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
