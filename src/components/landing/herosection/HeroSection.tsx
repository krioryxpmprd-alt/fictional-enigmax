import type { Metadata } from 'next';
import Navigation from './Navigation';
import IndexHero from './IndexHero';

// 🌍 SEO METADATA (Macedonian + English)
export const metadata: Metadata = {
  title: "WeddingQR Македонија | QR код за свадбени фотографии и видеа",
  description:
    "Креирај дигитален свадбен албум со QR код. Гостите можат да споделат фотографии, видеа и пораки без апликација или регистрација. Совршено за македонски свадби!",
  keywords:
    "QR код свадба, свадбени фотографии, WeddingQR Македонија, дигитален свадбен албум, сподели фотографии, QR code wedding, guest photo sharing, wedding QR Macedonia",
  robots: "index, follow",
  authors: [{ name: "WeddingQR" }],
  openGraph: {
    title: "WeddingQR Македонија | Сподели свадбени фотографии со QR код",
    description:
      "Добиј ги сите фотографии и видеа од гостите во еден дигитален албум. Без апликација. Без мака.",
    type: "website",
    url: "https://weddingqr.com/mk",
    siteName: "WeddingQR",
    locale: "mk_MK",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "https://weddingqr.com/og-image-mk.jpg",
        width: 1200,
        height: 630,
        alt: "WeddingQR Македонија – QR код за свадбени фотографии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeddingQR Македонија | QR код за свадбени фотографии",
    description:
      "Платформа за свадбени QR кодови во Македонија. Гостите споделуваат фотографии без апликација или регистрација.",
    creator: "@weddingqr",
    images: ["https://weddingqr.com/og-image-mk.jpg"],
  },
  alternates: {
    canonical: "https://weddingqr.com/mk",
    languages: {
      "mk": "https://weddingqr.com/mk",
      "en": "https://weddingqr.com/en",
    },
  },
  category: "wedding, qr code, photo sharing, digital album",
};

// 🧠 JSON-LD Structured Data (Multilingual + Localized)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WeddingQR Македонија",
  alternateName: "WeddingQR Macedonia",
  description:
    "Платформа за свадбени QR кодови во Македонија која овозможува гостите да споделат фотографии, видеа и пораки без апликација или регистрација.",
  inLanguage: ["mk", "en"],
  applicationCategory: "PhotographyApplication",
  operatingSystem: "All",
  url: "https://weddingqr.com/mk",
  areaServed: {
    "@type": "Country",
    name: "North Macedonia",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MKD",
  },
  creator: {
    "@type": "Organization",
    name: "WeddingQR",
    url: "https://weddingqr.com",
  },
  potentialAction: {
    "@type": "Action",
    name: "Креирај свадбен QR албум",
    target: "https://weddingqr.com/mk/create-album",
  },
};

export default function HeroSection() {
  return (
    <>
      {/* ✅ Localized JSON-LD for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Language + Navigation + Hero */}
      <div lang="mk">
        <Navigation />
        <main>
          <IndexHero />
          {/* Add more localized sections below */}
        </main>
      </div>
    </>
  );
}
