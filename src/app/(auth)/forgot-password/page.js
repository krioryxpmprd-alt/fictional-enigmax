'use client'; // Required for client-side interactivity

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { QrCode, Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailExists, setEmailExists] = useState(true);
  const { resetPassword } = useAuth();

  // Add this function to check if email exists
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.exists;
      }
      return false;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First check if email exists
      const exists = await checkEmailExists(email);
      setEmailExists(exists);
      
      if (!exists) {
        toast({
          title: 'Email Not Found',
          description: 'This email is not registered in our system.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // If email exists, send reset password
      await resetPassword(email);
      setSent(true);
      toast({
        title: 'Success',
        description: 'Password reset link has been sent to your email',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset link',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#f2adc8]/20 px-4">
      <Card className="w-full max-w-md p-8 bg-white border-0 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            {sent
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2b2d2f]">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#f2adc8] focus:ring-[#f2adc8]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white font-semibold"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className={`border rounded-lg p-4 ${emailExists ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-center ${emailExists ? 'text-green-800' : 'text-blue-800'}`}>
                {emailExists 
                  ? `We've sent a password reset link to <strong>${email}</strong>. Please check your inbox and follow the instructions.`
                  : `If an account exists with <strong>${email}</strong>, we've sent a password reset link. Please check your inbox.`
                }
              </p>
            </div>
            <Button
              onClick={() => setSent(false)}
              variant="outline"
              className="w-full h-12"
            >
              Try Another Email
            </Button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center space-x-4">
          <Link
            href="/login"
            className="flex items-center text-sm text-gray-500 hover:text-[#f2adc8]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to login
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-sm text-gray-500 hover:text-[#f2adc8]">
            Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;