'use client';

import { useState } from 'react';

interface ExpandableParagraphProps {
  charLimit?: number;
  children: string;
}

/**
 * Displays a paragraph that can be expanded to show the full text or collapsed to show a truncated preview.
 *
 * If the provided text exceeds the specified character limit, only a shortened version is shown with an option to expand and reveal the entire content.
 *
 * @param charLimit - The maximum number of characters to display before truncation (defaults to 200)
 * @param children - The text content to display in the paragraph
 * @returns A React element rendering the expandable paragraph, or `null` if `children` is not a string
 */
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
