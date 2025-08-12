import { ProfileWithMetadata } from '../common';
import { ContextMenu, FollowButton, KebabMenuButton } from '../shared';

interface FeedHeaderProps {
  profile: {
    imgSrc: string;
    username: string;
    isFollowed: boolean;
  };
}

// TODO
// 1. 전체적으로 요소 크기가 너무 커서 줄여야 함

export default function FeedHeader({ profile }: FeedHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ProfileWithMetadata profile={profile} />
      <div className="flex items-center gap-1">
        <FollowButton isFollowed={profile.isFollowed} />
        <KebabMenuButton
          contextMenu={<ContextMenu menus={['report', 'delete']} />}
        />
      </div>
    </div>
  );
}
