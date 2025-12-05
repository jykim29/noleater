import * as z from 'zod';
import { util } from 'zod/v4/core';

export const getFileSchema = (size: number, mimeType: util.MimeTypes[]) =>
  z
    .file('파일형식이 아닙니다.')
    .max(size, `파일 용량이 ${Math.floor(size / 1024)}KB보다 초과되었습니다.`)
    .mime(mimeType, '허용되지 않는 파일 확장자입니다.');

export const getFileListSchema = (maxCount: number) =>
  z
    .array(z.file())
    .refine((list) => list.length > 0, '파일이 없습니다.')
    .refine(
      (list) => list.length <= maxCount,
      `파일 개수가 ${maxCount}개보다 초과되었습니다.`
    );
