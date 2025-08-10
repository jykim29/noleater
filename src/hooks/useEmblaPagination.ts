'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

/**
 * React hook that manages pagination state for an Embla carousel instance.
 *
 * Tracks the currently selected slide index and the total number of scroll snap points, updating state in response to carousel selection changes.
 *
 * @returns A tuple containing the current selected index and the total number of scroll snap points
 */
export default function useEmblaPagination(emblaApi?: EmblaCarouselType) {
  const [index, setIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const handleSelect = useCallback((emblaApi?: EmblaCarouselType) => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    setIndex((prev) => {
      return prev === currentIndex ? prev : currentIndex;
    });
  }, []);

  useEffect(() => {
    if (emblaApi) {
      const initialize = (emblaApi: EmblaCarouselType) => {
        const snapList = emblaApi.scrollSnapList();
        setScrollSnaps(snapList);
      };
      initialize(emblaApi);
      emblaApi.on('select', handleSelect);
    }

    return () => {
      if (emblaApi) emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return [index, scrollSnaps.length];
}
