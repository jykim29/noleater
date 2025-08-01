import { useEffect, useRef, useState } from 'react';

interface UseHideOnScrollOptions {
  threshold?: number;
}

export default function useHideOnScroll({
  threshold = 50,
}: UseHideOnScrollOptions = {}): boolean {
  const lastScrollYRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollGap = lastScrollYRef.current - currentScrollY;
      if (Math.abs(scrollGap) < threshold) return;
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setIsHidden(scrollGap <= 0);
          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, [threshold]);

  return isHidden;
}
