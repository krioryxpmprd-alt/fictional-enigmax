'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Trash2, Check, Download } from 'lucide-react';
import { useAdminFavorites } from '@/app/event/[id]/components/hooks/useAdminFavorites';
import { useToast } from '@/hooks/use-toast';

const VoiceTab = ({
  voiceMessages,
  isSelectMode,
  selectedMedia,
  onToggleMediaSelection,
  onDeleteClick,
  onSingleDownload,
  onToggleFavorite,
  eventId,
}) => {
  const { toast } = useToast();
  
  // Use the favorites hook
  const { toggleFavorite: apiToggleFavorite } = useAdminFavorites(eventId);

  // Fixed handleToggleFavorite that makes API calls
  const handleToggleFavorite = async (voice, e) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyFavorite = voice.is_liked || voice.is_favorite;
    
    try {
      // Make the API call to toggle favorite
      await apiToggleFavorite(voice.id, isCurrentlyFavorite);
      
      // Update the local state through the parent
      onToggleFavorite(voice);
      
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: 'Error',
        description: 'Could not update favorite status.',
        variant: 'destructive',
      });
    }
  };

  if (voiceMessages.length === 0) {
    return (
      <div className="text-center py-20">
        <Mic className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No voice messages yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {voiceMessages.map((voice) => (
        <Card 
          key={voice.id} 
          className={`bg-white rounded-lg overflow-hidden shadow-lg group relative ${
            isSelectMode ? 'cursor-default' : ''
          } ${
            selectedMedia.some(item => item.id === voice.id) ? 'ring-4 ring-blue-500 ring-offset-2' : ''
          }`}
          onClick={() => {
            if (isSelectMode) {
              onToggleMediaSelection(voice);
            }
          }}
        >
          {/* Favorite Button */}
          {!isSelectMode && (
            <button
              onClick={(e) => handleToggleFavorite(voice, e)}
              className={`absolute top-2 left-2 z-10 p-2 rounded-full transition-all duration-200 
                ${(voice.is_liked || voice.is_favorite)
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                  : 'bg-white/30 text-gray-700 hover:bg-white/50'}
                opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
              title={(voice.is_liked || voice.is_favorite) ? 'Unfavorite' : 'Add to Favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={(voice.is_liked || voice.is_favorite) ? 'currentColor' : 'none'}
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

          {isSelectMode && (
            <div className="absolute top-2 left-2 z-20">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedMedia.some(item => item.id === voice.id) 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/90 text-gray-400'
              }`}>
                {selectedMedia.some(item => item.id === voice.id) && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </div>
          )}

          {!isSelectMode && (
            <button
              onClick={(e) => onDeleteClick(voice, e)}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete voice message"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-[#a78bfa] to-[#c4b5fd] rounded-full flex items-center justify-center flex-shrink-0">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#2b2d2f]">{voice.author_name}</p>
                <p className="text-xs text-gray-500">{new Date(voice.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <audio
                src={voice.cloudinary_url}
                controls
                className="w-full"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSingleDownload(voice);
              }}
              className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                         text-black p-2 rounded-full transition-all duration-200 
                         hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
              aria-label="Download voice message"
            >
              <Download className="h-4 w-4" />
            </button>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Voice message
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VoiceTab;