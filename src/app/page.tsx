'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppCard from '@/components/ui/AppCard';
import Button from '@/components/ui/Button';
import BannerCarousel from '@/components/BannerCarousel';
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
    <div className="container mx-auto px-4 py-4">
      {/* Top Tabs */}
      <div className="flex items-center justify-between mb-6 overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2 whitespace-nowrap">
            لك
          </button>
          <button className="text-gray-600 dark:text-gray-400 font-medium pb-2 whitespace-nowrap hover:text-gray-900 dark:hover:text-gray-200">
            أفضل المخططات
          </button>
          <button className="text-gray-600 dark:text-gray-400 font-medium pb-2 whitespace-nowrap hover:text-gray-900 dark:hover:text-gray-200">
            مميز
          </button>
          <button className="text-gray-600 dark:text-gray-400 font-medium pb-2 whitespace-nowrap hover:text-gray-900 dark:hover:text-gray-200">
            الفئات
          </button>
        </div>
      </div>

      {/* Banner Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8"
      >
        <BannerCarousel apps={featuredApps.slice(0, 5)} />
      </motion.section>

      {/* Sponsored Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">برعاية</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              مقترح لك
            </h2>
          </div>
          <button className="p-1">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {voxinApps.slice(0, 3).map((app) => (
            <AppCard
              key={app.id}
              app={app}
              variant="horizontal"
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </motion.section>

      {/* All Apps List */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="space-y-3">
          {recentApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              variant="horizontal"
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
