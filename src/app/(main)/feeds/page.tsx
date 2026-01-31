import Link from 'next/link';
import { Content, Header } from '@/components/layout';
import { FeedGrid, FeedList } from '@/components/feeds';
import { getFeedsDetailList, getFeedsGridList } from '@/api/feeds/getFeeds';
import { createClient } from '@/libs/supabase/server';
import { ViewRow } from '@/types/supabase/db.types';
import { redirect } from 'next/navigation';

type FeedsData = {
  grid: ViewRow<'v_feed_grid_list'>[];
  list: ViewRow<'v_feed_detail_list'>[];
};

const ALLOWED_SEARCH_PARAMS_AND_VALUES = {
  viewType: ['list', 'grid'],
};

export default async function FeedsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { viewType = 'list' } = await searchParams;
  if (!ALLOWED_SEARCH_PARAMS_AND_VALUES.viewType.includes(viewType as string))
    redirect('/feeds?viewType=list');
  const supabase = await createClient();
  const feedsData =
    viewType === 'grid'
      ? await getFeedsGridList(supabase)
      : await getFeedsDetailList(supabase);
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
        {viewType === 'grid' ? (
          <FeedGrid feeds={feedsData as FeedsData['grid']} />
        ) : (
          <FeedList feeds={feedsData as FeedsData['list']} />
        )}
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
