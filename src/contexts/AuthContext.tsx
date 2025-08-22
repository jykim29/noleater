'use client';

import { AuthStore, createAuthStore } from '@/stores';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthContext = createContext<AuthStoreApi | null>(null);

export const useAuthContext = <T,>(selectorFn: (store: AuthStore) => T): T => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      'useAuthContext훅은 AuthContextProvider 컴포넌트 내부에서만 사용되어야 합니다.'
    );
  }

  return useStore(ctx, selectorFn);
};

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AuthStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }
  return <AuthContext value={storeRef.current}>{children}</AuthContext>;
}
