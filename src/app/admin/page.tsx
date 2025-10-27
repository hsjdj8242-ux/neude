'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Users, 
  Download,
  Star,
  Smartphone,
  Gamepad2,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { App } from '@/types';
import { useRouter } from 'next/navigation';

// Mock data for admin panel
const mockApps: App[] = [
  {
    id: '1',
    name: 'WhatsApp',
    description: 'تطبيق المراسلة الأكثر شعبية في العالم',
    longDescription: 'تطبيق WhatsApp هو تطبيق مراسلة مجاني...',
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
    longDescription: 'مشغل وسائط قوي ومتطور...',
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
  }
];

export default function AdminPage() {
  const { user, isGuest } = useAuth();
  const router = useRouter();
  const [apps, setApps] = useState<App[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'app' | 'game'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (isGuest || !user) {
      router.push('/auth/login');
      return;
    }

    if (!user.isAdmin) {
      router.push('/');
      return;
    }

    // Load apps data
    setApps(mockApps);
  }, [user, isGuest, router]);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteApp = (appId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا التطبيق؟')) {
      setApps(apps.filter(app => app.id !== appId));
    }
  };

  const handleEditApp = (app: App) => {
    setEditingApp(app);
    setShowAddModal(true);
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

  // Show loading or redirect if not admin
  if (isGuest || !user || !user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            غير مصرح لك بالوصول
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            هذه الصفحة مخصصة للمديرين فقط
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-3xl p-8 text-white">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-center mb-4">
            لوحة الإدارة
          </h1>
          <p className="text-xl opacity-90 text-center">
            إدارة التطبيقات والألعاب في متجر Volin
          </p>
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التطبيقات</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {apps.filter(app => app.category === 'app').length}
                </p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الألعاب</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {apps.filter(app => app.category === 'game').length}
                </p>
              </div>
              <Gamepad2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">تطبيقات Voxin</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {apps.filter(app => app.isVoxinApp).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التنزيلات</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(apps.reduce((total, app) => total + app.downloadCount, 0))}
                </p>
              </div>
              <Download className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Controls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="البحث في التطبيقات والألعاب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5 text-gray-400" />}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">جميع الفئات</option>
                <option value="app">التطبيقات</option>
                <option value="game">الألعاب</option>
              </select>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setEditingApp(null);
                setShowAddModal(true);
              }}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة جديد</span>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Apps Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    التطبيق/اللعبة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    المطور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    التقييم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    التنزيلات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={app.iconUrl}
                            alt={app.name}
                          />
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {app.name}
                            {app.isVoxinApp && (
                              <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                                Voxin
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {app.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {app.developer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        app.category === 'app' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200'
                      }`}>
                        {app.category === 'app' ? (
                          <>
                            <Smartphone className="w-3 h-3 ml-1" />
                            تطبيق
                          </>
                        ) : (
                          <>
                            <Gamepad2 className="w-3 h-3 ml-1" />
                            لعبة
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 ml-1" />
                        {app.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatNumber(app.downloadCount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditApp(app)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteApp(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingApp ? 'تعديل' : 'إضافة'} {editingApp?.category === 'game' ? 'لعبة' : 'تطبيق'}
            </h2>
            
            <form className="space-y-4">
              <Input
                label="اسم التطبيق/اللعبة"
                placeholder="أدخل الاسم"
                defaultValue={editingApp?.name || ''}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  النوع
                </label>
                <select
                  defaultValue={editingApp?.category || 'app'}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="app">تطبيق</option>
                  <option value="game">لعبة</option>
                </select>
              </div>
              
              <Input
                label="المطور"
                placeholder="أدخل اسم المطور"
                defaultValue={editingApp?.developer || ''}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الوصف
                </label>
                <textarea
                  placeholder="أدخل وصف التطبيق/اللعبة"
                  defaultValue={editingApp?.description || ''}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="الإصدار"
                  placeholder="1.0.0"
                  defaultValue={editingApp?.version || ''}
                />
                <Input
                  label="الحجم"
                  placeholder="50 MB"
                  defaultValue={editingApp?.size || ''}
                />
              </div>
              
              <Input
                label="رابط الأيقونة"
                placeholder="https://example.com/icon.png"
                defaultValue={editingApp?.iconUrl || ''}
              />
              
              <Input
                label="رابط التحميل"
                placeholder="https://example.com/download"
                defaultValue={editingApp?.downloadUrl || ''}
              />
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVoxinApp"
                  defaultChecked={editingApp?.isVoxinApp || false}
                  className="ml-2"
                />
                <label htmlFor="isVoxinApp" className="text-sm text-gray-700 dark:text-gray-300">
                  تطبيق/لعبة من Voxin
                </label>
              </div>
            </form>
            
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                إلغاء
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // هنا سيتم حفظ البيانات
                  setShowAddModal(false);
                }}
              >
                {editingApp ? 'حفظ التغييرات' : 'إضافة'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}