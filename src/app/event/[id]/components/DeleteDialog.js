'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Video, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast' // ✅ if you use 'sonner' or your toast lib

const DeleteDialog = ({ isOpen, onClose, mediaToDelete, deleting: externalDeleting, activeTab, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  if (!mediaToDelete) return null;

  const isBulkDelete = Array.isArray(mediaToDelete);
  const itemsToShow = isBulkDelete ? mediaToDelete.slice(0, 6) : [mediaToDelete];

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await onDelete(); // 🧩 perform deletion from parent
      toast.success(
        isBulkDelete
          ? `${mediaToDelete.length} items deleted successfully`
          : `${getItemType(mediaToDelete)} deleted successfully`
      );
      onClose(); // 🧩 close the dialog instantly after success
    } catch (err) {
      toast.error('Failed to delete. Please try again.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !deleting && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#2b2d2f]">
            Delete {isBulkDelete ? `${mediaToDelete.length} Items` : getItemType(mediaToDelete)}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isBulkDelete
              ? `Are you sure you want to delete ${mediaToDelete.length} items? This action cannot be undone.`
              : `Are you sure you want to delete this ${getItemType(mediaToDelete).toLowerCase()}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>

        {/* 🖼️ Media Preview */}
        {!isBulkDelete && (
          <div className="my-4">
            {mediaToDelete.media_type === 'photo' ? (
              <img
                src={mediaToDelete.cloudinary_url}
                alt="To delete"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : mediaToDelete.media_type === 'video' ? (
              <video
                src={mediaToDelete.cloudinary_url}
                className="w-full h-48 object-cover rounded-lg"
                controls
              />
            ) : (
              <Card className="p-4 border-0 bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{mediaToDelete.author_name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2b2d2f] mb-1">{mediaToDelete.author_name}</p>
                    <p className="text-gray-700 text-sm mb-2">{mediaToDelete.message}</p>
                    <p className="text-xs text-gray-400">{new Date(mediaToDelete.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* 🗂️ Bulk delete preview */}
        {isBulkDelete && mediaToDelete.length > 0 && (
          <div className="my-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {itemsToShow.map((item, index) => (
                <div key={item.id} className="aspect-square rounded overflow-hidden">
                  {item.media_type === 'photo' ? (
                    <img
                      src={item.cloudinary_url}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : item.media_type === 'video' ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center p-2">
                      <div className="text-center">
                        <MessageSquare className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-500 truncate block">{item.author_name}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {mediaToDelete.length > 6 && (
                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">+{mediaToDelete.length - 6} more</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🧭 Footer */}
        <DialogFooter className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleting}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center space-x-2"
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>
                Delete {isBulkDelete
                  ? `${mediaToDelete.length} Items`
                  : getItemType(mediaToDelete)}
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function getItemType(item) {
    if (item.media_type === 'photo') return 'Photo';
    if (item.media_type === 'video') return 'Video';
    return 'Message';
  }
};

export default DeleteDialog;