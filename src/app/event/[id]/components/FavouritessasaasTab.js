'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Video, Image as ImageIcon, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FavouritesTab = ({
  favourites,
  onDeleteClick,
  onSingleDownload,
  onLikeToggle,
  uploaderId,
}) => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (favourites.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No favourites yet</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < favourites.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({ title: "You've reached the end", duration: 3000 });
    }
  };

  const media = favourites[currentIndex];

  return (
    <div className="max-w-3xl mx-auto relative">
      <Card className="relative overflow-hidden rounded-2xl shadow-lg">
        {media.media_type === 'photo' ? (
          <img
            src={media.cloudinary_url}
            alt={media.author_name}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="relative w-full h-80 bg-black flex items-center justify-center">
            <video
              src={media.cloudinary_url}
              className="w-full h-80 object-cover"
              controls
            />
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(media.id);
          }}
          className="absolute top-2 left-2 bg-white/70 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition-all"
        >
          <Heart
  fill={media.is_liked ? "red" : "none"}
  className="h-5 w-5"
/>
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => onDeleteClick(media, e)}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        {/* Download Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSingleDownload(media);
          }}
          className="absolute bottom-2 right-2 bg-white/40 hover:bg-white/60 text-black p-2 rounded-full shadow-md"
        >
          <Download className="h-4 w-4" />
        </button>

        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-[#2b2d2f]">{media.author_name}</p>
            <p className="text-xs text-gray-500">{new Date(media.created_at).toLocaleString()}</p>
          </div>
          <Button onClick={handleNext} variant="ghost" className="text-blue-600">
            Next →
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FavouritesTab;
