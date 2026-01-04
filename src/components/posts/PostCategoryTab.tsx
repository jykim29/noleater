'use client';

import { twMerge } from 'tailwind-merge';
import { TabButton, TabList } from '../common';

interface BoardCategoryTabProps {
  tabData: { name: string; slug: string; order: number }[];
}
const stateVariants = {
  common: 'text-caption-xs! rounded-full  border px-2 py-1.5 text-black',
  inactive: 'bg-gray-gradient border-gray-40 shrink-0',
  active:
    '[&>button.active]:bg-primary-gradient [&>button.active]:border-secondary-60 [&>button.active]:text-white',
};

export default function PostCategoryTab({ tabData }: BoardCategoryTabProps) {
  const sortedTabData = tabData.sort((a, b) => a.order - b.order);
  return (
    <TabList
      onSelect={() => {}}
      ariaLabel="자유게시판 카테고리 탭"
      activeClassName={stateVariants.active}
    >
      {sortedTabData.map(({ name, slug }, idx) => (
        <TabButton
          key={slug}
          tabId={slug}
          className={twMerge(
            stateVariants.common,
            stateVariants.inactive,
            idx === 0 && 'active'
          )}
          ariaSelected={idx === 0}
        >
          {name}
        </TabButton>
      ))}
    </TabList>
  );
}
