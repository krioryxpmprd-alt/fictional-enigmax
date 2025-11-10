'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Folder,
  FolderOpen,
  MoreVertical,
  Trash2,
  Image,
  Video,
  Mic,
  Check,
  Download,
} from 'lucide-react';

const AlbumsTab = ({
  albums,
  selectedAlbum,
  onAlbumChange,
  media, // All media (photos, videos, voice)
  isSelectMode,
  selectedMedia,
  onToggleMediaSelection,
  onDeleteClick,
  onCreateAlbum,
  onDeleteAlbum,
  onSingleDownload,
}) => {
  // Filter media by selected album
  const filteredMedia = useMemo(() => {
    if (!selectedAlbum) return media;
    return media.filter(item => item.album_id === selectedAlbum);
  }, [media, selectedAlbum]);

  // Count media by type for each album
  const getAlbumMediaCounts = (albumId) => {
    const albumMedia = media.filter(item => item.album_id === albumId);
    const photos = albumMedia.filter(item => item.media_type === 'photo').length;
    const videos = albumMedia.filter(item => item.media_type === 'video').length;
    const voice = albumMedia.filter(item => item.media_type === 'voice').length;
    
    return { photos, videos, voice, total: albumMedia.length };
  };

  // Get icon for media type
  const getMediaIcon = (mediaType) => {
    switch (mediaType) {
      case 'photo':
        return <Image className="h-4 w-4 text-green-600" />;
      case 'video':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'voice':
        return <Mic className="h-4 w-4 text-purple-600" />;
      default:
        return <Image className="h-4 w-4 text-gray-600" />;
    }
  };

  if (albums.length === 0) {
    return (
      <div className="text-center py-20">
        <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">No albums created yet</p>
        <Button
          variant="outline"
          onClick={onCreateAlbum}
          className="flex items-center space-x-2 mx-auto"
        >
          <span>Create Your First Album</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Album Selection Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onCreateAlbum}
            className="flex items-center space-x-2"
          >
            <span>Create New Album</span>
          </Button>
        </div>
      </div>

      {/* Horizontal Albums Scroll */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#2b2d2f] mb-4">Your Albums</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* "All Albums" option */}
          <div
            className={`flex-shrink-0 w-48 bg-white rounded-lg border-2 p-4 cursor-pointer transition-all relative group ${
              !selectedAlbum
                ? 'border-[#f2adc8] bg-pink-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onAlbumChange(null)}
          >
            <div className="flex flex-col items-center text-center">
              {!selectedAlbum ? (
                <FolderOpen className="h-10 w-10 text-[#f2adc8] mb-2" />
              ) : (
                <Folder className="h-10 w-10 text-gray-400 mb-2" />
              )}
              
              <h4 className="font-medium text-sm text-[#2b2d2f] truncate w-full mb-2">
                All Albums
              </h4>
              
              {/* Media Type Counts */}
              <div className="flex justify-center space-x-3 mb-2">
                {media.filter(item => item.media_type === 'photo').length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Image className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-gray-600">
                      {media.filter(item => item.media_type === 'photo').length}
                    </span>
                  </div>
                )}
                {media.filter(item => item.media_type === 'video').length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Video className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-gray-600">
                      {media.filter(item => item.media_type === 'video').length}
                    </span>
                  </div>
                )}
                {media.filter(item => item.media_type === 'voice').length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Mic className="h-3 w-3 text-purple-600" />
                    <span className="text-xs text-gray-600">
                      {media.filter(item => item.media_type === 'voice').length}
                    </span>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                {media.length} item{media.length !== 1 ? 's' : ''}
              </p>
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
                  {isSelected ? (
                    <FolderOpen className="h-10 w-10 text-[#f2adc8] mb-2" />
                  ) : (
                    <Folder className="h-10 w-10 text-gray-400 mb-2" />
                  )}
                  
                  <h4 className="font-medium text-sm text-[#2b2d2f] truncate w-full mb-2">
                    {album.name}
                  </h4>
                  
                  {/* Media Type Counts */}
                  <div className="flex justify-center space-x-3 mb-2">
                    {counts.photos > 0 && (
                      <div className="flex items-center space-x-1">
                        <Image className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-gray-600">{counts.photos}</span>
                      </div>
                    )}
                    {counts.videos > 0 && (
                      <div className="flex items-center space-x-1">
                        <Video className="h-3 w-3 text-blue-600" />
                        <span className="text-xs text-gray-600">{counts.videos}</span>
                      </div>
                    )}
                    {counts.voice > 0 && (
                      <div className="flex items-center space-x-1">
                        <Mic className="h-3 w-3 text-purple-600" />
                        <span className="text-xs text-gray-600">{counts.voice}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {counts.total} item{counts.total !== 1 ? 's' : ''}
                  </p>
                  
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

      {/* Media Grid for Selected Album */}
      {selectedAlbum && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-[#2b2d2f] mb-4">
            Media in {albums.find(a => a.id === selectedAlbum)?.name}
          </h3>
          
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No media in this album yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Add photos, videos, or voice messages to this album
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg overflow-hidden shadow-md group relative ${
                    isSelectMode ? 'cursor-pointer' : ''
                  } ${
                    selectedMedia.some(selected => selected.id === item.id)
                      ? 'ring-4 ring-blue-500 ring-offset-2'
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

                  {/* Media Thumbnail */}
                  {item.media_type === "photo" ? (
                    <img
                      src={item.thumbnail_url || item.cloudinary_url}
                      alt={item.author_name || "Event photo"}
                      className="w-full h-32 object-cover"
                    />
                  ) : item.media_type === "video" ? (
                    <div className="relative w-full h-32 bg-black">
                      <video
                        src={item.cloudinary_url}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-6 w-6 text-white opacity-70" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-purple-600" />
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSingleDownload(item);
                    }}
                    className="absolute bottom-2 right-2 z-50 bg-white/30 hover:bg-white/50 
                             text-black p-1.5 rounded-full transition-all duration-200 
                             hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    aria-label="Download media"
                  >
                    <Download className="h-3 w-3" />
                  </button>

                  {/* Media Info */}
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {getMediaIcon(item.media_type)}
                        <span className="text-xs font-medium text-gray-900 truncate">
                          {item.author_name || "Anonymous"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.media_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumsTab;