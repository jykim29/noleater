import { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import deleteFiles from './deleteFiles';

export const uploadFile = async (
  supabaseClient: SupabaseClient,
  bucketName: string,
  boardType: string,
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

export const uploadFiles = async (
  supabaseClient: SupabaseClient,
  bucketName: string,
  boardType: string,
  files: File[],
  options?: { rollbackOnFailure?: boolean }
) => {
  const imagePathList: string[] = [];

  // 스토리지 파일 업로드
  for (const file of files) {
    const { data, error } = await uploadFile(
      supabaseClient,
      bucketName,
      boardType,
      file
    );

    // 스토리지 업로드 에러 핸들링
    if (error) {
      console.log('스토리지 파일 업로드 에러', error);
      // 이미 업로드 된 파일 삭제
      if (imagePathList.length > 0 && options?.rollbackOnFailure)
        await deleteFiles(supabaseClient, bucketName, imagePathList);
      return {
        pathList: imagePathList,
        error: {
          code: error.name,
          message: error.message,
        },
      };
    }
    console.log('스토리지 업로드 성공 데이터', data);
    imagePathList.push(data.path);
  }

  return {
    pathList: imagePathList,
    error: null,
  };
};
