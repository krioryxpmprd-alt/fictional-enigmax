// components/guest-upload/TabNavigation.js
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export const TabNavigation = ({ 
  activeTab, 
  setActiveTab, 
  shouldShowMedia, 
  existingMedia, 
  existingMessages, 
  myUploads, 
  favourites, 
  eventName 
}) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg flex-1 max-w-md" role="tablist" aria-label="Content sections">
      <button
        onClick={() => setActiveTab('liveFeed')}
        role="tab"
        aria-selected={activeTab === 'liveFeed'}
        aria-controls="live-feed-content"
        id="live-feed-tab"
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'liveFeed'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Event Gallery ({shouldShowMedia ? (existingMedia.length + existingMessages.length) : existingMessages.length})
      </button>
      <button
        onClick={() => setActiveTab('myUploads')}
        role="tab"
        aria-selected={activeTab === 'myUploads'}
        aria-controls="my-uploads-content"
        id="my-uploads-tab"
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'myUploads'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        💝 My Contributions ({myUploads.length})
      </button>
      <button
        onClick={() => setActiveTab('favourites')}
        role="tab"
        aria-selected={activeTab === 'favourites'}
        aria-controls="favourites-content"
        id="favourites-tab"
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'favourites'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ❤️ My Favourites ({favourites.length})
      </button>
    </div>
    
     
  </div>
);