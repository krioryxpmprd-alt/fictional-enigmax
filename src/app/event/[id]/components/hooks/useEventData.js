import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; 

export const useEventData = (eventId) => {
  const { token } = useAuth();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  
  // UI State
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');
  
  // Selection State
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    if (token) {
      fetchEventData();
    }
  }, [eventId, token]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      
      const eventRes = await axios.get(`${API}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvent(eventRes.data);
      
      const [mediaRes, messagesRes, albumsRes] = await Promise.all([
        axios.get(`${API}/uploads/admin/event/${eventId}/media-with-favorites`, {
  headers: { Authorization: `Bearer ${token}` },
}).catch(handleFetchError('media')),
        axios.get(`${API}/uploads/event/${eventId}/messages`).catch(handleFetchError('messages')),
        axios.get(`${API}/uploads/events/${eventId}/albums`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(handleFetchError('albums'))
      ]);

      setMedia(mediaRes.data);
      setMessages(messagesRes.data);
      setAlbums(albumsRes.data);
      
    } catch (error) {
      console.error('Error fetching event data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load event data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchError = (type) => (error) => {
    console.error(`Error fetching ${type}:`, error);
    toast({
      title: 'Warning',
      description: `Could not load ${type}`,
      variant: 'destructive'
    });
    return { data: [] };
  };

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${API}/uploads/events/${eventId}/albums`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleDownloadAll = () => {
    const photos = media.filter(m => m.media_type === 'photo');
    toast({
      title: 'Download Started',
      description: `Preparing ${photos.length} files for download...`,
    });
  };

  const handleShare = () => {
    const url = event?.upload_link || `${window.location.origin}/upload/${eventId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied',
      description: 'Upload link copied to clipboard!',
    });
  };

  const toggleMediaVisibility = async () => {
    try {
      const response = await axios.patch(
        `${API}/events/${eventId}`,
        { show_media_publicly: !event.show_media_publicly },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setEvent(response.data);
      toast({
        title: 'Settings Updated',
        description: `Media is now ${response.data.show_media_publicly ? 'visible' : 'hidden'} to guests`,
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive'
      });
    }
  };

  const handleActivateEvent = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentClose = (success) => {
    setIsPaymentModalOpen(false);
    if (success) {
      fetchEventData();
      toast({
        title: 'Event Activated!',
        description: 'Your event is now active and ready to collect memories.',
      });
    }
  };

  const handleDeleteClick = (item, e) => {
    e?.stopPropagation();
    setMediaToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateAlbum = async () => {
    try {
      const response = await axios.post(`${API}/uploads/albums`, {
        event_id: eventId,
        name: newAlbumName,
        description: newAlbumDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAlbums([response.data, ...albums]);
      setNewAlbumName('');
      setNewAlbumDescription('');
      setIsCreateAlbumOpen(false);
      toast({
        title: 'Success',
        description: 'Album created successfully',
      });
    } catch (error) {
      console.error('Error creating album:', error);
      toast({
        title: 'Error',
        description: 'Failed to create album',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(`${API}/uploads/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAlbums(albums.filter(album => album.id !== albumId));
      if (selectedAlbum === albumId) {
        setSelectedAlbum(null);
      }
      
      toast({
        title: 'Success',
        description: 'Album deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting album:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete album',
        variant: 'destructive'
      });
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedMedia([]);
      setSelectedMessages([]);
    }
  };

  const toggleMediaSelection = (mediaItem) => {
    if (selectedMedia.some(item => item.id === mediaItem.id)) {
      setSelectedMedia(selectedMedia.filter(item => item.id !== mediaItem.id));
    } else {
      setSelectedMedia([...selectedMedia, mediaItem]);
    }
  };

  const toggleMessageSelection = (message) => {
    if (selectedMessages.some(item => item.id === message.id)) {
      setSelectedMessages(selectedMessages.filter(item => item.id !== message.id));
    } else {
      setSelectedMessages([...selectedMessages, message]);
    }
  };

  const selectAllCurrentTab = () => {
    const photos = media.filter(m => m.media_type === 'photo');
    const videos = media.filter(m => m.media_type === 'video');
    const voiceMessages = media.filter(m => m.media_type === 'voice');

    if (activeTab === 'photos') {
      if (selectedMedia.length === photos.length) {
        setSelectedMedia([]);
      } else {
        setSelectedMedia([...photos]);
      }
    } else if (activeTab === 'videos') {
      if (selectedMedia.length === videos.length) {
        setSelectedMedia([]);
      } else {
        setSelectedMedia([...videos]);
      }
    } else if (activeTab === 'voice') {
      if (selectedMedia.length === voiceMessages.length) {
        setSelectedMedia([]);
      } else {
        setSelectedMedia([...voiceMessages]);
      }
    } else if (activeTab === 'messages') {
      if (selectedMessages.length === messages.length) {
        setSelectedMessages([]);
      } else {
        setSelectedMessages([...messages]);
      }
    }
  };

  const getCurrentTabItemsCount = () => {
    const photos = media.filter(m => m.media_type === 'photo');
    const videos = media.filter(m => m.media_type === 'video');
    const voiceMessages = media.filter(m => m.media_type === 'voice');

    if (activeTab === 'photos') return photos.length;
    if (activeTab === 'videos') return videos.length;
    if (activeTab === 'voice') return voiceMessages.length;
    if (activeTab === 'messages') return messages.length;
    return 0;
  };

  const getSelectedItemsCount = () => {
    if (activeTab === 'photos' || activeTab === 'videos' || activeTab === 'voice') return selectedMedia.length;
    if (activeTab === 'messages') return selectedMessages.length;
    return 0;
  };

  const handleDeleteMedia = async () => {
    if (!mediaToDelete) return;

    setDeleting(true);

    try {
      const itemsToDeleteArray = Array.isArray(mediaToDelete) ? mediaToDelete : [mediaToDelete];
      
      let successCount = 0;
      let errorCount = 0;

      const affectedAlbumIds = new Set();
      
      itemsToDeleteArray.forEach(item => {
        if (item.album_id) {
          affectedAlbumIds.add(item.album_id);
        }
      });

      for (const item of itemsToDeleteArray) {
        try {
          if (activeTab === 'messages') {
            await axios.delete(
              `${API}/uploads/admin/messages/${item.id}`,
              {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
              }
            );
          } else {
            await axios.delete(
              `${API}/uploads/admin/media/${item.id}`,
              {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
              }
            );
          }
          successCount++;
        } catch (error) {
          console.error(`Error deleting item ${item.id}:`, error);
          errorCount++;
        }
      }

      if (activeTab === 'messages') {
        const deletedIds = itemsToDeleteArray.map(item => item.id);
        setMessages(messages.filter(m => !deletedIds.includes(m.id)));
        setSelectedMessages([]);
      } else {
        const deletedIds = itemsToDeleteArray.map(item => item.id);
        setMedia(media.filter(m => !deletedIds.includes(m.id)));

        if (event) {
          const deletedPhotos = itemsToDeleteArray.filter(item => item.media_type === 'photo').length;
          const deletedVideos = itemsToDeleteArray.filter(item => item.media_type === 'video').length;
          const deletedVoice = itemsToDeleteArray.filter(item => item.media_type === 'voice').length;
          
          setEvent({
            ...event,
            photo_count: Math.max(0, event.photo_count - deletedPhotos),
            video_count: Math.max(0, event.video_count - deletedVideos),
            message_count: Math.max(0, event.message_count - deletedVoice)
          });
        }
        setSelectedMedia([]);
      }

      if (affectedAlbumIds.size > 0) {
        await fetchAlbums();
      }

      if (successCount > 0) {
        toast({
          title: 'Success',
          description: `Successfully deleted ${successCount} item${successCount !== 1 ? 's' : ''}${errorCount > 0 ? ` (${errorCount} failed)` : ''}`,
        });
      }

      if (errorCount > 0) {
        toast({
          title: 'Partial Failure',
          description: `Failed to delete ${errorCount} item${errorCount !== 1 ? 's' : ''}`,
          variant: 'destructive'
        });
      }

      setIsDeleteDialogOpen(false);
      setMediaToDelete(null);
      setIsSelectMode(false);

    } catch (error) {
      console.error('Error in delete operation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete items',
        variant: 'destructive'
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleSingleDownload = async (mediaItem) => {
  try {
    const response = await fetch(mediaItem.url, { mode: 'cors' });
    const blob = await response.blob();
    const ext =
      mediaItem.media_type === 'photo'
        ? 'jpg'
        : mediaItem.media_type === 'video'
        ? 'mp4'
        : 'mp3';
    const filename = `${mediaItem.public_id || mediaItem.id}.${ext}`;

    saveAs(blob, filename);
  } catch (error) {
    console.error('Single download failed:', error);
    toast({
      title: 'Download Failed',
      description: `Could not download ${mediaItem.public_id}`,
      variant: 'destructive',
    });
  }
};

const handleBulkDownload = async (selectedIds) => {
  if (!selectedIds.length) return;

  const selectedMediaItems = media.filter(item => selectedIds.includes(item.id));
  if (!selectedMediaItems.length) return;

  toast({
    title: 'Preparing files...',
    description: `Downloading ${selectedMediaItems.length} file${selectedMediaItems.length > 1 ? 's' : ''}...`
  });

  // Detect mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const zip = isMobile ? null : new JSZip();
  const concurrency = 3;
  let active = 0;
  let index = 0;

  const fetchAndAdd = async (item) => {
    try {
      const url = item.cloudinary_url || item.stableUrl || item.url;
      if (!url) return;

      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob = await response.blob();
      const mime = blob.type || 'image/jpeg';
      const ext =
        item.media_type === 'photo'
          ? mime.includes('png') ? 'png' : 'jpg'
          : item.media_type === 'video'
          ? 'mp4'
          : 'wav';

      const filename = `memorybox-${item.author_name || 'guest'}-${item.id}.${ext}`;

      if (isMobile) {
        // Download files individually on mobile
        saveAs(blob, filename);
      } else {
        // Add to ZIP on desktop
        zip.file(filename, blob);
      }
    } catch (error) {
      console.warn(`Failed to download ${item.id}`, error);
    }
  };

  try {
    // Concurrency-controlled download loop
    while (index < selectedMediaItems.length || active > 0) {
      while (active < concurrency && index < selectedMediaItems.length) {
        const item = selectedMediaItems[index++];
        active++;
        fetchAndAdd(item).finally(() => active--);
      }
      await new Promise(r => setTimeout(r, 200));
    }

    if (!isMobile) {
      toast({ title: 'Creating ZIP...', description: 'Please wait a moment.' });

      const blob = await zip.generateAsync({ type: 'blob' });
      const zipName = `memorybox-download-${new Date().toISOString().slice(0,10)}.zip`;
      saveAs(blob, zipName);
    }

    toast({
      title: 'Download ready!',
      description: isMobile
        ? 'All files have been downloaded individually.'
        : 'Your files have been zipped and ready to download.'
    });
  } catch (error) {
    console.error('Bulk download error:', error);
    toast({
      title: 'Download Failed',
      description: 'Something went wrong while downloading files.',
      variant: 'destructive'
    });
  }
};


  return {
    event,
    loading,
    media,
    setMedia,
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
  };
};