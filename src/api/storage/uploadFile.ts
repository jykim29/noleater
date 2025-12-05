import { format } from 'date-fns';
import { SupabaseClient } from '@supabase/supabase-js';
import {} from '@supabase/supabase-js';

const uploadFile = async (
  supabaseClient: SupabaseClient,
  bucketName: string,
  boardType: 'feeds' | 'freeboard' | 'myrecipe' | 'discussion',
  file: File
) => {
  const imageBasePath = `${boardType}/${format(new Date(), 'yyMMdd')}`;
  const fileExtension = file.name.split('.').pop();
  const fileName = `${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;
  const storagePath = `${imageBasePath}/${fileName}`;
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .upload(storagePath, file);

  if (error) return { data: null, error };

  return { data, error };
};

export default uploadFile;
