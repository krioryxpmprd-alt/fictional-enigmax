// components/guest-upload/TabComponents.js
import React from 'react';
import { ImageIcon, MessageSquare, User, Heart, EyeOff, Folder } from 'lucide-react';
import MediaGrid from './MediaGrid';
import MessagesList from './MessageList';
import { PrivateMediaMessage, PrivateMediaNotice, EmptyState, EmptyUploadsState, EmptyFavouritesState } from './UIComponents';

export const LiveFeedTab = ({ 
  shouldShowMedia, 
  existingMedia, 
  existingMessages, 
  lastRefresh, 
  eventName, 
  uploaderId, 
  eventId, 
  onMediaUpdate,
  albums,
  selectedAlbum 
}) => (
  <div 
    id="live-feed-content"
    role="tabpanel"
    aria-labelledby="live-feed-tab"
    className="space-y-8"
  >
    {lastRefresh > 0 && (
      <div className="text-center text-sm text-gray-500" aria-live="polite">
        Last updated: <time dateTime={new Date(lastRefresh).toISOString()}>
          {new Date(lastRefresh).toLocaleTimeString()}
        </time>
      </div>
    )}

    {/* Album Filter Info */}
    {selectedAlbum && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Folder className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-blue-700">
            Showing photos from album: <span className="font-semibold">
              {albums.find(a => a.id === selectedAlbum)?.name || 'Unknown Album'}
            </span>
          </p>
        </div>
      </div>
    )}

    {shouldShowMedia && existingMedia.length > 0 && (
      <section aria-labelledby="media-section">
        <h2 id="media-section" className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <ImageIcon className="h-6 w-6 mr-2 text-[#f2adc8]" aria-hidden="true" />
          Photos & Videos ({existingMedia.length})
        </h2>
        <MediaGrid 
          media={existingMedia} 
          showDelete={false} 
          uploaderId={uploaderId} 
          eventId={eventId}
          onMediaUpdate={onMediaUpdate}
          confirmDelete={(item) => confirmDelete(item, 'media')}  
          bulkAction="download" 
        />
      </section>
    )}

    {!shouldShowMedia && <PrivateMediaMessage />}

    {existingMessages.length > 0 && (
  <section aria-labelledby="messages-section">
    <h2 id="messages-section" className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
      <MessageSquare className="h-6 w-6 mr-2 text-[#f2adc8]" aria-hidden="true" />
      Messages ({existingMessages.length})
    </h2>
    <MessagesList 
      messages={existingMessages}  // ✅ Change from userMessages to existingMessages
      showDelete={false}    
      confirmDelete={(item) => confirmDelete(item, 'message')}       // ✅ No delete in live feed
    />
  </section>
)}

    {shouldShowMedia && existingMedia.length === 0 && existingMessages.length === 0 && (
      <EmptyState
        icon={<MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />}
        message="No content yet. Be the first to share!"
      />
    )}

    {!shouldShowMedia && existingMessages.length === 0 && (
      <EmptyState
        icon={<MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />}
        message="No messages yet. Be the first to share!"
      />
    )}
  </div>
);

export const MyUploadsTab = ({ 
   myUploads, 
  shouldShowMedia, 
  confirmDelete, 
  uploaderId, 
  handleOpenUploadModal, 
  eventName, 
  eventId, 
  onMediaUpdate,
  albums,
  selectedAlbum  
}) => {

  const userMedia = myUploads.filter(item => item.media_type); // Items with media_type are media
  const userMessages = myUploads.filter(item => !item.media_type);

  return (
    <div 
      id="my-uploads-content"
      role="tabpanel"
      aria-labelledby="my-uploads-tab"
      className="space-y-6"
    >
      {/* Album Filter Info */}
      {selectedAlbum && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-700">
              Showing photos from album: <span className="font-semibold">
                {albums.find(a => a.id === selectedAlbum)?.name || 'Unknown Album'}
              </span>
            </p>
          </div>
        </div>
      )}

      {myUploads.length > 0 ? (
        <>
          {/* Media Section */}
          {userMedia.length > 0 && (
            <section aria-labelledby="my-media-section">
              <h2 id="my-media-section" className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <ImageIcon className="h-6 w-6 mr-2 text-[#f2adc8]" aria-hidden="true" />
                My Photos & Videos ({userMedia.length})
              </h2>
              {!shouldShowMedia && <PrivateMediaNotice />}
              <MediaGrid 
                media={userMedia} 
                showDelete={true}  
                uploaderId={uploaderId} 
                eventId={eventId}
                onMediaUpdate={onMediaUpdate}
                confirmDelete={(item) => confirmDelete(item, 'media')}
                bulkAction="delete"
              />
            </section>
          )}

          {/* Messages Section */}
          {userMessages.length > 0 && (
            <section aria-labelledby="my-messages-section">
              <h2 id="my-messages-section" className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-[#f2adc8]" aria-hidden="true" />
                My Messages ({userMessages.length})
              </h2>
              <MessagesList 
                messages={userMessages} 
                showDelete={true}
                confirmDelete={(item) => confirmDelete(item, 'message')}
              />
            </section>
          )}
        </>
      ) : (
        <EmptyUploadsState onUploadClick={handleOpenUploadModal} eventName={eventName} />
      )}
    </div>
  );
};

export const FavouritesTab = ({ 
  favourites, 
  shouldShowMedia, 
  uploaderId, 
  eventName, 
  eventId, 
  onMediaUpdate,
  albums,
  selectedAlbum 
}) => (
  <div 
    id="favourites-content"
    role="tabpanel"
    aria-labelledby="favourites-tab"
    className="space-y-6"
  >
    {/* Album Filter Info */}
    {selectedAlbum && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Folder className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-blue-700">
            Showing photos from album: <span className="font-semibold">
              {albums.find(a => a.id === selectedAlbum)?.name || 'Unknown Album'}
            </span>
          </p>
        </div>
      </div>
    )}

    {favourites.length > 0 ? (
      <section aria-labelledby="favourites-section">
        <h2 id="favourites-section" className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Heart className="h-6 w-6 mr-2 text-red-500 fill-red-500" aria-hidden="true" />
          ❤️ My Favourites ({favourites.length})
        </h2>
        {!shouldShowMedia && <PrivateMediaNotice />}
        <MediaGrid 
          media={favourites} 
          showDelete={false}  
          uploaderId={uploaderId} 
          eventId={eventId}
          onMediaUpdate={onMediaUpdate}
          allowLikes={true} 
          bulkAction="download" 
        />
      </section>
    ) : (
      <EmptyFavouritesState eventName={eventName} />
    )}
  </div>
);