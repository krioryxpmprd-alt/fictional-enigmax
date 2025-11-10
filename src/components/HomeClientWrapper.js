// components/HomeClientWrapper.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomeClientWrapper({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#f2adc8]/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2adc8]"></div>
      </div>
    );
  }

  // Don't show landing page if user is logged in (will redirect)
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#f2adc8]/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2adc8]"></div>
      </div>
    );
  }

  // Show landing page for non-logged in users
  return children;
}