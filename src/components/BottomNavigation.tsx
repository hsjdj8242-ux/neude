'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  Cog6ToothIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  MagnifyingGlassIcon as MagnifyingGlassIconSolid, 
  Cog6ToothIcon as Cog6ToothIconSolid,
  DevicePhoneMobileIcon as DevicePhoneMobileIconSolid
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const navigationItems = [
  {
    name: 'التطبيقات',
    href: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: 'الألعاب',
    href: '/games',
    icon: DevicePhoneMobileIcon,
    activeIcon: DevicePhoneMobileIconSolid,
  },
  {
    name: 'البحث',
    href: '/search',
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    name: 'الإعدادات',
    href: '/settings',
    icon: Cog6ToothIcon,
    activeIcon: Cog6ToothIconSolid,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show bottom navigation on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <motion.button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <motion.div
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}