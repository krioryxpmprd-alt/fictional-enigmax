'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CreateAlbumDialog = ({
  isOpen,
  onClose,
  albumName,
  albumDescription,
  onAlbumNameChange,
  onAlbumDescriptionChange,
  onCreateAlbum
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#2b2d2f]">Create New Album</DialogTitle>
          <DialogDescription className="text-gray-600">
            Organize your photos into albums for better management.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="album-name">Album Name</Label>
            <Input
              id="album-name"
              value={albumName}
              onChange={(e) => onAlbumNameChange(e.target.value)}
              placeholder="e.g., Wedding Ceremony, Reception..."
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="album-description">Description (Optional)</Label>
            <Textarea
              id="album-description"
              value={albumDescription}
              onChange={(e) => onAlbumDescriptionChange(e.target.value)}
              placeholder="Describe this album..."
              rows={3}
              className="mt-1 resize-none"
            />
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onCreateAlbum}
            disabled={!albumName.trim()}
            className="bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white"
          >
            Create Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumDialog;