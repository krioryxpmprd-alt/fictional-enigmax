'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Image,
  Video,
  Plus,
  Folder,
  FolderOpen,
  MoreVertical,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useAdminFavorites } from '@/app/event/[id]/components/hooks/useAdminFavorites';

const GalleryTab = ({
  photos,
  videos,
  albums,
  selectedAlbum,
  onAlbumChange,
  isSelectMode,
  selectedMedia,
  onToggleMediaSelection,
  onDeleteClick,
  onCreateAlbum,
  onDeleteAlbum,
  onSingleDownload,
  onToggleFavorite,
  eventId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState(null); // 'photo' or 'video'
  const { toast } = useToast();
  
  // Use the favorites hook
  const { toggleFavorite: apiToggleFavorite } = useAdminFavorites(eventId);

  // Combine photos and videos for the gallery
  const allMedia = useMemo(() => {
    const combined = [
      ...photos.map(photo => ({ ...photo, media_type: 'photo' })),
      ...videos.map(video => ({ ...video, media_type: 'video' }))
    ];
    
    // Filter by selected album if any
    return selectedAlbum 
      ? combined.filter(item => item.album_id === selectedAlbum)
      : combined;
  }, [photos, videos, selectedAlbum]);

  const selectedItem = selectedIndex !== null ? allMedia[selectedIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowLeft') handleNavigate(-1);
      if (e.key === 'ArrowRight') handleNavigate(1);
      if (e.key === 'Escape') {
        setSelectedIndex(null);
        setSelectedMediaType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const handleNavigate = (dir) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + dir;

    if (newIndex < 0 || newIndex >= allMedia.length) {
      toast({
        title: "You've reached the end",
        description: 'No more items to view.',
        duration: 3000,
      });
      return;
    }

    setSelectedIndex(newIndex);
  };

  // Fixed handleToggleFavorite that makes API calls
  const handleToggleFavorite = async (item, e) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyFavorite = item.is_liked || item.is_favorite;
    
    try {
      // Make the API call to toggle favorite
      await apiToggleFavorite(item.id, isCurrentlyFavorite);
      
      // Update the local state through the parent
      onToggleFavorite(item);
      
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: 'Error',
        description: 'Could not update favorite status.',
        variant: 'destructive',
      });
    }
  };

  // Handle item click for modal view
  const handleItemClick = (item, index, mediaType) => {
    if (isSelectMode) {
      onToggleMediaSelection(item);
    } else {
      setSelectedIndex(index);
      setSelectedMediaType(mediaType);
    }
  };

  // Get media counts for albums
  const getAlbumMediaCounts = (albumId) => {
    const albumPhotos = photos.filter(photo => photo.album_id === albumId).length;
    const albumVideos = videos.filter(video => video.album_id === albumId).length;
    const total = albumPhotos + albumVideos;
    
    return { photos: albumPhotos, videos: albumVideos, total };
  };

  if (allMedia.length === 0 && !selectedAlbum) {
    return (
      <div className="text-center py-20">
        <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No photos or videos uploaded yet</p>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Album Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onCreateAlbum}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Album</span>
          </Button>
        </div>
      </div>

      {/* Horizontal Albums Scroll */}
      {albums.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#2b2d2f] mb-4">Albums</h3>
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* "All Media" option */}
            <div
              className={`flex-shrink-0 w-48 bg-white rounded-lg border-2 p-4 cursor-pointer transition-all relative group ${
                !selectedAlbum
                  ? 'border-[#f2adc8] bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onAlbumChange(null)}
            >
              <div className="flex flex-col items-center text-center">
                
                
                <h4 className="font-medium text-sm text-[#2b2d2f] truncate w-full mb-2">
                  All Media
                </h4>
                 
                 
              </div>
            </div>

            {/* Individual Albums */}
            {albums.map((album) => {
              const counts = getAlbumMediaCounts(album.id);
              const isSelected = selectedAlbum === album.id;
              
              return (
                <div
                  key={album.id}
                  className={`flex-shrink-0 w-48 bg-white rounded-lg border-2 p-4 cursor-pointer transition-all relative group ${
                    isSelected
                      ? 'border-[#f2adc8] bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onAlbumChange(isSelected ? null : album.id)}
                >
                  <div className="flex flex-col items-center text-center">
                   
                    
                    <h4 className="font-medium text-sm text-[#2b2d2f] truncate w-full mb-2">
                      {album.name}
                    </h4>
                    
                    
                     
                    
                    {album.description && (
                      <p className="text-xs text-gray-400 mt-1 truncate w-full">
                        {album.description}
                      </p>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteAlbum(album.id);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Album
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rest of the component remains exactly the same */}
      {/* Media Grid */}
      {allMedia.length === 0 ? (
        <div className="text-center py-20">
          <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {selectedAlbum
              ? 'No media in this album yet'
              : 'No photos or videos uploaded yet'}
          </p>
          {selectedAlbum && (
            <Button
              variant="outline"
              onClick={() => onAlbumChange(null)}
              className="mt-2"
            >
              View All Media
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allMedia.map((item, index) => (
            <div
              key={item.id}
              className={`aspect-square bg-white rounded-lg overflow-hidden relative group ${
                isSelectMode ? 'cursor-default' : 'cursor-pointer'
              } ${
                selectedMedia.some((selected) => selected.id === item.id)
                  ? 'ring-4 ring-blue-500 ring-offset-2'
                  : ''
              }`}
              onClick={() => handleItemClick(item, index, item.media_type)}
            >
              {/* Favorite Button */}
              {!isSelectMode && (
                <button
                  onClick={(e) => handleToggleFavorite(item, e)}
                  className={`absolute top-2 left-2 z-10 p-2 rounded-full transition-all duration-200 
                    ${(item.is_liked || item.is_favorite)
                      ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                      : 'bg-white/30 text-gray-700 hover:bg-white/50'}
                    opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
                  title={(item.is_liked || item.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={(item.is_liked || item.is_favorite) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.26 5.246 5.715.418a.563.563 0 01.32.987l-4.36 3.78 
                         1.307 5.604a.562.562 0 01-.836.61L12 17.347l-4.926 2.797a.562.562 0 01-.836-.61
                         l1.307-5.604-4.36-3.78a.563.563 0 01.32-.987l5.716-.418 2.259-5.246z"
                    />
                  </svg>
                </button>
              )}

              {/* Selection Checkmark */}
              {isSelectMode && (
                <div className="absolute top-2 left-2 z-20">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedMedia.some((selected) => selected.id === item.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/90 text-gray-400'
                    }`}
                  >
                    {selectedMedia.some((selected) => selected.id === item.id) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </div>
              )}

              {/* Delete Button */}
              {!isSelectMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(item, e);
                  }}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title={`Delete ${item.media_type}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              {/* Media Content */}
              {item.media_type === "photo" ? (
                <img
                  src={item.cloudinary_url}
                  alt="Event photo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="relative w-full h-full bg-black">
                  <video
                    src={item.cloudinary_url}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                  />
                  {/* Play button overlay for videos */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                    <Play className="h-10 w-10 text-white opacity-90" />
                  </div>
                </div>
              )}

              {/* Download button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSingleDownload(item);
                }}
                className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                   text-black p-2 rounded-full transition-all duration-200 
                   hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                aria-label={`Download ${item.media_type}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL VIEW */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => {
              setSelectedIndex(null);
              setSelectedMediaType(null);
            }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={() => handleNavigate(-1)}
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition hover:scale-110 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleNavigate(1)}
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition hover:scale-110 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Action Buttons */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            <button
              onClick={() => onSingleDownload(selectedItem)}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Download className="h-6 w-6" />
            </button>

            {/* Favorite button in modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(selectedItem, e);
              }}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                (selectedItem.is_liked || selectedItem.is_favorite)
                  ? 'bg-yellow-500/80 hover:bg-yellow-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title={(selectedItem.is_liked || selectedItem.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={(selectedItem.is_liked || selectedItem.is_favorite) ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.26 5.246 5.715.418a.563.563 0 01.32.987l-4.36 3.78 
                     1.307 5.604a.562.562 0 01-.836.61L12 17.347l-4.926 2.797a.562.562 0 01-.836-.61
                     l1.307-5.604-4.36-3.78a.563.563 0 01.32-.987l5.716-.418 2.259-5.246z"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(selectedItem, e);
                setSelectedIndex(null);
                setSelectedMediaType(null);
              }}
              className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>

          {/* Media Content */}
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center animate-zoomIn">
            {selectedMediaType === 'photo' ? (
              <img
                src={selectedItem.cloudinary_url}
                alt="Selected"
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
              />
            ) : (
              <video
                src={selectedItem.cloudinary_url}
                controls
                autoPlay={false}
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}

      {/* ✅ Toaster Portal */}
      <Toaster />
    </div>
  );
};

export default GalleryTab;