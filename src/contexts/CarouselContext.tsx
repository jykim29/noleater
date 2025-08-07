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
