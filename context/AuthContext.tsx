import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from './ToastContext';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // Helper to map Supabase user to our App's User type
  const mapUser = (sbUser: SupabaseUser): User => {
    const name = sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'User';
    return {
      id: sbUser.id,
      name: name,
      email: sbUser.email || '',
      avatar: sbUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`
    };
  };

  useEffect(() => {
    // If Supabase is not configured, stop loading and allow Mock mode
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    // Check active sessions and sets the user
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(mapUser(session.user));
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for changes on auth state (login, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(mapUser(session.user));
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Fallback: Demo Mode if Supabase is missing
    if (!supabase) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        name: 'Demo User',
        email: email,
        avatar: `https://ui-avatars.com/api/?name=Demo+User&background=0D9488&color=fff`
      };
      setUser(mockUser);
      setIsLoading(false);
      showToast('Logged in (Demo Mode - Setup Supabase to fix)');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      showToast(error.message, 'info');
      throw error;
    }
    
    showToast('Welcome back!');
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    // Fallback: Demo Mode
    if (!supabase) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`
      };
      setUser(mockUser);
      setIsLoading(false);
      showToast('Account created (Demo Mode)');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setIsLoading(false);
      showToast(error.message, 'info');
      throw error;
    }

    showToast('Account created! Please check your email.');
    setIsLoading(false);
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      showToast('Logged out (Demo Mode)', 'info');
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast(error.message, 'info');
    } else {
      setUser(null);
      showToast('Successfully logged out', 'info');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signUp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};