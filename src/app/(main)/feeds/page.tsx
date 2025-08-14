import { FeedList } from '@/components/feeds';
import { Content, Header } from '@/components/layout';

export default function Feeds() {
  return (
    <>
      <Header
        left={{
          href: '/',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
        right={{
          href: '..',
          src: '/assets/icons/grid_2x2.svg',
          alt: '그리드 형식으로 보기',
        }}
      >
        <h1 className="text-heading-xl">피드</h1>
      </Header>
      <Content>
        <FeedList />
      </Content>
    </>
  );
}
