import React from 'react';
import { Button } from '@/components/ui/button';

const DeleteConfirmationModal = ({ mediaToDelete, onCancel, onConfirm }) => {
  if (!mediaToDelete) return null;

  // Handle Escape key to cancel
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Trap focus within modal for accessibility
  React.useEffect(() => {
    const modal = document.querySelector('[role="dialog"]');
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements?.length > 0) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement.focus();
      
      const handleTab = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      modal?.addEventListener('keydown', handleTab);
      return () => modal?.removeEventListener('keydown', handleTab);
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      {/* Backdrop click handler */}
      <div 
        className="absolute inset-0" 
        onClick={onCancel}
        aria-hidden="true"
      />
      
      <div 
        className="bg-white rounded-lg p-6 max-w-sm w-full relative z-10 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
      >
        <h3 
          id="delete-confirmation-title"
          className="text-lg font-bold text-gray-900 mb-2"
        >
          Delete Media
        </h3>
        
        <p 
          id="delete-confirmation-description"
          className="text-gray-600 mb-4"
        >
          Are you sure you want to delete this media? This action cannot be undone.
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            aria-label="Cancel deletion"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Confirm deletion"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmationModal);