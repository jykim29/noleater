import { ProfileImage } from '@/components/common';
import { FeedGrid } from '@/components/feeds';
import { Content, Header } from '@/components/layout';
import { ProfileFeedTab } from '@/components/profile';

export default function MyProfilePage() {
  return (
    <>
      <Header
        right={{
          href: '/profile/settings',
          src: '/assets/icons/gear.svg',
          alt: '설정',
        }}
      >
        <h1 className="text-heading-xl">내 프로필</h1>
      </Header>
      <Content>
        <div className="mt-5 flex flex-col items-center justify-center gap-2">
          <ProfileImage
            src="https://picsum.photos/100/100"
            className="border-gray-20 h-20 w-20 border"
          />
          <div className="flex items-center gap-2">
            <span className="text-heading-lg">프로필 이름</span>
            <button
              className="h-4 w-4 bg-[url(/assets/icons/pencil_small.svg)] bg-center bg-no-repeat"
              type="button"
            >
              <span className="sr-only">프로필 수정</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <span>팔로잉</span>
            <span>999</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span>팔로우</span>
            <span>999</span>
          </div>
        </div>

        <div className="sticky top-0 z-10 bg-white py-0.5">
          <ProfileFeedTab />
        </div>

        <div>
          <FeedGrid />
        </div>
      </Content>
    </>
  );
}
