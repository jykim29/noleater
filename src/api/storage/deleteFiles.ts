import { SupabaseClient } from '@supabase/supabase-js';

const deleteFiles = async (
  supabaseClient: SupabaseClient,
  bucketName: string,
  paths: string[] | string
) => {
  const list = Array.isArray(paths) ? paths : [paths];
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .remove(list);
  if (error) return console.log('파일 롤백 에러', error);
  return console.log('파일롤백 성공', data);
};

export default deleteFiles;
