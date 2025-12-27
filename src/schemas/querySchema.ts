import * as z from 'zod';

const boardList = ['notice', 'free', 'discuss', 'recipe'] as const;
export const BoardList = z.enum(boardList, '잘못된 요청입니다.');

export const PostList = z.object({
  type: BoardList,
  page: z.coerce.number().min(1).optional(),
});

export const NewPost = z.object({
  type: BoardList,
});
