import Image from 'next/image';
import { Button, GridItem } from '../common';

export default function FeedGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(128)].map((_, idx) => (
        <GridItem key={idx}>
          <Button
            type="button"
            className="relative block h-full w-full border-none bg-none p-0"
          >
            <Image
              className="object-cover"
              src={`https://picsum.photos/256/256?random=${idx}`}
              alt={`테스트이미지-${idx}`}
              fill
              sizes="100vw"
            />
          </Button>
        </GridItem>
      ))}
    </div>
  );
}
