import React from 'react';

const LoadingSpinner = ({ 
  size = 'lg', 
  text = 'Loading...',
  fullScreen = true 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-b-2',
    md: 'h-8 w-8 border-b-2',
    lg: 'h-12 w-12 border-b-2',
    xl: 'h-16 w-16 border-b-2'
  };

  const spinner = (
    <div 
      className="flex flex-col items-center justify-center space-y-4"
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div 
        className={`animate-spin rounded-full border-gray-800 ${sizeClasses[size]}`}
        aria-hidden="true"
      >
        {/* Optional: Add gradient for better visual appeal */}
        <div className="sr-only">
          Loading content, please wait...
        </div>
      </div>
      {text && (
        <p 
          className="text-gray-600 text-sm font-medium"
          aria-hidden="true"
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
        role="main"
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default React.memo(LoadingSpinner);