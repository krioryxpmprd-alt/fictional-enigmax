'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './style.css'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Use Cases", href: "/use-cases" },
    { label: "QR Code templates", href: "/templates" },
    { label: "Prices", href: "/pricing" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-[0_2px_8px_-1px_hsl(240_10%_20%/0.08)]">
      {/* Add structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "WeddingQR",
            "url": "https://weddingqr.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://weddingqr.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with semantic h1 on homepage */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMobileMenu}
              aria-label="WeddingQR Home"
            >
              {pathname === "/" ? (
                <h1 className="text-xl font-semibold">WeddingQR</h1>
              ) : (
                <span>WeddingQR</span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link-underline text-sm font-medium transition-colors duration-300"
                id="nav-links"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" size="sm" asChild id="login-button">
              <Link href="/login">Log in</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden border-t border-border bg-card overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block py-2 text-base font-medium transition-colors ${
                pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/login" onClick={closeMobileMenu}>Log in</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;