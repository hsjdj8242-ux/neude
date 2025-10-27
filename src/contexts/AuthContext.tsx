'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['kingamiraljnaby@gmail.com', '88mustfa44@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  const createUserDocument = async (firebaseUser: FirebaseUser) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData: Omit<User, 'id'> = {
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
        photoURL: firebaseUser.photoURL || undefined,
        isAdmin: ADMIN_EMAILS.includes(firebaseUser.email!),
        downloadedApps: [],
        downloadedGames: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(userRef, userData);
      return { id: firebaseUser.uid, ...userData };
    } else {
      return { id: firebaseUser.uid, ...userSnap.data() } as User;
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    await result.user.updateProfile({ displayName });
  };

  const signInWithGoogle = async () => {
    setIsGuest(false);
    await signInWithPopup(auth, googleProvider);
  };

  const signInAsGuest = () => {
    setIsGuest(true);
    setUser({
      id: 'guest',
      email: 'guest@volin.app',
      displayName: 'ضيف',
      isAdmin: false,
      downloadedApps: [],
      downloadedGames: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setLoading(false);
  };

  const logout = async () => {
    if (isGuest) {
      setIsGuest(false);
      setUser(null);
    } else {
      await signOut(auth);
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !isGuest) {
        const userData = await createUserDocument(firebaseUser);
        setUser(userData);
      } else if (!isGuest) {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isGuest]);

  const value = {
    user,
    isGuest,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInAsGuest,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}