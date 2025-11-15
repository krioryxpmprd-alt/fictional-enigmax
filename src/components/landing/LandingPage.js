'use client';

import React from 'react';
import Navigation from './Navigation';
import HeroSection from './herosection/HeroSection';  
import AdditionalFeatures from './AdditionalFeatures/AdditionalFeatures';
import PricingSection from './PricingSection/PricingSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Footer from './Footer';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import Objasnuvanje from './Objasnuvanje/Objasnuvanje';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white"> 
      <HeroSection />
      <FeaturesSection />
      <Objasnuvanje /> 
      <AdditionalFeatures />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection /> 
      <Footer />
    </div>
  );
};

export default LandingPage;