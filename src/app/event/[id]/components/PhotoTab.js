'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Image,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useAdminFavorites } from '@/app/event/[id]/components/hooks/useAdminFavorites';

const PhotoTab = ({
  photos,
  isSelectMode,
  selectedMedia,
  onToggleMediaSelection,
  onDeleteClick,
  onSingleDownload,
  onToggleFavorite,
  eventId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { toast } = useToast();
  
  // Use the favorites hook
  const { toggleFavorite: apiToggleFavorite } = useAdminFavorites(eventId);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowLeft') handleNavigate(-1);
      if (e.key === 'ArrowRight') handleNavigate(1);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const handleNavigate = (dir) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + dir;

    if (newIndex < 0 || newIndex >= photos.length) {
      toast({
        title: "You've reached the end",
        description: 'No more photos to view.',
        duration: 3000,
      });
      return;
    }

    setSelectedIndex(newIndex);
  };

  // Fixed handleToggleFavorite that makes API calls
  const handleToggleFavorite = async (photo, e) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyFavorite = photo.is_liked || photo.is_favorite;
    
    try {
      // Make the API call to toggle favorite
      await apiToggleFavorite(photo.id, isCurrentlyFavorite);
      
      // Update the local state through the parent
      onToggleFavorite(photo);
      
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: 'Error',
        description: 'Could not update favorite status.',
        variant: 'destructive',
      });
    }
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No photos uploaded yet</p>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`aspect-square bg-white rounded-lg overflow-hidden relative group ${
              isSelectMode ? 'cursor-default' : 'cursor-pointer'
            } ${
              selectedMedia.some((item) => item.id === photo.id)
                ? 'ring-4 ring-blue-500 ring-offset-2'
                : ''
            }`}
            onClick={() => {
              if (isSelectMode) {
                onToggleMediaSelection(photo);
              } else {
                setSelectedIndex(index);
              }
            }}
          >
            {/* Favorite Button */}
            {!isSelectMode && (
              <button
                onClick={(e) => handleToggleFavorite(photo, e)}
                className={`absolute top-2 left-2 z-10 p-2 rounded-full transition-all duration-200 
                  ${(photo.is_liked || photo.is_favorite)
                    ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50'}
                  opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
                title={(photo.is_liked || photo.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={(photo.is_liked || photo.is_favorite) ? 'currentColor' : 'none'}
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
                    selectedMedia.some((item) => item.id === photo.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/90 text-gray-400'
                  }`}
                >
                  {selectedMedia.some((item) => item.id === photo.id) && (
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
                  onDeleteClick(photo, e);
                }}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            <img
              src={photo.cloudinary_url}
              alt="Event photo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Download button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSingleDownload(photo);
              }}
              className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                 text-black p-2 rounded-full transition-all duration-200 
                 hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
              aria-label="Download photo"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* MODAL VIEW */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
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
              onClick={() => onSingleDownload(selectedPhoto)}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Download className="h-6 w-6" />
            </button>

            {/* Favorite button in modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(selectedPhoto, e);
              }}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                (selectedPhoto.is_liked || selectedPhoto.is_favorite)
                  ? 'bg-yellow-500/80 hover:bg-yellow-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title={(selectedPhoto.is_liked || selectedPhoto.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={(selectedPhoto.is_liked || selectedPhoto.is_favorite) ? 'currentColor' : 'none'}
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
                onDeleteClick(selectedPhoto, e);
                setSelectedIndex(null);
              }}
              className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>

          {/* Photo Content */}
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center animate-zoomIn">
            <img
              src={selectedPhoto.cloudinary_url}
              alt="Selected"
              className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ✅ Toaster Portal */}
      <Toaster />
    </div>
  );
};

export default PhotoTab;