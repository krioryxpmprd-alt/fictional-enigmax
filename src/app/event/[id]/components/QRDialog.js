'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

const QRDialog = ({ isOpen, onClose, event, onShare }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#2b2d2f]">Event QR Code</h2>
          <p className="text-gray-600">Guests can scan this code to upload photos</p>
          <div className="bg-white p-6 rounded-lg inline-block">
            <img src={event.qr_code_url} alt="QR Code" className="w-64 h-64" />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Upload URL:</p>
            <code className="text-sm bg-white px-3 py-2 rounded border border-gray-200 block break-all">
              {event.upload_link}
            </code>
          </div>
          <Button
            onClick={onShare}
            className="w-full bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRDialog;