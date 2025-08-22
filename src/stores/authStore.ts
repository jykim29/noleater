import { createStore } from 'zustand';

interface AuthState {
  user: {
    [key: string]: any;
  } | null;
}
interface AuthActions {
  getUser: () => void;
  setUser: (newState: Pick<AuthState, 'user'>) => void;
}
export type AuthStore = AuthState & AuthActions;

const initialState = {
  user: null,
};

export function createAuthStore(initState: AuthState = initialState) {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    getUser: () => set((state) => ({ ...state.user })),
    setUser: (newState) =>
      set((state) => ({ user: { ...state.user, ...newState } })),
  }));
}
