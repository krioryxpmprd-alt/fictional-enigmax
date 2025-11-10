import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const EventNotFound = () => (
  <div 
    className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    role="main"
    aria-labelledby="event-not-found-title"
  >
    <Card className="p-8 text-center max-w-md w-full">
      {/* SEO-friendly heading structure */}
      <h1 
        id="event-not-found-title"
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        Event Not Found
      </h1>
      
      <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
      
      <p className="text-gray-600 mb-2">
        The event you're looking for doesn't exist or may have been removed.
      </p>
      
      <p className="text-gray-500 text-sm mb-6">
        Please check the URL or contact the event organizer for assistance.
      </p>

      {/* Actionable links for better user engagement */}
      <div className="space-y-3">
        <Link 
          href="/"
          className="inline-block w-full bg-[#f2adc8] text-white py-2 px-4 rounded-md hover:bg-[#f4c2c2] transition-colors font-medium"
          aria-label="Return to MemoryBox homepage"
        >
          Return to Homepage
        </Link>
        
        <Link 
          href="/login"
          className="inline-block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
          aria-label="Sign in to your MemoryBox account"
        >
          Sign In to Your Account
        </Link>
      </div>

      {/* Additional helpful information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Need help?{' '}
          <a 
            href="mailto:support@memorybox.com" 
            className="text-[#f2adc8] hover:underline"
            aria-label="Contact MemoryBox support via email"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </Card>
  </div>
);

export default React.memo(EventNotFound);