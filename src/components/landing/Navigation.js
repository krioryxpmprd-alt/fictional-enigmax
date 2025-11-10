'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-[#f2adc8]" />
            <span className="text-2xl font-bold text-[#2b2d2f]">MemoryBox</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#f2adc8] transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#f2adc8] transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#f2adc8] transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-[#f2adc8] transition-colors">Testimonials</a>
            <a href="#faq" className="text-gray-700 hover:text-[#f2adc8] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/login')}>Login</Button>
            <Button onClick={() => router.push('/register')} className="bg-[#f2adc8] hover:bg-[#f4c2c2] text-white">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;