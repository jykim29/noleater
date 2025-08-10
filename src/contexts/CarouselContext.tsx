import { EmblaCarouselType } from 'embla-carousel';
import { createContext, useContext } from 'react';

interface CarouselContextType {
  emblaApi: EmblaCarouselType;
  currentSlideNumber: number;
  totalSlideNumber: number;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context)
    throw new Error(
      'useCarouselContext훅은 CarouselContextProvider 컴포넌트 내부에서만 사용되어야 합니다.'
    );
  return context;
};

/**
 * Provides carousel state and API access to descendant components via React context.
 *
 * Wraps its children with a context provider containing the Embla carousel API instance, the current slide number, and the total number of slides.
 *
 * @param emblaApi - The Embla carousel API instance to provide
 * @param currentSlideNumber - The index of the currently active slide
 * @param totalSlideNumber - The total number of slides in the carousel
 */
export function CarouselContextProvider({
  emblaApi,
  currentSlideNumber,
  totalSlideNumber,
  children,
}: React.PropsWithChildren<CarouselContextType>) {
  return (
    <CarouselContext value={{ emblaApi, currentSlideNumber, totalSlideNumber }}>
      {children}
    </CarouselContext>
  );
}
