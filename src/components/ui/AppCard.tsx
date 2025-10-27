import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Download, Calendar } from 'lucide-react';
import { App } from '@/types';
import Button from './Button';

interface AppCardProps {
  app: App;
  onDownload?: (app: App) => void;
  onViewDetails?: (app: App) => void;
}

export default function AppCard({ app, onDownload, onViewDetails }: AppCardProps) {
  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

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
                <span>{app.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{formatDownloadCount(app.downloadCount)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{app.releaseDate.toLocaleDateString('ar-SA')}</span>
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