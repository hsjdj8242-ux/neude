import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Download, Calendar, MoreHorizontal } from 'lucide-react';
import { App } from '@/types';
import Button from './Button';

interface AppCardProps {
  app: App;
  onDownload?: (app: App) => void;
  onViewDetails?: (app: App) => void;
  variant?: 'default' | 'horizontal' | 'large';
}

export default function AppCard({ app, onDownload, onViewDetails, variant = 'default' }: AppCardProps) {
  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Horizontal variant for list view (like Google Play Store)
  if (variant === 'horizontal') {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewDetails?.(app)}
        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        {/* App Icon */}
        <div className="w-12 h-12 relative rounded-xl overflow-hidden flex-shrink-0 ml-4">
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

        {/* App Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">
            {app.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-1">
            {app.developer}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 ml-1" />
              <span>{app.rating?.toFixed(1) || '0.0'}</span>
            </div>
            <span>•</span>
            <span>{app.size}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDownload?.(app);
          }}
          size="sm"
          className="px-4 py-1.5 text-xs"
        >
          تثبيت
        </Button>
      </motion.div>
    );
  }

  // Large variant for featured apps
  if (variant === 'large') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewDetails?.(app)}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Featured Image */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
          <Image
            src={app.screenshots?.[0] || app.iconUrl || '/placeholder-app.svg'}
            alt={app.name}
            fill
            className="object-cover opacity-80"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-app.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* App Icon Overlay */}
          <div className="absolute bottom-4 right-4 w-12 h-12 relative rounded-xl overflow-hidden border-2 border-white">
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

        {/* App Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
            {app.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
            {app.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 ml-1" />
                <span>{app.rating?.toFixed(1) || '0.0'}</span>
              </div>
              <span>•</span>
              <span>{app.size}</span>
            </div>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(app);
              }}
              size="sm"
              className="px-4"
            >
              تثبيت
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
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
            {app.isVoxinApp && (
              <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                Voxin
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {app.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {app.developer}
            </p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{app.rating?.toFixed(1) || '0.0'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{formatDownloadCount(app.downloadCount || 0)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{app.releaseDate?.toLocaleDateString('ar-SA') || 'غير محدد'}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
          {app.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">الحجم: </span>
            <span className="font-medium text-gray-900 dark:text-white">{app.size}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(app)}
            >
              التفاصيل
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onDownload?.(app)}
            >
              تحميل
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}