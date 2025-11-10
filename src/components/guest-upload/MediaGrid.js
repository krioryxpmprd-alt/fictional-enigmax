import React, { memo, useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Trash2, User, ChevronLeft, ChevronRight, X, Download, Heart } from 'lucide-react';
import Image from 'next/image';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getMediaWithLikes, likeMedia, unlikeMedia } from './hooks/api';
import './styles.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// ------------------ Toast ------------------
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg animate-fadeIn z-[999]">
    {message}
    <button onClick={onClose} className="ml-2 text-white/80 hover:text-white font-bold">×</button>
  </div>
);

// ------------------ Loading Spinner ------------------
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
  </div>
);

// ------------------ Image Icon ------------------
const ImageIcon = ({ className = "h-8 w-8" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

// ------------------ Media Card ------------------
const MediaCard = memo(({ item, showDelete, confirmDelete, uploaderId, onClick, onLike, allowLikes, selectMode,
  selectedItems,
  setSelectedItems }) => {
  const effectiveMediaType = item.media_type === 'voice' ? 'audio' : item.media_type;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const stableUrl = useMemo(() => item.stableUrl || item.cloudinary_url?.split('?')[0], [
    item.stableUrl,
    item.cloudinary_url,
  ]);

  const altText = useMemo(() => {
    const mediaType =
      item.media_type === 'photo'
        ? 'Photo'
        : item.media_type === 'video'
        ? 'Video'
        : 'Audio';
    const author = item.author_name || 'Guest';
    return `${mediaType} by ${author} from the event`;
  }, [item.media_type, item.author_name]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!uploaderId) return;
    onLike && onLike(item.id, !item.is_liked);
  };

  const handleSingleDownload = async (e) => {
  e.stopPropagation(); // prevent modal opening
  const url = item.cloudinary_url || item.stableUrl;
  if (!url) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;

    const ext =
      item.media_type === "photo" ? "jpg" :
      item.media_type === "video" ? "mp4" :
      "wav";

    link.download = `memorybox-${item.author_name || "guest"}-${item.id}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (err) {
    console.error(err);
    alert("Failed to download media");
  }
};

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => { setImageError(true); setImageLoaded(true); };

  return (
    <div
      className="aspect-square rounded-xl overflow-hidden relative group bg-white shadow-md hover:shadow-lg transition-all cursor-pointer"
      onClick={() => onClick && onClick(item)}
    >
      {effectiveMediaType === 'photo' ? (
        <div className="relative w-full h-full">
          {!imageLoaded && <LoadingSpinner />}
          <Image
            src={stableUrl || '/placeholder-image.jpg'}
            alt={altText}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            width={400}
            height={400}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/placeholder-image.jpg"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
              <div className="text-gray-400 text-sm text-center">
                <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                Failed to load image
              </div>
            </div>
          )}
        </div>
      ) : effectiveMediaType === 'video' ? (
        <div className="relative w-full h-full">
          <video src={stableUrl} className="w-full h-full object-cover" preload="metadata" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/90 hover:bg-white text-black rounded-full p-4 shadow-lg transition-transform duration-200 hover:scale-105">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <audio src={stableUrl} preload="metadata" />
          <div className="w-full h-full bg-gradient-to-br from-pink-400 to-rose-300" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/90 hover:bg-white text-pink-600 rounded-full p-4 shadow-lg transition-transform duration-200 hover:scale-105">
              <Mic className="h-6 w-6" />
            </div>
          </div>
        </div>
      )}

      {/* Like Button */}
      {(!showDelete || allowLikes) && (
        <button
          onClick={handleLikeClick}
          className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label={item.is_liked ? "Unlike this media" : "Like this media"}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${item.is_liked ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:scale-110'}`}
          />
        </button>
        
      )}
<button
  onClick={handleSingleDownload}
  className="absolute bottom-2 right-2 bg-white/30 hover:bg-white/50 text-black p-2 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm z-[999]"
  aria-label="Download media"
>
  <Download className="h-4 w-4" />
</button>
      {showDelete && item.uploader_id === uploaderId && (
        <button
          onClick={(e) => { e.stopPropagation(); confirmDelete(item.id); }}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-90 hover:opacity-100 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      {selectMode && (
  <div
    className="absolute top-2 right-2 bg-white/90 border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      const id = item.id;
      setSelectedItems(prev =>
        prev.includes(id)
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    }}
  >
    {selectedItems.includes(item.id) && (
      <div className="bg-blue-500 w-3 h-3 rounded-sm"></div>
    )}
  </div>
)}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <p className="text-sm truncate">{item.author_name}</p>
        </div>
        <p className="text-xs opacity-80 mt-1">
          {new Date(item.created_at).toLocaleDateString()} ·{' '}
          {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
});

MediaCard.displayName = 'MediaCard';

// ------------------ Media Grid ------------------
const MediaGrid = memo(({ media = [], showDelete, confirmDelete, uploaderId, eventId, onMediaUpdate, allowLikes = false, bulkAction }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [toast, setToast] = useState(null);
  const [mediaItems, setMediaItems] = useState(media);
  const parentRef = useRef(null);
  const [columnCount, setColumnCount] = useState(4);
   const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => setMediaItems(media), [media]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(4);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // ------------------ Virtualizer ------------------
  const rowVirtualizer = useVirtualizer({
    count: mediaItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => parentRef.current ? parentRef.current.clientWidth / columnCount : 200,
    overscan: 8,
  });

  const sortedMedia = useMemo(() => [...mediaItems].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)), [mediaItems]);

  // ------------------ Like Handler ------------------
  const handleLike = useCallback(async (mediaId, likeState) => {
    if (!uploaderId) {
      setToast("Please refresh the page to enable liking");
      return;
    }

    const originalMediaItems = [...mediaItems];
    const updatedMedia = mediaItems.map(item =>
      item.id === mediaId
        ? { ...item, likes_count: item.likes_count + (likeState ? 1 : -1), is_liked: likeState }
        : item
    );
    setMediaItems(updatedMedia);

    try {
      if (likeState) await likeMedia(mediaId, uploaderId);
      else await unlikeMedia(mediaId, uploaderId);

      if (onMediaUpdate) {
        const changedItem = updatedMedia.find(item => item.id === mediaId);
        onMediaUpdate(changedItem, likeState);
      }
    } catch (err) {
      setMediaItems(originalMediaItems);
      console.error(err);
      setToast(`Failed to ${likeState ? 'like' : 'unlike'} media`);
    }
  }, [mediaItems, uploaderId, onMediaUpdate]);

  const selectedItem = selectedIndex !== null ? sortedMedia[selectedIndex] : null;

  // ------------------ Download ------------------
  const handleDownload = async () => {
    if (!selectedItem) return;
    const url = selectedItem.cloudinary_url || selectedItem.stableUrl;
    if (!url) return;

    try {
      setToast("Downloading...");
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download file');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const ext = selectedItem.media_type === 'photo' ? 'jpg' :
                  selectedItem.media_type === 'video' ? 'mp4' : 'wav';
      link.download = `memorybox-${selectedItem.author_name}-${Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error(error);
      setToast("Download failed. Please try again.");
    }
  };


  const handleBulkDownload = async (selectedIds) => {
  if (!selectedIds.length) return;
  const selectedMedia = media.filter(item => selectedIds.includes(item.id));
  if (!selectedMedia.length) return;

  setToast(`Preparing ${selectedMedia.length} file${selectedMedia.length > 1 ? 's' : ''}...`);

  const zip = new JSZip();

  try {
    // Limit concurrency to avoid overloading the browser
    const concurrency = 3;
    let active = 0;
    let index = 0;

    const fetchAndAdd = async (item) => {
      try {
        const url = item.cloudinary_url?.split('?')[0] || item.stableUrl;
        if (!url) return;
        const response = await fetch(url);
        const blob = await response.blob();

        // Derive filename and extension
        const ext =
          item.media_type === 'photo' ? 'jpg' :
          item.media_type === 'video' ? 'mp4' :
          'wav';

        const filename = `memorybox-${item.author_name || 'guest'}-${item.id}.${ext}`;
        zip.file(filename, blob);
      } catch (error) {
        console.warn(`Failed to download ${item.id}`, error);
      }
    };

    // Concurrency control loop
    const queue = [];
    while (index < selectedMedia.length || active > 0) {
      while (active < concurrency && index < selectedMedia.length) {
        const item = selectedMedia[index++];
        active++;
        fetchAndAdd(item).then(() => active--);
      }
      await new Promise(r => setTimeout(r, 200));
    }

    setToast("Zipping files...");
    const blob = await zip.generateAsync({ type: 'blob' });
    const zipName = `memorybox-download-${new Date().toISOString().slice(0,10)}.zip`;
    saveAs(blob, zipName);
    setToast("Download started!");
  } catch (error) {
    console.error(error);
    setToast("Failed to prepare download. Please try again.");
  }
};




  // ------------------ Delete from Modal ------------------
  const handleDeleteFromModal = () => {
    if (!selectedItem) return;
    confirmDelete(selectedItem.id);
    setSelectedIndex(null); // Close the modal after deletion
  };

  // ------------------ Navigation ------------------
  const handleNavigate = (direction) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + direction;
    if (newIndex < 0) return;
    if (newIndex >= sortedMedia.length) { setToast("You've reached the end."); return; }
    setSelectedIndex(newIndex);
  };

  

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && selectMode) {
      setSelectMode(false);
      setSelectedItems([]);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectMode]);

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
{bulkAction && (
  <div className="flex items-center justify-between mb-4 px-4">
    {!selectMode ? (
      <button
        onClick={() => setSelectMode(true)}
        className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
      >
        Select Items
      </button>
    ) : (
      <div className="flex items-center gap-3">
  {bulkAction === "delete" && (
    <button
      onClick={() => {
        confirmDelete(selectedItems.map(id => media.find(i => i.id === id)));
        setSelectedItems([]);
        setSelectMode(false);
      }}
      disabled={selectedItems.length === 0}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        selectedItems.length > 0
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      }`}
    >
      Delete Selected ({selectedItems.length})
    </button>
  )}

  {bulkAction === "download" && (
    <button
      onClick={() => handleBulkDownload(selectedItems)}
      disabled={selectedItems.length === 0}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        selectedItems.length > 0
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      }`}
    >
      Download Selected ({selectedItems.length})
    </button>
  )}

  <button
    onClick={() => {
      setSelectedItems([]);
      setSelectMode(false);
    }}
    className="px-3 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition"
  >
    Cancel
  </button>
</div>
    )}
  </div>
)}
      <div ref={parentRef} className="h-screen overflow-auto grid gap-4 p-4" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const item = sortedMedia[virtualRow.index];
          if (!item) return null;
          return (
            <div key={item.id} style={{ minHeight: 0 }}>
              <MediaCard
                item={item}
                showDelete={showDelete}
                confirmDelete={confirmDelete}
                uploaderId={uploaderId}
                onLike={(!showDelete || allowLikes) ? handleLike : null}
                allowLikes={allowLikes}
                onClick={() => {
  if (selectMode) {
    const id = item.id;
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  } else {
    setSelectedIndex(virtualRow.index);
  }
}}
onTouchStart={(e) => {
  // 🟢 Detect long press on mobile to enable selection
  let timer = setTimeout(() => {
    setSelectMode(true);
    setSelectedItems([item.id]);
  }, 600);
  const clear = () => clearTimeout(timer);
  e.target.addEventListener('touchend', clear, { once: true });
  e.target.addEventListener('touchmove', clear, { once: true });
}}
selectMode={selectMode}
  selectedItems={selectedItems}
  setSelectedItems={setSelectedItems}
              />
            </div>
          );
        })}
      </div>

      {/* Selected Media Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
          {/* Action Buttons */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            {/* Download Button */}
            <button 
              onClick={handleDownload} 
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Download media"
            >
              <Download className="h-6 w-6" />
            </button>
            
            {/* Delete Button - Only show if user owns the media and showDelete is true */}
            {showDelete && selectedItem.uploader_id === uploaderId && (
              <button 
                onClick={handleDeleteFromModal} 
                className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Delete media"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setSelectedIndex(null)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={() => handleNavigate(-1)} 
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition hover:scale-110 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Media Content */}
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center animate-zoomIn">
            {selectedItem.media_type === 'photo' ? (
              <Image 
                src={selectedItem.cloudinary_url} 
                alt="Media" 
                width={1000} 
                height={1000} 
                style={{ width: '100%', height: 'auto' }} 
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl" 
              />
            ) : selectedItem.media_type === 'video' ? (
              <video 
                src={selectedItem.cloudinary_url} 
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl" 
                controls 
                autoPlay={false}
              />
            ) : (
              <div className="bg-gradient-to-br from-pink-400 to-rose-300 rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center justify-center space-y-6">
                <div className="bg-white/20 rounded-full p-6">
                  <Mic className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold">Voice Message</h3>
                <audio src={selectedItem.cloudinary_url} controls className="w-full" autoPlay={false} />
                <p className="text-white/80 text-sm text-center">From: {selectedItem.author_name}</p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button 
            onClick={() => handleNavigate(1)} 
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition hover:scale-110 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
});

MediaGrid.displayName = 'MediaGrid';
export default MediaGrid;