'use client';

import { useState } from 'react';

interface ExpandableParagraphProps {
  charLimit?: number;
  children: string;
}

export default function ExpandableParagraph({
  charLimit = 200,
  children,
}: ExpandableParagraphProps) {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const text = isExpand ? children : children.slice(0, charLimit) + '...';

  if (typeof children !== 'string') return null;

  const handleClick = () => {
    setIsExpand((prev) => !prev);
  };
  return (
    <p className="break-all">
      {text}
      {!isExpand && (
        <button
          className="text-body-sm text-gray-60 ml-2"
          type="button"
          onClick={handleClick}
        >
          더보기
        </button>
      )}
    </p>
  );
}
