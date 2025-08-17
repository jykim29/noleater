'use client';

import { twMerge } from 'tailwind-merge';
import { TabButton, TabList } from '../common';

interface BoardCategoryTabProps {
  tabData: { id: string; label: string }[];
}
const stateVariants = {
  common: 'text-caption-xs! rounded-full  border px-2 py-1.5 text-black',
  inactive: 'bg-gray-gradient border-gray-40 shrink-0',
  active:
    '[&>button.active]:bg-primary-gradient [&>button.active]:border-secondary-60 [&>button.active]:text-white',
};

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
