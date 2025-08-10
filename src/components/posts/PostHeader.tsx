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
/**
 * Renders the header section of a post, displaying user profile information, post metadata, a follow button, and a menu for additional actions.
 *
 * @param profile - The user's profile data, including image source, username, and follow status.
 * @param postMetadata - Optional metadata about the post, such as view, comment, and like counts.
 * @returns The React element representing the post header.
 */

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
