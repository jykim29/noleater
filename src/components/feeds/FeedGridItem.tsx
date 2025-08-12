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
        aria-label="피드 상세보기"
        onClick={() => handleClick(id)}
      >
        <Image
          className="object-cover"
          src={imgSrc}
          alt="피드 이미지 썸네일"
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
