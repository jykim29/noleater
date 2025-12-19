import { useEffect, useRef, useState } from 'react';
import { getFileListSchema, getFileSchema } from '@/schemas';
import { util } from 'zod/v4/core';

type FileInfo = {
  id: string;
  file: File;
  previewURL: string;
};

interface UseAttachFilesOptions {
  maxFileCount?: number;
  maxSize?: number;
  mimetype?: util.MimeTypes[];
}

type AddFile = (fileList: FileList) => {
  success: boolean;
  message: string;
};

export default function useAttachFiles({
  maxFileCount = 1,
  maxSize = 3 * 1024 * 1024,
  mimetype = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}: UseAttachFilesOptions = {}) {
  const [fileInfoList, setFileInfoList] = useState<FileInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList) => {
    let newFiles = [...fileList];
    const originalFiles = [...fileInfoList].map((item) => item.file);
    const totalFileCount = fileInfoList.length + newFiles.length;
    // 파일리스트 zod 검증
    const FileListSchema = getFileListSchema(maxFileCount);
    const { success } = FileListSchema.safeParse([
      ...originalFiles,
      ...newFiles,
    ]);
    if (!success) {
      const gap = totalFileCount - maxFileCount;
      newFiles = newFiles.slice(0, -gap);
    }
    // 각 파일에 대한 zod 검증
    newFiles = newFiles.filter(
      (file) => getFileSchema(maxSize, mimetype).safeParse(file).success
    );
    return newFiles.length > 0 ? newFiles : null;
  };

  const syncInputFiles = (
    targetElement: HTMLInputElement,
    totalFiles: File[]
  ) => {
    const dt = new DataTransfer();
    totalFiles.forEach((file) => dt.items.add(file));
    targetElement.files = dt.files;
  };

  const addFile: AddFile = (fileList: FileList) => {
    if (inputRef.current === null)
      return { success: false, message: '요소를 찾을 수 없습니다.' };
    const originalFiles = fileInfoList.map((item) => item.file);
    const validatedFiles = validateFiles(fileList);
    if (!validatedFiles) {
      console.log(validatedFiles);
      syncInputFiles(inputRef.current, originalFiles);
      return {
        success: false,
        message: '첨부가능한 파일 개수를 초과했거나 용량이 너무 큽니다.',
      };
    }

    const validatedFileInfoList = validatedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setFileInfoList((prev) => [...prev, ...validatedFileInfoList]);
    syncInputFiles(inputRef.current, [
      ...originalFiles,
      ...validatedFileInfoList.map((item) => item.file),
    ]);
    return { success: true, message: '' };
  };

  const removeFile = (fileId: string) => {
    if (inputRef.current === null)
      return { success: false, message: '요소를 찾을 수 없습니다.' };
    const filteredList = [...fileInfoList].filter((v) => v.id !== fileId);
    setFileInfoList(filteredList);
    syncInputFiles(
      inputRef.current,
      filteredList.map((item) => item.file)
    );
    const fileURL = [...fileInfoList].find(
      (file) => file.id === fileId
    )?.previewURL;
    if (fileURL) URL.revokeObjectURL(fileURL);
    return { success: true, message: '' };
  };

  const resetFile = () => {
    setFileInfoList([]);
  };

  return { fileInfoList, addFile, removeFile, resetFile, ref: inputRef };
}
