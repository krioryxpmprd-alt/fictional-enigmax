'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { QrCode, Mail, ArrowLeft } from 'lucide-react';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/herosection/Navigation';
import './styles.css'

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
      console.error('Грешка при проверка на е-пошта:', error);
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
          title: 'Е-поштата не е пронајдена',
          description: 'Оваа е-пошта не е регистрирана во нашиот систем.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // If email exists, send reset password
      await resetPassword(email);
      setSent(true);
      toast({
        title: 'Успешно',
        description: 'Линкот за ресетирање на лозинката е испратен на вашата е-пошта',
      });
    } catch (error) {
      toast({
        title: 'Грешка',
        description: error.message || 'Неуспешно испраќање на линкот за ресетирање',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navigation/>
    <div className="min-h-screen flex items-center justify-center px-4" id="forgot-password-container">
      <Card className="w-full max-w-md p-8 " id="max-wd">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-[#e24b2c] to-[#f97316] rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">Ја заборавивте лозинката?</h1>
          <p className="text-gray-600">
            {sent
              ? 'Проверете ја вашата е-пошта за инструкции за ресетирање'
              : 'Внесете ја вашата е-пошта за да добиете линк за ресетирање'}
          </p>
        </div>

        {!sent ? (
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#e24b2c] to-[#f97316] hover:from-[#f97316] hover:to-[#e24b2c] text-white font-semibold"
            >
              {loading ? 'Се испраќа...' : 'Испрати линк за ресетирање'}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className={`border rounded-lg p-4 ${emailExists ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-center ${emailExists ? 'text-green-800' : 'text-blue-800'}`}>
                {emailExists 
                  ? `Испративме линк за ресетирање на лозинката на <strong>${email}</strong>. Ве молиме проверете ја вашата е-пошта и следете ги инструкциите.`
                  : `Доколку постои профил со е-пошта <strong>${email}</strong>, испративме линк за ресетирање на лозинката. Ве молиме проверете ја вашата е-пошта.`
                }
              </p>
            </div>
            <Button
              onClick={() => setSent(false)}
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              Пробајте со друга е-пошта
            </Button>
          </div>
        )}

        <div className="mt-6 flex items-left justify-left space-x-4">
          <Link
            href="/login"
            className="flex items-left text-sm text-gray-500 hover:text-[#e24b2c]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад кон најава
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-sm text-gray-500 hover:text-[#e24b2c]">
            Почетна
          </Link>
        </div>
      </Card>
    </div>
    <Footer/>
    
    </>
  );
};

export default ForgotPasswordPage;