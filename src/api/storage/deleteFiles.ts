import { SupabaseClient } from '@supabase/supabase-js';

export const deleteFiles = async (
  supabaseClient: SupabaseClient,
  paths: string[] | string
) => {
  const list = Array.isArray(paths) ? paths : [paths];
  const { data, error } = await supabaseClient.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .remove(list);
  return { data, error };
};
