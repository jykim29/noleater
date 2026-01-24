import { Content, Header } from '@/components/layout';
import { NewFeedForm } from '@/components/feeds';

export default function NewFeedPage() {
  return (
    <>
      <Header
        left={{
          href: '/feeds',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">새 피드</h1>
      </Header>
      <Content>
        <NewFeedForm />
      </Content>
    </>
  );
}
