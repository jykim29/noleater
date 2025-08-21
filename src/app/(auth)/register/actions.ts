'use server';

import * as z from 'zod';
import { errorMessages } from '@/constants/api';
import { createClient } from '@/libs/supabase/server';
import { AuthErrorCode } from '@/types/api';

interface RegisterActionState {
  data?: RegisterFormData;
  success?: boolean;
  error?: {
    code: string;
    message: string;
  };
}
type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;

const RegisterFormDataSchema = z
  .object({
    email: z.email('invalid_email_pattern'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/,
        'incorrect_password_pattern'
      ),
    passwordConfirm: z.string(),
    agreement: z
      .boolean()
      .refine((val) => val === true, { error: 'not_checked_agreement' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: 'not_match_password',
  });

export async function register(
  _prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const supabase = await createClient();
  const newFormData: RegisterFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
    agreement: !!formData.get('agreement'),
  };

  // form validation with zod
  const result = RegisterFormDataSchema.safeParse(newFormData);
  // zoderror handling
  if (!result.success) {
    return {
      data: newFormData,
      success: false,
      error: {
        code: result.error.issues[0].message,
        message:
          errorMessages.auth[result.error.issues[0].message as AuthErrorCode] ||
          '',
      },
    };
  }

  // request signup to supabase auth
  const { error } = await supabase.auth.signUp({
    email: newFormData.email,
    password: newFormData.password,
  });
  // response error handling
  if (error)
    return {
      data: newFormData,
      success: false,
      error: {
        code: error.code as string,
        message: errorMessages.auth[error.code as AuthErrorCode] || '',
      },
    };

  return {
    success: true,
  };
}
