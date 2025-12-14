'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/libs/supabase/server';
import { UploadFeedActionState } from '@/types/actionState.interfaces';
import uploadFile from '@/api/storage/uploadFile';
import { FeedFormDataSchema, getFileSchema } from '@/schemas';
import { Database } from '../../../../../database.types';
import deleteFiles from '@/api/storage/deleteFiles';

type UploadFeed = (
  prevState: UploadFeedActionState,
  formData: FormData
) => Promise<UploadFeedActionState>;

export const uploadFeed: UploadFeed = async (_prevState, formData) => {
  const feedFormData = {
    files: (Array.from(formData.getAll('image')) as File[]).filter(
      (file) => file.size !== 0
    ),
    description: formData.get('description') as string,
    tags: formData.get('tags') as string,
  };
  const imagePathList: string[] = [];
  const supabase = await createClient();

  // 1. zod 검증 - 폼데이터
  const { success, error } = FeedFormDataSchema.safeParse(feedFormData);
  if (!success) {
    return {
      success: false,
      error: { code: error.name, message: error.issues[0].message },
      formData: feedFormData,
    };
  }
  // 2. zod 검증 - 개별 파일
  for (const file of feedFormData.files) {
    const FileSchema = getFileSchema(5 * 1024 * 1024, [
      'image/jpeg',
      'image/png',
    ]);
    const { success, error } = FileSchema.safeParse(file);
    if (!success) {
      return {
        success: false,
        error: { code: error.issues[0].code, message: error.issues[0].message },
        formData: feedFormData,
      };
    }
  }

  // 3. 스토리지 파일 업로드
  for (const file of feedFormData.files) {
    const { data: storageResponseData, error: storageResponseError } =
      await uploadFile(supabase, 'user_images', 'feeds', file);
    // 스토리지 업로드 에러 핸들링
    if (storageResponseError) {
      console.log('스토리지 파일 업로드 에러', storageResponseError);
      // 이미 업로드 된 파일 삭제
      if (imagePathList.length > 0)
        await deleteFiles(supabase, 'user_images', imagePathList);
      return {
        success: false,
        error: {
          code: storageResponseError.name,
          message: storageResponseError.message,
        },
        formData: feedFormData,
      };
    }
    console.log('스토리지 업로드 성공 데이터', storageResponseData);
    storageResponseData && imagePathList.push(storageResponseData.path);
  }

  // 4. 피드, 피드이미지 데이터 삽입 트랜잭션 수행
  const transactionData: Database['public']['Functions']['insert_feed_and_images']['Args'] =
    {
      _content: feedFormData.description,
      _image_urls: imagePathList,
      _tags: feedFormData.tags
        ? feedFormData.tags
            .toString()
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
            .map((tag) => '#' + tag)
        : [],
      _image_count: imagePathList.length,
    };
  const { error: transactionError } = await supabase.rpc(
    'insert_feed_and_images',
    transactionData
  );
  // 트랜잭션 에러 시, 스토리지 파일 삭제
  if (transactionError) {
    await deleteFiles(supabase, 'user-images', imagePathList);
    return {
      success: false,
      error: {
        code: 'unexpected_error',
        message: '예상치못한 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
      },
      formData: feedFormData,
    };
  }

  // 모든 과정 성공 시, 상위 페이지로 리다이렉트
  redirect('/feeds');
};
