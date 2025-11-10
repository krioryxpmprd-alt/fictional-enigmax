'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getMediaWithLikes } from '../components/guest-upload/hooks/api'; // Import the function that returns media WITH likes

// Keep your original API constant
const API = process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` : '/api';

export const useEventData = (eventId, uploaderId, options = {}) => {
  const {
    skipInitialFetch = false,
    initialEvent = null,
    initialMedia = [],
    initialMessages = [],
    initialAlbums = []
  } = options;

  const [event, setEvent] = useState(initialEvent);
  const [existingMedia, setExistingMedia] = useState(initialMedia);
  const [existingMessages, setExistingMessages] = useState(initialMessages);
  const [myUploads, setMyUploads] = useState([]);
  const [albums, setAlbums] = useState(initialAlbums);
  const [loading, setLoading] = useState(!skipInitialFetch);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEventData = useCallback(async (force = false) => {
    if (!eventId || !uploaderId) return;

    try {
      setRefreshing(true);
      
      if (!event || force) {
        const eventResponse = await axios.get(`${API}/events/public/${eventId}`);
        setEvent(eventResponse.data);
      }

      // ✅ FIX: Use getMediaWithLikes instead of regular media endpoint
      const [mediaWithLikes, messagesResponse, albumsResponse] = await Promise.all([
        getMediaWithLikes(eventId, uploaderId), // This returns media WITH like status
        axios.get(`${API}/uploads/event/${eventId}/messages`),
        axios.get(`${API}/uploads/events/${eventId}/albums`)
      ]);
      
      setExistingMedia(mediaWithLikes);
      setExistingMessages(messagesResponse.data);

      // ✅ Update myUploads to include both media and messages
      const userMedia = mediaWithLikes.filter(m => m.uploader_id === uploaderId);
      const userMessages = messagesResponse.data.filter(m => m.uploader_id === uploaderId);
      setMyUploads([...userMedia, ...userMessages]);
     
      setAlbums(albumsResponse.data);
      
      console.log('✅ useEventData - Media with likes:', mediaWithLikes.length);
      if (mediaWithLikes.length > 0) {
        console.log('✅ useEventData - First item has is_liked:', 'is_liked' in mediaWithLikes[0]);
        console.log('✅ useEventData - Liked items:', mediaWithLikes.filter(item => item.is_liked).length);
      }
      
    } catch (error) {
      console.error('Error fetching event data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [eventId, uploaderId, event]);

  useEffect(() => {
    if (!skipInitialFetch && eventId && uploaderId) {
      fetchEventData();
    }
  }, [eventId, uploaderId, skipInitialFetch, fetchEventData]);

  return {
    event,
    existingMedia,
    existingMessages,
    myUploads,
    albums,
    loading,
    refreshing,
    fetchEventData,
    setExistingMedia,
    setExistingMessages,
    setMyUploads,
    setAlbums
  };
};