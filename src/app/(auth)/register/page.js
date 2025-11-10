'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { QrCode, Mail, Lock, User } from 'lucide-react';

// SEO Metadata - This is crucial for search engines


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Registration failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#f2adc8]/20 px-4 py-12">
      {/* Schema.org structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "MemoryBox Registration",
            "description": "Create your MemoryBox account to start collecting and sharing memories",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/register`,
            "mainEntity": {
              "@type": "WebApplication",
              "name": "MemoryBox",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "description": "Digital memory collection and sharing platform"
            }
          })
        }}
      />
      
      <Card className="w-full max-w-md p-8 bg-white border-0 shadow-2xl">
        {/* Semantic HTML structure for better accessibility and SEO */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="h-16 w-16 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">Create Account</h1>
          <p className="text-gray-600">Start collecting memories today</p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby="registration-form">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#2b2d2f]">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#f2adc8] focus:ring-[#f2adc8]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2b2d2f]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#f2adc8] focus:ring-[#f2adc8]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2b2d2f]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#f2adc8] focus:ring-[#f2adc8]"
                  aria-required="true"
                  minLength="6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#2b2d2f]">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#f2adc8] focus:ring-[#f2adc8]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-gray-300 text-[#f2adc8] focus:ring-[#f2adc8]"
                aria-required="true"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-[#f2adc8] hover:text-[#f4c2c2]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#f2adc8] hover:text-[#f4c2c2]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#f2adc8] to-[#f4c2c2] hover:from-[#f4c2c2] hover:to-[#f2adc8] text-white font-semibold"
              aria-label={loading ? 'Creating your account' : 'Create account'}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </main>

        <footer className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#f2adc8] hover:text-[#f4c2c2] font-semibold">
              Sign in
            </Link>
          </p>
        </footer>

        <nav className="mt-6" aria-label="Secondary navigation">
          <Link href="/" className="block text-center text-sm text-gray-500 hover:text-[#f2adc8]">
            ← Back to home
          </Link>
        </nav>
      </Card>
    </div>
  );
};

export default RegisterPage;