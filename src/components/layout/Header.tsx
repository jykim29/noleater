'use client';

import Image from 'next/image';
import Link from 'next/link';

type LinkWithImageProps = {
  src: string;
  alt: string;
  href: string;
};

interface HeaderProps extends React.PropsWithChildren {
  left?: LinkWithImageProps;
  right?: LinkWithImageProps;
}

export default function Header({ left, right, children }: HeaderProps) {
  return (
    <header className="border-b-gray-40 relative h-12 w-full border-b px-5 py-2">
      <div className="flex items-center justify-center">{children}</div>
      {left && (
        <Link href={left.href}>
          <Image
            className="absolute top-1/2 left-5 -translate-y-1/2"
            src={left.src}
            alt={left.alt}
          />
        </Link>
      )}
      {right && (
        <Link href={right.href}>
          <Image
            className="absolute top-1/2 right-5 -translate-y-1/2"
            src={right.src}
            alt={right.alt}
          />
        </Link>
      )}
    </header>
  );
}
