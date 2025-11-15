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
import { QrCode, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/herosection/Navigation';
import './styles.css'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Грешка',
        description: 'Лозинките не се совпаѓаат',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Грешка',
        description: 'Лозинката мора да има најмалку 6 карактери',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: 'Успешно',
        description: 'Профилот е успешно креиран!',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Грешка',
        description: error.message || 'Регистрацијата не успеа',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navigation/>
    <div className="min-h-screen flex items-center justify-center px-4 py-12" id="registriraj-se-container">
     
      
      <Card className="w-full max-w-md p-8 " id="max-wd">
        {/* Semantic HTML structure for better accessibility and SEO */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="h-16 w-16 bg-gradient-to-br from-[#e24b2c] to-[#f97316] rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">Креирај Профил</h1>
          <p className="text-gray-600">Започнете да собирате спомени уште денес</p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby="registration-form">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#2b2d2f]">
                Име и презиме
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Име и презиме*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2b2d2f]">
                E-mail адреса
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail адреса*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2b2d2f]">
                Лозинка
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Лозинка*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
                  aria-required="true"
                  minLength="6"
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
              <p className="text-xs text-gray-500">Лозинката мора да има најмалку 6 карактери</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#2b2d2f]">
                Потврди лозинка
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Лозинка*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#e24b2c] focus:ring-[#e24b2c]"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e24b2c] transition-colors p-2 cursor-pointer"
                  aria-label={showConfirmPassword ? "Сокриј лозинка" : "Покажи лозинка"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-gray-300 text-[#e24b2c] focus:ring-[#e24b2c]"
                aria-required="true"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Се согласувам со{' '}
                <Link href="/uslovi" className="text-[#e24b2c] hover:text-[#f97316]">
                  Условите на користење
                </Link>{' '}
                и{' '}
                <Link href="/privatnost" className="text-[#e24b2c] hover:text-[#f97316]">
                  Политиката за приватност
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#e24b2c] to-[#f97316] hover:from-[#f97316] hover:to-[#e24b2c] text-white font-semibold cursor-pointer"
              aria-label={loading ? 'Креирање на профил' : 'Креирај профил'}
            >
              {loading ? 'Креирање на профил...' : 'Креирај профил'}
            </Button>
          </form>
        </main>

        <footer className="mt-6 text-center">
          <p className="text-gray-600">
            Веќе имате профил?{' '}
            <Link href="/login" className="text-[#e24b2c] hover:text-[#f97316] font-semibold">
              Најавете се
            </Link>
          </p>
        </footer>

        <nav className="mt-6" aria-label="Secondary navigation">
          <Link href="/" className="block text-left text-sm text-gray-500 hover:text-[#e24b2c]">
            ← Назад кон почетна
          </Link>
        </nav>
      </Card>
    </div>
    <Footer/>
    </>
  );
};

export default RegisterPage;