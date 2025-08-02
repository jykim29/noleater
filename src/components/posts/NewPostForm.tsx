'use client';

import PostCategoryRadio from './PostCategoryRadio';
import { Button, FileInput, Textarea, TextInput } from '../common';
import AttachedImagePreviewBox from './AttachedImagePreviewBox';
import useAttachFiles from '@/hooks/useAttachFiles';

export default function NewPostForm() {
  const { fileList, addFile, removeFile } = useAttachFiles({
    maxFileCount: 1,
    maxSize: 5_242_880,
    strictFileType: ['jpeg', 'png'],
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const file = e.currentTarget.files[0];
    const { result, message } = addFile(file);
    if (result !== 'success') return alert(message);
    return;
  };
  const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileId = e.currentTarget.dataset.imageId;
    if (!fileId) return;
    removeFile(fileId);
  };

  return (
    <form action="" className="flex flex-col gap-3">
      <fieldset className="flex items-center gap-1">
        <legend className="sr-only">카테고리 선택</legend>
        <PostCategoryRadio id="cat1" name="category" defaultChecked>
          카테고리1
        </PostCategoryRadio>
        <PostCategoryRadio id="cat2" name="category">
          카테고리2
        </PostCategoryRadio>
        <PostCategoryRadio id="cat3" name="category">
          카테고리3
        </PostCategoryRadio>
      </fieldset>
      <fieldset className="border-gray-40 border-b pb-3">
        <legend className="sr-only">제목 입력</legend>
        <TextInput
          id="title"
          name="title"
          placeholder="제목을 입력하세요."
          className="rounded-md"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">내용 입력</legend>
        <Textarea
          className="rounded-md"
          id="content"
          name="content"
          placeholder="내용을 입력하세요."
        ></Textarea>
      </fieldset>
      <fieldset>
        <legend className="text-body-sm text-gray-80 flex w-full items-center justify-between py-1">
          <span>사진 등록(선택)</span>
          <span className="text-negative">※ 최대 1장(5MB)까지 첨부가능</span>
        </legend>
        <div className="flex items-center gap-3 py-1">
          {fileList.map((file) => (
            <AttachedImagePreviewBox
              key={file.id}
              image={{ src: file.previewURL, id: file.id }}
              onDelete={handleDeleteFile}
            />
          ))}
          <FileInput
            id="image"
            name="image"
            onChange={(e) => {
              handleChangeFile(e);
              e.currentTarget.value = '';
            }}
            accept="image/*"
          />
        </div>
      </fieldset>
      <div className="mt-10">
        <Button className="w-full" type="submit">
          글쓰기
        </Button>
      </div>
    </form>
  );
}
