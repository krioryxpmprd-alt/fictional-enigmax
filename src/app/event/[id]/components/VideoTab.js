'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Trash2, Check, Download, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useAdminFavorites } from '@/app/event/[id]/components/hooks/useAdminFavorites';

const VideoTab = ({
  videos,
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

  const selectedVideo = selectedIndex !== null ? videos[selectedIndex] : null;

  // Keyboard navigation for modal view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedVideo) return;
      if (e.key === 'ArrowLeft') handleNavigate(-1);
      if (e.key === 'ArrowRight') handleNavigate(1);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  const handleNavigate = (dir) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + dir;

    if (newIndex < 0 || newIndex >= videos.length) {
      toast({
        title: "You've reached the end",
        description: 'No more videos to view.',
        duration: 3000,
      });
      return;
    }

    setSelectedIndex(newIndex);
  };

  // Fixed handleToggleFavorite that makes API calls
  const handleToggleFavorite = async (video, e) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyFavorite = video.is_liked || video.is_favorite;
    
    try {
      // Make the API call to toggle favorite
      await apiToggleFavorite(video.id, isCurrentlyFavorite);
      
      // Update the local state through the parent
      onToggleFavorite(video);
      
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: 'Error',
        description: 'Could not update favorite status.',
        variant: 'destructive',
      });
    }
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No videos uploaded yet</p>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            className={`bg-white rounded-lg overflow-hidden shadow-lg group relative ${
              isSelectMode ? 'cursor-default' : 'cursor-pointer'
            } ${
              selectedMedia.some((item) => item.id === video.id)
                ? 'ring-4 ring-blue-500 ring-offset-2'
                : ''
            }`}
            onClick={() => {
              if (isSelectMode) {
                onToggleMediaSelection(video);
              } else {
                setSelectedIndex(index);
              }
            }}
          >
            {/* Favorite Button */}
            {!isSelectMode && (
              <button
                onClick={(e) => handleToggleFavorite(video, e)}
                className={`absolute top-2 left-2 z-10 p-2 rounded-full transition-all duration-200 
                  ${(video.is_liked || video.is_favorite)
                    ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50'}
                  opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
                title={(video.is_liked || video.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={(video.is_liked || video.is_favorite) ? 'currentColor' : 'none'}
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
                    selectedMedia.some((item) => item.id === video.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/90 text-gray-400'
                  }`}
                >
                  {selectedMedia.some((item) => item.id === video.id) && (
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
                  onDeleteClick(video, e);
                }}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete video"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            {/* Thumbnail with play overlay */}
            <div className="relative w-full h-48 bg-black">
              <video
                src={video.cloudinary_url}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                autoPlay={false}
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                <Play className="h-10 w-10 text-white opacity-90" />
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSingleDownload(video);
              }}
              className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                         text-black p-2 rounded-full transition-all duration-200 
                         hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
              aria-label="Download video"
            >
              <Download className="h-4 w-4" />
            </button>

            <div className="p-4">
              <p className="text-sm font-semibold text-[#2b2d2f]">{video.author_name}</p>
              <p className="text-xs text-gray-500">
                {new Date(video.created_at).toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Video Viewer */}
      {selectedVideo && (
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
              onClick={() => onSingleDownload(selectedVideo)}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Download className="h-6 w-6" />
            </button>

            {/* Favorite button in modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(selectedVideo, e);
              }}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                (selectedVideo.is_liked || selectedVideo.is_favorite)
                  ? 'bg-yellow-500/80 hover:bg-yellow-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title={(selectedVideo.is_liked || selectedVideo.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={(selectedVideo.is_liked || selectedVideo.is_favorite) ? 'currentColor' : 'none'}
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
                onDeleteClick(selectedVideo, e);
                setSelectedIndex(null);
              }}
              className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>

          {/* Video Player */}
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center animate-zoomIn">
            <video
              src={selectedVideo.cloudinary_url}
              controls
              autoPlay={false}
              className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default VideoTab;