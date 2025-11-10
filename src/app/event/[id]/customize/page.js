'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Save, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EventCustomizePage = () => {
  const { id: eventId } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [settings, setSettings] = useState({
    name: '',
    date: '',
    date_format: 'DD/MM/YYYY',
    font_family: 'Playfair Display',
    page_template: 'template1'
  }); 

  useEffect(() => {
    if (eventId && token) {
      fetchEvent();
    }
  }, [eventId, token]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvent(response.data);
      setSettings({
        name: response.data.name || '',
        date: response.data.date || '',
        date_format: response.data.date_format || 'DD/MM/YYYY',
        font_family: response.data.font_family || 'Playfair Display',
        page_template: response.data.page_template || 'template1'
      });
      if (response.data.cover_image) {
        setCoverPreview(response.data.cover_image);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast({
        title: 'Error',
        description: 'Failed to load event',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setCoverFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/events/${eventId}/cover`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setEvent(response.data);
      toast({
        title: 'Success',
        description: 'Cover photo updated!'
      });
    } catch (error) {
      console.error('Error uploading cover:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload cover photo',
        variant: 'destructive'
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API}/events/${eventId}`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: 'Success',
        description: 'Settings saved successfully!'
      });
      router.push(`/event/${eventId}`);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString, format) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (format) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'MMMM DD, YYYY':
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${monthNames[date.getMonth()]} ${day}, ${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  const renderTemplatePreview = () => {
    const { page_template, name, date, date_format, font_family } = settings;
    const formattedDate = formatDate(date, date_format);

    // Template 1 - Classic (Original template)
    if (page_template === 'template1') {
      return (
        <div className="bg-[#f5f3f0] rounded-[2rem] shadow-2xl overflow-hidden w-[320px] h-[600px] flex flex-col items-center border-4 border-black">
          <div className="text-xs py-2 text-gray-700">Scroll to Live Feed ↓</div>
          <div className="w-full h-[400px]">
            <img
              src={coverPreview || event?.cover_image || 'https://customer-assets.emergentagent.com/job_weddingsnaps-1/artifacts/wfpw1sva_template-1.png'}
              alt="Preview"
              className="object-cover w-full h-full"
              id="previewImage"
            />
          </div>
          <div className="flex flex-col items-center bg-[#f5f3f0] py-4 px-2 text-center w-full">
            <p className="text-xs text-gray-500">{formattedDate || '12/07/2024'}</p>
            <h3
              className="text-lg font-semibold text-[#2e1e1b] mt-1"
              style={{ fontFamily: settings.font_family }}
            >
              {settings.name || 'Scott & Katie'}
            </h3>
            <Button className="mt-3 bg-[#b8705e] text-white hover:bg-[#a45f50] text-sm px-3 py-1 rounded-md">
              Upload to Guestbook
            </Button>
          </div> 
        </div>
      );
    }

    // Template 2 - Modern
    if (page_template === 'template2') {
      return (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[1.5rem] shadow-2xl overflow-hidden w-[320px] h-[600px] flex flex-col items-center border-2 border-gray-600">
          <div className="text-xs py-2 text-gray-400">Scroll to Live Feed ↓</div>
          <div className="w-full h-[350px] relative">
            <img
              src={coverPreview || event?.cover_image || 'https://customer-assets.emergentagent.com/job_weddingsnaps-1/artifacts/kfzojoar_template-2.png'}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-xs text-white/80">{formattedDate || '12/07/2024'}</p>
              <h3
                className="text-lg font-semibold text-white mt-1"
                style={{ fontFamily: settings.font_family }}
              >
                {settings.name || 'Scott & Katie'}
              </h3>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-900 flex flex-col items-center justify-center p-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-200 font-bold text-sm px-6 py-2 rounded-full">
              Share Your Moment
            </Button>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Capture and upload your favorite photos from the event
            </p>
          </div>
          <p className="text-xs text-gray-500 py-2">Modern Design</p>
        </div>
      );
    }

    // Template 3 - Elegant
    if (page_template === 'template3') {
      return (
        <div className="bg-gradient-to-b from-[#f8f6f2] to-[#e8e2d8] rounded-[2.5rem] shadow-2xl overflow-hidden w-[320px] h-[600px] flex flex-col items-center border-4 border-[#d4c6b5]">
          <div className="text-xs py-3 text-[#7a6d5f] font-light">Scroll to Live Feed ↓</div>
          <div className="w-[90%] h-[380px] rounded-[1.5rem] overflow-hidden shadow-lg">
            <img
              src={coverPreview || event?.cover_image || 'https://customer-assets.emergentagent.com/job_weddingsnaps-1/artifacts/o5h441cg_template-4.png'}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center py-6 px-4 text-center w-full">
            <div className="w-16 h-px bg-[#b8705e] mb-3"></div>
            <p className="text-sm text-[#7a6d5f] font-light tracking-wide">{formattedDate || '12/07/2024'}</p>
            <h3
              className="text-lg font-semibold text-[#2e1e1b] mt-1"
              style={{ fontFamily: settings.font_family }}
            >
              {settings.name || 'Scott & Katie'}
            </h3>
            <Button className="mt-4 bg-transparent border border-[#b8705e] text-[#b8705e] hover:bg-[#b8705e] hover:text-white text-sm px-6 py-2 rounded-full transition-all">
              Upload Memories
            </Button>
          </div>
          <p className="text-xs text-[#7a6d5f] pb-4 font-light">Elegant Design</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2e1e1b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8705e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#2e1e1b] text-[#fdf5ee]">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={() => router.push(`/event/${eventId}`)} 
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Left Sidebar Form */}
      <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col space-y-5 bg-[#2e1e1b] pt-16">
        {/* Cover Photo */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Cover Photo</Label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-28 bg-[#fdf5ee]/10 border border-[#fdf5ee]/20 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
              {coverPreview || event?.cover_image ? (
                <img 
                  src={coverPreview || event?.cover_image} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <label htmlFor="cover-upload" className="cursor-pointer text-[#fdf5ee]/70 text-2xl">+</label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="cover-upload"
              />
            </div>
            <div>
              <label htmlFor="cover-upload" className="text-sm text-[#fdf5ee]/70 cursor-pointer hover:text-[#fdf5ee]">
                {coverPreview || event?.cover_image ? 'Change photo' : 'Upload cover photo'}
              </label>
            </div>
          </div>
        </div>

        {/* Event Name */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Event Name</Label>
          <Input
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            className="bg-[#fdf5ee] text-[#2e1e1b] border-none"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Date */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Event Date</Label>
          <Input
            type="date"
            value={settings.date}
            onChange={(e) => setSettings({ ...settings, date: e.target.value })}
            className="bg-[#fdf5ee] text-[#2e1e1b] border-none"
          />
        </div>

        {/* Date Format */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Date Format</Label>
          <Select value={settings.date_format} onValueChange={(value) => setSettings({ ...settings, date_format: value })}>
            <SelectTrigger className="bg-[#fdf5ee] text-[#2e1e1b] border-none">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              <SelectItem value="MMMM DD, YYYY">Month DD, YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Font</Label>
          <Select
            value={settings.font_family}
            onValueChange={(value) => setSettings({ ...settings, font_family: value })}
          >
            <SelectTrigger className="bg-[#fdf5ee] text-[#2e1e1b] border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Playfair Display">Playfair Display</SelectItem>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Open Sans">Open Sans</SelectItem>
              <SelectItem value="Lato">Lato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Design */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Page Design</Label>
          <Select value={settings.page_template} onValueChange={(value) => setSettings({ ...settings, page_template: value })}>
            <SelectTrigger className="bg-[#fdf5ee] text-[#2e1e1b] border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template1">Classic</SelectItem>
              <SelectItem value="template2">Modern</SelectItem>
              <SelectItem value="template3">Elegant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4"> 
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#b8705e] hover:bg-[#a45f50] text-white w-full sm:w-1/2"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </div>

      {/* Right Preview Panel */}
      <div className="w-full lg:w-1/2 bg-[#c5d2d9] flex items-center justify-center p-6 pt-16">
        {renderTemplatePreview()}
      </div>
    </div>
  );
};

export default EventCustomizePage;