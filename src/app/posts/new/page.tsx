import { Content, Header } from '@/components/layout';
import { NewPostForm } from '@/components/posts';

export default function NewPost() {
  return (
    <>
      <Header
        left={{
          href: '../',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">글쓰기</h1>
      </Header>
      <Content>
        <NewPostForm />
      </Content>
    </>
  );
}
