import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: string;
  imageUrl?: string;
}

export default function SEO({
  title = "QuickDrop",
  description = "Everything Delivered. Fast. Hyperlocal delivery in Salt Lake, Kolkata.",
  canonicalUrl = "https://quickdrop-silk.vercel.app",
  type = "website",
  imageUrl = "https://quickdrop-silk.vercel.app/android-chrome-512x512.png"
}: SEOProps) {

  // JSON-LD Structured Data - LocalBusiness & Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${canonicalUrl}/#organization`,
        "name": "QuickDrop",
        "url": canonicalUrl,
        "logo": {
          "@type": "ImageObject",
          "url": imageUrl
        },
        "sameAs": [
          "https://facebook.com/quickdrop",
          "https://instagram.com/quickdrop"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${canonicalUrl}/#localbusiness`,
        "name": "QuickDrop",
        "image": imageUrl,
        "url": canonicalUrl,
        "telephone": "+917001055879",
        "email": "qdrop5262@gmail.com",
        "priceRange": "₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Salt Lake",
          "addressLocality": "Kolkata",
          "postalCode": "700091",
          "addressRegion": "WB",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.5835,
          "longitude": 88.4132
        },
        "openingHoursSpecification": [
          {
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
            "opens": "09:00",
            "closes": "23:00"
          }
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Kolkata"
          },
          {
            "@type": "City",
            "name": "Salt Lake"
          },
          {
            "@type": "City",
            "name": "New Town"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}/#website`,
        "url": canonicalUrl,
        "name": "QuickDrop",
        "publisher": {
          "@id": `${canonicalUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${canonicalUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What areas does QuickDrop serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "QuickDrop provides fast hyperlocal delivery services across Salt Lake, New Town, Sector V, and Rajarhat in Kolkata."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is QuickDrop delivery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "QuickDrop guarantees delivery within 30 to 45 minutes for all supported hyperlocal areas in Kolkata."
            }
          },
          {
            "@type": "Question",
            "name": "Does QuickDrop deliver groceries and medicines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, QuickDrop delivers groceries, fresh food, medicines, documents, and other daily essentials."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
