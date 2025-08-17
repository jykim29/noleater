import { twMerge } from 'tailwind-merge';
import { Button } from '../common';

interface FollowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isFollowed?: boolean;
}
const stateVariants = {
  common: 'px-5 py-2',
  follow: 'bg-white border-2 border-primary-100 text-primary-100',
  notFollow: 'border-2 border-primary-60',
};

export default function FollowButton({
  isFollowed = false,
  ...rest
}: FollowButtonProps) {
  return (
    <Button
      className={twMerge(
        stateVariants.common,
        isFollowed ? stateVariants.follow : stateVariants.notFollow
      )}
      aria-pressed={isFollowed}
      {...rest}
    >
      {isFollowed ? '팔로잉' : '팔로우'}
    </Button>
  );
}
