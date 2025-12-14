'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface AttachedImagePreviewBoxProps {
  image: {
    src: string;
    alt?: string;
    id: string;
  };
  className?: string;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AttachedImagePreviewBox({
  image: { src, alt, id },
  className: newClassNamme,
  onDelete: handleClick,
}: AttachedImagePreviewBoxProps) {
  return (
    <div
      className={twMerge(
        'border-gray-40 bg-gray-20 relative box-border h-20 w-20 rounded-2xl border-2',
        newClassNamme
      )}
    >
      <Image
        className="cursor-pointer rounded-2xl object-cover pointer-fine:hover:brightness-110"
        src={src}
        fill
        alt={alt || '첨부이미지'}
      />
      <button
        data-image-id={id}
        onClick={(e) => handleClick(e)}
        className="bg-gray-60 pointer-fine:hover:bg-negative absolute top-0 right-0 h-6 w-6 translate-x-2 -translate-y-1 rounded-full bg-[url(/assets/icons/cross_thin.svg)] bg-center bg-no-repeat"
        type="button"
      >
        <span className="sr-only">첨부 이미지 삭제</span>
      </button>
    </div>
  );
}
