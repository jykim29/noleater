import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

export const getBoardsMetadata = async (
  supabaseClient: SupabaseClient<Database>
) => {
  const { data, error } = await supabaseClient
    .from('boards')
    .select('id, name, slug, board_categories(id, name, slug, order)')
    .order('order', { ascending: true, referencedTable: 'board_categories' });
  if (!data || data.length === 0 || error) return null;
  return data;
};

export const getBoardMetadata = async (
  supabaseClient: SupabaseClient<Database>,
  boardSlug: string
) => {
  const { data, error } = await supabaseClient
    .from('boards')
    .select('id, name, slug, board_categories(id, name, slug, order)')
    .order('order', { ascending: true, referencedTable: 'board_categories' })
    .eq('slug', boardSlug);
  if (!data || data.length === 0 || error) return null;

  return data[0];
};
