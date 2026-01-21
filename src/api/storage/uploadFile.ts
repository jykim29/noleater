import { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { deleteFiles } from './deleteFiles';

export const uploadFile = async (
  supabaseClient: SupabaseClient,
  boardType: string,
  file: File
) => {
  const imageBasePath = `${boardType}/${format(new Date(), 'yyMMdd')}`;
  const fileExtension = file.name.split('.').pop();
  const fileName = `${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;
  const storagePath = `${imageBasePath}/${fileName}`;
  const { data, error } = await supabaseClient.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .upload(storagePath, file);

  if (error) return { data: null, error };

  return { data, error };
};

export const uploadFiles = async (
  supabaseClient: SupabaseClient,
  boardType: string,
  files: File[],
  options?: { rollbackOnFailure?: boolean }
) => {
  const dataList: {
    id: string;
    path: string;
    fullPath: string;
    file: File;
  }[] = [];

  // 스토리지 파일 업로드
  for (const file of files) {
    const { data, error } = await uploadFile(supabaseClient, boardType, file);

    // 스토리지 업로드 에러 핸들링
    if (error) {
      // 이미 업로드 된 파일 삭제
      if (dataList.length > 0 && options?.rollbackOnFailure)
        await deleteFiles(
          supabaseClient,
          dataList.map((data) => data.path)
        );
      return {
        data: null,
        error: {
          code: error.name,
          message: error.message,
        },
      };
    }
    dataList.push({ ...data, file });
  }

  return {
    data: dataList,
    error: null,
  };
};
