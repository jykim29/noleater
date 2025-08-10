'use client';

import Image from 'next/image';
import FeedItem from './FeedItem';
import { Button, GridItem } from '../common';
import { useModalContext } from '@/contexts/ModalContext';

interface FeedGridItemProps {
  id: number;
  imgSrc: string;
  isMultiple?: boolean;
}

/**
 * Renders a grid item displaying an image with an optional overlay icon for multiple images, and opens a modal with the feed item when clicked.
 *
 * @param id - Identifier for the feed item to display in the modal
 * @param imgSrc - Source URL of the image to display in the grid item
 * @param isMultiple - If true, displays an overlay icon indicating multiple images (optional)
 * @returns The rendered grid item component
 */
export default function FeedGridItem({
  id,
  imgSrc,
  isMultiple = false,
}: FeedGridItemProps) {
  const { open } = useModalContext();
  const handleClick = (id: number) => {
    open.centerModal(<FeedItem />);
  };
  return (
    <GridItem>
      <Button
        type="button"
        className="relative block h-full w-full border-none bg-none p-0"
        onClick={() => handleClick(id)}
      >
        <Image
          className="object-cover"
          src={imgSrc}
          alt=""
          fill
          sizes="100vw"
        />
        {isMultiple && (
          <Image
            className="absolute top-2 right-2"
            src="/assets/icons/multiple_image.svg"
            alt="이미지 더있음"
            width={21}
            height={20}
          />
        )}
      </Button>
    </GridItem>
  );
}
