'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ForwardNavLinkProps = {
  href: string;
  back?: never;
  className?: string;
  activeClassName?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'>;

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
      <button
        className={props.className}
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        {props.children}
      </button>
    );
  }

  const { href, className, activeClassName, ...restLinkProps } = props;
  const mergedClassName = twMerge(
    className,
    pathname === href && activeClassName
  );

  return (
    <Link className={mergedClassName} href={href} {...restLinkProps}>
      {props.children}
    </Link>
  );
}
