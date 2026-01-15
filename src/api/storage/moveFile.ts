import { SupabaseClient } from '@supabase/supabase-js';

export const moveFile = async (
  supabaseClient: SupabaseClient,
  from: string,
  to: string
) => {
  const { data, error } = await supabaseClient.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .move(from, to);

  if (error) return { data: null, error };

  return { data, error };
};
