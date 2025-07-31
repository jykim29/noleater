'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface NavLinkProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  activeClassName?: string;
  refresh?: boolean;
}

export default function NavLink({
  href,
  className,
  activeClassName,
  refresh = false,
  children,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const mergedClassName = isActive
    ? twMerge(className || '', activeClassName || '')
    : className;

  const handleClickRefresh = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (refresh && window) {
      e.preventDefault();
      window.location.reload();
    }
    return;
  };
  return (
    <Link className={mergedClassName} href={href} onClick={handleClickRefresh}>
      {children}
    </Link>
  );
}
