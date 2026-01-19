import { notFound } from 'next/navigation';
import { Content, Header } from '@/components/layout';
import { NewPostForm } from '@/components/posts';
import { getBoardMetadata } from '@/api/board/getBoardConfig';
import { createClient } from '@/libs/supabase/server';

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const supabase = await createClient();
  const boardMetadata = await getBoardMetadata(supabase, type);
  if (!boardMetadata) notFound();
  return (
    <>
      <Header
        left={{
          href: '/',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">글쓰기</h1>
      </Header>
      <Content>
        <NewPostForm boardMetadata={boardMetadata} />
      </Content>
    </>
  );
}
