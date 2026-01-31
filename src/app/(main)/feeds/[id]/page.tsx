import { getFeedDetail } from '@/api/feeds/getFeeds';
import { FeedCard } from '@/components/feeds';
import { Content, Header } from '@/components/layout';
import { createClient } from '@/libs/supabase/server';
import { notFound } from 'next/navigation';

export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const supabase = await createClient();
  const feedData = await getFeedDetail(supabase, paramsId);
  if (!feedData) notFound();
  return (
    <>
      <Header
        left={{
          href: `/feeds`,
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">피드 상세</h1>
      </Header>
      <Content>
        <FeedCard data={feedData} />
      </Content>
    </>
  );
}
