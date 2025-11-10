'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { QrCode, Upload, Image, Download, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Access',
    description: 'Simple QR code scanning - no app downloads or registrations needed for guests',
    color: 'text-[#f2adc8]',
    bgColor: 'bg-[#f2adc8]/10'
  },
  {
    icon: Upload,
    title: 'Unlimited Uploads',
    description: 'Collect unlimited photos, videos, and messages from all your guests',
    color: 'text-[#f4c2c2]',
    bgColor: 'bg-[#f4c2c2]/10'
  },
  {
    icon: Image,
    title: 'Real-Time Gallery',
    description: 'View photos and videos as they come in, organized in beautiful galleries',
    color: 'text-[#f2adc8]',
    bgColor: 'bg-[#f2adc8]/10'
  },
  {
    icon: Download,
    title: 'Easy Download',
    description: 'Download all photos and videos in high quality with one click',
    color: 'text-[#f4c2c2]',
    bgColor: 'bg-[#f4c2c2]/10'
  },
  {
    icon: Users,
    title: 'Guest Messages',
    description: 'Collect heartfelt messages and wishes alongside photos',
    color: 'text-[#f2adc8]',
    bgColor: 'bg-[#f2adc8]/10'
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your memories are safely stored with privacy controls',
    color: 'text-[#f4c2c2]',
    bgColor: 'bg-[#f4c2c2]/10'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2b2d2f] mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">Capture every precious moment with ease</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <div className={`h-12 w-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-[#2b2d2f] mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;