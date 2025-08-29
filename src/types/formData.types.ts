import * as z from 'zod';
import { LoginFormDataSchema, RegisterFormDataSchema } from '@/schemas';

export type LoginFormData = z.infer<typeof LoginFormDataSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;
