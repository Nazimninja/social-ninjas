
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
  image = 'https://social-ninjas.vercel.app/og-image.png?v=2',
  type = 'website',
  article
}) => {
  const location = useLocation();
  const canonicalUrl = `https://social-ninjas.vercel.app${location.pathname}`;
  const siteTitle = "Social Ninja's | #1 Performance Marketing Agency for High-Growth Brands";
  const defaultDescription = "Stop burning cash. Social Ninja's engineers predictable revenue systems for brands in India & UAE. We combine AI automation, elite content, and paid media to drive 3-10x ROAS.";

  const fullTitle = title ? `${title} | Social Ninja's` : siteTitle;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
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
