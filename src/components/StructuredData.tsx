import { useEffect } from "react";
import { businessConfig } from "../config/business";
import { faqData } from "../data";

export default function StructuredData() {
  useEffect(() => {
    // 1. LocalBusiness & Organization Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessConfig.name,
      "image": `${businessConfig.url}${businessConfig.logoUrl}`,
      "@id": businessConfig.url,
      "url": businessConfig.url,
      "telephone": businessConfig.contact.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessConfig.contact.address.street,
        "addressLocality": businessConfig.contact.address.city,
        "addressRegion": businessConfig.contact.address.state,
        "postalCode": businessConfig.contact.address.postalCode,
        "addressCountry": businessConfig.contact.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessConfig.contact.geo.latitude,
        "longitude": businessConfig.contact.geo.longitude
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
        "opens": businessConfig.hours.openTime,
        "closes": businessConfig.hours.closeTime
      },
      "sameAs": [
        businessConfig.social.facebook,
        businessConfig.social.instagram,
        businessConfig.social.twitter
      ]
    };

    // 2. WebSite Schema (SearchAction)
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": businessConfig.url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${businessConfig.url}/#featured?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // 3. FAQPage Schema (AEO/GEO)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const injectScript = (schema: object, id: string) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    injectScript(localBusinessSchema, "schema-local-business");
    injectScript(websiteSchema, "schema-website");
    injectScript(faqSchema, "schema-faq");

    return () => {
      document.getElementById("schema-local-business")?.remove();
      document.getElementById("schema-website")?.remove();
      document.getElementById("schema-faq")?.remove();
    };
  }, []);

  return null;
}
