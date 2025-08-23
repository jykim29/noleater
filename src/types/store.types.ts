// AuthStore
export type AuthStore = AuthStoreState & AuthStoreActions;
export interface AuthStoreState {
  user: {
    id: string;
    email: string;
    username: string;
    avatar_url: string;
    provider: string;
    last_login_at: string;
  } | null;
  isLoggedIn: boolean;
}
export type AuthStoreActions = {
  getUser: () => void;
  setUser: (newState: Partial<AuthStoreState>) => void;
  removeUser: () => void;
};
