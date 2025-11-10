'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { QrCode, Sparkles, Users } from 'lucide-react';

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d4886f] to-[#c67058]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-white text-sm font-semibold">Join 50,000+ Successful Events</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Capture Every Moment?
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Create your event in under 2 minutes and get a personalized QR code to start collecting photos from your guests instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={() => router.push('/register')}
            className="bg-white text-[#c67058] hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
          >
            <QrCode className="h-5 w-5 mr-2" />
            Get Your QR Code Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-[#c67058] text-lg px-8 py-6 font-semibold"
          >
            <Users className="h-5 w-5 mr-2" />
            See Example Gallery
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">2 min</div>
            <div className="text-sm">Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">$0</div>
            <div className="text-sm">Free to Start</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">0</div>
            <div className="text-sm">App Downloads Needed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;





