import { ProfileWithMetadata } from '../common';
import { FollowButton, KebabMenuButton } from '../shared';

interface FeedHeaderProps {
  profile: {
    imgSrc: string;
    username: string;
    isFollowed: boolean;
  };
}

export default function FeedHeader({ profile }: FeedHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ProfileWithMetadata profile={profile} />
      <div className="flex items-center gap-1">
        <FollowButton isFollowed={profile.isFollowed} />
        <KebabMenuButton />
      </div>
    </div>
  );
}
