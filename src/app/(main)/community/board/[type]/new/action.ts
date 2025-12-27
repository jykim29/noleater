'use server';

import { redirect } from 'next/navigation';
import deleteFiles from '@/api/storage/deleteFiles';
import { uploadFile, uploadFiles } from '@/api/storage/uploadFile';
import { createClient } from '@/libs/supabase/server';
import { getFileSchema, PostFormDataSchema } from '@/schemas';
import { PostFormData, UploadPostActionState } from '@/types';
import { Database } from '../../../../../../../database.types';

type UploadPost = (
  prevState: UploadPostActionState,
  formData: FormData
) => Promise<UploadPostActionState>;

export const uploadPost: UploadPost = async (_prevState, formData) => {
  const postFormData = {
    type: formData.get('bname') as PostFormData['type'],
    category: formData.get('category') as string,
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    files: (Array.from(formData.getAll('image')) as File[]).filter(
      (file) => file.size !== 0
    ),
  };
  const hasImage = postFormData.files.length > 0;
  let imagePathList: string[] = [];
  const supabase = await createClient();

  // 1. zod 검증 - 폼데이터
  const { success, error } = PostFormDataSchema.safeParse(postFormData);
  if (!success) {
    return {
      success: false,
      error: { code: error.name, message: error.issues[0].message },
      formData: postFormData,
    };
  }

  if (hasImage) {
    // 2. zod 검증 - 개별 파일
    for (const file of postFormData.files) {
      const FileSchema = getFileSchema(5 * 1024 * 1024, [
        'image/jpeg',
        'image/png',
      ]);
      const { success, error } = FileSchema.safeParse(file);
      if (!success) {
        return {
          success: false,
          error: {
            code: error.issues[0].code,
            message: error.issues[0].message,
          },
          formData: postFormData,
        };
      }
    }
    // 3. 스토리지 다중 파일 업로드
    const { pathList, error: storageResponseError } = await uploadFiles(
      supabase,
      'user_images',
      postFormData.type,
      postFormData.files,
      { rollbackOnFailure: true }
    );
    imagePathList = pathList;
    if (storageResponseError)
      return {
        success: false,
        error: {
          code: storageResponseError.code,
          message: storageResponseError.message,
        },
        formData: postFormData,
      };
  }

  // 4. 포스트, 포스트이미지 데이터 삽입 트랜잭션 수행
  const transactionData: Database['public']['Functions']['insert_post_and_images']['Args'] =
    {
      _type: postFormData.type,
      _category: postFormData.category,
      _title: postFormData.title,
      _content: postFormData.content,
      _image_urls: imagePathList,
      _image_count: imagePathList.length,
    };
  const { error: transactionError } = await supabase.rpc(
    'insert_post_and_images',
    transactionData
  );
  // 트랜잭션 에러 시, 스토리지 파일 삭제
  if (transactionError) {
    if (hasImage) await deleteFiles(supabase, 'user_images', imagePathList);
    return {
      success: false,
      error: {
        code: 'unexpected_error',
        message: '예상치못한 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
      },
      formData: postFormData,
    };
  }

  // 모든 과정 성공 시, 상위 페이지로 리다이렉트
  redirect(`/community/board?type=${postFormData.type}`);
};
