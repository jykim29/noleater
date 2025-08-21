'use server';

import { createClient } from '@/libs/supabase/server';

interface RegisterFormState {
  errorCode: string | null;
}

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;
  const isCheckedAgreement = formData.get('agreement') == 'on';
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/
  );

  // simple validation
  if (!isCheckedAgreement) return { errorCode: 'not_checked_agreement' };
  if (password !== passwordConfirm) return { errorCode: 'not_match_password' };
  if (!passwordRegex.test(password))
    return { errorCode: 'incorrect_password_pattern' };

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) return { errorCode: error.code as string };
  console.log(error);
  return { errorCode: null };
}
