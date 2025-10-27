'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { signUp, signInWithGoogle, signInAsGuest } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, displayName);
      toast.success('تم إنشاء الحساب بنجاح!');
      router.push('/');
    } catch (error: any) {
      toast.error('خطأ في إنشاء الحساب. حاول مرة أخرى.');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success('تم إنشاء الحساب بنجاح!');
      router.push('/');
    } catch (error: any) {
      toast.error('خطأ في التسجيل بـ Google');
      console.error('Google sign in error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestSignIn = () => {
    signInAsGuest();
    toast.success('مرحباً بك كضيف!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              إنشاء حساب جديد
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              انضم إلى Volin واستمتع بأفضل التطبيقات والألعاب
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full mb-6 flex items-center justify-center space-x-3"
            onClick={handleGoogleSignIn}
            loading={googleLoading}
          >
            <FcGoogle className="w-5 h-5" />
            <span>التسجيل بـ Google</span>
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">أو</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="الاسم"
              placeholder="أدخل اسمك"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              icon={<User className="w-5 h-5 text-gray-400" />}
              required
            />

            <Input
              type="email"
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                required
              />
              <button
                type="button"
                className="absolute left-3 top-11 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              إنشاء حساب
            </Button>
          </form>

          {/* Guest Access */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleGuestSignIn}
            >
              الدخول كضيف (بدون تسجيل)
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}