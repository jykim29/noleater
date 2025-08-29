'use client';

import { createContext, useContext } from 'react';

type MarqueeContextValue = {
  width: string;
  height: string;
};

const MarqueeContext = createContext<MarqueeContextValue | null>(null);

export const useMarqueeContext = () => {
  const context = useContext(MarqueeContext);
  if (!context)
    throw new Error(
      'useMarqueeContext훅은 MarqueeContextProvider 컴포넌트 내부에서만 사용되어야 합니다.'
    );

  return context;
};

export function MarqueeContextProvider({
  width,
  height,
  children,
}: React.PropsWithChildren<MarqueeContextValue>) {
  return <MarqueeContext value={{ width, height }}>{children}</MarqueeContext>;
}
