'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GalleryTab from './GalleryTab'; // New GalleryTab
import VoiceTab from './VoiceTab';
import MessagesTab from './MessagesTab';
import FavoritesTab from './FavoritesTab';

const EventTabs = ({
  eventId,
  activeTab,
  onTabChange,
  photos,
  videos,
  voiceMessages,
  messages,
  albums,
  selectedAlbum,
  onAlbumChange,
  isSelectMode,
  selectedMedia,
  selectedMessages,
  onToggleSelectMode,
  onSelectAll,
  selectedItemsCount,
  onToggleMediaSelection,
  onToggleMessageSelection,
  onDeleteClick,
  onCreateAlbum,
  onDeleteAlbum,
  onSingleDownload,
  media,
  onMediaUpdate, 
  onBulkDownload
}) => {

  const handleToggleFavorite = (item) => {
    // Update the media array to sync favorites across all components
    const updatedMedia = media.map((m) =>
      m.id === item.id ? { 
        ...m, 
        is_liked: !m.is_liked,
        is_favorite: !m.is_liked // Keep both fields in sync
      } : m
    );
    
    onMediaUpdate(updatedMedia);
  };

  // Helper function to get favorites count
  const getFavoritesCount = () => {
    return media.filter(m => m.is_liked || m.is_favorite).length;
  };

  // Helper function to get gallery items count (photos + videos)
  const getGalleryCount = () => {
    return photos.length + videos.length;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-5 mb-8">
          <TabsTrigger value="gallery">🖼️ Gallery ({getGalleryCount()})</TabsTrigger>
          <TabsTrigger value="voice">🎤 Voice ({voiceMessages.length})</TabsTrigger>
          <TabsTrigger value="messages">💬 Messages ({messages.length})</TabsTrigger>
          <TabsTrigger value="favorites">⭐ Favorites ({getFavoritesCount()})</TabsTrigger>
        </TabsList>

        {isSelectMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onSelectAll}
                  className="flex items-center space-x-2 px-3 py-2 border border-blue-300 rounded-md text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {selectedItemsCount === getCurrentTabItemsCount() ? (
                    <span>✓ Deselect All</span>
                  ) : (
                    <span>Select All</span>
                  )}
                </button>
                <span className="text-sm text-blue-700">
                  {selectedItemsCount} item{selectedItemsCount !== 1 ? 's' : ''} selected
                </span>
              </div>
              <button
                onClick={onToggleSelectMode}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel Selection
              </button>
            </div>
          </div>
        )}

        <TabsContent value="gallery">
          <GalleryTab
            photos={photos}
            videos={videos}
            albums={albums}
            selectedAlbum={selectedAlbum}
            onAlbumChange={onAlbumChange}
            isSelectMode={isSelectMode}
            selectedMedia={selectedMedia}
            onToggleMediaSelection={onToggleMediaSelection}
            onDeleteClick={onDeleteClick}
            onCreateAlbum={onCreateAlbum}
            onDeleteAlbum={onDeleteAlbum}
            onSingleDownload={onSingleDownload}
            onToggleFavorite={handleToggleFavorite}
            eventId={eventId}
          />
        </TabsContent>

        <TabsContent value="voice">
          <VoiceTab
            voiceMessages={voiceMessages}
            isSelectMode={isSelectMode}
            selectedMedia={selectedMedia}
            onToggleMediaSelection={onToggleMediaSelection}
            onDeleteClick={onDeleteClick}
            onSingleDownload={onSingleDownload}
            onToggleFavorite={handleToggleFavorite}
            eventId={eventId}
          />
        </TabsContent>

        <TabsContent value="messages">
          <MessagesTab
            messages={messages}
            isSelectMode={isSelectMode}
            selectedMessages={selectedMessages}
            onToggleMessageSelection={onToggleMessageSelection}
            onDeleteClick={onDeleteClick}
          />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesTab
            eventId={eventId}
            media={media}
            onMediaUpdate={onMediaUpdate}
            isSelectMode={isSelectMode}
            selectedMedia={selectedMedia}
            onToggleMediaSelection={onToggleMediaSelection}
            onDeleteClick={onDeleteClick}
            onSingleDownload={onSingleDownload}
            onBulkDownload={onBulkDownload}
          />
        </TabsContent>
      </Tabs>
    </main>
  );

  function getCurrentTabItemsCount() {
    if (activeTab === 'gallery') return photos.length + videos.length;
    if (activeTab === 'voice') return voiceMessages.length;
    if (activeTab === 'messages') return messages.length;
    if (activeTab === 'favorites') return getFavoritesCount();
    return 0;
  }
};

export default EventTabs;