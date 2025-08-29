'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { BottomSheet, CenterModal, ModalContainer } from '@/components/common';
import { el } from '@/utils';

interface ModalContextValue {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  open: {
    bottomSheet: (node: React.ReactNode) => void;
    centerModal: (node: React.ReactNode) => void;
  };
  closeAll: () => void;
  node?: React.ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

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

  const openBottomSheet = useCallback((node: React.ReactNode) => {
    if (!el('#modal')) return;
    document.body.style.setProperty('overflow-y', 'hidden');
    setNode(<BottomSheet>{node}</BottomSheet>);
    setIsHidden(false);
  }, []);
  const openCenterModal = useCallback((node: React.ReactNode) => {
    if (!el('#modal')) return;
    document.body.style.setProperty('overflow-y', 'hidden');
    setNode(<CenterModal>{node}</CenterModal>);
    setIsHidden(false);
  }, []);
  const closeAll = useCallback(() => {
    document.body.style.removeProperty('overflow-y');
    setNode(null);
    setIsHidden(true);
  }, []);
  const open = useMemo(
    () => ({
      bottomSheet: openBottomSheet,
      centerModal: openCenterModal,
    }),
    [openBottomSheet, openCenterModal]
  );

  return (
    <ModalContext value={{ isHidden, setIsHidden, open, closeAll, node }}>
      {children}
      <ModalContainer />
    </ModalContext>
  );
}
