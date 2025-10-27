'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppCard from '@/components/ui/AppCard';
import Button from '@/components/ui/Button';
import { App } from '@/types';

// Mock data for demonstration
const mockApps: App[] = [
  {
    id: '1',
    name: 'WhatsApp',
    description: 'تطبيق المراسلة الأكثر شعبية في العالم',
    longDescription: 'تطبيق WhatsApp هو تطبيق مراسلة مجاني يتيح لك إرسال الرسائل والصور ومقاطع الفيديو والمكالمات الصوتية ومكالمات الفيديو مع الأصدقاء والعائلة.',
    developer: 'Meta',
    category: 'app',
    version: '2.23.24.76',
    size: '65 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw',
    screenshots: [],
    rating: 4.1,
    ratingsCount: 50000000,
    downloadCount: 5000000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-12-01'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['مراسلة', 'تواصل'],
    requirements: ['Android 4.1+']
  },
  {
    id: '2',
    name: 'Voxin Player',
    description: 'مشغل الوسائط المتطور من Voxin',
    longDescription: 'مشغل وسائط قوي ومتطور يدعم جميع صيغ الفيديو والصوت مع واجهة مستخدم جميلة وميزات متقدمة.',
    developer: 'Voxin',
    category: 'app',
    version: '1.5.2',
    size: '45 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU=w240-h480-rw',
    screenshots: [],
    rating: 4.8,
    ratingsCount: 125000,
    downloadCount: 2500000,
    isVoxinApp: true,
    releaseDate: new Date('2024-01-15'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['مشغل', 'وسائط', 'فيديو'],
    requirements: ['Android 6.0+']
  },
  {
    id: '3',
    name: 'Instagram',
    description: 'شارك لحظاتك مع العالم',
    longDescription: 'تطبيق Instagram لمشاركة الصور ومقاطع الفيديو مع الأصدقاء والعائلة والعالم.',
    developer: 'Meta',
    category: 'app',
    version: '302.0.0.23.108',
    size: '85 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fIGj_pjNqEQ6Sn2AfvU=w240-h480-rw',
    screenshots: [],
    rating: 4.2,
    ratingsCount: 100000000,
    downloadCount: 2000000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-11-20'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['تصوير', 'تواصل اجتماعي'],
    requirements: ['Android 5.0+']
  },
  {
    id: '4',
    name: 'Voxin Security',
    description: 'حماية شاملة لجهازك من Voxin',
    longDescription: 'تطبيق حماية متطور يوفر حماية شاملة ضد الفيروسات والبرامج الضارة مع ميزات الخصوصية المتقدمة.',
    developer: 'Voxin',
    category: 'app',
    version: '3.2.1',
    size: '32 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/BKKLaJj7vs6NNYQeOF_-v_KmF6gPn-9Hqb8cGhHvpJzOZOQrUoNJJjJJJJJJJJJJJJJ=w240-h480-rw',
    screenshots: [],
    rating: 4.9,
    ratingsCount: 85000,
    downloadCount: 1200000,
    isVoxinApp: true,
    releaseDate: new Date('2024-02-10'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['حماية', 'أمان', 'خصوصية'],
    requirements: ['Android 7.0+']
  }
];

export default function HomePage() {
  const { user, isGuest } = useAuth();
  const [featuredApps, setFeaturedApps] = useState<App[]>([]);
  const [voxinApps, setVoxinApps] = useState<App[]>([]);
  const [recentApps, setRecentApps] = useState<App[]>([]);

  useEffect(() => {
    // Simulate loading apps from Firebase
    setFeaturedApps(mockApps.slice(0, 2));
    setVoxinApps(mockApps.filter(app => app.isVoxinApp));
    setRecentApps(mockApps.slice(0, 4));
  }, []);

  const handleDownload = (app: App) => {
    if (isGuest) {
      alert('يرجى تسجيل الدخول لتحميل التطبيقات');
      return;
    }
    // Handle download logic
    console.log('Downloading app:', app.name);
  };

  const handleViewDetails = (app: App) => {
    // Navigate to app details page
    console.log('Viewing details for:', app.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">
            مرحباً بك في Volin
          </h1>
          <p className="text-xl opacity-90 mb-6">
            اكتشف وحمل أفضل التطبيقات والألعاب
          </p>
          {user && (
            <p className="text-lg">
              أهلاً وسهلاً {user.displayName}
              {isGuest && <span className="text-yellow-300"> (ضيف)</span>}
            </p>
          )}
        </div>
      </motion.section>

      {/* Featured Apps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Star className="w-6 h-6 text-yellow-500 ml-2" />
            التطبيقات المميزة
          </h2>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </motion.section>

      {/* Voxin Apps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-6 h-6 text-blue-500 ml-2" />
            تطبيقات Voxin
          </h2>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {voxinApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </motion.section>

      {/* Recent Apps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-6 h-6 text-green-500 ml-2" />
            التطبيقات الحديثة
          </h2>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
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
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            أنت تتصفح كضيف
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            سجل دخولك أو أنشئ حساباً جديداً للاستفادة من جميع الميزات وتحميل التطبيقات
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="sm">
              تسجيل الدخول
            </Button>
            <Button variant="outline" size="sm">
              إنشاء حساب
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
