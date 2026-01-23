'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/libs/supabase/server';
import { UploadFeedActionState } from '@/types/actionState.interfaces';
import { FeedFormDataSchema } from '@/schemas';
import { moveFile } from '@/api/storage/moveFile';
import { deleteFiles } from '@/api/storage/deleteFiles';

type UploadFeed = (
  args: {
    storagePaths: string[];
  },
  prevState: UploadFeedActionState,
  formData: FormData
) => Promise<UploadFeedActionState>;

export const uploadFeed: UploadFeed = async (args, _prevState, formData) => {
  const { storagePaths } = args;
  const feedFormData = {
    description: String(formData.get('description')),
    tags: String(formData.get('tags')),
  };
  // 첨부파일이 없을 경우
  if (storagePaths.length === 0) {
    return {
      success: false,
      error: {
        code: 'NO_FILES',
        message: '첨부된 파일이 없습니다.',
      },
      formData: feedFormData,
    };
  }
  const supabase = await createClient();

  // 1. zod 검증 - 폼데이터
  const {
    success,
    error: formDataValidationError,
    data: validatedFormData,
  } = FeedFormDataSchema.safeParse(feedFormData);
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
  const { description, tags } = validatedFormData;

  // 2. feeds 테이블에 데이터 삽입
  const { data: feedResponse, error: feedResponseError } = await supabase
    .from('feeds')
    .insert({
      description,
      image_count: storagePaths.length,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : null,
    })
    .select()
    .limit(1)
    .single();
  if (feedResponseError) {
    return {
      success: false,
      error: {
        code: feedResponseError.code,
        message: feedResponseError.message,
      },
      formData: feedFormData,
    };
  }

  // 3. temp에서 파일 이동
  const finalizedPaths = [];
  for (const path of storagePaths) {
    const destinationPath = path.replace(/^[^/]+/, 'feeds');
    const { error: moveFileResponseError } = await moveFile(
      supabase,
      path,
      destinationPath
    );
    if (moveFileResponseError) {
      await supabase.from('feeds').delete().eq('id', feedResponse.id);
      return {
        success: false,
        error: { code: 'ERROR_MOVE_FILES', message: 'fail to move files' },
        formData: feedFormData,
      };
    } else {
      finalizedPaths.push(destinationPath);
    }
  }

  // 4. feed_images 테이블에 데이터 삽입
  const insertDataList = finalizedPaths.map((path, idx) => ({
    path,
    order: idx + 1,
    feed_id: feedResponse.id,
  }));
  const { error: feedImageResponseError } = await supabase
    .from('feed_images')
    .insert(insertDataList);
  if (feedImageResponseError) {
    await deleteFiles(supabase, finalizedPaths);
    await supabase.from('posts').delete().eq('id', feedResponse.id);
    return {
      success: false,
      error: {
        code: 'ERROR_INSERT_POST_IMAGE',
        message: 'fail to insert post image data',
      },
      formData: feedFormData,
    };
  }

  // 모든 과정 성공 시, 상위 페이지로 리다이렉트
  redirect('/feeds');
};
