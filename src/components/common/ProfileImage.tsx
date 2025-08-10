import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ProfileImageProps {
  className?: string;
  username?: string;
  src?: string;
}

/**
 * Renders a user profile image inside a styled, circular container.
 *
 * Displays the provided image or a default profile image if none is specified. The image is optimized for responsive layouts and includes the username as the alt text for accessibility.
 *
 * @param className - Additional CSS classes to apply to the container
 * @param src - The URL of the profile image; falls back to a default image if not provided
 * @param username - The username to use as the image's alt text
 * @returns A React element displaying the profile image in a circular frame
 */
export default function ProfileImage({
  className: newClassName = '',
  src,
  username = '',
}: ProfileImageProps) {
  return (
    <div
      className={twMerge(
        'relative h-10 w-10 flex-none overflow-hidden rounded-full',
        newClassName
      )}
    >
      <Image
        className="object-cover"
        fill
        sizes="100vw"
        src={src ?? '/assets/images/default_profile.jpg'}
        alt={username}
      />
    </div>
  );
}
