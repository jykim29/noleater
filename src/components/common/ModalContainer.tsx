'use client';

import { useCallback } from 'react';
import { useModalContext } from '@/contexts/ModalContext';
import Overlay from './Overlay';
import Portal from './Portal';

interface ModalProps {
  className?: string;
}

/**
 * Renders modal content into a portal when the modal is visible.
 *
 * Displays the modal content provided by the modal context inside an overlay, mounted to the DOM element with id `modal`. Closes all modals when the overlay background is clicked.
 *
 * @param className - Optional CSS class name to apply to the overlay
 */
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
