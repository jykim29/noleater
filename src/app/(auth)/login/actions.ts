'use server';

import { createClient } from '@/libs/supabase/server';
import { errorMessages } from '@/constants/api';
import { AuthErrorCode } from '@/types/supabase';
import { validateWithZod } from '@/utils';
import { LoginFormDataSchema } from '@/schemas';
import { LoginActionState } from '@/types/actionState.interfaces';

type Login = (
  prevState: LoginActionState,
  formData: FormData
) => Promise<LoginActionState>;

export const login: Login = async (_prevState, formData) => {
  const supabase = await createClient();

  const newFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // form validation with zod
  const result = validateWithZod(LoginFormDataSchema, newFormData);
  // zoderror handling
  if (!result.success) {
    return {
      success: false,
      error: {
        code: result.error.message,
        message:
          errorMessages.auth[result.error.message as AuthErrorCode] || '',
      },
      formData: { ...newFormData, password: '' },
      user: null,
    };
  }

  // request signin to supabase auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: newFormData.email,
    password: newFormData.password,
  });
  // response error handling
  if (error)
    return {
      formData: { ...newFormData, password: '' },
      user: null,
      success: false,
      error: {
        code: error.code as string,
        message:
          (errorMessages.auth[error.code as AuthErrorCode] as string) ||
          (error.code as string),
      },
    };
  if (!data.user) {
    return {
      formData: { ...newFormData, password: '' },
      success: false,
      user: null,
      error: {
        code: 'unexpected_failure',
        message: errorMessages.auth['unexpected_failure'] as string,
      },
    };
  }

  return {
    formData: { ...newFormData, password: '' },
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
      username: data.user.user_metadata.username,
      avatar_url: data.user.user_metadata.avatar_url,
      provider: data.user.app_metadata.provider,
      last_login_at: data.user.last_sign_in_at,
    },
    error: null,
  };
};
