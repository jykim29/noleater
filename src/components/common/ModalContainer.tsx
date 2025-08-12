'use client';

import { useCallback } from 'react';
import { useModalContext } from '@/contexts/ModalContext';
import Overlay from './Overlay';
import Portal from './Portal';

interface ModalProps {
  className?: string;
}

export default function ModalContainer({ className }: ModalProps) {
  const { isHidden, node, closeAll } = useModalContext();

  const handleCloseModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      closeAll();
    },
    [closeAll]
  );

  return (
    <>
      {!isHidden && (
        <Portal selector="#modal">
          <Overlay className={className} onClick={handleCloseModal}>
            {node}
          </Overlay>
        </Portal>
      )}
    </>
  );
}
