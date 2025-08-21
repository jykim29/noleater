import Image from 'next/image';
import NavLink from '../common/NavLink';

export default function NavBar() {
  return (
    <nav className="relative flex h-full w-full items-end justify-between gap-3">
      <NavLink
        href="/feeds"
        activeClassName="bg-secondary-gradient"
        className="bg-light-gray-gradient border-secondary-60 flex w-full flex-col items-center justify-center gap-0.5 rounded-t-lg border-x-2 border-t-2"
      >
        <Image
          width={36}
          height={36}
          src="/assets/images/gallery_grid.png"
          alt="피드"
        />
        <span className="text-caption-xs">피드</span>
      </NavLink>
      <NavLink
        href="/profile/me"
        activeClassName="bg-secondary-gradient"
        className="bg-light-gray-gradient border-secondary-60 flex w-full flex-col items-center justify-center gap-0.5 rounded-t-lg border-x-2 border-t-2"
      >
        <Image
          width={36}
          height={36}
          src="/assets/images/user_circle.png"
          alt="내 프로필"
        />
        <span className="text-caption-xs">내 프로필</span>
      </NavLink>
      <button
        type="button"
        className="absolute top-1/2 left-1/2 h-[90px] w-[90px] -translate-1/2"
      >
        <Image
          className="object-contain"
          src="/assets/images/foods_playground.png"
          fill
          priority={true}
          alt="메뉴 펼치기"
        />
      </button>
    </nav>
  );
}
