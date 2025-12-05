import * as z from 'zod';
import { getFileListSchema } from './fileSchema';

const TEXT_LENGTH_RANGE = {
  feeds: {
    content: [0, 100],
  },
  board: {
    title: [0, 50],
    content: [0, 200],
  },
};

const FILE_MAX_COUNT = {
  feeds: 3,
  board: 1,
};

const checkTextLength = (text: string, range: number[]) => {
  return {
    result: range[0] < text.length && text.length <= range[1],
    errorMessage: `${range[0]} ~ ${range[1]}자 사이로 작성해주세요.`,
  };
};

export const FeedFormDataSchema = z.object({
  files: getFileListSchema(FILE_MAX_COUNT.feeds),
  description: z
    .string()
    .refine(
      (text) => checkTextLength(text, TEXT_LENGTH_RANGE.feeds.content).result,
      `최소 1자 최대 ${TEXT_LENGTH_RANGE.feeds.content[1]}자 이내로 작성해주세요.`
    ),
  tags: z.nullish(z.string()),
});

export const PostFormDataSchema = z.object({
  category: z.string(),
  title: z
    .string()
    .refine(
      (text) => checkTextLength(text, TEXT_LENGTH_RANGE.board.title).result,
      `최소 1자 최대 ${TEXT_LENGTH_RANGE.board.title[1]}자 이내로 작성해주세요.`
    ),
  content: z
    .string()
    .refine(
      (text) => checkTextLength(text, TEXT_LENGTH_RANGE.board.content).result,
      `최소 1자 최대 ${TEXT_LENGTH_RANGE.board.content[1]}자 이내로 작성해주세요.`
    ),
  files: getFileListSchema(FILE_MAX_COUNT.board),
});
