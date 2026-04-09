
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
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://socialninjas.in/og-image.png',
  type = 'website',
  keywords,
  article
}) => {
  const location = useLocation();
  const canonicalUrl = `https://socialninjas.in${location.pathname}`;
  const siteTitle = "Social Ninja's | AI-Powered Performance Marketing Agency";
  const defaultDescription = "Social Ninja's combines AI automation, elite content production, and data-driven paid media to scale brands worldwide. From ₹2,999/month — try free.";
  const defaultKeywords = "performance marketing India, AI automation agency, social media management, AI content generator, digital marketing agency India, growth marketing, paid ads India";

  const fullTitle = title ? `${title}` : siteTitle;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Social Ninja's",
    "url": "https://socialninjas.in",
    "logo": "https://socialninjas.in/ninja-logo.png",
    "description": defaultDescription,
    "sameAs": [
      "https://www.instagram.com/socialninjas.in",
      "https://www.linkedin.com/company/social-ninjas"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "info@socialninjas.in",
      "areaServed": ["IN", "AE", "US", "GB"],
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

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
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
