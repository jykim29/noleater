'use client';

import { useActionState, useEffect, useState } from 'react';
import PostCategoryRadio from './PostCategoryRadio';
import AttachedImagePreviewBox from './AttachedImagePreviewBox';
import { Button, FileInput, Textarea, TextInput } from '../common';
import { ErrorMessageBox } from '../auth';
import { uploadPost } from '@/app/(main)/community/board/[type]/new/action';
import { createClient } from '@/libs/supabase/client';
import { UploadPostActionState } from '@/types/actionState.interfaces';
import { getFileSchema } from '@/schemas';
import { uploadFiles } from '@/api/storage/uploadFile';
import { POST_MAX_FILE_COUNT } from '@/constants/postConfig';
import {
  STORAGE_ALLOWED_FILE_MIME_TYPE,
  STORAGE_MAX_FILE_SIZE,
  STORAGE_TEMP_DIR_NAME,
} from '@/constants/storageConfig';

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
  const [files, setFiles] = useState<
    { id: string; previewURL: string; path: string; data: File }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const args = {
    metadata: { id: boardMetadata.id, slug: boardMetadata.slug },
    storagePaths: [...files].map((file) => file.path),
  };
  const uploadPostWithPaths = uploadPost.bind(null, args);
  const [state, formAction, isPending] = useActionState<
    UploadPostActionState,
    FormData
  >(uploadPostWithPaths, initialActionState);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget;
    const { files: newFiles } = inputEl;
    if (!newFiles) return;

    // file 개수 validation
    if (newFiles.length + files.length > POST_MAX_FILE_COUNT.BOARD) {
      inputEl.value = '';
      return setError(
        `최대 ${POST_MAX_FILE_COUNT.BOARD}개까지만 첨부할 수 있습니다.`
      );
    }

    // 개별 file validation
    for (const file of newFiles) {
      const { success: fileValidationSuccess, error: fileValidationError } =
        getFileSchema(
          STORAGE_MAX_FILE_SIZE.BOARD,
          STORAGE_ALLOWED_FILE_MIME_TYPE
        ).safeParse(file);
      if (!fileValidationSuccess) {
        inputEl.value = '';
        return setError(fileValidationError.issues[0].message);
      }
    }

    // 최종 업로드
    const supabase = createClient();
    const { data, error } = await uploadFiles(supabase, STORAGE_TEMP_DIR_NAME, [
      ...newFiles,
    ]);
    if (error) {
      inputEl.value = '';
      return setError('파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }

    setFiles((prev) =>
      prev.concat(
        data.map((item) => ({
          id: crypto.randomUUID(),
          path: item.path,
          previewURL: URL.createObjectURL(item.file),
          data: item.file,
        }))
      )
    );
    setError(null);
    inputEl.value = '';
  };

  const handleClickDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileId = e.currentTarget.dataset.imageId;
    if (!fileId) return;
    const selectedFile = [...files].find((file) => file.id === fileId);
    if (selectedFile) URL.revokeObjectURL(selectedFile.previewURL);
    const filteredFiles = [...files].filter((file) => file.id !== fileId);
    setFiles(filteredFiles);
  };

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
            <span className="text-negative">{`※ 최대 ${POST_MAX_FILE_COUNT.BOARD}장(${STORAGE_MAX_FILE_SIZE.BOARD / (1024 * 1024)}MB)까지 첨부가능`}</span>
          </legend>
          <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll py-1 *:shrink-0">
            {files.map((file) => (
              <AttachedImagePreviewBox
                key={file.id}
                image={{ src: file.previewURL, id: file.id }}
                onDelete={handleClickDeleteFile}
              />
            ))}
            <FileInput
              id="image"
              name="image"
              onChange={handleChangeFile}
              accept="image/*"
              multiple
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
