'use client';

import { useActionState, useEffect, useMemo } from 'react';
import { ErrorMessageBox } from '../auth';
import { AttachedImagePreviewBox } from '../posts';
import { Button, FileInput, Textarea, TextInput } from '../common';
import { uploadFeed } from '@/app/(main)/feeds/new/actions';
import { UploadFeedActionState } from '@/types/actionState.interfaces';
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';
import { createClient } from '@/libs/supabase/client';
import { getFileSchema } from '@/schemas';
import {
  STORAGE_ALLOWED_FILE_MIME_TYPE,
  STORAGE_MAX_FILE_SIZE,
} from '@/constants/storageConfig';
import { POST_FILE_COUNT } from '@/constants/postConfig';

const initialActionState: UploadFeedActionState = {
  success: false,
  error: null,
  formData: null,
};

export default function NewFeedForm() {
  const supabase = useMemo(() => createClient(), []);
  const { paths, error, status, fileInputRef, deleteButtonRef } =
    useSupabaseStorage(supabase, 'temp', {
      validation: {
        minCount: POST_FILE_COUNT.FEED.MIN,
        maxCount: POST_FILE_COUNT.FEED.MAX,
        schema: getFileSchema(
          STORAGE_MAX_FILE_SIZE.FEED,
          STORAGE_ALLOWED_FILE_MIME_TYPE
        ),
      },
    });

  const args = useMemo(
    () => ({
      storagePaths: paths.map((file) => file.path),
    }),
    [paths]
  );
  const uploadFeedWithPaths = uploadFeed.bind(null, args);
  const [state, formAction, isPending] = useActionState<
    UploadFeedActionState,
    FormData
  >(uploadFeedWithPaths, initialActionState);

  useEffect(() => {
    if (!state.success && state.error) alert(state.error.message);
  }, [state.success, state.error]);
  return (
    <>
      {error && <ErrorMessageBox>{'❗ ' + error}</ErrorMessageBox>}
      <form className="flex w-full flex-col gap-5" action={formAction}>
        <fieldset className="mobile-width flex w-full flex-col">
          <legend className="text-body-sm flex w-full items-center justify-between py-1">
            <span>사진 등록(필수)</span>
            <span className="text-negative">{`※ 최대 ${POST_FILE_COUNT.FEED.MAX}장(각 ${STORAGE_MAX_FILE_SIZE.FEED / (1024 * 1024)}MB)까지 첨부가능`}</span>
          </legend>

          <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll py-1 *:shrink-0">
            {paths.map((path) => (
              <AttachedImagePreviewBox
                key={path.id}
                className="h-40 w-40"
                image={{ src: path.path, id: path.id }}
                ref={deleteButtonRef}
              />
            ))}
            <FileInput
              id="image"
              className="h-40 w-40"
              name="image"
              accept="image/*"
              multiple
              ref={fileInputRef}
              disabled={status === 'uploading'}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="sr-only">설명</legend>
          <Textarea
            className="rounded-md"
            id="description"
            name="description"
            placeholder="이 사진에 대한 설명을 입력해주세요."
            label="설명"
            defaultValue={state.formData?.description ?? ''}
          ></Textarea>
        </fieldset>

        <fieldset className="flex flex-col justify-center gap-2">
          <legend className="sr-only">태그 입력</legend>
          <TextInput
            className="w-full rounded-md"
            id="tags"
            name="tags"
            label="태그"
            placeholder="쉼표(,)로 구분  ex) 태그, 태그, 태그"
            defaultValue={state.formData?.tags ?? ''}
          />
        </fieldset>

        <Button
          className="w-full"
          type="submit"
          disabled={isPending || status === 'uploading'}
        >
          게시
        </Button>
      </form>
    </>
  );
}
