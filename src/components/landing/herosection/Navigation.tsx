import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import './style.css'; 

const Navigation = () => {
  const navItems = [
    { label: "Како функционира?", href: "/#kako-funkcionira" },
    { label: "За нас", href: "/shabloni" },
    { label: "Ценовник", href: "/#cenovnik" },
    { label: "Контакт", href: "/kontakt" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-[0_2px_8px_-1px_hsl(240_10%_20%/0.08)]">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MojMoment",
            "url": "https://mojmoment.mk",
            "description": "QR код систем за собирање фотографии од гости за свадби и прослави во Македонија",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mojmoment.mk/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
              aria-label="MojMoment Почетна"
              id="logo-container"
            >
              <img 
                src="/mojmom2.png" 
                alt="MojMoment лого - QR код систем за собирање фотографии од гости за свадби и прослави" 
                id="logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-underline text-sm font-medium transition-colors duration-300 hover:text-[#e24b2c]"
                id="nav-links"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              id="login-button"
              className="hover:text-[#e24b2c]"
            >
              <Link href="/login">Најави се</Link>
            </Button>
          </div>

          {/* Mobile Menu Client Component */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;