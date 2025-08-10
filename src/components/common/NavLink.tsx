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

/**
 * Renders a navigation link that either navigates to a specified route or goes back in browser history.
 *
 * If the `back` prop is true, renders an anchor element that navigates back in history when clicked. Otherwise, renders a Next.js `Link` that navigates to the provided `href`, applying the `activeClassName` if the current path matches the link's destination.
 */
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
