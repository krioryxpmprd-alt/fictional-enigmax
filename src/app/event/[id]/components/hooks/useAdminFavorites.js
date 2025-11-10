import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export const useAdminFavorites = (eventId) => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API = `${BACKEND_URL}/api/uploads`;

  // 🔹 Load favorited media for this admin
  const fetchFavorites = async () => {
    if (!eventId || !token) {
      console.log("❌ Missing eventId or token:", { eventId, hasToken: !!token });
      return;
    }
    
    try {
      setLoading(true);
      console.log("🔄 Fetching favorites...");
      const res = await axios.get(`${API}/admin/event/${eventId}/media-with-favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Favorites fetched:", res.data.length, "items");
      
      // Filter only favorited items and ensure both field names are set
      const favs = res.data.filter((m) => m.is_liked).map(item => ({
        ...item,
        is_favorite: item.is_liked // Add both fields for compatibility
      }));
      setFavorites(favs);
    } catch (err) {
      console.error("❌ Failed to load favorites:", err);
      console.error("Error details:", err.response?.data);
      toast({
        title: "Error",
        description: "Could not load favorite media.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle favorite/unfavorite a media item
  const toggleFavorite = async (mediaId, isCurrentlyFavorite) => {
    if (!token) {
      console.log("❌ No token available");
      toast({
        title: "Error",
        description: "You need to be logged in to manage favorites.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      console.log(`🔄 Toggling favorite: mediaId=${mediaId}, isCurrentlyFavorite=${isCurrentlyFavorite}`);
      
      if (isCurrentlyFavorite) {
        // Unfavorite
        console.log("🗑️ Removing favorite...");
        await axios.delete(`${API}/admin/media/${mediaId}/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Favorite removed");
        toast({ title: "Removed", description: "Removed from favorites." });
      } else {
        // Favorite
        console.log("⭐ Adding favorite...");
        await axios.post(
          `${API}/admin/media/${mediaId}/favorite`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("✅ Favorite added");
        toast({ title: "Favorited", description: "Added to favorites." });
      }

      // Refresh favorites
      console.log("🔄 Refreshing favorites list...");
      await fetchFavorites();
      
    } catch (err) {
      console.error("❌ Failed to toggle favorite:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      toast({
        title: "Error",
        description: "Could not update favorite status.",
        variant: "destructive",
      });
      throw err; // Re-throw the error so the calling component can handle it
    }
  };

  useEffect(() => {
    console.log("🔄 useAdminFavorites useEffect triggered", { eventId, hasToken: !!token });
    fetchFavorites();
  }, [eventId, token]);

  return {
    favorites,
    loading,
    toggleFavorite,
    fetchFavorites,
  };
};