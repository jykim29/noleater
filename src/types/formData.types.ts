import * as z from 'zod';
import {
  LoginFormDataSchema,
  RegisterFormDataSchema,
  FeedFormDataSchema,
  PostFormDataSchema,
} from '@/schemas';

export type LoginFormData = z.infer<typeof LoginFormDataSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;
export type FeedFormData = z.infer<typeof FeedFormDataSchema>;
export type PostFormData = z.infer<typeof PostFormDataSchema>;
