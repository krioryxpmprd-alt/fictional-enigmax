'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEventData } from './hooks/useEventData';
import EventHeader from './EventHeader';
import EventStats from './EventStats';
import EventTabs from './EventTabs';
import PhotoViewer from './PhotoViewer';
import CreateAlbumDialog from './CreateAlbumDialog';
import QRDialog from './QRDialog';
import DeleteDialog from './DeleteDialog';
import Payment from '@/components/shared/Payment';

const EventDetailContent = ({ eventId }) => {
  const router = useRouter();
  const {
    event,
    loading,
    media,
    messages,
    albums,
    selectedPhoto,
    setSelectedPhoto,
    isQRDialogOpen,
    setIsQRDialogOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    mediaToDelete,
    setMediaToDelete,
    deleting,
    activeTab,
    setActiveTab,
    selectedAlbum,
    setSelectedAlbum,
    isCreateAlbumOpen,
    setIsCreateAlbumOpen,
    newAlbumName,
    setNewAlbumName,
    newAlbumDescription,
    setNewAlbumDescription,
    selectedMedia,
    setSelectedMedia,
    selectedMessages,
    setSelectedMessages,
    isSelectMode,
    setIsSelectMode,
    handleShare,
    handleDownloadAll,
    toggleMediaVisibility,
    handleActivateEvent,
    handlePaymentClose,
    handleDeleteClick,
    handleCreateAlbum,
    handleDeleteAlbum,
    handleDeleteMedia,
    toggleSelectMode,
    toggleMediaSelection,
    toggleMessageSelection,
    selectAllCurrentTab,
    getSelectedItemsCount,
    handleSingleDownload,
    handleBulkDownload,
    setMedia
  } = useEventData(eventId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2adc8]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2b2d2f] mb-2">Event Not Found</h2>
          <Button onClick={() => router.push('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const photos = media.filter(m => m.media_type === 'photo');
  const videos = media.filter(m => m.media_type === 'video');
  const voiceMessages = media.filter(m => m.media_type === 'voice');

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <EventHeader
        event={event}
        eventId={eventId}
        isSelectMode={isSelectMode}
        selectedItemsCount={getSelectedItemsCount()}
        onToggleSelectMode={toggleSelectMode}
        onBulkDelete={() => {
          const selectedCount = getSelectedItemsCount();
          if (selectedCount === 0) return;
          if (activeTab === 'messages') {
            setMediaToDelete(selectedMessages);
          } else {
            setMediaToDelete(selectedMedia);
          }
          setIsDeleteDialogOpen(true);
        }}
        onActivateEvent={handleActivateEvent}
        onToggleVisibility={toggleMediaVisibility}
        onShare={handleShare}
        onDownloadAll={handleDownloadAll}
        onShowQR={() => setIsQRDialogOpen(true)}
        onCustomize={() => router.push(`/event/${eventId}/customize`)} 
  selectedMedia={selectedMedia}
  onBulkDownload={handleBulkDownload}
      />

      <EventStats
        photos={photos}
        videos={videos}
        voiceMessages={voiceMessages}
        messages={messages}
      />

      <EventTabs
        eventId={eventId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        photos={photos}
        videos={videos}
        voiceMessages={voiceMessages}
        messages={messages}
        albums={albums}
        selectedAlbum={selectedAlbum}
        onAlbumChange={setSelectedAlbum}
        isSelectMode={isSelectMode}
        selectedMedia={selectedMedia}
        selectedMessages={selectedMessages}
        onToggleSelectMode={toggleSelectMode}
        onSelectAll={selectAllCurrentTab}
        selectedItemsCount={getSelectedItemsCount()}
        onToggleMediaSelection={toggleMediaSelection}
        onToggleMessageSelection={toggleMessageSelection}
        onDeleteClick={handleDeleteClick}
        onCreateAlbum={() => setIsCreateAlbumOpen(true)}
        onDeleteAlbum={handleDeleteAlbum}
        onSingleDownload={handleSingleDownload}
        onBulkDownload={handleBulkDownload}
        media={media}                // ✅ pass media
        onMediaUpdate={setMedia}       
      />

      {/* Dialogs */}
      <PhotoViewer
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onDelete={handleDeleteClick}
      />

      <CreateAlbumDialog
        isOpen={isCreateAlbumOpen}
        onClose={() => setIsCreateAlbumOpen(false)}
        albumName={newAlbumName}
        albumDescription={newAlbumDescription}
        onAlbumNameChange={setNewAlbumName}
        onAlbumDescriptionChange={setNewAlbumDescription}
        onCreateAlbum={handleCreateAlbum}
      />

      <QRDialog
        isOpen={isQRDialogOpen}
        onClose={() => setIsQRDialogOpen(false)}
        event={event}
        onShare={handleShare}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => !deleting && setIsDeleteDialogOpen(false)}
        mediaToDelete={mediaToDelete}
        deleting={deleting}
        activeTab={activeTab}
        onDelete={handleDeleteMedia}
      />

      {isPaymentModalOpen && (
        <Payment
          isModal={true}
          eventId={eventId}
          eventName={event.name}
          onClose={handlePaymentClose}
        />
      )}
    </div>
  );
};

export default EventDetailContent;