'use server';

import { createClient } from '@/libs/supabase/server';

interface RegisterFormState {
  error: string | null;
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
  if (!isCheckedAgreement) return { error: '체크 동의' };
  if (password !== passwordConfirm) return { error: '비밀번호 불일치' };
  // if (!passwordRegex.test(password)) return { error: '비밀번호 패턴' };

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.code as string };
  console.log(error);
  return { error: null };
}
