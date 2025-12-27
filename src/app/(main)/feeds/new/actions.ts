'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/libs/supabase/server';
import { UploadFeedActionState } from '@/types/actionState.interfaces';
import { uploadFile, uploadFiles } from '@/api/storage/uploadFile';
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
  const supabase = await createClient();

  // 1. zod 검증 - 폼데이터
  const { success, error: formDataValidationError } =
    FeedFormDataSchema.safeParse(feedFormData);
  if (!success) {
    return {
      success: false,
      error: {
        code: formDataValidationError.name,
        message: formDataValidationError.issues[0].message,
      },
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

  // 3. 스토리지 다중 파일 업로드
  const { pathList, error: storageResponseError } = await uploadFiles(
    supabase,
    'user_images',
    'feeds',
    feedFormData.files
  );
  if (storageResponseError)
    return {
      success: false,
      error: {
        code: storageResponseError.code,
        message: storageResponseError.message,
      },
      formData: feedFormData,
    };

  // 4. 피드, 피드이미지 데이터 삽입 트랜잭션 수행
  const transactionData: Database['public']['Functions']['insert_feed_and_images']['Args'] =
    {
      _content: feedFormData.description,
      _image_urls: pathList,
      _tags: feedFormData.tags
        ? feedFormData.tags
            .toString()
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
            .map((tag) => '#' + tag)
        : [],
      _image_count: pathList.length,
    };
  const { error: transactionError } = await supabase.rpc(
    'insert_feed_and_images',
    transactionData
  );
  // 트랜잭션 에러 시, 스토리지 파일 삭제
  if (transactionError) {
    await deleteFiles(supabase, 'user_images', pathList);
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
