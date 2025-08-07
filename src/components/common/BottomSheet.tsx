'use client';

import { useModalContext } from '@/contexts/ModalContext';
import Overlay from './Overlay';
import Portal from './Portal';
import { useCallback } from 'react';

export default function BottomSheet() {
  const { isHidden, closeModal, node } = useModalContext();

  const handleCloseModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      closeModal();
    },
    [closeModal]
  );

  return (
    <>
      {!isHidden && (
        <Portal selector="#modal">
          <Overlay
            className="flex flex-col justify-end"
            onClick={handleCloseModal}
          >
            <div className="w-full rounded-t-2xl bg-white shadow-lg">
              <div className="flex h-6 w-full items-center justify-center">
                <span className="bg-gray-40 h-1 w-14 rounded-full"></span>
              </div>
              <div className="px-7 pt-4 pb-7">{node}</div>
            </div>
          </Overlay>
        </Portal>
      )}
    </>
  );
}
