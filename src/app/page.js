// app/page.js (SERVER COMPONENT - keep this as is)
import React from "react";
import HomeClientWrapper from "../components/HomeClientWrapper";
import LandingPage from "../components/landing/LandingPage";

export const metadata = {
  title: "MemoryBox - Create Lasting Memories",
  description: "Easily create and share beautiful memory boxes for your events",
  alternates: {
    canonical: "https://www.memorybox.com/",
  },
  openGraph: {
    title: "MemoryBox - Create Lasting Memories",
    description:
      "Easily create and share beautiful memory boxes for your events",
    url: "https://www.memorybox.com",
    siteName: "MemoryBox",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.memorybox.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MemoryBox event sharing preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemoryBox - Create Lasting Memories",
    description:
      "Easily create and share beautiful memory boxes for your events",
    images: ["https://www.memorybox.com/og-image.jpg"],
  },
  robots: "index, follow",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MemoryBox",
    url: "https://www.memorybox.com",
    logo: "https://www.memorybox.com/logo.png",
    sameAs: [
      "https://www.instagram.com/memorybox",
      "https://www.facebook.com/memorybox",
      "https://twitter.com/memorybox",
    ],
    description:
      "Easily collect, share, and store photos and videos from event guests using QR codes.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MemoryBox",
    url: "https://www.memorybox.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.memorybox.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <HomeClientWrapper>
      <LandingPage />
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, websiteJsonLd]),
        }}
      />
    </HomeClientWrapper>
  );
}