'use client';

import { useCallback } from 'react';
import { useModalContext } from '@/contexts/ModalContext';
import { Button } from '../common';

interface KebabMenuButtonProps {
  contextMenu: React.ReactNode;
}

/**
 * Renders a button with a kebab menu icon that opens a bottom sheet modal displaying the provided context menu content when clicked.
 *
 * @param contextMenu - The React node to display in the bottom sheet modal.
 */
export default function KebabMenuButton({ contextMenu }: KebabMenuButtonProps) {
  const { open } = useModalContext();
  const handleClick = useCallback(() => {
    open.bottomSheet(contextMenu);
  }, [contextMenu, open]);

  return (
    <Button
      className="pointer-fine:hover:bg-gray-20 h-8 w-8 border-none bg-[url(/assets/icons/kebab_menu.svg)] bg-center bg-no-repeat p-0"
      onClick={handleClick}
    >
      <span className="sr-only">더보기</span>
    </Button>
  );
}
