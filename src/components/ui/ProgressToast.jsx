import { Toast, ToastTitle, ToastDescription, ToastClose } from './toast';
import { useState, useEffect } from 'react';

export const ProgressToast = ({ total, progress }) => {
  const percentage = Math.round((progress / total) * 100);

  return (
    <Toast>
      <ToastTitle>Downloading files...</ToastTitle>
      <ToastDescription>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Downloading {progress} of {total} files...</span>
          <div style={{
            width: '100%',
            height: 12,
            backgroundColor: '#e0e0e0',
            borderRadius: 6,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${percentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5 25%, #10b981 50%, #4f46e5 75%)',
              backgroundSize: '200% 100%',
              animation: 'progress-stripes 1s linear infinite, progress-glow 1.5s linear infinite',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
        </div>
      </ToastDescription>
      <ToastClose />
    </Toast>
  );
};
