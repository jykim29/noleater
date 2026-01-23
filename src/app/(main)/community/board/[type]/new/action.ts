'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/libs/supabase/server';
import { PostFormDataSchema } from '@/schemas';
import { UploadPostActionState } from '@/types';
import { moveFile } from '@/api/storage/moveFile';
import { deleteFiles } from '@/api/storage/deleteFiles';

type UploadPost = (
  args: {
    metadata: {
      id: string;
      slug: string;
    };
    storagePaths: string[];
  },
  prevState: UploadPostActionState,
  formData: FormData
) => Promise<UploadPostActionState>;

export const uploadPost: UploadPost = async (args, _prevState, formData) => {
  const {
    metadata: { id: boardId, slug: boardSlug },
    storagePaths,
  } = args;
  const hasFiles = storagePaths.length > 0;
  const postFormData = {
    categoryId: String(formData.get('category')),
    title: String(formData.get('title')),
    content: String(formData.get('content')),
  };
  const supabase = await createClient();

  // 1. zod 검증 - 폼데이터
  const {
    success,
    error: formValidationError,
    data: validatedFormData,
  } = PostFormDataSchema.safeParse(postFormData);
  if (!success) {
    return {
      success: false,
      error: {
        code: formValidationError.name,
        message: formValidationError.issues[0].message,
      },
      formData: postFormData,
    };
  }
  const { title, content, categoryId } = validatedFormData;

  // 2. posts 테이블에 데이터 삽입
  const { data: postResponse, error: postResponseError } = await supabase
    .from('posts')
    .insert({
      title,
      content,
      board_id: boardId,
      category_id: categoryId,
      image_count: storagePaths.length,
    })
    .select()
    .limit(1)
    .single();
  if (postResponseError) {
    return {
      success: false,
      error: {
        code: postResponseError.code,
        message: postResponseError.message,
      },
      formData: postFormData,
    };
  }

  // 첨부파일 없을 경우 빠져나옴
  if (!hasFiles) redirect(`/community/board/${args.metadata.slug}`);

  // 3. temp에서 파일 이동
  const finalizedPaths = [];
  for (const path of storagePaths) {
    const destinationPath = path.replace(/^[^/]+/, `${boardSlug}`);
    const { error: moveFileResponseError } = await moveFile(
      supabase,
      path,
      destinationPath
    );
    if (moveFileResponseError) {
      await supabase.from('posts').delete().eq('id', postResponse.id);
      return {
        success: false,
        error: { code: 'ERROR_MOVE_FILES', message: 'fail to move files' },
        formData: postFormData,
      };
    } else {
      finalizedPaths.push(destinationPath);
    }
  }

  // 4. post_images 테이블에 데이터 삽입
  const insertDataList = finalizedPaths.map((path, idx) => ({
    path,
    order: idx + 1,
    post_id: postResponse.id,
  }));
  const { error: postImageResponseError } = await supabase
    .from('post_images')
    .insert(insertDataList);
  if (postImageResponseError) {
    await deleteFiles(supabase, finalizedPaths);
    await supabase.from('posts').delete().eq('id', postResponse.id);
    return {
      success: false,
      error: {
        code: 'ERROR_INSERT_POST_IMAGE',
        message: 'fail to insert post image data',
      },
      formData: postFormData,
    };
  }

  // 모든 과정 성공 시, 상위 페이지로 리다이렉트
  redirect(`/community/board/${args.metadata.slug}`);
};
