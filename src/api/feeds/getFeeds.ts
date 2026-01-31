import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

export const getFeedsDetailList = async (
  supabaseClient: SupabaseClient<Database>
) => {
  const { data, error } = await supabaseClient
    .from('v_feed_detail_list')
    .select('*');
  if (error) return null;
  return data;
};

export const getFeedDetail = async (
  supabaseClient: SupabaseClient<Database>,
  feedId: string
) => {
  const { data, error } = await supabaseClient
    .from('v_feed_detail_list')
    .select('*')
    .eq('id', feedId)
    .limit(1)
    .single();
  if (error) return null;
  return data;
};

export const getFeedsGridList = async (
  supabaseClient: SupabaseClient<Database>
) => {
  const { data, error } = await supabaseClient
    .from('v_feed_grid_list')
    .select('*');
  if (error) return null;
  return data;
};
