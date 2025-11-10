'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Trash2, Check } from 'lucide-react';

const MessagesTab = ({
  messages,
  isSelectMode,
  selectedMessages,
  onToggleMessageSelection,
  onDeleteClick
}) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-20">
        <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {messages.map((message) => (
        <Card
          key={message.id}
          className={`p-6 border-0 hover:shadow-lg transition-shadow relative group ${
            selectedMessages.some(item => item.id === message.id)
              ? 'ring-4 ring-blue-500 ring-offset-2'
              : ''
          }`}
          onClick={() => {
            if (isSelectMode) {
              onToggleMessageSelection(message);
            }
          }}
        >
          {/* Selection check icon (for bulk select mode) */}
          {isSelectMode && (
            <div className="absolute top-2 left-2 z-20">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedMessages.some(item => item.id === message.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/90 text-gray-400'
                }`}
              >
                {selectedMessages.some(item => item.id === message.id) && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </div>
          )}

          {/* Delete button (only visible when not in select mode) */}
          {!isSelectMode && (
            <button
              onClick={(e) => onDeleteClick(message, e)}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete message"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          {/* Message content */}
          <div className="flex items-start space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">
                {message.author_name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#2b2d2f] mb-1">
                {message.author_name}
              </p>
              <p className="text-gray-700 text-sm mb-2">{message.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div> 
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MessagesTab;
