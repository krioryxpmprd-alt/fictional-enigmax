const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = {
  async getEvent(eventId) {
    const response = await fetch(`${BACKEND_URL}/api/events/public/${eventId}`);
    if (!response.ok) throw new Error('Event not found');
    return response.json();
  },

  async getEventMedia(eventId) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/event/${eventId}/media`);
    if (!response.ok) throw new Error('Failed to fetch media');
    return response.json();
  },

  async getEventMessages(eventId) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/event/${eventId}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async getEventAlbums(eventId) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/events/${eventId}/albums`);
    if (!response.ok) throw new Error('Failed to fetch albums');
    return response.json();
  },

  async uploadMedia(formData) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/media`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  },

  async uploadMessage(data) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Message upload failed');
    return response.json();
  },

  async deleteMedia(mediaId, uploaderId) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/media/${mediaId}?uploader_id=${uploaderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Delete failed');
    return response.json();
  },

  async toggleLike(mediaId) {
    const response = await fetch(`${BACKEND_URL}/api/uploads/media/${mediaId}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to toggle like');
    }

    return response.json();
  },
};