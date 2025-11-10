'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PhotoViewer = ({ photo, onClose, onDelete }) => {
  if (!photo) return null;

  return (
    <Dialog open={!!photo} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <div>
          <img
            src={photo.cloudinary_url}
            alt="Event photo"
            className="w-full h-auto rounded-lg"
          />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#2b2d2f]">{photo.author_name}</p>
              <p className="text-sm text-gray-500">{new Date(photo.created_at).toLocaleString()}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(photo, e);
                  onClose();
                }}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => {
                  window.open(photo.cloudinary_url, '_blank');
                  toast({
                    title: 'Opening Photo',
                    description: 'Photo opened in new tab',
                  });
                }}
                className="bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoViewer;