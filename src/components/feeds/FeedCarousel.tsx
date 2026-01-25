'use client';

import Image from 'next/image';
import { Carousel } from '../common';
import { ViewRow } from '@/types/supabase/db.types';
import { getPublicURL } from '@/api/storage/getPublicURL';

export default function FeedCarousel({
  paths,
}: {
  paths: ViewRow<'v_feed_detail_list'>['imagePaths'];
}) {
  console.log(paths);
  return (
    <Carousel>
      <Carousel.Container className="gap-2">
        {paths &&
          paths.map((path, idx) => (
            <Carousel.Slide
              key={path}
              className="relative aspect-[1/0.4] w-full rounded-lg"
            >
              <Image
                className="object-cover"
                src={getPublicURL(path)}
                alt={`${idx}번째 이미지`}
                fill
                sizes="100vw"
              />
            </Carousel.Slide>
          ))}
      </Carousel.Container>
      <Carousel.PageIndicator
        type="numeric"
        position={{ x: 'right', y: 'top' }}
      />
    </Carousel>
  );
}
