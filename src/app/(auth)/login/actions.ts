'use server';

import { redirect } from 'next/navigation';
import * as z from 'zod';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/server';
import { errorMessages } from '@/constants/api';
import { AuthErrorCode } from '@/types/api';

interface LoginActionState {
  data?: LoginFormData;
  user?: User;
  success?: boolean;
  error?: {
    code: string;
    message: string;
  };
}
type LoginFormData = z.infer<typeof LoginFormDataSchema>;

const LoginFormDataSchema = z.object({
  email: z.email('invalid_email_pattern'),
  password: z.string(),
});

export async function login(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const supabase = await createClient();

  const newFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // form validation with zod
  const result = LoginFormDataSchema.safeParse(newFormData);
  // zoderror handling
  if (!result.success) {
    return {
      data: { ...newFormData, password: '' },
      success: false,
      error: {
        code: result.error.issues[0].message,
        message:
          errorMessages.auth[result.error.issues[0].message as AuthErrorCode] ||
          '',
      },
    };
  }

  // request signin to supabase auth
  const { error } = await supabase.auth.signInWithPassword({
    email: newFormData.email,
    password: newFormData.password,
  });
  // response error handling
  if (error)
    return {
      data: { ...newFormData, password: '' },
      success: false,
      error: {
        code: error.code as string,
        message: errorMessages.auth[error.code as AuthErrorCode] || '',
      },
    };

  redirect('/home');
}
