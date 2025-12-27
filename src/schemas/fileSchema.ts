import * as z from 'zod';
import { util } from 'zod/v4/core';

export const getFileSchema = (size: number, mimeType: util.MimeTypes[]) =>
  z
    .file('파일형식이 아닙니다.')
    .max(size, `파일 용량이 ${Math.floor(size / 1000)}KB보다 초과되었습니다.`)
    .mime(mimeType, '허용되지 않는 파일 확장자입니다.');

export const getFileListSchema = (maxCount: number, minCount: number = 0) =>
  z
    .array(z.file())
    .refine(
      (list) => list.length <= maxCount && list.length >= minCount,
      `파일은 ${minCount} ~ ${maxCount}개만 첨부할 수 있습니다.`
    );
