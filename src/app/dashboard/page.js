'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  QrCode, 
  Package, 
  ShoppingCart, 
  BookOpen, 
  HelpCircle, 
  Mail, 
  LogOut,
  MessageCircle,
  Video,
  ArrowRight,
  Calendar,
  Trash2
} from 'lucide-react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy image component with loading state
const EventImage = ({ src, alt, eventName }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-64 bg-gradient-to-br from-gray-600 to-gray-700">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-full object-cover opacity-50 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-50' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
      />
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="border-4 border-white rounded-lg p-8 text-center">
            <p className="text-white text-xl italic">Cover Photo</p>
            <p className="text-white text-lg italic">Missing</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const { user, logout, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('my-guestbooks');
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    event_type: 'wedding'
  });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    // Only redirect if auth is done loading and no user
    if (!authLoading && !user) {
      router.push('/');
    } else if (user && token) {
      fetchEvents();
    }
  }, [user, token, router, authLoading]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${API}/events/`,
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setEvents([response.data, ...events]);
      setIsCreateDialogOpen(false);
      setNewEvent({ name: '', date: '', event_type: 'wedding' });
      
      toast({
        title: 'Success',
        description: 'Event created successfully!',
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create event',
        variant: 'destructive'
      });
    }
  };

  const viewEvent = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  const handleDeleteClick = (event, e) => {
    e.stopPropagation();
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      await axios.delete(`${API}/events/${eventToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);

      toast({
        title: 'Success',
        description: 'Event deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete event',
        variant: 'destructive'
      });
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3f0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8705e]"></div>
      </div>
    );
  }

  // Don't render if no user (will redirect in useEffect)
  if (!user) {
    return null;
  }

  const sidebarSections = [
    {
      title: 'GUESTBOOKS',
      items: [
        { icon: Calendar, label: 'Events', active: true }
      ]
    },
    {
      title: 'PRINTABLES',
      items: [
        { icon: Package, label: 'Print Designs' },
        { icon: ShoppingCart, label: 'Your Orders' }
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: BookOpen, label: 'Tutorials' },
        { icon: HelpCircle, label: 'Common Questions' },
        { icon: Mail, label: 'Contact Us' }
      ]
    }
  ];

  const quickActions = [
    {
      icon: Sparkles,
      title: 'Create Event',
      color: 'from-blue-400 to-blue-300',
      onClick: () => setIsCreateDialogOpen(true)
    },
    {
      icon: QrCode,
      title: 'Design QR Prints',
      color: 'from-purple-400 to-purple-300',
      onClick: () => toast({ title: 'Coming Soon', description: 'QR Print Designer' })
    },
    {
      icon: MessageCircle,
      title: 'Ask a question',
      color: 'from-teal-400 to-teal-300',
      onClick: () => toast({ title: 'Contact Support', description: 'We\'re here to help!' })
    },
    {
      icon: Video,
      title: 'Watch Setup Guide',
      color: 'from-pink-400 to-pink-300',
      onClick: () => toast({ title: 'Tutorial', description: 'Opening setup guide...' })
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f3f0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#b8705e] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-bold italic text-white">Wedibox</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {sidebarSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-6 text-xs font-semibold text-white/60 mb-3 tracking-wider">{section.title}</h3>
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    item.active 
                      ? 'bg-white/10 border-l-4 border-white' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-4 border-t border-white/10 hover:bg-white/5 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2b2d2f] italic mb-2">Wedibox</h1>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2b2d2f] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <Card
                key={idx}
                onClick={action.onClick}
                className="p-6 text-center hover:shadow-xl transition-all cursor-pointer border-0 bg-white"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">{action.title}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <button
              onClick={() => setActiveTab('my-guestbooks')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'my-guestbooks'
                  ? 'border-[#b8705e] text-[#b8705e]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Guestbooks
            </button> 
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8705e]"></div>
          </div>
        ) : events.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed border-gray-300">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 bg-[#b8705e]/20 rounded-full flex items-center justify-center">
                <Calendar className="h-10 w-10 text-[#b8705e]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2b2d2f] mb-2">No Events Yet</h3>
            <p className="text-gray-600 mb-6">Create your first event to start collecting memories</p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-[#b8705e] hover:bg-[#a0604f] text-white"
            >
              Create Your First Event
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all border-0 bg-[#544647] cursor-pointer group relative" onClick={() => viewEvent(event.id)}>
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteClick(event, e)}
                  className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete event"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Cover Image with Lazy Loading */}
                <EventImage 
                  src={event.cover_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'} 
                  alt={event.name}
                  eventName={event.name}
                />
                
                <div className="absolute top-4 left-4">
                  {event.status === 'trial' ? (
                    <Badge className="bg-[#7ba5b5] text-white border-0 px-4 py-1">
                      Trial Mode
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white border-0 px-4 py-1">
                      Activated
                    </Badge>
                  )}
                </div>

                {/* Event Info */}
                <div className="p-6 bg-[#544647] relative">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-white/70 text-sm mb-4">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  
                  {/* Arrow Button */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 rounded-full bg-[#7ba5b5] flex items-center justify-center group-hover:bg-[#6a94a4] transition-colors">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2b2d2f]">Create New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                placeholder="e.g., Sarah & John Wedding"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                value={newEvent.event_type}
                onValueChange={(value) => setNewEvent({ ...newEvent, event_type: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full h-11 bg-[#b8705e] hover:bg-[#a0604f] text-white">
              Create Event
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2b2d2f]">Delete Event</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete the event "{eventToDelete?.name}"? All the media and messages associated with this event will be permanently lost and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEvent}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}