'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import axios from 'axios'; 

// Import components
import UploadModal from '@/components/guest-upload/UploadModal';
import ContentSection from '@/components/guest-upload/ContentSection';
import TemplateRenderer from '@/components/guest-upload/TemplateRenderer';
import DeleteDialog from '@/app/event/[id]/components/DeleteDialog';
import LoadingSpinner from '@/components/guest-upload/LoadingSpinner';
import EventNotFound from '@/components/guest-upload/EventNotFound';

// Import hooks
import { useEventData } from '@/hooks/use-event-data'; 
import { useUploaderId } from '@/hooks/use-uploader-id';

// Import constants
import { TEMPLATES, API } from '@/lib/constants/templates';

const GuestUploadPage = () => {
  const { eventId } = useParams();
  const uploaderId = useUploaderId();
   
  const [step, setStep] = useState('type');
  const [guestInfo, setGuestInfo] = useState({ name: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('liveFeed');
  const [mediaToDelete, setMediaToDelete] = useState(null);
  const [uploadType, setUploadType] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Custom hooks
  const {
    event,
    existingMedia,
    existingMessages,
    myUploads,
    albums,
    loading,
    refreshing,
    fetchEventData,
    setExistingMedia,
    setExistingMessages,
    setMyUploads,
    setAlbums
  } = useEventData(eventId, uploaderId);

  // Memoized values
  const stableExistingMedia = useMemo(() => {
    return existingMedia.map(item => ({
      ...item,
      stableUrl: item.cloudinary_url?.split('?')[0] || item.cloudinary_url
    }));
  }, [existingMedia]);

  const stableMyUploads = useMemo(() => {
    return myUploads.map(item => ({
      ...item,
      stableUrl: item.cloudinary_url?.split('?')[0] || item.cloudinary_url,
    }));
  }, [myUploads]);

  const shouldShowMedia = event?.show_media_publicly;

  // Helper function for upload type text
  const getUploadTypeText = (type) => {
    const types = {
      'media': 'media',
      'message': 'message', 
      'voice': 'voice message'
    };
    return types[type] || type;
  };

  // SEO optimization - combined useEffect hooks
  useEffect(() => {
    if (!event) return;

    try {
      // Document title and meta description
      const tabTitles = {
        'liveFeed': `Gallery - ${event.name}`,
        'myUploads': `My Uploads - ${event.name}`
      };
      document.title = tabTitles[activeTab] || `Gallery - ${event.name}`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Gallery for ${event.name}. ${activeTab === 'liveFeed' 
            ? 'View all photos and messages from guests.' 
            : 'Overview of your personal uploads.'}`
        );
      }

      // Structured Data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.name,
        "description": `Photo sharing gallery for the event: ${event.name}`,
        "startDate": event.date,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": event.location || "Event Location"
        },
        "image": event.cover_image ? [event.cover_image] : []
      };

      // Remove old structured data scripts
      const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => {
        if (script.textContent.includes('"@type": "Event"')) {
          document.head.removeChild(script);
        }
      });

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Open Graph tags
      const updateOrCreateMeta = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateOrCreateMeta('og:title', `${event.name} - Event Gallery`);
      updateOrCreateMeta('og:description', `Shared photos and messages from ${event.name}`);
      updateOrCreateMeta('og:type', 'website');
      updateOrCreateMeta('og:image', event.cover_image || '/default-event-image.jpg');
      updateOrCreateMeta('og:url', window.location.href);

    } catch (error) {
      console.error('Error in SEO optimization:', error);
    }
  }, [event, activeTab]);

  // Event handlers
  const handleRefreshFeed = async () => {
    await fetchEventData(true);
    setLastRefresh(Date.now());
    toast({
      title: 'Gallery Updated',
      description: 'Content refreshed with the latest photos and messages.',
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording Error',
        description: 'Cannot access microphone. Please check permissions.',
        variant: 'destructive'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

const handleUpload = async (e) => {
  e.preventDefault();

  if (uploadType === 'media' && selectedFiles.length === 0) {
    toast({
      title: 'No files selected',
      description: 'Please select at least one file to upload',
      variant: 'destructive'
    });
    return;
  }

  if (uploadType === 'message' && !message.trim()) {
    toast({
      title: 'No message',
      description: 'Please enter a message',
      variant: 'destructive'
    });
    return;
  }

  if (uploadType === 'voice' && !audioBlob) {
    toast({
      title: 'No recording',
      description: 'Please record a voice message',
      variant: 'destructive'
    });
    return;
  }

  setUploading(true);

  try {
    let uploadedItems = [];

    if (uploadType === 'media') {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('event_id', eventId);
        formData.append('author_name', isAnonymous ? 'Anonymous' : (guestInfo.name || 'Guest'));
        formData.append('uploader_id', uploaderId);
        if (selectedAlbum) formData.append('album_id', selectedAlbum);

        try {
          const response = await axios.post(`${API}/uploads/media`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 30000
          });
          uploadedItems.push(response.data);
        } catch (fileError) {
          console.error('❌ Failed to upload file:', fileError);
          let errorMessage = 'File upload failed';
          const data = fileError.response?.data;
          if (data) {
            if (typeof data === 'string') errorMessage = data;
            else if (data.detail) errorMessage = data.detail;
            else if (Array.isArray(data)) errorMessage = data.map(err => err.msg || err.message).join(', ');
            else if (data.message) errorMessage = data.message;
            else errorMessage = JSON.stringify(data);
          }
          throw new Error(errorMessage);
        }
      }
    }

    if (uploadType === 'message') {
      const response = await axios.post(`${API}/uploads/message`, {
        event_id: eventId,
        author_name: isAnonymous ? 'Anonymous' : (guestInfo.name || 'Guest'),
        uploader_id: uploaderId,
        message: message
      });
      uploadedItems = [response.data];
    }

    if (uploadType === 'voice') {
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice-message.wav');
      formData.append('event_id', eventId);
      formData.append('author_name', isAnonymous ? 'Anonymous' : (guestInfo.name || 'Guest'));
      formData.append('uploader_id', uploaderId);
      formData.append('media_type', 'voice');

      const response = await axios.post(`${API}/uploads/media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });
      uploadedItems = [response.data];
    }
 
    await fetchEventData(true);
    
    if (selectedAlbum) {
      const albumsResponse = await axios.get(`${API}/uploads/events/${eventId}/albums`);
      setAlbums(albumsResponse.data);
    }

    setStep('success');
    toast({
      title: 'Upload Successful!',
      description: `Your ${getUploadTypeText(uploadType)} has been uploaded successfully.`,
    });

  } catch (error) {
    console.error('❌ Upload error details:', error);
    let errorMessage = 'Upload failed';
    const data = error.response?.data;
    if (data) {
      if (typeof data === 'string') errorMessage = data;
      else if (data.detail) errorMessage = data.detail;
      else if (Array.isArray(data)) errorMessage = data.map(err => err.msg || err.message).join(', ');
      else if (data.message) errorMessage = data.message;
      else errorMessage = JSON.stringify(data);
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.code === 'NETWORK_ERROR') {
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.code === 'TIMEOUT') {
      errorMessage = 'Upload timed out. Please try again.';
    }

    toast({
      title: 'Upload Failed',
      description: errorMessage,
      variant: 'destructive'
    });
  } finally {
    setUploading(false);
  }
};

const handleDeleteMedia = async (mediaIds) => {
  // Accept single ID or array of IDs
  const ids = Array.isArray(mediaIds) ? mediaIds : [mediaIds];

  try {
    // Delete each media item in parallel
    await Promise.all(
      ids.map(id =>
        axios.delete(`${API}/uploads/media/${id}`, {
          params: { uploader_id: uploaderId },
        })
      )
    );

    toast({
      title: 'Successfully Deleted',
      description:
        ids.length > 1
          ? `${ids.length} items were deleted.`
          : 'Content has been successfully deleted.',
    });

    setMediaToDelete(null);

    // Update all states
    setMyUploads(prev => prev.filter(item => !ids.includes(item.id)));
    setExistingMedia(prev => prev.filter(item => !ids.includes(item.id)));

    // Update albums if needed
    const deletedWithAlbums = myUploads.filter(
      item => ids.includes(item.id) && item.album_id
    );
    if (deletedWithAlbums.length > 0) {
      const albumsResponse = await axios.get(
        `${API}/uploads/events/${eventId}/albums`
      );
      setAlbums(albumsResponse.data);
    }
  } catch (error) {
    console.error('Delete error:', error);
    const errorMessage =
      typeof error.response?.data?.detail === 'string'
        ? error.response.data.detail
        : 'Failed to delete content';
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};


  const handleDeleteMessage = async (messageId) => {
  try {
    await axios.delete(`${API}/uploads/messages/${messageId}`, {
      params: { uploader_id: uploaderId }
    });
    
    toast({
      title: 'Successfully Deleted',
      description: 'Message has been successfully deleted.',
    });
    setMediaToDelete(null);
    
    // Update messages state
    setMyUploads(prev => prev.filter(item => item.id !== messageId));
    setExistingMessages(prev => prev.filter(item => item.id !== messageId));
    
  } catch (error) {
    console.error('Delete error:', error);
    const errorMessage = typeof error.response?.data?.detail === 'string' 
      ? error.response.data.detail 
      : 'Failed to delete message';
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive'
    });
  }
};


  const handleCloseModal = () => {
    setShowUploadModal(false);
    setStep('type');
    setSelectedFiles([]);
    setMessage('');
    setGuestInfo({ name: '' });
    setUploadType('');
    setAudioBlob(null);
    setRecording(false);
    setSelectedAlbum('');
  };

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
    setStep('type');
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleGuestInfoChange = (newInfo) => {
    setGuestInfo(newInfo);
  };

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  const handleUploadTypeChange = (type) => {
    setUploadType(type);
  };

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
  };

 const confirmDelete = (itemOrIds, itemType = 'media') => {
  if (Array.isArray(itemOrIds)) {
    setMediaToDelete(itemOrIds); // Pass array to dialog
    return;
  }

  const itemId = typeof itemOrIds === 'string' ? itemOrIds : itemOrIds.id;
  setMediaToDelete({ id: itemId, type: itemType });
};

  const cancelDelete = () => {
    setMediaToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Check if event exists and has date_format
    if (!event || !event.date_format) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }

    if (event.date_format === 'MM/DD/YYYY') {
      return date.toLocaleDateString('en-US');
    } else if (event.date_format === 'DD/MM/YYYY') {
      return date.toLocaleDateString('en-GB');
    } else {
      // Default to US format
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Loading state with SEO optimization
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <EventNotFound />;
  }

  const template = TEMPLATES[event.page_template] || TEMPLATES.classic;
  const customFont = event.font_family || template.fontFamily;

  return (
    <>
      <TemplateRenderer
        template={template}
        customFont={customFont}
        event={event}
        formatDate={formatDate}
        handleOpenUploadModal={handleOpenUploadModal}
      >
        <ContentSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          shouldShowMedia={shouldShowMedia}
          existingMedia={stableExistingMedia}
          existingMessages={existingMessages}
          myUploads={stableMyUploads}
          uploaderId={uploaderId}
          handleRefreshFeed={handleRefreshFeed}
          refreshing={refreshing}
          lastRefresh={lastRefresh}
          step={step}
          uploadType={uploadType}
          confirmDelete={confirmDelete}
          event={event}
          handleOpenUploadModal={handleOpenUploadModal}
        />
      </TemplateRenderer>

      {showUploadModal && (
        <UploadModal
          step={step}
          guestInfo={guestInfo}
          selectedFiles={selectedFiles}
          message={message}
          uploading={uploading}
          onClose={handleCloseModal}
          onFileSelect={handleFileSelect}
          onRemoveFile={removeFile}
          onUpload={handleUpload}
          onStepChange={handleStepChange}
          onGuestInfoChange={handleGuestInfoChange}
          onMessageChange={handleMessageChange}
          uploadType={uploadType}
          onUploadTypeChange={handleUploadTypeChange}
          isAnonymous={isAnonymous}
          onAnonymousChange={handleAnonymousChange}
          recording={recording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          audioBlob={audioBlob}
          albums={albums}
          selectedAlbum={selectedAlbum}
          onAlbumChange={setSelectedAlbum}
        />
      )}

      <DeleteDialog
  isOpen={!!mediaToDelete}
  onClose={() => setMediaToDelete(null)}
  mediaToDelete={mediaToDelete}
  deleting={false}
  activeTab={activeTab}
  onDelete={async () => {
    if (Array.isArray(mediaToDelete)) {
      await handleDeleteMedia(mediaToDelete.map(item => item.id));
    } else {
      if (mediaToDelete?.type === 'message') {
        await handleDeleteMessage(mediaToDelete.id);
      } else {
        await handleDeleteMedia(mediaToDelete.id);
      }
    }
    setMediaToDelete(null);
  }}
/>
    </>
  );
};

// Error Boundary for better SEO and user experience
const withErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends React.Component {
    state = { hasError: false };
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
      console.error('Error in GuestUploadPage:', error, errorInfo);
    }
    
    render() {
      if (this.state.hasError) {
        return <EventNotFound />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorBoundary(GuestUploadPage);