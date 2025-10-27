'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  Share2, 
  Heart, 
  Calendar, 
  HardDrive, 
  Smartphone,
  Shield,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { App, Rating } from '@/types';
import { useParams } from 'next/navigation';

// Mock app data
const mockApp: App = {
  id: '1',
  name: 'WhatsApp Messenger',
  description: 'تطبيق المراسلة الأكثر شعبية في العالم',
  longDescription: `تطبيق WhatsApp Messenger هو تطبيق مراسلة مجاني ومتاح لهواتف Android وأجهزة أخرى. يستخدم WhatsApp اتصال هاتفك بالإنترنت للتراسل والاتصال مع الأصدقاء والعائلة.

الميزات الرئيسية:
• بدون رسوم إضافية: يستخدم اتصال الإنترنت
• وسائط متعددة: صور، فيديو، مستندات، رسائل صوتية
• مكالمات مجانية: صوتية ومرئية
• مجموعات: للتواصل مع الأصدقاء والعائلة
• التشفير الشامل: أمان رسائلك ومكالماتك`,
  developer: 'WhatsApp LLC',
  category: 'app',
  version: '2.23.24.76',
  size: '65.2 MB',
  downloadUrl: '#',
  iconUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw',
  screenshots: [],
  rating: 4.1,
  ratingsCount: 50000000,
  downloadCount: 5000000000,
  isVoxinApp: false,
  releaseDate: new Date('2023-12-01'),
  updatedAt: new Date('2024-01-15'),
  createdAt: new Date('2009-01-01'),
  tags: ['مراسلة', 'تواصل', 'مكالمات', 'وسائط متعددة'],
  requirements: ['Android 4.1 والأحدث', '100 MB مساحة فارغة', 'اتصال بالإنترنت']
};

// Mock ratings
const mockRatings: Rating[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'أحمد محمد',
    appId: '1',
    rating: 5,
    comment: 'تطبيق رائع جداً، سهل الاستخدام ومفيد للغاية. أنصح به بشدة!',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'فاطمة علي',
    appId: '1',
    rating: 4,
    comment: 'تطبيق جيد ولكن يحتاج لبعض التحسينات في الواجهة.',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
];

export default function AppDetailsPage() {
  const params = useParams();
  const { user, isGuest } = useAuth();
  const [app, setApp] = useState<App | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setApp(mockApp);
    setRatings(mockRatings);
  }, [params.id]);

  const handleDownload = () => {
    if (isGuest) {
      alert('يرجى تسجيل الدخول لتحميل التطبيقات');
      return;
    }
    if (app) {
      console.log('Downloading app:', app.name);
    }
  };

  const handleRating = (rating: number) => {
    if (isGuest) {
      alert('يرجى تسجيل الدخول لتقييم التطبيقات');
      return;
    }
    setUserRating(rating);
  };

  const submitRating = () => {
    if (isGuest || !user) {
      alert('يرجى تسجيل الدخول لإرسال التقييم');
      return;
    }
    
    if (userRating === 0) {
      alert('يرجى اختيار تقييم');
      return;
    }

    const newRating: Rating = {
      id: `r${Date.now()}`,
      userId: user.id,
      userName: user.displayName,
      appId: app?.id || '',
      rating: userRating,
      comment: userComment,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setRatings([newRating, ...ratings]);
    setUserRating(0);
    setUserComment('');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!app) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>العودة</span>
          </Button>
        </Link>
      </motion.div>

      {/* App Info */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-6">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-2xl overflow-hidden">
                <Image
                  src={app.iconUrl || (app.category === 'game' ? '/placeholder-game.svg' : '/placeholder-app.svg')}
                  alt={app.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = app.category === 'game' ? '/placeholder-game.svg' : '/placeholder-app.svg';
                  }}
                />
              </div>
            </div>

            {/* App Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {app.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    بواسطة {app.developer}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 ml-1" />
                      {app.rating} ({formatNumber(app.ratingsCount)})
                    </span>
                    <span className="flex items-center">
                      <Download className="w-4 h-4 ml-1" />
                      {formatNumber(app.downloadCount)}+ تنزيل
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-600' : 'text-gray-400'}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* App Info Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <HardDrive className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">الحجم</p>
            <p className="font-semibold text-gray-900 dark:text-white">{app.size}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">الإصدار</p>
            <p className="font-semibold text-gray-900 dark:text-white">{app.version}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">التحديث</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {app.updatedAt.toLocaleDateString('ar')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">الأمان</p>
            <p className="font-semibold text-gray-900 dark:text-white">آمن</p>
          </div>
        </div>
      </motion.section>

      {/* Description */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            حول التطبيق
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {app.longDescription}
            </p>
          </div>
          
          {/* Tags */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              العلامات
            </h3>
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              المتطلبات
            </h3>
            <ul className="space-y-2">
              {app.requirements.map((req, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Rating Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            التقييمات والمراجعات
          </h2>

          {/* Add Rating */}
          {!isGuest && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                أضف تقييمك
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      star <= userRating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                rows={3}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={submitRating}
                className="mt-3"
                disabled={userRating === 0}
              >
                إرسال التقييم
              </Button>
            </div>
          )}

          {/* Ratings List */}
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {rating.userName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${
                            star <= rating.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {rating.createdAt.toLocaleDateString('ar')}
                    </span>
                  </div>
                </div>
                {rating.comment && (
                  <p className="text-gray-600 dark:text-gray-400 mr-11">
                    {rating.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Guest Notice */}
      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center"
        >
          <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            احصل على التطبيق الآن
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            سجل دخولك لتحميل التطبيقات وإضافة التقييمات
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
    </div>
  );
}