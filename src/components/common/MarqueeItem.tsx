'use client';

import { useMarqueeContext } from '@/contexts/MarqueeContext';

export default function MarqueeItem({ children }: React.PropsWithChildren) {
  const { width, height } = useMarqueeContext();

  return (
    <li className="flex h-8 items-center" style={{ width, height }}>
      {children}
    </li>
  );
}
