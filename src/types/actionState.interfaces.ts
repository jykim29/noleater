import {
  FeedFormData,
  LoginFormData,
  PostFormData,
  RegisterFormData,
} from './formData.types';
import { AuthStoreState } from './store.types';
import { AuthErrorCode } from './supabase';

export interface ActionState {
  success: boolean;
  error: {
    code: AuthErrorCode | string;
    message: string;
  } | null;
}
export interface LoginActionState extends ActionState {
  formData: LoginFormData | null;
  user: AuthStoreState['user'] | null;
}
export interface RegisterActionState extends ActionState {
  formData: RegisterFormData | null;
  user: AuthStoreState['user'] | null;
}
export interface UploadFeedActionState extends ActionState {
  formData: FeedFormData | null;
}
export interface UploadPostActionState extends ActionState {
  formData: PostFormData | null;
}
