'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { QrCode, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/herosection/Navigation';
import './styles.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Успешно',
        description: 'Успешно се најавивте!',
      });
      // The useEffect above will handle the redirect
    } catch (error) {
      toast({
        title: 'Грешка',
        description: error.message || 'Погрешна email адреса или лозинка',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e24b2c]/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e24b2c]"></div>
      </div>
    );
  }

  // Don't render form if user is logged in (will redirect)
  if (user) {
    return null;
  }

  return (
    <>
    <Navigation/>
    <div className="min-h-screen flex items-center justify-center px-4" id="najavi-se-container">
      <Card className="w-full max-w-md" id="max-wd">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-[#e24b2c] to-[#f97316] rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">Добредојдовте</h1>
          <p className="text-gray-600">Најавете се на вашиот MojMoment профил</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2b2d2f]">E-mail адреса</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="E-mail адреса*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#2b2d2f]">Лозинка</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Лозинка*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e24b2c] transition-colors p-2 cursor-pointer"
                aria-label={showPassword ? "Сокриј лозинка" : "Покажи лозинка"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-[#e24b2c] focus:ring-[#e24b2c]"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Запомни ме
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#e24b2c] hover:text-[#f97316]">
              Ја заборави лозинката?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#e24b2c] to-[#f97316] hover:from-[#f97316] hover:to-[#e24b2c] text-white font-semibold cursor-pointer"
          >
            {loading ? 'Се најавувам...' : 'Најави се'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Немате профил?{' '}
            <Link href="/register" className="text-[#e24b2c] hover:text-[#f97316] font-semibold">
              Регистрирај се
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <Link href="/" className="block text-left text-sm text-gray-500 hover:text-[#e24b2c]">
            ← Назад кон почетна
          </Link>
        </div>
      </Card>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;