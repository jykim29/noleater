import { Button, TextInput } from '@/components/common';
import { Content, Header } from '@/components/layout';
import { CommentList, PostHeader } from '@/components/posts';
import mockCommentsData from '@/data/board/comments.json';

export default function PostView() {
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
        <section>
          <h2 className="sr-only">제목</h2>
          <p className="text-heading-lg">
            <span className="text-body-md text-primary-100 mr-2">
              [자유수다]
            </span>
            안녕하세요. 반갑습니다!
          </p>
        </section>

        <section>
          <h2 className="sr-only">작성자 정보</h2>
          <PostHeader
            profile={{
              username: '푸른바다',
              imgSrc: 'https://picsum.photos/80/80',
              isFollowed: true,
            }}
            postMetadata={{ views: 91, comments: 2, like: 7 }}
          />
        </section>

        <section className="text-body-sm text-gray-60 flex items-center justify-end gap-5">
          <h2 className="sr-only">작성일</h2>
          <time dateTime="2025-07-21T21:24:31">
            작성일자 : 2025-07-21 21:24:31 (수정됨)
          </time>
        </section>

        <section>
          <h2 className="sr-only">본문</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            architecto, eos perferendis, quia a necessitatibus corporis possimus
            neque laborum consectetur dolorem. Vel assumenda illum ducimus ea
            sint beatae eius corrupti. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ad error omnis ut illo pariatur sed atque ullam,
            tenetur laboriosam odit dolores recusandae reprehenderit animi
            repellendus, officiis iure quod nihil illum. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Assumenda vel incidunt quos,
            earum explicabo pariatur nemo reprehenderit error asperiores
            laboriosam aliquam fugit sint totam, exercitationem consectetur
            quaerat provident repellendus voluptates? Quo fugit nemo
            consequuntur ipsam quae rerum ut magni est temporibus, inventore
            quis ullam mollitia quidem dignissimos itaque libero perspiciatis
            culpa, sunt repudiandae aliquid maxime! Laborum quasi impedit earum
            architecto. Perspiciatis provident pariatur nostrum accusamus
            dignissimos qui totam placeat eligendi earum nam voluptates, minima
            laudantium reprehenderit sint odit quidem explicabo cumque. Natus,
            officia dolore corporis quisquam nostrum dolor culpa excepturi.
          </p>
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
