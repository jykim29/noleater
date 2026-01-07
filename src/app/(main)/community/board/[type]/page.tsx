import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { Badge, Button } from '@/components/common';
import { Content, Header } from '@/components/layout';
import { PostCardList } from '@/components/posts';
import { createClient } from '@/libs/supabase/server';
import { getBoardMetadata } from '@/api/board/getBoardConfig';
import { getPostList } from '@/api/board/getPosts';

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { type } = await params;
  const { cat } = await searchParams;
  const supabase = await createClient();
  const boardMetadata = await getBoardMetadata(supabase, type);
  if (!boardMetadata) notFound();
  const boardCategories = boardMetadata.board_categories;
  const isValidSearchParams =
    cat === undefined || boardCategories.map((item) => item.slug).includes(cat);
  if (!isValidSearchParams) redirect(`/community/board/${type}`);
  const postListData =
    (await getPostList(
      supabase,
      boardMetadata.id,
      boardCategories.find((category) => category.slug === cat)?.id
    )) ?? [];

  return (
    <>
      <Header
        left={{
          href: '/',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">자유 게시판</h1>
      </Header>
      <Content>
        <div className="flex items-center gap-3">
          <Button
            className="border-none bg-transparent p-0 text-black"
            type="button"
          >
            <span className="text-heading-xl">전체</span>
          </Button>
          <Button
            className="border-none bg-transparent p-0 text-black"
            type="button"
          >
            <span className="text-heading-xl text-gray-40">인기</span>
          </Button>
        </div>

        <div className="no-scrollbar overflow-x-scroll">
          <div className="flex gap-2 *:shrink-0">
            <Badge
              className={twMerge(
                'bg-gray-gradient border-gray-40',
                cat === undefined &&
                  'bg-primary-gradient border-secondary-60 text-white'
              )}
              as={Link}
              href={`/community/board/${type}`}
            >
              전체
            </Badge>
            {boardCategories.map((category) => (
              <Badge
                key={category.order}
                className={twMerge(
                  'bg-gray-gradient border-gray-40',
                  cat === category.slug &&
                    'bg-primary-gradient border-secondary-60 text-white'
                )}
                as={Link}
                href={`?cat=${category.slug}`}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <PostCardList posts={postListData} />

        {type !== 'notice' && (
          <div className="relative flex justify-end">
            <Link
              className="bg-primary-gradient text-button-md fixed bottom-[100px] self-start rounded-full px-2 py-1.5 text-white"
              href={`/community/board/${type}/new`}
            >
              + 글쓰기
            </Link>
          </div>
        )}
      </Content>
    </>
  );
}
