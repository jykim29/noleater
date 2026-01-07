import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

export const getPostList = async (
  supabaseClient: SupabaseClient<Database>,
  boardId: string,
  categoryId?: string
) => {
  let query = supabaseClient
    .from('v_post_list')
    .select('*')
    .eq('boardId', boardId);
  if (categoryId) query = query.eq('categoryId', categoryId);
  const { data, error } = await query;
  if (!data || error) return null;

  return data;
};

export const getPost = async (
  supabaseClient: SupabaseClient<Database>,
  postId: string
) => {
  const { data, error } = await supabaseClient
    .from('v_post_detail_list')
    .select('*')
    .eq('id', postId)
    .limit(1)
    .single();
  if (!data || error) return null;

  return data;
};
