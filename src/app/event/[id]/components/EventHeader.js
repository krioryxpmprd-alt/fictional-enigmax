'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { ArrowLeft, QrCode, Download, Share2, Settings, Trash2, CheckSquare, Square, Eye, EyeOff } from 'lucide-react';

const EventHeader = ({ 
  event, 
  eventId, 
  isSelectMode, 
  selectedItemsCount, 
  onToggleSelectMode, 
  onBulkDelete, 
  onActivateEvent, 
  onToggleVisibility, 
  onShare, 
  onDownloadAll, 
  onShowQR, 
  onCustomize,
  onBulkDownload,
  selectedMedia,
}) => {
  const hasContent = event.photo_count > 0 || event.video_count > 0 || event.message_count > 0;

const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#2b2d2f]">{event.name}</h1>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasContent && (
              <Button
                variant={isSelectMode ? "default" : "outline"}
                onClick={onToggleSelectMode}
                className={isSelectMode ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
              >
                {isSelectMode ? (
                  <>
                    <CheckSquare className="h-5 w-5 mr-2" />
                    Selecting ({selectedItemsCount})
                  </>
                ) : (
                  <>
                    <Square className="h-5 w-5 mr-2" />
                    Select Items
                  </>
                )}
              </Button>
            )}

           {isSelectMode && (
  <div className="fixed bottom-4 right-4 flex gap-2 z-[9999]">
   <Button
  onClick={() => {
    if (selectedMedia.length > 0) {
      onBulkDownload(selectedMedia.map(m => m.id));
    }
  }}
  variant="secondary"
>
  Download Selected
</Button>

    <Button
      onClick={onBulkDelete}
      variant="destructive"
    >
      Delete Selected
    </Button>
  </div>
)}
            
            {event.status === 'trial' && (
              <Button 
                onClick={onActivateEvent}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Activate Event - $20
              </Button>
            )}
            
            {event.status === 'active' && (
              <Badge className="bg-green-600 text-white px-4 py-2">
                ✓ Active
              </Badge>
            )}
            
            <Card className="flex items-center space-x-3 px-4 py-2 border-gray-200">
              {event.show_media_publicly ? (
                <Eye className="h-5 w-5 text-green-600" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex flex-col">
                <Label className="text-xs text-gray-500">Guest View</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {event.show_media_publicly ? 'Public' : 'Private'}
                  </span>
                  <Switch
                    checked={event.show_media_publicly}
                    onCheckedChange={onToggleVisibility}
                  />
                </div>
              </div>
            </Card>
            
            <Button variant="outline" onClick={onCustomize}>
              <Settings className="h-5 w-5 mr-2" />
              Customize
            </Button>
            
            <Button variant="outline" onClick={onShowQR}>
              <QrCode className="h-5 w-5 mr-2" />
              Show QR Code
            </Button>
            
            <Button variant="outline" onClick={onShare}>
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
            
            <Button onClick={onDownloadAll} className="bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white">
              <Download className="h-5 w-5 mr-2" />
              Download All
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;