'use client';

import { twMerge } from 'tailwind-merge';

interface OverlayProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Overlay({
  className: newClassName,
  onClick: handleClick,
  children,
}: React.PropsWithChildren<OverlayProps>) {
  return (
    <div
      className={twMerge(
        'bg-overlay mobile-width fixed top-0 left-1/2 z-[9999] h-dvh w-full -translate-x-1/2',
        newClassName
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
