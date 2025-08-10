'use client';

import { useMemo } from 'react';
import { Button } from '../common';
import { useModalContext } from '@/contexts/ModalContext';

type Menu = 'modify' | 'delete' | 'report';

interface ContextMenuProps {
  menus: Menu[];
}

/**
 * Renders a vertical context menu with action buttons based on the provided menu types.
 *
 * Displays a list of buttons for each menu key in the `menus` prop, applying appropriate labels and styles. When a button is clicked, it performs the associated action and closes all open modals.
 *
 * @param menus - An array of menu keys specifying which actions to display ('modify', 'delete', 'report')
 */
export default function ContextMenu({ menus }: ContextMenuProps) {
  const { closeAll } = useModalContext();
  const buttonConfig = useMemo(
    () => ({
      modify: {
        className:
          'border-positive text-positive w-full border-2 bg-white bg-none',
        label: '수정하기',
        handleClick: () => {
          console.log('수정하기');
        },
      },
      delete: {
        className: 'bg-negative border-negative w-full bg-none',
        label: '삭제하기',
        handleClick: () => {
          console.log('삭제하기');
        },
      },
      report: {
        className:
          'border-gray-60 text-gray-60 w-full border-2 bg-white bg-none',
        label: '신고하기',
        handleClick: () => {
          console.log('신고하기');
        },
      },
    }),
    []
  );

  return (
    <ul className="flex flex-col gap-3">
      {menus.map((menu, idx) => (
        <li key={idx}>
          <Button
            className={buttonConfig[menu].className}
            onClick={() => {
              buttonConfig[menu].handleClick();
              closeAll();
            }}
          >
            {buttonConfig[menu].label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
