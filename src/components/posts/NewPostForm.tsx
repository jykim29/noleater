'use client';

import { useActionState, useEffect } from 'react';
import PostCategoryRadio from './PostCategoryRadio';
import AttachedImagePreviewBox from './AttachedImagePreviewBox';
import { Button, FileInput, Textarea, TextInput } from '../common';
import { uploadPost } from '@/app/(main)/community/board/[type]/new/action';
import useAttachFiles from '@/hooks/useAttachFiles';
import { UploadPostActionState } from '@/types/actionState.interfaces';
import { ErrorMessageBox } from '../auth';

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
  const [state, formAction, isPending] = useActionState<
    UploadPostActionState,
    FormData
  >(uploadPost, initialActionState);
  const { fileInfoList, addFile, removeFile, resetFile, ref } = useAttachFiles({
    maxFileCount: 1,
    maxSize: 5_242_880,
    mimetype: ['image/jpeg', 'image/png'],
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const files = e.currentTarget.files;
    const { success, message } = addFile(files);
    if (!success) return alert(message);
    return;
  };
  const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileId = e.currentTarget.dataset.imageId;
    if (!fileId) return;
    removeFile(fileId);
  };

  useEffect(() => {
    if (!state.success && state.error) {
      console.log(state);
      resetFile();
    }
  }, [state]);

  return (
    <>
      {!state.success && state.error && (
        <ErrorMessageBox>{'❗ ' + state.error.message}</ErrorMessageBox>
      )}
      <form action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="bid" value={boardMetadata.id} />
        <input type="hidden" name="bname" value={boardMetadata.slug} />
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
            <span className="text-negative">※ 최대 1장(5MB)까지 첨부가능</span>
          </legend>
          <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll py-1 *:shrink-0">
            {fileInfoList.map((file) => (
              <AttachedImagePreviewBox
                key={file.id}
                image={{ src: file.previewURL, id: file.id }}
                onDelete={handleDeleteFile}
              />
            ))}
            <FileInput
              id="image"
              name="image"
              onChange={handleChangeFile}
              accept="image/*"
              ref={ref}
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
