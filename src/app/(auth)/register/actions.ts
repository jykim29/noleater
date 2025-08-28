'use server';

import { errorMessages } from '@/constants/api';
import { createClient } from '@/libs/supabase/server';
import { RegisterFormDataSchema } from '@/schemas';
import { RegisterActionState } from '@/types/actionState.interfaces';
import { AuthErrorCode } from '@/types/supabase';
import { validateWithZod } from '@/utils';

type Register = (
  prevState: RegisterActionState,
  formData: FormData
) => Promise<RegisterActionState>;

export const register: Register = async (_prevState, formData) => {
  const supabase = await createClient();

  const newFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
    agreement: !!formData.get('agreement'),
  };

  // form validation with zod
  const result = validateWithZod(RegisterFormDataSchema, newFormData);
  // zoderror handling
  if (!result.success) {
    return {
      success: false,
      error: {
        code: result.error.message,
        message:
          errorMessages.auth[result.error.message as AuthErrorCode] || '',
      },
      formData: { ...newFormData, password: '', passwordConfirm: '' },
      user: null,
    };
  }

  // request signup to supabase auth
  const { data, error } = await supabase.auth.signUp({
    email: newFormData.email,
    password: newFormData.password,
    options: {
      data: {
        username: `user${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}`,
        avatar_url: 'https://picsum.photos/100/100',
      },
    },
  });

  // response error handling
  if (error)
    return {
      formData: { ...newFormData, password: '', passwordConfirm: '' },
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
      formData: { ...newFormData, password: '', passwordConfirm: '' },
      success: false,
      user: null,
      error: {
        code: 'unexpected_failure',
        message: errorMessages.auth['unexpected_failure'] as string,
      },
    };
  }
  return {
    formData: null,
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
