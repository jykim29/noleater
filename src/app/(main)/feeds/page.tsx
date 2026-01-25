import Link from 'next/link';
import { Content, Header } from '@/components/layout';
import { FeedGrid, FeedList } from '@/components/feeds';
import { getFeedsDetail } from '@/api/feeds/getFeeds';
import { createClient } from '@/libs/supabase/server';

type SearchParamsProps = {
  viewType: 'grid' | 'list';
};

export default async function FeedsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}) {
  const { viewType } = await searchParams;
  const supabase = await createClient();
  const feedListData = (await getFeedsDetail(supabase)) ?? [];
  return (
    <>
      <Header
        left={{
          href: '/',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
        right={{
          href:
            viewType === 'grid'
              ? '/feeds?viewType=list'
              : '/feeds?viewType=grid',
          src:
            viewType === 'grid'
              ? '/assets/icons/single_view.svg'
              : '/assets/icons/grid_2x2.svg',
          alt: '그리드 형식으로 보기',
        }}
      >
        <h1 className="text-heading-xl">피드</h1>
      </Header>
      <Content>
        {viewType === 'grid' ? <FeedGrid /> : <FeedList feeds={feedListData} />}
        <div className="relative flex justify-end">
          <Link
            className="bg-primary-gradient text-button-md fixed bottom-25 self-start rounded-full px-2 py-1.5 text-white"
            href="/feeds/new"
          >
            + 새 피드
          </Link>
        </div>
      </Content>
    </>
  );
}
