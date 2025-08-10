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
/**
 * Renders the header section of a feed item, displaying profile information, a follow button, and a menu with additional actions.
 *
 * @param profile - The profile data containing image source, username, and follow status
 */

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
