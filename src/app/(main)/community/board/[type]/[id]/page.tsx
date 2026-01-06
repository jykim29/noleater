import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Content, Header } from '@/components/layout';
import { Button, TextInput } from '@/components/common';
import { CommentList, PostHeader } from '@/components/posts';
import { getPost } from '@/api/board/getPosts';
import { getPublicURL } from '@/api/storage/getPublicURL';
import { createClient } from '@/libs/supabase/server';
import mockCommentsData from '@/data/board/comments.json';

export default async function PostView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const postData = await getPost(supabase, id);
  if (!postData) notFound();
  return (
    <>
      <Header
        left={{
          href: `/community/board/${postData.boardSlug}`,
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">{postData.boardName}</h1>
      </Header>
      <Content>
        <section>
          <h2 className="sr-only">제목</h2>
          <p className="text-heading-lg">
            <span className="text-body-md text-primary-100 mr-2">
              {postData.categoryName}
            </span>
            {postData.title}
          </p>
        </section>

        <section>
          <h2 className="sr-only">작성자 정보</h2>
          <PostHeader
            profile={{
              username: postData.username ?? '알 수 없음',
              imgSrc: postData.profileImage || '',
              isFollowed: true,
            }}
            postMetadata={{ views: 91, comments: 2, like: 7 }}
          />
        </section>

        <section className="text-body-sm text-gray-60 flex items-center justify-end gap-5">
          <h2 className="sr-only">작성일</h2>
          {postData.createdAt ? (
            <time dateTime={postData.createdAt}>
              {format(postData.createdAt, 'yyyy-MM-dd hh:mm:ss')}
              (수정됨)
            </time>
          ) : (
            <span>알 수 없음</span>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="sr-only">본문</h2>
          <p className="whitespace-pre-wrap">{postData.content}</p>

          {postData.imagePath && (
            <div className="relative flex w-full flex-col items-center justify-center gap-2">
              {postData.imagePath.map((path, idx) => {
                const imagePath = getPublicURL(path);
                return (
                  <a
                    key={path}
                    href={imagePath}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Image
                      src={imagePath}
                      alt={`첨부 이미지 ${idx}`}
                      width={250}
                      height={250}
                    />
                  </a>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-5">
          <h2 className="text-heading-lg mb-3">
            댓글 <span className="text-body-md ml-2 align-top">3</span>
          </h2>

          <CommentList data={mockCommentsData.data} />

          <form
            action=""
            className="border-gray-40 mt-3 flex items-center gap-2 border-t pt-3"
          >
            <TextInput
              className="rounded-full"
              id="comment"
              name="comment"
              placeholder="댓글을 입력하세요."
            />
            <Button className="shrink-0" type="submit">
              등록
            </Button>
          </form>
        </section>
      </Content>
    </>
  );
}
