"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import {supabase} from "@/lib/supabase-client"
import { Session, User, AuthError } from "@supabase/supabase-js"

interface SignupResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<{error: AuthError | null}>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<SignupResult>;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if(context === undefined){
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }
  );

    // Listen for auth state changes
    const {data:{subscription}} = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [])

  const signUp = async (email: string, password: string, metadata: Record<string, unknown> = {}) => {
    setLoading(true);
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : undefined);
      if (!process.env.NEXT_PUBLIC_SITE_URL && typeof window !== 'undefined') {
        console.warn('NEXT_PUBLIC_SITE_URL is not set. Falling back to window.location.origin for emailRedirectTo.');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          ...(siteUrl ? { emailRedirectTo: `${siteUrl}/auth/confirm` } : {}),
        }
      });

      return {
        user: data.user,
        session: data.session,
        error,
      };
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
    } finally {
      setLoading(false);
    }

  }

  const value: AuthContextType = {
    session,
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
    signUp,
    signIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}