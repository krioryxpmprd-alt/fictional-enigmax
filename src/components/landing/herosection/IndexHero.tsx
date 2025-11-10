import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; 
import phoneMockup1 from "@/components/landing/assets/phone-mockup-3.jpg"
import phoneMockup2 from "@/components/landing/assets/phone-mockup-7.jpg"
import phoneMockup3 from "@/components/landing/assets/phone-mockup-8.png"
import phoneMockup4 from "@/components/landing/assets/phone-mockup-9.png" 
import phoneMockup6 from "@/components/landing/assets/phone-mockup-6.png"

import './style.css'

const IndexHero = () => {

    
  return (
    <section 
      className="relative flex items-center overflow-hidden pt-16 lg:pt-20 bg-gradient-to-br from-background via-secondary/30 to-background"
      aria-labelledby="hero-heading" id="hero-section"
    >
        {/* More visible background elements - FIXED: added pointer-events-none */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Larger, more visible gradients */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#E35336]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#E35336]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E35336]/10 rounded-full blur-3xl" />
      </div>

      {/* More prominent decorative elements - FIXED: added pointer-events-none */}
      <div className="absolute top-10 left-5 w-40 h-40 bg-[#E35336]/30 rounded-full blur-2xl animate-pulse pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-5 w-48 h-48 bg-[#E35336]/25 rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} aria-hidden="true" />
      <div className="absolute top-1/2 right-20 w-32 h-32 bg-[#E35336]/20 rounded-full blur-xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} aria-hidden="true" />
      <div className="absolute bottom-1/3 left-10 w-28 h-28 bg-[#E35336]/35 rounded-full blur-xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
      {/* Add structured data for the hero section */}
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "WeddingQR – Сподели свадбени фотографии преку QR код",
      "description": "Платформа за свадбени QR кодови во Македонија. Гостите можат да споделат фотографии и видеа во дигитален албум, без апликација или регистрација.",
      "inLanguage": "mk",
      "areaServed": "MK",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MKD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "10000"
      }
    })
  }}
/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-20 h-full flex items-center">
        <div className="grid lg:grid-cols-2 items-center w-full" id="hero-grid-gap">
          {/* Left Column - Text Content */}
          <div className="order-1 text-center lg:text-left animate-fade-in" id="order1">
            {/* Main Heading */}
            <h1 
              id="hero-heading"
              className="font-bold text-foreground mb-3 sm:mb-4 lg:mb-6 leading-tight"
            >
              Сите {" "}
              <span className="gradient-red-text">
                фотографии, видеа & пораки{" "}
              </span>
              од твојот омилен настан на едно место!
              
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed" id="subheading-text">
              Овозможете им на вашите гости лесно и едноставно да ги праќаат своите фотографии, видеа и пораки директно во дигитален албум, само со скенирање на QR код. 
              <span className="text-primary font-semibold">{" "}Без преземање апликации, без регистрација.{" "}</span>  
              Сите спомени од перспективата на вашите гости на едно место.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-4 sm:mb-8 lg:mb-12" id="cta-big">
              <Button 
                variant="outline" 
                size="default" 
                className="text-sm sm:text-base lg:text-lg px-6 py-5 lg:px-8 lg:py-6 rounded-full font-medium border-2 w-full sm:w-auto"
                asChild
                id="create-album-button"
              >
                <a href="/how-it-works" aria-label="Креирај дигитален свадбен албум со QR код">
                  Креирај албум
                  <ArrowRight size={15} className="rotate-315"/> 
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                className="text-sm sm:text-base lg:text-lg px-6 py-5 lg:px-8 lg:py-6 rounded-full font-medium border-2 hover:border-primary w-full sm:w-auto"
                asChild
              >
                <a href="/how-it-works" aria-label="Како функционира WeddingQR платформата за свадбени фотографии">
                  Како функционира?
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Phone Mockups */}
         {/* Right Column - Fixed-size, CSS-controlled layout */}
<div className="phone-mockups">
          <div className="mockup-column-left">
            <Image src={phoneMockup1} alt="Свадбена церемонија - WeddingQR QR код албум" className="phone small-left" />
            <Image src={phoneMockup2} alt="Роденденска прослава со гости - WeddingQR дигитален албум" className="phone small hide-mobile" />
          </div>

          <div className="mockup-center">
            <video autoPlay 
    muted 
    loop
    playsInline poster={phoneMockup6.src} className="phone large">
            <source src="/phone-mockup-5.mp4" type="video/mp4" />
        </video>
          </div>

          <div className="mockup-column-right">
            <Image src={phoneMockup3} alt="Младенци фотографија - WeddingQR QR код" className="phone small-right" />
            <Image src={phoneMockup4} alt="Свадбена забава - WeddingQR Македонија" className="phone small hide-mobile" />
          </div>
        </div>
         {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-4 sm:mb-8 lg:mb-12" id="cta-small">
              <Button 
                variant="outline" 
                size="default" 
                className="text-sm sm:text-base lg:text-lg px-6 py-5 lg:px-8 lg:py-6 rounded-full font-medium border-2 w-full sm:w-auto"
                asChild
                id="create-album-button"
              >
                <a href="/how-it-works" aria-label="Креирај дигитален свадбен албум со QR код">
                  Креирај албум
                  <ArrowRight size={15} className="rotate-315"/> 
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                className="text-sm sm:text-base lg:text-lg px-6 py-5 lg:px-8 lg:py-6 rounded-full font-medium border-2 hover:border-primary w-full sm:w-auto"
                asChild
              >
                <a href="/how-it-works" aria-label="Како функционира WeddingQR платформата за свадбени фотографии">
                  Како функционира?
                </a>
              </Button>
            </div>
      </div>
    </div>
 
    </section>
  );
};

export default IndexHero;