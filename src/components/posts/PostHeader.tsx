import { ProfileWithMetadata } from '../common';
import { ContextMenu, FollowButton, KebabMenuButton } from '../shared';

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

// TODO
// 1. 전체적으로 요소 크기가 너무 커서 줄여야 함

export default function PostHeader({ profile, postMetadata }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ProfileWithMetadata profile={profile} metadata={postMetadata} />
      <div className="flex items-center gap-1">
        <FollowButton isFollowed={profile.isFollowed} />
        <KebabMenuButton
          contextMenu={<ContextMenu menus={['report', 'modify', 'delete']} />}
        />
      </div>
    </div>
  );
}
