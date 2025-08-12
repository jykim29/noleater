'use client';

import Image from 'next/image';
import { Carousel } from '../common';

export default function FeedCarousel() {
  return (
    <Carousel>
      <Carousel.Container className="gap-2">
        <Carousel.Slide className="relative aspect-[1/0.4] w-full rounded-lg">
          <Image
            className="object-cover"
            src="https://picsum.photos/300/200?random=1"
            alt="테스트 이미지"
            fill
            sizes="100vw"
          />
        </Carousel.Slide>
        <Carousel.Slide className="relative aspect-[1/0.6] w-full rounded-sm">
          <Image
            className="object-cover"
            src="https://picsum.photos/300/200?random=1"
            alt="테스트 이미지"
            fill
            sizes="100vw"
          />
        </Carousel.Slide>
      </Carousel.Container>
      <Carousel.PageIndicator
        type="numeric"
        position={{ x: 'right', y: 'top' }}
      />
    </Carousel>
  );
}
