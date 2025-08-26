import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthStore, AuthStoreState } from '@/types';

const initialState: AuthStoreState = {
  user: null,
  isLoggedIn: false,
};

export function createAuthStore(initState: AuthStoreState = initialState) {
  return createStore<AuthStore>()(
    devtools((set) => ({
      ...initState,
      getUser: () =>
        set((state) => ({ user: state.user, isLoggedIn: state.isLoggedIn })),
      setUser: (newState) =>
        set((state) => ({
          ...state,
          user: newState.user,
          isLoggedIn: newState.isLoggedIn,
        })),
      removeUser: () => set((state) => ({ ...state, ...initialState })),
    }))
  );
}
