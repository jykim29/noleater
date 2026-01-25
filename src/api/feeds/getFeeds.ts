import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

export const getFeedsDetail = async (
  supabaseClient: SupabaseClient<Database>
) => {
  const { data, error } = await supabaseClient
    .from('v_feed_detail_list')
    .select('*');
  if (error) return null;
  return data;
};
