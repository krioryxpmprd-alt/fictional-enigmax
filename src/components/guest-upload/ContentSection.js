// components/guest-upload/ContentSection.js
import React, { useState, useEffect, useCallback } from 'react';
import { getEventAlbums } from './hooks/api';
import { TabNavigation } from './TabNavigation';
import { LiveFeedTab, MyUploadsTab, FavouritesTab } from './TabComponents';
import { Breadcrumbs, UploadSuccessMessage } from './UIComponents';

const ContentSection = React.memo(({
  activeTab,
  setActiveTab,
  shouldShowMedia,
  existingMedia,
  existingMessages,
  myUploads,
  uploaderId,
  handleRefreshFeed,
  refreshing,
  lastRefresh,
  step,
  uploadType,
  confirmDelete,
  handleOpenUploadModal,
  event
}) => {
  const eventId = event?.id;
  const [media, setMedia] = useState([]);
  const [messages, setMessages] = useState([]);
  const [favourites, setFavourites] = useState([]); 
  const [lastTabChange, setLastTabChange] = useState(Date.now());
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (eventId) {
      const fetchAlbums = async () => {
        try {
          const data = await getEventAlbums(eventId);
          setAlbums(data);
        } catch (err) {
          console.error('Failed to load albums:', err);
        }
      };
      fetchAlbums();
    }
  }, [eventId]);

  // ✅ CRITICAL FIX: Sync ALL local state with parent state changes
  useEffect(() => {
    if (existingMedia && existingMedia.length > 0) {
      setMedia(existingMedia);
      // ✅ Always recalculate favourites from the current existingMedia
      const userFavourites = existingMedia.filter(item => item.is_liked);
      setFavourites(userFavourites);
    } else {
      setMedia([]);
      setFavourites([]);
    }
  }, [existingMedia]);

  useEffect(() => {
    if (existingMessages && existingMessages.length > 0) {
      setMessages(existingMessages);
    } else {
      setMessages([]);
    }
  }, [existingMessages]);

  // ✅ Filter media based on selected album
  useEffect(() => {
    if (!selectedAlbum) {
      setFilteredMedia(media);
      setFilteredMessages(messages);
    } else {
      setFilteredMedia(media.filter(item => item.album_id === selectedAlbum));
      setFilteredMessages(messages.filter(msg => msg.album_id === selectedAlbum));
    }
  }, [selectedAlbum, media, messages]);

  // ✅ Also sync when lastRefresh changes (after uploads/deletes)
  useEffect(() => {
    if (existingMedia) {
      setMedia(existingMedia);
      const userFavourites = existingMedia.filter(item => item.is_liked);
      setFavourites(userFavourites);
    }
  }, [lastRefresh, existingMedia]);

  // ✅ Handle media updates (likes/unlikes)
  const handleMediaUpdate = useCallback((updatedItem, likeState) => {
    console.log('🔄 Media update received:', updatedItem.id, 'likeState:', likeState);
    
    // 1️⃣ Update global media efficiently
    setMedia((prevMedia) =>
      prevMedia.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    // 2️⃣ Update favourites list
    setFavourites((prevFavourites) => {
      if (likeState) {
        // Add to favourites if not already there
        if (!prevFavourites.some((f) => f.id === updatedItem.id)) {
          return [...prevFavourites, updatedItem];
        }
        // Update existing favourite
        return prevFavourites.map((f) =>
          f.id === updatedItem.id ? updatedItem : f
        );
      } else {
        // Remove from favourites
        return prevFavourites.filter((f) => f.id !== updatedItem.id);
      }
    });

    // 3️⃣ Update filtered media (album view)
    setFilteredMedia((prevFiltered) =>
      prevFiltered.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    // 4️⃣ If in Favourites tab and unliked, remove from view
    if (!likeState && activeTab === "favourites") {
      setFilteredMedia((prev) =>
        prev.filter((item) => item.id !== updatedItem.id)
      );
    }
  }, [activeTab]);

  const handleRefresh = async () => {
    if (handleRefreshFeed) {
      await handleRefreshFeed();
    }
    // The parent's handleRefreshFeed will update existingMedia
    // which will then trigger our useEffect to recalculate everything
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLastTabChange(Date.now());
  };

  // Debug: Check what data we're receiving
  useEffect(() => {
    console.log('🔍 ContentSection - existingMedia count:', existingMedia?.length);
    console.log('🔍 ContentSection - favourites count:', favourites.length);
    console.log('🔍 ContentSection - media with likes:', existingMedia?.filter(item => item.is_liked).length);
  }, [existingMedia, favourites]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs eventName={event?.name} activeTab={activeTab} />
      <div className="flex justify-between items-center mb-4">
        <div>
          {albums.length > 0 && (
            <select
              value={selectedAlbum || ''}
              onChange={(e) => setSelectedAlbum(e.target.value || null)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">📁 All Albums</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        shouldShowMedia={shouldShowMedia}
        existingMedia={media}
        existingMessages={messages}
        myUploads={myUploads}
        favourites={favourites}
        handleRefreshFeed={handleRefresh}
        refreshing={refreshing}
        eventName={event?.name}
      />

      <UploadSuccessMessage 
        step={step} 
        activeTab={activeTab} 
        uploadType={uploadType} 
        setActiveTab={setActiveTab} 
        eventName={event?.name}
      />

      {activeTab === 'liveFeed' && (
        <LiveFeedTab
          shouldShowMedia={shouldShowMedia}
          existingMedia={filteredMedia}
          existingMessages={filteredMessages}
          albums={albums}
          selectedAlbum={selectedAlbum}
          lastRefresh={lastTabChange}
          eventName={event?.name}
          uploaderId={uploaderId}
          eventId={eventId}
          onMediaUpdate={handleMediaUpdate}  
        />
      )}

      {activeTab === 'myUploads' && (
        <MyUploadsTab
          myUploads={myUploads}
          shouldShowMedia={shouldShowMedia}
          confirmDelete={confirmDelete}
          uploaderId={uploaderId}
          handleOpenUploadModal={handleOpenUploadModal}
          eventName={event?.name}
          eventId={eventId}
          onMediaUpdate={handleMediaUpdate}
          selectedAlbum={selectedAlbum}
          albums={albums}
        />
      )}

      {activeTab === 'favourites' && (
        <FavouritesTab
          favourites={favourites} // ✅ Now this will always be in sync
          shouldShowMedia={shouldShowMedia}
          uploaderId={uploaderId}
          eventName={event?.name}
          eventId={eventId}
          onMediaUpdate={handleMediaUpdate}
          selectedAlbum={selectedAlbum}
          albums={albums}
        />
      )}
    </div>
  );
});

export default ContentSection;