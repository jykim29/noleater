import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ProfileImageProps {
  className?: string;
  username: string;
  src: string;
}

export default function ProfileImage({
  className: newClassName = '',
  src,
  username,
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
        src={src}
        alt={username}
      />
    </div>
  );
}
