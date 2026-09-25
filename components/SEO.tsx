
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
  service
}) => {
  const location = useLocation();
  const canonicalUrl = `https://socialninjas.in${location.pathname}`;
  const siteTitle = "Social Ninja's | AI-Powered Performance Marketing & Growth Agency Worldwide";
  const defaultDescription = "Social Ninja's combines AI automation, elite content production, and data-driven paid media to scale brands worldwide. From ₹2,999/month — try free.";
  const defaultKeywords = "performance marketing agency, AI automation agency, global digital marketing agency, AI lead automation, growth marketing agency, paid ads, international media buying";

  const fullTitle = title ? `${title}` : siteTitle;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Social Ninja's",
    "alternateName": ["Social Ninjas", "Social Ninjas AI Growth Agency"],
    "url": "https://socialninjas.in",
    "logo": "https://socialninjas.in/ninja-logo.png",
    "description": defaultDescription,
    "founder": {
      "@type": "Person",
      "name": "Nazim Pasha",
      "jobTitle": "Founder & Technical Lead",
      "email": "info@socialninjas.in"
    },
    "sameAs": [
      "https://www.instagram.com/socialninjas.in",
      "https://www.linkedin.com/company/social-ninjas",
      "https://www.producthunt.com/@nazim_pasha",
      "https://clutch.co/profile/social-ninjas-0",
      "https://www.goodfirms.co/company/social-ninjas",
      "https://www.sortlist.com/agency/social-ninja-s",
      "https://www.crunchbase.com/organization/social-ninja-s",
      "https://www.designrush.com/agency/profile/social-ninjas",
      "https://www.agencyspotter.com/social-ninja-s",
      "https://trustpilot.com/review/socialninjas.in"
    ],
    "knowsAbout": [
      "AI Lead Automation",
      "Performance Marketing",
      "Meta Ads Management",
      "Google Ads Management",
      "WhatsApp Lead Generation & Chatbot Systems",
      "Conversion Rate Optimization",
      "Enterprise CRM Automation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Ninja's Growth & Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Lead & WhatsApp Automation",
            "description": "24/7 intelligent auto-reply chatbots and automated CRM calendar booking systems."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Paid Media (Meta & Google Ads)",
            "description": "High-ROAS paid advertising management focused on unit economics and qualified lead pipeline."
          }
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
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

  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title || fullTitle,
    "description": description || defaultDescription,
    "image": image,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Ninja's",
      "logo": {
        "@type": "ImageObject",
        "url": "https://socialninjas.in/ninja-logo.png"
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
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
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
