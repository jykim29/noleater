import { Button, NavLink, TextInput } from '@/components/common';
import { Carousel, MainSection, NoticeBar, QuickLink } from '@/components/home';
import { Content, Header } from '@/components/layout';

import mockData from '@/data/banners.json';

export default async function Home() {
  return (
    <>
      <Header>
        <NavLink href="/" refresh>
          <h1 className="text-heading-2xl">놀잇터</h1>
        </NavLink>
      </Header>
      <Content>
        <form className="flex gap-2">
          <TextInput
            id="search"
            name="search"
            placeholder="검색어를 입력해주세요."
            className="rounded-full"
          />
          <Button type="submit">🔍</Button>
        </form>

        <Carousel
          data={mockData}
          autoplay={{ delay: 3000, stopOnInteraction: false }}
          options={{ loop: true }}
        />

        <MainSection title="바로가기">
          <div className="flex h-16 items-center gap-2">
            <QuickLink
              className="w-full"
              to="/"
              image={{
                src: '/assets/images/recipe_book.png',
                alt: '나만의 레시피',
              }}
            >
              나만의 레시피
            </QuickLink>
            <QuickLink
              className="w-full"
              to="/"
              image={{ src: '/assets/images/freeboard.png', alt: '자유게시판' }}
            >
              자유게시판
            </QuickLink>
          </div>
        </MainSection>

        <MainSection title="공지사항">
          <NoticeBar />
        </MainSection>
      </Content>
    </>
  );
}
