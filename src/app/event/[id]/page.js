'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import EventDetailContent from './components/EventDetailContent';

const EventDetailPage = () => {
  const { id: eventId } = useParams();
  
  return <EventDetailContent eventId={eventId} />;
};

export default EventDetailPage;