import { twMerge } from 'tailwind-merge';
import { Button, ProfileWithMetadata } from '../common';

interface PostHeaderProps {
  profile: {
    imgSrc: string;
    username: string;
    isFollowed: boolean;
  };
  postMetadata: {
    views?: number;
    comments?: number;
    like?: number;
  };
}

export default function PostHeader({ profile, postMetadata }: PostHeaderProps) {
  const variants = {
    common: 'px-5 py-2',
    follow: 'bg-none bg-white border-2 border-primary-100 text-primary-100',
    notFollow: '',
  };
  return (
    <div className="flex items-center justify-between">
      <ProfileWithMetadata profile={profile} metadata={postMetadata} />
      <div className="flex items-center gap-1">
        <Button
          className={twMerge(
            variants.common,
            profile.isFollowed ? variants.follow : variants.notFollow
          )}
        >
          {profile.isFollowed ? '팔로잉' : '팔로우'}
        </Button>
        <Button className="pointer-fine:hover:bg-gray-20 h-8 w-8 border-none bg-[url(/assets/icons/kebab_menu.svg)] bg-center bg-no-repeat p-0">
          <span className="sr-only">더보기</span>
        </Button>
      </div>
    </div>
  );
}
