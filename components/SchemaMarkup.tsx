
import React from 'react';

export const SchemaMarkup = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MarketingAgency",
        "name": "Social Ninja's",
        "image": "https://socialninjas.agency/logo.png",
        "@id": "https://socialninjas.agency",
        "url": "https://socialninjas.agency",
        "telephone": "+918892587979",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Business Bay",
            "addressLocality": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.1837,
            "longitude": 55.2666
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.instagram.com/socialninjas",
            "https://www.linkedin.com/company/socialninjas",
            "https://twitter.com/socialninjas",
            "https://www.facebook.com/socialninjas"
        ],
        "logo": "https://socialninjas.agency/logo.png",
        "priceRange": "$$$",
        "description": "Social Ninja's is a premium performance marketing agency specializing in AI automation, paid media buying, and high-fidelity content production for brands in India and UAE.",
        "areaServed": ["IN", "AE", "US", "UK", "SA", "QA"],
        "founder": {
            "@type": "Person",
            "name": "Nazim",
            "jobTitle": "Founder & CEO"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "84"
        },
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Marketing",
                    "description": "Meta & Google Ads Management with ROAS focus."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "AI Automation Agents",
                    "description": "Custom AI chatbots and workflow automation."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Content Production",
                    "description": "High-end video edits and social media management."
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};

export default SchemaMarkup;
