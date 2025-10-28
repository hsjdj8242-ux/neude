'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { App } from '@/types';

interface BannerCarouselProps {
  apps: App[];
}

export default function BannerCarousel({ apps }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || apps.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % apps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [apps.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + apps.length) % apps.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % apps.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!apps.length) return null;

  const currentApp = apps[currentIndex];

  return (
    <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-between p-6"
        >
          {/* App Info */}
          <div className="flex-1 text-white z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
              {currentApp.name}
            </h2>
            <p className="text-sm md:text-base opacity-90 mb-4 line-clamp-2">
              {currentApp.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                ⭐ {currentApp.rating?.toFixed(1) || '0.0'}
              </span>
              <span>{currentApp.size}</span>
              <span className="px-2 py-1 bg-white/20 rounded-full">
                {currentApp.category === 'game' ? 'لعبة' : 'تطبيق'}
              </span>
            </div>
          </div>

          {/* App Icon */}
          <div className="flex-shrink-0 ml-4">
            <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={currentApp.iconUrl || (currentApp.category === 'game' ? '/placeholder-game.svg' : '/placeholder-app.svg')}
                alt={currentApp.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = currentApp.category === 'game' ? '/placeholder-game.svg' : '/placeholder-app.svg';
                }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src={currentApp.screenshots?.[0] || currentApp.iconUrl || '/placeholder-app.svg'}
          alt=""
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-app.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
      </div>

      {/* Navigation Arrows */}
      {apps.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {apps.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {apps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
        </motion.div>
      </div>
    </div>
  );
}