
import React from 'react';

export const SchemaMarkup = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MarketingAgency",
        "name": "Social Ninja's",
        "image": "https://socialninjas.in/og-image.png",
        "@id": "https://socialninjas.in",
        "url": "https://socialninjas.in",
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
            "https://www.instagram.com/socialninjas.in",
            "https://www.linkedin.com/company/social-ninjas",
            "https://twitter.com/socialninjasin"
        ],
        "logo": "https://socialninjas.in/ninja-logo.png",
        "priceRange": "₹₹",
        "description": "Social Ninja's is a premium performance marketing agency specializing in AI automation, paid media buying, and high-fidelity content production for brands in India and UAE.",
        "areaServed": ["IN", "AE", "US", "GB", "SA", "QA"],
        "founder": {
            "@type": "Person",
            "name": "Nazim",
            "jobTitle": "Founder & CEO"
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
