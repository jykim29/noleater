import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface MainSectionProps extends React.PropsWithChildren {
  title?: string;
  linkTo?: string;
  className?: string;
}

export default function MainSection({
  title,
  linkTo,
  className: newClassName = '',
  children,
}: MainSectionProps) {
  return (
    <section className={twMerge('flex flex-col gap-1', newClassName)}>
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-heading-lg">{title}</h2>
          {linkTo && (
            <Link className="text-caption-xs text-gray-60" href={linkTo}>
              + 더보기
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
