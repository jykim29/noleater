import { EmblaCarouselType } from 'embla-carousel';
import { createContext, useContext } from 'react';

interface CarouselContextValue {
  emblaApi: EmblaCarouselType;
  currentSlideIndex: number;
  totalSlideCount: number;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context)
    throw new Error(
      'useCarouselContext훅은 CarouselContextProvider 컴포넌트 내부에서만 사용되어야 합니다.'
    );
  return context;
};

export function CarouselContextProvider({
  emblaApi,
  currentSlideIndex,
  totalSlideCount,
  children,
}: React.PropsWithChildren<CarouselContextValue>) {
  return (
    <CarouselContext value={{ emblaApi, currentSlideIndex, totalSlideCount }}>
      {children}
    </CarouselContext>
  );
}
