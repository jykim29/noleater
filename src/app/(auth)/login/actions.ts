'use server';

import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/server';
import { redirect } from 'next/navigation';

interface LoginFormState {
  user: User | null;
  error: string | null;
}

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const emailRegex = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  );

  // simple validation
  if (!emailRegex.test(email))
    return { user: null, error: '잘못된 이메일 주소' };
  if (password.length < 8 || password.length > 20)
    return { user: null, error: '비밀번호 길이' };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { user: null, error: error.code as string };

  redirect('/home');
}
