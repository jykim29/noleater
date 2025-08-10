'use client';

import Image from 'next/image';
import { Carousel } from '../common';
import bannerMockData from '@/data/home/banners.json';

/**
 * Renders a carousel of banner images with autoplay and clickable dotted page indicators.
 *
 * Displays images sourced from mock banner data, automatically cycling through slides every 3 seconds. Users can navigate to a specific slide by clicking the corresponding dot indicator.
 */
export default function MainBannerCarousel() {
  return (
    <Carousel autoplayOptions={{ delay: 3000, stopOnInteraction: false }}>
      <Carousel.Container className="gap-2">
        {bannerMockData.data.map((item) => (
          <Carousel.Slide
            key={item.id}
            className="relative aspect-[1/0.4] w-full rounded-lg"
          >
            <Image
              className="object-cover"
              src={item.imgSrc}
              alt={item.alt}
              fill
              sizes="100vw"
            />
          </Carousel.Slide>
        ))}
      </Carousel.Container>
      <Carousel.PageIndicator
        type="dotted"
        onClick={(el, emblaApi) => {
          const idx = Number(el.dataset.slideIdx);
          if (!Number.isNaN(idx)) emblaApi.scrollTo(idx);
        }}
      />
    </Carousel>
  );
}
