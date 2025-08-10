'use client';

import { EmblaCarouselType } from 'embla-carousel';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { twMerge } from 'tailwind-merge';
import {
  CarouselContextProvider,
  useCarouselContext,
} from '@/contexts/CarouselContext';
import useEmblaPagination from '@/hooks/useEmblaPagination';

interface CarouselProps {
  options?: EmblaOptionsType;
  autoplayOptions?: AutoplayOptionsType;
}

interface ContainerProps {
  className?: string;
}

interface SlideProps {
  className?: string;
}

interface PageIndicatorProps {
  type?: 'dotted' | 'numeric';
  position?: { x: 'left' | 'right'; y: 'top' | 'bottom' };
  onClick?: (
    targetElement: HTMLButtonElement,
    emblaApi: EmblaCarouselType
  ) => void;
}

/**
 * Provides a carousel container with optional autoplay and pagination, sharing carousel state via context to child components.
 *
 * Renders a loading placeholder until the carousel is initialized.
 *
 * @param options - Embla carousel configuration options
 * @param autoplayOptions - Optional autoplay configuration for automatic slide transitions
 */
function Carousel({
  options,
  autoplayOptions,
  children,
}: React.PropsWithChildren<CarouselProps>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplayOptions && [Autoplay(autoplayOptions)]
  );
  const [currentSlideNumber, totalSlideNumber] = useEmblaPagination(emblaApi);

  return (
    <div className="embla" ref={emblaRef}>
      {emblaApi ? (
        <CarouselContextProvider
          emblaApi={emblaApi}
          currentSlideNumber={currentSlideNumber}
          totalSlideNumber={totalSlideNumber}
        >
          {children}
        </CarouselContextProvider>
      ) : (
        <div className="bg-gray-20 flex aspect-[1/0.4] w-full items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}

/**
 * Wraps carousel slides in a container div with Embla and additional custom classes.
 *
 * @param className - Additional class names to merge with the default Embla container class
 */
function Container({
  className: newClassName,
  children,
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={twMerge('embla__container', newClassName)}>{children}</div>
  );
}

/**
 * Renders a carousel slide container with appropriate styling.
 *
 * Wraps its children in a div with the `embla__slide` class and any additional classes provided.
 */
function Slide({
  className: newClassName = '',
  children,
}: React.PropsWithChildren<SlideProps>) {
  return (
    <div className={twMerge('embla__slide', newClassName)}>{children}</div>
  );
}

const indicatorPositionVariants = {
  left: 'left-3',
  right: 'right-3',
  top: 'top-2',
  bottom: 'bottom-2',
};

/**
 * Renders a slide indicator for the carousel, displaying either dots or a numeric label.
 *
 * Shows a series of dots or a numeric indicator representing the current slide and total slides. Dots can be positioned and made clickable to interact with the carousel if a click handler is provided. Renders nothing if there is only one slide.
 *
 * @param type - The indicator style, either 'dotted' or 'numeric'
 * @param position - Optional object specifying horizontal (`x`) and vertical (`y`) position of the indicator
 * @param onClick - Optional handler invoked when a dot is clicked, receiving the clicked element and carousel API
 */
function PageIndicator({
  type = 'dotted',
  position,
  onClick: handleClick,
}: PageIndicatorProps) {
  const { currentSlideNumber, totalSlideNumber, emblaApi } =
    useCarouselContext();
  const xClass = position
    ? indicatorPositionVariants[position.x]
    : indicatorPositionVariants.right;
  const yClass = position
    ? indicatorPositionVariants[position.y]
    : indicatorPositionVariants.bottom;
  const Component = handleClick ? 'button' : 'span';

  const handleClickIndicatorButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const el = e.currentTarget;
    if (typeof handleClick === 'function') return handleClick(el, emblaApi);
  };

  if (totalSlideNumber < 2) return null;

  return (
    <div
      className={twMerge('absolute flex items-center gap-1.5', xClass, yClass)}
    >
      {type === 'dotted' ? (
        [...Array(totalSlideNumber)].map((_, idx) => {
          return (
            <Component
              key={idx}
              data-slide-idx={idx}
              type={handleClick && 'button'}
              className={twMerge(
                'border-primary-60 h-2.5 w-2.5 rounded-full border',
                currentSlideNumber === idx && 'bg-primary-60'
              )}
              onClick={(e) => handleClickIndicatorButton(e)}
            ></Component>
          );
        })
      ) : (
        <span className="text-caption-xs rounded-full bg-[rgba(0,0,0,0.5)] px-2 py-1 text-white">{`${currentSlideNumber + 1} / ${totalSlideNumber}`}</span>
      )}
    </div>
  );
}

export default Object.assign(Carousel, {
  Slide,
  PageIndicator,
  Container,
});
