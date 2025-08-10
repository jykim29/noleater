'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ForwardNavLinkProps = {
  href: string;
  back?: never;
  className?: string;
  activeClassName?: string;
} & Omit<React.ComponentProps<typeof Link>, 'href'>;

type BackwardNavLinkProps = {
  href?: never;
  back: true;
  className?: string;
  activeClassName?: string;
};
type NavLinkProps = ForwardNavLinkProps | BackwardNavLinkProps;

export default function NavLink(props: React.PropsWithChildren<NavLinkProps>) {
  const pathname = usePathname();
  const router = useRouter();
  if ('back' in props && props.back) {
    return (
      <a
        className={props.className}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        {props.children}
      </a>
    );
  }

  const mergedClassName = twMerge(
    props.className,
    pathname === props.href && props.activeClassName
  );

  return (
    <Link className={mergedClassName} href={props.href}>
      {props.children}
    </Link>
  );
}
