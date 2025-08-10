'use client';

import { twMerge } from 'tailwind-merge';

interface OverlayProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Renders a fixed, full-screen overlay container with customizable styling and click handling.
 *
 * Merges default overlay styles with any additional class names provided. Supports rendering nested children and an optional click event handler.
 *
 * @param className - Additional class names to merge with the default overlay styles
 * @param onClick - Optional click event handler for the overlay container
 */
export default function Overlay({
  className: newClassName,
  onClick: handleClick,
  children,
}: React.PropsWithChildren<OverlayProps>) {
  return (
    <div
      className={twMerge(
        'bg-overlay fixed top-0 left-1/2 z-[9999] h-dvh w-full max-w-md min-w-xs -translate-x-1/2',
        newClassName
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
