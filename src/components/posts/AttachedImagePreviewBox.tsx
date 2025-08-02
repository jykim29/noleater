'use client';

import Image from 'next/image';

interface AttachedImagePreviewBoxProps {
  image: {
    src: string;
    alt?: string;
  };
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AttachedImagePreviewBox({
  image: { src, alt },
  onDelete: handleClick,
}: AttachedImagePreviewBoxProps) {
  return (
    <div className="border-gray-40 bg-gray-20 relative box-border h-20 w-20 rounded-2xl border-2">
      <Image
        className="cursor-pointer rounded-2xl object-cover pointer-fine:hover:brightness-110"
        src={src}
        width={80}
        height={80}
        alt={alt || '첨부이미지'}
      />
      <button
        onClick={(e) => handleClick(e)}
        className="bg-gray-60 pointer-fine:hover:bg-negative absolute top-0 right-0 h-6 w-6 translate-x-2 -translate-y-1 rounded-full bg-[url(/assets/icons/cross_thin.svg)] bg-center bg-no-repeat"
        type="button"
      >
        <span className="sr-only">첨부 이미지 삭제</span>
      </button>
    </div>
  );
}
