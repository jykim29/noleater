'use client';

import { createContext, useContext } from 'react';

type MarqueeContextType = {
  width: string;
  height: string;
};

const MarqueeContext = createContext<MarqueeContextType | null>(null);

export const useMarqueeContext = () => {
  const context = useContext(MarqueeContext);
  if (!context)
    throw new Error(
      'useMarqueeContext훅은 Marquee 컴포넌트 내부에서만 사용되어야 합니다.'
    );

  return context;
};

export function MarqueeContextProvider({
  width,
  height,
  children,
}: React.PropsWithChildren<MarqueeContextType>) {
  return <MarqueeContext value={{ width, height }}>{children}</MarqueeContext>;
}
