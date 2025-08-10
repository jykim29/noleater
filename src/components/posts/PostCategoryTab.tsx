'use client';

import { twMerge } from 'tailwind-merge';
import { TabButton, TabList } from '../common';

interface BoardCategoryTabProps {
  tabData: { id: string; label: string }[];
}
const stateVariants = {
  common:
    'text-caption-xs! rounded-full border bg-linear-0 px-2 py-1.5 text-black',
  inactive: 'from-gray-40 to-gray-20 border-gray-40 shrink-0',
  active:
    '[&>button.active]:from-primary-100 [&>button.active]:to-secondary-60 [&>button.active]:border-secondary-60 [&>button.active]:text-white',
};

/**
 * Renders a tab list for board categories, displaying each category as a tab.
 *
 * The first tab is statically set as active on initial render.
 *
 * @param tabData - Array of category objects, each with an `id` and `label`
 * @returns A React element containing the category tab list
 */
export default function PostCategoryTab({ tabData }: BoardCategoryTabProps) {
  return (
    <TabList
      onSelect={() => {}}
      ariaLabel="자유게시판 카테고리 탭"
      activeClassName={stateVariants.active}
    >
      {tabData.map(({ id, label }, idx) => (
        <TabButton
          key={id}
          tabId={id}
          className={twMerge(
            stateVariants.common,
            stateVariants.inactive,
            idx === 0 && 'active'
          )}
          ariaSelected={idx === 0}
        >
          {label}
        </TabButton>
      ))}
    </TabList>
  );
}
