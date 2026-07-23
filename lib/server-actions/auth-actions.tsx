'use server';

import { z } from 'zod';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@/utils/supabase/server';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const cookieStore = await cookies();
  const supabase = createSupabaseClient(cookieStore);

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const cookieStore = await cookies();
  const supabase = createSupabaseClient(cookieStore);

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) {
    return { error: { message: 'User already exists', data } };
  }

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
}