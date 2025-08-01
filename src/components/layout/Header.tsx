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
      <div className="flex h-full items-center justify-center">{children}</div>
      {left && (
        <Link
          className="absolute top-1/2 left-5 -translate-y-1/2"
          href={left.href}
        >
          <Image width={28} height={28} src={left.src} alt={left.alt} />
        </Link>
      )}
      {right && (
        <Link
          className="absolute top-1/2 right-5 -translate-y-1/2"
          href={right.href}
        >
          <Image width={28} height={28} src={right.src} alt={right.alt} />
        </Link>
      )}
    </header>
  );
}
