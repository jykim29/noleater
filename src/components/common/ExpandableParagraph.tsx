'use client';

import { useId, useState } from 'react';

interface ExpandableParagraphProps {
  charLimit?: number;
  children: string;
}

export default function ExpandableParagraph({
  charLimit = 200,
  children,
}: ExpandableParagraphProps) {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const contentId = useId();

  if (typeof children !== 'string') return null;

  const isLimitOver = children.length > charLimit;
  const text =
    isExpand || !isLimitOver ? children : children.slice(0, charLimit) + '...';

  const handleClick = () => {
    setIsExpand((prev) => !prev);
  };
  return (
    <p id={`${contentId}-content`} className="break-all">
      {text}
      {isLimitOver && (
        <button
          className="text-body-sm text-gray-60 ml-2"
          type="button"
          aria-expanded={isExpand}
          aria-controls={`${contentId}-content`}
          onClick={handleClick}
        >
          {isExpand ? '접기' : '더보기'}
        </button>
      )}
    </p>
  );
}
