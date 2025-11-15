'use client';

import { useState } from "react";
import Link from "next/link";

// Simple SVG icons to avoid Lucide React import
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MobileMenu = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Minimal */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors cursor-pointer"
        aria-label={isOpen ? "Затвори мени" : "Отвори мени"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Menu - Optimized */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 border-t border-border bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-base font-medium text-gray-700 hover:text-[#e24b2c] transition-colors"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="block py-2 text-base font-medium text-gray-700 hover:text-[#e24b2c] transition-colors"
              onClick={closeMenu}
            >
              Најави се
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;