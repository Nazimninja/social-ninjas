
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
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
  article
}) => {
  const location = useLocation();
  const canonicalUrl = `https://socialninjas.in${location.pathname}`;
  const siteTitle = "Social Ninja's | AI-Powered Performance Marketing Agency";
  const defaultDescription = "Social Ninja's combines AI automation, elite content production, and data-driven paid media to scale brands worldwide. From ₹2,999/month — try free.";

  const fullTitle = title ? `${title} | Social Ninja's` : siteTitle;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={`${siteTitle}, performance marketing India, AI content generator, social media management, digital marketing agency`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image} />

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
    </Helmet>
  );
};

export default SEO;
