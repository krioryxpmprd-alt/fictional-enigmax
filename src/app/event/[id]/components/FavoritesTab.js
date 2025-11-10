import React from "react";
import { Button } from "@/components/ui/button";
import { StarOff, Download, Check, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export default function FavoritesTab({ 
  eventId, 
  media, 
  onMediaUpdate, 
  isSelectMode, 
  selectedMedia, 
  onToggleMediaSelection, 
  onDeleteClick,
  onSingleDownload,
  onBulkDownload 
}) {
  const { token } = useAuth();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API = `${BACKEND_URL}/api/uploads`;

  const handleToggle = async (item) => {
    const isCurrentlyFavorite = item.is_liked || item.is_favorite;
    
    if (!token) {
      toast({
        title: "Error",
        description: "You need to be logged in to manage favorites.",
        variant: "destructive",
      });
      return;
    }
    
    const url = `${API}/admin/media/${item.id}/favorite`;
    
    try {
      if (isCurrentlyFavorite) {
        // Unfavorite
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Removed", description: "Removed from favorites." });
      } else {
        // Favorite
        await axios.post(
          url,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Favorited", description: "Added to favorites." });
      }

      // Update parent media list immediately for responsive UI
      onMediaUpdate((prev) =>
        prev.map((m) =>
          m.id === item.id ? { 
            ...m, 
            is_liked: !isCurrentlyFavorite,
            is_favorite: !isCurrentlyFavorite 
          } : m
        )
      );
      
    } catch (err) {
      console.error("❌ Failed to toggle favorite:", err);
      
      if (err.response?.status === 404) {
        if (err.response?.data?.detail === 'Favorite not found') {
          toast({
            title: "Info",
            description: "This item was not in your favorites.",
            variant: "default",
          });
          onMediaUpdate((prev) =>
            prev.map((m) =>
              m.id === item.id ? { 
                ...m, 
                is_liked: false,
                is_favorite: false 
              } : m
            )
          );
        }
      } else {
        toast({
          title: "Error",
          description: "Could not update favorite status.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle bulk delete for selected favorites
  const handleBulkDelete = () => {
    if (selectedMedia.length === 0) return;
    
    // Call the parent's onDeleteClick with all selected items
    onDeleteClick(selectedMedia);
  };

  const displayFavorites = media.filter(m => m.is_liked || m.is_favorite);

  if (displayFavorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⭐</div>
        <p className="text-gray-500 text-lg">No favorites yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Click the star icon on photos, videos, or voice messages to add them to favorites
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selection Info Bar (shown when in select mode) */}
      {isSelectMode && selectedMedia.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-700 font-medium">
                {selectedMedia.length} item{selectedMedia.length !== 1 ? 's' : ''} selected
              </span>
              
              {/* Bulk Download Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkDownload(selectedMedia.map(item => item.id))}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Selected ({selectedMedia.length})</span>
              </Button>
              
              {/* Bulk Delete Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected ({selectedMedia.length})</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {displayFavorites.map((item) => (
          <div
            key={item.id}
            className={`relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 ${
              isSelectMode ? 'cursor-pointer' : ''
            } ${
              selectedMedia.some(selected => selected.id === item.id)
                ? 'ring-4 ring-blue-500 ring-offset-2 transform scale-105'
                : ''
            }`}
            onClick={() => {
              if (isSelectMode) {
                onToggleMediaSelection(item);
              }
            }}
          >
            {/* Selection Checkmark */}
            {isSelectMode && (
              <div className="absolute top-2 left-2 z-20">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedMedia.some(selected => selected.id === item.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/90 text-gray-400'
                  }`}
                >
                  {selectedMedia.some(selected => selected.id === item.id) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              </div>
            )}

            {/* Media Content */}
            {item.media_type === "photo" ? (
              <img
                src={item.thumbnail_url || item.cloudinary_url}
                alt={item.author_name || "Event photo"}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            ) : item.media_type === "video" ? (
              <div className="relative">
                <video
                  src={item.cloudinary_url}
                  className="w-full h-48 object-cover"
                  preload="metadata"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span className="text-blue-600 font-medium">Voice Message</span>
                </div>
              </div>
            )}

            {/* Action Buttons (shown when not in select mode) */}
            {!isSelectMode && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(item);
                  }}
                >
                  <StarOff className="w-4 h-4 text-yellow-500" />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="bg-white/90 hover:bg-white backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSingleDownload(item);
                  }}
                >
                  <Download className="w-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(item, e);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            )}

            {/* Download button (always visible in select mode) */}
            {isSelectMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSingleDownload(item);
                }}
                className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                           text-black p-2 rounded-full transition-all duration-200 
                           hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                aria-label="Download media"
              >
                <Download className="h-4 w-4" />
              </button>
            )}

            {/* Item Info */}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {item.author_name || "Anonymous"}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.media_type === 'photo' 
                    ? 'bg-green-100 text-green-800'
                    : item.media_type === 'video'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.media_type}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}