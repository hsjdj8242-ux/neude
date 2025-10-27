'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Smartphone, Gamepad2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppCard from '@/components/ui/AppCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { App } from '@/types';

// Combined mock data (apps + games)
const mockData: App[] = [
  // Apps
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
  // Games
  {
    id: 'g1',
    name: 'PUBG Mobile',
    description: 'لعبة باتل رويال الأكثر شعبية',
    longDescription: 'لعبة PUBG Mobile هي لعبة باتل رويال مثيرة حيث يقاتل 100 لاعب في جزيرة للبقاء على قيد الحياة.',
    developer: 'Tencent Games',
    category: 'game',
    version: '2.9.0',
    size: '1.2 GB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGTzI6mdQqHEwWH8kCTSClbQ=w240-h480-rw',
    screenshots: [],
    rating: 4.3,
    ratingsCount: 25000000,
    downloadCount: 1000000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-11-15'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['أكشن', 'باتل رويال', 'متعددة اللاعبين'],
    requirements: ['Android 5.1+', '3GB RAM']
  },
  {
    id: 'g2',
    name: 'Voxin Racing',
    description: 'لعبة سباق مثيرة من Voxin',
    longDescription: 'لعبة سباق متطورة مع جرافيك عالي الجودة وسيارات متنوعة ومسارات مثيرة.',
    developer: 'Voxin',
    category: 'game',
    version: '2.1.5',
    size: '850 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY7RzVUJSnOLoGNRRzqx8pXdXJnhLdAykBqRqiWKaWkOQSg=w240-h480-rw',
    screenshots: [],
    rating: 4.7,
    ratingsCount: 180000,
    downloadCount: 3500000,
    isVoxinApp: true,
    releaseDate: new Date('2024-01-20'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['سباق', 'سيارات', 'ثلاثي الأبعاد'],
    requirements: ['Android 7.0+', '4GB RAM']
  },
  {
    id: 'g3',
    name: 'Clash of Clans',
    description: 'ابن قريتك وقاتل اللاعبين الآخرين',
    longDescription: 'لعبة استراتيجية شهيرة حيث تبني قريتك وتدربها وتقاتل ضد لاعبين آخرين من جميع أنحاء العالم.',
    developer: 'Supercell',
    category: 'game',
    version: '15.547.22',
    size: '285 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/LByrur1mTmPeNr0ljI-uAUcct1rzmTve5Esau1SwoAzjBXQUby6uHIfHbF9HAqSOrKU=w240-h480-rw',
    screenshots: [],
    rating: 4.5,
    ratingsCount: 45000000,
    downloadCount: 500000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-10-05'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['استراتيجية', 'بناء', 'متعددة اللاعبين'],
    requirements: ['Android 5.0+']
  }
];

export default function SearchPage() {
  const { user, isGuest } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'app' | 'game'>('all');
  const [selectedDeveloper, setSelectedDeveloper] = useState<'all' | 'voxin' | 'others'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'downloads'>('name');

  const filteredResults = useMemo(() => {
    let results = mockData;

    // Filter by search query
    if (searchQuery.trim()) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Filter by developer
    if (selectedDeveloper === 'voxin') {
      results = results.filter(item => item.isVoxinApp);
    } else if (selectedDeveloper === 'others') {
      results = results.filter(item => !item.isVoxinApp);
    }

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'ar');
      }
    });

    return results;
  }, [searchQuery, selectedCategory, selectedDeveloper, sortBy]);

  const handleDownload = (item: App) => {
    if (isGuest) {
      alert(`يرجى تسجيل الدخول لتحميل ${item.category === 'app' ? 'التطبيقات' : 'الألعاب'}`);
      return;
    }
    console.log('Downloading:', item.name);
  };

  const handleViewDetails = (item: App) => {
    console.log('Viewing details for:', item.name);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDeveloper('all');
    setSortBy('name');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white mb-8">
          <Search className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            البحث والاستكشاف
          </h1>
          <p className="text-xl opacity-90">
            ابحث عن التطبيقات والألعاب المفضلة لديك
          </p>
        </div>
      </motion.section>

      {/* Search Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="ابحث عن التطبيقات والألعاب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
            className="text-lg py-4"
          />
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>الفلاتر</span>
            </Button>
            {(selectedCategory !== 'all' || selectedDeveloper !== 'all' || sortBy !== 'name') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-2 text-red-600"
              >
                <X className="w-4 h-4" />
                <span>مسح الفلاتر</span>
              </Button>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredResults.length} نتيجة
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  النوع
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="ml-2"
                    />
                    الكل
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="app"
                      checked={selectedCategory === 'app'}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="ml-2"
                    />
                    <Smartphone className="w-4 h-4 ml-1" />
                    التطبيقات
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="game"
                      checked={selectedCategory === 'game'}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="ml-2"
                    />
                    <Gamepad2 className="w-4 h-4 ml-1" />
                    الألعاب
                  </label>
                </div>
              </div>

              {/* Developer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  المطور
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="developer"
                      value="all"
                      checked={selectedDeveloper === 'all'}
                      onChange={(e) => setSelectedDeveloper(e.target.value as any)}
                      className="ml-2"
                    />
                    الكل
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="developer"
                      value="voxin"
                      checked={selectedDeveloper === 'voxin'}
                      onChange={(e) => setSelectedDeveloper(e.target.value as any)}
                      className="ml-2"
                    />
                    Voxin
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="developer"
                      value="others"
                      checked={selectedDeveloper === 'others'}
                      onChange={(e) => setSelectedDeveloper(e.target.value as any)}
                      className="ml-2"
                    />
                    مطورون آخرون
                  </label>
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ترتيب حسب
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="name">الاسم</option>
                  <option value="rating">التقييم</option>
                  <option value="downloads">عدد التنزيلات</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Results */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((item) => (
              <AppCard
                key={item.id}
                app={item}
                onDownload={handleDownload}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              لم نجد أي نتائج تطابق بحثك. جرب كلمات مختلفة أو قم بتعديل الفلاتر.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              مسح الفلاتر
            </Button>
          </div>
        )}
      </motion.section>

      {/* Guest Notice */}
      {isGuest && filteredResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center"
        >
          <Search className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            وجدت ما تبحث عنه؟
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-4">
            سجل دخولك لتحميل التطبيقات والألعاب والاستفادة من جميع الميزات
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