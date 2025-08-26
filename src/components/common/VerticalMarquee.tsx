'use client';

import { useEffect, useRef } from 'react';
import { MarqueeContextProvider } from '@/contexts';
import MarqueeItem from './MarqueeItem';
import { twMerge } from 'tailwind-merge';

interface MarqueeProps extends React.PropsWithChildren {
  width?: string;
  height?: string;
  duration?: number;
  direction?: 'upward' | 'downward';
}

function VerticalMarquee({
  width = '100%',
  height = '32px',
  duration = 2000,
  direction = 'upward',
  children,
}: MarqueeProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<number>(0);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const totalCount = containerEl.childElementCount;
    if (totalCount < 2) return;
    const timer: NodeJS.Timeout = setInterval(() => {
      countRef.current += 1;
      if (countRef.current >= totalCount) countRef.current = 0;
      containerEl.style.translate = `0% ${direction === 'upward' ? '-' : ''}${(100 / totalCount) * countRef.current}%`;
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, [containerRef, duration, direction]);

  return (
    <div
      className="text-body-sm relative overflow-hidden"
      style={{ width, height }}
    >
      <ul
        className={twMerge(
          'absolute left-0 flex w-full flex-col justify-center transition-transform duration-300 ease-in-out',
          direction === 'upward' ? 'top-0' : 'bottom-0'
        )}
        ref={containerRef}
      >
        <MarqueeContextProvider width={width} height={height}>
          {children}
        </MarqueeContextProvider>
      </ul>
    </div>
  );
}

export default Object.assign(VerticalMarquee, { Item: MarqueeItem });
