'use client';

import { twMerge } from 'tailwind-merge';

interface TabListProps extends React.PropsWithChildren {
  ariaLabel?: string;
  activeClassName?: string;
  onSelect: (selectId: string) => void;
}

export default function TabList({
  ariaLabel = '',
  activeClassName = '',
  onSelect: handleSelect,
  children,
}: TabListProps) {
  const handleSelectTab = (e: React.MouseEvent) => {
    const childElements = e.currentTarget.children;
    const selectElement = e.target;
    if (!(selectElement instanceof HTMLButtonElement)) return;
    if (!selectElement.dataset.tabId) return;
    [...childElements].forEach((el) => {
      el.classList.remove('active');
      el.setAttribute('aria-selected', 'false');
    });
    selectElement.classList.add('active');
    selectElement.setAttribute('aria-selected', 'true');
    handleSelect(selectElement.id);
  };
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={twMerge('flex w-full items-center gap-1', activeClassName)}
      onClick={handleSelectTab}
    >
      {children}
    </div>
  );
}
