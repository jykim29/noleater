'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { BottomSheet, CenterModal, ModalContainer } from '@/components/common';

interface ModalContextType {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  open: {
    bottomSheet: (node: React.ReactNode) => void;
    centerModal: (node: React.ReactNode) => void;
  };
  closeAll: () => void;
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

/**
 * Provides modal state and control methods to its descendants via React context.
 *
 * Wraps children with a context that enables opening bottom sheet or center modals, closing all modals, and accessing modal visibility and content state. Also renders a modal container for displaying modal content.
 *
 * @param children - The React nodes that will have access to the modal context.
 */
export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [node, setNode] = useState<React.ReactNode | null>(null);

  const openBottomSheet = useCallback((node: React.ReactNode) => {
    document.body.style = 'overflow-y: hidden';
    setNode(<BottomSheet>{node}</BottomSheet>);
    setIsHidden(false);
  }, []);
  const openCenterModal = useCallback((node: React.ReactNode) => {
    document.body.style = 'overflow-y: hidden';
    setNode(<CenterModal>{node}</CenterModal>);
    setIsHidden(false);
  }, []);
  const closeAll = useCallback(() => {
    document.body.removeAttribute('style');
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
