import * as z from 'zod';
import { getFileListSchema } from './fileSchema';
import { MAX_FILE_COUNT, POST_MAX_TEXT_LENGTH } from '@/constants/postConfig';

export const FeedFormDataSchema = z.object({
  files: getFileListSchema(MAX_FILE_COUNT.FEED, 1),
  description: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(
      POST_MAX_TEXT_LENGTH.FEED.CONTENT,
      `${POST_MAX_TEXT_LENGTH.FEED.CONTENT}자 이내로 작성해주세요.`
    ),
  tags: z.nullish(z.string()),
});

export const PostFormDataSchema = z.object({
  // boardId: z.string(),
  // boardName: z.string(),
  categoryId: z.string(),
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(
      POST_MAX_TEXT_LENGTH.BOARD.TITLE,
      `${POST_MAX_TEXT_LENGTH.BOARD.TITLE}자 이내로 작성해주세요.`
    ),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(
      POST_MAX_TEXT_LENGTH.BOARD.CONTENT,
      `${POST_MAX_TEXT_LENGTH.BOARD.CONTENT}자 이내로 작성해주세요.`
    ),
  // files: getFileListSchema(MAX_FILE_COUNT.BOARD),
});
