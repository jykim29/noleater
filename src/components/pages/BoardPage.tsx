import { PostCategoryTab, PostCardList } from '@/components/posts';
import { Button } from '@/components/common';
import { Content, Header } from '@/components/layout';

import mockCategoryData from '@/data/board/category.json';
import mockPostsData from '@/data/board/posts.json';

export default function BoardPage() {
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
          <PostCategoryTab tabData={mockCategoryData.data} />
        </div>

        <PostCardList posts={mockPostsData.data} />
      </Content>
    </>
  );
}
