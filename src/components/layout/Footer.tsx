'use client';

import useHideOnScroll from '@/hooks/useHideonScroll';
import NavBar from './NavBar';
import { twMerge } from 'tailwind-merge';

export default function Footer() {
  const isHidden = useHideOnScroll();
  return (
    <footer
      className={twMerge(
        'mobile-width fixed bottom-0 left-1/2 h-16 w-full -translate-x-1/2 transition-all duration-500',
        isHidden && '-bottom-[64px]'
      )}
    >
      <NavBar />
    </footer>
  );
}
