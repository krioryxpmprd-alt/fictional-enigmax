import React from 'react';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const MessagesList = React.memo(({ messages = [], showDelete = false, confirmDelete }) => {
  // Sort messages by date (newest first) for better user experience
  const sortedMessages = React.useMemo(() => {
    return [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [messages]);

  if (sortedMessages.length === 0) {
    return (
      <div 
        className="text-center py-8 text-gray-500"
        role="status"
        aria-live="polite"
      >
        No messages yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div 
      className="space-y-4"
      role="list"
      aria-label="Guest messages and wishes"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {sortedMessages.map((message, index) => (
        <div
          key={message.id}
          role="listitem"
          itemScope
          itemType="https://schema.org/UserComments"
          itemProp="itemListElement"
          className="group relative"
        >
          <Card 
            className="p-4 border-l-4 border-[#f2adc8] hover:shadow-md transition-shadow"
          >
            {/* Delete button - only shown when showDelete is true */}
            {showDelete && confirmDelete && (
              <button
                onClick={() => confirmDelete(message)}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete message"
                aria-label={`Delete message from ${message.author_name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            
            <div className="flex items-start space-x-3">
              {/* Author avatar with accessibility */}
              <div 
                className="h-10 w-10 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-full flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="text-white font-bold text-sm">
                  {message.author_name?.charAt(0) || 'G'}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Message header with structured data */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                  <p 
                    className="font-bold text-[#2b2d2f] truncate"
                    itemProp="creator"
                  >
                    {message.author_name || 'Guest'}
                  </p>
                  <span 
                    className="text-xs text-gray-500 whitespace-nowrap"
                    itemProp="commentTime"
                  >
                    <time dateTime={message.created_at}>
                      {new Date(message.created_at).toLocaleDateString()} at{' '}
                      {new Date(message.created_at).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </time>
                  </span>
                </div>
                
                {/* Message content - this is valuable for SEO */}
                <p 
                  className="text-gray-700 text-sm leading-relaxed break-words"
                  itemProp="commentText"
                >
                  {message.message}
                </p>
              </div>
            </div>

            {/* Hidden structured data for search engines */}
            <meta itemProp="position" content={index + 1} />
            <meta itemProp="dateCreated" content={message.created_at} />
          </Card>
        </div>
      ))}
    </div>
  );
});

MessagesList.displayName = 'MessagesList';

export default MessagesList;