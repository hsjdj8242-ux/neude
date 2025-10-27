'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Download, 
  Smartphone, 
  Gamepad2, 
  Heart, 
  Shield, 
  FileText, 
  Info,
  Moon,
  Sun,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';

const settingsItems = [
  {
    id: 'profile',
    title: 'الملف الشخصي',
    description: 'إدارة معلوماتك الشخصية',
    icon: User,
    href: '/settings/profile',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 'downloaded-apps',
    title: 'التطبيقات المحملة',
    description: 'عرض التطبيقات التي قمت بتحميلها',
    icon: Smartphone,
    href: '/settings/downloaded-apps',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 'downloaded-games',
    title: 'الألعاب المحملة',
    description: 'عرض الألعاب التي قمت بتحميلها',
    icon: Gamepad2,
    href: '/settings/downloaded-games',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 'afraa-billie',
    title: 'Afraa & Billie',
    description: 'معرض صور عفراء وبيلي آيلش',
    icon: Heart,
    href: '/settings/afraa-billie',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20'
  },
  {
    id: 'privacy',
    title: 'سياسة الخصوصية',
    description: 'اطلع على سياسة الخصوصية وشروط الاستخدام',
    icon: Shield,
    href: '/settings/privacy',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 'terms',
    title: 'شروط الاستخدام',
    description: 'قراءة شروط وأحكام الاستخدام',
    icon: FileText,
    href: '/settings/terms',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
  },
  {
    id: 'about-voxin',
    title: 'حول Voxin',
    description: 'معلومات عن شركة Voxin',
    icon: Info,
    href: '/settings/about-voxin',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100 dark:bg-teal-900/20'
  }
];

export default function SettingsPage() {
  const { user, isGuest, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl p-8 text-white mb-8">
          <Settings className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            الإعدادات
          </h1>
          <p className="text-xl opacity-90">
            إدارة حسابك وتخصيص تجربتك
          </p>
        </div>
      </motion.section>

      {/* User Info */}
      {user && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.displayName}
                  {isGuest && <span className="text-sm text-blue-600 mr-2">(ضيف)</span>}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              {!isGuest && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  تسجيل الخروج
                </Button>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Theme Toggle */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'light' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-700 text-gray-300'
              }`}>
                {theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  المظهر
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {theme === 'light' ? 'المظهر الفاتح' : 'المظهر الداكن'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{theme === 'light' ? 'داكن' : 'فاتح'}</span>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Settings Items */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={item.href}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bgColor}`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Guest Notice */}
      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center"
        >
          <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            احصل على تجربة كاملة
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            سجل دخولك أو أنشئ حساباً للوصول إلى جميع الميزات وحفظ إعداداتك
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/login">
              <Button variant="primary" size="sm">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="sm">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center text-gray-600 dark:text-gray-400"
      >
        <p className="mb-2">Volin - متجر التطبيقات والألعاب</p>
        <p className="text-sm">الإصدار 1.0.0</p>
      </motion.div>
    </div>
  );
}