'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { BottomSheet } from '@/components/common';

interface ModalContextType {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (node: React.ReactNode) => void;
  closeModal: () => void;
  node?: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error(
      'useModalContext훅은 ModalContextProvider 컴포넌트 내부에서만 사용되어야 합니다.'
    );

  return context;
};

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [node, setNode] = useState<React.ReactNode | null>(null);

  const openModal: ModalContextType['openModal'] = useCallback((node) => {
    setNode(node);
    setIsHidden(false);
  }, []);

  const closeModal: ModalContextType['closeModal'] = useCallback(() => {
    setNode(null);
    setIsHidden(true);
  }, []);

  return (
    <ModalContext
      value={{ isHidden, setIsHidden, openModal, closeModal, node }}
    >
      {children}
      <BottomSheet />
    </ModalContext>
  );
}
