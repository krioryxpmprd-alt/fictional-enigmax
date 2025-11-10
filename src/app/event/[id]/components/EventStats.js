'use client';

import React from 'react';
import { Image, Video, MessageSquare, Mic } from 'lucide-react';

const EventStats = ({ photos, videos, voiceMessages, messages }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-4 gap-8">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-[#f2adc8]/10 rounded-lg flex items-center justify-center">
              <Image className="h-6 w-6 text-[#f2adc8]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2b2d2f]">{photos.length}</p>
              <p className="text-sm text-gray-500">Photos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-[#f4c2c2]/10 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-[#f4c2c2]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2b2d2f]">{videos.length}</p>
              <p className="text-sm text-gray-500">Videos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-[#a78bfa]/10 rounded-lg flex items-center justify-center">
              <Mic className="h-6 w-6 text-[#a78bfa]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2b2d2f]">{voiceMessages.length}</p>
              <p className="text-sm text-gray-500">Voice Messages</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-[#f2adc8]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#f2adc8]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2b2d2f]">{messages.length}</p>
              <p className="text-sm text-gray-500">Messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStats;