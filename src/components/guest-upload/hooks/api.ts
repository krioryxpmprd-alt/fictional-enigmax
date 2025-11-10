// api.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/uploads";

 
export const getMediaWithLikes = async (
  eventId: string, 
  uploaderId?: string, 
  offset = 0, 
  limit = 20
) => {
  const url = `${API_BASE}/event/${eventId}/media-with-likes?offset=${offset}&limit=${limit}${uploaderId ? `&uploader_id=${uploaderId}` : ""}`;
  const res = await axios.get(url);
  return res.data;
};

export const likeMedia = async (mediaId: string, uploaderId: string) => {
  try {
    const formData = new FormData();
    formData.append("uploader_id", uploaderId);
    const res = await axios.post(`${API_BASE}/media/${mediaId}/like`, formData);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      // If already liked, we still consider this "success" for optimistic updates
      if (error.response.data?.detail === "Already liked") {
        return { success: true, alreadyLiked: true };
      }
    }
    throw error;
  }
};

export const unlikeMedia = async (mediaId: string, uploaderId: string) => {
  try {
    const formData = new FormData();
    formData.append("uploader_id", uploaderId);
    const res = await axios.delete(`${API_BASE}/media/${mediaId}/like`, { data: formData });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      // If not liked, we still consider this "success" for optimistic updates
      if (error.response.data?.detail === "Like not found") {
        return { success: true, notLiked: true };
      }
    }
    throw error;
  };

};

export const getEventAlbums = async (eventId: string) => {
  try {
    const res = await axios.get(`${API_BASE}/events/${eventId}/albums`);
    return res.data; // Array of { id, name, event_id, description, created_at, photo_count }
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};