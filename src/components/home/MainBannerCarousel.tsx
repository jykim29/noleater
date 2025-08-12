'use client';

import Image from 'next/image';
import { Carousel } from '../common';
import bannerMockData from '@/data/home/banners.json';

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
      <Carousel.PageIndicator type="dotted" />
    </Carousel>
  );
}
