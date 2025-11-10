'use client';

import { useState, useEffect } from 'react';

export const useUploaderId = () => {
  const [uploaderId, setUploaderId] = useState('');

  useEffect(() => {
    // Check for window to ensure we're on client side
    if (typeof window === 'undefined') return;

    let id = localStorage.getItem('uploader_id');
    if (!id) {
      id = generateUUID();
      localStorage.setItem('uploader_id', id);
    }
    setUploaderId(id);
  }, []);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  return uploaderId;
};