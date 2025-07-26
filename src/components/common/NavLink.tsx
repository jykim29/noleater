'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface NavLinkProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  activeClassName?: string;
}

export default function NavLink({
  href,
  className,
  activeClassName,
  children,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const mergedClassName = isActive
    ? twMerge(className || '', activeClassName || '')
    : className;
  return (
    <Link className={mergedClassName} href={href}>
      {children}
    </Link>
  );
}
