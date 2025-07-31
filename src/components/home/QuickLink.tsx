import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface QuickLinkProps extends React.PropsWithChildren {
  to: string;
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

export default function QuickLink({
  to,
  image,
  className: newClassName = '',

  children,
}: QuickLinkProps) {
  return (
    <Link
      className={twMerge(
        'bg-secondary-30 border-primary-30 relative flex h-full items-center justify-center gap-1 rounded-xl border-2 px-2 py-2 pointer-fine:hover:brightness-105',
        newClassName
      )}
      href={to}
    >
      {image && (
        <div className="relative aspect-square h-full">
          <Image
            className="object-contain"
            fill
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      <span className="text-button-md w-full text-center break-keep">
        {children}
      </span>
    </Link>
  );
}
