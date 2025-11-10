'use client';

import React from 'react';
import { QrCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2b2d2f] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="h-8 w-8 text-[#f2adc8]" />
              <span className="text-2xl font-bold">MemoryBox</span>
            </div>
            <p className="text-gray-400 mb-4">
              Collecting memories, one photo at a time. Making event photography accessible to everyone.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
              <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Weddings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Family Gatherings</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MemoryBox. All rights reserved. Made with ❤️ for memorable events.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;