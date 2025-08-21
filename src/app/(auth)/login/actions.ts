'use server';

import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/server';
import { redirect } from 'next/navigation';

interface LoginFormState {
  user: User | null;
  errorCode: string | null;
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
    return { user: null, errorCode: 'invalid_email_pattern' };

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { user: null, errorCode: error.code as string };

  redirect('/home');
}
