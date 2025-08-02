import { useEffect, useState } from 'react';

type AttachFile = {
  id: string;
  file: File;
  previewURL: string;
};

interface UseAttachFilesOptions {
  maxFileCount?: number;
  maxSize?: number;
  strictFileType?: string[];
}

type AddFileFn = (file: File) => {
  result?: 'maxCount' | 'sizeOver' | 'fileType' | 'notFile' | 'success';
  message?: string;
};

export default function useAttachFiles({
  maxFileCount,
  maxSize,
  strictFileType,
}: UseAttachFilesOptions = {}) {
  const [fileList, setFileList] = useState<AttachFile[]>([]);

  const addFile: AddFileFn = (file: File) => {
    if (!file)
      return { result: 'notFile', message: '정상적인 파일이 아닙니다.' };
    if (maxFileCount && fileList.length + 1 > maxFileCount)
      return {
        result: 'maxCount',
        message: '첨부 파일 개수가 최대치에 도달했습니다.',
      };
    if (maxSize && file.size > maxSize)
      return {
        result: 'sizeOver',
        message: '파일이 첨부 가능한 용량을 초과하였습니다.',
      };
    if (strictFileType && !strictFileType.includes(file.type.split('/')[1]))
      return { result: 'fileType', message: '허용되지 않는 파일확장자입니다.' };

    console.log(file);
    setFileList((prev) => [
      ...prev,
      {
        id: file.lastModified.toString(),
        file,
        previewURL: URL.createObjectURL(file),
      },
    ]);
    return { result: 'success' };
  };

  const removeFile = (fileId: string) => {
    const filterdList = [...fileList].filter((v) => v.id !== fileId);
    setFileList(filterdList);
  };

  useEffect(() => {
    return () => {
      fileList.forEach((v) => URL.revokeObjectURL(v.previewURL));
    };
  }, [fileList]);

  return { fileList, addFile, removeFile };
}
