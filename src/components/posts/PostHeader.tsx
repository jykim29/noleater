import { ProfileWithMetadata } from '../common';
import { FollowButton, KebabMenuButton } from '../shared';

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
  return (
    <div className="flex items-center justify-between">
      <ProfileWithMetadata profile={profile} metadata={postMetadata} />
      <div className="flex items-center gap-1">
        <FollowButton isFollowed={profile.isFollowed} />
        <KebabMenuButton />
      </div>
    </div>
  );
}
