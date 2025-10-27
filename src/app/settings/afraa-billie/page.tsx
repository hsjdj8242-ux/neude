'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Mock images data - في التطبيق الحقيقي ستكون هذه صور حقيقية
const afraaImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1494790108755-2616c9c1e4a3?w=400&h=600&fit=crop',
    alt: 'عفراء - صورة 1',
    title: 'عفراء الممثلة التركية الجميلة'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    alt: 'عفراء - صورة 2',
    title: 'عفراء في إطلالة رائعة'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    alt: 'عفراء - صورة 3',
    title: 'عفراء النجمة المتألقة'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
    alt: 'عفراء - صورة 4',
    title: 'عفراء في جلسة تصوير'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
    alt: 'عفراء - صورة 5',
    title: 'عفراء الأنيقة'
  }
];

const billieImages = [
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    alt: 'بيلي آيلش - صورة 1',
    title: 'بيلي آيلش النجمة العالمية'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    alt: 'بيلي آيلش - صورة 2',
    title: 'بيلي آيلش في الحفل'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    alt: 'بيلي آيلش - صورة 3',
    title: 'بيلي آيلش المبدعة'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
    alt: 'بيلي آيلش - صورة 4',
    title: 'بيلي آيلش في الاستوديو'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
    alt: 'بيلي آيلش - صورة 5',
    title: 'بيلي آيلش الموهوبة'
  }
];

const allImages = [...afraaImages, ...billieImages];

export default function AfraaAndBilliePage() {
  const [selectedImage, setSelectedImage] = useState<typeof allImages[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'afraa' | 'billie'>('all');

  const getFilteredImages = () => {
    switch (activeTab) {
      case 'afraa':
        return afraaImages;
      case 'billie':
        return billieImages;
      default:
        return allImages;
    }
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للإعدادات</span>
            </Button>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Afraa & Billie
          </h1>
          <p className="text-xl opacity-90">
            معرض صور عفراء الممثلة التركية وبيلي آيلش
          </p>
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-center space-x-4">
          <Button
            variant={activeTab === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            الكل ({allImages.length})
          </Button>
          <Button
            variant={activeTab === 'afraa' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('afraa')}
          >
            عفراء ({afraaImages.length})
          </Button>
          <Button
            variant={activeTab === 'billie' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('billie')}
          >
            بيلي آيلش ({billieImages.length})
          </Button>
        </div>
      </motion.section>

      {/* Image Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium truncate">
                    {image.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={800}
                height={1200}
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <h3 className="text-white text-xl font-bold mb-2">
                {selectedImage.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Info Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            معرض مميز
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            مجموعة مختارة من أجمل صور عفراء الممثلة التركية الموهوبة وبيلي آيلش النجمة العالمية المبدعة.
            استمتع بمشاهدة هذه الصور الرائعة واكتشف جمال الفن والإبداع.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>• {afraaImages.length} صور عفراء</span>
            <span>• {billieImages.length} صور بيلي آيلش</span>
            <span>• {allImages.length} صورة إجمالي</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}