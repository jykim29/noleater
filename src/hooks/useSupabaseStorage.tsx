import { SetStateAction, useCallback, useState } from 'react';
import * as z from 'zod';
import { uploadFiles } from '@/api/storage/uploadFile';
import { SupabaseClient } from '@supabase/supabase-js';

type Path = {
  id: string;
  path: string;
};
type Status = 'idle' | 'uploading' | 'error';
type Options = {
  validation?: {
    minCount: number;
    maxCount: number;
    schema: z.ZodFile;
  };
};
export function useSupabaseStorage(
  supabaseClient: SupabaseClient,
  storagePath: string,
  options: Options = {}
) {
  const [paths, setPaths] = useState<Path[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const validateFiles = (files: File[], schema: z.ZodFile) => {
    for (const file of files) {
      const { error } = schema.safeParse(file);
      if (error) return { success: false, error: error.issues[0].message };
    }
    return { success: true, error: null };
  };

  const setErrorWithStatus = (msg: SetStateAction<string | null>) => {
    setError(msg);
    setStatus('error');
  };

  const fileInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (!node) return;
      if (node.type !== 'file')
        return setErrorWithStatus('인풋 요소 찾을 수 없음');

      const handleChangeFile = async () => {
        setStatus('uploading');
        const { files: newFiles } = node;
        if (!newFiles) return;
        if (options.validation) {
          const { minCount, maxCount, schema } = options.validation;
          // 개수 체크
          const totalCount = paths.length + newFiles.length;
          if (minCount > totalCount || maxCount < totalCount) {
            node.value = '';
            return setErrorWithStatus('개수 오류');
          }
          // validate files
          const { error } = validateFiles([...newFiles], schema);
          if (error) {
            node.value = '';
            return setErrorWithStatus(error);
          }
        }
        // 최종 업로드
        const { data, error } = await uploadFiles(supabaseClient, storagePath, [
          ...newFiles,
        ]);
        if (error) {
          node.value = '';
          return setErrorWithStatus(error.message);
        }
        const newPaths: Path[] = data.map((item) => ({
          id: crypto.randomUUID(),
          path: item.path,
        }));
        setPaths((prev) => [...prev, ...newPaths]);
        node.value = '';
        setStatus('idle');
      };

      node.addEventListener('change', handleChangeFile);
      return () => node.removeEventListener('change', handleChangeFile);
    },
    [options.validation, paths.length, storagePath, supabaseClient]
  );

  const deleteButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (!node) return;
      if (node.type !== 'button')
        return setErrorWithStatus('버튼 요소 찾을 수 없음');

      const handleClickDeleteFile = () => {
        const imageId = node.dataset.imageId;
        if (!imageId) return setErrorWithStatus('id값 읽기 오류');
        const filteredPaths = [...paths].filter((path) => path.id !== imageId);
        setPaths(filteredPaths);
      };

      node.addEventListener('click', handleClickDeleteFile);
      return () => node.removeEventListener('click', handleClickDeleteFile);
    },
    [paths]
  );

  return { fileInputRef, deleteButtonRef, paths, error, status };
}
