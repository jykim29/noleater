import Link from 'next/link';
import Image from 'next/image';
import { GridItem } from '../common';
import { ViewRow } from '@/types/supabase/db.types';
import { getPublicURL } from '@/api/storage/getPublicURL';

export default function FeedGridItem({
  data,
}: {
  data: ViewRow<'v_feed_grid_list'>;
}) {
  const isMultiple = data.imageCount ? data.imageCount > 1 : false;
  return (
    <GridItem className="hover:brightness-90">
      <Link className="relative block h-full w-full" href={`/feeds/${data.id}`}>
        <Image
          className="object-cover"
          src={getPublicURL(data.imagePath ?? '')}
          alt="피드 이미지 썸네일"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {isMultiple && (
          <Image
            className="absolute right-2 bottom-2"
            src="/assets/icons/multiple_image.svg"
            alt="이미지 더있음"
            width={21}
            height={20}
          />
        )}
      </Link>
    </GridItem>
  );
}
