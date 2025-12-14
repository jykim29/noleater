import * as z from 'zod';
import { getFileListSchema } from './fileSchema';
import { BoardList } from './querySchema';

const FILE_MAX_COUNT = {
  feeds: 3,
  board: 1,
};

export const FeedFormDataSchema = z.object({
  files: getFileListSchema(FILE_MAX_COUNT.feeds, 1),
  description: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(100, '100자 이내로 작성해주세요.'),
  tags: z.nullish(z.string()),
});

export const PostFormDataSchema = z.object({
  type: BoardList,
  category: z.string(),
  title: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(30, '30자 이내로 작성해주세요.'),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(100, '100자 이내로 작성해주세요.'),
  files: getFileListSchema(FILE_MAX_COUNT.board),
});
