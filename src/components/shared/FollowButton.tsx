import { twMerge } from 'tailwind-merge';
import { Button } from '../common';

interface FollowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isFollowed?: boolean;
}
const stateVariants = {
  common: 'px-5 py-2',
  follow: 'bg-none bg-white border-2 border-primary-100 text-primary-100',
  notFollow: '',
};

/**
 * Renders a button that visually indicates and toggles between followed and not-followed states.
 *
 * The button label displays "팔로잉" when `isFollowed` is true and "팔로우" when false, with corresponding styling for each state.
 *
 * @param isFollowed - If true, applies the "followed" style and label; otherwise, applies the "not followed" style and label.
 */
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
      {...rest}
    >
      {isFollowed ? '팔로잉' : '팔로우'}
    </Button>
  );
}
