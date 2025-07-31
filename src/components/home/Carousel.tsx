'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { twMerge } from 'tailwind-merge';
import '@/components/home/Carousel.css';

interface CarouselProps {
  options?: EmblaOptionsType;
  autoplay?: AutoplayOptionsType;
  className?: string;
  data: { data: { id: number; url: string; alt: string }[] };
}

export default function Carousel({
  options,
  autoplay,
  className: newClassName = '',
  data: fetchData,
}: CarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay && [Autoplay(autoplay)]
  );
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    const selectedScrollSnaps = emblaApi.selectedScrollSnap();
    const snapList = emblaApi.scrollSnapList();
    setIndex(selectedScrollSnaps);
    setScrollSnaps(snapList);
  }, []);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    const currentIndex = emblaApi.selectedScrollSnap();
    setIndex((prev) => {
      return prev === currentIndex ? prev : currentIndex;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container gap-2">
        {fetchData.data.map(({ id, url, alt }) => {
          return (
            <div
              key={id}
              className={twMerge(
                'embla__slide relative aspect-[1/0.4] w-full rounded-lg',
                newClassName
              )}
            >
              <Image className="object-cover" src={url} alt={alt} fill />
            </div>
          );
        })}
      </div>
      <div className="absolute right-3 bottom-2 flex items-center gap-1.5">
        {emblaApi &&
          scrollSnaps.map((_, idx) => {
            return (
              <span
                key={idx}
                className={twMerge(
                  'border-primary-60 h-2.5 w-2.5 rounded-full border',
                  index === idx && 'bg-primary-60'
                )}
              ></span>
            );
          })}
      </div>
    </div>
  );
}
