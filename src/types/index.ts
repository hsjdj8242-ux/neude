export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
  downloadedApps: string[];
  downloadedGames: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface App {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  developer: string;
  category: 'app' | 'game';
  version: string;
  size: string;
  downloadUrl: string;
  iconUrl: string;
  screenshots: string[];
  rating: number;
  ratingsCount: number;
  downloadCount: number;
  isVoxinApp: boolean;
  releaseDate: Date;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
  requirements: string[];
}

export interface Rating {
  id: string;
  userId: string;
  appId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  userName: string;
  userPhoto?: string;
}

export interface Download {
  id: string;
  userId: string;
  appId: string;
  downloadedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface AppCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}