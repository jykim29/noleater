'use client';

import { getPublicURL } from '@/api/storage/getPublicURL';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface AttachedImagePreviewBoxProps {
  image: {
    src: string;
    alt?: string;
    id: string;
  };
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export default function AttachedImagePreviewBox({
  image: { src, alt, id },
  className: newClassName,
  ref,
}: AttachedImagePreviewBoxProps) {
  const imageURL = getPublicURL(src);
  return (
    <div
      className={twMerge(
        'border-gray-40 bg-gray-20 relative box-border h-20 w-20 rounded-2xl border-2',
        newClassName
      )}
    >
      <Image
        className="cursor-pointer rounded-2xl object-cover pointer-fine:hover:brightness-110"
        src={imageURL}
        fill
        alt={alt || '첨부이미지'}
      />
      <button
        data-image-id={id}
        className="bg-gray-60 pointer-fine:hover:bg-negative absolute top-0 right-0 h-6 w-6 translate-x-2 -translate-y-1 rounded-full bg-[url(/assets/icons/cross_thin.svg)] bg-center bg-no-repeat"
        type="button"
        ref={ref}
      >
        <span className="sr-only">첨부 이미지 삭제</span>
      </button>
    </div>
  );
}
