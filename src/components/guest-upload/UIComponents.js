// components/guest-upload/UIComponents.js
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeOff, Upload, Heart, MessageSquare } from 'lucide-react';

export const PrivateMediaMessage = () => (
  <div className="text-center py-12 bg-gray-50 rounded-lg" role="status">
    <EyeOff className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Media is Private</h3>
    <p className="text-gray-500 max-w-md mx-auto">
      The event hosts have set the media to private. You can still upload your photos and videos, but only you and the hosts will be able to see them.
    </p>
  </div>
);

export const PrivateMediaNotice = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4" role="note">
    <div className="flex items-center">
      <EyeOff className="h-5 w-5 text-blue-600 mr-2" aria-hidden="true" />
      <p className="text-blue-700 text-sm">
        Media is currently private. Only you and the event hosts can see your uploads.
      </p>
    </div>
  </div>
);

export const EmptyState = ({ icon, message }) => (
  <div className="text-center py-12" role="status" aria-live="polite">
    {icon}
    <p className="text-gray-500">{message}</p>
  </div>
);

export const EmptyUploadsState = ({ onUploadClick, eventName }) => (
  <div className="text-center py-12" role="status">
    <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
    <p className="text-gray-500 mb-4">You haven't uploaded anything yet.</p>
    <Button 
      onClick={onUploadClick} 
      aria-label={`Share your first memory for ${eventName}`}
    >
      Share Your First Memory
    </Button>
  </div>
);

export const EmptyFavouritesState = ({ eventName }) => (
  <div className="text-center py-12" role="status">
    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
    <p className="text-gray-500 mb-4">You haven't liked any content yet.</p>
    <p className="text-gray-400 text-sm">
      Browse the Event Gallery and click the heart icon to add photos and videos to your favourites.
    </p>
  </div>
);

export const UploadSuccessMessage = ({ step, activeTab, uploadType, setActiveTab, eventName }) => (
  step === 'success' && activeTab === 'myUploads' && (
    <div 
      className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6" 
      role="status" 
      aria-live="polite"
    >
      <div className="flex items-center">
        <div className="text-green-600 text-lg mr-2" aria-hidden="true">✓</div>
        <div>
          <p className="text-green-800 font-medium">Upload Successful!</p>
          <p className="text-green-700 text-sm">
            Your {uploadType} has been added to your uploads. 
            {activeTab !== 'liveFeed' && (
              <button 
                onClick={() => setActiveTab('liveFeed')}
                className="underline ml-1 font-medium"
                aria-label={`View live feed for ${eventName}`}
              >
                View live feed to see all content
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
);

export const Breadcrumbs = ({ eventName, activeTab }) => (
  <nav aria-label="Page location" className="text-sm text-gray-600 mb-4">
    <ol className="flex space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <a href="/" itemProp="item">
          <span itemProp="name">Home</span>
        </a>
        <meta itemProp="position" content="1" />
      </li>
      <li aria-hidden="true" className="mx-2">›</li>
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <span itemProp="name">{eventName}</span>
        <meta itemProp="position" content="2" />
      </li>
      <li aria-hidden="true" className="mx-2">›</li>
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="font-medium">
        <span itemProp="name">
          {activeTab === 'liveFeed' ? 'Event Gallery' : 
           activeTab === 'myUploads' ? 'My Contributions' : 
           'My Favourites'}
        </span>
        <meta itemProp="position" content="3" />
      </li>
    </ol>
  </nav>
);