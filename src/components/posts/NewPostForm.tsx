'use client';

import { useActionState, useEffect, useMemo } from 'react';
import PostCategoryRadio from './PostCategoryRadio';
import AttachedImagePreviewBox from './AttachedImagePreviewBox';
import { Button, FileInput, Textarea, TextInput } from '../common';
import { ErrorMessageBox } from '../auth';
import { uploadPost } from '@/app/(main)/community/board/[type]/new/action';
import { createClient } from '@/libs/supabase/client';
import { UploadPostActionState } from '@/types/actionState.interfaces';
import { getFileSchema } from '@/schemas';
import { POST_FILE_COUNT } from '@/constants/postConfig';
import {
  STORAGE_ALLOWED_FILE_MIME_TYPE,
  STORAGE_MAX_FILE_SIZE,
} from '@/constants/storageConfig';
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';

interface NewPostFormProps {
  boardMetadata: {
    id: string;
    name: string;
    slug: string;
    board_categories: {
      id: string;
      name: string;
      slug: string;
      order: number;
    }[];
  };
}

const initialActionState: UploadPostActionState = {
  success: false,
  error: null,
  formData: null,
};

export default function NewPostForm({ boardMetadata }: NewPostFormProps) {
  const supabase = useMemo(() => createClient(), []);
  const { paths, error, status, fileInputRef, deleteButtonRef } =
    useSupabaseStorage(supabase, 'temp', {
      validation: {
        minCount: POST_FILE_COUNT.BOARD.MIN,
        maxCount: POST_FILE_COUNT.BOARD.MAX,
        schema: getFileSchema(
          STORAGE_MAX_FILE_SIZE.BOARD,
          STORAGE_ALLOWED_FILE_MIME_TYPE
        ),
      },
    });

  const args = useMemo(
    () => ({
      metadata: { id: boardMetadata.id, slug: boardMetadata.slug },
      storagePaths: [...paths].map((file) => file.path),
    }),
    [boardMetadata, paths]
  );
  const uploadPostWithPaths = uploadPost.bind(null, args);
  const [state, formAction, isPending] = useActionState<
    UploadPostActionState,
    FormData
  >(uploadPostWithPaths, initialActionState);

  useEffect(() => {
    if (!state.success && state.error) alert(state.error.message);
  }, [state]);

  return (
    <>
      {error && <ErrorMessageBox>{'❗ ' + error}</ErrorMessageBox>}
      <form action={formAction} className="flex flex-col gap-3">
        <fieldset className="flex items-center gap-1">
          <legend className="sr-only">카테고리 선택</legend>
          {boardMetadata.board_categories.map((cat, idx) => (
            <PostCategoryRadio
              key={cat.id}
              id={cat.slug}
              name="category"
              value={cat.id}
              defaultChecked={idx === 0}
            >
              {cat.name}
            </PostCategoryRadio>
          ))}
        </fieldset>
        <fieldset className="border-gray-40 border-b pb-3">
          <legend className="sr-only">제목 입력</legend>
          <TextInput
            id="title"
            name="title"
            placeholder="제목을 입력하세요."
            className="rounded-md"
            defaultValue={state.formData?.title ?? ''}
          />
        </fieldset>
        <fieldset>
          <legend className="sr-only">내용 입력</legend>
          <Textarea
            className="rounded-md"
            id="content"
            name="content"
            placeholder="내용을 입력하세요."
            defaultValue={state.formData?.content ?? ''}
          ></Textarea>
        </fieldset>
        <fieldset className="mobile-width">
          <legend className="text-body-sm text-gray-80 flex w-full items-center justify-between py-1">
            <span>사진 등록(선택)</span>
            <span className="text-negative">{`※ 최대 ${POST_FILE_COUNT.BOARD.MAX}장(${STORAGE_MAX_FILE_SIZE.BOARD / (1024 * 1024)}MB)까지 첨부가능`}</span>
          </legend>
          <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll py-1 *:shrink-0">
            {paths.map((path) => (
              <AttachedImagePreviewBox
                key={path.id}
                image={{ src: path.path, id: path.id }}
                ref={deleteButtonRef}
              />
            ))}
            <FileInput
              id="image"
              name="image"
              accept="image/*"
              multiple
              ref={fileInputRef}
              disabled={status === 'uploading'}
            />
          </div>
        </fieldset>
        <div className="mt-10">
          <Button className="w-full" type="submit" disabled={isPending}>
            글쓰기
          </Button>
        </div>
      </form>
    </>
  );
}
