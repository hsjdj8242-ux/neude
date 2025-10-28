'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Star, TrendingUp, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppCard from '@/components/ui/AppCard';
import Button from '@/components/ui/Button';
import BannerCarousel from '@/components/BannerCarousel';
import { App } from '@/types';

// Mock games data
const mockGames: App[] = [
  {
    id: 'g1',
    name: 'PUBG Mobile',
    description: 'لعبة باتل رويال الأكثر شعبية',
    longDescription: 'لعبة PUBG Mobile هي لعبة باتل رويال مجانية تضم 100 لاعب في معركة ملحمية للبقاء على قيد الحياة.',
    developer: 'Tencent Games',
    category: 'game',
    version: '2.9.0',
    size: '1.2 GB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGTzI6mdQqTJXTb5jg8pDd8w=w240-h480-rw',
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
    longDescription: 'لعبة سباق متطورة تتميز بجرافيك عالي الجودة وسيارات متنوعة ومسارات مثيرة.',
    developer: 'Voxin',
    category: 'game',
    version: '2.1.5',
    size: '850 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY7Dh5hIkTkT5z5UjXK5uOZtjYjYjYjYjYjYjYjYjYjYjYjY=w240-h480-rw',
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
    description: 'لعبة الاستراتيجية الشهيرة',
    longDescription: 'ابن قريتك، اجمع جيشك، وقاتل في حروب الكلانات في هذه اللعبة الاستراتيجية الممتعة.',
    developer: 'Supercell',
    category: 'game',
    version: '15.547.22',
    size: '285 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/LByrur1mTmPeNr0ljI-uAUcct1rzmTve5Esau1SwoAzjBXQUby6uHIfHbF9HAqSOrKgG=w240-h480-rw',
    screenshots: [],
    rating: 4.5,
    ratingsCount: 45000000,
    downloadCount: 500000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-10-10'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['استراتيجية', 'بناء', 'متعددة اللاعبين'],
    requirements: ['Android 5.0+', '2GB RAM']
  },
  {
    id: 'g4',
    name: 'Voxin Adventure',
    description: 'مغامرة ملحمية من Voxin',
    longDescription: 'انطلق في مغامرة ملحمية مليئة بالألغاز والتحديات والكنوز المخفية.',
    developer: 'Voxin',
    category: 'game',
    version: '1.8.3',
    size: '650 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/adventure-game-icon=w240-h480-rw',
    screenshots: [],
    rating: 4.9,
    ratingsCount: 95000,
    downloadCount: 1800000,
    isVoxinApp: true,
    releaseDate: new Date('2024-02-05'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['مغامرة', 'ألغاز', 'قصة'],
    requirements: ['Android 6.0+', '3GB RAM']
  },
  {
    id: 'g5',
    name: 'Among Us',
    description: 'لعبة الغموض والخداع',
    longDescription: 'اكتشف المحتالين في هذه اللعبة الاجتماعية المثيرة التي تتطلب التعاون والذكاء.',
    developer: 'InnerSloth',
    category: 'game',
    version: '2023.11.28',
    size: '250 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY7Dh5hIkTkT5z5UjXK5uOZtjYjYjYjYjYjYjYjYjYjYjYjY=w240-h480-rw',
    screenshots: [],
    rating: 4.0,
    ratingsCount: 8000000,
    downloadCount: 100000000,
    isVoxinApp: false,
    releaseDate: new Date('2023-11-28'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['اجتماعية', 'غموض', 'متعددة اللاعبين'],
    requirements: ['Android 4.4+', '1GB RAM']
  },
  {
    id: 'g6',
    name: 'Voxin Puzzle Master',
    description: 'تحدي الألغاز من Voxin',
    longDescription: 'اختبر ذكاءك مع مجموعة متنوعة من الألغاز المثيرة والتحديات الذهنية.',
    developer: 'Voxin',
    category: 'game',
    version: '3.0.1',
    size: '120 MB',
    downloadUrl: '#',
    iconUrl: 'https://play-lh.googleusercontent.com/puzzle-game-icon=w240-h480-rw',
    screenshots: [],
    rating: 4.6,
    ratingsCount: 75000,
    downloadCount: 1200000,
    isVoxinApp: true,
    releaseDate: new Date('2024-01-10'),
    updatedAt: new Date(),
    createdAt: new Date(),
    tags: ['ألغاز', 'ذكاء', 'تحدي'],
    requirements: ['Android 5.0+', '1GB RAM']
  }
];

const categories = [
  { id: 'all', name: 'الكل', icon: Gamepad2 },
  { id: 'action', name: 'أكشن', icon: Star },
  { id: 'strategy', name: 'استراتيجية', icon: TrendingUp },
  { id: 'puzzle', name: 'ألغاز', icon: Sparkles },
  { id: 'racing', name: 'سباق', icon: Filter },
];

export default function GamesPage() {
  const { user, isGuest } = useAuth();
  const [games, setGames] = useState<App[]>([]);
  const [voxinGames, setVoxinGames] = useState<App[]>([]);
  const [featuredGames, setFeaturedGames] = useState<App[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredGames, setFilteredGames] = useState<App[]>([]);

  useEffect(() => {
    // Simulate loading games from Firebase
    setGames(mockGames);
    setVoxinGames(mockGames.filter(game => game.isVoxinApp));
    setFeaturedGames(mockGames.filter(game => game.rating >= 4.5));
    setFilteredGames(mockGames);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => 
        game.tags.some(tag => 
          tag.includes(getCategoryKeyword(selectedCategory))
        )
      ));
    }
  }, [selectedCategory, games]);

  const getCategoryKeyword = (category: string) => {
    switch (category) {
      case 'action': return 'أكشن';
      case 'strategy': return 'استراتيجية';
      case 'puzzle': return 'ألغاز';
      case 'racing': return 'سباق';
      default: return '';
    }
  };

  const handleDownload = (game: App) => {
    if (isGuest) {
      alert('يرجى تسجيل الدخول لتحميل الألعاب');
      return;
    }
    console.log('Downloading game:', game.name);
  };

  const handleViewDetails = (game: App) => {
    console.log('Viewing details for:', game.name);
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

      {/* Premium Games Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            الألعاب المميزة
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Featured Game Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          <BannerCarousel apps={featuredGames.slice(0, 3)} />
          
          {/* Game Info Below Banner */}
          {featuredGames.length > 0 && (
            <div className="p-4">
              <AppCard
                app={featuredGames[0]}
                variant="horizontal"
                onDownload={handleDownload}
                onViewDetails={handleViewDetails}
              />
            </div>
          )}
        </div>
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
          {voxinGames.slice(0, 3).map((game) => (
            <AppCard
              key={game.id}
              app={game}
              variant="horizontal"
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </motion.section>

      {/* All Games List */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="space-y-3">
          {filteredGames.map((game) => (
            <AppCard
              key={game.id}
              app={game}
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
          className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 text-center"
        >
          <Gamepad2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            استمتع بالألعاب أكثر!
          </h3>
          <p className="text-purple-700 dark:text-purple-300 mb-4">
            سجل دخولك لحفظ تقدمك في الألعاب والوصول إلى ميزات إضافية
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